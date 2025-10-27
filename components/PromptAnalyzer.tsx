'use client';

import { useState } from 'react';
import { PromptAnalysis } from '@/types';

export default function PromptAnalyzer() {
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-600';
    if (score >= 60) return 'from-orange-400 to-coral-500';
    return 'from-red-400 to-orange-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            🐙 OctoPrompt
          </h1>
          <p className="text-xl text-blue-100">
            Donnez des bras à vos idées
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-blue-400/30 mb-8">
          <label className="block text-white text-sm font-semibold mb-3">
            Entrez votre prompt :
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Explique-moi le cloud computing..."
            className="w-full h-40 bg-blue-900/30 text-white placeholder-blue-200/50 border border-blue-400/30 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !prompt.trim()}
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyse en cours...' : '🔍 Analyser le Prompt'}
          </button>
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-blue-400/30">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Score du Prompt
                </h2>
                <div className={`text-8xl font-bold bg-gradient-to-r ${getScoreColor(analysis.score)} bg-clip-text text-transparent mb-2`}>
                  {analysis.score}
                </div>
                <div className="text-blue-200">/ 100</div>
                
                {/* Progress Bar */}
                <div className="mt-6 w-full bg-blue-900/50 rounded-full h-4 overflow-hidden border border-blue-400/20">
                  <div
                    className={`h-full bg-gradient-to-r ${getScoreColor(analysis.score)} transition-all duration-1000`}
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Generated Corrected Prompt */}
            {analysis.improvedPrompt && (
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-cyan-400/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                    ✨ Prompt Amélioré Automatiquement
                  </h3>
                  <button
                    onClick={() => copyToClipboard(analysis.improvedPrompt!)}
                    className="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
                  >
                    {copiedPrompt ? '✓ Copié!' : '📋 Copier'}
                  </button>
                </div>
                <div className="bg-white/10 border border-cyan-400/30 rounded-2xl p-6">
                  <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                    {analysis.improvedPrompt}
                  </p>
                </div>
                <p className="text-blue-200 text-sm mt-4">
                  💡 Ce prompt intègre toutes les meilleures pratiques détectées manquantes
                </p>
              </div>
            )}

            {/* Suggestions Card */}
            {analysis.suggestions.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-orange-400/30">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  💡 Suggestions d'amélioration
                </h3>
                <ul className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-blue-50 bg-blue-900/30 p-4 rounded-2xl border border-blue-400/20"
                    >
                      <span className="text-coral-400 font-bold text-lg">{index + 1}.</span>
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
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-emerald-400/30">
                  <h3 className="text-xl font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✓</span> Règles Respectées ({analysis.passedRules.length})
                  </h3>
                  <ul className="space-y-2">
                    {analysis.passedRules.map((rule, index) => (
                      <li
                        key={index}
                        className="text-white bg-emerald-500/20 p-3 rounded-2xl border border-emerald-400/20"
                      >
                        <div className="font-semibold text-emerald-200">{rule.name}</div>
                        <div className="text-sm text-blue-200">{rule.category}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Failed Rules */}
              {analysis.failedRules.length > 0 && (
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-coral-400/30">
                  <h3 className="text-xl font-semibold text-coral-300 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✗</span> À Améliorer ({analysis.failedRules.length})
                  </h3>
                  <ul className="space-y-2">
                    {analysis.failedRules.map((rule, index) => (
                      <li
                        key={index}
                        className="text-white bg-coral-500/20 p-3 rounded-2xl border border-coral-400/20"
                      >
                        <div className="font-semibold text-coral-200">{rule.name}</div>
                        <div className="text-sm text-blue-200">{rule.category}</div>
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
