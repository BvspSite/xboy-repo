import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillChartsProps {
  skills: Skill[];
}

export const SkillCharts: React.FC<SkillChartsProps> = ({ skills }) => {
  // Prepare data for Bar Chart
  const barData = skills.slice(0, 8).map(skill => ({
    name: skill.name.split(' ')[0], // Take first word
    level: skill.level
  }));

  // Prepare data for Radar Chart by category
  const categoryData = ['frontend', 'backend', 'tools', 'design'].map(category => {
    const categorySkills = skills.filter(s => s.category === category);
    const avgLevel = categorySkills.length > 0
      ? categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length
      : 0;
    return {
      category: category.charAt(0).toUpperCase() + category.slice(1),
      level: Math.round(avgLevel),
      fullMark: 100
    };
  });

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Bar Chart */}
      <motion.div
        variants={chartVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
      >
        <h3 className="text-xl font-bold text-white mb-6">Top Skills</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#60a5fa' }}
            />
            <Bar dataKey="level" fill="#3b82f6" radius={[8, 8, 0, 0]}>
              {barData.map((entry, index) => (
                <motion.cell
                  key={`cell-${index}`}
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        variants={chartVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
      >
        <h3 className="text-xl font-bold text-white mb-6">Skills by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={categoryData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="category" stroke="#9ca3af" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
            <Radar
              name="Skills"
              dataKey="level"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

