import React, { Component } from 'react';
//import monthConverter from '../monthConversion'
import '../App.css';
import axios from 'axios';


class Display extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handlePremadeClick = this.handlePremadeClick.bind(this);
  }

  getData() {
    axios.get("https://t3ojby2w53.execute-api.us-east-1.amazonaws.com/LoanDev/loans")
    .then( (data) => {
      console.log(data);
      return data;
    }).catch(err => console.log(err));
  }
  
  showData(data) {
    data.map( (d) => {
      return (
        <div>
          
        </div>
      );
    });
  }
  
  render() {
    return (
      <div className="Display" onClick={this.getData}>
        <table>
          <th>TITLE</th>
          <th>2nd</th>
          <tr>something</tr>
          <td>new thing</td>
        </table>
      </div>
    );
  }
}

export default Display;


