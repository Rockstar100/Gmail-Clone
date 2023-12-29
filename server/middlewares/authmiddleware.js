import JWT from 'jsonwebtoken';


const jwtt = "XYZ1234567";


async function authMiddleware(req, res, next) {
    try {
       
        if (!req.headers['authorization']) {
            return res.status(401).json({ success: false, message: "Unauthorized - Missing Authorization header" });
        }

        const token = req.headers['authorization'].split(" ")[1];

   
        JWT.verify(token, jwtt, (err, decode) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
            } else {
               
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: `Authentication Failed: ${error.message}` });
    }
}

// Use ECMAScript module export
export { authMiddleware };
