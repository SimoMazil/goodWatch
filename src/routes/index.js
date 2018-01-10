import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../components/Home'
import Details from '../components/Details'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/details/:id" render={props => <Details {... props} />}></Route>
    </Switch>
  </BrowserRouter>
)
