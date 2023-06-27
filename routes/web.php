<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\RateOrderController;
use App\Http\Controllers\ClaimOrderController;
use App\Http\Controllers\CartStoreController;
use App\Http\Controllers\DepartmentSaleController;
use App\Http\Controllers\DepartmentProductionController;
use App\Http\Controllers\DepartmentLogisticController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\TrackController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;
use App\Models\CartStore;
use App\Models\OrderDetail;

//EVENT TO PUSHER
use App\Events\Track;
use Pusher\Pusher;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
        $users = User::paginate(50);
        $roles = Role::get();
        $relation = DB::table('model_has_roles')->get();
        $userId = Auth::id(); 
        $myCart = CartStore::where('user_id', $userId)->get();

        $confirmedCount = OrderDetail::where('confirmed', null)->count();
        $to_produceCount = OrderDetail::where('date_to_produce', null)->count();
        $to_deliverCount = OrderDetail::where('date_to_deliver', null)->count();
        $deliveredCount = OrderDetail::where('sent_to', null)->count();
        $proccess = [$confirmedCount, $to_produceCount, $to_deliverCount, $deliveredCount ];
        return Inertia::render('Dashboard', compact('users', 'relation', 'roles', 'myCart', 'proccess'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile', [ProfileController::class, 'addImage'])->name('profile.addImage');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('blogs', BlogController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('users', UserController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);


Route::resource('roles', RolController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('orders', OrderController::class)->only('index', 'show', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('store', CartStoreController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);


Route::get('cartUpdate', function () {
    $userId = Auth::id(); 
    $myCart = CartStore::where('user_id', $userId)->get();
return Inertia::render('CartUpdate', compact('myCart'));})->middleware(['auth'])->name('cartUpdate');


Route::resource('clients', ClientController::class)->only('index', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('rateOrders', RateOrderController::class)->only('store')->middleware(['auth']);

Route::resource('claimOrders', ClaimOrderController::class)->only('store')->middleware(['auth']);

Route::resource('deptSales', DepartmentSaleController::class)->only('index', 'show', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('deptProduction', DepartmentProductionController::class)->only('index', 'show', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('deptLogistic', DepartmentLogisticController::class)->only('index', 'show', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('stock', StockController::class)->only('index', 'show', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('chat', ChatController::class)->only('index', 'show', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('track', TrackController::class)->only('index', 'show', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::post('chat/message', [ChatController::class, 'message']);

require __DIR__.'/auth.php';

