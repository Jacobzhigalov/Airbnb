async function query(filterBy) {
    const stays = await _filteredStays(filterBy)
    return _aggregate(stays)
}

async function _filteredStays(filterBy) {
    const stays = await storageService.query(STORAGE_KEY)
    // Filter logic here...
    return stays
}

async function _aggregate(stayId) {
    try {
        const stay = await storageService.get(STORAGE_KEY, stayId)
        const hosts = await userService.query()
        const reviews = await reviewService.query()

        const host = hosts.find(host => host._id === stay.host)
        const stayReviews = stay.reviews.map(r => reviews.find(review => review._id === r))

        return {
            ...stay,
            host,
            reviews: stayReviews
        }
    }
    catch (err) {
        console.log('stayService: Had error aggregating', err.message)
        throw err
    }
}