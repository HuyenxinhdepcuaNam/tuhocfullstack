import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService'
import moment from 'moment';

class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }
    async componentDidMount() {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        this.getDataPatient(user, formatedDate)
    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {

        }

    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props
            let { currentDate } = this.state
            let formatedDate = new Date(currentDate).getTime()
            this.getDataPatient(user, formatedDate)
        })
    }
    getDataPatient = async (user, formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleBtnConfirm = () => {

    }
    handleBtnRemedy = () => {

    }

    render() {
        let { language, user } = this.props
        let { dataPatient } = this.state
        console.log('check state', this.state)
        return (
            <React.Fragment>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group '>
                            <label>Chọn ngày khám</label>
                            <DatePicker className='form-control'
                                value={this.state.currentDate}
                                onChange={this.handleOnchangeDatePicker} />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%' }} >
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPatient && dataPatient.length > 0
                                        && dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeTypeDataPatient.valueVi}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{item.patientData.genderData.valueVi}</td>
                                                    <td>
                                                        <button className='btn btn-success'
                                                            onClick={() => this.handleBtnConfirm()}
                                                        >
                                                            Confirm</button>
                                                        <button className='btn btn-secondary '
                                                            onClick={() => this.handleBtnRemedy()}

                                                        >
                                                            Send bill</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
