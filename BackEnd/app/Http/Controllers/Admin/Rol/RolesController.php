<?php

namespace App\Http\Controllers\Admin\Rol;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Role;

use function PHPUnit\Framework\returnSelf;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
                    'id'               => $rol,
                    'name'             => $rol->name,
                    'permission'       => $rol->permissions,
                    'permission_pluck' => $rol->permissions->pluck('name'),
                    'created_at'       => $rol->created_at->format('d-m-Y h:i:s')
                ];
            })
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $is_role = Role::where('name',$request->name)->first();

        if ($is_role) {
            return response()->json([
                'message' => Response::HTTP_FORBIDDEN,
                'message_text' => 'El rol ya existe' 
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $is_role = Role::where('id','<>',$id)->where('name',$request->name)->first();

        if ($is_role) {
            return response()->json([
                'message' => Response::HTTP_FORBIDDEN,
                'message_text' => 'El rol ya existe' 
            ]);
        }

        $role = Role::findOrFail($id);
        $role->update($request->all());
        $role->syncPermissionTo($request->permissions);

        return response()->json([
            'message' => Response::HTTP_OK
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json([
            'message' => Response::HTTP_OK
        ]);
    }
}
