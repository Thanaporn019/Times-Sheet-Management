import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/home'
import Project from '../pages/Project'
import JobType from '../pages/JobType'
import Work from '../pages/Work'
import ActionsWork from '../pages/Work/create-edit-view'
import actionProject from '../pages/Project/CreateP'
import actionJobType from '../pages/JobType/CreateJ'
// import CreateP from '../pages/Project/CreateP'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/jobtype" component={JobType} />
    <Route exact path="/projects" component={Project} />
    <Route exact path="/work" component={Work} />
    {/* <Route exact path="/work/:action?" component={ActionsWork} /> */}
    <Route exact path="/projects/:action?" component={actionProject} />
    <Route exact path="/jobtype/:action?" component={actionJobType} />
    <Route exact path="/work/:action?" render={(props) => <ActionsWork {...props} /> } />

    {/* <Route exact path="/CreateP" component={CreateP} /> */}
  </Switch>
)