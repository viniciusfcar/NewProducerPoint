const Sort = {
    sortByDate : async (array) => {
        return await array.sort((a, b) => (a.date > b.date) ? 1 : -1)
    },
    sortByName : async (array) => {
        return await array.sort((a, b) => (a.name > b.name) ? 1 : -1)
    },
}

export default Sort