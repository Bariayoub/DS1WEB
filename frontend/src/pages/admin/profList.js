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
class ProfList extends React.Component {

    constructor(props){
     super(props);
     this.state= {
         profs:[],
         err:''
     }
    }

    loadProfs = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/profs',{headers:headers})
            .then(res =>{
                this.setState({profs:res.data});
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
    this.loadProfs();


    
 }

 clicked = (id)=>{
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_Gtx')
         } 
         axios.delete('//localhost:5000/profs/'+id,{headers:headers})
         .then(res =>{
             console.log(res.data.msg)
             this.loadProfs();
        })
         .catch(error =>{
            this.setState({err:error.response.data.msg});
         });

 }

 mappingProfs = () =>{
     return this.state.profs.map((item) =>
    <tr >
      <td>{item.username}</td>
     <td>{item.email}</td>
     <td>{item.firstName}</td>
     <td>{item.lastName}</td>
     <td>{item.cin}</td>
     <td>{item.createdAt}</td>
     <td><Link className="btn " id="edit" to={"/prof/"+item._id} ><i class="fa fa-edit"></i></Link> &nbsp;
  <button onClick={() => this.clicked(item._id)} id="delete" className="btn "><i class="fa fa-trash"></i></button></td>
   </tr>
       )
 }
  render() {
    return (


        <div className="container-fluid">
            <Navbar />
        <h1>Professeur</h1>
        <h6>Liste des professeurs</h6>
        <span style={{color: 'red'}}>{this.state.err != '' ?this.state.err : ''}</span> 

        <table class="table">
  <thead class="thead-dark">
    <tr>

      <th scope="col">Nom d'utilisateur</th>
      <th scope="col">email</th>
      <th scope="col">Nom</th>
      <th scope="col">Prenom</th>
      <th scope="col">CIN</th>
      <th scope="col">Crée le</th>
      <th ></th>


    </tr>
  </thead>
  <tbody>
   
  {this.mappingProfs()}
  </tbody>
</table>
        </div>
    );
  }
}

export default ProfList;
