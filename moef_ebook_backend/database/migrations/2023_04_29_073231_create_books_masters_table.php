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
        Schema::create('books_masters', function (Blueprint $table) {
            $table->id();
            $table->string('CatID')->nullable();
            $table->string('Title')->nullable();
            $table->string('Short_desc')->nullable();
            $table->string('PublisherID')->nullable();
            $table->string('BookCoverImage')->nullable();
            $table->string('LanguageID')->nullable();
            $table->string('Publish_date')->nullable();
            $table->string('File_url')->nullable();
            $table->string('Created_by')->nullable();
            $table->string('AuthorID')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books_masters');
    }
};