import React, { Component } from 'react';
import {Router, browserHistory} from 'react-router'
import routes from './routes.js'
import {Link} from 'react-router';
import HeaderContainer from './containers/headerContainer'
import ModalContainer from './containers/ModalContainer'
import ProfileContainer from './containers/ProfileContainer'
import AuthModel from './models/AuthModel'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      isAuthed: false
    }
  }
  handleUsernameInput(event){
    event.preventDefault()
    this.setState({username: event.target.value})
  }
  handlePasswordInput(event){
    event.preventDefault()
    this.setState({password: event.target.value})
  }

  handleLoginSubmit(event){
    console.log("submitted") ;
    event.preventDefault()
    let authData = {
      username: this.state.username,
      password: this.state.password
    }
    AuthModel.login(authData)
      .then((res) => {
        console.log(res)
        if(res.data.username === authData.username){
          this.setState({isAuthed:true})

        }else if(!res){
          this.setState({isAuthed:false})
        }
        console.log(this.state)
      })
  }
  handleSignupSubmit(event){
    event.preventDefault()
    let authData = {
      username: this.state.username,
      password: this.state.password
    }
    AuthModel.signup(authData)
      .then((res) => {
        console.log(res)
        if(res.data.username === authData.username){
          this.setState({isAuthed:true})
        }else if(!res){
          this.setState({isAuthed:false})
        }
        console.log(this.state)
      })
  }
  handleLogoutSubmit(event){
    event.preventDefault()
    console.log('Logging out')
    AuthModel.logout()
      .then((res) => {
        console.log(res)
        if(res.status === 200){
          this.setState({
            username: '',
            password: '',
            isAuthed: false
          })
        }
      })
  }
  render() {
    return (
      <div className="App">
        <div className='container'>
          <HeaderContainer
            isAuthed={this.state.isAuthed}
            handleLogoutSubmit={this.handleLogoutSubmit.bind(this)}
            />
            {this.state.isAuthed===true ? <ProfileContainer /> : console.log('Not login')}
          <main>
            <Router routes = {routes} history={browserHistory}/>
          </main>
          <ModalContainer
            handleLoginSubmit={this.handleLoginSubmit.bind(this)}
            handleUsernameInput={this.handleUsernameInput.bind(this)}
            handlePasswordInput={this.handlePasswordInput.bind(this)}
            handleSignupSubmit={this.handleSignupSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}





export default App;
