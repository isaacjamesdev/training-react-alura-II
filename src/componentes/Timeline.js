import React, { Component } from 'react';
import {createBrowserHistory} from 'history'
import Foto from './Foto'; 

export default class Timeline extends Component {

  constructor(props){
    super();
    this.state = {fotos: []};
  }
  

  componentDidMount(){
    const history = createBrowserHistory();
    console.log(history.location);
    
    fetch(`https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
      .then(response => response.json())
      .then((fotos) =>{
         this.setState({fotos: fotos})
      });
      
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