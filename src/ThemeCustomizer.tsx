import { useState } from 'react';
import { useTheme, themePresets, RGBTheme } from './ThemeContext';
import { Palette, X, Check, Sparkles } from 'lucide-react';

export const ThemeCustomizer = () => {
  const { theme, customTheme, setCustomTheme, applyPreset, resetTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [tempColors, setTempColors] = useState<RGBTheme>(
    customTheme || {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
    }
  );

  const handleApplyCustom = () => {
    setCustomTheme(tempColors);
    setShowCustomPicker(false);
  };

  return (
    <>
      {/* Theme Customizer Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
        aria-label="Theme Customizer"
      >
        <Palette className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        {theme === 'custom' && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
        )}
      </button>

      {/* Customizer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Theme Customizer</h2>
                  <p className="text-sm text-gray-400">Personalize your experience</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Preset Themes */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-400" />
                  Preset Themes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {themePresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        applyPreset(preset);
                        setIsOpen(false);
                      }}
                      className="group relative overflow-hidden rounded-xl border-2 border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <div
                        className="h-24 w-full transition-transform group-hover:scale-110"
                        style={{ background: preset.gradient }}
                      ></div>
                      <div className="p-3 bg-gray-800/80 backdrop-blur-sm">
                        <p className="text-white font-medium text-sm">{preset.name}</p>
                        {theme === 'custom' && 
                         customTheme?.primary === preset.colors.primary && (
                          <Check className="absolute top-2 right-2 w-5 h-5 text-green-400 bg-gray-900/80 rounded-full p-0.5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color Picker */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Custom Colors
                  </h3>
                  <button
                    onClick={() => setShowCustomPicker(!showCustomPicker)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium"
                  >
                    {showCustomPicker ? 'Hide' : 'Customize'}
                  </button>
                </div>

                {showCustomPicker && (
                  <div className="space-y-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                    {/* Primary Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={tempColors.primary}
                          onChange={(e) => setTempColors({ ...tempColors, primary: e.target.value })}
                          className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-600"
                        />
                        <input
                          type="text"
                          value={tempColors.primary}
                          onChange={(e) => setTempColors({ ...tempColors, primary: e.target.value })}
                          className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        />
                      </div>
                    </div>

                    {/* Secondary Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={tempColors.secondary}
                          onChange={(e) => setTempColors({ ...tempColors, secondary: e.target.value })}
                          className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-600"
                        />
                        <input
                          type="text"
                          value={tempColors.secondary}
                          onChange={(e) => setTempColors({ ...tempColors, secondary: e.target.value })}
                          className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        />
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Accent Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={tempColors.accent}
                          onChange={(e) => setTempColors({ ...tempColors, accent: e.target.value })}
                          className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-600"
                        />
                        <input
                          type="text"
                          value={tempColors.accent}
                          onChange={(e) => setTempColors({ ...tempColors, accent: e.target.value })}
                          className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        />
                      </div>
                    </div>

                    {/* Preview */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preview
                      </label>
                      <div className="h-20 rounded-lg" style={{
                        background: `linear-gradient(135deg, ${tempColors.primary} 0%, ${tempColors.secondary} 50%, ${tempColors.accent} 100%)`
                      }}></div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleApplyCustom}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium"
                      >
                        Apply Custom Theme
                      </button>
                      <button
                        onClick={() => {
                          resetTheme();
                          setShowCustomPicker(false);
                        }}
                        className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Theme Info */}
              {theme === 'custom' && customTheme && (
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-300 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Custom theme active! Your preferences are saved.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

