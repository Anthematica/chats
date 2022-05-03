<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\V1\ChatController;
use App\Http\Controllers\Api\V1\ChatPrivateController;
use App\Http\Controllers\Api\V1\UserController;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Register and Login 

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::apiResource('v1/users', UserController::class);
Route::apiResource('v1/chats', ChatController::class);

Route::middleware('auth:sanctum')->get('v1/chatsPrivados/{user}', [ChatPrivateController::class, 'rooms']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
