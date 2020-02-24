import axios from 'axios'
import toggleError from './toggleError.js'
import toggleForm from './toggleForm.js'
import swapItinerary from './swapItinerary.js'
import selectItinerary from './selectItinerary.js';

export default function putItinerary(location,departureDate,returnDate, itineraryID, index, shared) {
    return dispatch => {
        //check date format is valid
        const regex = /(20)[2-9]\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/i;
        if(!departureDate.match(regex) || !returnDate.match(regex)){
            return dispatch(toggleError('Invalid Date Format'));
        } 
        //find today's date
        const date = new Date();
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        const today = [parseFloat(yyyy), parseFloat(mm), parseFloat(dd)]
        //breakdown depart and return dates 
        const splitDepartureDate = departureDate.split('-');
        const splitReturnDate = returnDate.split('-');
        const parsedDepartureDate = splitDepartureDate.map(num => parseFloat(num));
        const parsedReturnDate = splitReturnDate.map(num => parseFloat(num));
        //check departure date occurs before return date, and on or after current date 
        // [0] = YY; [1] = MM; [2] = DD;
        if(parsedDepartureDate[0] > parsedReturnDate[0] || parsedDepartureDate[0] < today[0]) { 
            // console.log(1)
            return dispatch(toggleError('Invalid Dates'));
        //checks months
        } else if(parsedDepartureDate[1] > parsedReturnDate[1] || (parsedDepartureDate[0] === today[0] && parsedDepartureDate[1] < today[1])) {
            // console.log(2)
            return dispatch(toggleError('Invalid Dates'));
        //checks days
        } else if (parsedDepartureDate[2] > parsedReturnDate[2] || (parsedDepartureDate[0] === today[0] && parsedDepartureDate[1] === today[1] && parsedDepartureDate[2] < today[2])) {
            // console.log(3)
            return dispatch(toggleError('Invalid Dates'));
        }
        //make sure range won't break site; 
        // [0] = YY; [1] = YY; [2] = DD;
        if((parsedDepartureDate[0] < parsedReturnDate[0]) && ((parsedDepartureDate[0] + 1) < parsedReturnDate[0])) {
            return dispatch(toggleError('60 Day Limit'));
        } else if ((parsedDepartureDate[0] === parsedReturnDate[0]) && ((parsedDepartureDate[1] + 4) < parsedReturnDate[1])) {
            return dispatch(toggleError('60 Day Limit'));
        }
        //create array of dates
        const dates = [];
        const endDate = new Date(returnDate); 
        let nextDate = new Date(departureDate);
        while (nextDate <= endDate) {
            const dd = nextDate.getDate() + 1;
            const mm = nextDate.getMonth() + 1;
            const yyyy = nextDate.getFullYear();
            let day = [mm, dd, yyyy];
            if(day[0] < 10) day[0] = '0'+ day[0];
            if(day[1] < 10) day[1] = '0'+ day[1];
            day[2] = day[2].toString().split('').slice(2).join('');
            dates.push(day[0] + '.' + day[1] + '.' + day[2]);
            nextDate.setDate(nextDate.getDate() + 1);
        }
        //error in Date class does not skip 2/30
        if(dates.find(date => date.slice(0,5) === ('02.30'))) {
            let errorIndex = dates.indexOf(dates.find(date => date.slice(0,5) === ('02.30')));
            dates[errorIndex] = '03.01' + dates[errorIndex].slice(5);
        }
        //easier 60 day limit check
        if(dates.length > 60) return dispatch(toggleError('60 Day Limit'));
        //post request
        const updatedItinerary = {
            location: location,
            dates:  JSON.stringify(dates)
        }
        const postRequest = async () => {
            const result = await axios.put(`http://localhost:3001/itineraries/${itineraryID}`, updatedItinerary);
            const {data} = result;
            if (!data.error) {
                dispatch(toggleError(''));
                dispatch(toggleForm(''));
                dispatch(selectItinerary(''));
                const newDates = JSON.parse(updatedItinerary.dates)
                console.log(data.shared)
                dispatch(swapItinerary({...updatedItinerary, dates: newDates, id: itineraryID, shared: shared}, index))
            } else {
                dispatch(toggleError('Failed To Update'));
            }
        }
        postRequest();
    }
}


