// my-node-crasher
// https://www.npmjs.com/package/bugsplat
// support@bugsplat.com

// Required - initialize bugsplat with database name, app name, and version
const bugsplat = require("bugsplat")("fred", "my-node-crasher", "1.0.0.0");

// The following optional api methods allow further customization
bugsplat.setDefaultAppKey("AppKey");
bugsplat.setDefaultUser("Fred");
bugsplat.setDefaultEmail("fred@bedrock.com");
bugsplat.setDefaultDescription("description");
bugsplat.addAdditionalFile("./additionalFile.txt");

// Send an Error to BugSplat manually
// bugsplat.post(new Error("foobar!"), {
//     appKey: "NewAppKey",
//     user: "Barney",
//     email: "barney@bedrock.com",
//     description: "new description"
// }, (requestError, responseBody, originalError) => {
//     // requestError will be null or an error object that was thrown while attempting to post to BugSplat
//     // responseBody from BugSplat that contains the crashId
//     // originalError contains the error that was passed to bugsplat.post
//     process.exit(1);
// });

// Post to BugSplat when unhandledRejections and uncaughtExceptions occur
process.on("unhandledRejection", bugsplat.postAndExit);
process.on("uncaughtException", bugsplat.postAndExit);

// Trigger an uncaughtException or unhandledRejection to test BugSplat
uncaughtException();
//unhandledRejection();

function uncaughtException() {
    throw new Error("foobar!");
}

function unhandledRejection() {
    return new Promise((resolve, reject) => resolve("foo"))
        .then(foo => new Promise((resolve, reject) => resolve(foo + "bar!")))
        .then(foobar => new Promise((resolve, reject) => reject(new Error(foobar))));
}