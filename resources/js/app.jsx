import React from "react";
import ReactDOM from "react-dom/client";
import CanvasComponent from "./components/CanvasComponent";
import ControlPanel from "./components/ControlPanel";
import CoordinateList from "./components/CoordinateList";
import "../css/app.css";  // Asegúrate de que la ruta sea correcta


const App = () => {
    const [image, setImage] = React.useState(null);
    const [positions, setPositions] = React.useState([]);
    const [tempPosition, setTempPosition] = React.useState(null);
    const [rectWidth, setRectWidth] = React.useState(50);
    const [rectHeight, setRectHeight] = React.useState(30);

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
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-12">

{/* 📌 Título con más margen arriba y abajo */}
<h1 className="text-4xl font-extrabold text-gray-800 mt-16 mb-8 text-center">
    🖼️ Selecciona una Imagen y Marca los Espacios 📍
</h1>


            {/* 📂 Botón de elegir/cambiar imagen */}
{/* 📂 Botón de elegir/cambiar imagen */}
<div className="flex items-center gap-4 mt-4">
    <label className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all">
        <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            className="hidden"
        />
        {image ? "🔄 Cambiar Imagen" : "📂 Elegir Imagen"}
    </label>

    {/* ❌ Botón de cancelar solo si hay una imagen cargada */}
    {image && (
        <button
            onClick={() => setImage(null)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-all"
        >
            ❌ Cancelar
        </button>
    )}
</div>



            {image && (
                <>
                    <div className="mt-6 relative">
                        <CanvasComponent
                            image={image}
                            positions={positions}
                            tempPosition={tempPosition}
                            setTempPosition={setTempPosition}
                            rectWidth={rectWidth}
                            rectHeight={rectHeight}
                        />
                    </div>

                    <ControlPanel
                        rectWidth={rectWidth}
                        setRectWidth={setRectWidth}
                        rectHeight={rectHeight}
                        setRectHeight={setRectHeight}
                        confirmRectangle={confirmRectangle}
                        removeLastRectangle={removeLastRectangle}
                    />

                    <CoordinateList positions={positions} />
                </>
            )}
        </div>
    );
};

// 📌 Exportación correcta
export default App;

// 📌 Renderizar correctamente en el DOM
if (document.getElementById("app")) {
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
}
