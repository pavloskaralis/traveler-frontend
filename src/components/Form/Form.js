import React from 'react'
import { connect } from 'react-redux'
import toggleForm from '../../actions/toggleForm.js'
import signUp from '../../actions/signUp.js'
import logIn from '../../actions/logIn.js'
import toggleError from '../../actions/toggleError.js'
import postItinerary from '../../actions/postItinerary.js'
import selectItinerary from '../../actions/selectItinerary.js'
import selectPlanningRow from '../../actions/selectPlanningRow.js'
import putItinerary from '../../actions/putItinerary.js'
import deleteItinerary from '../../actions/deleteItinerary.js'
import postLookup from '../../actions/postLookup.js';
import postSchedulingRow from '../../actions/postSchedulingRow.js';
import './Form.css'


const mapStateToProps = state => {
    return {
        form: state.form,
        error: state.error,
        userID: state.userID,
        itinerary: state.itinerary,
        index: state.itineraries.findIndex(itinerary => itinerary.location === state.itinerary.location),
        planningRow: state.planningRow
    }
}

const mapDispatchToProps = {
    toggleForm,
    signUp,
    logIn,
    postItinerary,
    selectItinerary,
    selectPlanningRow,
    putItinerary,
    deleteItinerary,
    postLookup,
    toggleError,
    postSchedulingRow
}

