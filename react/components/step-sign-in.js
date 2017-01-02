import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signInUser, typeInRegistration, createAccount} from '../redux/action';

@connect(store => ({
    registration: store.registration
}))
export default class StepSignUp extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(signInUser({name: 'Jason Cheng'}));
    }
    type(field, event) {
        console.log(field, event.target.value);
        this.props.dispatch(typeInRegistration({field, value: event.target.value}));
    }
    createAccount() {
        this.props.dispatch(createAccount(this.props.registration));
    }
    render() {
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">1</span></div>
                    <p><a href="#" className="btn-link">Create an account</a></p>
                    <div className={"form-group " + (this.props.registration.errors.name ? 'has-error' : '')}>
                        <label className="sr-only control-label" htmlFor="name">name<span className=" "> </span></label>
                        <input id="name" name="name" type="text" value={this.props.registration.name} onChange={this.type.bind(this, 'name')} placeholder="Name" className="form-control input-md" required=""/>
                        {this.props.registration.errors.name &&
                            this.props.registration.errors.name.map((error) => {
                                return <p className="alert alert-danger" key={'name' + error}><small>{error}</small></p>
                            })
                        }
                    </div>
                    <div className={"form-group " + (this.props.registration.errors.email ? 'has-error' : '')}>
                        <label className="sr-only control-label" htmlFor="email">email<span className=" "> </span></label>
                        <input id="email" name="email" type="email" value={this.props.registration.email} onChange={this.type.bind(this, 'email')} placeholder="Email" className="form-control input-md" required=""/>
                        {this.props.registration.errors.email &&
                            this.props.registration.errors.email.map((error) => {
                                return <p className="alert alert-danger" key={'email' + error}><small>{error}</small></p>
                            })
                        }
                    </div>
                    <div className={"form-group " + (this.props.registration.errors.password ? 'has-error' : '')}>
                        <label className="sr-only control-label" htmlFor="password">password<span className=" "> </span></label>
                        <input id="password" name="password" type="password" value={this.props.registration.password} onChange={this.type.bind(this, 'password')} placeholder="Password" className="form-control input-md" required=""/>
                        {this.props.registration.errors.password &&
                            this.props.registration.errors.password.map((error) => {
                                return <p className="alert alert-danger" key={'password' + error}><small>{error}</small></p>
                            })
                        }
                    </div>
                    <div className={"form-group " + (this.props.registration.errors.confirmPassword ? 'has-error' : '')}>
                        <label className="sr-only control-label" htmlFor="passwordConfirm">password<span className=" "> </span></label>
                        <input id="passwordConfirm" name="passwordConfirm" type="password" value={this.props.registration.confirmPassword} onChange={this.type.bind(this, 'confirmPassword')} placeholder="Confirm Password" className="form-control input-md" required=""/>
                        {this.props.registration.errors.confirmPassword &&
                            this.props.registration.errors.confirmPassword.map((error) => {
                                return <p className="alert alert-danger" key={'confirmPassword' + error}><small>{error}</small></p>
                            })
                        }
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-default" onClick={this.createAccount.bind(this)}>Save</button>
                    </div>
                    <p>or</p>
                    <p><a href="#" className="btn-link">Sign in</a></p>
                </div>
            </div>
        );
    }
}