import React from 'react';
import {render} from 'react-dom';
import PaymentContainer from './react/components/payment-container';
import store from './react/redux/store';
import {Provider} from 'react-redux';
import Notifications from 'react-notify-toast';

render(
    <Provider store={store}>
        <div>
            <PaymentContainer />
            <Notifications />
        </div>
    </Provider>,
    document.getElementById('payment-process')
);
