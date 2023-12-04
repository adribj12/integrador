<?php

header("Content-Type: application/json");

$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "dbecommerce";|

$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        handleGetRequest($conn);
        break;
    case "POST":
        handlePostRequest($conn);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

function handleGetRequest($conn) {
    $id = isset($_GET["idProducto"]) ? intval($_GET["idProducto"]) : null;

    if ($id !== null) {
        $receta = findRecetaById($conn, $id);

        if ($receta !== null) {
            echo json_encode($receta);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Receta no encontrada"]);
        }
    } else {
        $recetas = getAllRecetas($conn);
        echo json_encode($recetas);
    }
}

function handlePostRequest($conn) {
    http_response_code(501);
    echo json_encode(["error" => "Funcionalidad no implementada"]);
}

function findRecetaById($conn, $id) {
    $stmt = $conn->prepare("SELECT * FROM productos WHERE idProducto = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    }

    return null;
}

function getAllRecetas($conn) {
    $result = $conn->query("SELECT * FROM Productos");

    $recetas = [];

    while ($row = $result->fetch_assoc()) {
        $recetas[] = $row;
    }

    return $recetas;
}

$conn->close();
?>