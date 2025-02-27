import React, { useRef, useEffect } from "react";

const CanvasComponent = ({ image, positions, tempPosition, setTempPosition, rectWidth, rectHeight, confirmRectangle }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                drawRectangles(ctx);
            };
        }
    }, [image, positions, tempPosition]);

    const drawRectangles = (ctx) => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;

            positions.forEach(({ x, y, width, height }) => {
                ctx.strokeRect(x, y, width, height);
            });

            if (tempPosition) {
                ctx.strokeStyle = "blue";
                ctx.strokeRect(tempPosition.x, tempPosition.y, rectWidth, rectHeight);
            }
        };
    };

    const handleCanvasClick = (event) => {
        event.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setTempPosition({ x, y });
    };

    return (
        <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="border-2 border-black max-w-full max-h-screen"
        />
    );
};

export default CanvasComponent;
