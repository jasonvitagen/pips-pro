import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CreateAccount from './create-account';

@connect(store => ({
    user: store.user
}))
export default class StepSignUp extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {user} = this.props;
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                    <div className="circle"><span className="number">1</span></div>
                    {user.name ?
                        (
                            <div>
                                <p>Welcome <b>{user.name}</b></p>
                                <p>Email: <b>{user.email}</b></p>
                                <p>Mobile: <b>{user.mobile}</b></p>
                                <br/>
                                <p><button className="btn btn-xs btn-ouline">Sign out</button></p>
                            </div>
                        ) :
                        (
                            <div>
                                <p><a href="#" className="btn-link">Create an account</a></p>
                                <CreateAccount/>
                                <p>or</p>
                                <p><a href="#" className="btn-link">Sign in</a></p>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}