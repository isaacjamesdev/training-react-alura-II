import React, {Component} from 'react'

export default class Login extends Component{

    constructor(props){
        super();
        const params = new URLSearchParams(props.location.search);
        this.state = {msgErro: params.get('msg')}
    }

    enviaForm(event){
        event.preventDefault();
        let requestInfo = {
            method:'POST',
            body:JSON.stringify({login:this.login.value, senha:this.senha.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })

        }

        fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
            .then(response => {
                if(response.ok){
                    return response.text();
                }else{
                    throw new Error('Não foi possível fazer o login');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                this.props.history.push("/timeline");
            }
            )
            .catch(erro => 
                this.setState({msgErro: erro.message})
            )

    }

    render(){
        return(
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msgErro}</span>
                <form onSubmit={this.enviaForm.bind(this)}>
                    <input type="text" className="login-box-input" ref={(input => this.login = input)}/>
                    <input type="password" className="login-box-input" ref={(input => this.senha = input)}/>
                    <input className="login-box-input" type="submit" value="login"/>
                </form>

            </div>
        )
    }
}