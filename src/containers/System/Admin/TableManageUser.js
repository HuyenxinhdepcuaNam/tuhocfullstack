import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'


class TableManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userRedux: []
        }
    }
    async componentDidMount() {
        let abc = this.props.fetUserRedux()
        console.log('check fet', abc)

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (item) => {
        this.props.deleteAUserRedux(item.id)
    }



    render() {
        let users = this.state.userRedux
        console.log('check users', users)
        return (
            <table id="TableManageUser">
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
                    {users && users.length > 0 && users.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button
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
                    })}

                </tbody>
            </table >
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
