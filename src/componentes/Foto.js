import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class FotoAtualizacoes extends Component {
  constructor(props){
    super(props);
    this.state = {likeada: this.props.foto.likeada}
  }

  like(event){
    event.preventDefault();
    fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, {method: 'POST'})
      .then(response  => {
          if(response.ok)
            return response.json();
          else
            throw new Error("Erro na fetch do like")
      })
      .then(response => {
        console.log(response);
        this.setState({likeada: !this.state.likeada})
      })
  }
    render(){
        return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} className={this.state.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Likar</a>
              <form className="fotoAtualizacoes-form">
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>

            </section>            
        );
    }
}

class FotoInfo extends Component {

    constructor(props){
      super(props);
      this.state = ({likers: this.props.foto.likers});
    }

    componentWillMount(){
      console.log(this.state.likers);
      
    }

    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">
              {
                this.props.foto.likers.map(user => 
                   <Link key={this.props.foto.id} to={`/timeline/${user.login}`}>{user.login} </Link>
                )
              } 
              ,
                curtiram
             
              </div>

              <p className="foto-info-legenda">
                <Link to={`/timeline/${this.props.foto.loginUsuario}`} className="foto-info-autor"> 
                  {` ${this.props.foto.loginUsuario}`}
                </Link>

                {` ${this.props.foto.comentario}`}
              </p>

              <ul className="foto-info-comentarios">
                {
                  this.props.foto.likers.map(user => {
                    <li className="comentario">
                      <Link to={`/timeline/${user.loginUsuario}`} className="foto-info-autor">{user.loginUsuario}</Link>
                      {user.comentario}
                    </li>
                  })
                }
              </ul>
            </div>            
        );
    }
}

class FotoHeader extends Component {

    
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <Link to={`/timeline/rafael`}>
                  {this.props.foto.loginUsuario}
                  </Link>
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.foto.horario}</time>
            </header>            
        );
    }
}

export default class Foto extends Component {

  render(){
      return (
        <div className="foto"  >
          <FotoHeader foto={this.props.foto} />
          <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
          <FotoInfo foto={this.props.foto}/>
          <FotoAtualizacoes foto={this.props.foto}/>
        </div>            
      );
  }
}