import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/action';
import {bindActionCreators} from 'redux';

@connect(store => ({
    user: store.user,
    payment: store.payment,
    selectedPackage: store.selectedPackage
}))
export default class StepMakePayment extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
    }
    paymentIdChanged(id) {
        this.actions.setPaymentId(id);
        this.actions.getPaymentSignature(
            id,
            this.props.selectedPackage,
            this.props.user
        );
    }
    render() {
        const {
            PaymentPostUrl,
            MerchantCode,
            PaymentId,
            RefNo,
            Amount,
            Currency,
            CurrencyPrefix,
            ProdDesc,
            UserName,
            UserEmail,
            UserContact,
            Remark,
            Signature,
            SignatureType,
            ResponseUrl,
            BackendUrl,
            verifying
        } = this.props.payment;
        const disabled = !this.props.user.email || verifying;

        let button;
        if (Object.getOwnPropertyNames(this.props.user).length === 0) {
            button = (
                <button
                    className="btn btn-default"
                    id="payment-button"
                    disabled={true}>
                    Please complete step 1
                </button>
            );
        } else if (!PaymentId) {
            button = (
                <button
                    className="btn btn-default"
                    id="payment-button"
                    disabled={true}>
                    Select a payment method
                </button>
            );
        } else {
            button = (
                <button
                    className="btn btn-default"
                    id="payment-button"
                    disabled={verifying}>
                    {verifying ? 'Verifying' : 'Proceed to payment page'}
                    <div
                        className={
                            'ball-clip-rotate ' + (verifying ? '' : 'hidden')
                        }>
                        <div />
                    </div>
                </button>
            );
        }

        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle">
                        <span className="number">3</span>
                    </div>
                    <h3 className="number-title">Make Payment</h3>
                    <div className={(Amount ? '' : 'hidden') + ' mt0'}>
                        You will be charged:
                    </div>
                    <div className="mt10 mb30">
                        <h2>{Amount ? `${CurrencyPrefix} ${Amount}` : ''}</h2>
                    </div>
                    <p>Select a payment method:</p>
                    <form action={PaymentPostUrl} method="POST">
                        <table className="payment-method-list">
                            {/*<thead>*/}
                            {/*<tr>*/}
                            {/*<td>*/}
                            {/*<input*/}
                            {/*type="radio"*/}
                            {/*id="paypal"*/}
                            {/*name="payment-method"*/}
                            {/*value="paypal"*/}
                            {/*onChange={this.paymentIdChanged.bind(*/}
                            {/*this,*/}
                            {/*'paypal'*/}
                            {/*)}*/}
                            {/*className="payment-method-radio"*/}
                            {/*disabled={disabled}*/}
                            {/*/>*/}
                            {/*</td>*/}
                            {/*<td>*/}
                            {/*<label*/}
                            {/*htmlFor="paypal"*/}
                            {/*className="payment-label payment-paypal">*/}
                            {/*<img*/}
                            {/*src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppppcmcvdam.png"*/}
                            {/*alt="Credit Card Badges"*/}
                            {/*/>*/}
                            {/*</label>*/}
                            {/*</td>*/}
                            {/*</tr>*/}
                            {/*</thead>*/}
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="cimb"
                                            name="payment-method"
                                            value="20"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                20
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="cimb"
                                            className="payment-label payment-cimb"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="maybank"
                                            name="payment-method"
                                            value="6"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                6
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="maybank"
                                            className="payment-label payment-maybank"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="hongleong"
                                            name="payment-method"
                                            value="15"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                15
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="hongleong"
                                            className="payment-label payment-hongleong"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="ambank"
                                            name="payment-method"
                                            value="10"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                10
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="ambank"
                                            className="payment-label payment-ambank"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="alliance"
                                            name="payment-method"
                                            value="8"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                8
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="alliance"
                                            className="payment-label payment-alliance"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="rhb"
                                            name="payment-method"
                                            value="14"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                14
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="rhb"
                                            className="payment-label payment-rhb"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="islam"
                                            name="payment-method"
                                            value="134"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                134
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="islam"
                                            className="payment-label payment-islam"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="publicbank"
                                            name="payment-method"
                                            value="31"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                31
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="publicbank"
                                            className="payment-label payment-publicbank"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="fpx"
                                            name="payment-method"
                                            value="16"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                16
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="fpx"
                                            className="payment-label payment-fpx"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="webcash"
                                            name="payment-method"
                                            value="22"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                22
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="webcash"
                                            className="payment-label payment-webcash"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="affinbank"
                                            name="payment-method"
                                            value="103"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                103
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="affinbank"
                                            className="payment-label payment-affinbank"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="uob"
                                            name="payment-method"
                                            value="152"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                152
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="uob"
                                            className="payment-label payment-uob"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="standardchartered"
                                            name="payment-method"
                                            value="168"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                168
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="standardchartered"
                                            className="payment-label payment-standardchartered"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="ocbc"
                                            name="payment-method"
                                            value="167"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                167
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="ocbc"
                                            className="payment-label payment-ocbc"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="muamalat"
                                            name="payment-method"
                                            value="166"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                166
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="muamalat"
                                            className="payment-label payment-muamalat"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            id="bsn"
                                            name="payment-method"
                                            value="124"
                                            onChange={this.paymentIdChanged.bind(
                                                this,
                                                124
                                            )}
                                            className="payment-method-radio"
                                            disabled={disabled}
                                        />
                                    </td>
                                    <td>
                                        <label
                                            htmlFor="bsn"
                                            className="payment-label payment-bsn"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <input
                            name="MerchantCode"
                            type="hidden"
                            value={MerchantCode}
                        />
                        <input
                            name="PaymentId"
                            type="hidden"
                            value={PaymentId}
                        />
                        <input name="RefNo" type="hidden" value={RefNo} />
                        <input name="Amount" type="hidden" value={Amount} />
                        <input name="Currency" type="hidden" value={Currency} />
                        <input name="ProdDesc" type="hidden" value={ProdDesc} />
                        <input name="UserName" type="hidden" value={UserName} />
                        <input
                            name="UserEmail"
                            type="hidden"
                            value={UserEmail}
                        />
                        <input
                            name="UserContact"
                            type="hidden"
                            value={UserContact}
                        />
                        <input name="Remark" type="hidden" value={Remark} />
                        <input
                            name="SignatureType"
                            type="hidden"
                            value={SignatureType}
                        />
                        <input
                            name="Signature"
                            type="hidden"
                            value={Signature}
                        />
                        <input
                            name="ResponseUrl"
                            type="hidden"
                            value={ResponseUrl}
                        />
                        <input
                            name="BackendUrl"
                            type="hidden"
                            value={BackendUrl}
                        />
                        <input
                            name="SelectedPackage"
                            type="hidden"
                            value={this.props.selectedPackage}
                        />

                        <div className="form-group">{button}</div>
                    </form>
                </div>
            </div>
        );
    }
}
