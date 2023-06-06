export const utilService = {
    makeId,
    // makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getLorem,
    getRandomNames,
    getStampsOfDateRange,
    getStampOfDate,
    countNumericObjectProperties,
    getDate
    
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

// function makeLorem(size = 100) {
//     var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
//     var txt = ''
//     while (size > 0) {
//         size--
//         txt += words[Math.floor(Math.random() * words.length)] + ' '
//     }
//     return txt
// }

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    // const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : null
}

function getLorem() {
    return 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt eum quaerat eligendi amet asperiores repudiandae itaque excepturi nam cupiditate omnis, eos saepe veritatis dicta necessitatibus delectus ratione consectetur accusamus? Laboriosam.'
}

function getRandomNames() {
    return [
        'Baba Jom',
        'John Doe',
        'Alice Smith',
        'David Johnson',
        'Emma Brown',
        'Michael Davis',
        'Olivia Wilson',
        'James Martinez',
        'Sophia Anderson',
        'William Taylor'
    ]
}

function countNumericObjectProperties(obj) {
    let count = 0
  
    for (const key in obj) {
        count += obj[key]
    }
    return count
  }

  function getStampsOfDateRange(dateRangeInputValue) {
    const dateString = dateRangeInputValue;
    const dateRange = dateString.split("-");
    console.log('dateRange', dateRange);

    const startDateParts = dateRange[0].trim().split(' ');
    const endDateParts = dateRange[1].trim().split(' ');

    const currentYear = new Date().getFullYear();

    let startMonth, startDay, endMonth, endDay;

    if (startDateParts.length === 2 && endDateParts.length === 1) {
        // Format: "Mar 8 - 13"
        startMonth = startDateParts[0];
        startDay = startDateParts[1];
        endMonth = startMonth;
        endDay = endDateParts[0];
    } else if (startDateParts.length === 2 && endDateParts.length === 2) {
        // Format: "Mar 8 - April 2"
        startMonth = startDateParts[0];
        startDay = startDateParts[1];
        endMonth = endDateParts[0];
        endDay = endDateParts[1];
    }

    // Creates date objects for start and end dates
    const startTimestamp = new Date(`${currentYear}-${startMonth}-${startDay}`).getTime();
    const endTimestamp = new Date(`${currentYear}-${endMonth}-${endDay}`).getTime();

    return { startTimestamp, endTimestamp };
}

function getStampOfDate(dateValue) {

    const date = new Date(dateValue)
    const timestamp = date.getTime()
    // const [day, month, year] = dateValue.split('/')
    // const date = new Date(`${year}-${month}-${day}`)
    // // Get the timestamp in milliseconds
    // const timestamp = date.getTime()
    return timestamp
}
function getDate(timestamp){

const today = new Date(timestamp);
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;
return formattedToday
}