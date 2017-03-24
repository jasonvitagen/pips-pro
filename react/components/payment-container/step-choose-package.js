import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    selectedPackage: store.selectedPackage,
    payment: store.payment,
    user: store.user
}))
export default class StepChoosePackage extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    packageChanged(event) {
        this.actions.selectPackage(event.target.value);
        this.actions.getPaymentSignature(this.props.payment.PaymentId, event.target.value, this.props.user);
    }
    render() {
        const {verifying} = this.props.payment;
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">2</span></div>
                    <h3 className="number-title">Choose A Package</h3>
                    <div className="choose-package-list mt30">
                        <div className="mb10">
                            <label htmlFor="1-month">
                                <input name="package" type="radio" id="1-month" value="1" checked={this.props.selectedPackage === '1'} onChange={this.packageChanged.bind(this)} disabled={verifying} /> 1-month
                            </label>
                        </div>
                        <div className="mb10">
                            <label htmlFor="3-month">
                                <input name="package" type="radio" id="3-month" value="3" checked={this.props.selectedPackage === '3'} onChange={this.packageChanged.bind(this)} disabled={verifying} /> 3-month (20% off)
                            </label>
                        </div>
                        <div className="mb10">
                            <label htmlFor="6-month">
                                <input name="package" type="radio" id="6-month" value="6" checked={this.props.selectedPackage === '6'} onChange={this.packageChanged.bind(this)} disabled={verifying} /> 6-month (30% off)
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}