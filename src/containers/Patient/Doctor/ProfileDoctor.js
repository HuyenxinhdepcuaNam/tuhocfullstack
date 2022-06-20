import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { FormattedMessage } from 'react-intl'
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }
    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }

        }
        return result
    }
    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {

        }

    }
    titleCase = (string) => {
        return string[0].toUpperCase() + string.substr(1).toLowerCase()
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let timeVi = moment.unix(dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            let timeEn = moment.unix(dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let date = language === LANGUAGES.VI
                ? `${dataTime.timeTypeData.valueVi} - ${this.titleCase(timeVi)}`
                : `${dataTime.timeTypeData.valueEn} - ${timeEn}`
            return (
                <>
                    <div>{date}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }

    }

    render() {
        let { language, isShowDescriptionDoctor, dataTime } = this.props
        let { dataProfile } = this.state
        let nameEn = '', nameVi = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.lastName} ${dataProfile.firstName}`
        }
        console.log('check this state Profile doctor', dataTime)
        return (
            <React.Fragment>
                <div className='profile-doctor-container'>

                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ""})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {isShowDescriptionDoctor === true
                                    ?
                                    <>
                                        {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                            <span>{dataProfile.Markdown.description}</span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>

                                }
                            </div>
                        </div>
                    </div>
                    <div className='price '> Giá khám:
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI
                            ? <NumberFormat
                                className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'} />
                            : ''}
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
                            ? <NumberFormat
                                className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'} />
                            : ''}

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
