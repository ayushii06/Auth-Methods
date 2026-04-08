import express from "express"
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoute.js"

const app = express();

app.use(express.json());

app.use('/',userRouter);
app.use('/basicAuth',authRouter);

app.listen(3000,()=>{
    console.log("App is live at http://localhost:3000");
})