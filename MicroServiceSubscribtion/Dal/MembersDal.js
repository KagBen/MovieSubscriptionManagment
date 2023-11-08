const axios = require("axios")
const Member = require("../Models/MemberModel");
const MembersUrl = `https://jsonplaceholder.typicode.com/users`

const GetMembers = async () => {
    try {
        const resp = await axios.get(MembersUrl);
        const data = await resp.json;

        if (resp.status === 200) {
            for (const member of data) {
                const { name, email, address } = member;

                const newMember = new Movie({
                    Name: name,
                    Email: email,
                    City: address.city
                });

                await newMember.save();
            }
            console.log("All members have been saved to the database.");
        } else {
            throw new Error({ message: "Cannot get members from url - " + MembersUrl });
        }
    } catch (error) {
        throw new Error({ message: error.message });
    }
}





module.exports = GetMembers



const GetAllMovies = async () => {
    try {
        const resp = await axios.get(MoviesUrl);
        const data = await resp.json;

        if (resp.status === 200) {
            for (const movie of data) {
                const { name, genres, image, premiered } = movie;

                const newMovie = new Movie({
                    Name: name,
                    Genres: genres,
                    Image: image ? image.medium : "",
                    Premiered: premiered,
                });

                await newMovie.save();
            }
            console.log("All movies have been saved to the database.");
        } else {
            throw new Error({ message: "Cannot get movies from url - " + MoviesUrl });
        }
    } catch (error) {
        throw new Error({ message: error.message });
    }
};

module.exports = GetAllMovies;
