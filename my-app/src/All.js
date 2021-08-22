import { Component } from "react";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import { AwesomeButton } from "react-awesome-button";

const users = ["Иванов А.Б.", "Сидорова В.Г.", "Кузнецов Д.Е."];


class Row extends Component {
    render() {
        return (
             <div className="row-all">
                 <div>{this.props.name}</div>
                 <div>{this.props.date}</div>
             </div>
        );
    }
}

class All extends Component {
  state = { show: false };

  show = () => {
    this.setState({ show: true });
    console.log(this.state);
  };

  onClick = () => {
    setTimeout(
      function () {
        this.show();
      }.bind(this),
      500
    );
  };

  render() {
    let content = <div></div>;
    if (this.state.show) {
      content = (
        <div className="all-content">
            <div className="list-item-all">
                <div>...я думаю, мы <b>продуктивно</b> провели встречу...</div>
                <div>11:53:12</div>
            </div>
            <div className="list-item-all">
                <div>Была ли эта встреча <b>продуктивной</b> для вас?</div>
                <div>12:50:21</div>
            </div>
        </div>
      );
    }
    return (
      <div className="all-container">
          <h1>Поиск по фразам</h1>
        <label className="filter-label">
          <div>Автор</div>
          <Dropdown
            placeholder="Select an option"
            className="my-dropdown-menu"
            id="filter-author"
            options={users}
            value={users[1]}
          />
          <div>Фраза</div>
          <input type="text" />
          <AwesomeButton onPress={this.onClick}>Найти</AwesomeButton>
        </label>
        <br />
        {content}
      </div>
    );
  }
}

export default All;
