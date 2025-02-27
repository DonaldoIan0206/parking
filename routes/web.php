<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ParkingSpotController;

Route::get('/parking-spots', [ParkingSpotController::class, 'index']);
Route::post('/parking-spots', [ParkingSpotController::class, 'store']);
Route::put('/parking-spots/{id}', [ParkingSpotController::class, 'update']);


Route::get('/', function () {
    return view('welcome');
});
