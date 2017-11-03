import React, {Component} from 'react'
import logo from '../images/logo.png'

class HeaderContainer extends Component{
	constructor(props){
		super(props)
	}
	render(){
		if(!this.props.isAuthed){
			return(
				<header>
					<div className="logo">
						<img src={logo} alt="Galavant Logo"/>
						<h2>Galavant</h2>
					</div>
					<div className="signin">
						<button className="btn btn-info btn-lg btn3d" type="button" name="signin" data-toggle="modal" data-target="#myModalSignIn">Sign In</button>
						<button className="btn btn-info btn-lg btn3d" type="button" name="signup" data-toggle="modal" data-target="#myModalSignUp">Sign Up</button>
					</div>
					<div className="fix"></div>
				</header>
			)
		}else{
			return(
				<header>
					<div className="logo">
						<img src={logo} alt="Galavant Logo"/>
						<h2>Galavant</h2>
					</div>
					<div className="signin">
          <button onClick={this.props.handleLogoutSubmit} className="btn btn-info btn-lg btn3d" type="button" name="signout"><span className="glyphicon glyphicon-user"></span> Sign Out</button>
					</div>
					<div className="fix"></div>
				</header>
			)
		}
	}
}

export default HeaderContainer
