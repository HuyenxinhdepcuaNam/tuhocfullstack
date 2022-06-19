import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

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
        let { isOpenModalBooking, closeBookingModal, dataTime } = this.props
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''
        console.log('check props from booking modal', this.props)
        return (
            <React.Fragment>

                <Modal
                    isOpen={isOpenModalBooking}
                    toggle={''}
                    className={'booking-modal-container'}
                    centered
                    size="lg"
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                            <span className='right'
                                onClick={closeBookingModal}
                            >
                                <i className="fas fa-times-circle"></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                />
                            </div>
                            <div className='row container'>
                                <div className='col-6 form-group'>
                                    <label>Họ tên</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số điện thoại</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ email</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ liên hệ</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Lý do khám</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Đặt cho ai</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Giới tính</label>
                                    <input className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button
                                className='btn btn-primary btn-confirm'
                                onClick={closeBookingModal}
                            >
                                Xác nhận
                            </button>
                            <button
                                className='btn btn-secondary btn-cancel'
                                onClick={closeBookingModal}
                            >
                                Hủy
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
