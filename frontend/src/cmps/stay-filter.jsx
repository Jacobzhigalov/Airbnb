import React, { useEffect, useRef, useState } from "react"
import FilterMenu from "./filter-menu-modal"


export function StayFilterHeader({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [isFilterShown, setIsFilterShown] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState('where')

    const elInputRef = useRef(null)

    useEffect(() => {
        console.log('filterBy', filterBy)
    }, [isFilterShown, filterByToEdit, filterBy])



    // function handleMenuChange(btnType) {
    //     setIsFilterShown(true)
    //     if (btnType === 'where') {
    //         setSelectedMenu('where')
    //         // elInputRef.current.focus()
    //         // Handle "Where" button click
    //     } else if (btnType === 'when') {
    //         setSelectedMenu('checkIn')
    //         // Handle "Dates" button click
    //     } else if (btnType === 'guests') {
    //         setSelectedMenu('guests')
    //         // Handle "Guests" button click
    //     } else if (btnType === 'checkIn') {
    //         setSelectedMenu('checkIn')
    //         // Handle "Search" button click
    //     } else if (btnType === 'checkOut') {
    //         setSelectedMenu('checkOut')
    //         // Handle "Search" button click
    //     }
    // }

    function handleMenuChange(menuSelection,ev) {
        ev.preventDefault()
       if(!isFilterShown) setIsFilterShown(true)
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

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
        setIsFilterShown(false)
        console.log('filterByToEdit', filterByToEdit)
    }


    return <section className="stay-filter-header full main-layout">
        {(!isFilterShown) && <section className="filter-selection-btns">
            <button className="btn-where" onClick={(ev) => handleMenuChange('where',ev)}>Any where</button>
            <button className="btn-when" onClick={(ev) => handleMenuChange('when',ev)}>Any week</button>
            <button className="btn-guests" onClick={(ev) => handleMenuChange('guests',ev)}>Guests</button>
            <button className="btn-search" onClick={(ev) => onSubmitFilter(ev)}>Search</button>
        </section>}
        {isFilterShown && (<section className="filter-menu">
            <form onSubmit={(ev)=>onSubmitFilter(ev)} >
                <section className="filter-menu-selection-btns">
                    <button className="btn-where" onClick={(ev) => handleMenuChange('where', ev)}>Any where</button>
                    <button className="btn-chek-in" onClick={(ev) => handleMenuChange('checkIn', ev)}>Check in</button>
                    <button className="btn-chek-out" onClick={(ev) => handleMenuChange('checkOut', ev)}>Check out</button>
                    <button className="btn-guests" onClick={(ev) => handleMenuChange('guests', ev)}>Guests</button>
                    <button className="btn-search" onClick={(ev) => onSubmitFilter(ev)}>Search</button>
                </section>
                <FilterMenu
                    filterByToEdit={filterByToEdit}
                    isFilterShown={isFilterShown}
                    handleMenuChange={handleMenuChange}
                    handleChange={handleChange}
                    handleGuestsChange={handleGuestsChange}
                    // onSubmitFilter={onSubmitFilter}
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
