import { createStore, combineReducers } from 'redux';

import RepoContributorsReducer from './reducer_repo_contributors';

const rootReducer = combineReducers({

    repoContributors: RepoContributorsReducer,

  });
  
  const store = createStore(rootReducer);
  export default rootReducer;