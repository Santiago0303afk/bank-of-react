/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  addCredit = (newCredit) => {
    const updatedCredits = [...this.state.creditList, newCredit];
    const updatedBalance = this.state.accountBalance + newCredit.amount;
  
    this.setState({
      creditList: updatedCredits,
      accountBalance: updatedBalance
    });
  };
  
  addDebit = (newDebit) => {
    const updatedDebits = [...this.state.debitList, newDebit];
    const updatedBalance = this.state.accountBalance - newDebit.amount;
  
    this.setState({
      debitList: updatedDebits,
      accountBalance: updatedBalance
    });
  };

  
    async componentDidMount() {
    // Fetch credits
    const creditsResponse = await fetch('https://santiago0303afk.github.io/api/credits.json');
    const creditsData = await creditsResponse.json();
  
    // Fetch debits
    const debitsResponse = await fetch('https://santiago0303afk.github.io/api/debits.json');
    const debitsData = await debitsResponse.json();
  
    // Calculate account balance
    const totalCredits = creditsData.reduce((acc, credit) => acc + credit.amount, 0);
    const totalDebits = debitsData.reduce((acc, debit) => acc + debit.amount, 0);
    const calculatedBalance = totalCredits - totalDebits;
  
    this.setState({
      creditList: creditsData,
      debitList: debitsData,
      accountBalance: calculatedBalance
    });
  }
  


  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (
    <Credits credits={this.state.creditList}
    addCredit={this.addCredit}
    accountBalance={this.state.accountBalance}
    /> 
    )

    const DebitsComponent = () => (
    <Debits 
    debits={this.state.debitList} 
    addDebit={this.addDebit}
    accountBalance={this.state.accountBalance}

    />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
