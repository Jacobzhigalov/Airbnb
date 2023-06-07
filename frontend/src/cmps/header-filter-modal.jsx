import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { DateRangePicker } from 'react-date-range'

import "react-datepicker/dist/react-datepicker.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function HeaderFilterModal({ filterByToEdit, handleGuestsChange, selectedMenu, setSelectedMenu ,handleDateChange }) {

    useEffect(() => {
        console.log('filterByToEdit', filterByToEdit)
    }, [filterByToEdit])

    const selectionRange = {
        startDate: filterByToEdit.checkIn,
        endDate: filterByToEdit.checkOut,
        key: 'selection',
    }

    function handleSelect(ranges) {
        const { startDate, endDate } = ranges.selection
        if (startDate) setSelectedMenu('checkOut')
        if (startDate && endDate) {
            const isEndDateAfterStartDate = endDate > startDate;

            if (isEndDateAfterStartDate) {
                setSelectedMenu('guests')
                handleDateChange(startDate, endDate)
            }
            else {
                setSelectedMenu('checkOut')
                handleDateChange(endDate, '')
            }
        }
    }

    function onGuestsChange(ev, diff) {
        const target = ev.target
        const name = target.getAttribute("name")
        const value = +filterByToEdit.guests[name] + diff
        if (value < 0) return
        console.log('target', target, 'name', name, 'value', value)
        handleGuestsChange({ target: { name: name, value: value } })
    }

    return (
        <section className="header-filter-modal" onClick={ev => ev.stopPropagation()}>
            {(selectedMenu === 'where') && (
                <section className="where">
                    <section className="places"></section>
                        
                    <section className="some-mini-maps">
                    <div className="mini-map flexible">
                            <span>Flexible</span>
                            <img src={require('../assets/img/webp/flexible.jpeg')} alt="flexible pic" ></img>
                        </div>
                        <div className="mini-map Italy">
                            <span>Italy</span>
                            <img src={require('../assets/img/webp/Italy.webp')} alt="Italy pic" ></img>
                        </div>
                        
                        <div className="mini-map France">
                            <span>France</span>
                            <img src={require('../assets/img/webp/France.webp')} alt="France pic" ></img>
                        </div>
                        <div className="mini-map Greece">
                            <span>Greece</span>
                            <img src={require('../assets/img/webp/Greece.webp')} alt="Greece pic" ></img>
                        </div>
                        <div className="mini-map Middle East">
                            <span>Middle East</span>
                            <img src={require('../assets/img/webp/Middle East.webp')} alt="Middle East pic" ></img>
                        </div>
                        <div className="mini-map South America">
                            <span>South America</span>
                            <img src={require('../assets/img/webp/South America.webp')} alt="South America pic" ></img>
                        </div>
                    </section>
                </section>
            )}
            {(selectedMenu === 'checkIn' || selectedMenu === 'checkOut' || selectedMenu === 'when') && (
                <React.Fragment>
                    <DateRangePicker
                        className="date-range-picker"
                        startDatePlaceholder="Check In"
                        endDatePlaceholder="Check Out"
                        onChange={handleSelect}
                        showSelectionPreview={false}
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

                </React.Fragment>
            )}

            {(selectedMenu === 'guests') && (
                <section id="guests" name="guests" className="guests">
                    <section className="adults-container">
                        <label htmlFor="adults" >
                            Adults
                        </label>
                        <section className="adults-count-container">
                            <span className="plus-adult" name="adults" onClick={(ev) => onGuestsChange(ev, 1)}>+</span>
                            {/* () => handleGuestsChange({ target: { name: 'adults', value: filterByToEdit.guests.adults + 1 } }) */}
                            <span className="adults">{+filterByToEdit.guests.adults}</span>
                            <span className="minus-adult" name="adults" onClick={(ev) => onGuestsChange(ev, -1)}>-</span>
                        </section>
                    </section>

                    <section className="children-container">
                        <label htmlFor="children">Children</label>
                        <section className="children-count-container">
                            <span className="plus-children" name="children" onClick={(ev) => onGuestsChange(ev, 1)}>+</span>
                            <span className="children">{+filterByToEdit.guests.children}</span>
                            <span className="minus-children" name="children" onClick={(ev) => onGuestsChange(ev, -1)}>-</span>
                        </section>
                    </section>

                    <section className="infants-container">
                        <label htmlFor="infants">Infants</label>
                        <section className="infants-count-container">
                            <span className="plus-infants" name="infants" onClick={(ev) => onGuestsChange(ev, 1)}>+</span>
                            <span className="infants">{+filterByToEdit.guests.infants}</span>
                            <span className="minus-infants" name="infants" onClick={(ev) => onGuestsChange(ev, -1)}>-</span>
                        </section>
                    </section>

                    <section className="pets-container">
                        <label htmlFor="pets">Pets</label>
                        <section className="pets-count-container">
                            <span className="plus-pets" name="pets" onClick={(ev) => onGuestsChange(ev, 1)}>+</span>
                            <span className="pets">{+filterByToEdit.guests.pets}</span>
                            <span className="minus-pets" name="pets" onClick={(ev) => onGuestsChange(ev, -1)}>-</span>
                        </section>
                    </section>
                </section>
            )}
        </section>
    )
}