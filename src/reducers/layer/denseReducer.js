export default (state={
  name: "dense_0",
  neurons: 1
}, action) => {
  switch (action.type) {
    case "CHANGE_NEURONS":
      return {...state, neurons: action.neurons};
  }
  return state;
}
