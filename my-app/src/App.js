import logo from './logo.svg';
import './App.css';
import Example from './Burger';
import FileUploadButton from './FileUploader';
import MainScreen from './MainScreen';
import react from 'react';
import axios from 'axios';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";


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
      // handle success
      console.log(response);
    }); 
  }; 

  render() {
    const content = (
    <div id="upload-file">
    <FileUploadButton onChange={this.onFileChange} />
      <AwesomeButton onPress={this.onFileUpload} type="primary">
        Загрузить
      </AwesomeButton>
    </div>
    ) 
    
    return (
      <div className="App">
        <Example pageWrapId={"page-wrap"} outerContainerId={ "App" }/>
        <div id="page-wrap">
          {content}
        </div>
      </div>
    );
  }
}

export default App;
