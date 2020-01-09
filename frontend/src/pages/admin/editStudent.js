import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class EditStudent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            cne:'',
            cin:'',
            class_id:'',
            lastName:'',
            firstName:'',
            filiere:'',
            annee:'',
            classes:[],
            constc:'',
            err:''
        }
    }
    

    loadStudents = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/students/'+this.props.match.params.id,{headers:headers})
            .then(res =>{
                this.setState({
                    cne:res.data.students.cne,
                    firstName:res.data.students.firstName,
                    lastName:res.data.students.lastName,
                    cin:res.data.students.cin,
                    class_id:res.data.students.class_id,
                    filiere:res.data.classes.filiere,
                    annee:res.data.classes.annee,
                    constc:res.data.students.class_id
                });
            })
            .catch(error =>{
                this.setState({err:error.response.data.msg})
              
            });

    }

    loadClasses = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
      
            axios.get('//localhost:5000/classes',{headers:headers})
            .then(res =>{
                this.setState({classes:res.data});
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
    this.loadClasses();

    this.loadStudents();
    
 }

    EditStudent = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            cne:this.state.cne,
            cin:this.state.cin,
            class_id:this.state.class_id,
            lastName:this.state.lastName,
            firstName:this.state.firstName
        }
        axios.post('//localhost:5000/students/update/'+this.props.match.params.id,cred,{
            headers:headers
        })
        .then(
            res =>{
                console.log(res.data.msg)
                this.props.history.push('/students');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });


    }
    onChangeCID = (e) =>{
        this.setState({
            class_id: e.target.value
        })
    }
    onChangeCNE = (e) =>{
        this.setState({
            cne: e.target.value
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

    let optionsC = this.state.classes.filter(((item) => item._id != this.state.constc)).map((data) =>
    <option 
        key={data._id}
        value={data._id}
    >
        {data.filiere} {data.annee}
    </option>
);
    return (


        <div className="container-fluid">
            <Navbar />
        <h1>Etudiant</h1>

        <form className="formm" onSubmit={this.EditStudent} >
                    
                    <h6>Modifier l'étudiant</h6>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 

                    <div className="from-group">
                <label>Nom</label>
                    <input type="text" className="form-control" onChange={this.onChangeFN} value={this.state.firstName} name="firstName" id="firstName" placeholder="Nom" />
                    </div>
                    <div className="from-group">
                <label>Prenom</label>
                    <input type="text" className="form-control" onChange={this.onChangeLN}  value={this.state.lastName} name="lastName" id="lastName" placeholder="Prenom" />
                    </div>
                    <div className="from-group">
                <label>CIN</label>
                    <input type="text" className="form-control" onChange={this.onChangeCIN}  value={this.state.cin} name="cin" id="cin" placeholder="cin" />
                    </div>
                    <div className="from-group">
                <label>CNE</label>
                    <input type="text" className="form-control" onChange={this.onChangeCNE}  value={this.state.cne} name="cne" id="cne" placeholder="cne" />
                    </div>
                    <div className="from-group">
                <label>Filière</label>
                <select className="form-control" onChange={this.onChangeCID} name="class_id" >
                <option value={this.state.class_id} >{this.state.filiere} {this.state.annee}</option>
                {optionsC}
                </select>
                    </div>
               
                    <button className="btn" id='bt'>Modifier</button>
    
                </form>
        </div>
    );
  }
}

export default EditStudent;
