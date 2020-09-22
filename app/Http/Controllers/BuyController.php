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
        if(!Auth::check()){
            return response()->json([
                'status' => 'error',
                'data' => 'no sesion'
            ], 401);
        }

        $purchases = DB::table('purchases')
                        ->where('purchases.user_id', Auth::id())
                        ->join('products', 'purchases.product_id', '=', 'products.id')
                        ->select('purchases.number_of_pieces', 'purchases.price', 'products.name')
                        ->get();
        // $purchases = DB::table('purchases')
        //                 ->where('purchases.user_id', Auth::id())
        //                 ->select('purchases.number_of_pieces', 'purchases.price')
        //                 ->get();

        return response()->json([
            'status' => 'ok',
            'data' => $purchases
        ], 200);


        

          
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
        $statusCode = 400;
        $status = 'err';
        $data = [
            'error' => 'no-create',
            'error' => 'no-stock'
        ];
        
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

        $purchase = DB::table('purchases')->insert([
            'number_of_pieces' => $request->cantidad,
            'price' => $request->total,
            'product_id' => $request->idProducto,
            'user_id' => Auth::id()

        ]);
        $product = DB::table('products')
                        ->where([
                            ['id', '=', $request->idProducto],
                            ['number_of_pieces', '<>', 0],
                            ['number_of_pieces', '>', $request->cantidad]
                        ])
                        ->decrement('number_of_pieces', $request->cantidad);
        
        
        if($purchase && $product){
            $statusCode = 200;
            $status = 'ok';
            $data = [
                'success' => 'crete-product',
                'success' => 'stock'
            ];
        }

        return response()->json([
            'status' => $status,
            'data' => $data
        ],$statusCode);
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
