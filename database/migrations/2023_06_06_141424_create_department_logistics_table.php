<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('department_logistics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_employee')->constrained('employees');
            $table->foreignId('id_order')->constrained('orders');
            $table->string('auto');
            $table->string('driver');
            $table->string('co_driver');
            $table->string('route_address');
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('department_logistics');
    }
};
