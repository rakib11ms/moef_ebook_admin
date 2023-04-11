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
        Schema::create('user_profile', function (Blueprint $table) {
            $table->bigIncrements('profileID');
            $table->unsignedBigInteger('UserID');
            $table->unsignedBigInteger('bookId');
            $table->unsignedBigInteger('bookmarksID');
            $table->unsignedBigInteger('notificationsId');
            $table->Boolean('isEmail');
            $table->Boolean('isPhone');
            $table->Boolean('isUserName');
            $table->Boolean('isPicture');
            $table->Boolean('isVerified');
            $table->timestamps();
            
            $table->foreign('UserID')->references('UserID')->on('users');
            $table->foreign('bookId')->references('bookID')->on('BooksMaster');
            $table->foreign('bookmarksID')->references('bookmarksID')->on('bookmarks');
            $table->foreign('notificationsId')->references('NoticeID')->on('news_notice');
        
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profile');
    }
};
