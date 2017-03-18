import React from 'react';
import {render} from 'react-dom';
import store from '../../react/redux/store';
import {Provider} from 'react-redux';
import TransactionList from './transactions/transaction-list';
import Notifications from 'react-notify-toast';

render((
    <Provider store={store}>
        <div>
            <TransactionList/>
            <Notifications/>
        </div>
    </Provider>
), document.getElementById('transactions'));