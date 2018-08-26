import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class MonthDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line
      month1: '',
      month2: ''
    }

    this.p = this.p.bind(this);
    this.getData = this.getData.bind(this);
    this.displayData = this.displayData.bind(this);
  }

  componentWillReceiveProps(props) {
    var lastMonth = props.month - 1;
    this.setState({
      month1: decodeMonth(lastMonth.toString()),
      month2: decodeMonth(props.month)
    })
  }

  getData() {
    return axios.get("https://t3ojby2w53.execute-api.us-east-1.amazonaws.com/LoanDev/loans")
    .then( (data) => {
      //console.log(data);
      return data;
    }).catch(err => console.log(err));
  }

  displayData() {
    this.getData()
    .then( res => {
      console.log(res);
      return (
        <div>
          <div>
            { res.data[0].loanAmount }
          </div>
        </div>
      )
    })
  }

  p() {
    console.log("props in sub comp", this.props);
    console.log("state in sub comp", this.state);
  }

  render() {
    //var loanDisplay = this.displayData();
    return (
      <div className="MonthDisplay" onClick={this.displayData}>
        <div className="row">
          <div className="col-lg-6">
            <h1>{ this.props.showMonths ? this.state.month1 : "" }</h1>
            
          </div>
          <div className="col-lg-6">
            <h1>{ this.props.showMonths ? this.state.month2 : "" }</h1>
          </div>
        </div>
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