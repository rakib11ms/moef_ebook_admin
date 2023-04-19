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
            $table->string('BookCoverImage');
            $table->date('publish_date')->nullable();
            $table->string('file_url')->nullable();
            $table->string('Author_id')->nullable();
        
            $table->string('CatID')->nullable();
            $table->string('publisher_id')->nullable();
            $table->string('language_id')->nullable();
            $table->string('created_by')->nullable();
               $table->timestamps();

          
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
