export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const SET_HELLO_RESULT = 'SET_HELLO_RESULT';

export function setLoadingStatus(loadingStatus) {
    return {
        type: SET_LOADING_STATUS,
        loadingStatus
    }
}

export function setHelloResult(helloResult) {
    return {
        type: SET_HELLO_RESULT,
        helloResult
    }
}