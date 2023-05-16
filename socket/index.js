const io = require("socket.io")(4001,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let activeUsers = []

io.on("connection",(socket) => {
    console.log("user connected , user SocketId:",socket.id)
    
    // CREATE ACTIVE USER WHO LOGINED TO CLIENT
    const addActiveUser = (userId,socketId) => {
        !activeUsers.some(value => value.userId === userId) &&
            activeUsers.push({userId,socketId})
    }

    // REMOVE DISCONNECTED USER FROM CLIENT
    const removeDisconnectedUser = (socketId) => {
        activeUsers = activeUsers.filter(user => user.socketId !== socketId)
    }

    //FIND SOCKET ID OF USER
    const findSocketId = (userId) => {
        const findUser = activeUsers?.find(user => user.userId === userId)
        return findUser?.socketId
    }

    // GET getMessage method FROM CLIENT
    socket.on("getMessage",data => {
        
        const receiverSocket = findSocketId(data.receiverId);
        socket.to(receiverSocket).emit("sendMessage",{
            senderId:data.senderId,
            text:data.text,
            date:Date.now()
        })
    })

    // GET sendUserInfo method FROM CLIENT
    socket.on("sendUserInfo",(userId) => {
        addActiveUser(userId,socket.id)
        socket.emit("activeUserList",activeUsers)
    })

    // GET disconnect method FROM CLIENT
    socket.on("disconnect",() => {
        console.log("user disconnected",socket.id)
        removeDisconnectedUser(socket.id)
        socket.emit("activeUserList",activeUsers)

    })

    
})


