<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Auths\LoginController;
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
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Auths\RegisterController;
use App\Http\Controllers\RolePermissionController;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

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
// Route::put('bookParagraph-update/{id}', [BookParagraphController::class,'update']);
Route::get('get-dependent-chapters-by-book-master-id/{id}', [BookParagraphController::class, 'getChaptersByBookMaster']);

Route::get('get-dependent-paragraphs-by-book-chapter-id/{id}', [BookParagraphController::class, 'getParagraphsByChapter']);
Route::get('get-dependent-chapter-by-main-book-id/{id}', [MainBookController::class, 'getChaptersByBookID']);
Route::get('get-news-notice-by-oldest-or-newest/{id}', [NewsNoticeController::class, 'getNewsNoticeByOldestOrNewest']);
Route::get('get-all-main-books-and-single-documents-in-decending-order', [MainBookController::class, 'getAllMainBooksAndSingleDocumentsInDecendingOrder']);
Route::get('get-all-main-books-and-single-documents-for-a-specific-user/{id}', [MainBookController::class, 'getAllMainBooksAndSingleDocsForASpecificUser']);
Route::get('get-All-Draft-Books-And-Single-Documents-By-UserID/{id}', [MainBookController::class, 'getAllDraftBooksAndSingleDocumentsByUserID']);


Route::resource('bookReview', BookReviewController::class);
Route::resource('language', LanguageController::class);
Route::resource('publisher', PublisherController::class);
// Route::resource('category', CategoryController::class);
// Route::resource('book-category', BookCategoryController::class);
// Route::get('book-category', BookCategoryController::class, 'index');
Route::get('book-category', [App\Http\Controllers\BookCategoryController::class, 'index']);
Route::post('store-book-category', [App\Http\Controllers\BookCategoryController::class, 'store']);
Route::get('get-book-category/{id}', [App\Http\Controllers\BookCategoryController::class, 'show']);
Route::post('update-book-category/{id}', [App\Http\Controllers\BookCategoryController::class, 'update']);
Route::delete('delete-book-category/{id}', [App\Http\Controllers\BookCategoryController::class, 'destroy']);

// Route::post('update-book-category/{id}', BookCategoryController::class, 'update');
Route::resource('book-sub-category', BookSubCategoryController::class);
Route::get('get-all-book-sub-cat-By-Category-ID/{id}', [BookSubCategoryController::class, 'getBookSubCategoryByCategoryID']);
Route::resource('bookmark', BookmarkController::class);
Route::resource('bookChapter', BookChapterController::class);
Route::get('total-document-count', [App\Http\Controllers\TotalDocsNumberController::class, 'index']);
Route::get('get-user-image/{id}', [App\Http\Controllers\UserController::class, 'getUserImage']);
Route::post('update-user/{id}', [App\Http\Controllers\UserController::class, 'update']);
Route::get('get-user-info/{id}', [App\Http\Controllers\UserController::class, 'getUserInfo']);
Route::get('get-all-user-info', [App\Http\Controllers\UserController::class, 'getAllUserInfo']);
Route::post('global-Search-User-By-User-Name-And-User-Email', [App\Http\Controllers\UserController::class, 'globalSearchUserByUserNameAndUserEmail']);
Route::get('get-Leatest-Two-MainBooks-And-Single-Documents-In-Decending-Order', [App\Http\Controllers\MainBookController::class, 'getLeatestTwoMainBooksAndSingleDocumentsInDecendingOrder']);

// Route::post('/logout', [App\Http\Controllers\Auth\LogoutController::class, 'logout']);
Route::get('/all-single-document', [SingleDocumentController::class, 'allSingleDocument']);
Route::post('/save-single-document', [SingleDocumentController::class, 'saveSingleDocument']);
Route::get('/get-single-document/{id}', [SingleDocumentController::class, 'getSingleDocument']);
Route::post('/update-single-document/{id}', [SingleDocumentController::class, 'updateSingleDocument']);
Route::delete('/delete-single-document/{id}', [SingleDocumentController::class, 'deleteSingleDocument']);

