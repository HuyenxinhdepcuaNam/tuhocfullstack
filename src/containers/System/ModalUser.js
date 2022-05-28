import React, { Component } from "react";
import { connect } from "react-redux";
import { ModalHeader, Modal, Button, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }
    toggle = () => {
        this.props.toggleUserModal()
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
                            <input type="email" placeholder="Enter your email" />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" placeholder="Enter your password" />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>First name</label>
                            <input type="text" placeholder="Enter your firstname" />
                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input type="text" placeholder="Enter your lastname" />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container" style={{width:"100%"}}>
                            <label>Address</label>
                            <input type="text" placeholder="Enter your address" />
                        </div>
                       
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button className="px-3" color="primary" onClick={() => this.toggle()}>
                        Save
                    </Button>{' '}
                    <Button className="px-3" color="secodary" onClick={() => this.toggle()}>
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
