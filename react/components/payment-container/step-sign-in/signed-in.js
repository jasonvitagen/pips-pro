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
    render() {
        const {user} = this.props;
        return (
            <div>
                <p>Welcome <b>{user.name}</b></p>
                <p>Email: <b>{user.email}</b></p>
                <p>Mobile: <b>{user.mobile}</b></p>
                <br/>
                <p><button className="btn btn-xs btn-ouline" onClick={this.signOut.bind(this)}>Sign out</button></p>
            </div>
        );
    }
}