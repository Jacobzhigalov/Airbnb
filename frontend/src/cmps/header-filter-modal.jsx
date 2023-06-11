import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import { useSelector } from 'react-redux'

import "react-datepicker/dist/react-datepicker.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { loadPlaces } from "../store/stay.actions"
import { ar } from 'date-fns/locale'

export default function HeaderFilterModal({ filterByToEdit, handleGuestsChange, selectedMenu, setSelectedMenu, handleDateChange, handleChange, places, handleMenuChange }) {

    // const { places } = useSelector(state => state.stayModule)
    // console.log(places)

    useEffect(() => {
        // console.log('filterByToEdit', filterByToEdit)
        // console.log('modal places', places)
    }, [filterByToEdit])

    // handleChange({ target: { name: 'where', value: '', type: 'text' }})
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
                // setSelectedMenu('guests')
            }
        }
    }

    let areInfantsOrPetsAlone = ((filterByToEdit.guests.infants || filterByToEdit.guests.pets) && filterByToEdit.guests.adults <= 1)
    // console.log(areInfantsOrPetsAlone)

    function onGuestsChange(ev, diff) {
        const target = ev.target
        const name = target.getAttribute("name")
        const value = +filterByToEdit.guests[name] + diff
        if (value < 0) return
        if (areInfantsOrPetsAlone && name === 'adults' && value <= 0) return
        // console.log('target', target, 'name', name, 'value', value)
        handleGuestsChange({ target: { name: name, value: value } })
    }

    // console.log(places) 

    return (
        <section className="header-filter-modal" onClick={ev => ev.stopPropagation()}>
            {(selectedMenu === 'where') && (
                <section className="where">
                    <section className="places">
                        {places && places.map(place =>
                            <div className='places-grid' key={place}>
                                <img src={require('../assets/img/jpeg/location.png')} alt="" />
                                <div className="place" key={place} onClick={(ev) => {
                                    handleChange({ target: { name: 'where', value: place, type: 'text' } })
                                    handleMenuChange('checkIn', ev)
                                }}>{place}</div>
                            </div>).slice(0, 5)
                        }
                    </section>
                    <section className="some-mini-maps">
                        <div className="mini-maps-title">Search by region</div>
                        <div className="mini-maps-container">
                            <div className="mini-map flexible">
                                <span>Flexible</span>
                                <img src={require('../assets/img/webp/flexible.jpeg')} alt="flexible pic" onClick={() => handleChange({ target: { name: 'where', value: '', type: 'text' } })} ></img>
                            </div>
                            <div className="mini-map Italy">
                                <span>Italy</span>
                                <img src={require('../assets/img/webp/Italy.webp')} alt="Italy pic" onClick={() => handleChange({ target: { name: 'where', value: 'Italy', type: 'text' } })}></img>
                            </div>
                            <div className="mini-map France">
                                <span>France</span>
                                <img src={require('../assets/img/webp/France.webp')} alt="France pic" onClick={() => handleChange({ target: { name: 'where', value: 'France', type: 'text' } })} ></img>
                            </div>
                            <div className="mini-map Greece">
                                <span>United States</span>
                                <img src={require('../assets/img/webp/Greece.webp')} alt="United States pic" onClick={() => handleChange({ target: { name: 'where', value: 'United States', type: 'text' } })} ></img>
                            </div>
                            <div className="mini-map Middle East">
                                <span>Middle East</span>
                                <img src={require('../assets/img/webp/Middle East.webp')} alt="Middle East pic" onClick={() => handleChange({ target: { name: 'where', value: 'Middle East', type: 'text' } })} ></img>
                            </div>
                            <div className="mini-map South America">
                                <span>South America</span>
                                <img src={require('../assets/img/webp/South America.webp')} alt="South America pic" onClick={() => handleChange({ target: { name: 'where', value: 'South America', type: 'text' } })} ></img>
                            </div>
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
                        weekdayDisplayFormat={'EEEEEE'}
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
                            {/* () => handleGuestsChange({ target: { name: 'adults', value: filterByToEdit.guests.adults + 1 } }) */}
                            {/* {+filterByToEdit.guests.adults > 0 && */}
                            <span className={`minus-adult ${filterByToEdit.guests.adults === 0 ? 'inactive' : ''}`} name="adults" onClick={(ev) => onGuestsChange(ev, -1)}>-</span>

                            <span className="adults">{+filterByToEdit.guests.adults}</span>
                            <span className="plus-adult" name="adults" onClick={(ev) => onGuestsChange(ev, 1)}>+</span>
                        </section>
                    </section>

                    <section className="children-container">
                        <label htmlFor="children">Children</label>
                        <section className="children-count-container">
                           
                                <span className={`minus-children ${filterByToEdit.guests.children === 0 ? 'inactive' : ''}`} onClick={(ev) => onGuestsChange(ev, -1)}>-</span>
                            
                            <span className="children">{+filterByToEdit.guests.children}</span>
                            <span className="plus-children" name="children" onClick={(ev) => onGuestsChange(ev, 1)}>+</span>
                        </section>
                    </section>

                    <section className="infants-container">
                        <label htmlFor="infants">Infants</label>
                        <section className="infants-count-container">
                           
                                <span className={`minus-infants ${filterByToEdit.guests.infants === 0 ? 'inactive' : ''}`} name="infants" onClick={(ev) => onGuestsChange(ev, -1)}>-</span>
                            
                            <span className="infants">{+filterByToEdit.guests.infants}</span>
                            <span className="plus-infants" name="infants" onClick={(ev) => onGuestsChange(ev, 1)}>+</span>
                        </section>
                    </section>

                    <section className="pets-container">
                        <label htmlFor="pets">Pets</label>
                        <section className="pets-count-container">
                          
                                <span className={`minus-pets ${filterByToEdit.guests.pets === 0 ? 'inactive' : ''}`} name="pets" onClick={(ev) => onGuestsChange(ev, -1)}>-</span>
                            
                            <span className="pets">{+filterByToEdit.guests.pets}</span>
                            <span className="plus-pets" name="pets" onClick={(ev) => onGuestsChange(ev, 1)}>+</span>
                        </section>
                    </section>
                </section>
            )}
        </section>
    )
}