import React, { Component } from 'react';
import styles from './signin.css';
import FormField from '../widgets/formfields/formfields';

class SignIn extends Component {

    state = {
        registerError:'',
        loading: false,
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email',
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password',
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
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

        console.log(newFormData);

        this.setState({
            formData: newFormData
        })
    }

    validate = (element) => {
        let error = [true, ''];

        if(element.validation.email){
            const valid = /\S+@\S+.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email ' : ''}`;
            error = !valid ? [valid, message] : error;        
        }

        if(element.validation.password){
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be greater than 5 ' : ''}`;
            error = !valid ? [valid, message] : error;        
        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required! ' : ''}`;
            error = !valid ? [valid, message] : error;        
        }

        return error;
    }

    render(){
        return(
            <div className={styles.logContainer}>
            <h2>Register / Log in </h2>
                <FormField
                    id={'email'}
                    formData={this.state.formData.email}
                    change={(element)=>this.updateForm(element)}
                />

                <FormField
                    id={'password'}
                    formData={this.state.formData.password}
                    change={(element)=>this.updateForm(element)}
                />
            </div>

        )
    }
}

export default SignIn;