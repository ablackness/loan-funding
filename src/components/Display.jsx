import React, { Component } from 'react';
import YearPicker from "react-year-picker";
import MonthDisplay from "./MonthDisplay";
import '../App.css';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UIMonth: "",
      UIYear: "",
      showMonths: false,
      data: [],
      lastMonthPeriod2: 0,
      thisMonthPeriod1: 0
    }

    this.updateMonth = this.updateMonth.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateShowMonths = this.updateShowMonths.bind(this);
    this.updatePayoutLastMonthPeriod2 = this.updatePayoutLastMonthPeriod2.bind(this);
    this.updatePayoutThisMonthPeriod1 = this.updatePayoutThisMonthPeriod1.bind(this);
  }

  updateData(data) {
    this.setState({
      data: data
    })
  }

  updateShowMonths() {
    if (this.state.UIMonth !== "" && this.state.UIYear !== "") {
      this.setState({
        showMonths: true
      })
    }
  }

  updateMonth(month) {
    this.setState({
      UIMonth: month.target.value,
      showMonths: false
    })
  }

  updateYear(year) {
    this.setState({
      UIYear: year,
      showMonths: false
    })
  }

  updatePayoutLastMonthPeriod2(subtotal) {
    this.setState({
      lastMonthPeriod2: subtotal
    })
  }

  updatePayoutThisMonthPeriod1(subtotal) {
    this.setState({
      thisMonthPeriod1: subtotal
    })
  }
  
  render() {
    var legend;
    if (this.state.showMonths) {
      legend = (
        <span>
          <strong>LEGEND:</strong>
          <p className='highlight'>{'Payout for ' + decodeMonth(this.state.UIMonth) + ': ' + formatter.format(this.state.lastMonthPeriod2 + this.state.thisMonthPeriod1)}</p>
        </span>
      )
    }
    return (
      <div className="Display">
        <div className='label-parent row'>
          <label className="labels col-md-1 col-form-label">Year</label>
          <div  className="col-md-3">  
            <YearPicker onChange={ this.updateYear }/>
          </div>
        </div>    
        <div className='label-parent row'>
          <label className="labels col-md-1 col-form-label">Month</label>
          <div className="month-select col-md-3">
            <select defaultValue="" onChange={ this.updateMonth } className='month-input'>
              <option value="" disabled hidden> - </option>
              <option value="1">1 - Jan</option>
              <option value="2">2 - Feb</option>
              <option value="3">3 - Mar</option>
              <option value="4">4 - Apr</option>
              <option value="5">5 - May</option>
              <option value="6">6 - Jun</option>
              <option value="7">7 - Jul</option>
              <option value="8">8 - Aug</option>
              <option value="9">9 - Sep</option>
              <option value="10">10 - Oct</option>
              <option value="11">11 - Nov</option>
              <option value="12">12 - Dec</option>
            </select> 
          </div>
        </div>
        <div className="row">
          <button id="show-loans" className="btn btn-primary col-md-2" onClick={ this.updateShowMonths }>Show Loan Info</button>
          <div className='col-md-3'></div>
          <div className='col-md-3'>
            { legend }
          </div>
        </div>
        <MonthDisplay UIMonth={ this.state.UIMonth } 
                      UIYear={ this.state.UIYear } 
                      showMonths={ this.state.showMonths }
                      updateData={ this.updateData }
                      data = { this.state.data }
                      updatePayoutLastMonthPeriod2 = { this.updatePayoutLastMonthPeriod2 }
                      updatePayoutThisMonthPeriod1 = { this.updatePayoutThisMonthPeriod1 }
                    />
      </div>
    );
  }
}

export default Display;

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
