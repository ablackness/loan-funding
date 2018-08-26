import React, { Component } from 'react';
import '../App.css';

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
                <div className='col-md-2'>{ d.borrower }</div>
                <div className='col-md-2'>{ d.agent }</div>
                <div className='col-md-2'>{ d.loanAmount }</div>
                <div className='col-md-2'>{ d.BPS }</div>
                <div className='col-md-2'>{ d.period }</div>
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
            <div className='col-md-2'><strong>BORROWER</strong></div>
            <div className='col-md-2'><strong>AGENT</strong></div>
            <div className='col-md-2'><strong>AMOUNT</strong></div>
            <div className='col-md-2'><strong>BPS</strong></div>
            <div className='col-md-2'><strong>PERIOD</strong></div>
        </div>
        { t }
      </div>
    );
  }
}

export default Table;