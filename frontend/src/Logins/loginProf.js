import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../assets/css/edit.css';
class LoginProf extends React.Component {
    constructor(props){
        super(props);
        this.state={
          username:'',
          password:'',
          err:''
        }
      }
    
     
      onChangeUser= (e) =>{
        this.setState({
          username: e.target.value
        })
      }
      onChangePass= (e) =>{
        this.setState({
          password: e.target.value
        })
      }
      SignIn= (e) =>{
        e.preventDefault();
     const headers = {
    'Content-Type':'application/json',
    'Accept':'application/json'
     }
     const cred = {
    username:this.state.username,
    password:this.state.password
     }
      axios.post('//localhost:5000/auth/profs',cred,{
        headers:headers})
      .then( res => {
        localStorage.setItem('_LsnPx',res.data.token);
        this.props.history.push('/');
      })
      .catch( err => {
        this.setState({
          err:err.response.data.msg
        })
    
      });
        
        }

    render() {
 
        return (
          
                <form style={{margin: '8%'}} onSubmit={this.SignIn} >
                    
                    <h1>LOGIN</h1>
                    <span style={{color: 'red'}}>{this.state.err != '' ?this.state.err : ''}</span> 
                    <div className="from-group">
                <label>Nom d'utilisateur</label>
                    <input type="text" className="form-control" onChange={this.onChangeUser} name="username" id="user" placeholder="Nom d'utilisateur" />
                    </div>
                    <div className="from-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" onChange={this.onChangePass} name="password" id="pass" placeholder="Mot de passe" />
                    </div>
                    <button className="btn" id="bt" >Se connécter</button>
    
                </form>
           
        );
      }
}


export default LoginProf;
