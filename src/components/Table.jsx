import React, { Component } from 'react';
import TableRow from './TableRow';
import SubtotalRow from './SubtotalRow';
import TotalRow from './TotalRow';
import '../App.css';

var bigFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

const payoutReducer = (acc, currentValue) => acc + currentValue.payout;
// eslint-disable-next-line
const fundedReducer = (acc, currentValue) => acc + parseInt(currentValue.loanAmount);

class Table extends Component {
  constructor(props) {
    super(props);

    let fundedTotal = this.calcFundedTotal(props.data);
    fundedTotal = bigFormatter.format(fundedTotal);
    let payoutSubtotal1 = this.calcPayoutSubtotal(this.splitPeriods(props.data)[0]);
    let payoutSubtotal2 = this.calcPayoutSubtotal(this.splitPeriods(props.data)[1]);
    let fundedSubtotal1 = this.calcFundedSubtotal(this.splitPeriods(props.data)[0]);
    let fundedSubtotal2 = this.calcFundedSubtotal(this.splitPeriods(props.data)[1]);

    this.state = {
      fundedTotal: fundedTotal,
      payoutSubtotal1: payoutSubtotal1,
      payoutSubtotal2: payoutSubtotal2,
      fundedSubtotal1: fundedSubtotal1,
      fundedSubtotal2: fundedSubtotal2,
      editingRowLoanID: ''
    }

    if (props.position === 1) {
      props.updatePayoutLastMonthPeriod2(payoutSubtotal2);
    }
    if (props.position === 2) {
      props.updatePayoutThisMonthPeriod1(payoutSubtotal1);
    }

    this.buildTable = this.buildTable.bind(this);
    this.splitPeriods = this.splitPeriods.bind(this);
    this.buildTotalRow = this.buildTotalRow.bind(this);
    this.updateRowEditingState = this.updateRowEditingState.bind(this);
    this.calcFundedSubtotal = this.calcFundedSubtotal.bind(this);
    this.calcFundedTotal = this.calcFundedTotal.bind(this);
    this.calcPayoutSubtotal = this.calcPayoutSubtotal.bind(this);
    this.updateTotals = this.updateTotals.bind(this);
  }

  calcPayoutSubtotal = (period) => {
    return period.reduce(payoutReducer,0);
  }
  
  calcFundedSubtotal = (period) => {
    return period.reduce(fundedReducer,0);
  }
  
  calcFundedTotal = (periods) => {
    return periods.reduce(fundedReducer, 0);
  }

  updateTotals() {
    let fTotal = this.calcFundedTotal(this.props.data);
    fTotal = bigFormatter.format(fTotal);
    let pSubtotal1 = this.calcPayoutSubtotal(this.splitPeriods(this.props.data)[0]);
    let pSubtotal2 = this.calcPayoutSubtotal(this.splitPeriods(this.props.data)[1]);
    let fSubtotal1 = this.calcFundedSubtotal(this.splitPeriods(this.props.data)[0]);
    let fSubtotal2 = this.calcFundedSubtotal(this.splitPeriods(this.props.data)[1]);
    this.setState({
      fundedTotal: fTotal,
      payoutSubtotal1: pSubtotal1,
      payoutSubtotal2: pSubtotal2,
      fundedSubtotal1: fSubtotal1,
      fundedSubtotal2: fSubtotal2
    })
  }

  splitPeriods(bothPeriods) {
    let first = [];
    let second = [];
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

  updateRowEditingState(loanID) {
    this.setState({
      editingRowLoanID: loanID
    })
    this.props.updateEditingPosition(this.props.position);
  }

  buildTable(data) {
    if(data[0]) {
      data.sort(function(a, b) {
          return (new Date(a.dateFunded) - new Date(b.dateFunded));
      })
      return data.map( d => {
          let editing;
          if (d.loanID === this.state.editingRowLoanID && this.props.editingPosition === this.props.position) {
            editing = true;
          } else editing = false;
          return (
                <TableRow
                  key = { d.loanID } 
                  rowData={ d } 
                  editingRow = { editing } 
                  position = { this.props.position } 
                  updateRowEditingState = { this.updateRowEditingState }
                  flagDataUpdate = { this.props.flagDataUpdate }
                  updateTotals = { this.updateTotals }
                  getData = { this.props.getData }
                />
              )
          }    
      )
    } else {
      return (
        <div>No data available for this period.</div>
      )
    }
  }

  buildSubtotalRow(p) {
    if(p[0]) {
      return (
        <SubtotalRow period = { p } />
      )
    } else return;
  }

  buildTotalRow(ps) {
    if(ps[0]) {
      return (
        <TotalRow periods = { ps } />
      )
    } else return;
  }

  render() {
    document.body.setAttribute("tabindex",0);
    let periodOneTable = this.buildTable(this.splitPeriods(this.props.data)[0]);
    let periodOneSubtotal = this.buildSubtotalRow(this.splitPeriods(this.props.data)[0]);
    let periodTwoTable = this.buildTable(this.splitPeriods(this.props.data)[1]);
    let periodTwoSubtotal = this.buildSubtotalRow(this.splitPeriods(this.props.data)[1]);
    let monthTotal = this.buildTotalRow(this.props.data);
    return (
      <div className="Table">
        <div className='row titles'>
            <div className='col-md-1'><strong>PERIOD</strong></div>
            <div className='col-md-2'><strong>BORROWER</strong></div>
            <div className='col-md-2'><strong>AGENT</strong></div>
            <div className='col-md-2'><strong>FUNDED DATE</strong></div>
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