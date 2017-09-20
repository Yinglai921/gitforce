import { FETCH_REPO_CONTRIBUTORS_DATA } from '../actions/index';

export default function(state = [], action){
    switch(action.type){
        case FETCH_REPO_CONTRIBUTORS_DATA:
            return action.payload.data;
    }
    return state;
}