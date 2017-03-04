import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    selectedPackage: store.selectedPackage,
    payment: store.payment,
    user: store.user
}))
export default class StepConfirmUser extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    packageChanged(event) {
        console.log(event.target.value);
        this.actions.selectPackage(event.target.value);
        this.actions.getPaymentSignature(this.props.payment.PaymentId, event.target.value, this.props.user);
    }
    render() {
        const {verifying} = this.props.payment;
        console.log(verifying);
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">2</span></div>
                    <h3 className="number-title">Choose Your Package</h3>
                    <div>
                        <label htmlFor="1-month">
                            <input name="package" type="radio" id="1-month" value="1" checked={this.props.selectedPackage === '1'} onChange={this.packageChanged.bind(this)} disabled={verifying} /> 1-month
                        </label>
                    </div>
                    <div>
                        <label htmlFor="3-month">
                            <input name="package" type="radio" id="3-month" value="3" checked={this.props.selectedPackage === '3'} onChange={this.packageChanged.bind(this)} disabled={verifying} /> 3-month
                        </label>
                    </div>
                    <div>
                        <label htmlFor="6-month">
                            <input name="package" type="radio" id="6-month" value="6" checked={this.props.selectedPackage === '6'} onChange={this.packageChanged.bind(this)} disabled={verifying} /> 6-month
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}