import React, { useState } from 'react';
import { Brain, Upload, Database, BarChart3, Code, FileText, Menu, X } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ImageClassifier from './components/ImageClassifier';
import DatasetView from './components/DatasetView';
import ModelTraining from './components/ModelTraining';
import APIDocumentation from './components/APIDocumentation';
import Performance from './components/Performance';
import Documentation from './components/Documentation';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home', icon: Brain },
    { id: 'classifier', label: 'Image Classifier', icon: Upload },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'training', label: 'Model Training', icon: BarChart3 },
    { id: 'api', label: 'API Docs', icon: Code },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'docs', label: 'Documentation', icon: FileText },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onNavigate={setActiveSection} />;
      case 'classifier':
        return <ImageClassifier />;
      case 'dataset':
        return <DatasetView />;
      case 'training':
        return <ModelTraining />;
      case 'api':
        return <APIDocumentation />;
      case 'performance':
        return <Performance />;
      case 'docs':
        return <Documentation />;
      default:
        return <Hero onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex h-screen">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar Navigation */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Navigation
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onMobileClose={() => setIsMobileMenuOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 overflow-auto">
          <main className="p-4 lg:p-8">
            {renderActiveSection()}
          </main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;