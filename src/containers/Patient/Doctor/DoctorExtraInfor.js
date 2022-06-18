import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils'
import _ from 'lodash';
import { FormattedMessage } from 'react-intl'

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {

        }
    }
    showHideDetailInforDoctor = () => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor
        })
    }

    render() {
        let { isShowDetailInfor } = this.state
        console.log('check state', this.state)
        return (
            <React.Fragment>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                        <div className='name-clinic'>Phòng khám Bệnh viện Đại học Y Dược 1</div>
                        <div className='detail-address'>Phường 12, Quận 10, Tp. HCM</div>
                    </div>
                    <div className='content-down'>
                        {isShowDetailInfor === false ?
                            <div>GIÁ KHÁM: 250.000đ.
                                <span onClick={() => this.showHideDetailInforDoctor()}
                                    className='detail'>
                                    Xem chi tiết
                                </span>
                            </div>
                            :
                            <>
                                <div className='title-price'>GIÁ KHÁM</div>
                                <div className='detail-infor'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'> 250.000đ </span>
                                </div>
                                <div className='payment'>Phòng khám có thanh toán </div>
                                <div onClick={() => this.showHideDetailInforDoctor()}
                                    className='hide'>
                                    Ẩn bảng giá
                                </div>
                            </>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
