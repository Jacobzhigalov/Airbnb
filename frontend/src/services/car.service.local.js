
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'car'  
const STORAGE_ORDER_KEY = 'orderDB'


const demoStays = [ {
    "_id": "s101",
    "name": "Ribeira Charming Duplex",
    "type": "House",
    "imgUrls": ["https://e26e9b.jpg", "otherImg.jpg"],
    "price": 80.00,
    "summary": "Fantastic duplex apartment...",
    "capacity": 8,
    "amenities": [
      "TV",
      "Wifi",
      "Kitchen",
      "Smoking allowed",
      "Pets allowed",
      "Cooking basics"
    ],
    "labels": [
      "Top of the world",
      "Trending",
      "Play",
      "Tropical"
    ],
    "host": {
      "_id": "u101",
      "fullname": "Davit Pok",
      "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
    },
    "loc": {
      "country": "Portugal",
      "countryCode": "PT",
      "city": "Lisbon",
      "address": "17 Kombo st",
      "lat": -8.61308,
      "lng": 41.1413
    },
    "reviews": [
      {
        "id": "madeId",
        "txt": "Very helpful hosts. Cooked traditional...",
        "rate": 4,
        "by": {
          "_id": "u102",
          "fullname": "user2",
          "imgUrl": "/img/img2.jpg"
        }
      }
    ],
    "likedByUsers": ["mini-user"]
  },
  {
    "_id": "s102",
    "name": "Oceanfront Paradise",
    "type": "Apartment",
    "imgUrls": ["https://c1.muscache.com/im/pictures/5c9eacbe-2c3a-4bc6-8d61-8771b14fb4f0.jpg?aki_policy=large", "otherImg.jpg"],
    "price": 120.00,
    "summary": "Experience the breathtaking views...",
    "capacity": 4,
    "amenities": [
      "TV",
      "Wifi",
      "Kitchen",
      "Air conditioning",
      "Pool",
      "Free parking"
    ],
    "labels": [
      "Luxury",
      "Relaxing",
      "Beachfront",
      "Family-friendly"
    ],
    "host": {
      "_id": "u103",
      "fullname": "Emma Thompson",
      "imgUrl": "https://a0.muscache.com/im/pictures/6d8e9b17-925f-4f3b-80a9-6e82c1323a4a.jpg?aki_policy=profile_small"
    },
    "loc": {
      "country": "Mexico",
      "countryCode": "MX",
      "city": "Cancun",
      "address": "123 Beach Avenue",
      "lat": 21.1619,
      "lng": -86.8515
    },
    "reviews": [
      {
        "id": "reviewId2",
        "txt": "Amazing place with stunning views!",
        "rate": 5,
        "by": {
          "_id": "u104",
          "fullname": "John Smith",
          "imgUrl": "/img/img4.jpg"
        }
      }
    ],
    "likedByUsers": ["user1", "user3"],
  },
  {
    "_id": "s103",
    "name": "Mountain Retreat",
    "type": "Cabin",
    "imgUrls": ["https://d1.muscache.com/im/pictures/2c3a8be5-09dd-4d3b-8f1a-139f7fc308c9.jpg?aki_policy=large", "otherImg.jpg"],
    "price": 100.00,
    "summary": "Escape to the peaceful mountainside...",
    "capacity": 6,
    "amenities": [
      "TV",
      "Wifi",
      "Kitchen",
      "Fireplace",
      "Hiking trails",
      "Pet-friendly"
    ],
    "labels": [
      "Secluded",
      "Nature",
      "Adventure",
      "Cozy"
    ],
    "host": {
      "_id": "u105",
      "fullname": "Emily Johnson",
      "imgUrl": "https://a0.muscache.com/im/pictures/f5676d2f-0497-4746-9f43-d6c4781edc63.jpg?aki_policy=profile_small"
    },
    "loc": {
      "country": "United States",
      "countryCode": "US",
      "city": "Asheville",
      "address": "456 Mountain Lane",
      "lat": 35.5951,
      "lng": -82.5515
    },
    "reviews": [
      {
        "id": "reviewId3",
        "txt": "Absolutely loved our stay here!",
        "rate": 5,
        "by": {
            "_id": "u106",
            "fullname": "Sarah Connor",
            "imgUrl": "/img/img5.jpg"
        }
        }
    ],
    "likedByUsers": ["user1", "user2", "user3"],
    },
  
]
  
  
  const demoOrders = [
    {
      "_id": "s101",
      "hostId": "u102",
      "buyer": {
        "_id": "u101",
        "fullname": "User 1"
      },
      "totalPrice": 160,
      "startDate": "2025/10/15",
      "endDate": "2025/10/17",
      "guests": {
        "adults": 2,
        "kids": 1
      },
      "stay": {
        "_id": "h102",
        "name": "House Of Uncle My",
        "price": 80.00
      },
      "msgs": [],
      "status": "pending" // pending, approved
    },
    {
        "_id": "s102",
        "hostId": "u103",
        "buyer": {
            "_id": "u101",
            "fullname": "User 1"
        },
        "totalPrice": 240,
        "startDate": "2024/10/15",
        "endDate": "2024/10/17",
        "guests": {
            "adults": 2,
            "kids": 1
        },
        "stay": {
            "_id": "h103",
            "name": "House Of Uncle My",
            "price": 120.00
        },
        "msgs": [],
        "status": "pending" // pending, approved
    },
    {
        "_id": "s103",
        "hostId": "u104",
        "buyer": {
            "_id": "u102",
            "fullname": "User 2"
        },
        "totalPrice": 240,
        "startDate": "2025/8/15",
        "endDate": "2025/8/17",
        "guests": {
            "adults": 2,
            "kids": 1
        },
        "stay": {
            "_id": "h103",
            "name": "House Of Uncle My",
            "price": 120.00
        },
        "msgs": [],
        "status": "pending" // pending, approved
    },

  ]
  
  

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    addCarMsg
}
window.cs = carService

_createStays()
_createOrders()

async function query(filterBy = { txt: '', price: 0 }) {
    var cars = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
    }
    if (filterBy.price) {
        cars = cars.filter(car => car.price <= filterBy.price)
    }
    return cars
}

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

async function remove(carId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, carId)
}

async function save(car) {
    var savedCar
    if (car._id) {
        savedCar = await storageService.put(STORAGE_KEY, car)
    } else {
        // Later, owner is set by the backend
        car.owner = userService.getLoggedinUser()
        savedCar = await storageService.post(STORAGE_KEY, car)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    // Later, this is all done by the backend
    const car = await getById(carId)
    if (!car.msgs) car.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    car.msgs.push(msg)
    await storageService.put(STORAGE_KEY, car)

    return msg
}

function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function _createStays(){
    let stays = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!stays || !tempStays.length) {
        stays = demoStays
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
    }
}

function _createOrders(){
    let orders = JSON.parse(localStorage.getItem(STORAGE_ORDER_KEY))
    if (!orders || !orders.length) {
        orders = demoOrders
        localStorage.setItem(STORAGE_ORDER_KEY, JSON.stringify(orders))
    }
}



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




