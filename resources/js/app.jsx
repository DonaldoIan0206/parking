import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import CanvasComponent from "./components/CanvasComponent";
import ControlPanel from "./components/ControlPanel";
import CoordinateList from "./components/CoordinateList";
import Swal from "sweetalert2";
import "../css/app.css";  // Asegúrate de que la ruta sea correcta

const App = () => {
    const [image, setImage] = useState(null);
    const [positions, setPositions] = useState([]);
    const [tempPosition, setTempPosition] = useState(null);
    const [rectWidth, setRectWidth] = useState(50);
    const [rectHeight, setRectHeight] = useState(30);
    const [parkingSpots, setParkingSpots] = useState([]); // ✅ Estado corregido para coordenadas

    const confirmRectangle = () => {
        if (tempPosition) {
            const newSpot = { ...tempPosition, width: rectWidth, height: rectHeight };
            setPositions([...positions, newSpot]);
            setParkingSpots([...parkingSpots, newSpot]);
            setTempPosition(null);
        }
    };

    const removeLastRectangle = () => {
        setPositions(positions.slice(0, -1));
        setParkingSpots(parkingSpots.slice(0, -1));
    };

    const handleSave = async () => {
        if (parkingSpots.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No hay espacios para guardar",
                text: "Por favor selecciona al menos un espacio antes de guardar.",
            });
            return;
        }

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto guardará las coordenadas en la base de datos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, guardar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                for (const spot of parkingSpots) {
                    await fetch("http://127.0.0.1:8000/api/parking-spots", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(spot),
                    });
                }

                Swal.fire({
                    icon: "success",
                    title: "Guardado",
                    text: "Las coordenadas han sido guardadas exitosamente.",
                });

                setParkingSpots([]); // Limpia los espacios después de guardar
                setPositions([]); // También limpia la vista
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-12">
            {/* 📌 Título con más margen arriba y abajo */}
            <h1 className="text-4xl font-extrabold text-gray-800 mt-16 mb-8 text-center">
                🖼️ Selecciona una Imagen y Marca los Espacios 📍
            </h1>

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
                        onClick={() => {
                            setImage(null);
                            setPositions([]);
                            setParkingSpots([]);
                        }}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-all"
                    >
                        ❌ Cancelar
                    </button>
                )}
            </div>

            {/* 🛠️ Solo mostrar el canvas y los controles si hay una imagen */}
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

                    {/* 💾 Botón Guardar */}
                    <button
                        onClick={handleSave}
                        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all"
                    >
                        💾 Guardar Coordenadas
                    </button>
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
