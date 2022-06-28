import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl'
import DatePicker from '../../../components/Input/DatePicker';


class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: new Date()
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {

        }

    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }


    render() {
        let { language } = this.props

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
                                        <th>Name</th>
                                        <th colSpan='2'>Telephone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>adsfd</td>
                                        <td>adsfd</td>
                                        <td>adsfd</td>
                                    </tr>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
