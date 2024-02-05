<?php

namespace App\Http\Controllers\Admin\Staff;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Contracts\Role;

class StaffController extends Controller
{
    public function config()
    {
        $roles = Role::all();

        return response()->json([
            'roles' => $roles
        ]);
    }

    public function index(Request $request)
    {
        $search = $request->search;
        $users = User::where('name', 'like', '%' . $search . '%')
            ->orWhere('lastname', 'like', '%' . $search . '%')
            ->orWhere('email', 'like', '%' . $search . '%')
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $users_is_valid = User::wherer('email', $request->email)->first();

        if ($users_is_valid) {
            return response()->json([
                Response::HTTP_FORBIDDEN,
                'message_text' => 'EL EMAIL YA EXISTE'
            ]);
        }

        if ($request->hasFile('image')) {
            if ($user->avatar) {
                Storage::delete($user->avatar);
            }
            $path = Storage::putFile('staff', $request->file('image'));
            $request->request->add(['avatar' => $path]);
        }
        if ($request->password) {
            $request->request->add(['password' => bcrypt($request->password)]);
        }

        $user = User::create($request->all());
        $role = Role::findOrFail($request->role_id);
        $user->assignRole($role);

        return response()->json(Response::HTTP_OK);
    }

    public function show(string $id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'user' => $user
        ]);
    }

    public function update(Request $request, string $id)
    {
        $users_is_valid = User::where('id', '<>', $id)->where('email', $request->email)->first();

        if ($users_is_valid) {
            return response()->json([
                Response::HTTP_FORBIDDEN,
                'message_text' => 'EL EMAIL YA EXISTE'
            ]);
        }

        $user = User::findOrFail($id);

        if ($request->hasFile('image')) {
            if ($user->avatar) {
                Storage::delete($user->avatar);
            }
            $path = Storage::putFile('staff', $request->file('image'));
            $request->request->add(['avatar' => $path]);
        }

        if ($request->password) {
            $request->request->add(['password' => bcrypt($request->password)]);
        }



        $user->User::update($request->all());

        if ($request->role_id != $user->roles()->first()->id) {
            $role_old = Role::findOrFail($user->roles()->first()->id);
            $user->removeRole($role_old);

            $role_new = Role::findOrFail($request->role_id);
            $user->assignRole($role_new);
        }
        return response()->json(Response::HTTP_OK);
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        if ($user->avatar) {
            Storage::delete($user->avatar);
        }
        $user->delete();

        return response()->json(Response::HTTP_OK);
    }
}
