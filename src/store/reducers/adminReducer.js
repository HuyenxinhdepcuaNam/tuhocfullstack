import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: []
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
        // get top doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctor
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILLED:
            state.topDoctors = []
            return {
                ...state
            }
        // get all doctors
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDoctors
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILLED:
            state.allDoctors = []
            return {
                ...state
            }
        // get all code schedule time
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILLED:
            state.allScheduleTime = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;