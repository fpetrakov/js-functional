// ignorant
const getServerStuff = callback => ajaxCall(json => callback(json))

// enlightened
const getServerStuff = ajaxCall
