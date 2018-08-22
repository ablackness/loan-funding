import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class LoanInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
        borrower: '',
        agent: '',
        loanAmount: 0,
        dateFunded: "2000-01-01",
        BPS: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.borrowerChange = this.borrowerChange.bind(this);
    this.agentChange = this.agentChange.bind(this);
    this.loanAmountChange = this.loanAmountChange.bind(this);
    this.dateFundedChange = this.dateFundedChange.bind(this);
    this.BPSChange = this.BPSChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var d = new Date(this.state.dateFunded);
    var month = d.getMonth();
    var year = d.getFullYear();
    var period = d.getDate() <= 15 ? 1 : 2
    var bodyData = {
        month: month + 1,
        year: year,
        period: period,
        info: {
            borrower: this.state.borrower,
            agent: this.state.agent,
            dateFunded: this.state.dateFunded,
            loanAmount: this.state.loanAmount,
            BPS: this.state.BPS
        }
    }
    console.log(bodyData);
    axios.post("https://t3ojby2w53.execute-api.us-east-1.amazonaws.com/LoanDev/loans",bodyData);
    this.setState(
        {
            borrower: '',
            agent: '',
            loanAmount: 0,
            dateFunded: "2000-01-01",
            BPS: 0 
        });
  }

  borrowerChange(event) {
      this.setState({borrower: event.target.value})
  }
  
  agentChange(event) {
    this.setState({agent: event.target.value})
  }

  loanAmountChange(event) {
    this.setState({loanAmount: event.target.value})
  }

  dateFundedChange(event) {
    this.setState({dateFunded: event.target.value})
  }

  BPSChange(event) {
      this.setState({BPS: event.target.value})
  }

  render() {
    return (
      <div className="LoanInput">
        <h1>Loan Input</h1>
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="borrowerName">Borrower</label>
                <input onChange={ this.borrowerChange } value={ this.state.borrower } className="form-control" type="text"/>
            </div>
            <div className="form-group">
                <label htmlFor="agentName">Agent</label>
                <input onChange={ this.agentChange } value={ this.state.agent } className="form-control" type="text"/>
            </div>
            <div className="form-group">
                <label htmlFor="loanAmount">Loan Amount</label>
                <input onChange={ this.loanAmountChange } value={ this.state.loanAmount } className="form-control" type="number"/>
            </div>
            <div className="form-group">
                <label htmlFor="dateFunded">Date Funded</label>
                <input onChange={ this.dateFundedChange } value={ this.state.dateFunded } className="form-control" type="date"/>
            </div>
            <div className="form-group">
                <label htmlFor="BPS">BPS</label>
                <input onChange={ this.BPSChange } value={ this.state.BPS } className="form-control" type="number"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit new Loan</button>
        </form>
      </div>
    );
  }
}

export default LoanInput;


