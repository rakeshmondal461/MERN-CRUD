import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Updateform from './Updateform';
import Home from './Home';
const App = () => {
  return (
    <>
      <Switch>
          <Route exact path="/" component = {Home} />
          <Route exact path="/update/" component = {Updateform} />
        </Switch>
      
    </>

  );
}

export default App;
