<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParkingSpotController;

Route::post('/parking-spots', [ParkingSpotController::class, 'store']);
Route::get('/parking-spots', [ParkingSpotController::class, 'index']);
Route::put('/parking-spots/{id}', [ParkingSpotController::class, 'update']);
Route::delete('/parking-spots/{id}', [ParkingSpotController::class, 'destroy']);
