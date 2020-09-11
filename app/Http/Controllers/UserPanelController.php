<?php

namespace App\Http\Controllers;

use App\User;
// use Dotenv\Validator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserPanelController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $user = Auth::user();

        return view('userprofile.userpanel', [
            'id'=>$user->id,
            'name'=>$user->name,
            'last_name'=>$user->last_name,
            'created_at'=>$user->created_at
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Cambio de contraseña
        
        $itIsValidate = Validator::make($request->all(), [
            'password' => ['required', 'string', 'min:8'],
        ]);
        if($itIsValidate->fails()) return response()->json([
            'status' => 'error',
            'data' => 'No valido'
        ], 400);

        $userUpdate = User::find($id);
        $userUpdate->password = Hash::make($request->password);
        $userUpdate->save();
        // $update = $userUpdate->update($request->all(),[
        //     'password' => Hash::make($request->password)
        // ]);
        
        // if(!$update) return response()->json([
        //     'status' => 'error',
        //     'data' => 'Algo salio mal'
        // ], 500);

        return response()->json([
            'status' => 'ok',
            'data' => 'Contraseña actualizada'
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        //Borrar cuenta
        
        // $pass = Hash::make($request->password);
        $data = [
            'status' => 'error',
            'data' => 'Error',
            'code' => 400
        ];

        // $res = User::find($id)
        //             ->where('password', $pass)
        //             ->delete();
        $itIsAuth = Hash::check($request->password, Auth::user()->password);
        // if($res){
        //     return redirect()->route('home');
        // }
        if($itIsAuth){
            User::find($id)
                ->delete();
            $data['status'] = 'ok';
            $data['data'] = 'Borrado';
            $data['code'] = 200;
        }
        return response()->json([
            $data['status'],
            $data['data']
        ], $data['code']);
    }
}
