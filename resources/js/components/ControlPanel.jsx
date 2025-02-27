import React, { useEffect } from "react";

const ControlPanel = ({ rectWidth, setRectWidth, rectHeight, setRectHeight, confirmRectangle, removeLastRectangle }) => {
    // Permitir confirmar con "Enter" y borrar con "Delete"
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                confirmRectangle();
            }
            if (event.key === "Delete") {
                removeLastRectangle();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [confirmRectangle, removeLastRectangle]);

    return (
        <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label>
                Ancho: {rectWidth}px
                <input
                    type="range"
                    min="10"
                    max="200"  // Permitir hasta 200px
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
                ✅ Confirmar Rectángulo (Enter)
            </button>
            <button onClick={removeLastRectangle} style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer", backgroundColor: "red", color: "white" }}>
                🔙 Regresar (Delete)
            </button>
        </div>
    );
};

export default ControlPanel;
