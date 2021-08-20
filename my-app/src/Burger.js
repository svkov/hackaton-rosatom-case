import React from "react";
import './Burger.css';
import { slide as Menu } from 'react-burger-menu'

class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu>
        <a id="upload" className="menu-item" href="/">Загрузить</a>
        <a id="history" className="menu-item" href="/about">История</a>
      </Menu>
    );
  }
}

export default Example;