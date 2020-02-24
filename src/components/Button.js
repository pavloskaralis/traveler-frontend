import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import history from '../history.js'
import toggleForm from '../actions/toggleForm.js';
import selectItinerary from '../actions/selectItinerary.js';


const ButtonStyle = styled.div`
    min-width: 80px;
    height: 40px;
    border-radius: 8px;
    background-color: ${props => props.theme.black};
    color: ${props => props.theme.orange};
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    background-image: ${props => `url(${props.image})`};
    background-size: ${props => props.size};
    margin-right: ${props => props.margin ? '8px' : '0'};
    &:hover {
        background-color: ${props => props.theme.blackHover};
    }
`;


const mapDispatchToProps = {
    toggleForm,
    selectItinerary
}


let Button = ({type, toggleForm, selectItinerary, image, size, margin}) => {
     // all buttons except back toggle form
    const onClick = type === 'return' ? ()=> {history.push('/');selectItinerary('')} : ()=> toggleForm(type);
    return (
        <ButtonStyle onClick={ onClick } image={image} size={size} margin={margin}></ButtonStyle>
    )
}

Button = connect(
    null,
    mapDispatchToProps
)(Button)

export default Button

  