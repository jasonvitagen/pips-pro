import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    registration: store.registration
}))
export default class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    type(field, event) {
        this.actions.typeInRegistration({field, value: event.target.value});
    }
    createAccount() {
        this.actions.createAccount(this.props.registration);
    }
    render() {

        const 
            {name, mobile, email, password, confirmPassword} = this.props.registration
            , {name: nameError, mobile: mobileError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError} = this.props.registration.errors;

        return (
            <div>


                <div className={"form-group " + (nameError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="name">name<span className=" "> </span></label>
                    <input id="name" name="name" type="text" value={name} onChange={this.type.bind(this, 'name')} placeholder="Name" className="form-control input-md" required=""/>
                    {nameError &&
                        <p className="alert alert-danger"><small>{nameError}</small></p>
                    }
                </div>


                <div className={"form-group " + (mobileError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="mobile">mobile<span className=" "> </span></label>
                    <input id="mobile" name="mobile" type="text" value={mobile} onChange={this.type.bind(this, 'mobile')} placeholder="Mobile number e.g. 0164140900" className="form-control input-md" required=""/>
                    {mobileError &&
                        <p className="alert alert-danger"><small>{mobileError}</small></p>
                    }
                </div>


                <div className={"form-group " + (emailError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="email">email<span className=" "> </span></label>
                    <input id="email" name="email" type="email" value={email} onChange={this.type.bind(this, 'email')} placeholder="Email" className="form-control input-md" required=""/>
                    {emailError &&
                        <p className="alert alert-danger"><small>{emailError}</small></p>
                    }
                </div>


                <div className={"form-group " + (passwordError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="password">password<span className=" "> </span></label>
                    <input id="password" name="password" type="password" value={password} onChange={this.type.bind(this, 'password')} placeholder="Password" className="form-control input-md" required=""/>
                    {passwordError &&
                        <p className="alert alert-danger"><small>{passwordError}</small></p>
                    }
                </div>


                <div className={"form-group " + (confirmPasswordError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="passwordConfirm">password<span className=" "> </span></label>
                    <input id="passwordConfirm" name="passwordConfirm" type="password" value={confirmPassword} onChange={this.type.bind(this, 'confirmPassword')} placeholder="Confirm Password" className="form-control input-md" required=""/>
                    {confirmPasswordError &&
                        <p className="alert alert-danger"><small>{confirmPasswordError}</small></p>
                    }
                </div>


                <div className="form-group">
                    <button type="button" className="btn btn-default" onClick={this.createAccount.bind(this)}>Create</button>
                </div>


            </div>
        );
    }
}