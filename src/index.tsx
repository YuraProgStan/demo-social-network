//import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import React from 'react';
//import state, {subscribe} from './redax/state';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSApp from './App'
import App from './App';
//import {addPost, updateNewPostText, addMessage, updateNewMessageText} from './redax/state';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
//import {Provider} from './StoreContext';


{/* <BrowserRouter><App state={state} addPost={addPost} updateNewPostText={updateNewPostText}
addMessage={addMessage} updateNewMessageText={updateNewMessageText} />
</BrowserRouter> */}
{/* <App state={state} dispatch={store.dispatch.bind(store)}

                 addMessage={store.addMessage.bind(store)}
                 updateNewMessageText={store.updateNewMessageText.bind(store)} /> */}

// let rerenderEntireTree = () => {
      ReactDOM.render(
     //<React.StrictMode>

        <SamuraiJSApp />
        ,
      // </React.StrictMode>
       document.getElementById('root'))
   // }

// rerenderEntireTree(state);

// subscribe(rerenderEntireTree);



// store.subscribe(rerenderEntireTree);
/*rerenderEntireTree(store.getState());

store.subscribe(() =>{
   let state = store.getState();
   rerenderEntireTree(state);
});*/




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
//serviceWorker.unregister();