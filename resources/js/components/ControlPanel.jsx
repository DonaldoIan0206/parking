import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons"; // Icono de tachuela


const ControlPanel = ({ rectWidth, setRectWidth, rectHeight, setRectHeight, confirmRectangle, removeLastRectangle }) => {
    const [position, setPosition] = useState({ x: window.innerWidth - 300, y: 50 }); // Posición inicial a la derecha
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isPinned, setIsPinned] = useState(true); // Estado de la tachuela

    const handleMouseDown = (event) => {
        if (!isPinned) { // Solo mover si la tachuela está desactivada
            setIsDragging(true);
            setDragOffset({
                x: event.clientX - position.x,
                y: event.clientY - position.y,
            });
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            setPosition({
                x: event.clientX - dragOffset.x,
                y: event.clientY - dragOffset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const togglePin = () => {
        setIsPinned(!isPinned); // Alternar el estado de la tachuela
    };

    return (
        <div
            className={`fixed bg-white p-4 border border-gray-300 rounded-lg shadow-md w-64 z-50 ${isPinned ? "cursor-default" : "cursor-move"}`}
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Botón de tachuela 📌 */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold bg-gray-200 px-3 py-2 rounded-md">Panel de Control</h3>
                <button
    onClick={togglePin}
    className={`p-2 rounded-full ${isPinned ? "bg-gray-400" : "bg-green-500"} text-white`}
>
    <FontAwesomeIcon icon={faThumbtack} />
</button>
            </div>

            {/* Controles (deshabilitados si se está moviendo el panel) */}
            <label className={`block mt-2 ${isPinned ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
                Ancho: {rectWidth}px
                <input
                    type="range"
                    min="10"
                    max="200"
                    value={rectWidth}
                    onChange={(e) => setRectWidth(Number(e.target.value))}
                    className="w-full mt-1"
                />
            </label>
            <label className={`block mt-2 ${isPinned ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
                Alto: {rectHeight}px
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={rectHeight}
                    onChange={(e) => setRectHeight(Number(e.target.value))}
                    className="w-full mt-1"
                />
            </label>

            {/* Botones */}
            <button
                onClick={confirmRectangle}
                className={`mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 ${isPinned ? "opacity-100" : "opacity-50 pointer-events-none"}`}
            >
                ✅ Confirmar Rectángulo (Enter)
            </button>
            <button
                onClick={removeLastRectangle}
                className={`mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 ${isPinned ? "opacity-100" : "opacity-50 pointer-events-none"}`}
            >
                🔙 Regresar (Delete)
            </button>
        </div>
    );
};

export default ControlPanel;
