import React, {Component} from 'react';
import StepSignIn from './step-sign-in';
import StepConfirmUser from './step-confirm-user';
import StepMakePayment from './step-make-payment';
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
    }
    render() {
        return (
            <div>
                <StepSignIn/>
                <StepConfirmUser/>
                <StepMakePayment/>
            </div>
        );
    }
}