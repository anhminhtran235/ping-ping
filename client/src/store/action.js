export const displayMessage = (dispatch, message, type) => {
  const id = Math.random().toFixed(10);
  const payload = {
    id,
    message,
    type,
  };
  dispatch({ type: 'ADD_MESSAGE', payload });
  setTimeout(() => {
    dispatch({ type: 'REMOVE_MESSAGE', payload: { id } });
  }, 3000);
};
