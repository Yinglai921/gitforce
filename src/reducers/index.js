import { createStore, combineReducers } from 'redux';

import RepoContributorsReducer from './reducer_repo_contributors';
import CommitsReducer from './reducer_commits';
import CommitsTreeReducer from './reducer_commits_tree';

const rootReducer = combineReducers({

    repoContributors: RepoContributorsReducer,
    commits: CommitsReducer,
    commitsTree: CommitsTreeReducer,

  });
  
  const store = createStore(rootReducer);
  export default rootReducer;