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
        Schema::create('department_productions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_employee')->constrained('employees');
            $table->foreignId('id_order')->constrained('orders');
            $table->string('activity');
            $table->integer('quantity');
            $table->string('foto')->nullable();
            $table->string('observation')->nullable();
            $table->string('start')->nullable();
            $table->string('finish')->nullable();
            $table->string('total_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('department_productions');
    }
};
