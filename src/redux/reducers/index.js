const initialState = {
  latLon: {
    content: [],
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_LATLON":
      return {
        ...state,
        latLon: {
          ...state.latLon,
          content: [...state.latLon.content, action.payload],
        },
      };
    default:
      return state;
  }
};

export default mainReducer;
