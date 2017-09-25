import { FETCH_COMMITS_TREE } from '../actions/index';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_COMMITS_TREE:
            return action.payload.data;
    }
    return state;
}