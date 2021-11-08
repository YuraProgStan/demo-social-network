import React from "react";
import {createField, GetStringKeys, Input} from "../../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../../utils/validators/validators";

type PropsType = {

}
// type AddPostFormTypeKeys = Extract<keyof AddPostFormValuesType, string>
type AddPostFormTypeKeys = GetStringKeys<AddPostFormValuesType>

export type AddPostFormValuesType = {
    newPostText: string;
}

let AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormTypeKeys>("Your post", "newPostText", [required], Input)}
                {/*<Field component={Textarea} name="postText"/>*/}
            </div>
            <div>
                <button>Add post</button>

            </div>
        </form>
    )
}
export default reduxForm<AddPostFormValuesType, PropsType>({form: 'profile-add-post'})(AddPostForm)

