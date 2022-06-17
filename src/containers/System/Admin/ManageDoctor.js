import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGES } from '../../../utils'
import { getDetailInfoDoctor } from '../../../services/userService'



// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

        }
    }
    async componentDidMount() {
        this.props.fetAllDoctors()
        this.props.getAllRequiredDoctorInfor()

    }

    builDataInputSelect = (inputData, type) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelEn = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueEn
                let labelVi = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueVi
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
            let { resPayment, resProvince, resPrice } = this.props.allRequireDoctorInfor
            let dataSelectPrice = this.builDataInputSelect(resPrice,)
            let dataSelectPayment = this.builDataInputSelect(resPayment)
            let dataSelectProvince = this.builDataInputSelect(resProvince)
            console.log('get data from', dataSelectPrice)

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince

            })

            console.log('get data from redux', this.state)
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMardown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        })
        console.log('check this state', this.state)
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let res = await getDetailInfoDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,

            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,

            })
        }
        console.log('check selected Option value', res)
    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        let { hasOldData } = this.state
        console.log('get data from redux', this.state)

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id='admin.manage-doctor.title' /> </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id='admin.manage-doctor.introduction' /></label>
                        <textarea
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                            className='form-control ' >

                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row p-3' >
                    <div className='col-4 form-group row'>
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedPrice}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedPrice}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedPrice}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        />
                    </div>
                    <div className='col-4 form-group row'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Ghi chú</label>
                        <input className='form-control' />
                    </div>
                </div>
                <div className='manage-doctor-edit'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <div>
                    <button
                        onClick={() => this.handleSaveContentMardown()}
                        className={hasOldData === true
                            ? 'btn btn-primary my-3 save-content-doctor'
                            : 'btn btn-warning my-3 create-content-doctor'}>
                        {hasOldData === true
                            ? <FormattedMessage id='admin.manage-doctor.save' />
                            : <FormattedMessage id='admin.manage-doctor.create' />}
                    </button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequireDoctorInfor: state.admin.allRequireDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetAllDoctors: () => dispatch(actions.fetAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInforPrice()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
