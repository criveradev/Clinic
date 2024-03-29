<?php

use App\Http\Controllers\Admin\Rol\RolesController;
use App\Http\Controllers\Admin\Staff\StaffController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/



Route::group(['prefix' => 'auth'], function ($router) {

    Route::post('login',    [AuthController::class, 'login']);
    Route::post('logout',   [AuthController::class, 'logout']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('refresh',  [AuthController::class, 'refresh']);
    Route::post('me',       [AuthController::class, 'me']);
});



Route::group(['middleware' => 'auth:api'], function ($router) {

    Route::apiResource('roles', RolesController::class);

    Route::get('staff/config', [StaffController::class, 'config']);
    Route::apiResource('staff', StaffController::class);
});
