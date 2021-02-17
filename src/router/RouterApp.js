import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const RouterApp = () => {
    return (
        <Router>
          <div>
            <Switch>
                <Route path="/login" component={ LoginScreen } />
                <Route path="/" component={ CalendarScreen } />
                <Redirect to='/login' />
            </Switch>
          </div>
        </Router>
    );
}
