import React, { Component } from "react";
import { connect } from "react-redux";
import { ModalHeader, Modal, Button, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            isShowPassword: false

        }
    }

    componentDidMount() {

    }
    toggle = () => {
        this.props.toggleUserModal()
    }
    handleShowHidePassword = (event) => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleOnChangeInput = (event, id) => {
        /**
         * Syntax this.state.email === this.state['email']
         */
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({ ...copyState })
    }
    checkVadidateInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        let isVlalid = true
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isVlalid = false
                alert(`Missing ${arrInput[i]}`)
                break;
            }
        }

        return isVlalid
    }

    handleAddNewUser = () => {
        let isVlalid = this.checkVadidateInput()
        if (isVlalid === true) {
            //call api
            this.props.createNewUser(this.state)
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size={'lg'}
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Create new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                type="email" value={this.state.email}
                                placeholder="Enter your email" />
                        </div>
                        <div className="input-container">
                            <label>   Password     </label>

                            <input onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                type={this.state.isShowPassword === false ? "password" : 'text'}
                                value={this.state.password}
                                placeholder="Enter your password" />

                            <span onClick={(event) => this.handleShowHidePassword(event)}>
                                <i className={this.state.isShowPassword === false ? "fas fa-eye-slash" : "fas fa-eye"} ></i>
                            </span>

                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>First name</label>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                type="text" value={this.state.firstName}
                                placeholder="Enter your firstname" />
                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                type="text" value={this.state.lastName}
                                placeholder="Enter your lastname" />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container" style={{ width: "100%" }}>
                            <label>Address</label>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                type="text" value={this.state.address}
                                placeholder="Enter your address" />
                        </div>

                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button
                        className="px-3" color="primary"
                        onClick={() => this.handleAddNewUser()}>
                        Add new
                    </Button>{' '}
                    <Button
                        className="px-3" color="secondary"
                        onClick={() => this.toggle()}>
                        Close
                    </Button>

                </ModalFooter>
            </Modal>
        )
    }


}
const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalUser)
