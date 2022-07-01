import React from 'react'
import { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client'
let socket;
const strokeSize = 5

import styles from '../styles/Canvas.module.css'
console.log(styles)
const Canvas = () => {
    const [drawing, setDrawing] = useState(false)
    const canvasRef = useRef()

    var ctx = canvasRef.current?.getContext("2d");

    useEffect(() => {
        document?.addEventListener('pointerup', resetEvents)
        return () => {
            document?.removeEventListener('pointerup', resetEvents)
        }
    }, [])

    const drawOnCanvas = (evt) => {
        if (!drawing) return
        var rect = canvasRef.current.getBoundingClientRect();
        let x = evt.clientX - rect.left, y = evt.clientY - rect.top
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
            onPointerMove={drawOnCanvas}
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