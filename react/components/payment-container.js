import React, {Component} from 'react';
import StepSignUp from './step-sign-up';
import StepConfirmUser from './step-confirm-user';
import StepMakePayment from './step-make-payment';

export default class PaymentContainer extends Component {
    render() {
        return (
            <div>
                <StepSignUp/>
                <StepConfirmUser/>
                <StepMakePayment/>
            </div>
        );
    }
}