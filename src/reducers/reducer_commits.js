import { FETCH_COMMITS } from '../actions/index';

export default function(state = [], action){
    switch(action.type){
        case FETCH_COMMITS:
            return action.payload.data;
    }
    return state;
}