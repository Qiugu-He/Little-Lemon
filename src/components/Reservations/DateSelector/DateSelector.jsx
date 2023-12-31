import './DateSelector.css'
import React, {useState, useRef} from 'react';

const ocassions = [
    {
        label: 'Birthday',
        value: 'birthday'
    },
    {
        label: 'Anniversary',
        value: 'anniversary'
    }
]

const DateSelector = (props) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toDateString());

    const dateRef = useRef(null);

    // split time and date into arrays based on delimiter
    const timeStr = time.toString().split(' ');
    const dateStr = date.toString().split(' ');

    let cafeStatus = 'Closed';

    // update time and date every 1000 milliseconds
    setInterval(() => {
        setTime(new Date().toLocaleTimeString());
        setDate(new Date().toDateString());
    }, 1000);

    /*
        Get the date in 24Hr format
        Then split it on space delimite
        Then split time at 0 index on colon (:) delimiter
        Then get the hour at 0 index
        Then convert it to an integer
        Then check if it is between 9 and 21
        If it is, then we are open
        Else we are closed
    */
    const hour = new Date().toTimeString().split(' ')[0].split(':');
    
    const startingTime = 8; // 8 AM
    const closoingTime = 21; // 9 PM

    if (parseInt(hour[0]) > startingTime && parseInt(hour[0]) < closoingTime) {
        // console.log('WE are Open!');
        cafeStatus = 'We are open, reserve now!';
    } else {
        // console.log('WE are closed!');
        cafeStatus = 'We are closed';
    }

    // get date value from input using useRef hook
    const handleClickedDate = () => {
        props.chooseDate(dateRef.current.value);
        // console.log(dateRef.current.value);
    }

    // get ocassion value from select option 
    const handleOcassionChange = (e) => {
        props.chooseOcassion(e.target.value);
        // console.log(e.target.value);
    }
    return (
        <div className="reservation__date-selector">
        <div className='open-closed'>
                <h3 className={`title ${cafeStatus} status`}>{cafeStatus}</h3>
        </div>
        <div className='reservation__date-selector-date-time'>
            <div className='date-time'>
                {   dateStr[2]  + " " + dateStr[1] + " " + dateStr[3] + ", " + timeStr[0] + " " + timeStr[1] }
            </div>
        </div>
        {/* add date selector and ocassion selector */}
        {/* get date and ocassion values and pass to parent component */}
        <div className="choose-date">
            <h2>Select your date</h2>
            <div className="choose-date-2">
                <input 
                    ref={dateRef} 
                    onChange={handleClickedDate}
                    type="date" 
                    className='date-selector' />
                    {/* provide defalut value: theOcassion */}
                    {/* ocassion value is comming from parent and then onchange, send data to parent */}
                <select className='ocassion-selector' value={props.ocassion}  onChange={handleOcassionChange}>
                {
                    ocassions.map((ocassion) => {
                    return (
                        <option value={ocassion.value}>
                            {ocassion.label}
                        </option>
                    );
                    })
                }
                </select>
            </div>
        </div>
        </div>
    );
};

export default DateSelector;