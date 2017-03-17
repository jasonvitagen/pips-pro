import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CreateAccount from './step-sign-in/create-account';
import EditAccount from './step-sign-in/edit-account';
import ChangePassword from './step-sign-in/change-password';
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
        let nextStep = <SignedIn/>;
        if (user.editAccount) nextStep = <EditAccount/>;
        if (user.changePassword) nextStep = <ChangePassword/>;

        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">1</span></div>
                    {user.name ?
                        (
                            <div>
                                {nextStep}                                
                            </div>
                        ) :
                        (
                            <div>
                                <p><a href="#" className="btn-link" onClick={this.signUp.bind(this)}>Create an account</a></p>
                                {signInIntent === 'signup' &&
                                    <CreateAccount/>
                                }
                                <p>or</p>
                                <p><a href="#" className="btn-link" onClick={this.signIn.bind(this)}>Sign in</a></p>
                                {signInIntent === 'signin' &&
                                    <SignIn/>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}