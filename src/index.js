const GLOBAL_LOADING = 'GLOBAL_LOADING';

const stopAction = {
    type: GLOBAL_LOADING,
    loading: false
}

function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => (next) => (action) => {
      if (typeof action === 'function') {
          dispatch({
              type: GLOBAL_LOADING,
              loading: true
          });

          const asyncAction = action(dispatch, getState, extraArgument);

          if(asyncAction && asyncAction.constructor.name === 'Promise') {
              asyncAction.then(() => {
                  dispatch(stopAction)
              }).catch(() => {
                  dispatch(stopAction);
              })
          } else {
              dispatch(stopAction);
          }
          return;
      }
  
      return next(action);
    };
  }
  
  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  
  export default thunk;
