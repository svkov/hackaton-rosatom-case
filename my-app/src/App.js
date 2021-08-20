import logo from './logo.svg';
import './App.css';
import Example from './Burger'
import react from 'react';
import axios from 'axios'

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
    const formData = new FormData(); 
    formData.append( 
      "file", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
    axios.post("api/uploadfile", formData); 
  }; 

  fileData = () => { 
    if (this.state.selectedFile) { 
        
      return ( 
        <div> 
          <h2>File Details:</h2> 
          <p>File Name: {this.state.selectedFile.name}</p> 
          <p>File Type: {this.state.selectedFile.type}</p> 
          <p> 
            Last Modified:{" "} 
            {this.state.selectedFile.lastModifiedDate.toDateString()} 
          </p> 
        </div> 
      ); 
    } else { 
      return ( 
        <div> 
          <br /> 
          <h4>Choose before Pressing the Upload button</h4> 
        </div> 
      ); 
    } 
  }; 

  render() {
    return (
      <div className="App">
        <Example pageWrapId={"page-wrap"} outerContainerId={ "App" }/>
        <div id="page-wrap">
          <div id="upload-file">
          <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
          </div>
          {this.fileData()} 
        </div>
      </div>
    );
  }
}

export default App;
