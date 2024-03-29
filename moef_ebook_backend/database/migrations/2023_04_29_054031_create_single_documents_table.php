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
            $table->string('title')->nullable();
            $table->string('category')->default('শ্রেণী বহির্ভূত');
            $table->string('published_date')->nullable();
            $table->longText('contents')->nullable();
            $table->string('type')->nullable();
            $table->string('created_by')->nullable();
            $table->string('file')->nullable();
            $table->boolean('isPublished')->default(true);
            $table->string('target_users')->nullable();
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
