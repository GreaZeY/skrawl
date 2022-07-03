import React from 'react'
import { useRef, useState, useEffect } from 'react';
import socket from '../common/socket';
const strokeSize = 5

import styles from '../styles/Canvas.module.css'
const Canvas = () => {
    const [drawing, setDrawing] = useState(false)
    const [isYourTurn, setIsYourTurn] = useState(true)
    const canvasRef = useRef()

    var ctx = canvasRef.current?.getContext("2d");

    useEffect(() => {
        document?.addEventListener('pointerup', resetEvents)
        socket.on('update-canvas', updateCanvas)

        return () => {
            document?.removeEventListener('pointerup', resetEvents)
            socket.off('update-canvas', updateCanvas)
        }
    }, [])

    const updateCanvas = points => {
        // if (isYourTurn) return
        drawOnCanvas(points)
    }

    const getPoints = (evt) => {

        // if (!isYourTurn) return
            if (!drawing) return
            var rect = canvasRef.current.getBoundingClientRect();
            let x = evt.clientX - rect.left, y = evt.clientY - rect.top
            drawOnCanvas({x,y})
            socket.emit('update-canvas', { x, y })
        
        

     
    }

    const drawOnCanvas = (points) =>{
         ctx = canvasRef.current?.getContext("2d");
        if(!ctx) return
        const {x,y} =points

        ctx.lineWidth = strokeSize;
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round';
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const resetEvents = () => {
        setDrawing(false)
        ctx?.beginPath()
    }

    return (
        <div className={styles.canvasContainer}>
        <canvas
            ref={canvasRef}
            height='600px'
            width='800px'
            className={styles.canvas}
            onPointerMove={getPoints}
            onPointerDown={() => setDrawing(true)}
            onPointerUp={resetEvents}
            onMouseLeave={() => ctx?.beginPath()}
        >
            Canvas is not supported on your Browser
        </canvas>
        </div>
    )
}

export default Canvas





// if (!drawing) {
//     console.log('You drew')
//     socket.emit('update-canvas', { x, y })
// } else {
//     console.log('someone drew')
// }