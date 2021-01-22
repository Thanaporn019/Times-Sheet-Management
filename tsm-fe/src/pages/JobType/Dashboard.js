import React from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">work</Link>
          </li>
          <li>
            <Link to="/project">project</Link>
          </li>
          <li>
            <Link to="/job-type">job type</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <work />
          </Route>
          <Route path="/project">
            <project />
          </Route>
          <Route path="/job-type">
            <jobtype />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function work() {
  return (
    <div>
      <h2>work</h2>
    </div>
  );
}

function project() {
  return (
    <div>
      <h2>project</h2>
    </div>
  );
}

function jobtype() {
  return (
    <div>
      <h2>job-type</h2>
    </div>
  );
}

