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
            $table->string('document_title')->nullable();
            $table->string('category')->nullable();
            $table->string('sub_category')->nullable();
            $table->string('published_date')->nullable();
            $table->longText('document_contents')->nullable();
            $table->string('type')->default('single_document');
            $table->string('created_by')->nullable();
            $table->string('file')->nullable();
            $table->boolean('isPublished')->default(true);
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
