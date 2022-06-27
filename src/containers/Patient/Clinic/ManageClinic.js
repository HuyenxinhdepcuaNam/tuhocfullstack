import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss'
import { FormattedMessage } from 'react-intl'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils, LANGUAGES } from '../../../utils';
import { createNewClinic } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',


        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, PrevState) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {

        }

    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewClinic = async () => {
        let res = await createNewClinic({
            name: this.state.name,
            address: this.state.address,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,

        })
        if (res && res.errCode === 0) {
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',

            })
            toast.success("Created!")
        } else {
            toast.warn("Failed!")

        }
    }

    render() {
        let { language } = this.props
        return (
            <React.Fragment>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>
                        Quản lý phòng khám
                    </div>
                    <div className='add-new-specialty row m-3'>
                        <div className='col-6 form-group '>
                            <label>Tên phòng khám</label>
                            <input className='form-control'
                                type='text'
                                value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            />
                        </div>
                        <div className='col-6 form-group '>
                            <label>Ảnh phòng khám</label>
                            <input className='form-control-file '
                                type='file'
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control'
                                type='text'
                                value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            />
                        </div>
                        <div className='col-12 my-3'>
                            <MdEditor style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-success'
                                onClick={() => this.handleSaveNewClinic()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
