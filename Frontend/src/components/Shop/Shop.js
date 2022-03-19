import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import au from '../img/ua.jpg';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Create extends Component {
    constructor(props){
        super(props);
        this.state = {  
            owner: false,
            items:  [],
            itemname : "",
            category:"",
            description : "",
            price: "",
            quantity : "",
            photo : ""
        }

                //Bind the handlers to this class
                this.itemnamehandler = this.itemnamehandler.bind(this);
                this.categoryhandler = this.categoryhandler.bind(this);
                this.descriptionhandler = this.descriptionhandler.bind(this);
                this.quantityhandler = this.quantityhandler.bind(this);
                this.pricehandler = this.pricehandler.bind(this);
                this.photohandler = this.photohandler.bind(this);
                
                this.submitLogin = this.submitLogin.bind(this);
    }
        //title change handler
        itemnamehandler = (e) => {
            this.setState({
                username : e.target.value
            })
        }
            //title change handler
    categoryhandler = (e) => {
        this.setState({
            category : e.target.value
        })
    }
        //title change handler
        descriptionhandler = (e) => {
            this.setState({
                description : e.target.value
            })
        }
            //title change handler
    quantityhandler = (e) => {
        this.setState({
            quantity : e.target.value
        })
    }
        //title change handler
        pricehandler = (e) => {
            this.setState({
                price : e.target.value
            })
        }
            //title change handler
    photohandler = (e) => {
        this.setState({
            photo : e.target.value
        })
    }  
    //add item
    submitLogin = (e) => {

        e.preventDefault();
        const data = {

            itemname : this.state.itemname,
            category:this.state.category,
            description : this.state.description,
            price: this.state.price,
            quantity : this.state.quantity,
            photo : this.state.photo
        }
        //send data to backend
        axios.post('http://localhost:3001/additem',data)
            .then(response => {
                console.log("Status Code Register : ",response.status);
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
    //get the books data from backend  
    componentDidMount(){
        const data={
            username: cookie.load('cookie'),

        }
        axios.post('http://localhost:3001/shopdata',data)
                .then((response) => {


                    if(response.status === 200){
                        this.setState({
                            owner: true,
                            items : this.state.items.concat(response.data) 
                        })
                    } else if(response.status === 201){
                        this.setState({
                            owner:false,
                            books : this.state.items.concat(response.data) 
                        })
                    }

                //update the state with the response data
              //  this.setState({
              //      books : this.state.books.concat(response.data) 
               // });
            });
    }

    render(){
        //iterate over books to create a table row
     /*   let details = this.state.books.map(book => {
            return(
                <tr>
                    <td>{book.BookID}</td>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                </tr>
            )
        })*/
        //if not logged in go to login page
        let redirectVar = null;
        let shopowner= null;
        let sales = null;
        let {owner} = this.state;
        let additem = null;
        let modalval = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(owner){
            shopowner = <Link to="/update"><span class="glyphicon glyphicon-user"></span>Edit Profile</Link>
            sales = <div class="form-group ">
            <label for="sales" class="sr-only">sales</label>
            <p name="sales" id="sales"> 5656 items </p>
          </div>
       additem =  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
         Add item
       </button>
       
   
        modalval =        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <div style={{width: '100%'}} class="form-group">
                        <div class="col col-lg-3">
                        <label> 
                         Item name:   <input  onChange ={this.itemnamehandler} type="text" class="form-control" name="idnum" placeholder="Name" />
                        </label>
                        <br/>
                        <label> 
                         Category:   <input  onChange ={this.categoryhandler} type="password" class="form-control" name="idnum" placeholder="Name" />
                        </label>
                        <br/>
                        <label> 
                         Description:   <input  onChange ={this.descriptionhandler} type="text" class="form-control" name="idnum" placeholder="Name" />
                            
                        </label>
                        <br/>
                        <label>
                           Price:     <input  onChange = {this.pricehandler} type="text" class="form-control" name="booktitle" placeholder="Age" />
                        </label>
                        <br/>
                        <label>
                            Quantity:
                                <input onChange = {this.quantityhandler} type="text" class="form-control" name="bookauthor" placeholder="email"/>
                     </label>
                     </div>
                     <div class="col col-lg-2">
                     <label>
                            Photo:
                                <input onChange = {this.photohandler} type="text" class="form-control" name="bookauthor" placeholder="(xxx) xxx-xxxx"/>
                     </label>
                     </div>
                        </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button  onClick = {this.submitLogin}  type="button" class="btn btn-primary">Add item</button>
            </div>
          </div>
        </div>
      </div>
    
    
    
    }

        return(
            <div>
                {redirectVar}
                {modalval}
                <div class="container">

                <div class="outer">
                <img src={au} class="rounded" ></img>
    <div class="inner">
    {shopowner}
    {additem}
    <label></label>
    </div>
  </div>


                    <h2>Items</h2>

<div class="d-inline ">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-primary">
  <FontAwesomeIcon icon={faSearch} />
  </button>
</div>
<form class="form-inline">
  <div class="form-group ">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  </div>
  <br></br>
  {sales}
  <button type="submit" class="btn btn-primary mb-2">Search</button>
</form>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {/*details*/}
                                <div class="outer">
                <img src={au} class="rounded" ></img>
    <div class="inner">

    <Link to="/update"><span class="glyphicon glyphicon-user"></span>Edit Profile</Link>
    <label></label>
    </div>
  </div>
  <div class="outer">
                <img src={au} class="rounded" ></img>
    <div class="inner">

    <Link to="/update"><span class="glyphicon glyphicon-user"></span>Edit Profile</Link>
    <label></label>
    </div>
  </div>
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Create;