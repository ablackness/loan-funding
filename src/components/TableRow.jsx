import React, { Component } from 'react';
import axios from 'axios';
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
            payout: props.rowData.payout,
            inputChanged: false
        }

        this.turnEditingOn = this.turnEditingOn.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.createRow = this.createRow.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.turnEditingOff = this.turnEditingOff.bind(this);
    }

    turnEditingOn(event) {
        event.stopPropagation();
        this.props.updateRowEditingState(this.props.rowData.loanID);
    }

    turnEditingOff() {
        // event.stopPropagation();
        this.props.updateRowEditingState('');
    }

    saveChanges() {
        //   console.log(event.keyCode);
        // if(event.keyCode === 13) {
        // let current = this.state;
        // this.setState({
        //     borrower: current.borrower,
        //     agent: current.agent,
        //     dateFunded: current.dateFunded,
        //     loanAmount: current.loanAmount,
        //     BPS: current.BPS,
        //     payout: current.payout
        // })
        // } else {
        if(this.state.inputChanged) {
            var d = new Date(this.state.dateFunded);
            var month = d.getMonth();
            var year = d.getFullYear();
            var period = d.getDate() <= 15 ? 1 : 2
            var bodyData = {
                month: month + 1,
                year: year,
                period: period,
                borrower: this.state.borrower,
                agent: this.state.agent,
                dateFunded: this.state.dateFunded,
                loanAmount: this.state.loanAmount,
                BPS: this.state.BPS
            }
            axios.patch(`https://t3ojby2w53.execute-api.us-east-1.amazonaws.com/LoanDev/loans/${this.props.rowData.loanID}`, bodyData)
                .then((results) => {
                    console.log('Update Successful');
                    this.props.getData();
                    // this.props.updateTotals();
                    // this.props.flagDataUpdate(true);
                    this.turnEditingOff();
                    this.setState({
                        inputChanged: false
                    })
                    console.log('save changes');
                    console.log(this.props.rowData);
                })
                .catch((err) => {
                    console.log(err);
                    this.turnEditingOff();
                }
            )
        } else {
            this.turnEditingOff();
        }
        
        // }
    }

    deleteRow(info) {
        // alert('TRASH');
        this.setState({...info, inputChanged: false});
        this.turnEditingOff();
    }

    handleInputChange(e) {
        switch (e.target.name) {
            case 'borrower':
                this.setState({
                    borrower: e.target.value,
                    inputChanged: true
                })
                break;

            case 'agent':
                this.setState({
                    agent: e.target.value,
                    inputChanged: true
                })
                break;

            case 'dateFunded':
                this.setState({
                    dateFunded: e.target.value,
                    inputChanged: true
                })
                break;

            case 'loanAmount':
                const regex = /[^0-9.]+/g;
                const numericalLoanAmount = e.target.value.replace(regex, '');
                console.log(numericalLoanAmount);
                this.setState({
                    loanAmount: numericalLoanAmount,
                    inputChanged: true
                })
                break;

            case 'BPS':
                this.setState({
                    BPS: e.target.value,
                    inputChanged: true
                })
                break;

            case 'payout':
                this.setState({
                    payout: e.target.value,
                    inputChanged: true
                })
                break;

            default: return

        }
    }

    createRow() {
        var periodHighlight;
        let loanInfo = {
            period: this.props.rowData.period,
            borrower: this.state.borrower,
            agent: this.state.agent,
            dateFunded: this.state.dateFunded,
            loanAmount: this.state.loanAmount,
            BPS: this.state.BPS,
            payout: this.state.payout
        }
        // eslint-disable-next-line
        if ((this.props.position === 1 && this.props.rowData.period == 2) || (this.props.position === 2 && this.props.rowData.period == 1)) {
            periodHighlight = 'highlight';
        } else periodHighlight = 'notPayoutRows';
        if (!this.props.editingRow) {
            return (
                <div className={'row rows ' + periodHighlight} /*onFocus = { this.turnEditingOn }*/ tabIndex={0}>
                    <div className='iconDiv'>
                        <span className='pencil glyphicon glyphicon-pencil pointer' title='Edit this row' onClick={this.turnEditingOn}></span>
                    </div>
                    <div className='col-md-1'>{this.props.rowData.period}</div>
                    <div className='col-md-2 borrowerField'>{this.state.borrower}</div>
                    <div className='col-md-2'>{this.state.agent}</div>
                    <div className='col-md-2'>{this.state.dateFunded}</div>
                    <div className='col-md-2'>{bigFormatter.format(this.state.loanAmount)}</div>
                    <div className='col-md-1'>{this.state.BPS}</div>
                    <div className='col-md-2'>{formatter.format(this.state.payout)}</div>
                </div>
            )
        } else {
            return (
                <div className={'row rows ' + periodHighlight} tabIndex={0} /*onBlur = { this.saveChanges }*/>
                    <div className='col-md-1 iconDiv'>
                        <span className='x glyphicon glyphicon-remove pointer' title='Discard changes' onClick={() => this.deleteRow(loanInfo)}></span>
                        <span className='check glyphicon glyphicon-ok pointer' title='Save this row' onClick={this.saveChanges}></span>
                    </div>
                    {/* <div className='col-md-1 periodRow'>{ this.props.rowData.period }</div> */}
                    <input name='borrower' onChange={this.handleInputChange} type='text' className='col-md-2 editingBorrower' defaultValue={this.state.borrower} />
                    <input name='agent' type='text' onChange={this.handleInputChange} className='col-md-2' defaultValue={this.state.agent} />
                    <input name='dateFunded' type='text' onChange={this.handleInputChange} className='col-md-2' defaultValue={this.state.dateFunded} />
                    <input name='loanAmount' type='number' min='0' step='1' onChange={this.handleInputChange} className='col-md-2' defaultValue={ /*bigFormatter.format*/(this.state.loanAmount)} />
                    <input name='BPS' type='number' onChange={this.handleInputChange} className='col-md-1' defaultValue={this.state.BPS} />
                    <div className='col-md-2'>{formatter.format(this.state.payout)}</div>
                </div>
            )
        }
    }

    render() {
        return this.createRow();
    }
}

export default TableRow;