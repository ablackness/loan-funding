import React, { Component } from 'react';
import { 
  HashRouter as Router, 
  Route 
} from 'react-router-dom';
import './App.css';
import Display from './components/Display';
import LoanInput from './components/LoanInput';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Loan Funding</h1>
          <Route exact path='/' component={ Display }/>
          <Route path='/input' component={ LoanInput }/>
        </div>
      </Router>
    );
  }
}

export default App;
