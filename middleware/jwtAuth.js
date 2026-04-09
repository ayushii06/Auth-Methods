import jwt from "jsonwebtoken"

const jwtAuth = async(req,res,next) => {
    try {
        const auth = req.headers.authorization;
        if(!auth){
            return res.status(400).json({
                message:"Bad Request! Token is required!"
            });
        }

        const token = auth.split(" ")[1];

        try{
            const decode = jwt.verify(token,"this is the secret. Keep it in env");
            req.user = decode;
        }
        catch(err){
            console.log("Can not verify the token!");
            return res.status(401).json({
                success:false,
                message:"Can not verify the token!"
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            message:`Internal Server Error - ${error}`,
        });
    }
}

export {jwtAuth};