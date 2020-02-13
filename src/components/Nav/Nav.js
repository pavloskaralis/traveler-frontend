import React from 'react'
import { connect } from 'react-redux'
import toggleDropdown from '../../actions/toggleDropdown.js'
import Dropdown from '../Dropdown/Dropdown.js'
import './Nav.css'


const mapStateToProps = state => {
    return {
        dropdown: state.dropdown,
        location: state.itinerary.location
    }
}

const mapDispatchToProps = {
    toggleDropdown
}

function Nav({dropdown, toggleDropdown, location}) {

    const url = window.location.href;
    const regex = new RegExp(/\/\d+\/\d+/);
    //detect current page by url
    const showPage = regex.test(url) ? true : false;
    //title conditional based on current page and page loading state 
    let title;
    if(!location && showPage) {
        title = 'Loading...';
    } else if (location && showPage) {
        title = location.slice(0, 1).toUpperCase() + location.slice(1);
    } else {
        title = 'Traveler'
    }

    return (
        <nav>
            {/* nav title changes to location on edit form and show page */}
            <h2>{title}</h2>
            <div className="dropdown-icon-container" onClick={() => toggleDropdown(!dropdown)}>
                {/* hamburder dropdown; thanks Madeline! */}
                <span> </span>
                <span> </span>
                <span> </span>
            </div>
            {dropdown && <Dropdown/>}
        </nav>
    )
}

Nav = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav)

export default Nav

  