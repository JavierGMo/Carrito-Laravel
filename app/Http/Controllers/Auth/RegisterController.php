<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Error;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::LOGEAR;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        // var_dump($data);
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'user_name' => ['required', 'string', 'max:255', 'unique:users'],
            'ref_img' => ['image', 'mimes:jpeg,jpg,jpe,png,gif', 'dimensions:max_width=800,max_height=1400', 'max:1024'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $routeImage = '';
        $request = app('request');

        echo $request;

        if(!$request->hasfile('ref_img')){
            $routeImage = 'userspicsprofiles/default.png';
        }else{
            $routeImage = date('d_n_Y_i_s_B').'_'.$data['user_name'].'.'.$request->file('ref_img')->getClientOriginalExtension();
            $routeImage = $request->file('ref_img')->storeAs('public/userspicsprofiles', $routeImage);
            $routeImage = str_replace('public/', '', $routeImage);
        }
        



        return User::create([
            'name' => $data['name'],
            'last_name' => $data['last_name'],
            'user_name' => $data['user_name'],
            'ref_img' => $routeImage,
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // return response()->json([
        //     'status' => 'ok',
        //     'data' => [
        //         $request->all(),
        //         $routeImage
        //     ]
        // ], 200);

    }
}
