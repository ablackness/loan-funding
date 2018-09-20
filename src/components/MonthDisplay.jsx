import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Table from './Table';

const dev = true;

class MonthDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month1: '',
      month2: '',
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
    if (dev === true) {
      let fakeData = [
        {
          BPS: "89",
          agent: "A1",
          borrower: "B1",
          dateFunded: "2018-08-12",
          loanAmount: "675565",
          loanID: "13lo1jltqmxny",
          month: 8,
          payout: 6012.5285,
          period: 1,
          year: 2018
        },
        {
          BPS: "102",
          agent:"Team Ortiz",
          borrower:"Magged",
          dateFunded: "2018-08-08",
          loanAmount:"568250",
          loanID:"fcnw1jlejfeml",
          month:8,
          payout:5796.15,
          period:1,
          year:2018
        },
        {
          BPS:"99",
          agent:"Matt Damon",
          borrower:"Jason Bourne",
          dateFunded:"2018-09-12",
          loanAmount:"425000",
          loanID:"fcnw1jlejb3vi",
          month:9,
          payout: 4207.5,
          period: 1,
          year: 2018
        },
        {
          BPS:"84",
          agent:"Oleg Daripaska",
          borrower:"Paul Manafort",
          dateFunded:"2018-09-25",
          loanAmount:"1300000",
          loanID:"fcnw1jlejej5k",
          month:9,
          payout:10920,
          period:2,
          year:2018
        },
        {
          BPS:"45",
          agent:"A2",
          borrower:"b2",
          dateFunded:"2018-08-22",
          loanAmount:"890000",
          loanID:"13lo1jltqnnuo",
          month:8,
          payout:4005,
          period:2,
          year:2018
        },
        {
          BPS:"99",
          agent:"A3",
          borrower:"B3",
          dateFunded:"2018-09-10",
          loanAmount:"423890",
          loanID:"13lo1jltqokob",
          month:9,
          payout:4196.511,
          period:1,
          year:2018
        },
        {
          BPS:"123",
          agent:"Justino Ramos",
          borrower:"Jameson Brown",
          dateFunded:"2018-08-22",
          loanAmount:"456050",
          loanID:"fcnw1jlejg0vp",
          month:8,
          payout:5609.415,
          period:2,
          year:2018
        },
        {
          BPS:"101",
          agent:"A4",
          borrower:"B4",
          dateFunded:"2018-09-17",
          loanAmount:"1230000",
          loanID:"13lo1jltqp81h",
          month:9,
          payout:12423,
          period:2,
          year:2018
        },
        {
          BPS: "95",
          agent: "A5",
          borrower: "B5",
          dateFunded: "2018-08-19",
          loanAmount: "215000",
          loanID: "13lo1j1tqmxny",
          month: 8,
          payout: 2056.5285,
          period: 2,
          year: 2018
        }
    ]
      this.props.updateData(fakeData);
  } else {
      this.getData();
    }
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
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-4">
                <h1 className='monthHeader'>{ this.state.month1 }</h1>
              </div>
            </div>
            <Table data = { lastMonth } position = { 1 } updatePayoutLastMonthPeriod2 = { this.props.updatePayoutLastMonthPeriod2 }/>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-4">
                <h1 className='monthHeader'>{ this.state.month2 }</h1>
              </div>
            </div>
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