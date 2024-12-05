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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id('review_id');
            $table->unsignedTinyInteger('rating_user')->check('rating_user >= 1 and rating_user <= 5');
            $table->text('review_text')->nullable();
            $table->timestamp('review_date');
            $table->string('status', 20)->default('pending');
            $table->foreignId('film_id')->constrained('films', 'film_id')->nullable();
            $table->foreignId('user_id')->constrained('users', 'user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
