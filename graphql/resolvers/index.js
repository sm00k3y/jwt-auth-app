const userResolvers = require("./userResolver");
const anotherResolvers = require("./anotherResolver");

const allResolvers = [userResolvers, anotherResolvers];

// console.log("All resolvers");
// console.log(allResolvers);

module.exports = allResolvers;
