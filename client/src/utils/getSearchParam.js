const getSearchParam = (searchStr, paramKey, defaultValue) => {
    try {
       return searchStr.match(new RegExp(paramKey + '=([^&]*)', 'i'))[1]
    } catch (e) {
        return defaultValue
    }
}

export default getSearchParam