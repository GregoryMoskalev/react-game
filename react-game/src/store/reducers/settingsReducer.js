const initialState = {
  audioVolume: {
    sound: 0.3,
    music: 0,
  },
  difficulty: 'junior'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DIFFICULTY_CHANGE':
      return {
        ...state,
        difficulty: action.payload
      }
    case 'VOLUME_SETTING_CHANGE':
      const {soundType, level} = action.payload;
      return {
        ...state,
        audioVolume: {
          ...state.audioVolume,
          [soundType]: level
        }
      }
    default:
      return state;
  }
}