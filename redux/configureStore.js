import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes.js';
import {comments} from './comments.js';
import {leaders} from './leaders.js';
import {promotions} from './promotions.js';
import { favorites } from './favorites';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}