import React, { Component } from 'react';
import '../App.css';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

var bigFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

class SubtotalRow extends Component {
    constructor(props) {
        super(props);

        this.calculateFundedSubtotal = this.calculateFundedSubtotal.bind(this);
    }

    calculateFundedSubtotal = (data) => {
        let subtotal = 0;
        data.forEach((element) => {
            // eslint-disable-next-line
            subtotal = subtotal + parseInt(element.loanAmount);
        })
        return subtotal;
    }

    calculatePayoutSubtotal = (data) => {
        let subtotal = 0;
        data.forEach((element) => {
            // eslint-disable-next-line
            subtotal = subtotal + parseInt(element.payout);
        })
        return subtotal;
    }

    render() {
        return (
            <div className='row rows subtotal' key={this.props.period[0].month + 'sub' + this.props.period[0].period}>
                <div className='col-md-1'></div>
                <div className='col-md-1'></div>
                <div className='col-md-2'></div>
                <div className='col-md-2'></div>
                <div className='col-md-1'><strong>Subtotal</strong></div>
                <div className='col-md-2'><strong>{ bigFormatter.format(this.calculateFundedSubtotal(this.props.period)) }</strong></div>
                <div className='col-md-1'></div>
                <div className='col-md-2'><strong>{ formatter.format(this.calculatePayoutSubtotal(this.props.period)) }</strong></div>
            </div>
        )
    }
}

export default SubtotalRow;