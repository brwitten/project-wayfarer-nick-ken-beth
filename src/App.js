import React, { Component } from 'react';
import {Router, browserHistory} from 'react-router'
import routes from './routes.js'
import {Link} from 'react-router';
import HeaderContainer from './containers/headerContainer'
import ModalContainer from './containers/ModalContainer'
import ProfileContainer from './containers/ProfileContainer'
import HomeContainer from './containers/HomeContainer'
import CitiesContainer from './containers/CitiesContainer'
import AuthModel from './models/AuthModel'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      _userId: '',
      username: '',
      password: '',
      isAuthed: false,
      changepagen:false
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
  changepage(event) {
    event.preventDefault()
    this.setState({changepagen:true})
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
          this.setState({
            isAuthed:true,
            password:'',
            _userId: res.data._id
          })
          browserHistory.push('/profile')
        }else if(!res){
          this.setState({isAuthed:false})
        }
        console.log(this.state)
      })
      document.getElementById('inputPassword').value = ''
      document.getElementById('inputUsername').value = ''
      document.getElementById('submitsignin').click()
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
    document.getElementById('inputUsernameSignUp').value = ''
    document.getElementById('inputPasswordSignUp').value = ''
    document.getElementById('submitsignup').click()
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
            isAuthed: false,
            changepagen: false

          })
        }
      })
  }
  render() {
    let profile;
    let home;
    let cities;
    let sherwin;
    if (this.state.isAuthed && this.state.changepagen){
      sherwin = <CitiesContainer />
    }
    else if(this.state.isAuthed){
      sherwin = <ProfileContainer changepage={this.changepage.bind(this)}/>
    }else if (!this.state.isAuthed) {
      sherwin = <HomeContainer />
}
    return (
      <div className="App">
        <div className='container'>
          <HeaderContainer
            isAuthed={this.state.isAuthed}
            handleLogoutSubmit={this.handleLogoutSubmit.bind(this)}
            />
          <main>
            {sherwin}
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
