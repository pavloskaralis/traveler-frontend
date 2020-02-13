import axios from 'axios'
import swapPlanningRow from './swapPlanningRow.js'

export default function putPlanningRow(rowID, updatedPlanningRow, index) {

    return dispatch => {

        const putRequest = async () => {
            const result = await axios.put(`http://localhost:3001/planning_rows/${rowID}`, updatedPlanningRow); 
            const {data} = result;  
            if(!data.error){
                dispatch(swapPlanningRow(data, index))
            } else {               
                console.log('Failed To Update')
            }  
        }

        putRequest();
    }
}




