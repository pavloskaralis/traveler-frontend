import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import setFilter from '../../actions/setFilter.js'
import toggleTable from '../../actions/toggleTable.js'
import './Search.css'

const mapStateToProps = state => {
  return {
    table: state.table,
    tables: state.itinerary.dates,
    itinerary: state.itinerary
  }
}

const mapDispatchToProps = {
  setFilter,
  toggleTable
}
// component has conditional css based on current table or show page
function Search({setFilter, page, tables, toggleTable, itinerary, table}) {

  //conditional form submit 
  const submit = e => {
    e.preventDefault();
    
    switch(page) {
      case 'index': setFilter(query.value);
        break;
      case 'show': toggleTable(query.value);
        break;
    }
   
  }

  //required to update query value once submit is used; passed to left and right onClick
  const update = (nextTable) => document.querySelector('select').value = nextTable;

  //conditional table arrow button values
  let left;
  let right;
  if(tables){
    const currentIndex = tables.indexOf(table);
    left = currentIndex !== 0 ? tables[currentIndex - 1] : tables[tables.length - 1];
    right = currentIndex !== tables.length - 1 ? tables[currentIndex + 1] : tables[0];
  }

  //input reference
  let query;

  return (
      <form className={page === 'index' ? 'search-container-index' : 'search-container-show'} onSubmit={ submit }>
        {page === 'show' && <div className='search-submit' id='left' onClick={ ()=> {toggleTable(left); update(left)}}></div>}
        {page === 'index' && <input type='text' ref={node => query = node}/>}
        {page === 'show' && itinerary &&       
          <select className='tools-select' onChange={()=>{toggleTable(query.value); update(query.value)}} ref={node => query = node} autoFocus >
              {itinerary.dates.map(date => {
                  return (
                      <option key={date} value={date}>{date}</option>
                  )
              })}
          </select>
        }
        {page === 'show' && <div className='search-submit' id='right' onClick={ ()=> {toggleTable(right); update(right)}}></div>}
        {page === 'index' && <div className='search-submit' onClick={e => {e.preventDefault(); setFilter(query.value)}}></div>}
      </form> 
  )
}

Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default Search

  