import logo from "./logo.png";
import "./App.css";

import react from "react";
import Example from "./Burger";

import History from "./History";
import NotFound from "./NotFound";
import Home from "./Home";

import "react-awesome-button/dist/styles.css";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import All from './All'

class App extends react.Component {
  state = {
    file_id: 1,
  };

  render() {
    return (
      <div className="App">
        <div className="Title">
          <img src={logo} width="10%" />
          <div className="Title-Subtitle"></div>
        </div>
        <Router>
          <Example pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/history">
                <History file_id={this.state.file_id} />{" "}
              </Route>
              <Route path="/all">
                <All/>
              </Route>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
