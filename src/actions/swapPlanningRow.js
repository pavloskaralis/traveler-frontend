export default function swapPlanningRow(planning_row, index) {
    return { type: 'SWAP_PLANNING', planning_row, index }
}