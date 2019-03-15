import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect, matchPath} from 'react-router-dom'
import {createBrowserHistory} from 'history'

/* CSS */
import './css/reset.css';
import './css/timeline.css';
import './css/login.css'
/* My-Components */
import App from './App';
import Login from './componentes/Login'
import Logout from './componentes/Logout'

function verificaAuth(){
  const history = createBrowserHistory();
  const match = matchPath(history.location.pathname,  {path: '/timeline/:login'});
  const privateRoute = (match === null); //sem argumento, é porque estou na rota privada
  let params = history.location.pathname.split('/')[2];
  console.log(params);
  
  // para entrar nesse if só se: Ou é rota privada (/timeline) && não estou logado. 
  if(privateRoute &&  (localStorage.getItem('auth-token') === null)){
    return <Redirect to="/?msg=Você precisa estar logado para acessar a Timeline!"/>
  }else{
    return <App login={params}/>
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/timeline" render={() => (verificaAuth())}/>
      <Route path="/timeline/:login" render={() => (verificaAuth())}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
