import React, { useState } from 'react'
import { connect } from 'react-redux'
import { TextareaAutosize } from '@material-ui/core'
import toggleForm from '../../actions/toggleForm'
import selectPlanningRow from '../../actions/selectPlanningRow.js'
import putPlanningRow from '../../actions/putPlanningRow.js'
import deleteSchedulingRow from '../../actions/deleteSchedulingRow.js'
import putSchedulingRow from '../../actions/putSchedulingRow.js'
import './Row.css'

const mapStateToProps = state => {
    return {
      userID: state.userID,
      itinerary: state.itinerary
    }
}

const mapDispatchToProps = {
    toggleForm,
    selectPlanningRow,
    putPlanningRow,
    deleteSchedulingRow,
    putSchedulingRow
}


function Row({rowType, row, rowIndex, userID, toggleForm, selectPlanningRow, putPlanningRow, deleteSchedulingRow, putSchedulingRow}) {

    //textarea cannot use ref; must rely on state values for storage
    const [activity, updateActivity] = useState(row.activity);
    const [type, updateType] = useState(row.category);
    const [address, updateAddress] = useState(row.address);
    const [website, updateWebsite] = useState(row.website);
    // planning row only
    const [interest, updateInterest] = useState(row.interest);
    // scheduling row only
    const [time, updateTime] = useState(row.time);

    //put request for planning row
    //must use document.query instead of state, as there is a delay in update
    const putRequestPlanning = (interest) => {
        return putPlanningRow(row.id, {
                activity: document.querySelector(`#activity${row.id}`).value,
                category: document.querySelector(`#type${row.id}`).value,
                address: document.querySelector(`#address${row.id}`).value,
                website: document.querySelector(`#website${row.id}`).value,
                interest: JSON.stringify(interest)
            }, rowIndex
        );
    }

    //onClick for interest button; not a text area
    const toggleInterest = () => {
        let updatedInterest = interest.indexOf(userID) === -1 ? 
            [...interest,userID] : [...interest.slice(0,interest.indexOf(userID)),...interest.slice(interest.indexOf(userID) + 1)];
        updateInterest(updatedInterest)
        //must use document.query instead of state, as there is a delay in update
        putRequestPlanning(updatedInterest);
    }
    

    //handles input value change for both planning and scheduling row
    const handleInput = (e) => {
        switch(e.target.id){
            case `activity${row.id}`:return updateActivity(e.target.value);
            case `type${row.id}`:return updateType(e.target.value);
            case `address${row.id}`:return updateAddress(e.target.value);
            case `website${row.id}`:return updateWebsite(e.target.value);
            case `time${row.id}`:return updateTime(e.target.value);
        }
    }

    //handle change for planning row
    const handlePlanningChange = (e) => {
        handleInput(e);
        putRequestPlanning(interest);
    }

     //handle change for scheduling row
     const handleSchedulingChange = (e) => {
        handleInput(e);
        putSchedulingRow(row.id, {
                activity: document.querySelector(`#activity${row.id}`).value,
                category: document.querySelector(`#type${row.id}`).value,
                address: document.querySelector(`#address${row.id}`).value,
                website: document.querySelector(`#website${row.id}`).value,
                time: document.querySelector(`#time${row.id}`).value,
            }, rowIndex
        );
    }
    

    return (
        <>
            {/* planning row */}
            {rowType === 'planning' && <div id={row.id}className='row-container'>
                <TextareaAutosize onChange={handlePlanningChange} value={activity} className='first' id={`activity${row.id}`}> </TextareaAutosize>
                <TextareaAutosize onChange={handlePlanningChange} value={type} id={`type${row.id}`}></TextareaAutosize>
                <TextareaAutosize onChange={handlePlanningChange} value={address} id={`address${row.id}`}></TextareaAutosize>
                <TextareaAutosize onChange={handlePlanningChange} value={website} id={`website${row.id}`}></TextareaAutosize>
                <div className='interest-container'>
                    <div className='interest'>{interest.length}</div>
                    <div className={interest.indexOf(userID) === -1 ? 'interest-button' : 'interest-button-subtract'} onClick={toggleInterest} id='interest'></div>
                </div>
                <div className='schedule-container'>
                    <div className='schedule' onClick={()=> {selectPlanningRow(row); toggleForm('schedule')}}></div>
                </div>
            </div>}
            {/* scheduling row */}
            {rowType === 'scheduling' && <div id={row.id}className='row-container'>
                <div className='time-container'>
                    <input type='time' onChange={handleSchedulingChange} className='time' defaultValue={time} id={`time${row.id}`}/>
                </div>
                <TextareaAutosize onChange={handleSchedulingChange} value={activity} id={`activity${row.id}`}> </TextareaAutosize>
                <TextareaAutosize onChange={handleSchedulingChange} value={type} id={`type${row.id}`}></TextareaAutosize>
                <TextareaAutosize onChange={handleSchedulingChange} value={address} id={`address${row.id}`}></TextareaAutosize>
                <TextareaAutosize onChange={handleSchedulingChange} value={website} id={`website${row.id}`}></TextareaAutosize>
                <div className='remove-container'>
                    <div className='remove' onClick={()=> deleteSchedulingRow(row.id)}></div>
                </div>
            </div>}
        </>
    )
}

Row = connect(
    mapStateToProps,
    mapDispatchToProps
)(Row)

export default Row

  