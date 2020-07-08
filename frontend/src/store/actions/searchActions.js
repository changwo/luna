import Axios from "../../axios";
import {
    SET_RESTAURANTS, SET_REVIEWS, SET_USER_PROFILES
} from "../actionTypes";


const setUserProfiles = (profiles) => {
    return {
        type: SET_USER_PROFILES,
        payload: profiles,
    };
};

export const getAllUserProfilesAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('users/list/');
        console.log("profiles list", response.data);
        dispatch(setUserProfiles(response.data))
        return response
    } catch (error) {
        console.log('error', error)
    }
}

const setRestaurants = (restaurants) => {
    return {
        type: SET_RESTAURANTS,
        payload: restaurants,
    };
};

export const getAllRestaurantsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('restaurants/');
        console.log("Restaurants list", response.data);
        dispatch(setRestaurants(response.data))
        return response
    } catch (error) {
        console.log('error', error)
    }
}

const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        payload: reviews,
    };
};

export const getAllReviewsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('restaurants/');
        console.log("Restaurants list", response.data);
        dispatch(setReviews(response.data))
        return response
    } catch (error) {
        console.log('error', error)
    }
}

export const getRestaurantsByCategoryAction = category => async (dispatch) => {
    try {
        const response = await Axios.get(`restaurants/category/?search=${category}/`);
        console.log(`Restaurants category (${category}) list: `, response.data);
        dispatch(setRestaurants(response.data))
        return response
    } catch (error) {
        console.log('error', error)
    }
}

export const generalSearchAction = (type,searchField)  => async (dispatch) => {
    try {
        const response = await Axios.get(`search/?type=${type}&search_string=${searchField}`);
        console.log(`General Search list: `, response.data);
        dispatch(setRestaurants(response.data))
        return response
    } catch (error) {
        console.log('error', error)
        return error
    }
}

export const getTopFourAction = ()  => async () => {
    try {
        const response = await Axios.get(`home/`);
        console.log(`Top four list: `, response.data);
        return response
    } catch (error) {
        console.log('error', error)
        return error
    }
}