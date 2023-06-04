
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg
}
window.cs = stayService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, {txt})
    return savedMsg
}


function getEmptyStay() {
    return {
      "_id": "s103",
      "name": "Mountain Retreat",
      "type": "Cabin",
      "imgUrls": ["https://picsum.photos/id/164/200/200",
        "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685607214/cld-sample-2.jpg",
        "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685607215/cld-sample-4.jpg",
        "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685608646/Stay.si/home0/house_on_nqdcal.jpg",
        "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685608646/Stay.si/home0/binary-4--583f06853df78c6f6a9e0b7a_jljg99.jpg"],
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
          "id": "reviewId7",
          "txt": "Our family had a fantastic time at this vacation house. The hosts were friendly and accommodating, and the house was perfect for our needs. It was clean, spacious, and had a charming atmosphere. The traditional meals were a highlight of our stay. We can't wait to return!",
          "rate": 5,
          "by": {
            "_id": "userId8",
            "fullname": "Sophia Brown",
            "imgUrl": "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685698621/Stay.si/home0/Africa-2_mdcipt.png"
          }
        },
        {
          "id": "reviewId8",
          "txt": "We couldn't have asked for a better vacation house. The hosts were attentive and made sure we had a wonderful time. The house was beautifully decorated and had all the amenities we needed. The traditional meals were absolutely delicious. We will definitely be back!",
          "rate": 5,
          "by": {
            "_id": "userId9",
            "fullname": "Matthew Clark",
            "imgUrl": "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685698622/Stay.si/home0/p-5_mcjkh1.jpg"
          }
        },
        {
          "id": "reviewId9",
          "txt": "Our stay at this vacation house was nothing short of amazing. The hosts were gracious and made us feel like part of their family. The house itself was cozy and had breathtaking views. The traditional meals prepared by the hosts were a true culinary delight. We can't recommend this place enough!",
          "rate": 5,
          "by": {
            "_id": "userId10",
            "fullname": "Olivia Turner",
            "imgUrl": "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685698622/Stay.si/home0/header-african-american-health-equity-500x500-1_ddcazu.jpg"
          }
        },
        {
          "id": "reviewId10",
          "txt": "We had a fantastic experience at this vacation house. The hosts were friendly, helpful, and made our stay unforgettable. The house was spacious, clean, and had a homely atmosphere. The traditional meals were a highlight of our trip. We can't wait to return and create more memories!",
          "rate": 5,
          "by": {
            "_id": "userId11",
            "fullname": "William Walker",
            "imgUrl": "https://res.cloudinary.com/dtgdzulrf/image/upload/v1685698621/Stay.si/home0/107228941-1682027700192-_DSC5658_lnioog.jpg"
          }
        }
      ],
      "likedByUsers": ["user1", "user2", "user3"],
    }
}





