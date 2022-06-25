import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { FormattedMessage } from 'react-intl'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [49, 45, 44]
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {

        }

    }


    render() {
        let { language } = this.props
        let { arrDoctorId } = this.state

        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>

                    <div className='description-specialty'>
                        Hello world from DetailSpecialty
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index} >
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                            // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <DoctorSchedule
                                            doctorIdFromParent={item}
                                        />
                                        <DoctorExtraInfor
                                            doctorIdFromParent={item}
                                        />
                                    </div>
                                </div>
                            )
                        })}

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
