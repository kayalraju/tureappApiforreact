const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const cookiepurser = require('cookie-parser')
const session = require('express-session')
const flash=require('connect-flash')
const cors=require('cors')
const body_parser = require('body-parser')
const dotenv =require('dotenv') 
const connectDB= require('./config/db');
dotenv.config()
const app = express()
connectDB();

app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: "shirshendu1234",
    resave: false,
    saveUninitialized: false
}));

app.use(cookiepurser());
app.use(flash())

// Set View Engine
app.set("view engine", 'ejs')
app.set('views', 'views')


app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/uploads',express.static('uploads'))
app.use(cors());
//Public Folder
app.use(express.static(path.join(__dirname, 'Public')))
app.use('/productimage', express.static(__dirname + '/productimage'));


//define auth middleware in user 
 //const userAuth = require('./Middleware/AuthHelper')
 //app.use(userAuth.veryfyToken);
//define auth middleware in admin
const adminAuth = require('./Middleware/adminAuth')
app.use(adminAuth.jwtAdminAuth)


// Set Route
// const router = require('./Router/userRouter');
// app.use(router)
//*****Api Route */
const ApiRoute=require('./Router/apiRoute')
app.use('/api',ApiRoute)
//****Admin Route */
const adminRoute = require('./Router/adminRouter')
app.use(adminRoute)

//***test Route */
const TestRoute=require('./Router/TestApiRoute')
app.use(TestRoute)

//***Crud Route */
const CrudRoute=require('./Router/crudRouter')
app.use('/api',CrudRoute)

const AuthRoute=require('./Router/AuthRouter')
app.use('/api',AuthRoute)

//connect mongodb
const port=process.env.PORT || 9000

app.listen(port,()=>{
    console.log(`server running on port: http://localhost:${port}`);
})