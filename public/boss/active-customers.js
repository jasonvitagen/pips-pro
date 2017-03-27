import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../react/redux/action';
import {connect} from 'react-redux';

@connect(store => ({
    user: store.user,
    activeCustomers: store.activeCustomers
}))
export default class Boss extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actions, this.props.dispatch);
        this.actions.checkCookie();
        setTimeout(() => {
            this.actions.getActiveCustomers(this.props.user);
        });
    }
    render() {
        return (
            <div>
            {this.props.activeCustomers.length > 0 &&
                (
                    <div>
                        <div>
                            <h4>Active Customers</h4>
                            <ul>
                                {this.props.activeCustomers.map(customer => (
                                    <li>{customer.mobile.charAt(0) !== '6' ? '6' + customer.mobile : customer.mobile} {customer.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4>Active Customers</h4>
                            <p>{this.props.activeCustomers.map(customer => (
                                    <span>{customer.mobile.charAt(0) !== '6' ? '6' + customer.mobile : customer.mobile},</span>
                                ))}</p>
                        </div>
                    </div>
                )
            }
            </div>
        );
    }
}