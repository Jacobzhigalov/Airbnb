import React, { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'
import HeaderFilterModal from "./header-filter-modal"
import { utilService } from "../services/util.service"
import { on } from "events"
import { setIsFilterShown } from "../store/header.actions"
import { is } from "immutable"


export function HeaderFilter({ onSetFilter, filterBy, headerScales, onSetHeaderScales }) {
    const { isFilterShown } = useSelector(state => state.headerModule)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [selectedMenu, setSelectedMenu] = useState('where')
    const guestsCount = utilService.countNumericObjectProperties(filterByToEdit.guests)
    // const elInputRef = useRef(null)

    useEffect(() => {
        console.log('filterBy', filterBy)
        setFilterByToEdit({ ...filterBy })
        if (isFilterShown){
            onSetHeaderScales({ ...headerScales, height: 'high' })
        } else {
            onSetHeaderScales({ ...headerScales, height: 'low' })
        }
    }, [isFilterShown, filterBy])

    function handleMenuChange(menuSelection, ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!isFilterShown)   setIsFilterShown(true)
        setSelectedMenu(menuSelection)
    }

    function handleIsFilterShown(isShown){
        setIsFilterShown(isShown)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleDateChange(checkIn = null, checkOut = null) {
        // const field = (isCheckIn) ? 'checkIn' : 'checkOut'
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, checkIn, checkOut }))
    }


    function handleGuestsChange({ target }) {
        let { value, name: field } = target
        value = +value || 0
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, guests: { ...prevFilter.guests, [field]: value } }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        const filter = filterByToEdit
        onSetFilter(filter)
        setIsFilterShown(false)
        console.log('filterByToEdit, filterBy', filterByToEdit, filterBy)
    }

    function onClearField(field, ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (typeof filterByToEdit[field] === 'object' && !(filterByToEdit[field] instanceof Date)) {
            setFilterByToEdit((prevFilter) => {
                const updatedField = { ...prevFilter[field] }
                for (const key in updatedField) {
                    updatedField[key] = ''
                }
                return { ...prevFilter, [field]: updatedField }
            })
        } else {
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: null }))
        }
    }

    

    // const searchIconName = 'search'
    return <section className="header-filter">
       <section className="filter-selection-btns">
            <button className="btn-where" onClick={(ev) => handleMenuChange('where', ev)}>Any where</button>
            <button className="btn-when" onClick={(ev) => handleMenuChange('when', ev)}>Any week</button>
            <button className="btn-guests" onClick={(ev) => handleMenuChange('guests', ev)}>Add guests</button>
            <button className="btn-search" onClick={(ev) => onSubmitFilter(ev)}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                </svg>
                {/* <img src={require(`../assets/img/svg/${searchIconName}.svg`)} alt="search" /> */}
            </button>
        </section>
        <section className="filter-menu">
            <form onSubmit={(ev) => onSubmitFilter(ev)} >
                <section className="filter-menu-selection-btns">
                    <div className="btn-where" onClick={(ev) => handleMenuChange('where', ev)}>
                        <span>Where</span>
                        <input
                            type="text"
                            id="where"
                            name="where"
                            placeholder="Search..."
                            value={filterByToEdit.where || ''}
                            onChange={handleChange}
                        />
                        <button className="btn-clear" onClick={(ev) => onClearField('where', ev)}>X</button>
                    </div>
                    <div className="btn-check-in" onClick={(ev) => handleMenuChange('checkIn', ev)}>
                        <span>Check in</span>
                        <input type="text" id="checkIn" placeholder="Add dates" value={filterByToEdit.checkIn || ''} readOnly />
                        <button className="btn-clear" onClick={(ev) => onClearField('checkIn', ev)}>X</button>
                    </div>
                    <div className="btn-check-out" onClick={(ev) => handleMenuChange('checkOut', ev)}>
                        <span>Check out</span>
                        <input type="text" id="checkOut" placeholder="Add dates" value={filterByToEdit.checkOut || ''} readOnly />
                        <button className="btn-clear" onClick={(ev) => onClearField('checkOut', ev)}>X</button>
                    </div>
                    <div className="btn-guests" onClick={(ev) => handleMenuChange('guests', ev)}>
                        <span>Who</span>
                        <input type="text" id="guests" placeholder="Add guests" value={guestsCount ? `${guestsCount} guests` : ''} readOnly />
                        <button className="btn-clear" onClick={(ev) => onClearField('guests', ev)}>X</button>
                    </div>
                    <button className="btn-search" onClick={(ev) => onSubmitFilter(ev)}>
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
                            <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                        </svg>
                        <span>Search</span>

                    </button>
                </section>
                <HeaderFilterModal
                    filterByToEdit={filterByToEdit}
                    handleMenuChange={handleMenuChange}
                    handleDateChange={handleDateChange}
                    handleChange={handleChange}
                    handleGuestsChange={handleGuestsChange}
                    selectedMenu={selectedMenu}
                />
            </form>
        </section>
    </section>

}


{/* <h2>Stays Filter</h2>
        <form onSubmit={onSubmitFilter}>
        <label htmlFor="txt">Search by name</label>
            <input type="text"
                id="txt"
                name="txt"
                placeholder="Search..."
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />

            <button>Search</button>
        </form> */}
