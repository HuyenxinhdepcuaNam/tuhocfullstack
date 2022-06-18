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
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelEn = `${item.lastName} ${item.firstName}`
                    let labelVi = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelEn = `${item.valueEn} USD`
                    let labelVi = `${item.valueVi}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelEn = item.valueEn
                    let labelVi = item.valueVi
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
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

        if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
            let { resPayment, resProvince, resPrice } = this.props.allRequireDoctorInfor
            let dataSelectPrice = this.builDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.builDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.builDataInputSelect(resProvince, 'PROVINCE')
            console.log('get data from', dataSelectPrice)

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince

            })

            console.log('get data from redux', this.state)
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors, 'USERS')
            let { resPayment, resProvince, resPrice } = this.props.allRequireDoctorInfor
            let dataSelectPrice = this.builDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.builDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.builDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
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
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        })
        console.log('check this state', this.state)
    }
    handleChangeSelect = async (selectedOption) => {
        let { language } = this.props
        let { listPayment, listPrice, listProvince } = this.state
        this.setState({ selectedOption })
        let res = await getDetailInfoDoctor(selectedOption.value)
        console.log('check selected Option value', selectedOption.value)

        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown

            let { addressClinic, nameClinic, note, paymentId,
                priceId, provinceId, selectedPayment, selectedPrice,
                selectedProvince } = ''
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.nameClinic
                note = res.data.Doctor_Infor.note
                paymentId = res.data.Doctor_Infor.paymentId
                priceId = res.data.Doctor_Infor.priceId
                provinceId = res.data.Doctor_Infor.provinceId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                this.setState({
                    addressClinic: addressClinic,
                    nameClinic: nameClinic,
                    note: note,
                    selectedPayment: selectedPayment,
                    selectedPrice: selectedPrice,
                    selectedProvince: selectedProvince

                })
                // priceId = language === LANGUAGES.EN ? res.data.Doctor_Infor.priceTypeData.valueEn : res.data.Doctor_Infor.priceTypeData.valueVi
                // provinceId = language === LANGUAGES.EN ? res.data.Doctor_Infor.provinceTypeData.valueEn : res.data.Doctor_Infor.provinceTypeData.valueVi
                // console.log('check paymentid', paymentId)
            } else {
                this.setState({
                    addressClinic: '',
                    nameClinic: '',
                    note: '',
                    selectedPayment: '',
                    selectedPrice: '',
                    selectedProvince: ''

                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,

                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince

            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,

                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: ''

            })
        }
    };
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
        console.log('check name', stateCopy, selectedOption, stateName)
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
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
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                            className='form-control ' >

                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row p-3' >
                    <div className='col-4 form-group row'>
                        <label><FormattedMessage id='admin.manage-doctor.price' /></label>
                        <Select
                            name={'selectedPrice'}
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.price' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.payment' /></label>
                        <Select
                            name={'selectedPayment'}
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.payment' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.address' /></label>
                        <Select
                            name={'selectedProvince'}
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.address' />}
                        />
                    </div>
                    <div className='col-4 form-group row'>
                        <label><FormattedMessage id='admin.manage-doctor.name-clinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic} />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.address-clinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic} />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note} />
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
