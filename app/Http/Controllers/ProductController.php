<?php

namespace App\Http\Controllers;

use App\Product;
// use Dotenv\Validator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $res = Product::select('id','name','description','ref_img', 'price')->get();
        return response()->json([
            'status' => 'ok',
            'data' => $res
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param array $data
     * @return \Illuminate\Http\Response
     */
    public function create(array $data)
    {
        //Hacer una consulta a la base de datos para guardar el producto
        echo json_encode($data);
        // return Product::create([
        //     'name'=>$data['name'],
        //     'description'=>$data['description'],
        //     'ref_img'=>'not-image-product.jpg',
        //     'number_of_pieces'=>$data['number_of_pieces'],
        //     'price'=>$data['price'],

        // ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $routeImage = '';
        $itIsValid =  Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'ref_img' => ['required', 'image', 'mimes:jpg,jpge,png,gif,svg', 'max:2048' ],
            'number_of_pieces' => ['required', 'integer'],
            'price' => ['required', 'integer'],
        ]);
        
        if($itIsValid->fails() && !$request->file('ref_img')){
            return response()
                    ->json([
                        'status' => 'error',
                        'data' => [
                                'error' => 'required'
                            ]
                        ], 400);
        }
        
        $routeImage = date('d_n_Y_i_s_B').'_'.$request->name.'.'.$request->file('ref_img')->getClientOriginalExtension();
        $routeImage = $request->file('ref_img')->storeAs('public/products', $routeImage);
        $routeImage = str_replace('public/', '', $routeImage);
        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'ref_img' => $routeImage,
            'number_of_pieces' => $request->number_of_pieces,
            'price' => $request->price,
        ]);


        return response()->json([
            'status' => 'ok',
            'data' => 'confirm'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Product::find($id);
        return view('products.product', ['data'=>$data]);
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
