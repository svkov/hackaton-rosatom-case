import React from "react";
import './Burger.css';
import { slide as Menu } from 'react-burger-menu'
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu>
          <ul>
            <li>
              <Link to="/">Загрузить</Link>
            </li>
            <li>
              <Link to="/history">История</Link>
            </li>
          </ul>
          
      </Menu>
    );
  }
}

export default Example;