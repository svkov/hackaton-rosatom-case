import { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import FileUploadButton from './FileUploader';

class Home extends Component {
    render() {
        return (
            <div id="upload-file">
            <FileUploadButton onChange={this.onFileChange} />
              <AwesomeButton onPress={this.onFileUpload} type="primary">
                Загрузить
              </AwesomeButton>
            </div>
        );
    }
}

export default Home;