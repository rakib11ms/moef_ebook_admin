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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
                $table->string('OfficeID')->nullable();
                $table->string('UserName');
                $table->string('userPhone');
                $table->string('email')->unique();
                $table->string('userID')->unique();
                $table->string('password');
                $table->string('confirm_password');
                $table->string('userImage')->nullable();
                $table->string('isVerified')->nullable();
                $table->boolean('ActiveStatus')->default(true);
                $table->timestamp('last_used_time')->nullable();
                $table->timestamp('device_token')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
