exports.getCurrentDateUTC = () => {
   return new Date().toUTCString()
}

exports.changeDateIntoLocale = (date) => {
    let localeDate = Date(date)
    return localeDate.toLocaleString()
    
}