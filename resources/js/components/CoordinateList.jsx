import React, { useState } from "react";

const CoordinateList = ({ positions }) => {
    const [modalPosition, setModalPosition] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <h3 style={{ margin: "0", padding: "5px", cursor: "move" }}>Espacios Marcados</h3>
            <ol style={{ maxHeight: "200px", overflowY: "auto" }}>
                {positions.map((pos, index) => (
                    <li key={index}>{`${index + 1}. C#${index + 1}: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)})`}</li>
                ))}
            </ol>
        </div>
    );
};

export default CoordinateList;
