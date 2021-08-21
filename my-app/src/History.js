import axios from "axios";
import { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import Collapsible from "react-collapsible";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";

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

  render() {
    console.log(this.state.text);
    return (
      <div>
        <div id="history-page">
          <hr />
          <div className="bar" id="stenogram">
            <Collapsible trigger="Стенограмма">
              <div className="collapsible-content">
                <div class="dialog">
                  <ListItem user_id={0} text="Коллеги, добрый день." />
                  <ListItem user_id={1} text="Добрый день, коллеги" />
                  <ListItem user_id={2} text="Приветствую" />
                  <ListItem user_id={0} text="Сегодняшняя повестка дня..." />
                </div>

                <div className="buttons">
                  <div class="submit-buttons">
                    <AwesomeButton className="submit-buttons">
                      Применить
                    </AwesomeButton>
                  </div>
                  <div class="submit-buttons">
                    <AwesomeButton className="submit-buttons">
                      Скачать
                    </AwesomeButton>
                  </div>
                </div>
              </div>
            </Collapsible>
          </div>
          <hr />
          <div className="bar" id="protocol">
            <Collapsible trigger="Протокол">
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
              <div className="buttons">
                <div class="submit-buttons">
                  <AwesomeButton className="submit-buttons">
                    Применить
                  </AwesomeButton>
                </div>
                <div class="submit-buttons">
                  <AwesomeButton className="submit-buttons">
                    Скачать
                  </AwesomeButton>
                </div>
              </div>
            </Collapsible>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default History;
