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
        Schema::create('bookchapters', function (Blueprint $table) {
            $table->bigIncrements('chapterID');
            $table->string('ChapterName');
            $table->unsignedBigInteger('bookId');
            $table->foreign('bookId')->references('BookID')->on('BooksMaster')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookchapters');
    }
};
