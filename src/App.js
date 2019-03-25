import React, { Component } from 'react';
// import Modal from 'react-modal';
import { 
  HashRouter as Router, 
  Route
} from 'react-router-dom';
import './App.css';
import Display from './components/Display';
import LoanInput from './components/LoanInput';
// import Dialog from './components/Dialog';

// Modal.setAppElement('#root');

// const customStyles = {
//   content : {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     height: '175px',
//     width: '400px'
//   }
// };

class App extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     modalIsOpen: false
  //   };

  //   this.openModal = this.openModal.bind(this);
  //   this.afterOpenModal = this.afterOpenModal.bind(this);
  //   this.closeModal = this.closeModal.bind(this);
  // }

  // openModal() {
  //   this.setState({modalIsOpen: true});
  // }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // this.subtitle.style.color = '#f00';
  // }

  // closeModal() {
  //   this.setState({modalIsOpen: false});
  // }

  // createDialog(title, message, yesButton, noButton) {
  //   return (
  //     <Dialog title message yesButton noButton/>
  //   )
  // }

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
