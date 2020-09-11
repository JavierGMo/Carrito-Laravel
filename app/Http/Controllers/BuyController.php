<?php

namespace App\Http\Controllers;
use App\Buy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BuyController extends Controller
{

    public function __construct()
    {
        // $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        if(!Auth::check()){
            return response()->json([
                'status' => 'error',
                'data' => 'no sesion'
            ], 401);
        }
        $itIsValidate = Validator::make($request->all(), [
            'cantidad' => ['required', 'integer'],
            'total' => ['required', 'integer'],
        ]);

        if($itIsValidate->fails()){
            return response()->json([
                'status' => 'error',
                'data' => 'requerid'
            ], 400);
        }

        $product = DB::table('purchases')->insert([
            'number_of_pieces' => $request->cantidad,
            'price' => $request->total,
            'product_id' => $request->idProducto,
            'user_id' => Auth::id()

        ]);
        

        return response()->json([
            'status'=>'ok',
            'data'=>$request->all()
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
