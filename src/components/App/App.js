import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import userSetup from '../../actions/userSetup.js'
import './App.css'
import Nav from '../Nav/Nav.js'
import Home from '../Home/Home.js'
import Index from '../Index/Index.js'
import Show from '../Show/Show.js'

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
  }
}

const mapDispatchToProps = {
  userSetup,
}

function App({isLoggedIn,userSetup}) {
  useEffect(userSetup,[])

  return (
    <React.Fragment>
      <Nav/>
      <Switch>
        {isLoggedIn && <Route path={'/:location'} render={()=> <Show/>}/>}  
        {/* null prevents index home page flash */}
        <Route path={'/'} render={()=> isLoggedIn === true? <Index/> : isLoggedIn === false? <Home/> : null}/>
      </Switch>
    </React.Fragment>  
  )
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App) 

export default App

  