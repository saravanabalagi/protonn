export default (state={
  neurons: 1
}, action) => {
  switch (action.type) {
    case "CHANGE_NEURONS":
      return {...state, neurons: action.neurons};
  }
  return state;
}
