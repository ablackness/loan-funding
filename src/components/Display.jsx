import React, { Component } from 'react';
import YearPicker from "react-year-picker";
import MonthDisplay from "./MonthDisplay";
import '../App.css';

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: "",
      year: "",
      showMonths: false
    }

    this.updateMonth = this.updateMonth.bind(this);
    this.updateYear = this.updateYear.bind(this);
  }

  updateShowMonths() {
    this.setState({
      showMonths: false
    })
  }

  updateMonth(month) {
    this.setState({
      month: month.target.value,
      showMonths: true
    })
  }

  updateYear(year) {
    this.setState({
      year: year
    })
  }
  
  render() {
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
            <select onChange={ this.updateMonth }className='month-input'>
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
          <button id="show-loans" className="btn btn-primary col-md-2">Show Loan Info</button>
        </div>
        <MonthDisplay month={ this.state.month } year={ this.state.year } showMonths={ this.state.showMonths }/>
      </div>
    );
  }
}

export default Display;


