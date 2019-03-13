import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

/* CSS */
import './css/reset.css';
import './css/timeline.css';
import './css/login.css'
/* My-Components */
import App from './App';
import Login from './componentes/Login'
import Logout from './componentes/Logout'

function verificaAuth(nextState, replace){
  if(localStorage.getItem('auth-token') != null){
    return <App/>
  }else{
    return <Redirect to="/?msg=Você precisa estar logado para acessar a Timeline!"/>
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/logout"  component={Logout}/>
      <Route path="/timeline" render={() => (verificaAuth())}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
