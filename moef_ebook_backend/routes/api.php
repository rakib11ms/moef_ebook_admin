<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\NewsNoticeCategoryController;
use App\Http\Controllers\NewsNoticeSubCategoryController;
use App\Http\Controllers\NewsNoticeController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\BooksMasterController;
use App\Http\Controllers\BooksDetailsController;
use App\Http\Controllers\BookParagraphController;
use App\Http\Controllers\BookReviewController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\BookChapterController;

Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\Auth\LogoutController::class, 'logout']);

Route::resource('authors', AuthorController::class);
Route::resource('offices', OfficeController::class);
Route::resource('newsNotice', NewsNoticeCategoryController::class);
Route::resource('newsNoticeSub', NewsNoticeSubCategoryController::class);
Route::resource('notice', NewsNoticeController::class);
Route::resource('profile', UserProfileController::class);
Route::resource('books', BooksMasterController::class);
Route::resource('bookDetails', BooksDetailsController::class);
Route::resource('bookParagraph', BookParagraphController::class);
Route::resource('bookReview', BookReviewController::class);
Route::resource('language', LanguageController::class);
Route::resource('publisher', PublisherController::class);
Route::resource('category', CategoryController::class);
Route::resource('bookmark', BookmarkController::class);
Route::resource('bookChapter', BookChapterController::class);
