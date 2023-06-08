// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
// import { userService } from './user.service.js'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'order_db'

export const orderService = {
    query,
    getById,
    // getBySellerId,
    // getByBuyerId,
    remove,
    save,
    getEmptyOrder,
    getNights
}

async function query() {
    return httpService.get(STORAGE_KEY)
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}
// function getBySellerId(sellerId){
// return httpService.get(`order/${orderId}`)
// }

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}
async function save(order) {
    var savedOrder
    savedOrder = await storageService.post(STORAGE_KEY, order)

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


function getNights(order) {
    console.log(order)
    return (order.info.checkout - order.info.checkin) / (1000 * 60 * 60 * 24)
}