import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, TrendingUp, Clock, Target } from 'lucide-react';

interface TrainingMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
  valLoss: number;
  valAccuracy: number;
}

const ModelTraining: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState<TrainingMetrics[]>([]);
  const [trainingComplete, setTrainingComplete] = useState(false);

  const maxEpochs = 20;

  // Mock training data
  const generateMetrics = (epoch: number): TrainingMetrics => {
    const baseLoss = 0.8 - (epoch * 0.035) + (Math.random() * 0.1 - 0.05);
    const baseAcc = 0.5 + (epoch * 0.022) + (Math.random() * 0.05 - 0.025);
    const valLoss = baseLoss + 0.1 + (Math.random() * 0.08 - 0.04);
    const valAcc = baseAcc - 0.02 + (Math.random() * 0.04 - 0.02);

    return {
      epoch: epoch + 1,
      loss: Math.max(0.05, baseLoss),
      accuracy: Math.min(0.99, Math.max(0.5, baseAcc)),
      valLoss: Math.max(0.08, valLoss),
      valAccuracy: Math.min(0.98, Math.max(0.48, valAcc)),
    };
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTraining && currentEpoch < maxEpochs) {
      interval = setInterval(() => {
        const newMetric = generateMetrics(currentEpoch);
        setMetrics(prev => [...prev, newMetric]);
        setCurrentEpoch(prev => prev + 1);
        setProgress(((currentEpoch + 1) / maxEpochs) * 100);
        
        if (currentEpoch + 1 >= maxEpochs) {
          setIsTraining(false);
          setTrainingComplete(true);
        }
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isTraining, currentEpoch]);

  const startTraining = () => {
    setIsTraining(true);
  };

  const pauseTraining = () => {
    setIsTraining(false);
  };

  const resetTraining = () => {
    setIsTraining(false);
    setCurrentEpoch(0);
    setProgress(0);
    setMetrics([]);
    setTrainingComplete(false);
  };

  const currentMetrics = metrics[metrics.length - 1];
  const bestValAccuracy = metrics.length > 0 ? Math.max(...metrics.map(m => m.valAccuracy)) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Model Training</h1>
        <p className="text-lg text-gray-600">
          Train and monitor your deep learning model performance
        </p>
      </div>

      {/* Training Controls */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Training Progress</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Epoch {currentEpoch}/{maxEpochs}</span>
              <span>•</span>
              <span>{progress.toFixed(1)}% Complete</span>
              {trainingComplete && (
                <>
                  <span>•</span>
                  <span className="text-green-600 font-medium">Training Complete!</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!isTraining && currentEpoch === 0 && (
              <button
                onClick={startTraining}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <Play size={18} />
                <span>Start Training</span>
              </button>
            )}
            
            {isTraining && (
              <button
                onClick={pauseTraining}
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Pause size={18} />
                <span>Pause</span>
              </button>
            )}
            
            {!isTraining && currentEpoch > 0 && !trainingComplete && (
              <button
                onClick={startTraining}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Play size={18} />
                <span>Resume</span>
              </button>
            )}
            
            {currentEpoch > 0 && (
              <button
                onClick={resetTraining}
                className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 hover:shadow-md transition-all duration-200 flex items-center space-x-2"
              >
                <RotateCcw size={18} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Current Metrics */}
      {currentMetrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Training Loss</h3>
              <TrendingUp className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {currentMetrics.loss.toFixed(4)}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Training Accuracy</h3>
              <Target className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(currentMetrics.accuracy * 100).toFixed(1)}%
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Validation Loss</h3>
              <TrendingUp className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {currentMetrics.valLoss.toFixed(4)}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Validation Accuracy</h3>
              <Target className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(currentMetrics.valAccuracy * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {/* Training Charts */}
      {metrics.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Loss Over Time
            </h3>
            <div className="h-64 flex items-end space-x-1">
              {metrics.map((metric, index) => (
                <div key={index} className="flex-1 flex flex-col justify-end space-y-1">
                  <div
                    className="bg-red-500 rounded-t"
                    style={{ height: `${(1 - metric.loss) * 200}px` }}
                    title={`Training Loss: ${metric.loss.toFixed(4)}`}
                  />
                  <div
                    className="bg-orange-500 rounded-t"
                    style={{ height: `${(1 - metric.valLoss) * 200}px` }}
                    title={`Validation Loss: ${metric.valLoss.toFixed(4)}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded" />
                <span>Training Loss</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded" />
                <span>Validation Loss</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Accuracy Over Time
            </h3>
            <div className="h-64 flex items-end space-x-1">
              {metrics.map((metric, index) => (
                <div key={index} className="flex-1 flex flex-col justify-end space-y-1">
                  <div
                    className="bg-green-500 rounded-t"
                    style={{ height: `${metric.accuracy * 200}px` }}
                    title={`Training Accuracy: ${(metric.accuracy * 100).toFixed(1)}%`}
                  />
                  <div
                    className="bg-blue-500 rounded-t"
                    style={{ height: `${metric.valAccuracy * 200}px` }}
                    title={`Validation Accuracy: ${(metric.valAccuracy * 100).toFixed(1)}%`}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span>Training Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span>Validation Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Model Configuration */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Model Configuration
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Architecture:</span>
              <span className="font-medium">MobileNetV2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Input Size:</span>
              <span className="font-medium">224×224×3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Optimizer:</span>
              <span className="font-medium">Adam</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Learning Rate:</span>
              <span className="font-medium">0.001</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Batch Size:</span>
              <span className="font-medium">32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loss Function:</span>
              <span className="font-medium">Binary Crossentropy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Epochs:</span>
              <span className="font-medium">{maxEpochs}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data Augmentation:</span>
              <span className="font-medium text-green-600">Enabled</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Best Val Accuracy:</span>
              <span className="font-medium text-green-600">
                {bestValAccuracy > 0 ? `${(bestValAccuracy * 100).toFixed(1)}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Training Time:</span>
              <span className="font-medium">
                {isTraining ? `${(currentEpoch * 1.5).toFixed(1)}s` : 
                 trainingComplete ? `${(maxEpochs * 1.5).toFixed(1)}s` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${
                isTraining ? 'text-blue-600' : 
                trainingComplete ? 'text-green-600' : 
                currentEpoch > 0 ? 'text-yellow-600' : 'text-gray-600'
              }`}>
                {isTraining ? 'Training' : 
                 trainingComplete ? 'Complete' : 
                 currentEpoch > 0 ? 'Paused' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTraining;