export default (state={
  neurons: 0
}, action) => {
  switch (action.type) {
    case "CHANGE_NEURONS":
      return {...state, neurons: action.neurons};
  }
  return state;
}
