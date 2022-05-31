import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
class HomeHeader extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='homeheader-container'>
                    <div className='homeheader-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='sub-title'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='sub-title'>Chon bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='sub-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='sub-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i>Hỗ trợ</div>
                            <div className='flag'>Vi</div>
                        </div>
                    </div>

                </div>
                <div className='homeheader-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'><b>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</b></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input className='input' type='text' placeholder='Tìm kiếm' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b>Khám Chuyên khoa</b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b>Khám <br></br>Từ xa</b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b>Khám<br></br> Tổng quát</b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b>Xét nghiệm <br></br>y học</b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b>Sức khỏe<br></br> Tinh thần</b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b>Khám<br></br> Nha khoa</b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b>Gói<br></br> Phẫu thuật</b></div>
                            </div>
                        </div>


                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
