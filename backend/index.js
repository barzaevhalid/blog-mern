import express from "express"
import mongoose from "mongoose";
import routes from "./routes/index.js";
const PORT = 4444
const app = express()

app.use(express.json())
app.use(routes)
app.listen(PORT, async () => {
    try {
       await mongoose.connect('mongodb+srv://admin:12345@blog.ebupt36.mongodb.net/?retryWrites=true&w=majority')
        console.log('SERVER START ON PORT: ' + PORT )
        console.log('Успешное подключение к базе данных')
    } catch (e) {
        console.log(e, "Ошибка при подключении к базе данных")
    }
})
