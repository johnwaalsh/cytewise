'use client';

import { useState } from 'react';

type CitationStyle = 'APA' | 'MLA' | 'Chicago/Turabian' | 'Harvard' | 'IEEE' | 'Vancouver/NLM' | 'AMA' | 'CSE' | 'Bluebook' | 'ASA' | null;

interface CitationData {
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
  doi: string;
  volume: string;
  issue: string;
  pages: string;
  edition: string;
  year: string;
  month: string;
  day: string;
}

const citationStyles: CitationStyle[] = [
  'APA', 'MLA', 'Chicago/Turabian', 'Harvard', 'IEEE', 
  'Vancouver/NLM', 'AMA', 'CSE', 'Bluebook', 'ASA'
];

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState<CitationStyle>(null);
  const [citation, setCitation] = useState<CitationData>({
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
    url: '',
    doi: '',
    volume: '',
    issue: '',
    pages: '',
    edition: '',
    year: '',
    month: '',
    day: ''
  });

  const [generatedCitation, setGeneratedCitation] = useState<string>('');

  const handleInputChange = (field: keyof CitationData, value: string) => {
    setCitation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateCitation = () => {
    if (!selectedStyle) return;
    
    let formattedCitation = '';
    
    switch (selectedStyle) {
      case 'MLA':
        const mlaParts: string[] = [];
        if (citation.author) mlaParts.push(citation.author + '.');
        if (citation.title) mlaParts.push(`"${citation.title}."`);
        if (citation.containerTitle) mlaParts.push(`${citation.containerTitle},`);
        if (citation.otherContributors) mlaParts.push(citation.otherContributors + ',');
        if (citation.version) mlaParts.push(citation.version + ',');
        if (citation.number) mlaParts.push(citation.number + ',');
        if (citation.publisher) mlaParts.push(citation.publisher + ',');
        if (citation.publicationDate) mlaParts.push(citation.publicationDate + ',');
        if (citation.location) mlaParts.push(citation.location + '.');
        if (citation.url) mlaParts.push(`Web. ${citation.dateAccessed || 'Date'}. <${citation.url}>.`);
        formattedCitation = mlaParts.join(' ');
        break;
        
      case 'APA':
        const apaParts: string[] = [];
        if (citation.author) apaParts.push(citation.author);
        if (citation.year) apaParts.push(`(${citation.year}).`);
        if (citation.title) apaParts.push(`${citation.title}.`);
        if (citation.containerTitle) apaParts.push(`${citation.containerTitle},`);
        if (citation.volume) apaParts.push(`${citation.volume}${citation.issue ? `(${citation.issue})` : ''},`);
        if (citation.pages) apaParts.push(`${citation.pages}.`);
        if (citation.doi) apaParts.push(`https://doi.org/${citation.doi}`);
        else if (citation.url) apaParts.push(citation.url);
        formattedCitation = apaParts.join(' ');
        break;
        
      default:
        formattedCitation = 'Citation format coming soon...';
    }
    
    setGeneratedCitation(formattedCitation);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cytewise</h1>
          <p className="text-lg text-gray-600">Citation Generator</p>
        </header>

        {/* Citation Style Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Choose Citation Style</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {citationStyles.map((style) => (
              <button
                key={style}
                onClick={() => {
                  setSelectedStyle(style);
                  setGeneratedCitation('');
                }}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                  selectedStyle === style
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Citation Form */}
        {selectedStyle && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{selectedStyle} Citation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={citation.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
        )}
      </div>
    </div>
  );
}