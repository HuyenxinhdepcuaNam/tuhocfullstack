import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { withRouter } from 'react-router'
import { getAllClinic } from '../../../services/userService'
import './MedicalFacility.scss'

class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }

    async componentDidUpdate() {

    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let { dataClinic } = this.state
        console.log('check clinic this.state', this.state)
        return (
            <div className='section-general section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 && dataClinic.map((item, index) => {
                                return (
                                    <div className='section-customize'
                                        onClick={() => this.handleViewDetailClinic(item)}
                                        key={index}>
                                        <div className='bg-image section-medical-facility'
                                            style={{ backgroundImage: `url(${item.image})` }}></div>
                                        <h3>{item.name}</h3>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
