<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('parking_spots', function (Blueprint $table) {
        $table->id();
        $table->integer('x');  // Coordenada X
        $table->integer('y');  // Coordenada Y
        $table->integer('width')->default(105);  // Ancho del rectángulo
        $table->integer('height')->default(45);  // Alto del rectángulo
        $table->boolean('occupied')->default(false);  // Estado del espacio
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parking_spots');
    }
};
