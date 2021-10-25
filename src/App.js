import { BrowserRouter, Switch, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Error from "./pages/Error";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/game" exact component={Game}/>
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
