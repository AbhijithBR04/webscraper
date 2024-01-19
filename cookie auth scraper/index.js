// const request = require("request-promise").defaults({ jar: true });

// async function main() {
//   const html = await request.get("https://internshala.com/");
//   const login = await request.post(
//     "https://internshala.com/login/verify_ajax/user",
//     {
//       form: {
//         email: "goviva5133@grassdev.com",
//         password: "123456",
//       },
//     }
//   );
// }

// main();


// const fs = require("fs");
// let request = require("request-promise");
// const cookieJar = request.jar();
// request = request.defaults({ jar: cookieJar });

// async function main() {
//   const result = await request.get("https://internshala.com/");
//   const cookieString = cookieJar.getCookieString("https://internshala.com/");
//   const splittedByCsrfCookieName = cookieString.split("csrf_cookie_name=");
//   const csrf_test_name = splittedByCsrfCookieName[1].split(";")[0];

//   const loginResult = await request.post(
//     "https://internshala.com/login/verify_ajax/user",
//     {
//       form: {
//         csrf_test_name,
//         email: "goviva5133@grassdev.com",
//         password: "123456",
//       },
//     }
//   );
//   const matches = await request.get(
//     "https://internshala.com/internships/matching-preferences"
//   );
//   fs.writeFileSync("./matches.html", matches);
//   console.log(loginResult);
// }

// main();


const fs = require("fs");
const request = require("request-promise");
const tough = require("tough-cookie");
const cookieJar = request.jar();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  try {
    // Request to the home page to get initial cookies
    await request.get("https://internshala.com/", { jar: cookieJar });

    // Add a delay before making the login request
    await delay(5000); // 5 seconds delay

    // Refresh the login page to handle Captcha
    const refreshResult = await request.get("https://internshala.com/login", { jar: cookieJar });

    // Extract CSRF token from cookies
    const cookieString = cookieJar.getCookieString("https://internshala.com/");
    const splittedByCsrfCookieName = cookieString.split("csrf_cookie_name=");
    const csrf_test_name = splittedByCsrfCookieName[1].split(";")[0];

    // Login request with CSRF token
    const loginResult = await request.post("https://internshala.com/login/verify_ajax/user", {
      form: {
        csrf_test_name,
        email: "goviva5133@grassdev.com",
        password: "123456",
      },
      jar: cookieJar,
    });

    // Get matching preferences page
    const matches = await request.get("https://internshala.com/internships/matching-preferences", { jar: cookieJar });

    // Save the matching preferences page to a file
    fs.writeFileSync("./matches.html", matches);

    // Log the login result
    console.log(loginResult);
  } catch (error) {
    console.error(error);
  }
}

main();
