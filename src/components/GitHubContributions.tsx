import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, TrendingUp, Star } from 'lucide-react';

interface GitHubContributionsProps {
  username: string;
}

export const GitHubContributions: React.FC<GitHubContributionsProps> = ({ username }) => {
  const [stats, setStats] = useState({
    contributions: 0,
    repositories: 0,
    stars: 0,
    loading: true
  });

  useEffect(() => {
    // Fetch GitHub stats (you'll need to use GitHub API or GitHub Actions)
    // For now, using placeholder data
    const fetchStats = async () => {
      try {
        // Example: You can use GitHub API here
        // const response = await fetch(`https://api.github.com/users/${username}`);
        // const data = await response.json();
        
        // Placeholder data
        setTimeout(() => {
          setStats({
            contributions: 1250,
            repositories: 25,
            stars: 180,
            loading: false
          });
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, [username]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (stats.loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <Github className="w-6 h-6 text-blue-400" />
        <h3 className="text-2xl font-bold text-white">GitHub Contributions</h3>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-blue-400 hover:text-blue-300 transition-colors"
        >
          View Profile →
        </a>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <motion.div
          variants={itemVariants}
          className="bg-gray-900/50 p-4 rounded-lg text-center"
        >
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {stats.contributions.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Contributions</div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-900/50 p-4 rounded-lg text-center"
        >
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {stats.repositories}
          </div>
          <div className="text-sm text-gray-400">Repositories</div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-900/50 p-4 rounded-lg text-center"
        >
          <div className="text-3xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-1">
            <Star className="w-5 h-5" />
            {stats.stars}
          </div>
          <div className="text-sm text-gray-400">Stars Received</div>
        </motion.div>
      </div>

      {/* Contribution Graph Placeholder */}
      <motion.div
        variants={itemVariants}
        className="mt-6 bg-gray-900/50 p-4 rounded-lg"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium text-gray-300">Contribution Activity</span>
        </div>
        <div className="h-32 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded flex items-end justify-around p-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-8 bg-blue-500 rounded-t"
              style={{
                height: `${Math.random() * 60 + 20}%`
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

