import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    signIn: store.signIn,
    user: store.user
}))
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    type(field, event) {
        this.actions.typeInSignIn({field, value: event.target.value});
    }
    forgotPassword(event) {
        this.actions.forgotUserPassword(this.props.signIn, this.props.user);
        event.preventDefault();
    }
    forgotPasswordVerification(event) {
        this.actions.forgotUserPasswordVerification(this.props.signIn);
        event.preventDefault();
    }
    cancelForgotPassword() {
        this.actions.cancelForgotPassword();
    }
    render() {
        const {
            email,
            submitting,
            verificationCode,
            password
        } = this.props.signIn;
        console.log(verificationCode);
        return (
            <form onSubmit={this.forgotPassword.bind(this)}>
                {this.props.user.forgotPasswordVerification ? (
                    <div>
                        <div className="form-group">
                            <label
                                className="sr-only control-label"
                                htmlFor="verificationCode">
                                verification code
                                <span className=" "> </span>
                            </label>
                            <input
                                id="verificationCode"
                                name="verificationCode"
                                type="text"
                                value={verificationCode}
                                onChange={this.type.bind(
                                    this,
                                    'verificationCode'
                                )}
                                placeholder="Verification Code"
                                className="form-control input-md"
                                required=""
                                ref={ref => (this.codeInput = ref)}
                                maxLength="10"
                            />
                        </div>
                        <div className="form-group">
                            <label
                                className="sr-only control-label"
                                htmlFor="newPassword">
                                new password
                                <span className=" "> </span>
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={password}
                                onChange={this.type.bind(this, 'password')}
                                placeholder="New Password"
                                className="form-control input-md"
                                required=""
                                maxLength="254"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="form-group">
                        <label
                            className="sr-only control-label"
                            htmlFor="email">
                            email
                            <span className=" "> </span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={this.type.bind(this, 'email')}
                            placeholder="Email"
                            className="form-control input-md"
                            required=""
                            ref={ref => (this.firstInput = ref)}
                            maxLength="254"
                        />
                    </div>
                )}

                {this.props.user.forgotPasswordVerification ? (
                    <div className="form-group">
                        <button
                            className="btn btn-default"
                            onClick={this.forgotPasswordVerification.bind(this)}
                            disabled={submitting}>
                            Reset Password
                            <div
                                className={
                                    'ball-clip-rotate ' +
                                    (submitting ? '' : 'hidden')
                                }>
                                <div />
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="form-group">
                        <button
                            className="btn btn-default"
                            onClick={this.forgotPassword.bind(this)}
                            disabled={submitting}>
                            Send Code
                            <div
                                className={
                                    'ball-clip-rotate ' +
                                    (submitting ? '' : 'hidden')
                                }>
                                <div />
                            </div>
                        </button>
                    </div>
                )}
                <p>
                    <button
                        type="button"
                        className="btn btn-xs btn-ouline"
                        onClick={this.cancelForgotPassword.bind(this)}>
                        Go Back
                    </button>
                </p>
            </form>
        );
    }
    componentDidMount() {
        this.firstInput.focus();
    }
    componentWillUnmount() {
        this.actions.clearSignIn();
    }
}
