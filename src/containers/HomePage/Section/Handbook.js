import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class Handbook extends Component {

    render() {

        return (
            <div className='section-general section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <h3>Giaó sư tiến sĩ Bành Thị Huyền</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <h3>Giaó sư tiến sĩ Bành Thị Huyền</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <h3>Giaó sư tiến sĩ Bành Thị Huyền</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <h3>Giaó sư tiến sĩ Bành Thị Huyền</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <h3>Giaó sư tiến sĩ Bành Thị Huyền</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <h3>Giaó sư tiến sĩ Bành Thị Huyền</h3>
                            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
