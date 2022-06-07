import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImg: "",
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
        // try {
        //     let res = await getALLCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {

        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ""
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ""
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ""
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRoles = this.props.roleRedux
            let arrPositions = this.props.positionRedux
            let arrGenders = this.props.genderRedux

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
                avatar: '',
                action: CRUD_ACTION.CREATE,
                previewImg: ''
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                previewImg: objectUrl,
                avatar: base64
            })
        } console.log('check avatar', data)
    }

    openPreviewImg = () => {
        if (!this.state.previewImg) { return }
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidate()
        if (isValid === false) { return }
        let { action } = this.state
        if (action === CRUD_ACTION.CREATE) {
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTION.EDIT) {
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }


        this.props.fetUserRedux()

    }
    checkValidate = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address']
        let isValid = true
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('Missing ' + arrCheck[i] + ' !')
                break
            }

        }
        return isValid
    }

    onChangeInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value
        this.setState({
            ...copystate
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }


        this.setState({
            email: user.email,
            password: 'Hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTION.EDIT,
            userEditId: user.id,
            previewImg: imageBase64
        })
    }

    render() {
        let genders = this.state.genderArr
        let language = this.props.language
        let isGetGender = this.props.isLoadingGender
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let { email, password, firstName, lastName,
            phoneNumber, address, gender, position,
            role, avatar } = this.state
        return (
            <div className="user-redux-container" >

                <div className="title" >
                    Manage Users by Redux
                </div>
                <div>{isGetGender === true ? "Loading gender" : ''}</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row '>

                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-3 '>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    disabled={this.state.action === CRUD_ACTION.EDIT}
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    disabled={this.state.action === CRUD_ACTION.EDIT}
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstName" /> </label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastName" /> </label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')} />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.phone-number" /> </label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key} >
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className='form-control'
                                    value={position}
                                    onChange={(event) => this.onChangeInput(event, 'position')}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role-id" /></label>
                                <select className='form-control'
                                    value={role}
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input onChange={(event) => this.handleOnChangeImage(event)}
                                        id='previewImg' hidden type='file' />
                                    <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="manage-user.upload-img" /><i className='fas fa-upload'></i></label>
                                    <div className='preview-img'
                                        onClick={() => this.openPreviewImg()}
                                        style={{ backgroundImage: `url(${this.state.previewImg})` }}>

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3' >
                                <button className={this.state.action === CRUD_ACTION.EDIT ? ' btn btn-warning' : ' btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_ACTION.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}

                                </button>
                            </div>
                            <div className='col-12 mb-5 '>
                                <TableManageUser
                                    action={this.state.action}
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />}

            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
