import React, { useEffect, useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ReactGA from 'react-ga'
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import ttiPolyfill from 'tti-polyfill'
import "./index.css";

function App() {
  let sideNav;
  function handlePerformance(list) {
    console.log('list: ', list);
    list.getEntries().forEach(entry => {
      ReactGA.timing({
        category: "Load Performance",
        variable: 'Server Latency',
        value: entry.responseStart - entry.requestStart 
      })
      ReactGA.timing({ 
        category: "Load Performance",
        variable: 'Download Time',
        value: entry.responseEnd - entry.responseStart
      })
      ReactGA.timing({
        category: "Load Performance",
        variable: 'Total App Load Time',
        value: entry.responseEnd - entry.requestStart
      })
  })
}


  useEffect(() => {
    ReactGA.initialize([
      { 
        trackingId: 'G-YJK7R2Y1TL',
        gaOptions: { siteSpeedSampleRate: 100, name: 'GA tracker' }
      },
      { 
        trackingId: "UA-181494074-1",
        debug: true,
        standardImplementation: true,
        gaOptions: { siteSpeedSampleRate: 100, name: 'Original Tracker'}
      }
    ])
    var observer = new PerformanceObserver(handlePerformance);
console.log('observer: ', observer);
observer.observe({entryTypes: ['navigation'] })
  }, [])

  
ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ReactGA.timing({
    category: "Load Performance",
    variable: 'Time to Interactive',
    value: tti 
  })
});


  useEffect(() => {
    M.AutoInit();
    console.log("Running this mothafucka")
    var elems = document.querySelectorAll(".sidenav");
    // eslint-disable-next-line
    var instances = M.Sidenav.init(elems);
    sideNav = instances[0];

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
