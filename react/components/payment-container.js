import React, {Component} from 'react';
import StepSignIn from './step-sign-in';
import StepConfirmUser from './step-confirm-user';
import StepMakePayment from './step-make-payment';

export default class PaymentContainer extends Component {
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