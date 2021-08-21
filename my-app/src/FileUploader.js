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
            onUp
            // multiple={false}
          />
          <AwesomeButton onPress={() => this.refs.fileInput.click()}>Загрузить</AwesomeButton>
        </Fragment>
      );
    }
  }
export default FileUploadButton;