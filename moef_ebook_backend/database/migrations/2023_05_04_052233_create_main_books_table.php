<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('main_books', function (Blueprint $table) {
            $table->id();
            $table->string('book_id')->nullable();
            $table->string('chapter_id')->nullable();
            $table->string('paragraph_id')->nullable();
            $table->longText('book_content')->nullable();
            $table->string('created_by')->nullable();
            $table->string('isPublished')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('main_books');
    }
};
