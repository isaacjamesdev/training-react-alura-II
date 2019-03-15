import React, { Component } from 'react';
import {createBrowserHistory} from 'history'
import Foto from './Foto'; 

export default class Timeline extends Component {

  constructor(props){
    super(props);
    this.state = {fotos: []};
    this.login = this.props.login;
  }
  
  carregaFotos(){
    // Aqui definimos para qual url o fetch deve disparar
    let urlPerfil;
    if(this.login)
      urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`
    else
      urlPerfil = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
    
    fetch(urlPerfil)
      .then(response => response.json())
      .then((fotos) =>{
         this.setState({fotos: fotos})
      });
  }

  componentDidMount(){
    this.carregaFotos();  
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.login){
      this.login = nextProps.login;
      this.carregaFotos();
    }
  }

  render(){
      return (
      <div className="fotos container">
        {
          this.state.fotos.map(foto =>
            <Foto key={foto.id} foto={foto}/>
          )
        }
      </div>            
      );
  }
}