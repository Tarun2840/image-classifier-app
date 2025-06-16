import React, { useState } from 'react';
import { Database, Image as ImageIcon, BarChart3, Filter, Search } from 'lucide-react';

const DatasetView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'stats'>('grid');

  // Mock dataset information
  const datasetStats = {
    total: 400,
    classes: {
      cat: 200,
      dog: 200,
    },
    splits: {
      train: 280,
      validation: 60,
      test: 60,
    },
  };

  // Sample images with actual URLs from Pexels
  const sampleImages = [
    { 
      id: 1, 
      class: 'cat', 
      filename: 'cat_001.jpg', 
      size: '224x224', 
      split: 'train',
      url: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 2, 
      class: 'cat', 
      filename: 'cat_002.jpg', 
      size: '224x224', 
      split: 'train',
      url: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 3, 
      class: 'cat', 
      filename: 'cat_003.jpg', 
      size: '224x224', 
      split: 'validation',
      url: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 4, 
      class: 'dog', 
      filename: 'dog_001.jpg', 
      size: '224x224', 
      split: 'train',
      url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 5, 
      class: 'dog', 
      filename: 'dog_002.jpg', 
      size: '224x224', 
      split: 'train',
      url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 6, 
      class: 'dog', 
      filename: 'dog_003.jpg', 
      size: '224x224', 
      split: 'test',
      url: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 7, 
      class: 'cat', 
      filename: 'cat_004.jpg', 
      size: '224x224', 
      split: 'test',
      url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 8, 
      class: 'dog', 
      filename: 'dog_004.jpg', 
      size: '224x224', 
      split: 'validation',
      url: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 9, 
      class: 'cat', 
      filename: 'cat_005.jpg', 
      size: '224x224', 
      split: 'train',
      url: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 10, 
      class: 'dog', 
      filename: 'dog_005.jpg', 
      size: '224x224', 
      split: 'train',
      url: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 11, 
      class: 'cat', 
      filename: 'cat_006.jpg', 
      size: '224x224', 
      split: 'validation',
      url: 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    { 
      id: 12, 
      class: 'dog', 
      filename: 'dog_006.jpg', 
      size: '224x224', 
      split: 'test',
      url: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
  ];

  const filteredImages = selectedClass === 'all' 
    ? sampleImages 
    : sampleImages.filter(img => img.class === selectedClass);

  const StatCard = ({ title, value, subtitle, color }: { 
    title: string; 
    value: string | number; 
    subtitle?: string; 
    color: string;
  }) => (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`w-3 h-3 rounded-full ${color}`} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dataset Explorer</h1>
          <p className="text-lg text-gray-600">
            Browse and analyze our curated image classification dataset
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="flex items-center bg-white rounded-lg shadow-sm border">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-l-lg transition-colors duration-200 ${
                viewMode === 'grid' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ImageIcon size={18} />
            </button>
            <button
              onClick={() => setViewMode('stats')}
              className={`px-4 py-2 rounded-r-lg transition-colors duration-200 ${
                viewMode === 'stats' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Dataset Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard 
          title="Total Images" 
          value={datasetStats.total} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Cat Images" 
          value={datasetStats.classes.cat} 
          color="bg-orange-500"
        />
        <StatCard 
          title="Dog Images" 
          value={datasetStats.classes.dog} 
          color="bg-green-500"
        />
        <StatCard 
          title="Training Set" 
          value={datasetStats.splits.train} 
          subtitle="70% of dataset"
          color="bg-purple-500"
        />
        <StatCard 
          title="Test/Val Sets" 
          value={datasetStats.splits.validation + datasetStats.splits.test} 
          subtitle="30% of dataset"
          color="bg-pink-500"
        />
      </div>

      {viewMode === 'stats' ? (
        /* Statistics View */
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Class Distribution
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Cats</span>
                  <span className="text-sm text-gray-600">50%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Dogs</span>
                  <span className="text-sm text-gray-600">50%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Data Split
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Training</span>
                  <span className="text-sm text-gray-600">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Validation</span>
                  <span className="text-sm text-gray-600">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Test</span>
                  <span className="text-sm text-gray-600">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dataset Information</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Source:</span>
                  <span className="font-medium">Kaggle Cats vs Dogs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Image Format:</span>
                  <span className="font-medium">JPG, PNG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolution:</span>
                  <span className="font-medium">224×224 pixels</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color Space:</span>
                  <span className="font-medium">RGB</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Preprocessing:</span>
                  <span className="font-medium">Normalized [0,1]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Augmentation:</span>
                  <span className="font-medium">Rotation, Flip, Zoom</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quality Check:</span>
                  <span className="font-medium text-green-600">Validated</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">Dec 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Classes</option>
                <option value="cat">Cats Only</option>
                <option value="dog">Dogs Only</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Search className="w-4 h-4" />
              <span>Showing {filteredImages.length} of {sampleImages.length} images</span>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 group">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={`${image.class} sample`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) {
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center" style={{ display: 'none' }}>
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-sm font-medium">
                      View Details
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      image.class === 'cat' 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {image.class.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      image.split === 'train' 
                        ? 'bg-blue-100 text-blue-700'
                        : image.split === 'validation'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {image.split}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 truncate font-mono">{image.filename}</p>
                  <p className="text-xs text-gray-500">{image.size}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Load More Images
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Showing {filteredImages.length} of 400 total images
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetView;