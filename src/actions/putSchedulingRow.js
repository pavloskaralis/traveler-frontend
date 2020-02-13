import axios from 'axios'
import swapSchedulingRow from './swapSchedulingRow.js'

export default function putSchedulingRow(rowID, updatedSchedulingRow, index) {

    return dispatch => {

        const putRequest = async () => {
            const result = await axios.put(`http://localhost:3001/scheduling_rows/${rowID}`, updatedSchedulingRow); 
            const {data} = result;  
            if(!data.error){
                dispatch(swapSchedulingRow(data, index))
            } else {               
                console.log('Failed To Update')
            }  
        }

        putRequest();
    }
}




