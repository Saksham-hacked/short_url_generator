const express=require('express')
const {connectMongo}=require("./connect.js")
const URL = require("./models/url.js")
const path= require("path")
const cookieParser= require("cookie-parser")
const {checkForAuthentication,restrictTo} =require("./middleware/auth.middleware.js")


const StaticRoute= require("./routes/static.routes.js")
const urlRoute=require("./routes/url.routes.js")
const userRoute=require("./routes/user.routes.js")

const app=express()
connectMongo("mongodb://127.0.0.1:27017/ShortUrlDb").then(()=>{
    console.log("connected to mongodb")
}).catch(err => console.error(err));

app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"))

// app.get("/test", async (req, res) => {
//     const allurls=await URL.find({});
//     return res.render("home",{
//         urls:allurls
//     })
// });


const PORT=8001

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/",StaticRoute);
app.use("/user", userRoute);

//we have differrent engines for serverside rendering like EJS

app.get("/url/:shortCode", async (req, res) => {
    const shortId = req.params.shortCode;
    const entry=await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{
                visitedAt: {
                    timestamp: Date.now(),
                }
            }
        }
    })
    if(!entry){
        return res.status(404).send("Not found")
    }
    return res.redirect(entry.redirectUrl)
}) 

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})