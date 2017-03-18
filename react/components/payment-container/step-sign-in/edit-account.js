import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../redux/action';
import {connect} from 'react-redux';
import Recaptcha from 'react-google-recaptcha';

@connect(store => ({
    registration: store.registration,
    user: store.user
}))
export default class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    type(field, event) {
        this.actions.typeInRegistration({field, value: event.target.value});
    }
    editUserAccount(event) {
        event.preventDefault();
        this.actions.editUserAccount(this.props.registration, this.props.user);
    }
    cancelEditAccount(event) {
        this.actions.cancelEditAccount(this.props.registration);
        event.preventDefault();
    }
    render() {
        const 
            {name, mobile, email, password, confirmPassword, submitting} = this.props.registration
            , {name: nameError, mobile: mobileError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError, recaptcha: recaptchaError} = this.props.registration.errors;

        return (
            <form onSubmit={this.editUserAccount.bind(this)}>


                <div className={"form-group " + (nameError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="name">name<span className=" "> </span></label>
                    <input id="name" name="name" type="text" value={name} onChange={this.type.bind(this, 'name')} placeholder="Name" className="form-control input-md" required="" ref={ref=>this.firstInput = ref}/>
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

                <div className={"hidden form-group " + (passwordError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="password">password<span className=" "> </span></label>
                    <input id="password" name="password" type="password" value={password} onChange={this.type.bind(this, 'password')} placeholder="Password" className="form-control input-md" required=""/>
                    {passwordError &&
                        <p className="alert alert-danger"><small>{passwordError}</small></p>
                    }
                </div>


                <div className={"hidden form-group " + (confirmPasswordError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="passwordConfirm">password<span className=" "> </span></label>
                    <input id="passwordConfirm" name="passwordConfirm" type="password" value={confirmPassword} onChange={this.type.bind(this, 'confirmPassword')} placeholder="Confirm Password" className="form-control input-md" required=""/>
                    {confirmPasswordError &&
                        <p className="alert alert-danger"><small>{confirmPasswordError}</small></p>
                    }
                </div>


                <div className="form-group">
                    <button className="btn btn-default" onClick={this.editUserAccount.bind(this)} disabled={submitting}>Edit Account<div className={'ball-clip-rotate ' + (submitting ? '' : 'hidden')}><div></div></div></button>
                </div>


                <p><button type="button" className="btn btn-xs btn-ouline" onClick={this.cancelEditAccount.bind(this)}>Go back</button></p>


            </form>
        );
    }
    componentDidMount() {
        this.firstInput.focus();
    }
    componentWillUnmount() {
        this.actions.clearRegistration();
    }
}