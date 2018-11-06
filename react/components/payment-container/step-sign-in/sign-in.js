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
    signInUser(event) {
        this.actions.signInUser(this.props.signIn);
        event.preventDefault();
    }
    forgotPassword(event) {
        this.actions.forgotPassword();
        event.preventDefault();
    }
    render() {
        const {email, password, submitting} = this.props.signIn;
        return (
            <form onSubmit={this.signInUser.bind(this)}>
                <div className="form-group">
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
                        ref={ref => (this.firstInput = ref)}
                        maxLength="254"
                    />
                </div>

                <div className="form-group">
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
                        maxLength="128"
                    />
                </div>

                <div className="form-group">
                    <button
                        className="btn btn-default"
                        onClick={this.signInUser.bind(this)}
                        disabled={submitting}>
                        Sign In
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
                        onClick={this.forgotPassword.bind(this)}>
                        Forgot Password
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
