import React from 'react';
import { Router, Switch, Route } from './router/index';
import Layout from './Layout';
import Sidebar from 'module/components/Sidebar';
import LoginScreen from './module/screens/LoginScreen';
import RegisterScreen from './module/screens/RegisterScreen';
import HomeScreen from 'module/screens/HomeScreen';
export const Routes = props => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={LoginScreen} />
                <Route path="/register" exact component={RegisterScreen} />
                <Route path="/home" exact component={HomeScreen} />

                <Route path="/" component={Layout} />
            </Switch>
        </Router>
    );
};
