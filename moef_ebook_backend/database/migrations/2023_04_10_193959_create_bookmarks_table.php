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
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->bigIncrements('bookmarksID');
            $table->unsignedBigInteger('User_ID');
            $table->foreign('User_ID')->references('UserID')->on('users');
            $table->integer('Location');
            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('UserID')->on('users');
            $table->unsignedBigInteger('Book_id');
            $table->foreign('Book_id')->references('BookID')->on('BooksMaster');
            $table->timestamps();        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookmarks');
    }
};
