import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../App.css';
import Dialog from './Dialog';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

var bigFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

Modal.setAppElement('#root');

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '175px',
      width: '400px'
    }
  };

class TableRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanInfo: {
                borrower: props.rowData.borrower,
                agent: props.rowData.agent,
                dateFunded: props.rowData.dateFunded,
                loanAmount: props.rowData.loanAmount,
                BPS: props.rowData.BPS,
                payout: props.rowData.payout
            },
            initialLoanInfo: {
                borrower: props.rowData.borrower,
                agent: props.rowData.agent,
                dateFunded: props.rowData.dateFunded,
                loanAmount: props.rowData.loanAmount,
                BPS: props.rowData.BPS,
                payout: props.rowData.payout
            },
            inputChanged: false,
            modalIsOpen: false,
            dialogType: '',
            saveOptions: {},
            cancelOptions: {},
            deleteOptions: {}

        }

        this.turnEditingOn = this.turnEditingOn.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.createRow = this.createRow.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
        this.turnEditingOff = this.turnEditingOff.bind(this);
        this.showSaveButton = this.showSaveButton.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount() {
        this.setState({
            saveOptions: {
                title: 'Saving...',
                message: 'Are you sure you want to save these changes?',
                yesButton: 'Yes!',
                yesCallback: this.saveChanges,
                noButton: 'No, not yet',
                noCallback: this.closeModal
            },
            cancelOptions: {
                title: 'Discard Changes',
                message: 'Are you sure you want to discard these changes?',
                yesButton: 'Yes!',
                yesCallback: this.discardChanges,
                noButton: 'No, not yet',
                noCallback: this.closeModal
            },
            deleteOptions: {
                title: 'DELETING ROW',
                message: 'Are you sure you want to delete this row?',
                yesButton: 'Yes!',
                yesCallback: this.deleteRow,
                noButton: 'No, I take it back',
                noCallback: this.closeModal
            }
        })
    }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     return prevState.loanInfo;
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('UPDATING', prevState, snapshot);
    // }

    openModal(e, loanInfo) {
        let type = '';
        if(e.currentTarget.classList.contains('check')) {
            console.log(1);
            type = 'save';
        } else if(e.currentTarget.classList.contains('glyphicon-remove')) {
            console.log(2);
            type = 'cancel';
        } else if(e.currentTarget.classList.contains('delete')) {
            console.log(3);
            type = 'delete';
        }
        if(loanInfo !== undefined) {
            
        }
        this.setState({
            modalIsOpen: true,
            dialogType: type
        });
    }
    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    createDialog(options) {
        console.log('OPTIONS', options);
        let title, message, yesButton, yesCallback, noButton, noCallback;
        ({title, message, yesButton, yesCallback, noButton, noCallback} = options);
        return (
            <Dialog 
                title={ title }
                message={ message }
                yesButton={ yesButton}
                yesCallback={ yesCallback }
                noButton={ noButton }
                noCallback={ noCallback }
            />
        )
    }

    chooseDialog(dialogEntry) {
        switch(dialogEntry) {
            case 'save':
               return this.createDialog(this.state.saveOptions);
            
            case 'cancel':
                return this.createDialog(this.state.cancelOptions);

            case 'delete':
                return this.createDialog(this.state.deleteOptions);

            default:
                return;
        }
    }

    turnEditingOn(event) {
        event.stopPropagation();
        this.props.updateRowEditingState(this.props.rowData.loanID);
    }

    turnEditingOff() {
        // event.stopPropagation();
        this.props.updateRowEditingState('');
    }

    saveChanges() {
        if(this.state.inputChanged) {
            var d = new Date(this.state.loanInfo.dateFunded);
            var month = d.getMonth();
            var year = d.getFullYear();
            var period = d.getDate() <= 15 ? 1 : 2
            var bodyData = {
                month: month + 1,
                year: year,
                period: period,
                borrower: this.state.loanInfo.borrower,
                agent: this.state.loanInfo.agent,
                dateFunded: this.state.loanInfo.dateFunded,
                loanAmount: this.state.loanInfo.loanAmount,
                BPS: this.state.loanInfo.BPS
            }
            axios.patch(`https://t3ojby2w53.execute-api.us-east-1.amazonaws.com/LoanDev/loans/${ this.props.rowData.loanID }`, bodyData)
                .then((results) => {
                    console.log('Update Successful');
                    this.props.getData();
                    this.turnEditingOff();
                    this.closeModal();
                    this.setState(
                    {
                        initialLoanInfo: {
                            borrower: bodyData.borrower,
                            agent: bodyData.agent,
                            dateFunded: bodyData.dateFunded,
                            loanAmount: bodyData.loanAmount,
                            BPS: bodyData.BPS,
                            payout: this.props.rowData.payout
                        },
                        inputChanged: false
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.turnEditingOff();
                    this.closeModal();
                }
            )
        } else {
            this.turnEditingOff();
        }
    }

    discardChanges() {
        this.setState((prevState) => {
            return {
                loanInfo: {
                    borrower: prevState.initialLoanInfo.borrower,
                    agent: prevState.initialLoanInfo.agent,
                    dateFunded: prevState.initialLoanInfo.dateFunded,
                    loanAmount: prevState.initialLoanInfo.loanAmount,
                    BPS: prevState.initialLoanInfo.BPS,
                    payout: prevState.initialLoanInfo.payout
                },
                inputChanged: false
            }
        });
        this.turnEditingOff();
        this.closeModal();
    }

    handleInputChange(e) {
        e.persist();
        switch (e.target.name) {
            case 'borrower':
                this.setState((prevState) => {
                    return {
                        loanInfo: {
                            borrower: e.target.value,
                            agent: prevState.loanInfo.agent,
                            dateFunded: prevState.loanInfo.dateFunded,
                            loanAmount: prevState.loanInfo.loanAmount,
                            BPS: prevState.loanInfo.BPS,
                            payout: prevState.loanInfo.payout
                        },
                        inputChanged: true,
                        dummyState: '1234'
                    }
                })
                break;

            case 'agent':
                this.setState((prevState) => {
                    return {
                        loanInfo: {
                            borrower: prevState.loanInfo.borrower,
                            agent: e.target.value,
                            dateFunded: prevState.loanInfo.dateFunded,
                            loanAmount: prevState.loanInfo.loanAmount,
                            BPS: prevState.loanInfo.BPS,
                            payout: prevState.loanInfo.payout
                        },
                        inputChanged: true
                    }
                })
                break;

            case 'dateFunded':
                this.setState((prevState) => {
                    return {
                        loanInfo: {
                            borrower: prevState.loanInfo.borrower,
                            agent: prevState.loanInfo.agent,
                            dateFunded: e.target.value,
                            loanAmount: prevState.loanInfo.loanAmount,
                            BPS: prevState.loanInfo.BPS,
                            payout: prevState.loanInfo.payout
                        },
                        inputChanged: true
                    }
                })
                break;

            case 'loanAmount':
                const regex = /[^0-9.]+/g;
                const numericalLoanAmount = e.target.value.replace(regex, '');
                // console.log(numericalLoanAmount);
                this.setState((prevState) => {
                    console.log('!!!!!!!!!!!!!!!!', prevState);
                    return {
                        loanInfo: {
                            borrower: prevState.loanInfo.borrower,
                            agent: prevState.loanInfo.agent,
                            dateFunded: prevState.loanInfo.dateFunded,
                            loanAmount: numericalLoanAmount,
                            BPS: prevState.loanInfo.BPS,
                            payout: prevState.loanInfo.payout
                        },
                        inputChanged: true
                    }
                })
                break;

            case 'BPS':
                this.setState((prevState) => {
                    return {
                        loanInfo: {
                            borrower: prevState.loanInfo.borrower,
                            agent: prevState.loanInfo.agent,
                            dateFunded: prevState.loanInfo.dateFunded,
                            loanAmount: prevState.loanInfo.loanAmount,
                            BPS: e.target.value,
                            payout: prevState.loanInfo.payout
                        },
                        inputChanged: true
                    }
                })
                break;

            default: return

        }
    }

    showSaveButton(activeChanges) {
        if(activeChanges) {
            return (
                <span className='check glyphicon glyphicon-ok pointer' title='Save changes' onClick={ (e) => this.openModal(e) }></span>
            )
        }
        return;
    }

    deleteRow() {
        axios.delete(`https://t3ojby2w53.execute-api.us-east-1.amazonaws.com/LoanDev/loans/${ this.props.rowData.loanID }`)
            .then((results) => {
                console.log('Delete Successful');
                this.props.getData();
                this.turnEditingOff();
                this.closeModal();
                this.setState({
                    inputChanged: false
                })
            })
            .catch((err) => {
                console.log(err);
                this.closeModal();
            })
    }

    createRow() {
        var periodHighlight;
        // eslint-disable-next-line
        if ((this.props.position === 1 && this.props.rowData.period == 2) || (this.props.position === 2 && this.props.rowData.period == 1)) {
            periodHighlight = 'highlight';
        } else periodHighlight = 'notPayoutRows';
        if (!this.props.editingRow) {
            return (
                <div className={'row rows ' + periodHighlight} tabIndex={0}>
                    <div className='iconDiv'>
                        <span className='pencil glyphicon glyphicon-pencil pointer' title='Edit this row' onClick={this.turnEditingOn}></span>
                    </div>
                    <div className='col-md-1'>{this.props.rowData.period}</div>
                    <div className='col-md-2 borrowerField'>{this.state.loanInfo.borrower}</div>
                    <div className='col-md-2'>{this.state.loanInfo.agent}</div>
                    <div className='col-md-2'>{this.state.loanInfo.dateFunded}</div>
                    <div className='col-md-2'>{bigFormatter.format(this.state.loanInfo.loanAmount)}</div>
                    <div className='col-md-1'>{this.state.loanInfo.BPS}</div>
                    <div className='col-md-2'>{formatter.format(this.props.rowData.payout)}</div>
                </div>
            )
        } else {
            return (
                <div className={'row rows ' + periodHighlight} tabIndex={0} >
                    <div className='col-md-1 iconDiv'>
                        <span className='delete glyphicon glyphicon-trash pointer' title='Delete this row' onClick={ (e) => this.openModal(e) }></span>
                        <span className='x glyphicon glyphicon-remove pointer' title='Discard changes' onClick={ this.state.inputChanged ? (e) => this.openModal(e) : this.discardChanges }></span>
                        { this.showSaveButton(this.state.inputChanged) }
                    </div>
                    <input name='borrower' onChange={this.handleInputChange} type='text' className='col-md-2 editingBorrower' defaultValue={this.state.loanInfo.borrower} />
                    <input name='agent' type='text' onChange={this.handleInputChange} className='col-md-2' defaultValue={this.state.loanInfo.agent} />
                    <input name='dateFunded' type='text' onChange={this.handleInputChange} className='col-md-2' defaultValue={this.state.loanInfo.dateFunded} />
                    <input name='loanAmount' type='number' min='0' step='1' onChange={this.handleInputChange} className='col-md-2' defaultValue={ (this.state.loanInfo.loanAmount)} />
                    <input name='BPS' type='number' onChange={this.handleInputChange} className='col-md-1' defaultValue={this.state.loanInfo.BPS} />
                    <div className='col-md-2'>{formatter.format(this.props.rowData.payout)}</div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={ this.state.modalIsOpen }
                    onAfterOpen={ this.afterOpenModal }
                    onRequestClose= { this.closeModal }
                    style= { customStyles }
                    contentLabel="Confirmation Dialog"
                >
                    { this.chooseDialog(this.state.dialogType) }
                </Modal>
                { this.createRow() }
            </div>   
        )
    }
}

export default TableRow;