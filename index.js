const express = require('express');
const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/',allRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.leave(data.oldRoom);
        socket.join(data.newRoom);
    });

    socket.on("send_message", (data) => {
        console.log(data)
        io.to(data.room).emit("receive_message", data.msgObj);
    });
});

sequelize.sync({ force: false }).then(function() {
    server.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});