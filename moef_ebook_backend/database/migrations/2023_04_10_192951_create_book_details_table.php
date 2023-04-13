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
        Schema::create('book_details', function (Blueprint $table) {
            $table->bigIncrements('bookdetailsId');
            $table->unsignedBigInteger('BookId');
            $table->unsignedBigInteger('ChapterId');
            $table->unsignedBigInteger('ParagrpahId');
            $table->integer('pageNum');
            $table->text('Details');
            $table->timestamps();
            $table->unsignedBigInteger('created_by');
            $table->foreign('BookId')->references('BookID')->on('BooksMaster')->onDelete('cascade');
            $table->foreign('ChapterId')->references('chapterID')->on('bookchapters')->onDelete('cascade');
            $table->foreign('ParagrpahId')->references('paragraphId')->on('book_paragraphs')->onDelete('cascade');
            $table->foreign('created_by')->references('UserID')->on('users')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_details');
    }
};
