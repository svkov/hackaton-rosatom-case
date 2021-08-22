import { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import FileUploadButton from "./FileUploader";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
axios.defaults.baseURL = "http://127.0.0.1:8000/";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "content-type": "application/json",
};

function Button(props) {
  let history = useHistory();

  function click() {
    props.onClick(history);
  }

  return (
    <AwesomeButton id={props.id} className={props.className} onPress={click} type="primary">
      Отправить
    </AwesomeButton>
  );
}
class Home extends Component {
  state = {
    selectedFile: null,
    file_id: 0,
    disabled: true,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = (history) => {
    console.log(this.state);
    const formData = new FormData();
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    var self = this;
    axios
      .post("api/uploadfile", formData, { headers: headers })
      .then(function (response) {
        const file_id = response.data.file_id;
        self.setState({ file_id: file_id, disabled: false });
        console.log(self.state);
        history.push(`/history/${file_id}`);
      });
  };

  render() {
    return (
      <div id="upload-file">
        <h1>Загрузите запись совещания</h1>
        Нажмите "Загрузить", чтобы выбрать файл, а затем нажмите "Отправить".
        <br />
        Поддерживаются только файлы формата mp4
        <br />
        <div>
          <FileUploadButton className="buttons-home" onChange={this.onFileChange} />
          <Button className="buttons-home" onClick={this.onFileUpload} file_id={this.state.file_id} />
        </div>
      </div>
    );
  }
}

export default Home;
