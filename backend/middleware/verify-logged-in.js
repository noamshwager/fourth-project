const jwt = require("jsonwebtoken");

function verifyLoggedIn(request, response, next) {
    if (!request.headers.authorization) return response.status(401).send("You are not logged-in.");//check authorization header exists
    const token = request.headers.authorization.split(" ")[1];//get the token 
    if (!token) return response.status(401).send("You are not logged-in.");//check that token exists
    jwt.verify(token, config.jwtKey, (err, payload) => {
        if (err) {

            if (err.message === "jwt expired") {
                if (request.method === "DELETE" && request.originalUrl.indexOf("/api/cart-items/by-cart/") !== -1) {
                    next();
                    return;
                }
                if (request.method === "POST" && request.originalUrl === "/api/cart-items/add-cart-items") {
                    next();
                    return;
                }
                return response.status(403).send("Your login session has expired.");//check if token expired
            }
            return response.status(401).send("You are not logged-in.");
        }

        next();
    });
}

module.exports = verifyLoggedIn;
