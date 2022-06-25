import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils'
import _ from 'lodash';
import { getExtraInforDoctorById } from '../../../services/userService'
import { FormattedMessage } from 'react-intl'
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }
    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }
    }
    showHideDetailInforDoctor = () => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor
        })
    }

    render() {
        let { language } = this.props
        let { isShowDetailInfor, extraInfor } = this.state
        // let price = language === LANGUAGES.EN ? extraInfor.priceTypeData.valueEn : extraInfor.priceTypeData.value.Vi
        return (
            <React.Fragment>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'> <FormattedMessage id='patient.extraInfor.address' /> </div>
                        <div className='name-clinic'>
                            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                        </div>
                        <div className='detail-address'>
                            {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                        </div>
                    </div>
                    <div className='content-down'>


                        {isShowDetailInfor === false ?
                            <div className='short-infor'>  <FormattedMessage id='patient.extraInfor.price' />
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />}
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />}
                                <span onClick={() => this.showHideDetailInforDoctor()}
                                    className='detail'>
                                    <FormattedMessage id='patient.extraInfor.show' />
                                </span>
                            </div>
                            :
                            <>
                                <div className='title-price'> <FormattedMessage id='patient.extraInfor.price' /> </div>
                                <div className='detail-infor'>
                                    <span className='left'> <FormattedMessage id='patient.extraInfor.priceL' /></span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />}
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />}
                                    </span>
                                </div>
                                <div className='payment'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                                <div onClick={() => this.showHideDetailInforDoctor()}
                                    className='hide'>
                                    <FormattedMessage id='patient.extraInfor.hide' />
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
