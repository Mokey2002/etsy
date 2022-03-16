import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import au from '../img/ua.jpg';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
class Home extends Component {
    constructor(){
        super();
        this.state = {  
            books : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    books : this.state.books.concat(response.data) 
                });
            });
    }

    render(){
        //iterate over books to create a table row
        let details = this.state.books.map(book => {
            return(
                <tr>
                    <td>{book.BookID}</td>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Name your Shop</h2>
<form class="form-inline">
  <div class="form-group ">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="search" class="form-control rounded" placeholder="Shop Name" aria-label="Search" aria-describedby="search-addon" />
  </div>
  <button type="submit" class="btn btn-primary mb-2">Check</button>
</form>

                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;