import logo from './logo.svg';
import './App.css';

import react from 'react';
import Example from './Burger';
import axios from 'axios';
import History from './History';
import NotFound from './NotFound'
import Home from './Home'

import "react-awesome-button/dist/styles.css";
import {Switch, Route, BrowserRouter as Router, Link} from 'react-router-dom';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const headers = {
  "Access-Control-Allow-Origin": "*",
  'content-type': 'application/json',
};

class App extends react.Component {
  state = { 
    selectedFile: null,
  }; 
   
  onFileChange = event => { 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 
   
  onFileUpload = () => { 
    console.log(this.state)
    const formData = new FormData(); 
    formData.append( 
      "file", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
    axios.post("api/uploadfile", formData, {headers: headers}).then(function (response) {
      const file_id = response.data.file_id;
      const new_url = `api/predict/${file_id}`;
      axios.get(new_url, {headers: headers}).then(function(response) {
        console.log(response);
      })
    }); 
  }; 

  render() {
    return (
      <div className="App">
        <Router>
          <Example pageWrapId={"page-wrap"} outerContainerId={ "App" }/>
          <div id="page-wrap">
            <Switch>
                <Route path="/history" component={History}/>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
