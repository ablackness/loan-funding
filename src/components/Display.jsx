import React, { Component } from 'react';
import monthConverter from '../monthConversion';
import '../App.css';


class Display extends Component {
  render() {
    return (
      <div className="Display">
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

function showData(data) {
  data.map( (d) => {
    return (
      <div>
        
      </div>
    );
  });
}

const BPSDivider = 10000;

const DATA = [
  {
    month: 4,
    year: 2018,
    info: {
      first: [
        {
          borrower: "Joe Schmoe",
          agent: "Leslie Black",
          dateFunded: "2018-08-15",
          loanAmount: 405000.00,
          BPS: 97
        },
        {
          borrower: "Dank Meme",
          agent: "Jimmy Neutron",
          dateFunded: "2018-08-14",
          loanAmount: 292500.00,
          BPS: 97
        }
      ],
      second: [
        {
          borrower: "Jane Doe",
          agent: "Leslie Black",
          dateFunded: "2018-08-25",
          loanAmount: 300250.00,
          BPS: 107
        }
      ]
    }
  },
  {
    month: 5,
    year: 2018,
    info: {
      first: [
        {
          borrower: "Joe Schmoe",
          agent: "Leslie Black",
          dateFunded: "2018-08-15",
          loanAmount: 405000.00,
          BPS: 97
        },
        {
          borrower: "Dank Meme",
          agent: "Jimmy Neutron",
          dateFunded: "2018-08-14",
          loanAmount: 292500.00,
          BPS: 97
        }
      ],
      second: [
        {
          borrower: "Jane Doe",
          agent: "Leslie Black",
          dateFunded: "2018-08-25",
          loanAmount: 300250.00,
          BPS: 107
        }
      ]
    }
  }
]