import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Forms from "./components/Forms"
import Employers from "./components/Employers"
import './App.css';


function Index() { 

  return (
    <React.Fragment>
      <h2>Home</h2>
      <div>Роутер, формы и асинхрон.</div>
      <div><br/>
        <a className="main-href" href="https://github.com/osvezhitel/react-router" target="_blank">Ссылка на репозиторий</a>
      </div>
    </React.Fragment>
    )
} 

function AppRouter() {
  return (
    <Router>
      <div className="container">
        <nav className="menu">
          <ul>
            <li>
              <Link className="btn-link" to="/">Home</Link>
            </li>
            <li>
              <Link className="btn-link" to="/forms/">Формы</Link>
            </li>
            
            <li>
              <Link className="btn-link" to="/employers/">Асинхрон</Link>
            </li> 
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/forms/" component={Forms} /> 
        <Route path="/employers/" component={Employers} />
      </div>
    </Router>
  );
}

export default AppRouter;
