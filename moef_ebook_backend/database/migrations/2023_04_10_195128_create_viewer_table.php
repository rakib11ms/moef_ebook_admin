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
        Schema::create('viewer', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('NoticeID');
            $table->foreign('NoticeID')->references('NoticeID')->on('news_notice');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('UserId')->on('users');
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('viewer');
    }
};
