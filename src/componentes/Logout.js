import {Component} from 'react';

export default class Logout extends Component{
    
    componentWillMount(){
        localStorage.removeItem('auth-token');
    }
    
    render(){
        return null;
    }
}