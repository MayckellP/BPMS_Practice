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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->string('confirmed')->nullable();
            $table->string('date_to_produce')->nullable();
            $table->string('date_to_deliver')->nullable();
            $table->string('driver')->nullable();
            $table->string('sent_to')->nullable();
            $table->string('foto_1')->nullable();
            $table->string('foto_2')->nullable();
            $table->string('receiver')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
