<?php

namespace App\Http\Controllers;

use App\Models\ParkingSpot;
use Illuminate\Http\Request;

class ParkingSpotController extends Controller
{
    // 📌 Guardar coordenadas de un espacio de estacionamiento
    public function store(Request $request)
    {
        $spot = ParkingSpot::create($request->all());
        return response()->json($spot, 201);
    }

    // 📌 Obtener todas las coordenadas guardadas
    public function index()
    {
        return response()->json(ParkingSpot::all());
    }

    // 📌 Eliminar una coordenada (por si el usuario borra un espacio)
    public function destroy($id)
    {
        ParkingSpot::destroy($id);
        return response()->json(["message" => "Espacio eliminado"], 200);
    }
}
