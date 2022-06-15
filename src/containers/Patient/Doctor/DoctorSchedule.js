import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService'
import _ from 'lodash';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }
    async componentDidMount() {
        let { language } = this.props
        this.setArrDays(language)

    }

    componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        console.log('check moment vi', moment(new Date()).format('dddd-DD/MM'))
        console.log('check moment en', moment(new Date()).locale('en').format('ddd-DD/MM'))
        if (prevProps.language !== this.props.language) {
            this.setArrDays(language)
        }
    }

    setArrDays = (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                let labelVI = moment(new Date()).add(i, 'days').format('dddd-DD/MM')
                object.label = this.titleCase(labelVI)
            }
            if (language === LANGUAGES.EN) {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDate.push(object)
            console.log('check arrDay', arrDate)
        }
        this.setState({
            allDays: arrDate
        })
    }

    titleCase = (string) => {
        return string[0].toUpperCase() + string.substr(1).toLowerCase()
    }
    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log('check res', res)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }

        }
    }

    render() {

        let { allDays, allAvailableTime } = this.state
        let { language } = this.props
        console.log('check state', this.state)
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
                            <span><i className="fas fa-calendar-alt"></i> Lịch khám</span>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ? allAvailableTime.map((item, index) => {
                                let times = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                return (
                                    <button key={index}>{times}</button>
                                )
                            })
                                : 'Không có lịch hẹn khám bệnh.'
                            }
                        </div>
                    </div>
                </div>
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
