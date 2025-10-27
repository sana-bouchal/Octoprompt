'use client';

import { useState } from 'react';
import { PromptAnalysis } from '@/types';

export default function PromptAnalyzer() {
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
      }
    } catch (error) {
      console.error('Error analyzing prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-600';
    if (score >= 60) return 'from-yellow-400 to-orange-600';
    return 'from-red-400 to-pink-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            🐙 OctoPrompt
          </h1>
          <p className="text-xl text-gray-300">
            Donnez des bras à vos idées
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/20 mb-8">
          <label className="block text-gray-200 text-sm font-semibold mb-3">
            Entrez votre prompt :
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Explique-moi le cloud computing..."
            className="w-full h-40 bg-slate-900/50 text-white border border-purple-500/30 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !prompt.trim()}
            className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg disabled:cursor-not-allowed"
          >
            {loading ? 'Analyse en cours...' : 'Analyser le Prompt'}
          </button>
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/20">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">
                  Score du Prompt
                </h2>
                <div className={`text-8xl font-bold bg-gradient-to-r ${getScoreColor(analysis.score)} bg-clip-text text-transparent mb-2`}>
                  {analysis.score}
                </div>
                <div className="text-gray-400">/ 100</div>
                
                {/* Progress Bar */}
                <div className="mt-6 w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getScoreColor(analysis.score)} transition-all duration-1000`}
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Suggestions Card */}
            {analysis.suggestions.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/20">
                <h3 className="text-2xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                  💡 Suggestions d'amélioration
                </h3>
                <ul className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-300 bg-slate-900/50 p-4 rounded-lg border border-purple-500/10"
                    >
                      <span className="text-cyan-400 font-bold">{index + 1}.</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rules Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Passed Rules */}
              {analysis.passedRules.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-green-500/20">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">
                    ✓ Règles Respectées ({analysis.passedRules.length})
                  </h3>
                  <ul className="space-y-2">
                    {analysis.passedRules.map((rule, index) => (
                      <li
                        key={index}
                        className="text-gray-300 bg-slate-900/50 p-3 rounded-lg border border-green-500/10"
                      >
                        <div className="font-semibold text-green-300">{rule.name}</div>
                        <div className="text-sm text-gray-400">{rule.category}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Failed Rules */}
              {analysis.failedRules.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-red-500/20">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">
                    ✗ À Améliorer ({analysis.failedRules.length})
                  </h3>
                  <ul className="space-y-2">
                    {analysis.failedRules.map((rule, index) => (
                      <li
                        key={index}
                        className="text-gray-300 bg-slate-900/50 p-3 rounded-lg border border-red-500/10"
                      >
                        <div className="font-semibold text-red-300">{rule.name}</div>
                        <div className="text-sm text-gray-400">{rule.category}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
