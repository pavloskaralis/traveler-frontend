import React from 'react'
import { connect } from 'react-redux'
import history from '../../history.js'
import './Button.css'
import toggleForm from '../../actions/toggleForm.js';
import selectItinerary from '../../actions/selectItinerary.js';

const mapDispatchToProps = {
    toggleForm,
    selectItinerary
}


function Button({type, toggleForm, selectItinerary}) {
     // all buttons except back toggle form
    const onClick = type === 'return' ? ()=> {history.push('/');selectItinerary('')} : ()=> toggleForm(type);
    return (
        <div className='button' id={type} onClick={ onClick }></div>
    )
}

Button = connect(
    null,
    mapDispatchToProps
)(Button)

export default Button

  