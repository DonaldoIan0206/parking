<?php

namespace App\Http\Controllers;

use App\Models\ParkingSpot;
use Illuminate\Http\Request;

class ParkingSpotController extends Controller
{
    // Obtener todas las coordenadas
    public function index()
    {
        return response()->json(ParkingSpot::all());
    }

    // Guardar nuevas coordenadas
    public function store(Request $request)
    {
        $spot = ParkingSpot::create($request->all());
        return response()->json($spot, 201);
    }

    // Actualizar estado del espacio
    public function update(Request $request, $id)
    {
        $spot = ParkingSpot::findOrFail($id);
        $spot->update($request->all());
        return response()->json($spot);
    }
}
