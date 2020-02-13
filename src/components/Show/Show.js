import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import './Show.css'
import getItinerary from '../../actions/getItinerary.js'
import postPlanningRow from '../../actions/postPlanningRow.js'
import postSchedulingRow from '../../actions/postSchedulingRow.js'
import toggleDropdown from '../../actions/toggleDropdown.js'
import Tools from '../Tools/Tools.js'
import Row from '../Row/Row.js'
import Form from '../Form/Form.js'


const mapStateToProps = state => {
    return {
      dropdown: state.dropdown,
      form: state.form,
      userID: state.userID,
      itinerary: state.itinerary,
      table: state.table
    }
}

const mapDispatchToProps = {
    getItinerary,
    postPlanningRow,
    postSchedulingRow,
    toggleDropdown
}

function Show({dropdown, toggleDropdown, form, getItinerary, postPlanningRow, postSchedulingRow, userID, itinerary, table}) {
    //pass userID to ensure user is associated with itineraryID in url param
    useEffect(()=> {
        getItinerary(userID);
    },[])
    // auto scroll to bottom on row creation; passed to add-row onClick
    const autoScroll = () => setTimeout(()=>document.querySelector('.body').scrollTop = document.querySelector('.body').scrollHeight, 100);
    return (
        // dropdown off focus click
        <div className='show-container' onClick={()=> {if(dropdown)toggleDropdown(false)}}>
            {form && <Form page='show'/>}
            <Tools page='show'/>
                <div className='table'>
                <div className='head'>
                    <div className='th' id='orange'>{table === 'Planning' ? 'Activity' : 'Time'}</div>
                    <div className='th'>{table === 'Planning' ? 'Type' : 'Activity'}</div>
                    <div className='th'>{table === 'Planning' ? 'Address' : 'Type'}</div>
                    <div className='th'>{table === 'Planning' ? 'Website' : 'Address'}</div>
                    <div className='th'>{table === 'Planning' ? 'Interest' : 'Website'}</div>
                    <div className='th'>{table === 'Planning' ? 'Schedule' : 'Remove'}</div>
                </div>
                <div className='body'>
                    {/* render planning rows */}
                    {itinerary.planning_rows && table === 'Planning' && itinerary.planning_rows.sort((a,b) => a.id - b.id).map((planningRow,index) => {
                        return (
                            <Row rowType='planning' row={planningRow}  rowIndex={index} key={planningRow.id}/>
                        )
                    })}

                    {/* empty schedulowing table messsage */}
                    { itinerary && table !== 'Planning' && itinerary.scheduling_rows.filter(row => row.date === table).length === 0 &&
                        <div className='empty-container'>
                            <div className='show-empty'>You Have Nothing Scheduled On This Date</div>
                        </div>
                    }
                    
                    {/* render scheduling rows */}
                    {itinerary.scheduling_rows && (table !== 'Planning') && itinerary.scheduling_rows.sort((a,b)=> (parseFloat(a.time.replace(':','')) || 2500)  - (parseFloat(b.time.replace(':','')) || 2500)).map((schedulingRow, index) => {
                        return (
                            // only render matching dates
                            (table === schedulingRow.date) && <Row rowType='scheduling' row={schedulingRow}  rowIndex={index} key={schedulingRow.id}/>
                        )
                    })}
                </div>
                {/* create scheduling or planning row based on table */}
                <div className='add-row' onClick={table !== 'Planning' ? ()=> postSchedulingRow(itinerary.id, table) : ()=> {postPlanningRow(itinerary.id); autoScroll();}}></div>
            </div>
        </div>
    )
}

Show = connect(
    mapStateToProps,
    mapDispatchToProps
)(Show)

export default Show

  