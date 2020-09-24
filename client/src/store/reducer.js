const initialState = {
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const newMessages = [...state.messages];
      newMessages.push({
        id: action.payload.id,
        type: action.payload.type,
        message: action.payload.message,
      });
      return { messages: newMessages };
    case 'REMOVE_MESSAGE':
      return {
        messages: state.messages.filter((mes) => mes.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default reducer;
