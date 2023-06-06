import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import gUser from '../assets/data/user.json'

export const userService = {
    getRandomUser,
    query
}

const USER_KEY = 'user_db'

// console.log('gUser', gUser)

async function query() {

    return storageService.query(USER_KEY)
}

function getRandomUser() {
    const users = utilService.loadFromStorage(USER_KEY)
    return users[utilService.getRandomIntInclusive(0, users.length - 1)]
}

function _createRandomUsers() {
    return utilService.getRandomNames().map(name => {
        return _createRandomUser(name)
    })
}

function _createRandomUser(name) {
    return {
        _id: utilService.makeId(),
        fullname: name,
        imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small'
    }
}

; (() => {
    let users = utilService.loadFromStorage(USER_KEY) || []
    if (!users.length) {
        users = gUser
        utilService.saveToStorage(USER_KEY, users)
    }
})()