// Material configs per [designPreset][surfaceType]
// Each returns props for <meshStandardMaterial>

export const MATERIALS = {
  budget: {
    floor:    { color: '#d4c9b4', roughness: 0.8, metalness: 0.0 },
    wall:     { color: '#f5f0e8', roughness: 0.9, metalness: 0.0 },
    ceiling:  { color: '#fafafa', roughness: 1.0, metalness: 0.0 },
    exterior: { color: '#c8b89a', roughness: 0.85, metalness: 0.0 },
    roof:     { color: '#8b6a4a', roughness: 0.9, metalness: 0.0 },
    glass:    { color: '#a8d8ea', roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.45 },
    wood:     { color: '#a0703a', roughness: 0.7, metalness: 0.0 },
    ground:   { color: '#7a9e5f', roughness: 1.0, metalness: 0.0 },
    concrete: { color: '#b0a898', roughness: 0.95, metalness: 0.0 },
    sofa:     { color: '#8b7355', roughness: 0.8, metalness: 0.0 },
    bed:      { color: '#9bb8d4', roughness: 0.8, metalness: 0.0 },
  },
  premium: {
    floor:    { color: '#c8b89a', roughness: 0.35, metalness: 0.05 },
    wall:     { color: '#f0ebe0', roughness: 0.8, metalness: 0.0 },
    ceiling:  { color: '#f8f6f2', roughness: 0.9, metalness: 0.0 },
    exterior: { color: '#d4c4a8', roughness: 0.7, metalness: 0.0 },
    roof:     { color: '#7a5a3a', roughness: 0.8, metalness: 0.05 },
    glass:    { color: '#b8e0f0', roughness: 0.02, metalness: 0.15, transparent: true, opacity: 0.35 },
    wood:     { color: '#8b5e2a', roughness: 0.5, metalness: 0.05 },
    ground:   { color: '#5a8a45', roughness: 0.95, metalness: 0.0 },
    concrete: { color: '#a8a098', roughness: 0.85, metalness: 0.02 },
    sofa:     { color: '#6b5b45', roughness: 0.6, metalness: 0.0 },
    bed:      { color: '#7a9ec4', roughness: 0.6, metalness: 0.0 },
  },
  luxury: {
    floor:    { color: '#e8e0d0', roughness: 0.1, metalness: 0.15 }, // marble
    wall:     { color: '#f4f0ec', roughness: 0.5, metalness: 0.0 },
    ceiling:  { color: '#ffffff', roughness: 0.6, metalness: 0.0 },
    exterior: { color: '#e0d4c0', roughness: 0.5, metalness: 0.05 },
    roof:     { color: '#6a4a2a', roughness: 0.6, metalness: 0.1 },
    glass:    { color: '#c8ecf8', roughness: 0.01, metalness: 0.2, transparent: true, opacity: 0.25 },
    wood:     { color: '#7a4e20', roughness: 0.3, metalness: 0.1 },
    ground:   { color: '#4a7a35', roughness: 0.9, metalness: 0.0 },
    concrete: { color: '#c0b8b0', roughness: 0.6, metalness: 0.05 },
    sofa:     { color: '#4a3828', roughness: 0.4, metalness: 0.0 },
    bed:      { color: '#5a8ab4', roughness: 0.4, metalness: 0.05 },
  },
  ultra: {
    floor:    { color: '#f0ece4', roughness: 0.02, metalness: 0.3 }, // polished marble
    wall:     { color: '#f8f4f0', roughness: 0.3, metalness: 0.05 },
    ceiling:  { color: '#ffffff', roughness: 0.4, metalness: 0.0 },
    exterior: { color: '#ece4d8', roughness: 0.3, metalness: 0.1 },
    roof:     { color: '#5a3a1a', roughness: 0.4, metalness: 0.2 },
    glass:    { color: '#d4f0fc', roughness: 0.0, metalness: 0.3, transparent: true, opacity: 0.2 },
    wood:     { color: '#6a3e18', roughness: 0.2, metalness: 0.15 },
    ground:   { color: '#3a6a28', roughness: 0.8, metalness: 0.0 },
    concrete: { color: '#d0c8c0', roughness: 0.4, metalness: 0.1 },
    sofa:     { color: '#2a1e14', roughness: 0.2, metalness: 0.05 },
    bed:      { color: '#3a6a94', roughness: 0.2, metalness: 0.1 },
  },
}

export function useMaterial(preset, surface) {
  return MATERIALS[preset]?.[surface] || MATERIALS.premium[surface] || {}
}
