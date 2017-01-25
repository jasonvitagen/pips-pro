import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../redux/action';
import CreateAccount from './create-account';

@connect(store => ({
    registration: store.registration
}))
export default class StepSignUp extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    render() {
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">1</span></div>
                    <p><a href="#" className="btn-link">Create an account</a></p>
                    <CreateAccount/>
                    <p>or</p>
                    <p><a href="#" className="btn-link">Sign in</a></p>
                </div>
            </div>
        );
    }
}