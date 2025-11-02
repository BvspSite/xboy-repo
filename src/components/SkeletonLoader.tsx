import React from 'react';

interface SkeletonLoaderProps {
  type?: 'text' | 'card' | 'circle' | 'rect';
  width?: string;
  height?: string;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'rect', 
  width, 
  height, 
  className = '' 
}) => {
  const baseClasses = 'animate-pulse bg-gray-800 rounded';
  
  if (type === 'text') {
    return (
      <div className={`h-4 bg-gray-800 rounded animate-pulse ${className}`} style={{ width }}></div>
    );
  }
  
  if (type === 'circle') {
    return (
      <div 
        className={`rounded-full bg-gray-800 animate-pulse ${className}`}
        style={{ width: width || '40px', height: height || '40px' }}
      ></div>
    );
  }
  
  if (type === 'card') {
    return (
      <div className={`bg-gray-800 rounded-lg animate-pulse ${className}`} style={{ width, height }}>
        <div className="h-48 bg-gray-700 rounded-t-lg"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`${baseClasses} ${className}`}
      style={{ width: width || '100%', height: height || '20px' }}
    ></div>
  );
};

// Project Card Skeleton
export const ProjectCardSkeleton = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
      <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
    </div>
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 bg-gray-700 rounded w-16"></div>
      <div className="h-6 bg-gray-700 rounded w-20"></div>
      <div className="h-6 bg-gray-700 rounded w-14"></div>
    </div>
    <div className="h-32 bg-gray-700 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-700 rounded w-24"></div>
  </div>
);

// Skill Card Skeleton
export const SkillCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex justify-between items-center mb-2">
      <div className="h-4 bg-gray-700 rounded w-24"></div>
      <div className="h-4 bg-gray-700 rounded w-12"></div>
    </div>
    <div className="h-3 bg-gray-700 rounded-full"></div>
  </div>
);

