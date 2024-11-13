import jwt from "jsonwebtoken"

export const  isLoggedIn = async (req, res, next) => {
    try {
        console.log(req.cookies?.token);
        const token = req.cookies?.token
        const decode = jwt.decode(token);
        if(!decode){
            return res.status(401).send('Error: ' + 'Jwt Authentication Required ');  // Unauthorized access. Token not provided or invalid.
        }
       
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(404).send('Error: ' + 'Jwt Authentication Required ');
    }
};
