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
        editing: false
    }

    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  toggleEdit() {
      this.setState({
          editing: !this.state.editing
      })
  }

  saveChanges() {
      this.toggleEdit();
      //TODO - save changes to DB --need to write lambda function for update
  }


  render() {
    var periodHighlight;
    // eslint-disable-next-line
    if((this.props.position === 1 && data[0].period == 2) || (this.props.position === 2 && data[0].period == 1)) {
    periodHighlight = 'highlight';
    }
    var editWidget;
    if (this.props.editingMonth) {
        if(!this.state.editing) {
            editWidget = (
                <div className="col-md-1">
                  <i className="pointer icon pencil oi oi-pencil" onClick = { this.toggleEdit }></i>
                </div>
              )
        } else {
            editWidget = (
                <div className="col-md-1">
                    <i className="pointer icon x oi oi-x" onClick = { this.toggleEdit }></i>
                    <i className="pointer icon check oi oi-check" onClick = { this.saveChanges }></i>
                </div>
            )
        }
      
    } else editWidget = <div className="col-md-1"></div>;  
    return (
        <div className={'row rows ' + periodHighlight} key={this.props.rowData.loanID}>
            { editWidget }
            <div className='col-md-1'>{ this.props.rowData.period }</div>
            <div className='col-md-2'>{ this.props.rowData.borrower }</div>
            <div className='col-md-2'>{ this.props.rowData.agent }</div>
            <div className='col-md-1'>{ this.props.rowData.dateFunded }</div>
            <div className='col-md-2'>{ bigFormatter.format(this.props.rowData.loanAmount) }</div>
            <div className='col-md-1'>{ this.props.rowData.BPS }</div>
            <div className='col-md-2'>{ formatter.format(this.props.rowData.payout) }</div>
        </div>
    );
  }
}

export default TableRow;