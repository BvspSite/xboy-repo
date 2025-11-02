import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Command } from 'lucide-react';

interface SearchBarProps {
  projects: Array<{ title: string; description: string; tech: string[] }>;
  skills: Array<{ name: string; category: string }>;
  onClose?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ projects, skills, onClose }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredResults = {
    projects: projects.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(query.toLowerCase()))
    ),
    skills: skills.filter(s => 
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
    )
  };

  const hasResults = filteredResults.projects.length > 0 || filteredResults.skills.length > 0;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg border border-gray-700/50 text-gray-300 hover:text-white transition-all group"
        aria-label="Search (Ctrl+K)"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm">Search...</span>
        <kbd className="hidden lg:flex items-center gap-1 px-2 py-1 bg-gray-900/50 rounded text-xs border border-gray-700/50">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
          onClose?.();
        }}
      />
      
      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-700/50">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, skills..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <kbd className="hidden md:flex items-center gap-1 px-2 py-1 bg-gray-800/50 rounded text-xs border border-gray-700/50">
              ESC
            </kbd>
          </div>

          {/* Results */}
          {query && (
            <div className="max-h-96 overflow-y-auto">
              {!hasResults ? (
                <div className="p-8 text-center text-gray-400">
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                <>
                  {filteredResults.projects.length > 0 && (
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-400 mb-3">Projects</h3>
                      <div className="space-y-2">
                        {filteredResults.projects.map((project, idx) => (
                          <a
                            key={idx}
                            href="#projects"
                            onClick={() => {
                              setIsOpen(false);
                              setQuery('');
                              onClose?.();
                            }}
                            className="block p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                          >
                            <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                              {project.title}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">{project.description}</div>
                            <div className="flex gap-2 mt-2">
                              {project.tech.slice(0, 3).map((tech, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredResults.skills.length > 0 && (
                    <div className="p-4 border-t border-gray-700/50">
                      <h3 className="text-sm font-semibold text-gray-400 mb-3">Skills</h3>
                      <div className="space-y-2">
                        {filteredResults.skills.map((skill, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-gray-800/50"
                          >
                            <div className="font-medium text-white">{skill.name}</div>
                            <div className="text-xs text-gray-400 mt-1 capitalize">{skill.category}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Empty State */}
          {!query && (
            <div className="p-8 text-center text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search...</p>
              <p className="text-xs mt-2">Search for projects, skills, or technologies</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

