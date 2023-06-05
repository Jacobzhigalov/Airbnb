import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { StayPreview } from "../cmps/stay-preview.jsx"
import { loadStays, addStay, updateStay, removeStay, addToCart, setFilterBy, retrieveQeryParams} from '../store/stay.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
import { LabelFilter } from '../cmps/label-filter.jsx'

export function StayIndex() {
    const { stays, filterBy } = useSelector(storeState => storeState.stayModule)
    const navigate = useNavigate();
    

    useEffect(() => {
        const quryParamsFilterBy = retrieveQeryParams()
    if (quryParamsFilterBy) setFilterBy(quryParamsFilterBy)
    }, [])

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.name = prompt('name?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const price = +prompt('New price?')
        const stayToSave = { ...stay, price }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    function onAddToCart(stay) {
        console.log(`Adding ${stay.name} to Cart`)
        addToCart(stay)
        showSuccessMsg('Added to Cart')
    }

    function onAddStayMsg(stay) {
        console.log(`TODO Adding msg to stay`)
    }

    function onStayClick(stay) {
        navigate(`/stay/${stay._id}`)
    }


    function onLabelChange(selectedLabel) {
        console.log('onLabelChange', selectedLabel)
        setFilterBy({ ...filterBy, label: selectedLabel })
        // setIsLabelFilterOpen(false)
    }


    return (
        <div>
            <LabelFilter onLabelChange={onLabelChange} />
            <main>
                <ul className="stay-list">
                    {stays.map(stay =>
                        <li className="stay-preview" key={stay._id}>
                            <StayPreview stay={stay} onStayClick={() => onStayClick(stay)} />
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}

// onClick={() => onStayClick(stay)}

{/* <p>host: <span>{stay.host && stay.host.fullname}</span></p> */ }
<div>
    {/* <button onClick={() => { onRemoveStay(stay._id) }}>x</button> */}
    {/* <button onClick={() => { onUpdateStay(stay) }}>Edit</button> */}
</div>
{/* <Link to={`/stay/${stay._id}`}>Details</Link> */ }
{/* <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button> */ }
{/* <button className="buy" onClick={() => { onAddToCart(stay) }}>Add to cart</button> */ }