import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../redux/action';

@connect(store => ({
    user: store.user
}))
export default class SignedIn extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    signOut() {
        this.actions.signOut();
    }
    editAccount() {
        this.actions.editAccount(this.props.user);
    }
    changePassword() {
        this.actions.changePassword();
    }
    render() {
        const {user} = this.props;
        return (
            <div className="signed-in">
                <div className="mb20">Welcome <h4>{user.name}.</h4></div>
                <div className="bg-primary pinside20"><span>Email: <h4 className="mt10">{user.email}</h4></span></div>
                <div className="bg-primary pinside20"><span>Mobile: <h4 className="mt10">{user.mobile}</h4></span></div>
                <br/>
                <p><button className="btn btn-xs btn-ouline" onClick={this.editAccount.bind(this)}>Edit account</button></p>
                <p><button className="btn btn-xs btn-ouline" onClick={this.changePassword.bind(this)}>Change password</button></p>
                <p><button className="btn btn-xs btn-ouline" onClick={this.signOut.bind(this)}>Sign out</button></p>
            </div>
        );
    }
}