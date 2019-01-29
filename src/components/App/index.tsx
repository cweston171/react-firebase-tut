import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import Navigation from '../Navigation'
import Landing from '../Landing'
import Home from '../Home'
import SignIn from '../SignIn'
import Account from '../Account'
import Admin from '../Admin'

const App = () => (
    <Router>
        <div>
            <Navigation />
            <hr/>
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.SIGNIN} component={SignIn} />
            <Route path={ROUTES.ACCOUNT} component={Account} />
            <Route path={ROUTES.ADMIN} component={Admin} />
        </div>
    </Router>
)

export default App
