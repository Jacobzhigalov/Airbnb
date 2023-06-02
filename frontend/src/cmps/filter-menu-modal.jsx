import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import { DateRangePicker } from 'react-date-range'

import "react-datepicker/dist/react-datepicker.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function FilterMenu({ filterByToEdit, handleChange, handleGuestsChange, selectedMenu, handleDateChange }) {
    // const [isCheckIn, setIsCheckIn] = useState(true)

    useEffect(() => {
        // console.log('filterByToEdit', filterByToEdit)
    }, [filterByToEdit])
    
    const selectionRange = {
        startDate: filterByToEdit.checkIn,
        endDate: filterByToEdit.checkOut,
        key: 'selection',
    }

    function handleSelect(ranges) {
        const { startDate, endDate } = ranges.selection
        handleDateChange(startDate , endDate )
        // console.log('date, is checkin', date, isCheckIn)
    }


    return (
        <React.Fragment>
            {(selectedMenu === 'where') && (
                <React.Fragment>
                    <label htmlFor="where" >
                        Where
                    </label>
                    <input
                        type="text"
                        id="where"
                        name="where"
                        placeholder="Search..."
                        value={filterByToEdit.where}
                        onChange={handleChange}
                    />
                </React.Fragment>
            )}
            {(selectedMenu === 'checkIn' || selectedMenu === 'checkOut' || selectedMenu === 'when') && (
                <section className="date-pickers-container">

                    <DateRangePicker
                        className="date-range-picker"
                        startDatePlaceholder="Check In"
                        endDatePlaceholder="Check Out"
                        onChange={handleSelect}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        retainEndDateOnFirstSelection={false}
                        months={2}
                        ranges={[selectionRange]}
                        direction="horizontal"
                        minDate={new Date()}
                        rangeColors={['#f5f5f5']}
                        staticRanges={[]}
                        inputRanges={[]}
                        editableDateInputs={true}
                    />
                    {/* <label htmlFor="checkIn" >
                        Check In
                    </label>
                    <DatePicker id="checkIn" placeholder="Check In" open={true} selected={filterByToEdit.checkIn} onSelect={(date) => handleSelect(date, true)} />

                    <label htmlFor="checkOut" >
                        Check Out
                    </label>
                    <DatePicker id="checkOut" open={true} selected={filterByToEdit.checkOut} onSelect={(date) => handleSelect(date, false)} /> */}
                </section>
            )}

            {(selectedMenu === 'guests') && (
                <div id="guests" name="guests">
                    <label htmlFor="adults" >
                        Adults
                    </label>
                    <input
                        type="number"
                        id="adults"
                        name="adults"
                        placeholder="Adults"
                        min={0}
                        value={filterByToEdit.guests.adults}
                        onChange={handleGuestsChange}
                    />
                    <label htmlFor="children">Children</label>
                    <input
                        type="number"
                        id="children"
                        name="children"
                        placeholder="Children"
                        min={0}
                        value={filterByToEdit.guests.children}
                        onChange={handleGuestsChange}
                    />
                    <label htmlFor="infants">Infants</label>
                    <input
                        type="number"
                        id="infants"
                        name="infants"
                        min={0}
                        placeholder="Infants"
                        value={filterByToEdit.guests.infants}
                        onChange={handleGuestsChange}
                    />
                    <label htmlFor="pets">Pets</label>
                    <input
                        type="number"
                        id="pets"
                        name="pets"
                        min={0}
                        placeholder="Pets"
                        value={filterByToEdit.guests.pets}
                        onChange={handleGuestsChange}
                    />
                </div>
            )}
        </React.Fragment>

    )
}



{/* <input
              type="date"
              id="checkOut"
              name="checkOut"
              placeholder="Check Out"
              value={filterByToEdit.checkOut}
              onChange={handleChange}
            /> */}


            // {(selectedMenu === 'checkOut' || selectedMenu === 'when') && (
            //     <React.Fragment>
            //       <label htmlFor="checkOut" >
            //         Check Out
            //       </label>
            //       <DatePicker  id="checkOut"  selected={filterByToEdit.checkOut}  onSelect={(date)=>handleSelect(date,false)} />
            //     </React.Fragment>
            //   )}