import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    registration: store.registration,
    user: store.user
}))
export default class VerifyUser extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    type(field, event) {
        this.actions.typeInUserVerificationCode({
            field,
            value: event.target.value
        });
    }
    verifyUser(event) {
        this.actions.forgotUserPassword(this.props.signIn, this.props.user);
        event.preventDefault();
    }
    cancelVerifyUser() {
        this.actions.cancelVerifyUser();
    }
    render() {
        const {userVerificationCode, submitting} = this.props.registration;
        return (
            <form onSubmit={this.verifyUser.bind(this)}>
                <div className="form-group">
                    <label className="sr-only control-label" htmlFor="code">
                        email
                        <span className=" "> </span>
                    </label>
                    <input
                        id="code"
                        name="code"
                        type="text"
                        value={userVerificationCode}
                        onChange={this.type.bind(this, 'userVerificationCode')}
                        placeholder="Verification code"
                        className="form-control input-md"
                        required=""
                        ref={ref => (this.firstInput = ref)}
                        maxLength="10"
                    />
                </div>

                <div className="form-group">
                    <button
                        className="btn btn-default"
                        onClick={this.verifyUser.bind(this)}
                        disabled={submitting}>
                        Verify account
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
                        onClick={this.cancelVerifyUser.bind(this)}>
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
        this.actions.cancelVerifyUser();
    }
}
