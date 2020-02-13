export default function swapSchedulingRow(scheduling_row, index) {
    return { type: 'SWAP_SCHEDULING', scheduling_row, index }
}