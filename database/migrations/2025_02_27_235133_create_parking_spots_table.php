<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('parking_spots', function (Blueprint $table) {
            $table->id();
            $table->integer('x');
            $table->integer('y');
            $table->integer('width')->default(50);
            $table->integer('height')->default(30);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('parking_spots');
    }
};
