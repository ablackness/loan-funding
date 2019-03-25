import React, { Component } from 'react';
import '../App.css';

var bigFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

class TotalRow extends Component {
    constructor(props) {
        super(props);

        this.calculcateTotal = this.calculcateTotal.bind(this);
    }

    calculcateTotal = (data) => {
        let total = 0;
        data.forEach((element) => {
            // eslint-disable-next-line
            total = total + parseInt(element.loanAmount);
        })
        return total;
    }

    render() {
        return (
            <div className='row rows total' key={this.props.periods[0].month + 'total'}>
                <div className='col-md-1'></div>
                <div className='col-md-1'></div>
                <div className='col-md-2'></div>
                <div className='col-md-2'></div>
                <div className='col-md-1'><strong>Total</strong></div>
                <div className='col-md-2'><strong>{ bigFormatter.format(this.calculcateTotal(this.props.periods)) }</strong></div>
                <div className='col-md-1'></div>
                <div className='col-md-2'></div>
            </div>
        )
    }
}

export default TotalRow;