import {CLEAR_ERRORS, SET_ERROR} from "../actionTypes";


export const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    };
};

export const resetError = (errorType) => {
    return {
        type: CLEAR_ERRORS,
    };
};