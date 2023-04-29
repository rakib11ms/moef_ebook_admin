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
        Schema::create('single_documents', function (Blueprint $table) {
            $table->id();
            $table->string('category')->nullable();
            $table->string('sub_category')->nullable();
            $table->string('published_date')->nullable();
            $table->string('document_contents')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('single_documents');
    }
};
