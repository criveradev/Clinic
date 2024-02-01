<?php

namespace App\Http\Controllers\Admin\Rol;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Role;

use function PHPUnit\Framework\returnSelf;

class RolesController extends Controller
{

    public function index(Request $request)
    {
        # Filtro por nombre de rol
        $name = $request->search;

        $roles = Role::where('name', 'like', '%' . $name . '%')
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'roles' => $roles->map(function ($rol) {
                return [
                    'id'               => $rol->id,
                    'name'             => $rol->name,
                    'permission'       => $rol->permissions,
                    'permission_pluck' => $rol->permissions->pluck('name'),
                    'created_at'       => $rol->created_at->format('d-m-Y h:i:s')
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $is_role = Role::where('name', $request->name)->first();

        if ($is_role) {
            return response()->json([
                'message' => Response::HTTP_FORBIDDEN,
                'message_text' => '¡El rol ya existe!'
            ]);
        }

        $role = Role::create([
            'guard_name' => 'api',
            'name' => $request->name
        ]);

        foreach ($request->permissions as $permission) {
            $role->givePermissionTo($permission);
        }
        return response()->json([
            'message' => Response::HTTP_OK
        ]);
    }

    public function show(string $id)
    {
        $role = Role::findOrFail($id);

        return response()->json([
            'id'               => $role->id,
            'name'             => $role->name,
            'permission'       => $role->permissions,
            'permission_pluck' => $role->permissions->pluck('name'),
            'created_at'       => $role->created_at->format('d-m-Y h:i:s')
        ]);
    }

    public function update(Request $request, string $id)
    {
        $is_role = Role::where('id', '<>', $id)->where('name', $request->name)->first();

        if ($is_role) {
            return response()->json([
                'message' => Response::HTTP_FORBIDDEN,
                'message_text' => '¡El rol ya existe!'
            ]);
        }

        $role = Role::findOrFail($id);

        $role->update($request->all());
        $role->syncPermissions($request->permisions);
        return response()->json([
            "message" => Response::HTTP_OK,
        ]);
    }

    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json([
            'message' => Response::HTTP_OK
        ]);
    }
}
