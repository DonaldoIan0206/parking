import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons"; // Icono de tachuela



const CoordinateList = ({ positions }) => {
    const [modalPosition, setModalPosition] = useState({ x: window.innerWidth - 300, y: 300 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isPinned, setIsPinned] = useState(true);

    const handleMouseDown = (event) => {
        if (!isPinned) { 
            setIsDragging(true);
            setDragOffset({
                x: event.clientX - modalPosition.x,
                y: event.clientY - modalPosition.y,
            });
        }
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

    const togglePin = () => {
        setIsPinned(!isPinned);
    };

    return (
        <div
            className={`fixed bg-white p-4 border border-gray-300 rounded-lg shadow-md w-64 z-50 ${isPinned ? "cursor-default" : "cursor-move"}`}
            style={{ top: `${modalPosition.y}px`, left: `${modalPosition.x}px` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Botón de tachuela 📌 */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold bg-gray-200 px-3 py-2 rounded-md">Espacios Marcados</h3>
                <button
    onClick={togglePin}
    className={`p-2 rounded-full ${isPinned ? "bg-gray-400" : "bg-green-500"} text-white`}
>
    <FontAwesomeIcon icon={faThumbtack} />
</button>


            </div>

            {/* Lista de coordenadas (bloqueadas si se está moviendo el panel) */}
            <ol className={`max-h-40 overflow-y-auto ${isPinned ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
                {positions.map((pos, index) => (
                    <li key={index} className="mt-1 text-sm">
                        {`${index + 1}. C#${index + 1}: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)})`}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default CoordinateList;
