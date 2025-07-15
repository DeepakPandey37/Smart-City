const cookieParser = require("cookie-parser");
const express = require("express");
const userRoute = require("./Routes/userRoute");
const dotenv = require("dotenv");
const connectDb = require("./Utils/db");
const complaintRoutes = require("./Routes/complaintRoutes");
const cors= require("cors");
const app = express();
const PORT = process.env.PORT||3000;
dotenv.config({});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
 origin:'http://localhost:5173' ,
 credentials:true,
}
app.use(cors(corsOptions));

//My api's
app.use("/api/v1/user/auth" ,userRoute);
app.use("/api/v1/complaint" ,complaintRoutes);


app.listen(PORT ,()=>{
    connectDb();
 console.log(`app running on port ${PORT}`);
}); 