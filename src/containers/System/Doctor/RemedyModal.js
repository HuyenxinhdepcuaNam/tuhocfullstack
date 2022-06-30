import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss'
import { FormattedMessage } from 'react-intl'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils'
class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: ''

        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }


    async componentDidUpdate(prevProps, PrevState) {
        let { language, dataModal } = this.props
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: dataModal.email
            })
        }


    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
        console.log('check state', this.state)

    }
    render() {
        let { isOpenRemedyModal, closeRemedyModal, dataModal, sendRemedy } = this.props
        return (
            <React.Fragment>

                <Modal
                    isOpen={isOpenRemedyModal}
                    // toggle={''}
                    className={'booking-modal-container'}
                    centered
                    size="md"
                >
                    <ModalHeader
                        close={<button className="close"
                            onClick={closeRemedyModal}>×</button>}
                        toggle={closeRemedyModal}
                    >
                        Gửi hóa đơn khám bệnh thành công
                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input className='form-control' type='email'
                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                    value={this.state.email} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn file hóa đơn</label>
                                <input className='form-control-file'
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                    type='file' />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.handleSendRemedy()}
                        >
                            Send
                        </Button>
                        {' '}
                        <Button onClick={closeRemedyModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
