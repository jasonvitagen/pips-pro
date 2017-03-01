import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/action';
import {bindActionCreators} from 'redux';

@connect(store => ({
    user: store.user,
    payment: store.payment,
    selectedPackage: store.selectedPackage
}))
export default class StepConfirmUser extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    paymentIdChanged(id) {
        this.actions.getPaymentSignature(id, this.props.selectedPackage, this.props.user);
    }
    render() {
        const {PaymentPostUrl, MerchantCode, PaymentId, RefNo, Amount, Currency, ProdDesc, UserName, UserEmail, UserContact, Remark, Signature, ResponseUrl, BackendUrl} = this.props.payment;
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">3</span></div>
                    <h3 className="number-title">Make Payment</h3>
                    <form action={PaymentPostUrl} method="POST">
                        <div className="form-group">
                            <label htmlFor="cimb">
                                <input type="radio" id="cimb" name="payment-method" value="20" onChange={this.paymentIdChanged.bind(this, 20)} /> CIMB
                            </label>
                        </div>

                        <input name="MerchantCode" type="hidden" value={MerchantCode} />
                        <input name="PaymentId" type="hidden" value={PaymentId} />
                        <input name="RefNo" type="hidden" value={RefNo} />
                        <input name="Amount" type="hidden" value={Amount} />
                        <input name="Currency" type="hidden" value={Currency} />
                        <input name="ProdDesc" type="hidden" value={ProdDesc} />
                        <input name="UserName" type="hidden" value={UserName} />
                        <input name="UserEmail" type="hidden" value={UserEmail} />
                        <input name="UserContact" type="hidden" value={UserContact} />
                        <input name="Remark" type="hidden" value={Remark} />
                        <input name="Signature" type="hidden" value={Signature} />
                        <input name="ResponseUrl" type="hidden" value={ResponseUrl} />
                        <input name="BackendUrl" type="hidden" value={BackendUrl} />

                        <div className="form-group">
                            <button className="btn btn-default" >Pay</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}