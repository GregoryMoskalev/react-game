export default {
  onDifficultyChange: (difficulty: String) => ({type: 'DIFFICULTY_CHANGE', payload: difficulty}),
  onVolumeSettingChange: (soundType: String, level: Number) => ({
    type: 'VOLUME_SETTING_CHANGE',
    payload: {soundType, level}
  }),
}