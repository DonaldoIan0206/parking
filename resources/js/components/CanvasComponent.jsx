import React, { useRef, useEffect, useState } from "react";

const CanvasComponent = ({ image, positions, tempPosition, setTempPosition, rectWidth, rectHeight, confirmRectangle, removeLastRectangle }) => {
    const canvasRef = useRef(null);
    const [isDraggingRect, setIsDraggingRect] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Dibujar en el canvas
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
    }, [image, positions, tempPosition, rectWidth, rectHeight]);

    // Dibujar los rectángulos
    const drawRectangles = (ctx) => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const img = new Image();
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;

            positions.forEach(({ x, y, width, height }) => {
                ctx.strokeRect(x, y, width, height);
            });

            // Dibujar rectángulo de prueba
            if (tempPosition) {
                ctx.strokeStyle = "blue";
                ctx.strokeRect(tempPosition.x, tempPosition.y, rectWidth, rectHeight);
            }
        };
    };

    // Agregar rectángulo de prueba con clic izquierdo
    const handleCanvasClick = (event) => {
        event.preventDefault();
        if (event.button === 0) { // Solo si es clic izquierdo
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setTempPosition({ x, y });
        }
    };

    // Iniciar arrastre del rectángulo de prueba con clic derecho
    const handleMouseDown = (event) => {
        if (event.button === 2 && tempPosition) { // Solo si es clic derecho
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            if (
                x >= tempPosition.x &&
                x <= tempPosition.x + rectWidth &&
                y >= tempPosition.y &&
                y <= tempPosition.y + rectHeight
            ) {
                setIsDraggingRect(true);
                setDragOffset({ x: x - tempPosition.x, y: y - tempPosition.y });
            }
        }
    };

    // Mover el rectángulo de prueba
    const handleMouseMove = (event) => {
        if (isDraggingRect && tempPosition) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setTempPosition({ x: x - dragOffset.x, y: y - dragOffset.y });
        }
    };

    // Soltar el rectángulo de prueba
    const handleMouseUp = () => {
        setIsDraggingRect(false);
    };

    // Prevenir menú contextual en clic derecho
    useEffect(() => {
        const handleContextMenu = (event) => event.preventDefault();
        window.addEventListener("contextmenu", handleContextMenu);
        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleCanvasClick}
            style={{
                border: "2px solid black",
                cursor: "crosshair",
                maxWidth: "90vw",
                maxHeight: "80vh",
            }}
        />
    );
};

export default CanvasComponent;
