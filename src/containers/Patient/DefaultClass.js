import React, { Component } from 'react';
import { connect } from "react-redux";
import './DefaultClass.scss'
import { FormattedMessage } from 'react-intl'

class DefaultClass extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {

        }

    }


    render() {
        let { language } = this.props

        return (
            <React.Fragment>
                <div className='doctor-extra-infor-container'>

                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
