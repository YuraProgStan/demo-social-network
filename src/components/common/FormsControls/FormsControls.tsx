import React from 'react';
import styles from "./FormsControls.module.css"
import {FieldValidatorType, required} from "../../../utils/validators/validators";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {LoginFormValuesType} from "../../Login/Login";
type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


// const FormControl: React.FC<FormControlPropsType> = ({input, meta: {touched, error}, Formtype, ...props}) => {
//     const hasError = touched && error;
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//             <div>
//                 <Formtype {...input} {...props} />
//             </div>
//
//             <div>
//                 {hasError && <span>{error}</span>}
//             </div>
//         </div>
//     )
// }
//
//
// export const Textarea: React.FC<WrappedFieldProps> = (props) => {
//     return <FormControl {...props} Formtype="textarea"></FormControl>
// }
// export const Input: React.FC<WrappedFieldProps> = (props) => {
//     return <FormControl {...props} Formtype="input"></FormControl>
// }

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validators: Array<FieldValidatorType>,
                                                         component: React.FC<WrappedFieldProps>,
                                                         props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>