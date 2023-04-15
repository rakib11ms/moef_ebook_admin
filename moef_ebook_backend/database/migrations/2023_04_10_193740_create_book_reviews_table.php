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
        Schema::create('book_reviews', function (Blueprint $table) {
            $table->bigIncrements('ReviewID');
            $table->unsignedBigInteger('user_ID');
            $table->foreign('user_ID')->references('UserID')->on('users')->onDelete('cascade');
            $table->integer('rating');
            $table->text('comment');
            $table->unsignedBigInteger('Book_ID');
            $table->foreign('Book_ID')->references('BookID')->on('BooksMaster')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_reviews');
    }
};
