import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../react/redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    user: store.user,
    transactions: store.transactions
}))
export default class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
        this.actions.checkCognitoSession();
        setTimeout(() => {
            this.actions.getTransactions(this.props.user);
        });
        this.signalPackageMapping = {
            [process.env.PRICE_1_MONTH]: 1,
            [process.env.PRICE_3_MONTH]: 3,
            [process.env.PRICE_6_MONTH]: 6
        };
    }
    render() {
        const {user, transactions} = this.props;

        return (
            <div>
                {user.name ? (
                    transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <div
                                className="compare-block mb30"
                                key={transaction.RefNo}>
                                <div className="compare-title bg-primary pinside20">
                                    <h3 className="mb0">
                                        {
                                            this.signalPackageMapping[
                                                transaction.Amount
                                            ]
                                        }
                                        -month signal package
                                    </h3>
                                </div>
                                <div className="compare-row outline pinside30">
                                    <div className="row">
                                        <div className="col-md-3 col-sm-6">
                                            <div className="text-center">
                                                <h3 className="rate">
                                                    {transaction.RefNo}
                                                </h3>
                                                <small>Reference Number</small>{' '}
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="text-center">
                                                <h3 className="fees">
                                                    {transaction.Currency +
                                                        ' ' +
                                                        transaction.Amount}
                                                </h3>
                                                <small>Amount</small>{' '}
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="text-center">
                                                <h3 className="compare-rate">
                                                    {transaction.TransId}
                                                </h3>
                                                <small>Transaction Id</small>{' '}
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="text-center">
                                                <h3 className="repayment">
                                                    {new Date(
                                                        transaction.CreatedAt
                                                    ).toLocaleString()}
                                                </h3>
                                                <small>Created At</small>{' '}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>You do not have any transactions yet.</p>
                            <p>
                                <a href="/#buy-signals-1" className="btn-link">
                                    Buy signals now!
                                </a>
                            </p>
                        </div>
                    )
                ) : (
                    <a href="/#buy-signals-1" className="btn-link">
                        Please sign in first
                    </a>
                )}
            </div>
        );
    }
}
