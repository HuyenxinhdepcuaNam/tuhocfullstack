import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

    render() {

        return (
            <div className='section-general section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        {/* <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe> */}
                    </div>
                    <div className='content-right'>
                        Trong video này, chúng ta sẽ hoàn tất việc design giao diện theo trang bookingcare.vn. Chúng ta sẽ hoàn thiện những phần đang còn dang dở, để từ video tiếp theo, chúng ta sẽ bắt đầu làm về backend và react để tạo dữ liệu thật cho trang home design này.

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
