import logo from './logo.svg';
import './App.css';
import Example from './Burger'

function App() {
  return (
    <div className="App">
      {/* <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
      <main id="page-wrap">
        sdfjdasfkj
      </main> */}
      <Example pageWrapId={"page-wrap"} outerContainerId={ "App" }/>
      <div id="page-wrap">Hello</div>
    </div>
  );
}

export default App;
