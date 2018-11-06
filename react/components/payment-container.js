import React, {Component} from 'react';
import StepSignIn from './payment-container/step-sign-in';
import StepChoosePackage from './payment-container/step-choose-package';
import StepMakePayment from './payment-container/step-make-payment';
import * as actions from '../redux/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CognitoUserPool} from 'amazon-cognito-identity-js';

export const cognitoUserPool = new CognitoUserPool({
    UserPoolId: 'ap-southeast-1_nEwBCPWs6',
    ClientId: '64668mfj8lug3r2d4frdj2ibmv'
});

@connect(store => ({}))
export default class PaymentContainer extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
        this.actions.checkCognitoSession();
    }
    render() {
        return (
            <div>
                <StepSignIn />
                <StepChoosePackage />
                <StepMakePayment />
            </div>
        );
    }
}
