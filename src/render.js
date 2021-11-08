import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, updateNewPostText, addMessage, updateNewMessageText} from './redax/state';
import { BrowserRouter} from 'react-router-dom';

//addPost('SamuraiJS.com')
export let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} 
      addMessage={addMessage} updateNewMessageText={updateNewMessageText} />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
  }
 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

