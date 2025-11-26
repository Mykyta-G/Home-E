/**
 * Preset Manager Utility
 * Handles saving and loading widget layout presets using localStorage
 */

const STORAGE_KEY = 'dashboard_presets';

/**
 * Export current widget layout to preset object
 * @param {Array} widgets - Array of widget objects
 * @param {string} presetName - Name for the preset (optional, auto-generated if not provided)
 * @returns {Object} Preset object
 */
export const exportPreset = (widgets, presetName = null) => {
  // Create a clean copy of widgets without reactive properties
  const widgetsData = widgets.map(widget => ({
    id: widget.id,
    type: widget.type,
    size: widget.size,
    ...(widget.title && { title: widget.title }),
    ...(widget.content && { content: widget.content }),
    // Include any other widget-specific config
  }));

  // Auto-generate name if not provided
  const name = presetName || `Layout ${new Date().toLocaleString()}`;

  return {
    id: Date.now().toString(), // Unique ID for the preset
    name: name,
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    widgets: widgetsData
  };
};

/**
 * Validate preset structure
 * @param {Object} preset - Preset object to validate
 * @returns {boolean} True if valid
 */
export const validatePreset = (preset) => {
  if (!preset || typeof preset !== 'object') return false;
  if (!preset.widgets || !Array.isArray(preset.widgets)) return false;
  
  // Validate each widget
  for (const widget of preset.widgets) {
    if (!widget.type || !widget.size) return false;
    if (!['full', 'half'].includes(widget.size)) return false;
  }
  
  return true;
};

/**
 * Get all saved presets from localStorage
 * @returns {Array} Array of preset objects
 */
export const getAllPresets = () => {
  try {
    const presetsJson = localStorage.getItem(STORAGE_KEY);
    if (!presetsJson) return [];
    return JSON.parse(presetsJson);
  } catch (error) {
    console.error('Error loading presets:', error);
    return [];
  }
};

/**
 * Save preset to localStorage
 * @param {Object} preset - Preset object
 * @returns {Object} Result object with success status
 */
export const savePreset = (preset) => {
  try {
    if (!validatePreset(preset)) {
      return { success: false, message: 'Invalid preset format' };
    }

    const presets = getAllPresets();
    
    // For "Current Layout", always update the existing one if it exists
    if (preset.name === 'Current Layout') {
      const existingIndex = presets.findIndex(p => p.name === 'Current Layout');
      if (existingIndex !== -1) {
        // Update existing "Current Layout" preset
        presets[existingIndex] = preset;
      } else {
        // Add new "Current Layout" preset
        presets.push(preset);
      }
    } else {
      // For other presets, check if preset with same name already exists
      const existingIndex = presets.findIndex(p => p.name === preset.name);
      if (existingIndex !== -1) {
        // Update existing preset
        presets[existingIndex] = preset;
      } else {
        // Add new preset
        presets.push(preset);
      }
    }
    
    // Sort by creation date (newest first), but keep "Current Layout" at the top
    presets.sort((a, b) => {
      if (a.name === 'Current Layout') return -1;
      if (b.name === 'Current Layout') return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    return { success: true, message: 'Preset saved successfully' };
  } catch (error) {
    console.error('Error saving preset:', error);
    return { success: false, message: 'Error saving preset: ' + error.message };
  }
};

/**
 * Get preset by ID
 * @param {string} presetId - Preset ID
 * @returns {Object|null} Preset object or null if not found
 */
export const getPresetById = (presetId) => {
  const presets = getAllPresets();
  return presets.find(p => p.id === presetId) || null;
};

/**
 * Delete preset by ID
 * @param {string} presetId - Preset ID
 * @returns {Object} Result object with success status
 */
export const deletePreset = (presetId) => {
  try {
    const presets = getAllPresets();
    const filtered = presets.filter(p => p.id !== presetId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return { success: true, message: 'Preset deleted successfully' };
  } catch (error) {
    console.error('Error deleting preset:', error);
    return { success: false, message: 'Error deleting preset: ' + error.message };
  }
};

/**
 * Import preset widgets into dashboard
 * @param {Object} preset - Preset object
 * @param {Function} addWidget - Function to add widget
 * @param {Function} clearWidgets - Function to clear all widgets
 * @param {Function} reorderWidgets - Function to reorder widgets
 */
export const importPreset = (preset, { addWidget, clearWidgets, reorderWidgets }) => {
  if (!validatePreset(preset)) {
    throw new Error('Invalid preset format');
  }
  
  // Clear existing widgets
  clearWidgets();
  
  // Add widgets in order - they will be added sequentially
  preset.widgets.forEach(widget => {
    const config = {
      size: widget.size,
      ...(widget.title && { title: widget.title }),
      ...(widget.content && { content: widget.content }),
    };
    addWidget(widget.type, config);
  });
  
  // Note: Widgets are already in the correct order since we added them sequentially
  // No need to reorder if the store maintains insertion order
};

