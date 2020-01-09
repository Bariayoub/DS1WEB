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
class StudentList extends React.Component {

    constructor(props){
     super(props);
     this.state= {
         students:[],
         classes:[],
         err:''
     }
    }

    loadStudents = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/students',{headers:headers})
            .then(res =>{
                this.setState({
                    students:res.data.students,
                    classes:res.data.classes
                });
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
    this.loadStudents();


    
 }

 clicked = (id)=>{
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_Gtx')
         } 
         axios.delete('//localhost:5000/students/'+id,{headers:headers})
         .then(res =>{
             console.log(res.data.msg)
             this.loadStudents();
        })
         .catch(error =>{
            this.setState({err:error.response.data.msg});
         });

 }

 mappingProfs = () =>{
    let cla;

     return this.state.students.map((item) =>{

        cla = this.state.classes.find((clad) => clad._id == item.class_id);

         return(

            <tr >
  
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.cin}</td>
            <td>{item.cne}</td>
            <td>{cla.filiere} {cla.annee}</td>
            <td>{item.hours}</td>

            <td>{item.createdAt}</td>
            <td><Link className="btn " id="edit" to={"/student/"+item._id} ><i class="fa fa-edit"></i></Link> &nbsp;
  <button onClick={() => this.clicked(item._id)} id="delete" className="btn "><i class="fa fa-trash"></i></button></td>
          </tr>
         )
     }
  
       )
 }
  render() {
    return (


        <div className="container-fluid">
            <Navbar />
        <h1>Etudiant</h1>
        <h6>Liste des étudiants</h6>
        <span style={{color: 'red'}}>{this.state.err != '' ?this.state.err : ''}</span> 

        <table class="table">
  <thead class="thead-dark">
    <tr>

      <th scope="col">Nom</th>
      <th scope="col">Prénom</th>
      <th scope="col">CIN</th>
      <th scope="col">CNE</th>
      <th scope="col">Classe</th>
      <th scope="col">Heures</th>
      <th scope="col">Crée le</th>
      <th></th>


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

export default StudentList;
