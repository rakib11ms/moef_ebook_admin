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
        Schema::create('news_notice', function (Blueprint $table) {
            $table->bigIncrements('NoticeID');
            $table->string('Title');
            $table->text('Description');
            $table->string('Image')->nullable();
            $table->unsignedBigInteger('CategoryId');
            $table->unsignedBigInteger('subCatId');
            $table->foreign('CategoryId')->references('CategoryId')->on('news_notice_category');
            $table->foreign('subCatId')->references('subCatId')->on('news_notice_sub_categories');
            $table->string('redirect_url')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->boolean('isPublished')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_notice');
    }
};
