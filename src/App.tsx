import * as React from 'react';
import './App.css';
import NavbarContainer from './components/Navbar/NavbarContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {initializeApp} from './redux/app-reducer';
import {connect, Provider} from 'react-redux';
import {withRouter} from 'react-router';
import {compose} from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
// import ProfileContainer from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

// let SomeComponent = ()=><Dialogs />;
type MapPropsType = ReturnType<typeof MapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
class App extends React.Component<MapPropsType & DispatchPropsType>{
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured");
        //   console.error(PromiseRejectionEvent);

    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (

            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    {/* <Route path="/profile" component={Profile} />
          <Route path="/dialogs" component={Dialogs} /> */}
                    <Switch>
                        {/*<Route exact path='/'*/}   //второй вариант нижнего
                        {/*       render={() => <Redirect to={"/profile"}/>}/>*/}
                        <Redirect exact from="/" to="/profile"/>
                        <Route path='/profile/:userId?'
                               render={() => <SuspendedProfile />}/>
                        <Route path='/dialogs'
                               render={() => <SuspendedDialogs />}/>


                        {/* <Route  path="/dialogs" component={SomeComponent} /> */}
                        <Route path='/users'
                               render={() => <UsersContainer pageTitle={"Самурай"}/>}/>
                        <Route path='/login/facebook'
                               render={() => <div>Facebook</div>}/>
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                        <Route path="/news" component={News}/>
                        <Route path="/music" component={Music}/>
                        <Route path="/settings" component={Settings}/>

                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>


                    </Switch>
                </div>
            </div>

        );
    }
}

const MapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized

})


let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(MapStateToProps, {initializeApp}))(App);
const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;