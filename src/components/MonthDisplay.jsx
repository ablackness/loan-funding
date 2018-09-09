import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Table from './Table';

class MonthDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month1: '',
      month2: ''
    }

    this.getData = this.getData.bind(this);
    this.displayData = this.displayData.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UIMonth !== this.props.UIMonth) {
      var lastMonth = nextProps.UIMonth - 1;
      this.setState({
        month1: decodeMonth(lastMonth.toString()),
        month2: decodeMonth(nextProps.UIMonth)
      })
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get("https://t3ojby2w53.execute-api.us-east-1.amazonaws.com/LoanDev/loans")
    .then( (data) => {
      this.props.updateData(data.data);
    }).catch(err => console.log(err));
  }

  sortData(records, month, year) {
    var results = [];
    // eslint-disable-next-line
    records.map( record => {
      if(record.year === year && record.month === month) {
        results.push(record);
      }
    });
    return results;
  }

  displayData(lastMonth, month) {
      return (
        <div>
         <div className="row">
          <div className="col-lg-6">
            <h1>{ this.state.month1 }</h1>
            <Table data = { lastMonth } position = { 1 } updatePayoutLastMonthPeriod2 = { this.props.updatePayoutLastMonthPeriod2 }/>
          </div>
          <div className="col-lg-6">
            <h1>{ this.state.month2 }</h1>
            <Table data = { month } position = { 2 } updatePayoutThisMonthPeriod1 = { this.props.updatePayoutThisMonthPeriod1 }/>
          </div>      
        </div>
      </div>
      )   
  }

  render() {
    var loanDisplay;
    if (this.props.showMonths) {
      // eslint-disable-next-line
      loanDisplay = this.displayData(this.sortData(this.props.data, (parseInt(this.props.UIMonth) - 1),this.props.UIYear),this.sortData(this.props.data, parseInt(this.props.UIMonth), this.props.UIYear));
    } else {
      loanDisplay = <div></div>
    }
    return (
      // eslint-disable-next-line
      <div className="MonthDisplay" onClick={ () => this.sortData(this.props.data,parseInt(this.props.UIMonth), this.props.UIYear)}>
        { loanDisplay }
      </div>
    );
  }
}

export default MonthDisplay;

function decodeMonth(month) {
  if (month === "0") month = "12";
  switch (month) {
    case "1":
      return "January"

    case "2":
      return "February"

    case "3": 
      return "March"

    case "4":
      return "April"

    case "5":
      return "May"

    case "6":
      return "June"

    case "7":
      return "July"

    case "8":
      return "August"

    case "9":
      return "September"

    case "10":
      return "October"

    case "11":
      return "November"

    case "12":
      return "December"

    default:
      return "Not a valid month"
  }
}