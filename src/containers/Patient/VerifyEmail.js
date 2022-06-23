import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss'
import { FormattedMessage } from 'react-intl'
import { postVerifyBookAppointment } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader'

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search)
            const token = urlParams.get('token')
            const doctorId = urlParams.get('doctorId')
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: false,
                    errCode: -1
                })
            }
        }

    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {

        }

    }


    render() {
        let { language } = this.props
        let { statusVerify, errCode } = this.state

        return (
            <React.Fragment>
                <HomeHeader />
                <div className='container'>
                    {errCode === 0
                        ? <div className='verify-booking'>
                            You verified success!
                        </div>
                        : <div className='verify-booking'>
                            You verified fail!
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
