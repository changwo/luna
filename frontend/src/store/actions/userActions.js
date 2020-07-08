
import Axios from "../../axios";
import {setLoggedInUser} from "./loginActions";
import {userLogout} from "./logoutActions";



export const getLoggedInUserAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`users/me/`)
        dispatch(setLoggedInUser(response.data))
        localStorage.setItem("user", JSON.stringify(response.data));
        return response
    } catch (error) {
        console.log('error', error.response.data)
        return error
    }
}


export const updateUserAction = data => async (dispatch) => {
    try {
        const response = await Axios.patch(`users/me/`, data)
        console.log("in the patch:", response.data)
        dispatch(setLoggedInUser(response.data))
        return response
    } catch (error) {
        console.log('error', error.response.data)
        return error
    }
}

export const deleteUserAction = () => async (dispatch) => {
    try {
        const response = await Axios.delete(`me/`)
        console.log("in the delete")
        dispatch(userLogout())
        return response
    } catch (error) {
        console.log('error', error.response.data)
        return error
    }
}


