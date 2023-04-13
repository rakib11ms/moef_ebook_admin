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
        Schema::create('BooksMaster', function (Blueprint $table) {
            $table->bigIncrements('BookID');
            $table->unsignedBigInteger('CatID');
            $table->string('Title');
            $table->string('author');
            $table->text('short_desc');
            $table->unsignedBigInteger('publisher_id');
            $table->string('BookCoverImage');
            $table->unsignedBigInteger('language_id');
            $table->date('publish_date');
            $table->string('file_url');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('Author_id');
            $table->timestamps();
        
            $table->foreign('CatID')->references('catID')->on('categories')->onDelete('cascade');
            $table->foreign('publisher_id')->references('publisher_id')->on('publishers')->onDelete('cascade');
            $table->foreign('language_id')->references('Language_id')->on('languages')->onDelete('cascade');
            $table->foreign('created_by')->references('UserID')->on('users')->onDelete('cascade');
            $table->foreign('Author_id')->references('Author_ID')->on('authors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('BooksMaster');
    }
};
