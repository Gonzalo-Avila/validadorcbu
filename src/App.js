import './App.css';
import {Route, Switch} from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="App App-header">
        <img className={"pt-5"} src={"cedeira.svg"} alt={""}/>
        <div className={"container pt-5"}>

            <div className={"row justify-content-center"}>
                <div className={"col-8"}>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route default><div>Página inexistente</div></Route>
                    </Switch>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
