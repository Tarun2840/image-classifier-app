import React from 'react';
import { Brain } from 'lucide-react';

interface NavigationProps {
  sections: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<any>;
  }>;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMobileClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  sections,
  activeSection,
  onSectionChange,
  onMobileClose,
}) => {
  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    onMobileClose();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Classifier</h1>
            <p className="text-sm text-gray-500">Godhaar Assignment</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Built with React & FastAPI</p>
          <p className="mt-1">© 2025 AI Classifier</p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;