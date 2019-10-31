const jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) => {
        //console.log(req.method)
        if (req.method !== "OPTIONS") {
            // let success = true;
            //console.log(req.token.length)
            console.log(req.token)
            jwt.verify(req.token, "KasihNusantaraJWToken", (error, decoded) => {
                if (error) {
                    // success = false;
                    return res.status(401).json({ message: "User not authorized.", error: "User not authorized." });
                }
                //console.log(decoded)
                req.user = decoded;
                //console.log(req.user)
                next();
            });
        } else {
            next();
        }
    }, 

    resetToken: (req, res, next) => {
        //console.log(req.method)
        if (req.method !== "OPTIONS") {
            // let success = true;
            console.log(req.token.length)
            console.log(req.token)
            jwt.verify(req.token, "ForgotPasswordToken", (error, decoded) => {
                if (error) {
                    // success = false;
                    return res.status(401).json({ message: "errorToken.", error: "Token not recognized" });
                }
                //console.log(decoded)
                req.resetToken = decoded;
                console.log(req.resetToken)
                //console.log(req.user)
                next();
            });
        } else {
            next();
        }
    }
}