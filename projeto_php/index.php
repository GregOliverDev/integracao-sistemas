<?php
const SUCESS = TRUE;
const FAIL = FALSE;
const HTTP_CODE_OK = 200;
const HTTP_CODE_BAD_REQUEST = 500;
const HTTP_CODE_NOT_FOUND = 404;
const DEFAULT_EXEPTION_CODE = 1;

try {

    $response = [];
    if ($_SERVER['REQUEST_METHOD'] !== "POST") {
        throw new Exception("Only route POST is permition", HTTP_CODE_BAD_REQUEST);
    }
    if ($_SERVER['REQUEST_URI'] !== "/") {
        throw new Exception("This route is not defined", HTTP_CODE_NOT_FOUND);
    }

    $body = json_decode(file_get_contents("php://input"));
    $conection = new PDO(
        "mysql:host=localhost;dbname=users",
        "root",
        "0110G"
    );

    $sql = "INSERT INTO users (name, lastname, age) VALUES (:name, :lastname, :age)";
    $stmt = $conection->prepare($sql);
    $stmt->execute([
        ":name" => $body->name,
        ":lastname" => $body->lastname,
        ":age" =>  $body->age
    ]);

    //var_dump($conection);die();
    //var_dump($body->lastname);die();

    http_response_code(response_code: HTTP_CODE_OK);
    $response["sucess"] = SUCESS;
} catch (Exception $e) {
    $exceptionCode = $e->getCode();
    http_response_code(response_code: $exceptionCode == DEFAULT_EXEPTION_CODE
        ? HTTP_CODE_BAD_REQUEST : $exceptionCode);
    $response["sucess"] = FAIL;
    $response["message"] = $e->getMessage();
}

header("Content-type: applicatio/json; charset=utf-8");

echo json_encode($response);