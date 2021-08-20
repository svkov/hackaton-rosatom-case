import logo from './logo.svg';
import './App.css';
import Example from './Burger'

function App() {
  return (
    <div className="App">
      <Example pageWrapId={"page-wrap"} outerContainerId={ "App" }/>
      <div id="page-wrap">Hello</div>
    </div>
  );
}

export default App;
