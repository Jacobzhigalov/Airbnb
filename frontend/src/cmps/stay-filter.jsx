import React, { useEffect, useRef, useState } from "react"
import FilterMenu from "./filter-menu-modal"
// import { type } from "os"


export function StayFilterHeader({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [isFilterShown, setIsFilterShown] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState('where')

    // const elInputRef = useRef(null)

    useEffect(() => {
        console.log('filterBy', filterBy)
        setFilterByToEdit({ ...filterBy })
    }, [isFilterShown, filterBy])

    function handleMenuChange(menuSelection, ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!isFilterShown) setIsFilterShown(true)
        setSelectedMenu(menuSelection)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleDateChange(checkIn = null , checkOut = null) {
        // const field = (isCheckIn) ? 'checkIn' : 'checkOut'
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, checkIn, checkOut }))
    }


    function handleGuestsChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
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


    return <section className="stay-filter-header full main-layout">
        {(!isFilterShown) && <section className="filter-selection-btns">
            <button className="btn-where" onClick={(ev) => handleMenuChange('where', ev)}>Any where</button>
            <button className="btn-when" onClick={(ev) => handleMenuChange('when', ev)}>Any week</button>
            <button className="btn-guests" onClick={(ev) => handleMenuChange('guests', ev)}>Guests</button>
            <button className="btn-search" onClick={(ev) => onSubmitFilter(ev)}>Search</button>
        </section>}
        {isFilterShown && (<section className="filter-menu">
            <form onSubmit={(ev) => onSubmitFilter(ev)} >
                <section className="filter-menu-selection-btns">
                    <div className="btn-where" onClick={(ev) => handleMenuChange('where', ev)}>
                        <span>Any where</span>
                        <button className="btn-clear" onClick={(ev) => onClearField('where', ev)}>X</button>
                    </div>
                    <div className="btn-chek-in" onClick={(ev) => handleMenuChange('checkIn', ev)}>
                        <span>Check in</span>
                        <button className="btn-clear" onClick={(ev) => onClearField('checkIn', ev)}>X</button>
                    </div>
                    <div className="btn-chek-out" onClick={(ev) => handleMenuChange('checkOut', ev)}>
                        <span>Check out</span>
                        <button className="btn-clear" onClick={(ev) => onClearField('checkOut', ev)}>X</button>
                    </div>
                    <div className="btn-guests" onClick={(ev) => handleMenuChange('guests', ev)}>
                        <span>Guests</span>
                        <button className="btn-clear" onClick={(ev) => onClearField('guests', ev)}>X</button>
                    </div>
                    <button className="btn-search" onClick={(ev) => onSubmitFilter(ev)}>Search</button>
                </section>
                <FilterMenu
                    filterByToEdit={filterByToEdit}
                    isFilterShown={isFilterShown}
                    handleMenuChange={handleMenuChange}
                    handleDateChange={handleDateChange}
                    handleChange={handleChange}
                    handleGuestsChange={handleGuestsChange}
                    selectedMenu={selectedMenu}
                />
            </form>
            <button onClick={() => setIsFilterShown(false)}>Close</button>
        </section>
        )}
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
