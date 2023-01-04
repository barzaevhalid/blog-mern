import express from "express";
import multer from 'multer';
import mongoose from "mongoose";
import routes from "./routes/index.js";
import checkAuth from "./utils/checkAuth.js";
const PORT = 4444;
const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});
const upload = multer({storage});

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static('uploads'))

app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})
app.listen(PORT, async () => {
    try {
       await mongoose.connect('mongodb+srv://admin:12345@blog.ebupt36.mongodb.net/blog?retryWrites=true&w=majority')
        console.log('SERVER START ON PORT: ' + PORT )
        console.log('Успешное подключение к базе данных')
    } catch (e) {
        console.log(e, "Ошибка при подключении к базе данных")
    }
})
