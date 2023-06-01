import { useEffect, useState } from 'react'
import { labelService } from '../services/label.service.js'

export function LabelFilter({ onLabelChange}) {
    const [labels, setLabels] = useState([])

    useEffect(() => {
        labelService.query()
            .then(labels => {
                setLabels(labels)
            })
        // eslint-disable-next-line
    }, [])

    
    return (
        <div className="label-filter">
            {labels.map(label => (
                <div className='label-container' key={label.name} onClick={()=>onLabelChange(label.name)}>
                    <img src={label.imgUrl} alt={label.name} />
                    </div>

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
            ))}
        </div>
    )
}

