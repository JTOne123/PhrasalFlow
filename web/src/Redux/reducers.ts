const initialState = {
    searchResults: null,
    error: null,
  };

  const rootReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case "SET_RESULTS":
        return { ...state, searchResults: action.payload, error: null };
      case "SET_ERROR":
        return { ...state, searchResults: null, error: "Error fetching data" };
      default:
        return state;
    }
  };
  
  export default rootReducer;