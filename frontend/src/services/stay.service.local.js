
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stayDB'
const STORAGE_ORDER_KEY = 'orderDB'


const demoStays = [{
  "_id": "s101",
  "name": "Ribeira Charming Duplex",
  "type": "House",
  "imgUrls": ["https://res.cloudinary.com/dtgdzulrf/image/upload/v1685608167/skyrim-houses-how-to-buy-houses-in-whiterun-windhelm-riften-solitude-markarth-1477649051426_ibyttr.png",
    "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685607214/cld-sample-2.jpg",
    "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685607215/cld-sample-4.jpg",
    "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685608646/Stay.si/home0/house_on_nqdcal.jpg",
     "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685608646/Stay.si/home0/binary-4--583f06853df78c6f6a9e0b7a_jljg99.jpg"],
    "price": 80.00,
    "summary": "Fantastic duplex apartment...",
    "capacity": 8,
    "dates": "Mar 8-13",
    "rating": "★4.9",
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
      "lat": 38.736946,
      "lng": -9.142685
    },
    "reviews": [
      {
        "id": "reviewId1",
        "txt": "Our stay at this vacation house was incredible. The hosts were extremely helpful and made sure we had everything we needed. The house itself was beautifully decorated and had all the amenities we could ask for. We especially loved the traditional meals that were cooked for us. Highly recommended!",
        "rate": 5,
        "by": {
        "_id": "userId2",
        "fullname": "Sarah Thompson",
        "imgUrl": "/img/sarah_thompson.jpg"
        }
        },
        {
        "id": "reviewId2",
        "txt": "I can't say enough good things about this vacation house. The hosts went above and beyond to make our stay comfortable and enjoyable. The house was clean, spacious, and had stunning views. The traditional meals prepared by the hosts were a highlight of our trip. We will definitely be coming back!",
        "rate": 5,
        "by": {
        "_id": "userId3",
        "fullname": "John Reynolds",
        "imgUrl": "/img/john_reynolds.jpg"
        }
        },
        {
        "id": "reviewId3",
        "txt": "We had a fantastic time at this vacation house. The hosts were so friendly and welcoming. They provided us with great recommendations for local attractions and made sure we had a memorable stay. The house itself was cozy and had all the necessary amenities. We highly recommend it!",
        "rate": 4,
        "by": {
        "_id": "userId4",
        "fullname": "Emily Davis",
        "imgUrl": "/img/emily_davis.jpg"
        }
        },
        {
        "id": "reviewId4",
        "txt": "Staying at this vacation house was a dream come true. The hosts were attentive and made us feel right at home. The house was beautifully furnished and had a warm and inviting atmosphere. We loved trying the traditional dishes cooked by the hosts. We can't wait to visit again!",
        "rate": 5,
        "by": {
        "_id": "userId5",
        "fullname": "Michael Johnson",
        "imgUrl": "/img/michael_johnson.jpg"
        }
        },
        {
        "id": "reviewId5",
        "txt": "We had a wonderful vacation at this house. The hosts were amazing and made our stay unforgettable. The house was spotless and had everything we needed. The traditional meals were delicious, and we enjoyed the peaceful surroundings. We would definitely stay here again!",
        "rate": 5,
        "by": {
        "_id": "userId6",
        "fullname": "Jessica Anderson",
        "imgUrl": "/img/jessica_anderson.jpg"
        }
        },
        {
        "id": "reviewId6",
        "txt": "This vacation house exceeded all our expectations. The hosts were incredibly helpful and made sure we had a comfortable stay. The house was well-maintained and had stunning views of the surrounding area. The traditional meals were a delightful culinary experience. We highly recommend this place!",
        "rate": 4,
        "by": {
        "_id": "userId7",
        "fullname": "Daniel Wilson",
        "imgUrl": "/img/daniel_wilson.jpg"
        }
        },
        {
        "id": "reviewId7",
        "txt": "Our family had a fantastic time at this vacation house. The hosts were friendly and accommodating, and the house was perfect for our needs. It was clean, spacious, and had a charming atmosphere. The traditional meals were a highlight of our stay. We can't wait to return!",
        "rate": 5,
        "by": {
        "_id": "userId8",
        "fullname": "Sophia Brown",
        "imgUrl": "/img/sophia_brown.jpg"
        }
        },  
        {
        "id": "reviewId8",
        "txt": "We couldn't have asked for a better vacation house. The hosts were attentive and made sure we had a wonderful time. The house was beautifully decorated and had all the amenities we needed. The traditional meals were absolutely delicious. We will definitely be back!",
        "rate": 5,
        "by": {
        "_id": "userId9",
        "fullname": "Matthew Clark",
        "imgUrl": "/img/matthew_clark.jpg"
        }
        },  
        {
        "id": "reviewId9",
        "txt": "Our stay at this vacation house was nothing short of amazing. The hosts were gracious and made us feel like part of their family. The house itself was cozy and had breathtaking views. The traditional meals prepared by the hosts were a true culinary delight. We can't recommend this place enough!",
        "rate": 5,
        "by": {
        "_id": "userId10",
        "fullname": "Olivia Turner",
        "imgUrl": "/img/olivia_turner.jpg"
        }
        },
        {
        "id": "reviewId10",
        "txt": "We had a fantastic experience at this vacation house. The hosts were friendly, helpful, and made our stay unforgettable. The house was spacious, clean, and had a homely atmosphere. The traditional meals were a highlight of our trip. We can't wait to return and create more memories!",
        "rate": 5,
        "by": {
        "_id": "userId11",
        "fullname": "William Walker",
        "imgUrl": "/img/william_walker.jpg"
        }
        },
    ],
    "likedByUsers": ["mini-user"]
  },

  {
    "_id": "s102",
    "name": "Oceanfront Paradise",
    "type": "Apartment",
    "imgUrls": ["https://picsum.photos/id/163/200/200", "https://picsum.photos/id/78/200/200"],
    "price": 120.00,
    "summary": "Experience the breathtaking views...",
    "capacity": 4,
    "dates": "Aug 5-10",
    "rating": "★4.7",
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
    "imgUrls": ["https://picsum.photos/id/164/200/200", "https://picsum.photos/id/78/200/200"],
    "price": 100.00,
    "summary": "Escape to the peaceful mountainside...",
    "capacity": 6,
    "dates": "July 9-14",
    "rating": "★4.8",
    "amenities": [
      "TV",
      "Wifi",
      "Kitchen",
      "Fireplace",
      "Hiking trails",
      "Pet-friendly"
    ],
    "labels": [
      "Amazing views",
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
    {
      "_id": "s104",
      "name": "Oceanfront Paradise",
      "type": "Apartment",
      "imgUrls": ["https://picsum.photos/id/163/200/200", "https://picsum.photos/id/78/200/200"],
      "price": 120.00,
      "summary": "Experience the breathtaking views...",
      "capacity": 4,
      "dates": "Aug 5-10",
      "rating": "★4.7",
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
      "_id": "s105",
      "name": "Oceanfront Paradise",
      "type": "Apartment",
      "imgUrls": ["https://picsum.photos/id/163/200/200", "https://picsum.photos/id/78/200/200"],
      "price": 120.00,
      "summary": "Experience the breathtaking views...",
      "capacity": 4,
      "dates": "Aug 5-10",
      "rating": "★4.7",
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
      "_id": "s106",
      "name": "Oceanfront Paradise",
      "type": "Apartment",
      "imgUrls": ["https://picsum.photos/id/163/200/200", "https://picsum.photos/id/78/200/200"],
      "price": 120.00,
      "summary": "Experience the breathtaking views...",
      "capacity": 4,
      "dates": "Aug 5-10",
      "rating": "★4.7",
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
      "_id": "s107",
      "name": "Oceanfront Paradise",
      "type": "Apartment",
      "imgUrls": ["https://picsum.photos/id/163/200/200", "https://picsum.photos/id/78/200/200"],
      "price": 120.00,
      "summary": "Experience the breathtaking views...",
      "capacity": 4,
      "dates": "Aug 5-10",
      "rating": "★4.7",
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
      "_id": "s108",
      "name": "Oceanfront Paradise",
      "type": "Apartment",
      "imgUrls": ["https://picsum.photos/id/163/200/200", "https://picsum.photos/id/78/200/200"],
      "price": 120.00,
      "summary": "Experience the breathtaking views...",
      "capacity": 4,
      "dates": "Aug 5-10",
      "rating": "★4.7",
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
      "_id": "s109",
      "name": "Oceanfront Paradise",
      "type": "Apartment",
      "imgUrls": ["https://picsum.photos/id/163/200/200", "https://picsum.photos/id/78/200/200"],
      "price": 120.00,
      "summary": "Experience the breathtaking views...",
      "capacity": 4,
      "dates": "Aug 5-10",
      "rating": "★4.7",
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
      "_id": "s110",
      "name": "Oceanfront Paradise",
      "type": "Apartment",
      "imgUrls": ["https://picsum.photos/id/163/200/200", "https://picsum.photos/id/78/200/200"],
      "price": 120.00,
      "summary": "Experience the breathtaking views...",
      "capacity": 4,
      "dates": "Aug 5-10",
      "rating": "★4.7",
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
      "_id": "s111",
      "name": "Oceanfront Paradise",
      "type": "Apartment",
      "imgUrls": ["https://picsum.photos/id/163/200/200", "https://picsum.photos/id/78/200/200"],
      "price": 120.00,
      "summary": "Experience the breathtaking views...",
      "capacity": 4,
      "dates": "Aug 5-10",
      "rating": "★4.7",
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
      "checkIn": "2025/10/15",
      "checkOut": "2025/10/17",
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
        "checkIn": "2024/10/15",
        "checkOut": "2024/10/17",
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
        "checkIn": "2025/8/15",
        "checkOut": "2025/8/17",
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


export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
  getDefaultFilter
}
window.cs = stayService

_createStays()
_createOrders()


async function query(filterBy = {}) {
  var stays = await storageService.query(STORAGE_KEY)

  if (filterBy.where) {
    const regex = new RegExp(filterBy.where, 'i')
    stays = stays.filter(stay => regex.test(stay.loc.country) || regex.test(stay.loc.city) || regex.test(stay.name))
  }
  if (filterBy.price) {
    stays = stays.filter(stay => stay.price <= filterBy.price)
  }
  if (filterBy.label) {
    stays = stays.filter(stay =>
      stay.labels.includes(filterBy.label))
  }
  if (filterBy.checkIn) {
    const checkIn = new Date(filterBy.checkIn).getTime()
    let checkOut
    if (filterBy.checkOut) {
      checkOut = new Date(filterBy.checkOut).getTime()
    } else {
      const nextDay = new Date(filterBy.checkIn)
      nextDay.setDate(nextDay.getDate() + 1)
      checkOut = nextDay.getTime()
    }
    stays = stays.filter((stay) => {
      const { startTimestamp, endTimestamp } = utilService.getStampsOfDateRange(stay.dates)
      console.log('startTimestamp, endTimestamp:', startTimestamp, endTimestamp)
      return ((startTimestamp <= checkIn) && (endTimestamp >= checkOut))
    })
  }
  if (filterBy.guests && (filterBy.guests.adults || filterBy.guests.kids || filterBy.guests.infants || filterBy.guests.pets)) {
    const adults = filterBy.guests.adults || 0
    const kids = filterBy.guests.kids || 0
    const infants = filterBy.guests.infants || 0
    const pets = filterBy.guests.pets || 0
    const guestsCount = adults + kids + infants + pets
    console.log('guestsCount:', guestsCount)
    stays = stays.filter(stay => stay.capacity >= guestsCount)
  }


  console.log('stays:', stays)

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
    // Later, host is set by the backend
    stay.host = userService.getLoggedinUser()
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
    txt: ''
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

function getEmptyStay() {
  return {
    name: 'Random Stay',
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

function _createStays() {
  let stays = JSON.parse(localStorage.getItem(STORAGE_KEY))
  if (!stays || !stays.length) {
    stays = demoStays
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
  }
}

function _createOrders() {
  let orders = JSON.parse(localStorage.getItem(STORAGE_ORDER_KEY))
  if (!orders || !orders.length) {
    orders = demoOrders
    localStorage.setItem(STORAGE_ORDER_KEY, JSON.stringify(orders))
  }
}

function getDefaultFilter() {
  return {
    where: '',
    label: '',
    price: '',
    checkIn: '',
    checkOut: '',
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0
    }

  }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




