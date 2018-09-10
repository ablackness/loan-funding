import React, { Component } from 'react';
import TableRow from './TableRow';
import '../App.css';

// var bigFormatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
//   minimumFractionDigits: 0,
// });

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const reducer = (acc, currentValue) => acc + currentValue.payout;

const calcSubtotal = (period) => {
  return period.reduce(reducer,0);
}

const calcTotal = (periods) => {
  return periods.reduce(reducer, 0);
}

class Table extends Component {
  constructor(props) {
    super(props);

    var total = calcTotal(props.data);
    total = formatter.format(total);
    var subTotal1 = calcSubtotal(this.splitPeriods(props.data)[0]);
    var subTotal2 = calcSubtotal(this.splitPeriods(props.data)[1]);

    this.state = {
      payout: total,
      subTotal1: subTotal1,
      subTotal2: subTotal2
    }

    if (props.position === 1) {
      props.updatePayoutLastMonthPeriod2(subTotal2);
    }
    if (props.position === 2) {
      props.updatePayoutThisMonthPeriod1(subTotal1);
    }

    this.buildTable = this.buildTable.bind(this);
    this.splitPeriods = this.splitPeriods.bind(this);
    this.buildTotalRow = this.buildTotalRow.bind(this);
  }

  splitPeriods(bothPeriods) {
    var first = [];
    var second = [];
    bothPeriods.forEach( record => {
      // eslint-disable-next-line
      if(record.period == 1){
        first.push(record);
      } else {
        second.push(record);
      }
    });
    return [first, second];
  }

  buildTable(data) {
    if(data[0]) {
      data.sort(function(a, b) {
          return (new Date(a.dateFunded) - new Date(b.dateFunded));
      })
      // var periodHighlight;
      // // eslint-disable-next-line
      // if((this.props.position === 1 && data[0].period == 2) || (this.props.position === 2 && data[0].period == 1)) {
      //   periodHighlight = 'highlight';
      // }
      // var editWidget;
      // if (this.props.editing) {
      //   editWidget = (
      //     <div className="col-md-1">
      //       <i className="pointer icon pencil oi oi-pencil"></i>
      //       <i className="pointer icon x oi oi-x"></i>
      //       <i className="pointer icon check oi oi-check"></i>
      //     </div>
      //   );
      // } else editWidget = <div className="col-md-1"></div>;
      return data.map( d => {
          return (
                <TableRow rowData={ d } editingMonth = { this.props.editing }/>
                // <div className={'row rows ' + periodHighlight} key={d.loanID}>
                //     { editWidget }
                //     <div className='col-md-1'>{ d.period }</div>
                //     <div className='col-md-2'>{ d.borrower }</div>
                //     <div className='col-md-2'>{ d.agent }</div>
                //     <div className='col-md-1'>{ d.dateFunded }</div>
                //     <div className='col-md-2'>{ bigFormatter.format(d.loanAmount) }</div>
                //     <div className='col-md-1'>{ d.BPS }</div>
                //     <div className='col-md-2'>{ formatter.format(d.payout) }</div>
                // </div>
              )
          }    
      )
    } else {
      return (
        <div>No data available for this period.</div>
      )
    }
  }

  buildSubtotalRow(period) {
    if(period[0]) {
      return (
        <div className='row rows' key={period[0].month + 'sub' + period[0].period}>
            <div className='col-md-1'></div>
            <div className='col-md-1'></div>
            <div className='col-md-2'></div>
            <div className='col-md-2'></div>
            <div className='col-md-1'></div>
            <div className='col-md-2'></div>
            <div className='col-md-1'><strong>Subtotal</strong></div>
            <div className='col-md-2'><strong>{ formatter.format(period[0].period === 1 ? this.state.subTotal1 : this.state.subTotal2) }</strong></div>
        </div>
      )
    } else return;
  }

  buildTotalRow(periods) {
    if(periods[0]) {
      return (
        <div className='row rows' key={periods[0].month + 'total'}>
            <div className='col-md-1'></div>
            <div className='col-md-1'></div>
            <div className='col-md-2'></div>
            <div className='col-md-2'></div>
            <div className='col-md-1'></div>
            <div className='col-md-2'></div>
            <div className='col-md-1'><strong>Total Funded</strong></div>
            <div className='col-md-2'><strong>{ this.state.payout }</strong></div>
        </div>
      )
    } else return;
  }

  render() {
    var periodOneTable = this.buildTable(this.splitPeriods(this.props.data)[0]);
    var periodOneSubtotal = this.buildSubtotalRow(this.splitPeriods(this.props.data)[0]);
    var periodTwoTable = this.buildTable(this.splitPeriods(this.props.data)[1]);
    var periodTwoSubtotal = this.buildSubtotalRow(this.splitPeriods(this.props.data)[1]);
    var monthTotal = this.buildTotalRow(this.props.data);
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
        { periodOneTable }
        { periodOneSubtotal }
        { periodTwoTable }
        { periodTwoSubtotal }
        { monthTotal }
      </div>
    );
  }
}

export default Table;