import React, { Component } from 'react';
import styles from './dashboard.css';
import { firebaseTeams } from '../../firebase';

import FormField from '../widgets/formfields/formfields';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import Uploader from '../widgets/FileUploader/fileUploader';

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
            body: {
                element: 'texteditor',
                value:'',
                valid: true
            },
            teams: {
                element: 'select',
                value: '',
                config: {
                    name: 'teams_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            image: {
                element: 'image',
                value:'',
                valid: true
            }
        }
    }

    componentDidMount(){
        this.loadTeams()
    }

    loadTeams = () => {
        firebaseTeams.once('value')
        .then((snapshot) => {
            let teams =  [];
            snapshot.forEach((childSnapshot) => {
                teams.push({
                    id: childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })

            const newFormData = { ...this.state.formData}
            const newElement = {...newFormData['teams']}

            newElement.config.options = teams;

            newFormData['teams'] = newElement;

            this.setState({
                formData: newFormData
            })
        })
        
    }

    updateForm = (element, content = '') => {
        const newFormData = {
            ...this.state.formData
        }

        const newElement = {
            ...newFormData[element.id]
        }
        console.log(element);
        if(content===''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content;
        }
        
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

        console.log(dataToSubmit);
        console.log(dataToSubmit);
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

        let html = stateToHTML(contentState);

        this.updateForm({id:'body'}, html)

        this.setState({
            editorState
        })
    }

    storeFileName = (filename) => {
        this.updateForm({id:'image'}, filename)
    }

    render() {
        return (

            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2> Add post </h2>

                    <Uploader 
                        filename={(filename)=>{this.storeFileName(filename)}}
                    />

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

                    <FormField
                            id={'teams'}
                            formData={this.state.formData.teams}
                            change={(element)=>this.updateForm(element)}
                        />
                    


                    { this.submitButton() }
                    { this.showError() }
                </form>
            </div>  
        )
    }
}


export default Dashboard;