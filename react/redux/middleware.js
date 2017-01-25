import jwtDecode from 'jwt-decode';
import {notify} from 'react-notify-toast';

const
    jwtDecodeMiddleware = store => next => action => {
        switch (action.type) {
            case 'CREATE_ACCOUNT_FULFILLED':
                action.payload = jwtDecode(action.payload.data);
        }
        next(action);
    }
    , notificationMiddleware = store => next => action => {
        switch(action.type) {
            case 'CREATE_ACCOUNT_REJECTED':
                if (typeof action.payload.response.data === 'string') {
                    notify.show(action.payload.response.data, 'error');
                } else {
                    notify.show('Registration is unsuccessful, please check', 'error');
                }
                break;
            case 'CREATE_ACCOUNT_FULFILLED':
                notify.show('Registration is successful', 'success');
        }
        next(action);
    }

export {
    jwtDecodeMiddleware,
    notificationMiddleware
};