import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    const [image, setImage] = useState(null);
    const [positions, setPositions] = useState([]);
    const [tempPosition, setTempPosition] = useState(null); // Rectángulo en prueba
    const [rectWidth, setRectWidth] = useState(50);
    const [rectHeight, setRectHeight] = useState(30);
    const canvasRef = useRef(null);

    const [modalPosition, setModalPosition] = useState({ x: 50, y: 50 });
    const modalRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Cargar la imagen desde la PC
    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Dibujar la imagen y los rectángulos en el canvas
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

    // Dibujar los rectángulos en el canvas
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

            // Dibujar rectángulo de prueba si existe
            if (tempPosition) {
                ctx.strokeStyle = "blue"; // Color diferente para el rectángulo en prueba
                ctx.strokeRect(tempPosition.x, tempPosition.y, rectWidth, rectHeight);
            }
        };
    };

    // Agregar rectángulo de prueba con clic izquierdo
    const handleCanvasClick = (event) => {
        event.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setTempPosition({ x, y });
    };

    // Confirmar rectángulo y agregarlo a la lista
    const confirmRectangle = () => {
        if (tempPosition) {
            setPositions([...positions, { ...tempPosition, width: rectWidth, height: rectHeight }]);
            setTempPosition(null); // Limpiar el rectángulo de prueba
        }
    };

    // Eliminar el último rectángulo colocado con clic derecho
    const handleRightClick = (event) => {
        event.preventDefault();
        setPositions(positions.slice(0, -1)); // Elimina el último agregado
    };

    // Mover el modal flotante
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setDragOffset({
            x: event.clientX - modalPosition.x,
            y: event.clientY - modalPosition.y,
        });
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            setModalPosition({
                x: event.clientX - dragOffset.x,
                y: event.clientY - dragOffset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                textAlign: "center",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <h1>Selecciona la Imagen y Marca los Espacios</h1>

            {/* Input para cargar la imagen */}
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {/* Controles para modificar el tamaño del rectángulo */}
            {image && (
                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label>
                        Ancho: {rectWidth}px
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={rectWidth}
                            onChange={(e) => setRectWidth(Number(e.target.value))}
                            style={{ marginLeft: "10px", width: "200px" }}
                        />
                    </label>
                    <label>
                        Alto: {rectHeight}px
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={rectHeight}
                            onChange={(e) => setRectHeight(Number(e.target.value))}
                            style={{ marginLeft: "10px", width: "200px" }}
                        />
                    </label>
                    <button onClick={confirmRectangle} style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}>
                        ✅ Confirmar Rectángulo
                    </button>
                </div>
            )}

            {/* Contenedor de la imagen centrada */}
            <div style={{ marginTop: "20px", position: "relative" }}>
                {image && (
                    <canvas
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        onContextMenu={handleRightClick}
                        style={{
                            border: "2px solid black",
                            cursor: "crosshair",
                            maxWidth: "90vw",
                            maxHeight: "80vh",
                        }}
                    />
                )}
            </div>

            {/* Modal flotante con lista de coordenadas */}
            <div
                ref={modalRef}
                style={{
                    position: "absolute",
                    top: `${modalPosition.y}px`,
                    left: `${modalPosition.x}px`,
                    background: "white",
                    padding: "10px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                    cursor: "move",
                    width: "250px",
                }}
                onMouseDown={handleMouseDown}
            >
                <h3 style={{ margin: "0", padding: "5px", cursor: "move" }}>Espacios Marcados</h3>
                <ol style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {positions.map((pos, index) => (
                        <li key={index}>{`C#${index + 1}: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)})`}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

// Renderizar la aplicación en el div con id="app"
ReactDOM.createRoot(document.getElementById("app")).render(<App />);
