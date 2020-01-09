import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class EditProf extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            cin:'',
            err:''
        }
    }
    

    loadProfs = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/profs/'+this.props.match.params.id,{headers:headers})
            .then(res =>{
                this.setState({
                    username:res.data.username,
                    firstName:res.data.firstName,
                    lastName:res.data.lastName,
                    cin:res.data.cin,
                    email:res.data.email
                });
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
    this.loadProfs();
    
 }

    EditProf = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            username:this.state.username,
            email:this.state.email,
            cin:this.state.cin,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            password:this.state.password
        }
        axios.post('//localhost:5000/profs/update/'+this.props.match.params.id,cred,{
            headers:headers
        })
        .then(
            res =>{
                console.log(res.data.msg)
                this.props.history.push('/profs');

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
    onChangeFN = (e) =>{
        this.setState({
            firstName: e.target.value
        })
    }
    onChangeLN = (e) =>{
        this.setState({
            lastName: e.target.value
        })
    }
    onChangeCIN = (e) =>{
        this.setState({
            cin: e.target.value
        })
    }

  render() {
    return (


        <div className="container-fluid">
            <Navbar />
        <h1>professeur</h1>


        
        <form className="formm" onSubmit={this.EditProf} >
                    
                    <h6>Modifier le professeur</h6>
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
                <label>CIN</label>
                    <input type="text" className="form-control" onChange={this.onChangeCIN} value={this.state.cin} name="cin" id="cin" placeholder="cin" />
                    </div>
                    <div className="from-group">
                <label>Nom</label>
                    <input type="text" className="form-control" onChange={this.onChangeFN} value={this.state.firstName} name="firstName" id="firstName" placeholder="Nom" />
                    </div>
                    <div className="from-group">
                <label>Prenom</label>
                    <input type="text" className="form-control" onChange={this.onChangeLN} value={this.state.lastName} name="lastName" id="lastName" placeholder="Prenom" />
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

export default EditProf;
