import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import './UserManage.scss'
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: []
        }
    }


    async componentDidMount() {
        let response = await getAllUsers('All')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }


    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <div className='title text-center'>Manage Users with Eric</div>
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
                                        <tr >
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td className='text-center'>
                                                <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'><i className="fas fa-trash-alt"></i></button>
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
