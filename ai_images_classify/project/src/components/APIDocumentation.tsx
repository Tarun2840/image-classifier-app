import React, { useState } from 'react';
import { Code, Play, Copy, CheckCircle, ExternalLink, Server } from 'lucide-react';

const APIDocumentation: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('/predict');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints = [
    {
      path: '/predict',
      method: 'POST',
      description: 'Classify an uploaded image',
      parameters: [
        { name: 'file', type: 'File', required: true, description: 'Image file (JPG, PNG)' },
      ],
      response: {
        class: 'string',
        confidence: 'number',
        processing_time: 'number',
      },
    },
    {
      path: '/health',
      method: 'GET',
      description: 'Check API health status',
      parameters: [],
      response: {
        status: 'string',
        timestamp: 'string',
        version: 'string',
      },
    },
    {
      path: '/model/info',
      method: 'GET',
      description: 'Get model information',
      parameters: [],
      response: {
        model_name: 'string',
        version: 'string',
        accuracy: 'number',
        classes: 'array',
      },
    },
  ];

  const codeExamples = {
    python: `import requests

# Upload and classify an image
url = "http://localhost:8000/predict"
files = {"file": open("image.jpg", "rb")}

response = requests.post(url, files=files)
result = response.json()

print(f"Class: {result['class']}")
print(f"Confidence: {result['confidence']:.2%}")`,
    
    javascript: `// Using fetch API
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('http://localhost:8000/predict', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Class:', data.class);
  console.log('Confidence:', data.confidence);
});`,
    
    curl: `# Classify an image using cURL
curl -X POST "http://localhost:8000/predict" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@image.jpg"`,
  };

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activeEndpointData = endpoints.find(e => e.path === activeEndpoint);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">FastAPI Documentation</h1>
        <p className="text-lg text-gray-600">
          Complete API reference for the image classification service
        </p>
      </div>

      {/* API Overview */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Server className="w-6 h-6 mr-2" />
            API Overview
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-600">API Status: Online</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Base URL:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-blue-600">http://localhost:8000</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Content-Type:</span>
              <code className="bg-gray-100 px-2 py-1 rounded">multipart/form-data</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Authentication:</span>
              <span className="font-medium text-green-600">None Required</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Rate Limit:</span>
              <span className="font-medium">100 requests/minute</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max File Size:</span>
              <span className="font-medium">10 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Supported Formats:</span>
              <span className="font-medium">JPG, PNG, GIF</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <a
            href="#"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ExternalLink size={16} />
            <span>Interactive Swagger UI</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ExternalLink size={16} />
            <span>OpenAPI Specification</span>
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Endpoints List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoints</h3>
            <div className="space-y-2">
              {endpoints.map((endpoint) => (
                <button
                  key={endpoint.path}
                  onClick={() => setActiveEndpoint(endpoint.path)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    activeEndpoint === endpoint.path
                      ? 'bg-blue-50 border-l-4 border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      endpoint.method === 'POST' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-sm font-mono">{endpoint.path}</code>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{endpoint.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Endpoint Details */}
        <div className="lg:col-span-2 space-y-6">
          {activeEndpointData && (
            <>
              {/* Endpoint Info */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded font-medium text-sm ${
                    activeEndpointData.method === 'POST' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {activeEndpointData.method}
                  </span>
                  <code className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
                    {activeEndpointData.path}
                  </code>
                </div>
                
                <p className="text-gray-600 mb-6">{activeEndpointData.description}</p>

                {/* Parameters */}
                {activeEndpointData.parameters.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Parameters</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 text-gray-600">Name</th>
                            <th className="text-left py-2 text-gray-600">Type</th>
                            <th className="text-left py-2 text-gray-600">Required</th>
                            <th className="text-left py-2 text-gray-600">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeEndpointData.parameters.map((param, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2 font-mono text-blue-600">{param.name}</td>
                              <td className="py-2 font-mono text-gray-600">{param.type}</td>
                              <td className="py-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  param.required 
                                    ? 'bg-red-100 text-red-700' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {param.required ? 'Required' : 'Optional'}
                                </span>
                              </td>
                              <td className="py-2 text-gray-600">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Response */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Response</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm">
                      <code className="text-gray-800">
                        {JSON.stringify(activeEndpointData.response, null, 2)}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Code Examples */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Code Examples
                </h3>
                
                <div className="space-y-6">
                  {Object.entries(codeExamples).map(([language, code]) => (
                    <div key={language}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 capitalize">{language}</h4>
                        <button
                          onClick={() => copyToClipboard(code, language)}
                          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                          {copiedCode === language ? (
                            <>
                              <CheckCircle size={16} className="text-green-600" />
                              <span className="text-green-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre>
                          <code className="text-gray-100 text-sm">{code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Try It Out */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Try It Out
                </h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm mb-3">
                    Test the API endpoints directly from your browser or use the interactive Swagger UI.
                  </p>
                  <div className="flex items-center space-x-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors duration-200">
                      Open Swagger UI
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Test with Postman
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;