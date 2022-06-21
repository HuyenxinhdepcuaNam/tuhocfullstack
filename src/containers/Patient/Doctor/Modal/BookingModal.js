import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select'
import { postPatientBookAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify';
import { lang } from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            timeType: '',


        }
    }
    async componentDidMount() {
        this.props.getGenders()
    }
    builDataGender = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap

                result.push(object)
            })
        }
        return result
    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language, genders, dataTime } = this.props
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.builDataGender(genders)
            })
        }
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.builDataGender(genders)
            })
        }
        if (prevProps.dataTime !== dataTime) {
            if (dataTime && !_.isEmpty(dataTime)) {
                let doctorId = dataTime.doctorId
                let timeType = dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
                console.log('check datatime', this.state)
            }
        }

    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeGender = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    };
    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime()
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType
        })
        if (res && res.errCode === 0) {
            toast.success('Confirm succedded!')
            this.props.closeBookingModal()
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                selectedGender: '',
                doctorId: '',
                timeType: '',
            })
        } else {
            toast.error('Error...')
        }
        console.log('check confirm', this.state)
    }

    render() {
        let { genders, selectedGender } = this.state
        let { language } = this.props
        let { isOpenModalBooking, closeBookingModal, dataTime } = this.props
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''
        console.log('check this.state', this.state)
        return (
            <React.Fragment>

                <Modal
                    isOpen={isOpenModalBooking}
                    // toggle={''}
                    className={'booking-modal-container'}
                    centered
                    size="lg"
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id='patient.bookingModal.inforBooking' /></span>
                            <span className='right'
                                onClick={closeBookingModal}
                            >
                                <i className="fas fa-times-circle"></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                />
                            </div>
                            <div className='row container'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.bookingModal.name' /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.bookingModal.phoneNumber' /></label>
                                    <input className='form-control'
                                        placeholder={language === LANGUAGES.EN ? 'Phone number' : 'Số điện thoại'}
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.bookingModal.email' /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.bookingModal.address' /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id='patient.bookingModal.reason' /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.bookingModal.birthday' /></label>
                                    <DatePicker className='form-control'
                                        value={this.state.birthday}
                                        onChange={this.handleOnchangeDatePicker}
                                    />

                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.bookingModal.genders' /></label>
                                    <Select className=''
                                        value={selectedGender}
                                        onChange={this.handleChangeGender}
                                        options={genders}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button
                                className='btn btn-primary btn-confirm'
                                onClick={() => this.handleConfirmBooking()}
                            >
                                <FormattedMessage id='patient.bookingModal.confirm' />
                            </button>
                            <button
                                className='btn btn-secondary btn-cancel'
                                onClick={closeBookingModal}
                            >
                                <FormattedMessage id='patient.bookingModal.cancel' />
                            </button>
                        </div>
                    </div>
                </Modal>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
