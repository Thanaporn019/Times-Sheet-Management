import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/home'
import Project from '../pages/Project'
import JobType from '../pages/JobType'
import Work from '../pages/Work'
import ActionsWork from '../pages/Work/create-edit-view'
// import CreateP from '../pages/Project/CreateP'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/jobtype" component={JobType} />
    <Route exact path="/project" component={Project} />
    <Route exact path="/work" component={Work} />
    <Route exact path="/work/:action?" render={(props) => <ActionsWork {...props} /> } />

    {/* <Route exact path="/CreateP" component={CreateP} /> */}
  </Switch>
)