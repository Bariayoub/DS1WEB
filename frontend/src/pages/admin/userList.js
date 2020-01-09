import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';
import '../../assets/css/classe.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class UserList extends React.Component {

    constructor(props){
     super(props);
     this.state= {
         users:[],
         err:''
     }
    }

    loadUsers = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/users',{headers:headers})
            .then(res =>{
                this.setState({users:res.data});
                console.log(res.data)
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
    this.loadUsers();


    
 }

 clicked = (id)=>{
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_Gtx')
         } 
         axios.delete('//localhost:5000/users/'+id,{headers:headers})
         .then(res =>{
             console.log(res.data.msg)
             this.loadUsers();
        })
         .catch(error =>{
            this.setState({err:error.response.data.msg});
         });

 }

 mappingUsers = () =>{
     return this.state.users.map((item) =>
    <tr >
      <td>{item.username}</td>
     <td>{item.email}</td>
     <td>{item.createdAt}</td>
     <td><Link className="btn " id="edit" to={"/user/"+item._id} ><i class="fa fa-edit"></i></Link> &nbsp;
  <button onClick={() => this.clicked(item._id)} id="delete" className="btn "><i class="fa fa-trash"></i></button></td>
   </tr>
       )
 }
  render() {
    return (


        <div className="container-fluid">
            <Navbar />
        <h1>Utilisateur</h1>
        <h6>Liste des utilisateurs</h6>
        <span style={{color: 'red'}}>{this.state.err != '' ?this.state.err : ''}</span> 

        <table class="table">
  <thead class="thead-dark">
    <tr>

      <th scope="col">Nom d'utilisateur</th>
      <th scope="col">email</th>
      <th scope="col">Crée le</th>
      <th></th>


    </tr>
  </thead>
  <tbody>
   
  {this.mappingUsers()}
  </tbody>
</table>
        </div>
    );
  }
}

export default UserList;
