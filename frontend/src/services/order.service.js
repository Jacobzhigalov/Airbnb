// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
// import { userService } from './user.service.js'


const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    // getBySellerId,
    // getByBuyerId,
    remove,
   save,
    getEmptyOrder,
}

async function query() {
    return httpService.get(STORAGE_KEY)
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}
// function getBySellerId(sellerId){
// return httpService.get(`order/${orderId}`)
// }

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}
async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`order/${order._id}`, order)

    } else {
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}

function getEmptyOrder() {
    return {
        _id: '',
        stayId: '',
        hostId: '',
        buyerId: '',
        info: {
            checkin: 0,
            checkout: 0,
            price: 0,
            guests: 0,
        },
        createdAt: 0,
        isAproved: false,

    }
}
