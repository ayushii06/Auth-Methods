import fs from "fs";
import bcrypt from "bcrypt";

const basicAuth = async (req,res,next)=>{
    try {
        const auth = req.headers.authorization;

        if(!auth){
            res.set("WWW-Authenticate","Basic");
            return res.status(400).json({
                message:"Bad Request, Auth token is missing!",
            });
        }

        const token = auth.split(" ")[1];

        const [username,password] = Buffer.from(token,"base64").toString().split(":");

        const users = JSON.parse(
            fs.readFileSync("./data/users.json", "utf-8")
        );

        console.log(username,password)
        
        const user = users.find(u => u.username === username);
        
        if (!user) return res.status(404).send("User not found");
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid password");
        
        next();
        
    } catch (error) {
        res.status(500).json({
            message:`Internal Server Error - ${error}`,
        });
    }
}

export {basicAuth};