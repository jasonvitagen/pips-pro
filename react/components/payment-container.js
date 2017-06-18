import React, {Component} from 'react';
import StepSignIn from './payment-container/step-sign-in';
import StepChoosePackage from './payment-container/step-choose-package';
import StepMakePayment from './payment-container/step-make-payment';
import * as actions from '../redux/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(store => ({
    
}))
export default class PaymentContainer extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
        this.actions.checkCookie();
        this.actions.getLocation();
    }
    render() {
        return (
            <div>
                <StepSignIn/>
                <StepChoosePackage/>
                <StepMakePayment/>
            </div>
        );
    }
}