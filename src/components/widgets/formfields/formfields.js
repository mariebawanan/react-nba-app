import React from 'react';
import styles from './formfields.css';

const FormFields = ({formData, change, id}) => {

    const showError = () => {
        let errorMessage = null;

        if(formData.validation && !formData.valid){
            errorMessage = (
                <div className={styles.labelError}>
                    {formData.validationMessage}
                </div>
            )

        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;
        switch(formData.element){
            case('input'):
                formTemplate= (
                    <div>
                        <input 
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event) => change({event, id, blur:true})}
                            onChange={(event) => change({event, id, blur:false})}
                        />
                        {showError()}
                    </div>
                )
                break;
            default: 
                formTemplate = null;

        }
        return formTemplate;
    }


    return(
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormFields;