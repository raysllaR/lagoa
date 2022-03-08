const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('ACTION', action);
    console.log('PREVE_STATE', store.getState());
    const result = next(action);
    console.log('NEW_STATE', result);
    console.groupEnd();

    return result;
}

export default logger;