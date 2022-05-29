import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUser, editUserService } from '../../services/userService';
import { emitter } from '../../utils/emitter';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import './UserManage.scss'


class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
        }
    }


    async componentDidMount() {
        await this.getAllUserFromReact()
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('All')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = (event) => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    createNewUser = async (data) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            } else {
                await this.getAllUserFromReact()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your ID' })

            }

        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteUser = async (user) => {
        let res = await deleteUser(user.id)
        console.log('check', res)
        if (res.errCode !== 0) {
            alert(res.errMessage)
        } else {
            await this.getAllUserFromReact()

        }
    }

    handleEditUser = (user) => {
        console.log('check', user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user

        })
    }
    editUser = async (data) => {
        let res = await editUserService(data)
        if (res.errCode !== 0) {
            alert(res.errMessage)
        } else {
            this.setState({
                isOpenModalEditUser: false,
            })
            await this.getAllUserFromReact()

        }
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser === true &&
                    <ModalEditUser
                        toggleUserModal={this.toggleUserEditModal}
                        isOpen={this.state.isOpenModalEditUser}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }

                <div className='title text-center'>Manage Users with Eric</div>
                <div className='mx-3'>
                    <button className='btn btn-primary px-3'
                        onClick={(event) => this.handleAddNewUser(event)}
                    >
                        <i className="fa fa-plus"></i>  Add new user
                    </button>
                </div>
                <div className='user-table mt-4 mx-1'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td className='text-center'>
                                                <button onClick={() => this.handleEditUser(item)}
                                                    className='btn-edit'>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button onClick={() => this.handleDeleteUser(item)}
                                                    className='btn-delete' >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    )

                                })
                            }

                        </tbody>

                    </table>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
