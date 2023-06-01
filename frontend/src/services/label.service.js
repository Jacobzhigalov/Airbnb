import { utilService } from "./util.service.js"

const STORAGE_KEY = 'labelsDB'

const demoLabels = [
    {
      "id": "l101",
      "name": "Rooms"
    },
    {
      "id": "l102",
      "name": "Beachfront"
    },
    {
      "id": "l103",
      "name": "Amazing views"
    },
    {
      "id": "l104",
      "name": "Farms"
    },
    {
      "id": "l105",
      "name": "Castles"
    },
    {
      "id": "l106",
      "name": "Tropical"
    },
    {
      "id": "l107",
      "name": "Lakefront"
    },
    {
      "id": "l108",
      "name": "OMG!"
    },
    {
      "id": "l109",
      "name": "Countryside"
    },
    {
      "id": "l110",
      "name": "Cabins"
    },
    {
      "id": "l111",
      "name": "Amazing pools"
    },
    {
      "id": "l112",
      "name": "Chef`s kitchens"
    },
    {
      "id": "l113",
      "name": "Design"
    }
  ]


  export const labelService = {
    query
}
_createLabels()

function query() {
    // return httpService.get(BASE_URL)
    let labels = utilService.loadFromStorage(STORAGE_KEY)
    console.log('labels', labels)
    return Promise.resolve(labels)
}

function _createLabels() {
        let labels = utilService.loadFromStorage(STORAGE_KEY)
        if (!labels || !labels.length) {
            labels = demoLabels
            utilService.saveToStorage(STORAGE_KEY, labels)
        }
        return labels
    }