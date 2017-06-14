import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

@connect(store => ({
    user: store.user
}))
export default class extends Component {
    submit(event) {
        event.preventDefault();
        axios.post(`${process.env.HOST}boss/send-signal`, {
            payload: this.signal.value
        }, {
            headers: {
                'Authorization': this.props.user.token
            }
        }).then(response => {
            alert(JSON.stringify(response.data));
        });
    }
    render() {
        return (
            <div>
                <h4>Send Signals</h4>
                <form onSubmit={this.submit.bind(this)}>
                    <textarea name="" id="" cols="60" rows="20" ref={ref=>this.signal = ref}></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}