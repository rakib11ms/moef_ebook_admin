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
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id('UserID');
                $table->unsignedBigInteger('OfficeID');
                $table->foreign('OfficeID')->references('OfficeID')->on('offices');
                $table->string('UserName');
                //user role is a foreign key to the user roles table
                $table->unsignedBigInteger('userRole');
                $table->foreign('userRole')->references('RoleID')->on('user_roles');
                $table->string('userPhone');
                $table->string('userEmail')->unique();
                $table->string('userPassword');
                $table->string('userImage');
                $table->boolean('isVerified')->default(false);
                $table->timestamps();
                $table->timestamp('last_used_time')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
