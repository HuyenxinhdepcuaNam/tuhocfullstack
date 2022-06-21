import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService'
import _ from 'lodash';
import { FormattedMessage } from 'react-intl'
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        let { language } = this.props
        let allDays = this.getArrDays(language)
        this.setState({
            allDays: allDays,
        })
    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDays(language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let labelVI = moment(new Date()).add(i, 'days').format('dddd-DD/MM')
                    object.label = this.titleCase(labelVI)
                }

            }
            if (language === LANGUAGES.EN) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM')
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            allDays.push(object)
        }
        return allDays

    }

    titleCase = (string) => {
        return string[0].toUpperCase() + string.substr(1).toLowerCase()
    }
    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }

        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {

        let { allDays, allAvailableTime, isOpenModalBooking,
            dataScheduleTimeModal } = this.state
        let { language } = this.props
        return (
            <React.Fragment>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value}
                                        key={index}>
                                        {item.label}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <span><i className="fas fa-calendar-alt"></i>
                                <FormattedMessage id='patient.detail-doctor.schedule' />
                            </span>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    {allAvailableTime.map((item, index) => {
                                        let times = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                        return (
                                            <button
                                                onClick={() => this.handleClickScheduleTime(item)}
                                                key={index}>
                                                {times}
                                            </button>
                                        )
                                    })}
                                </>
                                : <FormattedMessage id='patient.detail-doctor.doctor-schedule-notavailable' />
                            }
                        </div>
                        <div className='book-free'>
                            {allAvailableTime && allAvailableTime.length > 0
                                ? <span><FormattedMessage id='patient.detail-doctor.choose' />
                                    <i className="far fa-hand-pointer"></i>
                                    <FormattedMessage id='patient.detail-doctor.book-free' /></span>
                                : ''}

                        </div>
                    </div>
                </div>
                <BookingModal
                    dataTime={dataScheduleTimeModal}
                    isOpenModalBooking={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
