import React from 'react'
import styled from 'styled-components'
import Search from './Search.js'
import Button from './Button.js'
import newIcon from '../images/new.png'
import shareIcon from '../images/share.png'
import removeIcon from '../images/remove.png'
import returnIcon from '../images/return.png'

const Wrapper = styled.div`
    width: 100%;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.theme.blue}; 
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.5);
    z-index: 2;
`;

const ButtonContainer = styled.div`
    margin: 0 auto;
    width:100%;
    min-width: 500px;
    max-width: ${props => props.page === 'index' ? '992px' : '1200px'};
    display: flex; 
    justify-content: space-evenly;
    box-sizing: border-box;
    padding: ${props => props.page === 'show' ? '0 16px' : '0'};
`;

const ButtonGroup = styled.div`
    display: flex;
    width: 180px;
    justify-content: space-between;
    box-sizing: border-box;
`;
//tools conditionally render based on index or show page
let Tools = ({page}) => {

    return (
        <Wrapper>
            <ButtonContainer page={page}>
                {page === 'index' ? 
                    <> 
                        <Search page={'index'}/>
                        <Button type='new' size='22px' image={newIcon}/>
                    </> : 
                    <> 
                        <Button type='return' size='30px' image={returnIcon}/>
                        <Search page={'show'}/>
                        <ButtonGroup>
                            <Button type='share' size='35px' image={shareIcon} margin/>
                            <Button type='remove' size='22px' image={removeIcon}/>
                        </ButtonGroup>
                    </>
                }
            </ButtonContainer>
        </Wrapper>
    )
}

export default Tools

  