const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 6000;
let couses = require('./assets/courses.json');
var cors = require('cors')
 const multer  = require('multer')






app.use(express.static("images"));


app.use(express.static(path.join(__dirname, 'images'))); 
const storage = multer.diskStorage({
  destination: "images/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname.toLowerCase()?.split(" ")?.join("-"));
  },
});

const upload = multer({ storage: storage })



app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/profile', upload.single('avatar'), function (req, res, next) {
 
            if (!req.file) {
                res.send | ({ code: 500, msg: 'error' })
            } else {

                const result = (req.file)
                res.send({ code: 200, msg: "upload successfully", result })
            }
})


app.get("/courses", (req, res) => {
    res.status(200).send(couses)
})

app.get("/courses/:coursename", (req, res) => {
    const coursename = req.params.coursename;
    const course = couses.find(c => c.title.toLowerCase().split(" ").join("-") == coursename)
   res.status(200).send(course)


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})