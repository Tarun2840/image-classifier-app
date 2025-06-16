import React from 'react';
import { Brain, Upload, Database, BarChart3, Code, Zap, CheckCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Upload,
      title: 'Image Classification',
      description: 'Upload images and get real-time AI-powered predictions',
      action: () => onNavigate('classifier'),
    },
    {
      icon: Database,
      title: 'Dataset Management',
      description: 'Explore our curated dataset with 400+ images',
      action: () => onNavigate('dataset'),
    },
    {
      icon: BarChart3,
      title: 'Model Training',
      description: 'Train and evaluate deep learning models',
      action: () => onNavigate('training'),
    },
    {
      icon: Code,
      title: 'FastAPI Backend',
      description: 'RESTful API with comprehensive documentation',
      action: () => onNavigate('api'),
    },
  ];

  const achievements = [
    'Trained on 400+ high-quality images',
    '94% accuracy on test dataset',
    'Sub-second prediction time',
    'Production-ready API',
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">AI-Powered Image Classification</span>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
          Intelligent Image
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Classification System
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          A complete AI/ML pipeline featuring dataset preparation, model training, FastAPI backend, 
          and React frontend. Built for the Godhaar assignment with production-quality architecture.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => onNavigate('classifier')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Upload size={20} />
            <span>Try Image Classifier</span>
            <ArrowRight size={16} />
          </button>
          
          <button
            onClick={() => onNavigate('docs')}
            className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
          >
            View Documentation
          </button>
        </div>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">{achievement}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              onClick={feature.action}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              
              <div className="flex items-center text-blue-600 text-sm font-medium mt-4 group-hover:text-purple-600 transition-colors duration-200">
                <span>Learn more</span>
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tech Stack */}
      <div className="mt-16 bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'React', desc: 'Frontend Framework' },
            { name: 'TypeScript', desc: 'Type Safety' },
            { name: 'FastAPI', desc: 'Backend API' },
            { name: 'TensorFlow', desc: 'ML Framework' },
          ].map((tech, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{tech.name}</h3>
              <p className="text-sm text-gray-600">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;