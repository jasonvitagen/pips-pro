import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../react/redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    user: store.user,
    transactions: store.transactions
}))
export default class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
        this.actions.checkCookie();
        setTimeout(() => {
            this.actions.getTransactions(this.props.user);
        });
    }
    render() {
        const {user, transactions} = this.props;

        return (
            <div>
            {user.name ?
                (
                    transactions.length > 0 ?
                        (
                            transactions.map(transaction => (
                                <div className="compare-block mb30" key={transaction._id}>
                                    <div className="compare-title bg-primary pinside20">
                                        <h3 className="mb0">{transaction.SignalPackage}-month signal package</h3>
                                    </div>
                                    <div className="compare-row outline pinside30">
                                        <div className="row">
                                            <div className="col-md-3 col-sm-6">
                                                <div className="text-center">
                                                    <h3 className="rate">{transaction.RefNo}</h3>
                                                    <small>Reference Number</small> </div>
                                            </div>
                                            <div className="col-md-3 col-sm-6">
                                                <div className="text-center">
                                                    <h3 className="fees">{transaction.Currency + ' ' + transaction.Amount}</h3>
                                                    <small>Amount</small> </div>
                                            </div>
                                            <div className="col-md-3 col-sm-6">
                                                <div className="text-center">
                                                    <h3 className="compare-rate">{transaction.TransId}</h3>
                                                    <small>Transaction Id</small> </div>
                                            </div>
                                            <div className="col-md-3 col-sm-6">
                                                <div className="text-center">
                                                    <h3 className="repayment">{new Date(transaction.CreatedAt).toLocaleString()}</h3>
                                                    <small>Created At</small> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) :
                        (
                            <div>
                                <p>You do not have any transactions yet.</p>
                                <p><a href="/#sign-up-1" className="btn-link">Get a forex signal package now!</a></p>
                            </div>
                        )
                ):
                (
                    <a href="/#sign-up-1" className="btn-link">Please sign in first</a>
                )
            }
            </div>
        );
    }
}