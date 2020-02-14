import React, { useState, useEffect, useRef } from 'react'
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
      scheduling_rows: state.itinerary.scheduling_rows
    }
}

const mapDispatchToProps = {
    toggleForm,
    selectPlanningRow,
    putPlanningRow,
    deleteSchedulingRow,
    putSchedulingRow
}


function Row({rowType, row, userID, toggleForm, selectPlanningRow, putPlanningRow, deleteSchedulingRow, putSchedulingRow, scheduling_rows}) {

    //textarea cannot use ref; must rely on state values for storage
    const [activity, updateActivity] = useState(row.activity);
    const [type, updateType] = useState(row.category);
    const [address, updateAddress] = useState(row.address);
    const [website, updateWebsite] = useState(row.website);
    const [interest, updateInterest] = useState(row.interest);
    const [time, updateTime] = useState(row.time);

    //onClick for interest button; not a text area
    const toggleInterest = () => {
        let updatedInterest = interest.indexOf(userID) === -1 ? 
            [...interest,userID] : [...interest.slice(0,interest.indexOf(userID)),...interest.slice(interest.indexOf(userID) + 1)];

        updateInterest(updatedInterest)
    }
    
    // autoupdate for sort 


    //handles input value change for both planning and scheduling row
    const handleInput = (e) => {
        switch(e.target.id){
            case `activity${row.id}`:return updateActivity(e.target.value);
            case `type${row.id}`:return updateType(e.target.value);
            case `address${row.id}`:return updateAddress(e.target.value);
            case `website${row.id}`:return updateWebsite(e.target.value);
            case `time${row.id}`:return updateTime(e.target.value);
        }
        // updatedTime =  document.querySelector(`#time${row.id}`).value;
    }
    
    useEffect(()=> {
        // put request row on dismount if changed
     
            if(row.interest){
                const updatedPlanning = {
                    activity: activity,
                    category: type,
                    address: address,
                    website: website,
                    interest: JSON.stringify(interest)
                }
                if (row.activity !== updatedPlanning.activity || row.category !== updatedPlanning.category ||
                    row.address !== updatedPlanning.address || row.website!== updatedPlanning.website || 
                    row.interest !== updatedPlanning.interest 
                )  putPlanningRow(row.id,updatedPlanning,row.id);
            }else{
                const updatedScheduling = {
                    activity: activity,
                    category: type,
                    address: address,
                    website: website,
                    time: time
                }
                if(row.activity !== updatedScheduling.activity || row.category !== updatedScheduling.category ||
                    row.address !== updatedScheduling.address || row.website!== updatedScheduling.website ||
                    row.time!== updatedScheduling.time 
                ) putSchedulingRow(row.id,updatedScheduling,row.id);
            }
    },[time, activity, type, website, address, interest])

    return (
        <>
            {/* planning row */}
            {rowType === 'planning' && <div id={row.id}className='row-container'>
                <TextareaAutosize onChange={handleInput} value={activity} className='first' id={`activity${row.id}`}> </TextareaAutosize>
                <TextareaAutosize onChange={handleInput} value={type} id={`type${row.id}`}></TextareaAutosize>
                <TextareaAutosize onChange={handleInput} value={address} id={`address${row.id}`}></TextareaAutosize>
                <TextareaAutosize onChange={handleInput} value={website} id={`website${row.id}`}></TextareaAutosize>
                <div className='interest-container'>
                    <div className='interest'>{interest.length}</div>
                    <div className={interest.indexOf(userID) === -1 ?'interest-button':'interest-button-subtract'} onClick={()=> toggleInterest(interest)} id='interest'></div>
                </div>
                <div className='schedule-container'>
                    <div className='schedule' onClick={()=> {selectPlanningRow(row); toggleForm('schedule')}}></div>
                </div>
            </div>}
            {/* scheduling row */}
            {rowType === 'scheduling' && <div id={row.id}className='row-container'>
                <div className='time-container'>
                    <input type='time' onChange={handleInput} className='time' defaultValue={row.time} id={`time${row.id}`}/>
                </div>
                <TextareaAutosize onChange={handleInput} value={activity} id={`activity${row.id}`}> </TextareaAutosize>
                <TextareaAutosize onChange={handleInput} value={type} id={`type${row.id}`}></TextareaAutosize>
                <TextareaAutosize onChange={handleInput} value={address} id={`address${row.id}`}></TextareaAutosize>
                <TextareaAutosize onChange={handleInput} value={website} id={`website${row.id}`}></TextareaAutosize>
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

  