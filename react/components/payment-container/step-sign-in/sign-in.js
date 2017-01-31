import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    signIn: store.signIn
}))
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    type(field, event) {
        this.actions.typeInSignIn({field, value: event.target.value});
    }
    signInUser() {
        this.actions.signInUser(this.props.signIn);
    }
    render() {
        const {email, password, submitting} = this.props.signIn;
        return (
            <div>


                <div className="form-group">
                    <label className="sr-only control-label" htmlFor="email">email<span className=" "> </span></label>
                    <input id="email" name="email" type="text" value={email} onChange={this.type.bind(this, 'email')} placeholder="Email" className="form-control input-md" required="" ref={ref=>this.firstInput = ref}/>
                </div>


                <div className="form-group">
                    <label className="sr-only control-label" htmlFor="password">password<span className=" "> </span></label>
                    <input id="password" name="password" type="password" value={password} onChange={this.type.bind(this, 'password')} placeholder="Password" className="form-control input-md" required=""/>
                </div>


                <div className="form-group">
                    <button type="button" className="btn btn-default" onClick={this.signInUser.bind(this)} disabled={submitting}>Sign In<div className={'ball-clip-rotate ' + (submitting ? '' : 'hidden')}><div></div></div></button>
                </div>


            </div>
        );
    }
    componentDidMount() {
        this.firstInput.focus();
    }
    componentWillUnmount() {
        this.actions.clearSignIn();
    }
}
