import React, { useEffect, useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ReactGa from 'react-ga'
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import ttiPolyfill from 'tti-polyfill'
import "./index.css";

function App() {
  let sideNav;
  useEffect(() => {
    ReactGa.initialize("UA-181494074-1", {
      gaOptions: { siteSpeedSampleRate: 100 }
    })
    ReactGa.addTrackers([
      { 
        trackingId: 'G-YJK7R2Y1TL',
        gaOptions: { siteSpeedSampleRate: 100, name: 'GA tracker' }
      }
    ])
  }, [])

  const handlePerformance = list => {
    list.getEntries().forEach(entry => {
      ReactGa.timing({
        category: "Load Performance",
        variable: 'Server Latency',
        value: entry.responseStart - entry.requestStart 
      })
      ReactGa.timing({ 
        category: "Load Performance",
        variable: 'Download Time',
        value: entry.responseEnd - entry.responseStart
      })
      ReactGa.timing({
        category: "Load Performance",
        variable: 'Total App Load Time',
        value: entry.responseEnd - entry.requestStart
      })
  })
}
ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ReactGa.timing({
    category: "Load Performance",
    variable: 'Time to Interactive',
    value: tti 
  })
});
var observer = new PerformanceObserver(handlePerformance);
observer.observe({entryTypes: ['navigation'] })



  useEffect(() => {
    M.AutoInit();
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems);
    sideNav = instances[0];
    console.log(sideNav);
  }, []);
  const [curPath, setPath] = useState("/");
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar
          sideNavOpen={() => sideNav.open()}
          sideNavClose={() => sideNav.close()}
          curPath={curPath}
        />

        <Switch>
          <Route
            exact
            path="/"
            component={() => <AboutMe setPath={setPath} curPath={curPath} />}
          />
          <Route
            exact
            path="/portfolio"
            component={() => <Portfolio setPath={setPath} curPath={curPath} />}
          />
          <Route
            exact
            path="/contact"
            component={() => <Contact setPath={setPath} curPath={curPath} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
