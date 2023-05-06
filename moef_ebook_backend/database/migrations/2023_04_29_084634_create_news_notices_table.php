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
        Schema::create('news_notices', function (Blueprint $table) {
            $table->id();
            $table->string('Title')->nullable();
            $table->longText('Description')->nullable();
            $table->string('Image')->nullable();
            $table->string('CategoryId')->nullable();
            $table->string('subCatId')->nullable();
            $table->string('redirect_url')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            
            $table->boolean('isPublished')->default(false);
            $table->string('published_date')->nullable();
            $table->string('view_post')->nullable();
            $table->string('priority')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_notices');
    }
};
