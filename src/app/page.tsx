'use client';

import { useState } from 'react';

interface MLACitation {
  author: string;
  title: string;
  containerTitle: string;
  otherContributors: string;
  version: string;
  number: string;
  publisher: string;
  publicationDate: string;
  location: string;
  dateAccessed: string;
  url: string;
}

export default function Home() {
  const [citation, setCitation] = useState<MLACitation>({
    author: '',
    title: '',
    containerTitle: '',
    otherContributors: '',
    version: '',
    number: '',
    publisher: '',
    publicationDate: '',
    location: '',
    dateAccessed: '',
    url: ''
  });

  const [generatedCitation, setGeneratedCitation] = useState<string>('');

  const handleInputChange = (field: keyof MLACitation, value: string) => {
    setCitation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateCitation = () => {
    const parts: string[] = [];
    
    if (citation.author) parts.push(citation.author + '.');
    if (citation.title) parts.push(`"${citation.title}."`);
    if (citation.containerTitle) parts.push(`${citation.containerTitle},`);
    if (citation.otherContributors) parts.push(citation.otherContributors + ',');
    if (citation.version) parts.push(citation.version + ',');
    if (citation.number) parts.push(citation.number + ',');
    if (citation.publisher) parts.push(citation.publisher + ',');
    if (citation.publicationDate) parts.push(citation.publicationDate + ',');
    if (citation.location) parts.push(citation.location + '.');
    if (citation.url) parts.push(`Web. ${citation.dateAccessed || 'Date'}. <${citation.url}>.`);
    
    setGeneratedCitation(parts.join(' '));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cytewise</h1>
          <p className="text-lg text-gray-600">Citation Generator</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">MLA Citation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={citation.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last, First M."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={citation.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Title of Source"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Container Title
              </label>
              <input
                type="text"
                value={citation.containerTitle}
                onChange={(e) => handleInputChange('containerTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Journal, Website, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Contributors
              </label>
              <input
                type="text"
                value={citation.otherContributors}
                onChange={(e) => handleInputChange('otherContributors', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Editor, Translator, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version
              </label>
              <input
                type="text"
                value={citation.version}
                onChange={(e) => handleInputChange('version', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2nd ed., Director's cut, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number
              </label>
              <input
                type="text"
                value={citation.number}
                onChange={(e) => handleInputChange('number', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="vol. 3, no. 2, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publisher
              </label>
              <input
                type="text"
                value={citation.publisher}
                onChange={(e) => handleInputChange('publisher', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Publisher Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Date
              </label>
              <input
                type="text"
                value={citation.publicationDate}
                onChange={(e) => handleInputChange('publicationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Day Month Year"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={citation.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="pp. 1-10, DOI, URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="url"
                value={citation.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Accessed
              </label>
              <input
                type="text"
                value={citation.dateAccessed}
                onChange={(e) => handleInputChange('dateAccessed', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Day Month Year"
              />
            </div>
          </div>

          <button
            onClick={generateCitation}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          >
            Generate Citation
          </button>

          {generatedCitation && (
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Generated Citation:</h3>
              <p className="text-gray-700 leading-relaxed">{generatedCitation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}