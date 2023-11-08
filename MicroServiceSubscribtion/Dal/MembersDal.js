const axios = require("axios")
const MembersUrl = `https://api.tvmaze.com/shows`

const GetMembers = () => {
    return axios.get(MembersUrl)
}

module.exports = GetMembers