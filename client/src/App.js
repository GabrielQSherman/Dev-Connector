import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Landing from './Components/Landing';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        {/* Homepage */}
        <Switch>
          <Route
            exact
            path='/'  
            component={Landing}
          />
        </Switch>
        {/* Login */}
        <Switch>
          <Route
            exact
            path='/login'  
            component={Login}
          />
        </Switch>
        {/* Register */}
        <Switch>
          <Route
            exact
            path='/register'  
            component={Register}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
