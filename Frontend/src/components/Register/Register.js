import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class Create extends Component{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //default val
        this.state = {
            name : "",
            age: "",
            street : "",
            zip:"",
            email : "",
            phone: "",
            city : "",
            country : ""
        }
        //Bind the handlers to this class
        this.namehandler = this.namehandler.bind(this);
        this.agehandler = this.agehandler.bind(this);
        this.streethandler = this.streethandler.bind(this);
        this.ziphandler = this.ziphandler.bind(this);
        this.emailhandler = this.emailhandler.bind(this);
        this.phonehandler = this.phonehandler.bind(this);
        this.cityhandler = this.cityhandler.bind(this);
        this.countryhandler = this.countryhandler.bind(this);
        
        this.submitLogin = this.submitLogin.bind(this);
    }

    //title change handler
    namehandler = (e) => {
        this.setState({
            booktitle : e.target.value
        })
    }
        //title change handler
        agehandler = (e) => {
            this.setState({
                booktitle : e.target.value
            })
        }
            //title change handler
            streethandler = (e) => {
        this.setState({
            booktitle : e.target.value
        })
    }
        //title change handler
        ziphandler = (e) => {
            this.setState({
                booktitle : e.target.value
            })
        }
            //title change handler
     emailhandler = (e) => {
        this.setState({
            booktitle : e.target.value
        })
    }
        //title change handler
        phonehandler = (e) => {
            this.setState({
                booktitle : e.target.value
            })
        }
            //title change handler
    cityhandler = (e) => {
        this.setState({
            booktitle : e.target.value
        })
    }
    //ID change handler
    countryhandler = (e) => {
            this.setState({
                idnum : e.target.value
            })
        }

    submitLogin = (e) => {

        e.preventDefault();
        const data = {
            idnum : this.state.idnum,
            title : this.state.booktitle,
            author : this.state.bookauthor
        }
        //send data to backend
        axios.post('http://localhost:3001/register',data)
            .then(response => {
                console.log("Status Code create : ",response.status);
                if(response.status === 200){
                    this.setState({
                        successflag : true,
                        duplicateid : false
                    })
                }else if(response.status === 201){
                    this.setState({
                        successflag : false,
                        duplicateid: true
                    })
                }
            }); 
    }
    render(){
        //set values 
        let {successflag} = this.state;
        let success = null;
        let loginredirect = null;         
        let repeteatedid;
        let {duplicateid} = this.state;
        //check if user logged in

        //tell user that id is alredy in DB
        if(duplicateid){
            repeteatedid = 
            <div class="alert alert-danger" role="alert">
                <td>"ID already in Database"</td> 
            </div>
        }
        return(
            <div>
                 {loginredirect}
                 {success}
                <br/>
                <div class="container">
                {repeteatedid}
                
                        <div style={{width: '100%'}} class="form-group">
                        <div class="col col-lg-3">
                        <label> 
                         Name:   <input  onChange ={this.idhandler} type="text" class="form-control" name="idnum" placeholder="Name" />
                            
                        </label>
                        <br/>
                        <label>
                           Age:     <input  onChange = {this.titlehandler} type="text" class="form-control" name="booktitle" placeholder="Age" />
                        </label>
                        <br/>
                        <label>
                            Email:
                                <input onChange = {this.authorhandler} type="text" class="form-control" name="bookauthor" placeholder="email"/>
                     </label>
                     </div>
                     <div class="col col-lg-2">
                     <label>
                            Phone:
                                <input onChange = {this.authorhandler} type="text" class="form-control" name="bookauthor" placeholder="(xxx) xxx-xxxx"/>
                     </label>
                        <label>
                            Street:
                                <input onChange = {this.authorhandler} type="text" class="form-control" name="bookauthor" placeholder="Street"/>
                     </label>
                     <label>
                            Zip:
                                <input onChange = {this.authorhandler} type="text" class="form-control" name="bookauthor" placeholder="Zip"/>
                     </label>
                     </div>
                     <div class="col col-lg-2">
                        <label>
                            City:
                                <input onChange = {this.authorhandler} type="text" class="form-control" name="bookauthor" placeholder="City"/>
                        </label>
                        <label>
                            Country:
                                <input onChange = {this.authorhandler} type="text" class="form-control" name="bookauthor" placeholder="Country"/>
                     </label>
                     </div>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitLogin} class="btn btn-success" type="submit">Create User</button>
                        </div> 
                </div>
            </div>
        )
    }
}

export default Create;