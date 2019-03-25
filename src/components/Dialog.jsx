import React, { Component } from 'react';
import '../App.css';

class Dialog extends Component {
    render() {
        return (
            <div>
                <h3 className='modalTitle'>{ this.props.title }</h3>
                <p>{ this.props.message }</p>
                <button type='button' onClick={ this.props.yesCallback } className='btn btn-success dialog-yes'>{ this.props.yesButton }</button>
                <button type='button' onClick={ this.props.noCallback } className='btn btn-danger dialog-no'>{ this.props.noButton }</button>
            </div>
        )
    }
}

export default Dialog;