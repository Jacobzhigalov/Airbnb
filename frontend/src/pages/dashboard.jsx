import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { UserRentals } from "./user-rentals.jsx"

export function Dashboard(){
    return(
        <section className="dashboard">
            <div className="dashboard-nav"></div>
            <div className="dashboard-content">
                <UserRentals/>
            </div>

        </section>
    )
}