<?php

if (isset($_POST['benchNo'])) {
    $benchNo = $_POST['benchNo'];
    $benchData = getDataFromDatabase($benchNo);
}

function getDataFromDatabase($benchNo) {
    include 'connection.php';
    $resultArray = $conn -> query('SELECT * FROM ' . $benchNo);
    $jsonArray = array();

    while ($result = mysqli_fetch_assoc($resultArray)) {
        $jsonArray[] = $result;
    }
    echo json_encode($jsonArray);
}

?> 
