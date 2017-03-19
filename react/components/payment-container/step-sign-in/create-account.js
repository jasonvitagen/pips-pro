import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../redux/action';
import {connect} from 'react-redux';
import Recaptcha from 'react-google-recaptcha';

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
    createAccount(event) {
        this.actions.createAccount(this.props.registration);
        event.preventDefault();
    }
    recaptchaChanged(value) {
        this.actions.typeInRegistration({field: 'recaptcha', value});
    }
    reset() {
        grecaptcha.reset();
        this.actions.typeInRegistration({field: 'recaptcha', value: ''});
    }
    render() {

        const 
            {name, mobile, email, password, confirmPassword, submitting} = this.props.registration
            , {name: nameError, mobile: mobileError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError, recaptcha: recaptchaError} = this.props.registration.errors;

        return (
            <form onSubmit={this.createAccount.bind(this)}>


                <div className={"form-group " + (nameError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="name">name<span className=" "> </span></label>
                    <input id="name" name="name" type="text" value={name} onChange={this.type.bind(this, 'name')} placeholder="Name" className="form-control input-md" required="" ref={ref=>this.firstInput = ref} maxLength="254"/>
                    {nameError &&
                        <p className="alert alert-danger"><small>{nameError}</small></p>
                    }
                </div>


                <div className={"form-group " + (mobileError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="mobile">mobile<span className=" "> </span></label>
                    <input id="mobile" name="mobile" type="tel" value={mobile} onChange={this.type.bind(this, 'mobile')} placeholder="Mobile number e.g. 0164140900" className="form-control input-md" required="" maxLength="15"/>
                    {mobileError &&
                        <p className="alert alert-danger"><small>{mobileError}</small></p>
                    }
                </div>


                <div className={"form-group " + (emailError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="email">email<span className=" "> </span></label>
                    <input id="email" name="email" type="email" value={email} onChange={this.type.bind(this, 'email')} placeholder="Email" className="form-control input-md" required="" maxLength="254"/>
                    {emailError &&
                        <p className="alert alert-danger"><small>{emailError}</small></p>
                    }
                </div>


                <div className={"form-group " + (passwordError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="password">password<span className=" "> </span></label>
                    <input id="password" name="password" type="password" value={password} onChange={this.type.bind(this, 'password')} placeholder="Password" className="form-control input-md" required="" maxLength="128"/>
                    {passwordError &&
                        <p className="alert alert-danger"><small>{passwordError}</small></p>
                    }
                </div>


                <div className={"form-group " + (confirmPasswordError ? 'has-error' : '')}>
                    <label className="sr-only control-label" htmlFor="passwordConfirm">password<span className=" "> </span></label>
                    <input id="passwordConfirm" name="passwordConfirm" type="password" value={confirmPassword} onChange={this.type.bind(this, 'confirmPassword')} placeholder="Confirm Password" className="form-control input-md" required="" maxLength="128"/>
                    {confirmPasswordError &&
                        <p className="alert alert-danger"><small>{confirmPasswordError}</small></p>
                    }
                </div>


                <Recaptcha 
                    sitekey={process.env.RECAPTCHA_KEY}
                    onChange={this.recaptchaChanged.bind(this)}
                    />
                    {recaptchaError &&
                        <p className="alert alert-danger"><small>{recaptchaError}</small></p>
                    }

                <button type="button" className="btn btn-link-orange btn-xs" onClick={this.reset.bind(this)}>Reset reCAPTCHA</button>

                <br/>
                <br/>

                <p><small>By creating an account, you agree to our <a href="/terms-of-use.html">Terms of Use</a></small></p>

                <div className="form-group">
                    <button className="btn btn-default" onClick={this.createAccount.bind(this)} disabled={submitting}>Create Account<div className={'ball-clip-rotate ' + (submitting ? '' : 'hidden')}><div></div></div></button>
                </div>


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