import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  code?: string;
  link: string;
}

interface ProjectFiltersProps {
  projects: Project[];
  onFilteredProjects: (filtered: Project[]) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({ projects, onFilteredProjects }) => {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  // Get all unique technologies
  const allTech = Array.from(new Set(projects.flatMap(p => p.tech)));

  const handleTechToggle = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // Filter projects based on selected tech
  const filteredProjects = selectedTech.length === 0
    ? projects
    : projects.filter(p => selectedTech.some(t => p.tech.includes(t)));

  // Update parent component
  useEffect(() => {
    onFilteredProjects(filteredProjects);
  }, [selectedTech, projects, onFilteredProjects, filteredProjects]);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Code2 className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Filter by Technology</h3>
        {selectedTech.length > 0 && (
          <button
            onClick={() => setSelectedTech([])}
            className="ml-auto text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {allTech.map((tech) => {
          const isSelected = selectedTech.includes(tech);
          return (
            <motion.button
              key={tech}
              onClick={() => handleTechToggle(tech)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-blue-500 text-white border border-blue-400'
                  : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-blue-500/50'
              }`}
            >
              {tech}
            </motion.button>
          );
        })}
      </div>

      {selectedTech.length > 0 && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-gray-400"
        >
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} with{' '}
          {selectedTech.join(', ')}
        </motion.p>
      )}
    </div>
  );
};

