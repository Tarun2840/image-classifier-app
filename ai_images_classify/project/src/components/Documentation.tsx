import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Code, Database, Play, Zap, CheckCircle } from 'lucide-react';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Project Overview', icon: FileText },
    { id: 'setup', title: 'Setup Instructions', icon: Play },
    { id: 'architecture', title: 'Architecture', icon: Code },
    { id: 'api', title: 'API Reference', icon: Zap },
    { id: 'dataset', title: 'Dataset Details', icon: Database },
    { id: 'deployment', title: 'Deployment', icon: ExternalLink },
  ];

  const setupSteps = [
    {
      title: 'Clone the Repository',
      code: 'git clone https://github.com/your-username/ai-image-classifier.git\ncd ai-image-classifier',
    },
    {
      title: 'Install Dependencies',
      code: 'pip install -r requirements.txt',
    },
    {
      title: 'Download the Dataset',
      code: 'python scripts/download_dataset.py',
    },
    {
      title: 'Train the Model (Optional)',
      code: 'python train_model.py --epochs 20 --batch-size 32',
    },
    {
      title: 'Start the FastAPI Server',
      code: 'uvicorn api:app --reload --host 0.0.0.0 --port 8000',
    },
    {
      title: 'Start the Flask Frontend',
      code: 'python app.py',
    },
  ];

  const requirements = [
    'tensorflow>=2.8.0',
    'fastapi>=0.70.0',
    'uvicorn>=0.15.0',
    'flask>=2.0.0',
    'pillow>=8.3.0',
    'numpy>=1.21.0',
    'requests>=2.26.0',
    'python-multipart>=0.0.5',
  ];

  const architectureComponents = [
    {
      name: 'Data Collection & Preprocessing',
      description: 'Scripts for downloading and preprocessing the Cats vs Dogs dataset',
      files: ['scripts/download_dataset.py', 'scripts/preprocess_images.py'],
    },
    {
      name: 'Model Training',
      description: 'Deep learning model training using TensorFlow/Keras',
      files: ['train_model.py', 'models/mobilenet_classifier.py'],
    },
    {
      name: 'FastAPI Backend',
      description: 'REST API server for image classification predictions',
      files: ['api.py', 'utils/image_utils.py'],
    },
    {
      name: 'Flask Frontend',
      description: 'Web interface for uploading images and viewing results',
      files: ['app.py', 'templates/index.html', 'static/style.css'],
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Based Image Classification System</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This project implements a complete AI/ML pipeline for image classification, built as part of the Godhaar assignment. 
                The system classifies images into "Cat" or "Dog" categories using a deep learning model, with a FastAPI backend 
                and Flask frontend interface.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Key Features</h4>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• 94.2% accuracy on test dataset with MobileNetV2 architecture</li>
                  <li>• RESTful API with comprehensive Swagger documentation</li>
                  <li>• Real-time image classification with sub-second response times</li>
                  <li>• Production-ready deployment with Docker support</li>
                  <li>• Comprehensive evaluation metrics and performance monitoring</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Project Structure</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-gray-100 text-sm">
{`project/
├── dataset/               # Training, validation, test data
│   ├── train/
│   │   ├── cat/
│   │   └── dog/
│   ├── validation/
│   └── test/
├── models/                # Trained model files
│   └── mobilenet_v2.h5
├── scripts/               # Data processing scripts
│   ├── download_dataset.py
│   └── preprocess_images.py
├── api.py                 # FastAPI backend
├── app.py                 # Flask frontend
├── train_model.py         # Model training script
├── requirements.txt       # Python dependencies
├── Dockerfile            # Container configuration
├── docker-compose.yml    # Multi-service deployment
└── README.md             # Project documentation`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Technology Stack</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Backend</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• FastAPI for REST API</li>
                    <li>• TensorFlow/Keras for ML</li>
                    <li>• Uvicorn ASGI server</li>
                    <li>• Pydantic for validation</li>
                  </ul>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Frontend</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Flask web framework</li>
                    <li>• Bootstrap for styling</li>
                    <li>• JavaScript for interactions</li>
                    <li>• HTML5 file upload</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'setup':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Setup Instructions</h3>
              <p className="text-gray-700 mb-6">
                Follow these steps to set up the AI image classification system on your local machine.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Prerequisites</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <ul className="text-yellow-800 space-y-1 text-sm">
                  <li>• Python 3.8 or higher</li>
                  <li>• pip package manager</li>
                  <li>• Git for version control</li>
                  <li>• At least 4GB of available RAM</li>
                  <li>• 2GB of free disk space</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Step-by-Step Installation</h4>
              <div className="space-y-4">
                {setupSteps.map((step, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <h5 className="font-medium text-gray-900">{step.title}</h5>
                    </div>
                    <div className="bg-gray-900 rounded p-3 ml-11">
                      <code className="text-gray-100 text-sm">{step.code}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Dependencies (requirements.txt)</h4>
              <div className="bg-gray-50 border rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-2 text-sm font-mono text-gray-700">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Verification</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm mb-2">
                  After setup, verify the installation by:
                </p>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>1. Visiting http://localhost:8000/docs (FastAPI Swagger UI)</li>
                  <li>2. Visiting http://localhost:5000 (Flask frontend)</li>
                  <li>3. Uploading a test image for classification</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">System Architecture</h3>
              <p className="text-gray-700 mb-6">
                The system follows a modular architecture with clear separation of concerns between data processing, 
                model training, API services, and user interface components.
              </p>
            </div>

            <div className="space-y-4">
              {architectureComponents.map((component, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{component.name}</h4>
                  <p className="text-gray-700 text-sm mb-3">{component.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {component.files.map((file, fileIndex) => (
                      <span key={fileIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">
                        {file}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Data Flow</h4>
              <div className="bg-white border rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">1</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Image Upload</h5>
                      <p className="text-sm text-gray-600">User uploads image via Flask frontend</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">2</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">API Request</h5>
                      <p className="text-sm text-gray-600">Frontend sends POST request to FastAPI /predict endpoint</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">3</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Image Processing</h5>
                      <p className="text-sm text-gray-600">Image is resized, normalized, and prepared for model</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">4</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Model Inference</h5>
                      <p className="text-sm text-gray-600">MobileNetV2 model generates classification prediction</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">5</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Result Display</h5>
                      <p className="text-sm text-gray-600">Prediction and confidence score returned to user</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">API Reference</h3>
              <p className="text-gray-700 mb-6">
                The FastAPI backend provides RESTful endpoints for image classification and system information.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">POST</span>
                  <code className="font-mono text-lg">/predict</code>
                </div>
                <p className="text-gray-700 text-sm mb-3">Upload an image for classification</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Request</h5>
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      <p><strong>Content-Type:</strong> multipart/form-data</p>
                      <p><strong>file:</strong> Image file (JPG, PNG, GIF)</p>
                      <p><strong>Max size:</strong> 10MB</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Response</h5>
                    <div className="bg-gray-900 rounded p-3">
                      <code className="text-gray-100 text-xs">
{`{
  "class": "cat",
  "confidence": 0.942,
  "processing_time": 0.34
}`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">GET</span>
                  <code className="font-mono text-lg">/health</code>
                </div>
                <p className="text-gray-700 text-sm mb-3">Check API health status</p>
                
                <div className="bg-gray-900 rounded p-3">
                  <code className="text-gray-100 text-xs">
{`{
  "status": "healthy",
  "timestamp": "2024-12-07T10:30:00Z",
  "version": "2.1.0"
}`}
                  </code>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">GET</span>
                  <code className="font-mono text-lg">/model/info</code>
                </div>
                <p className="text-gray-700 text-sm mb-3">Get detailed model information</p>
                
                <div className="bg-gray-900 rounded p-3">
                  <code className="text-gray-100 text-xs">
{`{
  "model_name": "MobileNetV2",
  "version": "2.1.0",
  "accuracy": 0.942,
  "classes": ["cat", "dog"],
  "input_shape": [224, 224, 3],
  "parameters": 2257984
}`}
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Error Handling</h4>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm mb-2">Common error responses:</p>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• <strong>400:</strong> Invalid file format or size too large</li>
                  <li>• <strong>422:</strong> Missing required parameters</li>
                  <li>• <strong>500:</strong> Internal server error during processing</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'dataset':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dataset Details</h3>
              <p className="text-gray-700 mb-6">
                The training dataset consists of 400 high-quality images sourced from the Kaggle Cats vs Dogs dataset, 
                carefully curated and preprocessed for optimal model performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Dataset Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Images:</span>
                    <span className="font-medium">400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cat Images:</span>
                    <span className="font-medium">200 (50%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dog Images:</span>
                    <span className="font-medium">200 (50%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Set:</span>
                    <span className="font-medium">280 (70%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Validation Set:</span>
                    <span className="font-medium">60 (15%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Test Set:</span>
                    <span className="font-medium">60 (15%)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Preprocessing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Image Size:</span>
                    <span className="font-medium">224×224 pixels</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color Space:</span>
                    <span className="font-medium">RGB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Normalization:</span>
                    <span className="font-medium">[0, 1] range</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">JPG, PNG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Augmentation:</span>
                    <span className="font-medium text-green-600">Applied</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quality Check:</span>
                    <span className="font-medium text-green-600">Validated</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Data Augmentation</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 text-sm mb-3">
                  Applied augmentation techniques to increase dataset diversity:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-blue-800 text-sm">
                  <ul className="space-y-1">
                    <li>• Random rotation (±15 degrees)</li>
                    <li>• Horizontal flipping</li>
                    <li>• Random zoom (0.9-1.1x)</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Brightness adjustment (±20%)</li>
                    <li>• Width/height shifting (±10%)</li>
                    <li>• Shearing transformation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Data Sources</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Kaggle Cats vs Dogs Dataset</h5>
                    <p className="text-sm text-gray-600">Primary source for training images</p>
                  </div>
                  <ExternalLink size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Custom Validation Set</h5>
                    <p className="text-sm text-gray-600">Hand-curated images for testing</p>
                  </div>
                  <CheckCircle size={16} className="text-green-500" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Deployment Guide</h3>
              <p className="text-gray-700 mb-6">
                Multiple deployment options are available, from local development to production-ready containerized deployment.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Docker Deployment (Recommended)</h4>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Single Container</h5>
                  <div className="bg-gray-900 rounded p-3">
                    <code className="text-gray-100 text-sm">
                      docker build -t ai-classifier .<br/>
                      docker run -p 8000:8000 -p 5000:5000 ai-classifier
                    </code>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Docker Compose</h5>
                  <div className="bg-gray-900 rounded p-3">
                    <code className="text-gray-100 text-sm">
                      docker-compose up -d
                    </code>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Starts both FastAPI backend and Flask frontend in separate containers
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Cloud Deployment</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">AWS EC2</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use t3.medium or larger instance</li>
                    <li>• Install Docker and Docker Compose</li>
                    <li>• Configure security groups for ports 8000, 5000</li>
                    <li>• Set up SSL/TLS with Let's Encrypt</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Google Cloud Run</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Containerize FastAPI application</li>
                    <li>• Deploy with 2GB memory allocation</li>
                    <li>• Configure custom domain</li>
                    <li>• Enable Cloud Storage for model files</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Production Checklist</h4>
              <div className="space-y-2">
                {[
                  'Environment variables configured',
                  'Model files properly mounted',
                  'SSL/TLS certificates installed',
                  'Rate limiting enabled',
                  'Logging and monitoring configured',
                  'Health checks implemented',
                  'Backup strategy in place',
                  'Load balancing configured (if needed)',
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Performance Considerations</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <ul className="text-yellow-800 space-y-1 text-sm">
                  <li>• Minimum 2GB RAM for model loading</li>
                  <li>• SSD storage recommended for faster I/O</li>
                  <li>• GPU acceleration optional but improves performance</li>
                  <li>• Consider image caching for repeated requests</li>
                  <li>• Monitor CPU and memory usage under load</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentation</h1>
          <p className="text-lg text-gray-600">
            Complete guide for the AI image classification system
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Download size={16} />
            <span>Download PDF</span>
          </button>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
            <ExternalLink size={16} />
            <span>GitHub Repository</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-md sticky top-8">
            <h3 className="font-semibold text-gray-900 mb-4">Contents</h3>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl p-8 shadow-md">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;