//form reused for home, index, and show pages
function Form({
    form, error, toggleForm, signUp, logIn, page, userID, itinerary, toggleError, 
    postSchedulingRow, postItinerary, selectItinerary, selectPlanningRow, putItinerary, 
    deleteItinerary, postLookup, index, planningRow
}) {
    //define variables for ref attributes
    let username,
    password,
    location,
    departureDate,
    returnDate,
    schedulingDate,
    schedulingTime,
    addUser; 
    const allInputs = [username,password,location,departureDate,returnDate,addUser,schedulingDate,schedulingTime];

    const submit = e => {
        
        e.preventDefault();
        //prevent empty input submission 
        switch(form) {
            case 'sign up': if(!username.value || !password.value)return
                break;
            case 'log in': if(!username.value || !password.value)return
                break;
            case 'new': if(!location.value || !departureDate.value || !returnDate.value)return
                break;
            case 'update': if(!location.value || !departureDate.value || ! returnDate.value)return
                break;
            case 'share': if(!addUser.value) return
                break; 
            case 'schedule': if(!schedulingDate.value || !schedulingTime.value) return
        }
        //prevent sharing itinerary with more than 8 users
        if(form === 'share' && itinerary.usernames.length === 8) return toggleError('8 User Limit');
        //prevent sharing itinerary with more than 8 users
        if(form === 'share' && itinerary.usernames.find(username => username === addUser.value)) return toggleError('Already Shared');

        //switch submit actions based on form type        
        switch(form) {
            case 'sign up': signUp(username.value,password.value);
                break;
            case 'log in': logIn(username.value,password.value);
                break;
            case 'new': postItinerary(location.value,departureDate.value,returnDate.value,userID)
                break;
            case 'update': {putItinerary(location.value,departureDate.value,returnDate.value,itinerary.id,itinerary.index)}
                break;
            case 'remove': deleteItinerary(itinerary, userID);
                break;
            case 'share': postLookup(itinerary.id,addUser.value, index);
                break;
            case 'schedule': postSchedulingRow(itinerary.id, schedulingDate.value, schedulingTime.value , planningRow );
                break;
        }
        //reset values
        document.querySelectorAll('input').forEach(input => input.value = '');
    }
    //transform button text to form legend text
    let legend = form;
    switch(form) {
        case 'new': legend = 'new itinerary';
            break;
        case 'update': legend = 'update itinerary';
            break;
        case 'remove': legend = 'remove itinerary';
            break;
        case 'share': legend = 'share itinerary';
            break;
        case 'schedule': legend = 'schedule activity';
    }
    //refactor departure and return date for update form default values
    let firstDay;
    let lastDay;
    if(form === 'update'){
        firstDay = itinerary.dates[0].split('.');
        lastDay = itinerary.dates[itinerary.dates.length - 1].split('.');
        firstDay[2] = '20' + firstDay[2];
        lastDay[2] = '20' + lastDay[2];
        firstDay = firstDay[2] + '-' + firstDay[0] + '-' + firstDay[1];
        lastDay = lastDay[2] + '-' + lastDay[0] + '-' + lastDay[1];
    }

    // makes error message appear temporarily
    if(toggleError !== '') setTimeout(()=> toggleError(''),1500);

    //inputs vary based on page and form type
    return (
        // close dropdown on off focus
        <div className="form-container" onClick={()=>{
            if(form && page === 'index'){toggleForm('');selectItinerary('')}
            else if(form && page === 'show'){toggleForm('');selectPlanningRow('')}
            else if(form && page === 'home')toggleForm('');
        }}>
            <form onSubmit={ submit } onClick={e => e.stopPropagation()} >
                <legend>{error? error : legend }</legend>
                {/* home page has login and signup form */}
                {page === 'home' &&
                    <>
                        <div className="input-container">
                            <label>Username:</label>
                            <input type="text" ref={node => username = node} autoFocus/>
                        </div>
                        <div className="input-container">
                            <label>Password:</label>
                            <input type={form==="log in" ? "password" : "text"} ref={node => password = node}/>
                        </div>
                    </>
                }
                {/* index page has itinerary create and update form */}
                {page === 'index' &&
                    <>
                        <div className="input-container">
                            <label>Location:</label>
                            <input type="text" ref={node => location = node} defaultValue={form === 'update' ? itinerary.location : ''} autoFocus/>
                        </div>
                        <div className="input-container">
                            <label>Departure:</label>
                            <input type="date" ref={node => departureDate = node} defaultValue={firstDay}/>
                        </div>
                        <div className="input-container">
                            <label>Return:</label>
                            <input type="date" ref={node => returnDate = node} defaultValue={lastDay}/>
                        </div>
                    </>
                }
                {page === 'show' &&
                    <>  
                        {form === 'schedule' &&
                            <>
                                <div className="input-container">
                                    <label>Date:</label>
                                    <select ref={node => schedulingDate = node} autoFocus >
                                        {itinerary.dates.slice(1).map(date => {
                                            return (
                                                <option key={date} value={date}>{date}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                 <div className="input-container">
                                    <label>Time:</label>
                                    <input type="time" ref={node => schedulingTime = node}/>
                                </div>
                            </>
                        }
                        {form === 'remove' &&
                            <div className='input-container'>
                                <label className='remove-label'>Are you sure you want to remove this itinerary?</label>
                            </div>
                        }
                        {form === 'share' && 
                            <>
                                 <div className="input-container">
                                    <label className='all-users'>All Users:</label>
                                    <div className="username-container">
                                        {itinerary.usernames && itinerary.usernames.map(username =>{
                                            return (
                                                <div className='username' key={username}>{username}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="input-container">
                                    <label>Add User:</label>
                                    <input type="text" ref={node => addUser = node} autoFocus/>
                                </div>
                            </>
                        }
                    </>
                }
                <div className="button-container">
                    <div onClick={page === 'index' ? ()=> {toggleForm(''); selectItinerary('')} : ()=> {toggleForm(''); selectPlanningRow('')}} className="cancel">
                        {form === 'share' ? 'Close' : 'Cancel'}
                    </div>
                    <div type="submit" className="submit" onClick={ submit }>{form === 'remove' ? 'Confirm' : 'Submit'}</div>
                    {/* required for enter key to work on home page for unknown reason */}
                    <input className="invisible" type="submit"/>
                </div>
            </form>
        </div>
    )
}

Form = connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)

export default Form

  