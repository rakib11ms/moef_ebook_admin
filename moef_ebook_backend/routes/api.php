<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
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
// use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\BookChapterController;
use App\Http\Controllers\SingleDocumentController;
use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\BookSubCategoryController;
use App\Http\Controllers\MainBookController;
use App\Http\Controllers\DeleteUserController;
use App\Http\Controllers\ResetPasswordController;


Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::post('/register', [App\Http\Controllers\Auth\RegisterController::class, 'register']);

Route::resource('authors', AuthorController::class);
Route::resource('offices', OfficeController::class);
Route::resource('newsNotice', NewsNoticeCategoryController::class);
Route::resource('newsNoticeSub', NewsNoticeSubCategoryController::class);
Route::get('get-all-news-notice-sub-cat-By-Category-ID/{id}', [NewsNoticeSubCategoryController::class, 'getSubCategoryByCategoryID']);
Route::resource('notice', NewsNoticeController::class);
Route::resource('profile', UserProfileController::class);
Route::resource('books', BooksMasterController::class);
Route::resource('bookDetails', BooksDetailsController::class);
Route::resource('bookParagraph', BookParagraphController::class);
Route::resource('bookReview', BookReviewController::class);
Route::resource('language', LanguageController::class);
Route::resource('publisher', PublisherController::class);
// Route::resource('category', CategoryController::class);
Route::resource('book-category', BookCategoryController::class);
Route::resource('book-sub-category', BookSubCategoryController::class);
Route::get('get-all-book-sub-cat-By-Category-ID/{id}', [BookSubCategoryController::class, 'getBookSubCategoryByCategoryID']);
Route::resource('bookmark', BookmarkController::class);
Route::resource('bookChapter', BookChapterController::class);
Route::get('total-document-count', [App\Http\Controllers\TotalDocsNumberController::class, 'index']);
Route::get('get-user-image/{id}', [App\Http\Controllers\UserController::class, 'getUserImage']);
Route::post('update-user/{id}', [App\Http\Controllers\UserController::class, 'update']);
Route::get('get-user-info/{id}', [App\Http\Controllers\UserController::class, 'getUserInfo']);
Route::get('get-all-user-info', [App\Http\Controllers\UserController::class, 'getAllUserInfo']);

Route::post('/logout', [App\Http\Controllers\Auth\LogoutController::class, 'logout']);
Route::get('/all-single-document', [SingleDocumentController::class, 'allSingleDocument']);
Route::post('/save-single-document', [SingleDocumentController::class, 'saveSingleDocument']);
Route::get('/get-single-document/{id}', [SingleDocumentController::class, 'getSingleDocument']);

Route::post('/create-main-book', [MainBookController::class, 'createMainBook']);
Route::get('/get-all-main-book', [MainBookController::class, 'getAllMainBook']);
Route::get('/get-main-book/{id}', [MainBookController::class, 'getMainBookByID']);
Route::post('/update-main-book/{id}', [MainBookController::class, 'updateMainBook']);
Route::delete('/delete-main-book/{id}', [MainBookController::class, 'deleteMainBook']);

Route::get('/delete-user/{id}', [DeleteUserController::class, 'update']);
Route::post('/reset-password-email-request', [ResetPasswordController::class, 'resetPassword']);
Route::post('/reset-password-email-confirm', [ResetPasswordController::class, 'resetPasswordConfirm']);

Route :: middleware ( 'auth:sanctum' ) -> group ( function ()   { 
    Route::post('/logout', [App\Http\Controllers\Auth\LogoutController::class, 'logout']);
});