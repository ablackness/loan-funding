import React, { Component } from 'react';
import '../App.css';

var bigFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

class Table extends Component {
  constructor(props) {
    super(props);

    this.buildTable = this.buildTable.bind(this);
  }

  buildTable(data) {
    data.sort(function(a, b) {
        return a.period - b.period;
    })
    console.log("data in buildTable func", data);
    return data.map( d => {
        return (
            <div className='row rows' key={d.loanID}>
                <div className='col-md-1'></div>
                <div className='col-md-1'>{ d.period }</div>
                <div className='col-md-2'>{ d.borrower }</div>
                <div className='col-md-2'>{ d.agent }</div>
                <div className='col-md-1'>{ d.dateFunded }</div>
                <div className='col-md-2'>{ bigFormatter.format(d.loanAmount) }</div>
                <div className='col-md-1'>{ d.BPS }</div>
                <div className='col-md-2'>{ formatter.format(d.payout) }</div>
            </div>
            )
        }    
    )
  }

  render() {
    var t = this.buildTable(this.props.data);
    return (
      <div className="Table">
        <div className='row titles'>
            <div className='col-md-1'></div>
            <div className='col-md-1'><strong>PERIOD</strong></div>
            <div className='col-md-2'><strong>BORROWER</strong></div>
            <div className='col-md-2'><strong>AGENT</strong></div>
            <div className='col-md-1'><strong>FUNDED DATE</strong></div>
            <div className='col-md-2'><strong>AMOUNT</strong></div>
            <div className='col-md-1'><strong>BPS</strong></div>
            <div className='col-md-2'><strong>PAYOUT</strong></div>
            
        </div>
        { t }
      </div>
    );
  }
}

export default Table;