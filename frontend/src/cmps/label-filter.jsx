import { useEffect, useState } from 'react'
// import { labelService } from '../services/label.service.js'
import { stayService } from '../services/stay.service.local.js'
import { set } from 'date-fns'

export function LabelFilter({ onLabelChange}) {
    const [labels, setLabels] = useState([])

    useEffect(() => {
            const labels=  stayService.getLabels()
            setLabels(labels)
        // labelService.query()
        //     .then(labels => {
        //         setLabels(labels)
        //     })
        // eslint-disable-next-line
    }, [])

    
    return (
        <div className="label-filter">
            {labels.map(label => (
                <div className='label-container' key={label.title} onClick={()=>onLabelChange(label.title)}>
                    <img src={label.url} alt={label.title} />
                    </div>
            ))}
        </div>
    )
}



// <div className="label-container" key={label}>
                //     <input
                //         type="checkbox"
                //    div>
                //         value={label}
                //         checked={selectedLabel.includes(label)}
                //         onChange={handleLabelChange}
                //     />
                //    <label htmlFor={`${label}`}>{label}</label> 
                // </div>