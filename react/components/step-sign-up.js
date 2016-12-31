import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signInUser} from '../redux/action';

@connect(store => ({
    signedIn: store.signedIn,
    user: store.user
}))
export default class StepSignUp extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(signInUser({name: 'Jason Cheng'}));
    }
    render() {
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">1</span></div>
                    <h3 className="number-title">Choose Loan Amount</h3>
                    <p>Suspendisse accumsan imperdue ligula dignissim sit amet vestibulum in mollis etfelis.</p>
                </div>
            </div>
        );
    }
}