import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: []
}


const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // Gender
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false
            state.genders = action.data

            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false

            return {
                ...state
            }
        //Position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data

            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state
            }
        //Role
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state
            }
        // get all user
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILLED:
            state.users = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;