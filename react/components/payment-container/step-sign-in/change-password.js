import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    registration: store.registration,
    user: store.user
}))
export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    type(field, event) {
        this.actions.typeInRegistration({field, value: event.target.value});
    }
    changeUserPassword(event) {
        event.preventDefault();
        if (this.props.user.resetPassword) {
            this.actions.resetUserPassword(this.props.registration);
        } else {
            this.actions.changeUserPassword(
                this.props.registration,
                this.props.user
            );
        }
    }
    cancelChangePassword(event) {
        this.actions.cancelChangePassword(this.props.registration);
        event.preventDefault();
    }
    render() {
        const {
                password,
                confirmPassword,
                submitting,
                resetPasswordToken
            } = this.props.registration,
            {email} = this.props.user,
            {
                email: emailError,
                password: passwordError,
                confirmPassword: confirmPasswordError
            } = this.props.registration.errors;

        return (
            <form onSubmit={this.changeUserPassword.bind(this)}>
                <div
                    className={
                        'hidden form-group ' + (emailError ? 'has-error' : '')
                    }>
                    <label className="sr-only control-label" htmlFor="email">
                        email
                        <span className=" "> </span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.type.bind(this, 'email')}
                        placeholder="Email"
                        className="form-control input-md"
                        required=""
                    />
                    {emailError && (
                        <p className="alert alert-danger">
                            <small>{emailError}</small>
                        </p>
                    )}
                </div>

                <div
                    className={
                        'form-group ' + (passwordError ? 'has-error' : '')
                    }>
                    <label className="sr-only control-label" htmlFor="password">
                        password
                        <span className=" "> </span>
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.type.bind(this, 'password')}
                        placeholder="Password"
                        className="form-control input-md"
                        required=""
                        ref={ref => (this.firstInput = ref)}
                        maxLength="128"
                    />
                    {passwordError && (
                        <p className="alert alert-danger">
                            <small>{passwordError}</small>
                        </p>
                    )}
                </div>

                <div
                    className={
                        'form-group ' +
                        (confirmPasswordError ? 'has-error' : '')
                    }>
                    <label
                        className="sr-only control-label"
                        htmlFor="passwordConfirm">
                        password
                        <span className=" "> </span>
                    </label>
                    <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        value={confirmPassword}
                        onChange={this.type.bind(this, 'confirmPassword')}
                        placeholder="Confirm Password"
                        className="form-control input-md"
                        required=""
                        maxLength="128"
                    />
                    {confirmPasswordError && (
                        <p className="alert alert-danger">
                            <small>{confirmPasswordError}</small>
                        </p>
                    )}
                </div>

                <input type="hidden" value={resetPasswordToken} />

                <div className="form-group">
                    <button
                        className="btn btn-default"
                        onClick={this.changeUserPassword.bind(this)}
                        disabled={submitting}>
                        Change Password
                        <div
                            className={
                                'ball-clip-rotate ' +
                                (submitting ? '' : 'hidden')
                            }>
                            <div />
                        </div>
                    </button>
                </div>

                <p>
                    <button
                        type="button"
                        className="btn btn-xs btn-ouline"
                        onClick={this.cancelChangePassword.bind(this)}>
                        Go back
                    </button>
                </p>
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
