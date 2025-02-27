import React, { useRef, useEffect, useState } from "react";

const CanvasComponent = ({ image, positions, tempPosition, setTempPosition, rectWidth, rectHeight }) => {
    const canvasRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                drawCanvas(ctx);
            };
        }
    }, [image, positions, tempPosition, rectWidth, rectHeight]);

    const drawCanvas = (ctx) => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;

            // Dibujar rectángulos confirmados
            positions.forEach(({ x, y, width, height }) => {
                ctx.strokeRect(x, y, width, height);
            });

            // Dibujar el rectángulo temporal (azul)
            if (tempPosition) {
                ctx.strokeStyle = "blue";
                ctx.strokeRect(tempPosition.x, tempPosition.y, rectWidth, rectHeight);
            }
        };
    };

    // Agregar rectángulo con clic izquierdo
    const handleCanvasClick = (event) => {
        if (event.button === 0) { // Solo clic izquierdo
            event.preventDefault();
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setTempPosition({ x, y });
        }
    };

    // Iniciar el arrastre con clic derecho
    const handleMouseDown = (event) => {
        if (event.button === 2 && tempPosition) { // Solo clic derecho
            event.preventDefault();
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Verificar si el clic derecho está dentro del rectángulo temporal
            if (
                x >= tempPosition.x &&
                x <= tempPosition.x + rectWidth &&
                y >= tempPosition.y &&
                y <= tempPosition.y + rectHeight
            ) {
                setIsDragging(true);
                setDragOffset({ x: x - tempPosition.x, y: y - tempPosition.y });
            }
        }
    };

    // Mover el rectángulo
    const handleMouseMove = (event) => {
        if (isDragging && tempPosition) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setTempPosition({ x: x - dragOffset.x, y: y - dragOffset.y });
        }
    };

    // Soltar el rectángulo
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Prevenir menú contextual con clic derecho
    useEffect(() => {
        const disableContextMenu = (event) => event.preventDefault();
        window.addEventListener("contextmenu", disableContextMenu);
        return () => {
            window.removeEventListener("contextmenu", disableContextMenu);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleCanvasClick}
            className="border-2 border-black max-w-full max-h-screen cursor-crosshair"
        />
    );
};

export default CanvasComponent;
