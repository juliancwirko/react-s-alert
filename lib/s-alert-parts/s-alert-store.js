// custom simple store based on a awesome Redux library https://github.com/rackt/redux

const createSAlertStore = (reducer) => {
    let state;
    let listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };
    dispatch({});
    return {
        getState, dispatch, subscribe
    };
};

const insert = (state, action) => {
    return [...state, action.data];
};

const remove = (state, action) => {
    let elemToRemoveArray = state.slice().filter(item => item.id === action.data.id);
    if (Array.isArray(elemToRemoveArray)) {
        let elemToRemoveIndex = state.indexOf(elemToRemoveArray[0]);
        return [
            ...state.slice(0, elemToRemoveIndex),
            ...state.slice(elemToRemoveIndex + 1)
        ];
    }
    return state;
};

const alertsReducer = (state = [], action) => {
    switch (action.type) {
    case 'INSERT':
        return insert(state, action);
    case 'REMOVE':
        return remove(state, action);
    case 'REMOVEALL':
        return [];
    default:
        return state;
    }
};

const sAlertStore = createSAlertStore(alertsReducer);

export default sAlertStore;
