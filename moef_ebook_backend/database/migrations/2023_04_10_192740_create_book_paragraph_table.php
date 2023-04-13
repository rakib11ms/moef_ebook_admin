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
        Schema::create('book_paragraphs', function (Blueprint $table) {
            $table->bigIncrements('paragraphId');
            $table->string('paragraphName');
            $table->unsignedBigInteger('bookId');
            $table->unsignedBigInteger('chapterId');
            $table->foreign('bookId')->references('BookID')->on('BooksMaster')->onDelete('cascade');
            $table->foreign('chapterId')->references('chapterID')->on('bookchapters')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_paragraphs');
    }
};
