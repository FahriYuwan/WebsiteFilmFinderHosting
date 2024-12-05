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
        Schema::create('films', function (Blueprint $table) {
            $table->id('film_id');
            $table->string('title', 255);
            $table->string('alternative_title', 255)->nullable();
            $table->integer('year_release');
            $table->integer('duration');
            $table->string('url_banner', 255)->nullable();
            $table->string('url_trailer', 255)->nullable();
            $table->decimal('rating_film', 3, 1)->default(0);
            $table->integer('views')->default(0);
            $table->text('synopsis')->nullable();
            $table->string('status', 20)->default('pending');
            $table->string('availability', 255)->default('-');
            $table->foreignId('countries_id')->constrained('countries', 'countries_id')->nullable();
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('film');
    }
};
