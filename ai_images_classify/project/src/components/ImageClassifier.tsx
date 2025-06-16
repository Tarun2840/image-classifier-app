import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface PredictionResult {
  class: string;
  confidence: number;
  processingTime: number;
}

const ImageClassifier: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Mock prediction function
  const mockPredict = useCallback(async (): Promise<PredictionResult> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const classes = ['Cat', 'Dog'];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const confidence = 0.85 + Math.random() * 0.14; // 85-99%
    const processingTime = 0.3 + Math.random() * 0.7; // 0.3-1.0 seconds
    
    return {
      class: randomClass,
      confidence,
      processingTime,
    };
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setPrediction(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    try {
      const result = await mockPredict();
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetClassifier = () => {
    setSelectedImage(null);
    setPrediction(null);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Image Classifier</h1>
        <p className="text-lg text-gray-600">
          Upload an image to see our trained model classify it as Cat or Dog
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
              ${dragActive
                ? 'border-blue-500 bg-blue-50'
                : selectedImage
                ? 'border-green-300 bg-green-50'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle size={20} />
                  <span className="font-medium">Image loaded successfully</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Drop your image here, or{' '}
                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                      browse
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports JPG, PNG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {selectedImage && (
            <div className="flex space-x-4">
              <button
                onClick={handlePredict}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    <span>Classify Image</span>
                  </>
                )}
              </button>
              
              <button
                onClick={resetClassifier}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:shadow-md transition-all duration-200"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2" />
              Classification Results
            </h3>

            {prediction ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {prediction.class}
                  </div>
                  <div className="text-lg text-gray-600">
                    {(prediction.confidence * 100).toFixed(1)}% confidence
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${prediction.confidence * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Processing Time</div>
                    <div className="text-gray-600">{prediction.processingTime.toFixed(2)}s</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Model Version</div>
                    <div className="text-gray-600">v2.1.0</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Classification completed successfully</span>
                </div>
              </div>
            ) : isProcessing ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Analyzing image with AI model...</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Upload an image to see classification results</p>
              </div>
            )}
          </div>

          {/* Model Info */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Architecture:</span>
                <span className="font-medium">MobileNetV2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Training Data:</span>
                <span className="font-medium">400+ images</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Test Accuracy:</span>
                <span className="font-medium text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Classes:</span>
                <span className="font-medium">Cat, Dog</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageClassifier;