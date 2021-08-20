import logo from './logo.svg';
import './App.css';
import Example from './Burger';
// import FileUploader from './FileUploader';
import FileUploadButton from './FileUploader';
import react from 'react';
import axios from 'axios';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";


axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const headers = {"Access-Control-Allow-Origin": "*"};

class App extends react.Component {
  state = { 
    selectedFile: null
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
    axios.post("api/uploadfile", formData); 
  }; 

  render() {
    return (
      <div className="App">
        <Example pageWrapId={"page-wrap"} outerContainerId={ "App" }/>
        <div id="page-wrap">
          <div id="upload-file">
            <FileUploadButton onChange={this.onFileChange} />
              <AwesomeButton onPress={this.onFileUpload} type="primary">
                Загрузить
              </AwesomeButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
