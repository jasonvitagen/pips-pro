import React from 'react';
import {render} from 'react-dom';
import PaymentContainer from './react/components/payment-container';
import store from './react/redux/store';
import {Provider} from 'react-redux';

render((
    <Provider store={store}>
        <PaymentContainer/>
    </Provider>
), document.getElementById('payment-process'));