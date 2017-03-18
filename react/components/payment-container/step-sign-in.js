import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CreateAccount from './step-sign-in/create-account';
import EditAccount from './step-sign-in/edit-account';
import ChangePassword from './step-sign-in/change-password';
import ForgotPassword from './step-sign-in/forgot-password';
import SignedIn from './step-sign-in/signed-in';
import SignIn from './step-sign-in/sign-in';
import * as actions from '../../redux/action';

@connect(store => ({
    user: store.user,
    signInIntent: store.signInIntent
}))
export default class StepSignUp extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
        if (window.location.search.indexOf('resetpassword') > -1) {
            const token = window.location.search.split('&')[0].split('=')[1];
            this.actions.resetPassword(token);
        }
    }
    signUp(event) {
        this.actions.signUp();
        event.preventDefault();
    }
    signIn(event) {
        this.actions.signIn();
        event.preventDefault();
    }
    render() {
        const {user, signInIntent} = this.props;
        let signedIn = <SignedIn/>;
        if (user.editAccount) signedIn = <EditAccount/>;
        if (user.changePassword) signedIn = <ChangePassword/>;

        let signIn = <SignIn/>;
        if (user.forgotPassword) signIn = <ForgotPassword/>;

        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">1</span></div>
                    {user.name || user.resetPassword ?
                        (
                            <div>
                                {signedIn}
                            </div>
                        ) :
                        (
                            <div>
                                <p><a href="#" type="button" className="btn-link" onClick={this.signUp.bind(this)}>Create an account</a></p>
                                {signInIntent === 'signup' &&
                                    <CreateAccount/>
                                }
                                <p>or</p>
                                <p><a href="#" type="button" className="btn-link" onClick={this.signIn.bind(this)}>Sign in</a></p>
                                {signInIntent === 'signin' && signIn}
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}