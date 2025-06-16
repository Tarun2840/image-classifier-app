import React, { useState } from 'react';
import { BarChart3, TrendingUp, Target, Clock, Award, AlertTriangle } from 'lucide-react';

const Performance: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');

  const performanceMetrics = {
    accuracy: {
      overall: 0.942,
      cat: 0.935,
      dog: 0.948,
      history: [0.89, 0.91, 0.925, 0.938, 0.942],
    },
    precision: {
      overall: 0.941,
      cat: 0.933,
      dog: 0.949,
      history: [0.88, 0.905, 0.923, 0.937, 0.941],
    },
    recall: {
      overall: 0.940,
      cat: 0.947,
      dog: 0.933,
      history: [0.885, 0.908, 0.921, 0.935, 0.940],
    },
    f1Score: {
      overall: 0.940,
      cat: 0.940,
      dog: 0.941,
      history: [0.882, 0.906, 0.922, 0.936, 0.940],
    },
  };

  const confusionMatrix = [
    [95, 5],
    [6, 94],
  ];

  const benchmarkComparison = [
    { model: 'Our Model', accuracy: 94.2, speed: 0.3, size: '12MB' },
    { model: 'ResNet50', accuracy: 91.8, speed: 0.8, size: '98MB' },
    { model: 'VGG16', accuracy: 89.5, speed: 1.2, size: '528MB' },
    { model: 'Inception V3', accuracy: 93.1, speed: 0.6, size: '92MB' },
  ];

  const performanceIssues = [
    {
      type: 'warning',
      title: 'Slight overfitting detected',
      description: 'Training accuracy is 2.3% higher than validation accuracy',
      recommendation: 'Consider adding more regularization or data augmentation',
    },
    {
      type: 'info',
      title: 'Model size optimization',
      description: 'Current model size is 12MB, suitable for mobile deployment',
      recommendation: 'Consider quantization for further size reduction if needed',
    },
  ];

  const currentMetric = performanceMetrics[selectedMetric as keyof typeof performanceMetrics];

  const MetricCard = ({ title, value, subtitle, trend, color }: {
    title: string;
    value: string;
    subtitle?: string;
    trend?: 'up' | 'down' | 'stable';
    color: string;
  }) => (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`w-3 h-3 rounded-full ${color}`} />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      {trend && (
        <div className={`flex items-center mt-2 text-xs ${
          trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
        }`}>
          <TrendingUp size={12} className="mr-1" />
          <span>Trend: {trend}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Model Performance</h1>
        <p className="text-lg text-gray-600">
          Comprehensive evaluation metrics and performance analysis
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Overall Accuracy"
          value="94.2%"
          subtitle="Test dataset"
          trend="up"
          color="bg-green-500"
        />
        <MetricCard
          title="Precision"
          value="94.1%"
          subtitle="Weighted average"
          trend="up"
          color="bg-blue-500"
        />
        <MetricCard
          title="Recall"
          value="94.0%"
          subtitle="Weighted average"
          trend="stable"
          color="bg-purple-500"
        />
        <MetricCard
          title="F1-Score"
          value="94.0%"
          subtitle="Weighted average"
          trend="up"
          color="bg-orange-500"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Detailed Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Detailed Metrics
            </h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="accuracy">Accuracy</option>
              <option value="precision">Precision</option>
              <option value="recall">Recall</option>
              <option value="f1Score">F1-Score</option>
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall</span>
                <span className="text-lg font-bold text-gray-900">
                  {(currentMetric.overall * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  style={{ width: `${currentMetric.overall * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Cat Classification</span>
                <span className="text-lg font-bold text-gray-900">
                  {(currentMetric.cat * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                  style={{ width: `${currentMetric.cat * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Dog Classification</span>
                <span className="text-lg font-bold text-gray-900">
                  {(currentMetric.dog * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                  style={{ width: `${currentMetric.dog * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Performance History */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Performance History</h4>
            <div className="h-32 flex items-end space-x-2">
              {currentMetric.history.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                    style={{ height: `${value * 100}%` }}
                    title={`${(value * 100).toFixed(1)}%`}
                  />
                  <span className="text-xs text-gray-500 mt-1">E{index + 16}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confusion Matrix */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Confusion Matrix
          </h3>
          
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div></div>
            <div className="font-medium text-gray-700">Predicted Cat</div>
            <div className="font-medium text-gray-700">Predicted Dog</div>
            
            <div className="font-medium text-gray-700">Actual Cat</div>
            <div className="bg-green-100 border-2 border-green-500 rounded p-4">
              <div className="text-2xl font-bold text-green-700">{confusionMatrix[0][0]}</div>
              <div className="text-xs text-green-600">True Positive</div>
            </div>
            <div className="bg-red-100 border-2 border-red-300 rounded p-4">
              <div className="text-2xl font-bold text-red-700">{confusionMatrix[0][1]}</div>
              <div className="text-xs text-red-600">False Negative</div>
            </div>
            
            <div className="font-medium text-gray-700">Actual Dog</div>
            <div className="bg-red-100 border-2 border-red-300 rounded p-4">
              <div className="text-2xl font-bold text-red-700">{confusionMatrix[1][0]}</div>
              <div className="text-xs text-red-600">False Positive</div>
            </div>
            <div className="bg-green-100 border-2 border-green-500 rounded p-4">
              <div className="text-2xl font-bold text-green-700">{confusionMatrix[1][1]}</div>
              <div className="text-xs text-green-600">True Negative</div>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-600 text-center">
            <p>Total Test Samples: 200 (100 cats, 100 dogs)</p>
            <p>Correctly Classified: 189 (94.5%)</p>
          </div>
        </div>
      </div>

      {/* Benchmark Comparison */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Benchmark Comparison
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-gray-600">Model</th>
                <th className="text-left py-3 text-gray-600">Accuracy</th>
                <th className="text-left py-3 text-gray-600">Inference Speed</th>
                <th className="text-left py-3 text-gray-600">Model Size</th>
                <th className="text-left py-3 text-gray-600">Performance Score</th>
              </tr>
            </thead>
            <tbody>
              {benchmarkComparison.map((model, index) => (
                <tr key={index} className={`border-b ${model.model === 'Our Model' ? 'bg-green-50' : ''}`}>
                  <td className="py-3 font-medium">
                    {model.model}
                    {model.model === 'Our Model' && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Best</span>
                    )}
                  </td>
                  <td className="py-3">{model.accuracy}%</td>
                  <td className="py-3 flex items-center">
                    <Clock size={14} className="mr-1 text-gray-400" />
                    {model.speed}s
                  </td>
                  <td className="py-3">{model.size}</td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            model.model === 'Our Model' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${(model.accuracy / 100) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{model.accuracy}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Issues & Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Analysis & Recommendations
        </h3>
        
        <div className="space-y-4">
          {performanceIssues.map((issue, index) => (
            <div key={index} className={`border-l-4 p-4 rounded-r-lg ${
              issue.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
              issue.type === 'error' ? 'border-red-500 bg-red-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 ${
                  issue.type === 'warning' ? 'bg-yellow-500' :
                  issue.type === 'error' ? 'bg-red-500' :
                  'bg-blue-500'
                }`} />
                <div>
                  <h4 className="font-medium text-gray-900">{issue.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                  <p className="text-sm font-medium text-gray-800 mt-2">
                    Recommendation: {issue.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;