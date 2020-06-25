import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes.js';
import {comments} from './comments.js';
import {leaders} from './leaders.js';
import {promotions} from './promotions.js';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export const ConfigureStore = () => {
    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }
    const store = createStore(
        persistCombineReducers(config, {
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );
    const persistor = persistStore(store);
    return { persistor, store };
}