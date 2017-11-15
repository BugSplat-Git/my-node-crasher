// my-node-crasher
// https://www.npmjs.com/package/bugsplat
// support@bugsplat.com

// Required - initialize bugsplat with database name, app name, and version
const bugsplat = require("bugsplat")("fred", "my-node-crasher", "1.0.0.0");

// The following optional api methods allow further customization
bugsplat.setAppKey("AppKey");
bugsplat.setUser("Fred");
bugsplat.setEmail("fred@bedrock.com");
bugsplat.setDescription("description");
bugsplat.addAdditionalFile("./additionalFile.txt");
bugsplat.setCallback((requestError, responseBody, originalError) => {
    // We recommend exiting your process and using a package like pm2 to handle restarts
    process.exit(1);
});

// Send an Error to BugSplat manually
// bugsplat.post(new Error("foobar!"));

// Post to BugSplat when unhandledRejections and uncaughtExceptions occur
process.on("unhandledRejection", bugsplat.post);
process.on("uncaughtException", bugsplat.post);

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