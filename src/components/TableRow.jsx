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

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
        borrower: props.rowData.borrower,
        agent: props.rowData.agent,
        dateFunded: props.rowData.dateFunded,
        loanAmount: props.rowData.loanAmount,
        BPS: props.rowData.BPS,
        payout: props.rowData.payout
    }
    
    this.turnEditingOn = this.turnEditingOn.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.createRow = this.createRow.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  turnEditingOn(event) {
    event.stopPropagation();
    this.props.updateRowEditingState(this.props.rowData.loanID);
  }

  saveChanges() {
      //TODO - save changes to DB --need to write lambda function for update
  }

  handleInputChange(e) {
      switch (e.target.name) {
        case 'borrower':
            this.setState({
                borrower: e.target.value
            })
            break;

        case 'agent':
            this.setState({
                agent: e.target.value
            })
            break;

        case 'dateFunded':
            this.setState({
                dateFunded: e.target.value
            })
            break;

        case 'loanAmount':
            this.setState({
                loanAmount: e.target.value
            })
            break;

        case 'BPS':
            this.setState({
                BPS: e.target.value
            })
            break;

        case 'payout':
            this.setState({
                payout: e.target.value
            })
            break;
        
        default: return

      }
  }

  createRow() {
    var periodHighlight;
    // eslint-disable-next-line
    if((this.props.position === 1 && this.props.rowData.period == 2) || (this.props.position === 2 && this.props.rowData.period == 1)) {
        periodHighlight = 'highlight';
    } else periodHighlight = 'notPayoutRows';
    if (!this.props.editingRow) {
        return (
            <div className={'row rows ' + periodHighlight} onFocus = { this.turnEditingOn } tabIndex={0}>
                <div className='col-md-1'>{ this.props.rowData.period }</div>
                <div className='col-md-2 borrowerField'>{ this.state.borrower }</div>
                <div className='col-md-2'>{ this.state.agent }</div>
                <div className='col-md-2'>{ this.state.dateFunded }</div>
                <div className='col-md-2'>{ bigFormatter.format(this.state.loanAmount) }</div>
                <div className='col-md-1'>{ this.state.BPS }</div>
                <div className='col-md-2'>{ formatter.format(this.state.payout) }</div>
            </div>
          )
    } else {
        return (
            <div className={'row rows ' + periodHighlight} tabIndex={0}>
                <div className='col-md-1'>{ this.props.rowData.period }</div>
                <input name='borrower' onChange={ this.handleInputChange } type='text' className='col-md-2 editingBorrower' defaultValue={ this.state.borrower } />
                <input name='agent' type='text' onChange={ this.handleInputChange }className='col-md-2' defaultValue={ this.state.agent } />
                <input name='dateFunded' type='text' onChange={ this.handleInputChange } className='col-md-2' defaultValue={ this.state.dateFunded } />
                <input name='loanAmount' type='text' onChange={ this.handleInputChange } className='col-md-2' defaultValue={ bigFormatter.format(this.state.loanAmount) } />
                <input name='BPS' type='number' onChange={ this.handleInputChange } className='col-md-1' defaultValue={ this.state.BPS } />
                <div className='col-md-2'>{ formatter.format(this.state.payout) }</div>
            </div>
        )
    }
      
  }

  render() { 
    return this.createRow();
  }
}

export default TableRow;