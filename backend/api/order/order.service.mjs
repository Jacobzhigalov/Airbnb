import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb



async function query(filterBy = { txt: '' }) {
    try {
        const criteria = _buildCriteria(filterBy)
        // console.log('criteria server service:', criteria)
        const collection = await dbService.getCollection('order')
        var orderCursor = await collection.find(criteria)

        if (filterBy.pageIdx !== undefined) {
            orderCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
        }

        const orders = orderCursor.toArray()
        // console.log('orders server service:', orders)
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}
function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.host) {
        criteria.hostId = filterBy.host
    }
    else if (filterBy.buyer) {

    }
    return criteria
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = collection.findOne({ _id: new ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ _id: new ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        // console.log('order service server:', order)
        order.createrAt = Date.now()
        delete order._id
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function update(order) {
    try {
        const id=order._id
        delete order._id
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: order })
        order._id=id
        return order
    } catch (err) {
        logger.error(`cannot update order ${order._Id}`, err)
        throw err
    }
}

export const orderService = {
    remove,
    query,
    getById,
    add,
    update,

}
