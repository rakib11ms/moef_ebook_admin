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
                $table->string('OfficeID');
                $table->string('UserName');
                $table->string('userRoleName');
                $table->string('userPhone');
                $table->string('email')->unique();
                $table->string('password');
                $table->string('confirm_password');
                $table->string('userImage')->nullable();
                $table->boolean('isVerified')->default(false);
                $table->timestamp('last_used_time')->nullable();
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
