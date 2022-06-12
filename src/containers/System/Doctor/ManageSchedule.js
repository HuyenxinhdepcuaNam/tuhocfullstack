import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { CRUD_ACTION, LANGUAGES } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: {},
            listDoctors: [],
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetAllDoctors()
        this.props.fetchAllcodeScheduleTime()

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })

        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.builDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    builDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelEn = `${item.lastName} ${item.firstName}`
                let labelVi = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }


    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleSave = () => {
    }
    render() {
        console.log('check props', this.state)
        let { rangeTime } = this.state
        let { language } = this.props
        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className="m-s-title py-3">
                        <FormattedMessage id='manage-schedule.title' />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={'manage-schedule.choose-doctor'} /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={'manage-schedule.choose-date'} /></label>
                                <DatePicker className='form-control'
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                    onChange={this.handleOnchangeDatePicker} />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                    return (<button className='btn btn-schedule ' key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>)
                                })}
                            </div>
                            <div className='col-12'>
                                <button
                                    onClick={this.handleSave}
                                    className='btn btn-danger  my-3 btn-save-schedule'>
                                    <FormattedMessage id='manage-schedule.save' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetAllDoctors: () => dispatch(actions.fetAllDoctors()),
        fetchAllcodeScheduleTime: () => dispatch(actions.fetchAllcodeScheduleTime())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
