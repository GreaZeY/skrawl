import { useEffect, useState } from 'react'
import socket from '../common/socket'

const ChatBox = () => {
    const [input, setInput] = useState('')

    const updateMessages= msg => {
        setInput(msg)
        console.log('dfd')
    }

    useEffect(() => { 
        socket.on('update-input', updateMessages)
        return () => {
            socket.off('update-input', updateMessages)
        }
    }, [])


    const onChangeHandler = (e) => {
        setInput(e.target.value)
        socket.emit('input-change', e.target.value)
    }

    return (
        <input
            placeholder="Type something"
            value={input}
            onChange={onChangeHandler}
        />
    )
}

export default ChatBox;