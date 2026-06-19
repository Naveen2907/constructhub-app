import { create } from 'zustand'

export const useVisualizerStore = create((set) => ({
  // View & Camera
  viewMode: 'orbit', // orbit | fpv | child | wheelchair | drone
  lightingPreset: 'day', // day | night | sunrise | sunset | rain | cloudy
  designPreset: 'premium', // budget | premium | luxury | ultra

  // Scene toggles
  showRoof: true,
  showFurniture: true,
  showExterior: true,
  showAnalysis: false,
  activeAnalysis: null, // sunlight | ventilation | child | accessibility

  // Camera
  isTransitioning: false,

  // Interactions
  openDoors: [],
  hoveredRoom: null,

  // Actions
  setViewMode: (viewMode) => set({ viewMode }),
  setLightingPreset: (lightingPreset) => set({ lightingPreset }),
  setDesignPreset: (designPreset) => set({ designPreset }),
  toggleRoof: () => set((s) => ({ showRoof: !s.showRoof })),
  toggleFurniture: () => set((s) => ({ showFurniture: !s.showFurniture })),
  toggleExterior: () => set((s) => ({ showExterior: !s.showExterior })),
  toggleDoor: (id) =>
    set((s) => ({
      openDoors: s.openDoors.includes(id)
        ? s.openDoors.filter((d) => d !== id)
        : [...s.openDoors, id],
    })),
  setHoveredRoom: (hoveredRoom) => set({ hoveredRoom }),
  setActiveAnalysis: (activeAnalysis) =>
    set({ activeAnalysis, showAnalysis: !!activeAnalysis }),
}))
