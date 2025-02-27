import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import CanvasComponent from "./components/CanvasComponent";
import ControlPanel from "./components/ControlPanel";
import CoordinateList from "./components/CoordinateList";
import '../css/app.css';  // O usa el nombre correcto de tu archivo CSS


const App = () => {
    const [image, setImage] = useState(null);
    const [positions, setPositions] = useState([]);
    const [tempPosition, setTempPosition] = useState(null);
    const [rectWidth, setRectWidth] = useState(50);
    const [rectHeight, setRectHeight] = useState(30);

    const confirmRectangle = () => {
        if (tempPosition) {
            setPositions([...positions, { ...tempPosition, width: rectWidth, height: rectHeight }]);
            setTempPosition(null);
        }
    };

    const removeLastRectangle = () => {
        setPositions(positions.slice(0, -1));
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Selecciona la Imagen y Marca los Espacios</h1>
            <input type="file" accept="image/*" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />

            {image && <ControlPanel rectWidth={rectWidth} setRectWidth={setRectWidth} rectHeight={rectHeight} setRectHeight={setRectHeight} confirmRectangle={confirmRectangle} removeLastRectangle={removeLastRectangle} />}

            {image && <CanvasComponent image={image} positions={positions} tempPosition={tempPosition} setTempPosition={setTempPosition} rectWidth={rectWidth} rectHeight={rectHeight} confirmRectangle={confirmRectangle} removeLastRectangle={removeLastRectangle} />}

            <CoordinateList positions={positions} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
