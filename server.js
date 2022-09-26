const express = require("express")
const app = express()
app.use(express.static("public"))
const socket = require ("socket.io")
const http = require("http").Server(app)
const  PORT = process.env.PORT || 8000
const serverSocket = require("socket.io")(http)

serverSocket.on("connect", socket => {
    console.log(`Cliente ${socket.id} conectou`)
    socket.on('chat msg', msg => {
        serverSocket.emit("chat msg", `Mensagem recebida de ${socket.username}: ${msg}`)
    })

    socket.on("login", username => {
        socket.username = username
        serverSocket.emit("chat msg", `Usuario ${username} entrou`)
    })
})

http.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))
app.get("/", (_,res)=> res.sendFile(`${__dirname}/index.html`))