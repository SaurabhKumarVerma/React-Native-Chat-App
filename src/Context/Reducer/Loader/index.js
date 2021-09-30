import {LOADING_START, LOADING_STOP} from '../../Action/Types';

const initialState = {
  loading: false,
};

const Loader = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case LOADING_START:
      return {
        loading: true,
      };
    case LOADING_STOP:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export default Loader;
