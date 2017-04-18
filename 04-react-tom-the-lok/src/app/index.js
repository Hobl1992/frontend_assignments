/**
 * Created by hobl on 08.04.17.
 */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Root } from './components/Root';
import { Home } from './components/Home';
import { SayHello } from './components/SayHello';

class App extends React.Component {

    render() {
        return (
            <Router history={browserHistory}>
                <Route path={'/'} component={Root}>
                    <IndexRoute component={Home}/>
                    <Route path={'home'} component={Home}/>
                    <Route path={'sayHello'} component={SayHello}/>
                </Route>
            </Router>
        );
    }
}

render(<App/>, document.getElementById('app'));