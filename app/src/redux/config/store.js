import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from 'redux/reducers';

// import {composeWithDevTools} from 'redux-devtools-extension'

// const middleware = applyMiddleware(promise, thunk, createLogger());

// const customMiddleware = store => next => action => {
//     console.log(store, next, action);
//     next(action);
// };
const middleware = applyMiddleware(promise, thunk);

const persistConfig = {
    key: 'fitness',
    storage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
        })) ||
    compose;

const store = createStore(persistedReducer, composeEnhancers(middleware));
const persistor = persistStore(store);

export default store;
export { persistor };
