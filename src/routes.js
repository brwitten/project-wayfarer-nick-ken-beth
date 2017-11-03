import React from 'react'
import { Route} from 'react-router'
import HomeContainer from './containers/HomeContainer'
import CitiesContainer from './containers/CitiesContainer'
import ProfileContainer from './containers/ProfileContainer'

var routes = (
	<div>
			<Route exact path ='/' component={HomeContainer} />
			<Route path ='/profile' component={ProfileContainer} />
			<Route path ='/cities' component={CitiesContainer} />
	</div>
)


export default routes;
