import React from 'react';
import s from './Post.module.css';
import {PostType} from "../../../../types/types";
type PropsType = {
  message: string
  likesCount: number
}
const Post: React.FC<PropsType> = (props) => {
 

  return <div className={s.item}>
    <img src="https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg" />
    {props.message}<div>
      <span>like {props.likesCount}</span>
    </div>
  </div>

}

export default Post;