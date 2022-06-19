import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUser = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getALLCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors')
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}
const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUser,
    editUserService, getALLCodeService,
    getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getDetailInfoDoctor,
    saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById,

}