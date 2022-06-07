import actionTypes from "./actionTypes";
import {
    getALLCodeService, createNewUserService, getAllUsers,
    deleteUser, editUserService, getTopDoctorHomeService
} from '../../services/userService'
import { ToastContainer, toast } from 'react-toastify';



// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            })
            let res = await getALLCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('error', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

// POSITION

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getALLCodeService('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
        }
    }
}

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getALLCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
        }
    }
}

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

//CREATE USER

export const createNewUser = (data) => {
    return (async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            console.log('check create user ', res)
            if (res && res.errCode == 0) {
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("User Created!")

            } else {
                dispatch(saveUserFailled())
            }
        } catch (e) {
            dispatch(saveUserFailled())
        }
    })

}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})

export const saveUserFailled = () => ({
    type: actionTypes.CREATE_USER_FAILLED
})

//CREATE TABLE

export const fetchAllUserStart = () => {
    return (async (dispatch, getState) => {
        try {
            let res = await getAllUsers('All')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))

            } else {
                toast.error("Failled!")

                dispatch(fetchAllUserFailled())
            }
        } catch (e) {
            dispatch(fetchAllUserFailled())
        }
    })
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailled = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILLED
})

//delete user

export const deleteAUser = (userId) => {
    return (async (dispatch, getState) => {
        try {
            let res = await deleteUser(userId)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
                toast.warn("User Deleted!")
            } else {
                toast.error("Fail Deleted!")

                dispatch(deleteUserFailled())
            }
        } catch (e) {
            dispatch(deleteUserFailled())
        }
    })
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS

})
export const deleteUserFailled = () => ({
    type: actionTypes.DELETE_USER_FAILLED
})

// edit user
export const editAUser = (data) => {
    return (async (dispatch, getState) => {
        try {
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                dispatch(editAUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success('Updated!')
            } else {
                dispatch(editAUserFailled())
                toast.error('Update failled!')
            }
        } catch (e) {
            dispatch(editAUserFailled())
            toast.error('Update failled!')
        }
    })
}
export const editAUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editAUserFailled = () => ({
    type: actionTypes.EDIT_USER_FAILLED
})



export const fetTopDoctor = () => {
    return (async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILLED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILLED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILLED,
            })
        }
    })

}
