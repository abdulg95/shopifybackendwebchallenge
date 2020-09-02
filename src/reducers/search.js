const searchReducer = (state = '', action) => {
    switch (action.type) {
      case 'CHANGE_SEARCH_FIELD':
        return action.text;
      default:
        return state;
    }
  };
  
  export default searchReducer;