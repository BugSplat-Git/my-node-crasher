// my-node-crasher
// https://www.npmjs.com/package/bugsplat
// support@bugsplat.com
const bugsplat = require("bugsplat")("fred", "my-node-crasher", "1.0.0.0");
bugsplat.setAppKey("AppKey");
bugsplat.setUser("Fred");
bugsplat.setEmail("fred@bedrock.com");
bugsplat.setDescription("description");
bugsplat.addAdditionalFile("./additionalFile.txt");
bugsplat.setCallback((error, responseBody) => {
    console.log("BugSplat rocks!");
});

process.on("unhandledRejection", bugsplat.post);
process.on("uncaughtException", bugsplat.post);

// bugsplat.post(new Error("foobar!"));
// uncaughtException();
unhandledRejection();

function uncaughtException() {
    throw new Error("foobar!");
}

function unhandledRejection() {
    return new Promise((resolve, reject) => resolve("foo"))
        .then(foo => new Promise((resolve, reject) => resolve(foo + "bar!")))
        .then(foobar => new Promise((resolve, reject) => reject(new Error(foobar))));
}