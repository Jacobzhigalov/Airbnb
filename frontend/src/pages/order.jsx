import { orderService } from '../services/order.service.local'
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"


export function Order() {
    const { orderId } = useParams()
    const [order, setOrder] = useState({})
    useEffect( ()=>{
getOrder()
    },[])

    async function getOrder(){
        try{
        const   order=await orderService.getById(orderId)
        console.log(order)
        setOrder(order)
        }
        catch(err){
            console.log(err)
        }
    }
    console.log(orderId)
    console.log(order)
    return (
        <section>
            'this is the order page'

        </section>)
}