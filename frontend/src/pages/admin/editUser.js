import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            email:'',
            password:'',
            err:''
        }
    }
    

    loadUser = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/users/'+this.props.match.params.id,{headers:headers})
            .then(res =>{
                this.setState({
                    username:res.data.username,
                    email:res.data.email
                });
                console.log(res.data.username)
            })
            .catch(error =>{
                this.setState({err:error.response.data.msg})
            });

    }

  componentDidMount(){
    let gtx = localStorage.getItem('_Gtx');
   
    if(gtx){
        let headers={
            'x-auth-token':gtx
          }
      axios.get("//localhost:5000/auth/check",{
        headers:headers
      })
      .then(res=>{

        console.log(res);
     
    })
      .catch(
        err => {
            console.log(err);
          localStorage.removeItem('_Gtx');
          localStorage.clear();

        }
      );

    }
    this.loadUser();
    
 }

    EditUser = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        axios.post('//localhost:5000/users/update/'+this.props.match.params.id,cred,{
            headers:headers
        })
        .then(
            res =>{
                console.log(res.data.msg)
                this.props.history.push('/users');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });


    }

    onChangeEmail = (e) =>{
        this.setState({
            email: e.target.value
        })
    }
    onChangePass = (e) =>{
        this.setState({
            password: e.target.value
        })
    }
    onChangeUser = (e) =>{
        this.setState({
            username: e.target.value
        })
    }


  render() {
    return (


        <div className="container-fluid">
            <Navbar />
        <h1>Utilisateur</h1>


        
        <form className="formm" onSubmit={this.EditUser} >
                    <h6>Modifier l'utilisateur</h6>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 
                    <div className="from-group">
                <label>Email</label>
                    <input type="email" className="form-control" onChange={this.onChangeEmail} value={this.state.email} name="email" id="email" placeholder="email" />
                    </div>
                    <div className="from-group">
                <label>Nom d'utilisateur</label>
                    <input type="text" className="form-control" onChange={this.onChangeUser} value={this.state.username} name="username" id="user"  placeholder="Nom d'utilisateur" />
                    </div>
                    <div className="from-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" onChange={this.onChangePass}  name="password" id="pass"  placeholder="Mot de passe" />
                    </div>
                    <button className="btn" id='bt'>Modifier</button>
    
                </form>
        </div>
    );
  }
}

export default EditUser;
