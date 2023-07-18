import produce from 'immer';

import { ACTION_RESOLVE_CONFIG } from '../constants';

const initialState = {
  contentTypes: null,
  ignoreUnmatched: false,
  uppercase: true,
};

const configReducer = produce( ( previousState, action ) => {
  let state = previousState ?? initialState;

  switch ( action.type ) {
    case ACTION_RESOLVE_CONFIG:
      state.isLoading = false;
      state.config = action.data.config;
      break;

    default:
      return state;
  }

  return state;
} );

export default configReducer;
