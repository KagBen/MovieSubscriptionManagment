const axios = require("axios");
const Member = require("../Models/MemberModel");
const MembersUrl = `https://jsonplaceholder.typicode.com/users`;

const FillMembers = async () => {
  try {
    const resp = await axios.get(MembersUrl);

    if (resp.status === 200) {
      const data = resp.data;

      for (const member of data) {
        const { name, email, address } = member;

        const newMember = new Member({
          Name: name,
          Email: email,
          City: address.city,
        });

        await newMember.save();
      }
    } else {
      throw new Error("Cannot get members from url - " + MembersUrl);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { FillMembers };
