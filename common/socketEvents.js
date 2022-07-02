// all socket events 

export const events = (socket,io) =>{
    
    // event for chat
    socket.on('input-change', msg => {
        io.emit('update-input', msg)
    })

    //event to dispatch canvas points 
    socket.on('update-canvas', points => {
        io.emit('update-canvas', points)
    })
}
