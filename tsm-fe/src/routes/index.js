import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/home'
import Project from '../pages/Project'
import JobType from '../pages/JobType'
import Work from '../pages/Work'
import ActionsWork from '../pages/Work/create-edit-view'
import ActionJobType from '../pages/JobType/create-edit'
import ActionsProject from '../pages/Project/create-edit'



export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/jobtype" component={JobType} />
    <Route exact path="/project" component={Project} />
    <Route exact path="/work" component={Work} />
    <Route exact path="/work/:query?" render={(props) => <ActionsWork {...props} /> } />
    <Route exact path="/project/:query?" render={(props) => <ActionsProject {...props} /> } />
    <Route exact path="/jobtype/:query?" render={(props) => <ActionJobType {...props} /> } />
    {/* <Route exact path="/work/:action?/:workId?" render={(props) => <ActionsWork {...props} /> } /> */}
    {/* <Route exact path="/jobtype/:action?/:typeId" render={(props) => <ActionJobType {...props} /> } />
    <Route exact path="/project/:action?/:projectId" render={(props) => <ActionsProject {...props} /> } /> */}
   
  </Switch>
)