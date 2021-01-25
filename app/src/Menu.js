import React from 'react';
import { View } from 'react-native';
import { Router, Switch, Route } from './router/index';
import CalendarScreen from './module/screens/CalendarScreen';
// import StatisticsScreen from './module/screens/StatisticsScreen';

export default function Menu({ view }) {
    return (
        <Switch style={{ padding: 25 }}>
            {view === 'Fitness plan' && <Route exact path="/menu" component={CalendarScreen} />}
            {/*{view === 'Statistics' && <Route exact path="/menu" component={StatisticsScreen} />}*/}
        </Switch>
    );
}
