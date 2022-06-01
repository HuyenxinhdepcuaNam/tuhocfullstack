import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl'
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
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.healthfacility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.selectroom" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.selectdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.checkhealth" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i> <b><FormattedMessage id="homeheader.support" /></b></div>
                            <div className='language-vn'>Vi</div>
                            <div className='language-en'>En</div>
                        </div>
                    </div>

                </div>
                <div className='homeheader-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><b><FormattedMessage id="banner.title2" /></b></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input className='input' type='text' placeholder='Tìm kiếm' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b><FormattedMessage id="banner.Specialist-examination" /></b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b><FormattedMessage id="banner.Remote-examination" /></b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b><FormattedMessage id="banner.General-examination" /></b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b><FormattedMessage id="banner.Medical-tests" /></b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b><FormattedMessage id="banner.Mental-health" /></b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b><FormattedMessage id="banner.Dental-Examination" /></b></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon'><i className="far fa-hospital"></i></div>
                                <div className='text'><b><FormattedMessage id="banner.Surgery-Package" /></b></div>
                            </div>
                        </div>


                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
