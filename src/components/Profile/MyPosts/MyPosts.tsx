import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";

/*const maxLength10 = maxLengthCreator(10);
let AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name="newPostText" placeholder={"Post message"}
                   validate={[required, maxLength10]}/>
            {/!* <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />  <textarea id='new-post'></textarea> *!/}
        </div>
        <div>
            {/!* <button onClick={onaddPost}>Add post</button> *!/}
            <button>Add post</button>

            <button>Remove</button>
        </div>
    </form>
}
let AddNewPostFormRedux = reduxForm({form: "myPostsPosttext"})(AddNewPostForm);
 */

export type MapPropsType = {
    posts: Array<PostType>

}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    console.log("RENDER YO");

    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>); //p - это элемент массива (1 эл - { id: 1, message: 'Hi, how you?', likesCount: 12})
    // let newPostElement = React.createRef();
    let onAddPost = (values: AddPostFormValuesType) => {
        // let text = document.getElementById('new-post').value; - нельзя использовать DOM
        props.addPost(values.newPostText);

    }
          return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost}/>

            <div className={s.posts}>
                {postsElements}
                {/* <Post message={postData[0].message} likesCount={postData[0].likesCount} />
      <Post message={postData[1].message} likesCount={postData[1].likesCount} /> */}
                {/* <Post message="Hi, how you?" likesCount="5" /> */}

            </div>
        </div>
    )
};
const MyPostsMemorized = React.memo (MyPosts);
export default MyPostsMemorized;