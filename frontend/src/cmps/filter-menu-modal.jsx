import React,{useEffect } from 'react'

export default function FilterMenu({ filterByToEdit, handleMenuChange, handleChange, handleGuestsChange, selectedMenu, isFilterShown }) {
    useEffect(() => {
        console.log('filterByToEdit', filterByToEdit)
    }, [selectedMenu, isFilterShown, filterByToEdit])

  return (
    <React.Fragment>
        {(selectedMenu === 'where') && (
          <React.Fragment>
            <label htmlFor="where" onClick={() => handleMenuChange('where')}>
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
        {(selectedMenu === 'checkIn' || selectedMenu === 'when') && (
          <React.Fragment>
            <label htmlFor="checkIn" onClick={() => handleMenuChange('checkIn')}>
              Check In
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              placeholder="Check In"
              value={filterByToEdit.checkIn}
              onChange={handleChange}
            />
          </React.Fragment>
        )}
        {(selectedMenu === 'checkOut') && (
          <React.Fragment>
            <label htmlFor="checkOut" onClick={() => handleMenuChange('checkOut')}>
              Check Out
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              placeholder="Check Out"
              value={filterByToEdit.checkOut}
              onChange={handleChange}
            />
          </React.Fragment>
        )}
        {(selectedMenu === 'guests') && (
          <div id="guests" name="guests">
            <label htmlFor="adults" onClick={() => handleMenuChange('guests')}>
              Adults
            </label>
            <input
              type="number"
              id="adults"
              name="adults"
              placeholder="Adults"
              value={filterByToEdit.guests.adults}
              onChange={handleGuestsChange}
            />
            <label htmlFor="children">Children</label>
            <input
              type="number"
              id="children"
              name="children"
              placeholder="Children"
              value={filterByToEdit.guests.children}
              onChange={handleGuestsChange}
            />
            <label htmlFor="infants">Infants</label>
            <input
              type="number"
              id="infants"
              name="infants"
              placeholder="Infants"
              value={filterByToEdit.guests.infants}
              onChange={handleGuestsChange}
            />
            <label htmlFor="pets">Pets</label>
            <input
              type="number"
              id="pets"
              name="pets"
              placeholder="Pets"
              value={filterByToEdit.guests.pets}
              onChange={handleGuestsChange}
            />
          </div>
        )}
     </React.Fragment>
  )
}
