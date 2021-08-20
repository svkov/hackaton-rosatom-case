import React, { Component, Fragment } from "react";
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";


class FileUploadButton extends Component {
  
    render() {
      return (
        <Fragment>
          <input
            ref="fileInput"
            onChange={this.props.onChange}
            type="file"
            style={{ display: "none" }}
            // multiple={false}
          />
          <AwesomeButton onPress={() => this.refs.fileInput.click()}>Upload File</AwesomeButton>
        </Fragment>
      );
    }
  }
export default FileUploadButton;