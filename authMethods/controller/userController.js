import fs from "fs";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username,password);
        if (!username || !password) {
            return res.status(400).json({
                message: "Bad Request. Please send both username and password!",
            });
        }

        const users = JSON.parse(fs.readFileSync('./data/users.json', "utf-8"));

        if(users && users.length>0){
            const existingUser = users.find(u => u.username === username);
            
            if (existingUser) {
                return res.status(409).json({
                    message: "User already exists",
                });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            password: hashedPassword,
        };

        users.push(newUser);

        fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

        return res.status(201).json({
            message: "User registered successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error - ${error}`,
        });
    }
}

const loginUser = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            message:`Internal Server Error ${error}`
        });
    }
}


export {registerUser,loginUser};