Route::post('/create-main-book', [MainBookController::class, 'createMainBook']);
Route::get('/get-all-main-book', [MainBookController::class, 'getAllMainBook']);
Route::get('/get-main-book-by-count', [MainBookController::class, 'getAllBookCountByChapterAndParagraph']);
Route::get('/get-main-book/{id}', [MainBookController::class, 'getMainBookByID']);
Route::post('/update-main-book/{id}', [MainBookController::class, 'updateMainBook']);
Route::delete('/delete-book-master-with-main-book/{id}', [BooksMasterController::class, 'deleteMainBook']);
Route::get('/get-All-Book-Category-From-Book-Master', [BooksMasterController::class, 'getAllBookCategoryFromBookMaster']);
Route::get('/global-search-by-book-or-documents/{name}', [MainBookController::class, 'globalSearchByBookOrDocuments']);
Route::post('/publish-Main-Book/{id}', [MainBookController::class, 'publishMainBook']);
Route::post('/publish-Single-Document/{id}', [SingleDocumentController::class, 'publishSingleDocument']);
Route::get('/get-All-Book-And-Documents-By-Category-ID/{id}', [MainBookController::class, 'getAllBookAndDocumentsByCategoryID']);
Route::get('/get-All-Main-Book-By-Book-Master-ID/{id}', [MainBookController::class, 'getAllMainBookByBookMasterID']);
Route::get('/get-All-Chpter-By-Book-Master-ID/{id}', [MainBookController::class, 'getAllChpterByBookMasterID']);
Route::get('/get-All-Paragraphs-By-ChapterID/{id}', [MainBookController::class, 'getAllParagraphsByChapterID']);
Route::get('/get-All-Unique-MainBook-By-BookMaster-ID', [MainBookController::class, 'getAllUniqueMainBookByBookMasterID']);


//inactive user
Route::put('/delete-user/{id}', [DeleteUserController::class, 'update']);


Route::put('/active-User/{id}', [DeleteUserController::class, 'activeUser']);

Route::post('/reset-password-email-request', [ResetPasswordController::class, 'resetPassword']);
Route::post('/reset-password-email-confirm', [ResetPasswordController::class, 'resetPasswordConfirm']);

Route::middleware ( 'auth:sanctum' ) -> group(function(){ 
    Route::post('/logout', [App\Http\Controllers\Auths\LogoutController::class, 'logout']);
});



Route::post('sendmessage', [ChatController::class, 'sendMessage']);
Route::get('get-all-messages', [ChatController::class, 'getAllMessage']);


//Role permission 
Route::post('create-role', [RolePermissionController::class, 'createRole']);
Route::get('get-all-roles', [RolePermissionController::class, 'getAllRoles']);
Route::post('create-permission', [RolePermissionController::class, 'createPermission']);
Route::get('get-all-permissions', [RolePermissionController::class, 'getAllPermissions']);
Route::post('assign-permission-via-role/{id}', [RolePermissionController::class, 'assignPermissionViaRole']);
Route::get('get-permission-via-role/{id}', [RolePermissionController::class, 'getPermissionViaRole']);
Route::post('/change-User-Role/{id}', [App\Http\Controllers\UserController::class, 'changeUserRole']);

// Route::post('check', [RolePermissionController::class, 'check']);


////meeting apis///
Route::post('create-meeting', [MeetingController::class, 'createMeeting']);
Route::get('upcoming-meetings', [MeetingController::class, 'upcomingMeetings']);
Route::get('view-participant-users/{meetingId}', [MeetingController::class, 'viewParticipantUsersByMeetingId']);
Route::get('all-meetings', [MeetingController::class, 'allMeetings']);
Route::get('all-old-meetings', [MeetingController::class, 'allOldMeetings']);
Route::put('meeting-joined-users-by-meeting-id/{meetingId}', [MeetingController::class, 'meetingJoinedUsers']);
Route::get('user-joined-meetings/{userId}', [MeetingController::class, 'userJoinedMeetings']);
Route::get('user-unjoined-meetings/{userId}', [MeetingController::class, 'userUnJoinedMeetings']);


Route::group(['middleware' => ['role:Super admin','auth:sanctum']], function () {
    Route::post('check', [RolePermissionController::class, 'check'])->middleware('permission:delete_meeting');

});

// Route::group(['middleware' => ['role:Super admin','auth:sanctum']], function () {
//     Route::post('check', [RolePermissionController::class, 'check'])->name('update_meeting');

// });


