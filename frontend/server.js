const express = require ("express")
const path = require ('path')
const app = express()

dotenv.config

app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', index.html))
});

// app.get('/chat', (req, res) => {
//     res.send(chats);
// })

// app.get('/chat/:id', (req, res) => {
//     // console.log(req.params.id)
//     const singleChat = chats.find((c) => c._id === req.params.id)
//     res.send(singleChat)
// })

const PORT = process.env.PORT || 4000
app.listen(`${PORT}`, console.log(`Server Started on PORT ${PORT}`))