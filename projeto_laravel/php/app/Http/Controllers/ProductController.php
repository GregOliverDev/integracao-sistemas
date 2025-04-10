<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ProductController extends Controller
{
    public function getProd()
    {
        $client = new Client();
        $responseApi = $client->get("localhost:3000/products");
        $response = json_decode($responseApi->getBody());
        $response = array_map(function ($item) {
            return [
                'Carro' => "{$item->name} - $item->name",
            ];
        }, $response);
        return response()->json(
            ['msg' => 'from of product controller', 'data' => $response]
        );
    }
}
