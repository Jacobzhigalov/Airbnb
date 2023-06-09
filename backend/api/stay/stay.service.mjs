import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const PAGE_SIZE = 3


async function query(filterBy) {
    try {
        //todo : build criteria
        const criteria = _buildCriteria(filterBy)
        console.log('criteria', criteria)
        const collection = await dbService.getCollection('stay')
        var stayCursor = await collection.find(criteria)

        if (filterBy.pageIdx !== undefined) {
            console.log('here')
            stayCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
        }

        const stays = stayCursor.toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    var criteria = {}
    console.log('stay service srver', filterBy)
    if (filterBy.where) {
        const keywords = filterBy.where.split(', ')
        const searchPattern1 = keywords[0]
        const searchPattern2 = keywords[1]
        criteria.$and = [
            {
                $or: [
                    { "loc.country": { $regex: searchPattern1, $options: 'i' } },
                    { "loc.city": { $regex: searchPattern1, $options: 'i' } },
                    { "name": { $regex: searchPattern1, $options: 'i' } }
                ]
            }
        ]
        if (searchPattern2) {
            criteria.$and.push(
                {
                    $or: [
                        { "loc.country": { $regex: searchPattern2, $options: 'i' } },
                        { "loc.city": { $regex: searchPattern2, $options: 'i' } },
                        { "name": { $regex: searchPattern2, $options: 'i' } }
                    ]
                }
            )
        }
        
    }
    if (filterBy.guests) {
        if (filterBy.guests.adults || filterBy.guests.children) {
            const capacity = {
                adults: isNaN(parseInt(filterBy.guests.adults)) ? 0 : parseInt(filterBy.guests.adults),
                children: isNaN(parseInt(filterBy.guests.children)) ? 0 : parseInt(filterBy.guests.children),
            }
            criteria.capacity = { $gte: capacity.adults + capacity.children }
        }
    }

    if (filterBy.label) {
        criteria.labels = filterBy.label
    }
    return criteria
}

async function getById(stayId) {
    try {
        const pipeLine = _aggregationPipeLine(stayId)
        const collection = await dbService.getCollection('stay')
        const stay = await collection.aggregate(pipeLine).toArray()
        return stay[0]
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}
function _aggregationPipeLine(stayId) {
    return [
        { $match: { _id: stayId } },
        {
            $lookup: {
                from: 'user',
                foreignField: '_id',
                localField: 'host',
                as: 'host',
            },
        },
        {
            $addFields: {
                host: { $arrayElemAt: ['$host', 0] }
            }
        },
        {
            $project: {
                'host.password': 0
            }
        },
        {
            $lookup: {
                from: 'review',
                foreignField: '_id',
                localField: 'reviews',
                as: 'reviews',
            },
        },
    ]
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: stayId })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stay)
        return stay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        const stayToSave = {
            // vendor: stay.vendor,
            // price: stay.price,
            likedByUsers: stay.likedByUsers
        }
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: stay._id }, { $set: stayToSave })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stay._Id}`, err)
        throw err
    }
}

export const stayService = {
    remove,
    query,
    getById,
    add,
    update,
}
