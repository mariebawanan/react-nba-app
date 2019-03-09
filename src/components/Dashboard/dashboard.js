import React, { Component } from 'react';
import styles from './dashboard.css';

import FormField from '../widgets/formfields/formfields';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import {stateToHTML, ContentState} from 'draft-js-export-html';

class Dashboard extends Component {
    
    state = {
        editorState: EditorState.createEmpty(),
        postError:'',
        loading: false,
        formData: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'Enter your name',
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter the title',
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
        }
    }

    updateForm = (element) => {
        const newFormData = {
            ...this.state.formData
        }

        const newElement = {
            ...newFormData[element.id]
        }

        newElement.value = element.event.target.value;
        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormData[element.id] = newElement;

        this.setState({
            formData: newFormData
        })
    }


    validate = (element) => {
        let error = [true, ''];


        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required! ' : ''}`;
            error = !valid ? [valid, message] : error;        
        }

        return error;
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
        }

        for(let key in this.state.formData){
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if(formIsValid) {
            console.log('sibmit');
        }
        else {
            this.setState({
                postError: 'Something went wrong'
            })
        }

    }

    submitButton = (event) => (
        this.state.loading ? 
            'loading...' :
            <div>
                <button type="submit" > Add Post </button>
            </div>
    )

    showError = () => (
        this.state.postError !== '' ?
            <div className={styles.error}>{this.state.postError}</div>
            : ''
    )

    onEditorStateChange = (editorState) => {
        
        let contentState = editorState.getCurrentContent();
        let rawState = convertFromRaw(contentState);
        let html =  ContentState.createFromBlockArray(rawState);

        this.setState({
            editorState
        })
    }

    render() {
        return (

            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2> Add post </h2>

                    <FormField
                            id={'author'}
                            formData={this.state.formData.author}
                            change={(element)=>this.updateForm(element)}
                        />
                    
                    <FormField
                            id={'title'}
                            formData={this.state.formData.title}
                            change={(element)=>this.updateForm(element)}
                        />

                    <Editor 
                        editorState = {this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />

                    { this.submitButton() }
                    { this.showError() }
                </form>
            </div>
        )
    }
}


export default Dashboard;