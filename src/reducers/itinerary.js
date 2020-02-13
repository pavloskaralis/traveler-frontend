export default function itinerary(state = '', action) {
    switch (action.type) {
        case 'SELECT_ITINERARY':
            return action.itinerary
        case 'ADD_PLANNING':
            return {...state, planning_rows: [...state.planning_rows,action.planning_row]}
        case 'ADD_SCHEDULING':
            return {...state, scheduling_rows: [...state.scheduling_rows,action.scheduling_row]}
        case 'SWAP_PLANNING':
            return {...state, planning_rows: [...state.planning_rows.slice(0, action.index), action.planning_row, ...state.planning_rows.slice(action.index + 1)]}
        case 'SWAP_SCHEDULING':
                return {...state, scheduling_rows: [...state.scheduling_rows.slice(0, action.index), action.scheduling_row, ...state.scheduling_rows.slice(action.index + 1)]}
        case 'REMOVE_SCHEDULING':
                return {...state, scheduling_rows: state.scheduling_rows.filter(scheduling_row => scheduling_row.id !== action.id)}
        default:
            return state
    }
}