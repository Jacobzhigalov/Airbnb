import React, { useEffect, useRef, useState } from "react"
import FilterMenu from "./filter-menu-modal"


export function StayFilterHeader({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [isFilterShown, setIsFilterShown] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState('where')

    const elInputRef = useRef(null)

    useEffect(() => {
        console.log('filterBy', filterBy)
    }, [isFilterShown, selectedMenu, filterByToEdit, filterBy])



    function handleClick(btnType) {
        setIsFilterShown(true)
        if (btnType === 'where') {
            setSelectedMenu('where')
            // elInputRef.current.focus()
            // Handle "Where" button click
        } else if (btnType === 'dates') {
            setSelectedMenu('checkIn')
            // Handle "Dates" button click
        } else if (btnType === 'guests') {
            setSelectedMenu('guests')
            // Handle "Guests" button click
        }
    }

    function handleMenuChange(menuSelection) {
        setSelectedMenu(menuSelection)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        console.log('filterByToEdit', filterByToEdit)
    }

    function handleGuestsChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, guests: { ...prevFilter.guests, [field]: value } }))
    }

    function onSubmitFilter() {
        // update father cmp that filters change on submit
        // ev.preventDefault()

        onSetFilter(filterByToEdit)
        setIsFilterShown(false)
        console.log('filterByToEdit', filterByToEdit)
    }


    return <section className="stay-filter-header full main-layout">
        {(!isFilterShown) && <section className="filter-selection-btns">
            <button className="btn-where" onClick={() => handleClick('where')}>Any where</button>
            <button className="btn-when" onClick={() => handleClick('when')}>Any week</button>
            <button className="btn-guests" onClick={() => handleClick('guests')}>Guests</button>
            <button className="btn-search" onClick={() => onSubmitFilter}>Search</button>
        </section>}
        {isFilterShown && (<section className="filter-menu">
            <form onSubmit={ev => ev.preventDefault()}>
                <section className="filter-menu-selection-btns">
                    <button className="btn-where" onClick={() => handleClick('where')}>Any where</button>
                    <button className="btn-chek-in" onClick={() => handleClick('checkIn')}>Check in</button>
                    <button className="btn-chek-out" onClick={() => handleClick('checkOut')}>Check out</button>
                    <button className="btn-guests" onClick={() => handleClick('guests')}>Guests</button>
                    <button className="btn-search" onClick={() => onSubmitFilter}>Search</button>
                </section>
                <FilterMenu
                    filterByToEdit={filterByToEdit}
                    isFilterShown={isFilterShown}
                    handleMenuChange={handleMenuChange}
                    handleChange={handleChange}
                    handleGuestsChange={handleGuestsChange}
                    onSubmitFilter={onSubmitFilter}
                    selectedMenu={selectedMenu}
                />
                <button onClick={() => setIsFilterShown(false)}>Close</button>
            </form>
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
