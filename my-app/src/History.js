import axios from "axios";
import { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import Collapsible from "react-collapsible";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import Arrow1 from "./Arrow1.svg";
import "react-dropdown/style.css";
import { saveAs } from "file-saver";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "content-type": "application/json",
};

const users = ["Иванов А.Б.", "Сидорова В.Г.", "Кузнецов Д.Е."];

class ListItem extends Component {
  render() {
    return (
      <div className="item-list-wrapper">
        <div className="time">{this.props.time}</div>
        <div className="item-list">
          <Dropdown
            placeholder="Select an option"
            className="my-dropdown-menu"
            options={users}
            value={users[this.props.user_id]}
          />
          <textarea className="element-list">{this.props.text}</textarea>
        </div>
      </div>
    );
  }
}

class ExportComponent extends Component {
  state = {
    format: { label: "Word", value: "Word" },
  };

  download = (e) => {
    if (this.state.format.label === "Word") {
      axios
        .get("api/word", {
          responseType: "blob",
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((response) => {
          console.log(response);
          saveAs(response.data, "Отчет.docx");
        });
    } else {
      axios
        .get("api/pdf", {
          responseType: "blob",
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((response) => {
          console.log(response);
          saveAs(response.data, "Отчет.pdf");
        });
    }
  };
  render() {
    return (
      <div>
        <div className="buttons">
          <div class="submit-buttons">
            <AwesomeButton className="submit-buttons">Применить</AwesomeButton>
          </div>
          <div class="submit-buttons">
            <AwesomeButton className="submit-buttons" onPress={this.download}>
              Скачать
            </AwesomeButton>
          </div>
          <div class="submit-buttons">
            <Dropdown
              options={["PDF", "Word"]}
              value={this.state.format}
              onChange={(value) =>
                this.setState({
                  format: { label: value.label, value: value.value },
                })
              }
            />
          </div>
        </div>
        <p className="small-text">
            Нажмите "Применить", чтобы сохранить изменения
          </p>
      </div>
    );
  }
}
class History extends Component {
  state = {
    text: null,
  };
  callBack = (a) => {
    const self = this;
    const new_url = `api/predict/${this.props.file_id}`;
    axios.get(new_url, { headers: headers }).then(function (response) {
      // this.setState({file_id: response.data.file_id})
      const text = response.data.text;
      self.setState({ text: text });
      console.log(text);
    });
  };

  componentDidMount = (props) => {
    this.callBack();
  };

  //   onCollapsibleOpen =

  render() {
    console.log(this.state.text);
    const stenogram_trigger = (
      <div className="colaps-header">
        <img src={Arrow1} className="arrow"></img>
        <div>Стенограмма</div>
      </div>
    );

    const protocol_trigger = (
      <div className="colaps-header">
        <img src={Arrow1} className="arrow"></img>
        <div>Протокол</div>
      </div>
    );

    const history = (
      <div className="colaps-header">
        <img src={Arrow1} className="arrow"></img>
        <div>История изменения</div>
      </div>
    );
    return (
      <div>
        <div id="history-page">
          <hr className="nomargin" />
          <div className="bar" id="stenogram">
            <Collapsible trigger={stenogram_trigger} open={true}>
              <div className="collapsible-content">
                <div class="dialog">
                  <br />
                  Проверьте правильность стенограммы
                  <ul className="helper-1">
                    <li className="helper-1-item">Автор</li>
                    <li className="helper-1-item">Фраза</li>
                  </ul>
                  <ListItem user_id={0} text="Коллеги, добрый день." />
                  <ListItem user_id={1} text="Добрый день, коллеги" />
                  <ListItem user_id={2} text="Приветствую" />
                  <ListItem user_id={0} text="Сегодняшняя повестка дня..." />
                </div>
                <ExportComponent />
              </div>
            </Collapsible>
          </div>
          <hr className="nomargin" />
          <div className="bar" id="protocol">
            <Collapsible trigger={protocol_trigger} open={true}>
              Проверьте правильность протокола
              <p>
                <b>Присутствовали</b>
              </p>
              <ul>
                <li className="item-protocol">{users[0]}</li>
                <li className="item-protocol">{users[1]}</li>
                <li className="item-protocol">{users[2]}</li>
              </ul>
              <p>
                <b>Решили</b>
              </p>
              <textarea
                className="protocol-text"
                value={this.state.text}
              ></textarea>
              <ExportComponent />
            </Collapsible>
          </div>
          <hr className="nomargin" />
          <div className="bar">
            <Collapsible trigger={history}>
              <ul className="history-list">
                <li>Автор</li>
                <li>Изменение</li>
                <li>Время</li>
              </ul>
              <hr className="nomargin" />
              <ul className="history-list">
                <li>{users[0]}</li>
                <li>Изменена стенограмма</li>
                <li>13:01:12</li>
              </ul>
              <ul className="history-list">
                <li>{users[1]}</li>
                <li>Изменен протокол</li>
                <li>13:03:35</li>
              </ul>
              <ul className="history-list">
                <li>{users[2]}</li>
                <li>Изменена стенограмма</li>
                <li>13:05:16</li>
              </ul>
            </Collapsible>
          </div>
          <hr className="nomargin" />
        </div>
      </div>
    );
  }
}

export default History;
