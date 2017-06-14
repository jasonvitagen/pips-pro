import React from 'react';
import {render} from 'react-dom';
import store from '../../react/redux/store';
import {Provider} from 'react-redux';
import ActiveCustomers from './active-customers';
import SendSignals from './send-signals';
import Notifications from 'react-notify-toast';

render((
    <Provider store={store}>
        <div>
            <ActiveCustomers/>
            <SendSignals/>
        </div>
    </Provider>
), document.getElementById('boss'));