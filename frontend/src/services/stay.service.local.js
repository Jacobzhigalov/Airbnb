import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { reviewService } from './review.service.js'

const STORAGE_KEY = 'stay_db'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getDefaultFilter,
    getLabels
}

window.cs = stayService

async function query(filterBy = { txt: '', price: 750, location: '' }) {
    var stays = await storageService.query(STORAGE_KEY)
    // if (!stays) stays = gStays
    if (filterBy.location) {
        const regex = new RegExp(filterBy.location, 'i')
        stays = stays.filter(stay => regex.test(stay.loc.country) || regex.test(stay.loc.city))
    }
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
    // }
    // if (filterBy.price) {
    //     stays = stays.filter(stay => stay.price <= filterBy.price)
    // }
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function getDefaultFilter() {
    return {
        price: 750,
        txt: '',
        location: '',
        checkIn: '',
        checkOut: '',
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
    }
}

function getEmptyStay() {
    return {
        // name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: ["https://image.cnbcfm.com/api/v1/image/106758801-1603459526384-picture-perfect-beautiful-house-on-the-island-of-coronado-in-sunny-california-beautifully-landscaped_t20_6lJOrv.jpg?v=1603459593&w=740&h=416&ffmt=webp&vtcrop=y"],
        // price: 80.00,
        summary: "Fantastic duplex apartment...",
        capacity: 8,
        amenities: [
            "TV",
            "Wifi",
            "Kitchen",
            "Smoking allowed",
            "Pets allowed",
            "Cooking basics"
        ],
        labels: [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        host: {
            _id: "u101",
            fullname: "Davit Pok",
            imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
            country: "Portugal",
            countryCode: "PT",
            city: "Lisbon",
            address: "17 Kombo st",
            lat: -8.61308,
            lng: 41.1413
        },
        reviews: [
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional...",
                rate: 4,
                by: {
                    _id: "u102",
                    fullname: "user2",
                    imgUrl: "/img/img2.jpg"
                }
            }
        ],
        likedByUsers: ['mini-user']
    }
}

function getLabels() {
    const titels = ['Rooms', 'Castles', 'Farms', 'Design', 'Luxe', 'Boats', 'OMG!', 'Beachfront', 'Amazing views', 'Amazing pools', 'Mansions', 'Lakefront', 'Cabins', 'Tropical', 'New', 'Countryside',]
    const urls = [
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/rooms_bsse5j.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/castle_dxrleo.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/farms_l5josl.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/design_sajmco.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/luxe_eyfxdq.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796922/labels-airbnb/boats_iangpw.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/omg_zh3l1v.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/beachfront_fh5txx.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/amazingviews_uq4248.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/amazingpools_seva5m.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/mansions_nn9blb.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/lakefront_nzmbnm.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/cabins_o6bewf.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/tropical_fpti81.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/new_pomh98.png',
        'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/countryside_mbu4lg.png',
    ]
    return titels.map((title, i) => {
        return {
            id: utilService.makeId(),
            title,
            url: urls[i]
        }
    })
}

; (() => {
    var stays = utilService.loadFromStorage(STORAGE_KEY) || []
    if (!stays.length) {
        stays = _createRandomStays()
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
})()

function _createRandomStays() {
    const stays = []
    for (let i = 0; i < 10; i++) {
        stays.push(_createRandomStay())
    }
    console.log(JSON.stringify(stays))
    return stays
}

function _createRandomStay() {
    const demoData = getDemoData()
    return {
        _id: utilService.makeId(),
        name: demoData.getRandomName(),
        type: demoData.getRandomType(),
        imgUrls: demoData.getRandomImgUrls(),
        price: utilService.getRandomIntInclusive(20, 800),
        summary: demoData.getRandomSummery(),
        capacity: utilService.getRandomIntInclusive(0, 8),
        amenities: demoData.getRandomAmenities(),
        labels: demoData.getRandomLabels(),
        host: userService.getRandomUser(),
        loc: demoData.getRandomLocation(),
        reviews: reviewService.getRandomReviews(),
        likedByUsers: [userService.getRandomUser(), userService.getRandomUser()]
    }
}

function getDemoData() {
    const DATA = {
        imgs: [
            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',

        ],
        names: [
            'Ribeira Charming Duplex',
            'Sunset Paradise Villa',
            'Mountain Hideaway Cabin',
            'Metropolis Loft Apartment',
        ],
        summery: [
            'Fantastic duplex apartment...',
            'Experience the ultimate beachfront getaway in our luxurious villa...',
            'Escape to the tranquility of the mountains in our cozy cabin...',
            'Experience the vibrant energy of New York City in our modern loft apartment...',
        ],
        types: [
            'House',
            'Villa',
            'Cabin',
            'Apartment',
        ],
        amenities: [
            'TV',
            'Private pool',
            'Garden',
            'Air conditioning',
            'Breakfast included',
            'Beach access',
            'Fireplace',
            'Hiking trails nearby',
            'Scenic views',
            'Pet-friendly',
            'City views',
            'Gym access',
            'Concierge service',
            'Central location',
            'Wifi',
            'Kitchen',
            'Smoking allowed',
            'Pets allowed',
            'Cooking basics'
        ],
        labels: [
            'Top of the world',
            'Trending',
            'Play',
            'Tropical',
            'Luxury Retreat',
            'Beachfront Bliss',
            'Relaxation',
            'Nature Retreat',
            'Adventure',
            'Peaceful',
            'City Life',
            'Culture',
            'Convenience'
        ],
        locations: [
            {
                country: 'Portugal',
                countryCode: 'PT',
                city: 'Lisbon',
                address: '17 Kombo st',
                lat: -8.61308,
                lng: 41.1413
            },
            {
                country: "Indonesia",
                countryCode: "ID",
                city: "Bali",
                address: "Jl. Sunset Beach No. 10",
                lat: -8.12345,
                lng: 115.6789
            },
            {
                country: "United States",
                countryCode: "US",
                city: "Asheville",
                address: "123 Mountain Rd",
                lat: 35.6789,
                lng: -82.12345
            },
            {
                country: "United States",
                countryCode: "US",
                city: "New York City",
                address: "123 Main St",
                lat: 40.7128,
                lng: -74.0060
            },
            {
                country: "Portugal",
                countryCode: "PT",
                city: "Lisbon",
                address: "17 Kombo st",
                lat: -8.61308,
                lng: 41.1413
            }
        ],
    }

    function getRandomName() {
        return DATA.names[utilService.getRandomIntInclusive(0, DATA.names.length - 1)]
    }

    function getRandomType() {
        return DATA.types[utilService.getRandomIntInclusive(0, DATA.types.length - 1)]
    }

    function getRandomSummery() {
        return DATA.summery[utilService.getRandomIntInclusive(0, DATA.summery.length - 1)]
    }

    function getRandomLocation() {
        return DATA.locations[utilService.getRandomIntInclusive(0, DATA.locations.length - 1)]
    }

    function getRandomImgUrls() {
        const urls = []
        for (let i = 0; i < 5; i++) {
            urls.push(
                DATA.imgs[utilService.getRandomIntInclusive(0, DATA.imgs.length - 1)]
            )
        }
        return urls
    }

    function getRandomAmenities() {
        const amenities = []
        for (let i = 0; i < utilService.getRandomIntInclusive(3, 7); i++) {
            amenities.push(DATA.amenities[utilService.getRandomIntInclusive(0, DATA.amenities.length - 1)])
        }
        return amenities
    }

    function getRandomLabels() {
        const labels = []
        for (let i = 0; i < utilService.getRandomIntInclusive(3, 7); i++) {
            labels.push(DATA.labels[utilService.getRandomIntInclusive(0, DATA.labels.length - 1)])
        }
        return labels
    }

    return {
        getRandomName,
        getRandomType,
        getRandomSummery,
        getRandomLocation,
        getRandomAmenities,
        getRandomLabels,
        getRandomImgUrls
    }
}







// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
// import gStays from './../data/stay.json'
// const STORAGE_KEY = 'stayDB'

// export const stayService = {
//     query,
//     getById,
//     save,
//     remove,
//     getEmptyStay,
//     addStayMsg,
//     getDefaultFilter,
//     getLabels
// }
// window.cs = stayService


// const imgs = [
//     'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
// ]

// const names = [
//     'Ribeira Charming Duplex',
// ]

// const summery = [
//     'Fantastic duplex apartment...'
// ]

// const types = [
//     'House'
// ]

// const amenities = [
//     "TV",
//     " Wifi",
//     " Kitchen",
//     " Smoking allowed ",
//     " Pets allowed ",
//     " Cooking basics "
// ]

// const lables = [
//     "Top of the world",
//     "Trending",
//     "Play",
//     "Tropical"
// ]

// const locations = [
//     {
//         country: "Portugal",
//         countryCode: "PT",
//         city: "Lisbon",
//         address: "17 Kombo st",
//         lat: -8.61308,
//         lng: 41.1413
//     }
// ]

// // function getRandomAmenities() {

// // }
// // function getRandomLabels() {

// // }

// // function _createRandomStays() {
// //     const stays = []
// //     for (let i = 0; i < 10; i++) {
// //         stays.push(_createRandomStay())
// //     }
// //     console.log(JSON.stringify(stays))
// // }

// // function _createRandomStay() {
// //     return {
// //         _id: utilService.makeId(),
// //         name: names[utilService.getRandomIntInclusive(0, names.length - 1)],
// //         type: types[utilService.getRandomIntInclusive(0, types.length - 1)],
// //         imgUrls: [
// //             { id: utilService.makeId(), url: imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)] },
// //             { id: utilService.makeId(), url: imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)] },
// //             { id: utilService.makeId(), url: imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)] },
// //             { id: utilService.makeId(), url: imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)] },
// //         ],
// //         price: utilService.getRandomIntInclusive(20, 800),
// //         summary: summery[utilService.getRandomIntInclusive(0, summery.length - 1)],
// //         capacity: utilService.getRandomIntInclusive(0, 8),
// //         amenities: amenities,
// //         labels: lables,
// //         host: userService.getRandomUser(),
// //         loc: locations[utilService.getRandomIntInclusive(0, names.length - 1)],
// //         reviews: reviewService.getRandomReviews(),
// //         likedByUsers: [userService.getRandomUser(), userService.getRandomUser()]
// //     }
// // }

// async function query(filterBy = { txt: '', price: 750, location: '' }) {
//     var stays = await storageService.query(STORAGE_KEY)

//     if (filterBy.location) {
//         const regex = new RegExp(filterBy.location, 'i')
//         stays = stays.filter(stay => regex.test(stay.loc.country) || regex.test(stay.loc.city))
//     }
//     // if (filterBy.txt) {
//     //     const regex = new RegExp(filterBy.txt, 'i')
//     //     stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
//     // }
//     // if (filterBy.price) {
//     //     stays = stays.filter(stay => stay.price <= filterBy.price)
//     // }
//     return stays
// }

// function getById(stayId) {
//     return storageService.get(STORAGE_KEY, stayId)
// }

// async function remove(stayId) {
//     // throw new Error('Nope')
//     await storageService.remove(STORAGE_KEY, stayId)
// }

// async function save(stay) {
//     var savedStay
//     if (stay._id) {
//         savedStay = await storageService.put(STORAGE_KEY, stay)
//     } else {
//         // Later, owner is set by the backend
//         stay.owner = userService.getLoggedinUser()
//         savedStay = await storageService.post(STORAGE_KEY, stay)
//     }
//     return savedStay
// }

// async function addStayMsg(stayId, txt) {
//     // Later, this is all done by the backend
//     const stay = await getById(stayId)
//     if (!stay.msgs) stay.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     stay.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, stay)

//     return msg
// }

// function getDefaultFilter() {
//     return { price: 750, txt: '', location: '', checkIn: '', checkOut: '', adults: 1, children: 0, infants: 0, pets: 0 }
// }

// function getEmptyStay() {
//     return {
//         // name: "Ribeira Charming Duplex",
//         type: "House",
//         imgUrls: ["https://image.cnbcfm.com/api/v1/image/106758801-1603459526384-picture-perfect-beautiful-house-on-the-island-of-coronado-in-sunny-california-beautifully-landscaped_t20_6lJOrv.jpg?v=1603459593&w=740&h=416&ffmt=webp&vtcrop=y"],
//         // price: 80.00,
//         summary: "Fantastic duplex apartment...",
//         capacity: 8,
//         amenities: [
//             "TV",
//             "Wifi",
//             "Kitchen",
//             "Smoking allowed",
//             "Pets allowed",
//             "Cooking basics"
//         ],
//         labels: [
//             "Top of the world",
//             "Trending",
//             "Play",
//             "Tropical"
//         ],
//         host: {
//             _id: "u101",
//             fullname: "Davit Pok",
//             imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//         },
//         loc: {
//             country: "Portugal",
//             countryCode: "PT",
//             city: "Lisbon",
//             address: "17 Kombo st",
//             lat: -8.61308,
//             lng: 41.1413
//         },
//         reviews: [
//             {
//                 id: "madeId",
//                 txt: "Very helpful hosts. Cooked traditional...",
//                 rate: 4,
//                 by: {
//                     _id: "u102",
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ['mini-user']
//     }
// }

// function getLabels() {
//     return [
//         { id: utilService.makeId(), title: 'Rooms', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/rooms_bsse5j.png' },
//         { id: utilService.makeId(), title: 'Castles', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/castle_dxrleo.png' },
//         { id: utilService.makeId(), title: 'Farms', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/farms_l5josl.png' },
//         { id: utilService.makeId(), title: 'Design', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/design_sajmco.png' },
//         { id: utilService.makeId(), title: 'Luxe', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/luxe_eyfxdq.png' },
//         { id: utilService.makeId(), title: 'Boats', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796922/labels-airbnb/boats_iangpw.png' },
//         { id: utilService.makeId(), title: 'OMG!', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/omg_zh3l1v.png' },
//         { id: utilService.makeId(), title: 'Beachfront', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/beachfront_fh5txx.png' },
//         { id: utilService.makeId(), title: 'Amazing views', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/amazingviews_uq4248.png' },
//         { id: utilService.makeId(), title: 'Amazing pools', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/amazingpools_seva5m.png' },
//         { id: utilService.makeId(), title: 'Mansions', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/mansions_nn9blb.png' },
//         { id: utilService.makeId(), title: 'Lakefront', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/lakefront_nzmbnm.png' },
//         { id: utilService.makeId(), title: 'Cabins', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/cabins_o6bewf.png' },
//         { id: utilService.makeId(), title: 'Tropical', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/tropical_fpti81.png' },
//         { id: utilService.makeId(), title: 'New', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796925/labels-airbnb/new_pomh98.png' },
//         { id: utilService.makeId(), title: 'Countryside', labelUrl: 'https://res.cloudinary.com/dpbcaizq9/image/upload/v1685796924/labels-airbnb/countryside_mbu4lg.png' },
//     ]
// }

// ; (() => {
//     // _createRandomStays()
//     var stays = storageService.query(STORAGE_KEY)
//     if (!stays.length) {
//         stays = gStays
//         utilService.saveToStorage(STORAGE_KEY, gStays)
//     }
// })()

// // TEST DATA
// // storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




