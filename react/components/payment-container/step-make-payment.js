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
        this.actions.setPaymentId(id);
        this.actions.getPaymentSignature(id, this.props.selectedPackage, this.props.user);
    }
    render() {
        const {PaymentPostUrl, MerchantCode, PaymentId, RefNo, Amount, Currency, ProdDesc, UserName, UserEmail, UserContact, Remark, Signature, ResponseUrl, BackendUrl, verifying} = this.props.payment;
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">3</span></div>
                    <h3 className="number-title">Make Payment</h3>
                    <form action={PaymentPostUrl} method="POST">
                        <table className="payment-method-list">
                        <tr>
                            <td><input type="radio" id="cimb" name="payment-method" value="20" onChange={this.paymentIdChanged.bind(this, 20)} className="payment-method-radio" disabled={verifying} /></td>
                            <td><label htmlFor="cimb" className="payment-label payment-cimb"></label></td>
                        </tr>
                        <tr>
                            <td><input type="radio" id="maybank" name="payment-method" value="6" onChange={this.paymentIdChanged.bind(this, 6)} className="payment-method-radio" disabled={verifying} /></td>
                            <td><label htmlFor="maybank" className="payment-label payment-maybank"></label></td>
                        </tr>
                        <tr>
                            <td><input type="radio" id="hongleong" name="payment-method" value="15" onChange={this.paymentIdChanged.bind(this, 15)} className="payment-method-radio" disabled={verifying} /></td>
                            <td><label htmlFor="hongleong" className="payment-label payment-hongleong"></label></td>
                        </tr>
                        <tr>
                            <td><input type="radio" id="ambank" name="payment-method" value="10" onChange={this.paymentIdChanged.bind(this, 10)} className="payment-method-radio" disabled={verifying} /></td>
                            <td><label htmlFor="ambank" className="payment-label payment-ambank"></label></td>
                        </tr>
                        <tr>
                            <td><input type="radio" id="alliance" name="payment-method" value="8" onChange={this.paymentIdChanged.bind(this, 8)} className="payment-method-radio" disabled={verifying} /></td>
                            <td><label htmlFor="alliance" className="payment-label payment-alliance"></label></td>
                        </tr>
                        <tr>
                            <td><input type="radio" id="rhb" name="payment-method" value="14" onChange={this.paymentIdChanged.bind(this, 14)} className="payment-method-radio" disabled={verifying} /></td>
                            <td><label htmlFor="rhb" className="payment-label payment-rhb"></label></td>
                        </tr>
                        <tr>
                            <td><input type="radio" id="fpx" name="payment-method" value="16" onChange={this.paymentIdChanged.bind(this, 16)} className="payment-method-radio" disabled={verifying} /></td>
                            <td><label htmlFor="fpx" className="payment-label payment-fpx"></label></td>
                        </tr>
                        <tr>
                            <td><input type="radio" id="webcash" name="payment-method" value="22" onChange={this.paymentIdChanged.bind(this, 22)} className="payment-method-radio" disabled={verifying} /></td>
                            <td><label htmlFor="webcash" className="payment-label payment-webcash"></label></td>
                        </tr>
                        </table>

                        <h1>RM{Amount}</h1>

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
                            {Object.getOwnPropertyNames(this.props.user).length === 0 ?
                                (
                                    <button className="btn btn-default" disabled={true}>Please complete step 1</button>
                                ) :
                                (
                                    <button className="btn btn-default" disabled={verifying}>{verifying ? 'Verifying' : 'Proceed to payment page'}<div className={'ball-clip-rotate ' + (verifying ? '' : 'hidden')}><div></div></div></button>
                                )
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}