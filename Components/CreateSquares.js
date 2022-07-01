import React from 'react'
import { useEffect } from 'react';
const CreateSquares = () => {
    useEffect(() => {
        const colors = [
            '#711c91',
            '#ea00d9',
            '#0abdc6',
            '#133e7c'
        ];

        const createSquare = () => {
            const body = document.querySelector('body');
            const square = document.createElement('span');

            const size = Math.random() * 50;

            square.style.width = 20 + size + 'px';
            square.style.height = 20 + size + 'px';

            square.style.top = Math.random() * innerHeight + 'px';
            square.style.left = Math.random() * innerWidth + 'px';

            square.style.background = colors[Math.floor(Math.random() * colors.length)];
            body.appendChild(square);

            setTimeout(() => {
                square.remove()
            }, 5000);
        }

        let interval = setInterval(createSquare, 150);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return <></>

}

export default CreateSquares