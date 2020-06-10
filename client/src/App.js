import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/navbar';
import Home from './components/home';
import Login from  './components/login';
import Register from './components/register';

function App() {
  return (
    <Router>
    <div className="vh-100">
    <Navbar/>
    <div className="bg-light h-100">
    <Route path="/" exact component={Home} />
    <Route path="/login" component = {Login}/>
    <Route path="/register" component = {Register}/>
    </div>
    </div>

  </Router>
  );
}

export default App;
