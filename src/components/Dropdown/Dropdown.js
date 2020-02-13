import React, { Component } from 'react'
import logOut from '../../actions/logOut.js'
import { connect } from 'react-redux'
import toggleForm from '../../actions/toggleForm.js'
import './Dropdown.css'


const mapStateToProps = state => {
    return { isLoggedIn: state.isLoggedIn}
}

const mapDispatchToProps = {
    logOut,
    toggleForm
}

function Dropdown({isLoggedIn, logOut, toggleForm}) {
    return (
        <div className='dropdown-menu'>
            {isLoggedIn ? 
                <React.Fragment>
                    <a href='/'>itineraries</a>
                    <a href='/' onClick={logOut}>log out</a>
                </React.Fragment> : 
                <React.Fragment>
                    <a onClick={()=> toggleForm('sign up')}>sign up</a>
                    <a onClick={()=> toggleForm('log in')}>log in</a>
                </React.Fragment>
            }
        </div>
    )
}

Dropdown = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dropdown)

export default Dropdown

  