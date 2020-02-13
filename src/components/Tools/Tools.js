import React from 'react'
import history from '../../history'
import axios from 'axios'
import Search from '../Search/Search.js'
import Button from '../Button/Button.js'
import './Tools.css'

//tools conditionally render based on index or show page
function Tools({page}) {

    return (
        <div className='tools-container'>
            <div className={page === 'index' ? 'buttons-container-index' : 'buttons-container-show'}>
                {page === 'index' ? 
                    <> 
                        <Search page={'index'}/>
                        <Button type='new'/>
                    </> : 
                    <> 
                        <Button type='return'/>
                        <Search page={'show'}/>
                        <div className='button-group'>
                            <Button type='share'/>
                            <Button type='remove'/>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Tools

  