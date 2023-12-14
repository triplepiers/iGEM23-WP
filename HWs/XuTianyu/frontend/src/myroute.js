import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom'
import Homepage from './views/homepage/homepage'
import Mainpage from './views/mainpage/mainpage'
import Moviepage from './views/moviepage/moviepage'
import Actorpage from './views/actorpage/actorpage'

export default function myroute() {
  return (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/home" component={Mainpage}/>
            <Route exact path="/movie" component={Moviepage}/>
            <Route exact path="/actor" component={Actorpage}/>
            <Redirect from='/*' to='/'/>
        </Switch>
    </HashRouter>
  )
}
