<?php

if (isset($_POST['benchNo'])) {
    $benchNo = $_POST['benchNo'];

    $currentStatus = 2;
    $currentStopCondition = 0;

    $benchData = getDataFromKepserver($benchNo);

    $arr = array(
        'benchNo' => $benchNo,
        'currentStatus' => $currentStatus,
        'currentStopCondition' => $currentStopCondition
     );

    echo json_encode($arr);
}


function getDataFromKepserver($benchNo) {
    include 'readvaluesfromkepserver.php';
    if($benchNo == 'bench1') {
        $cardData1 = calculateStatus($energy1, $programStatus1, $stopCondition1);
    }
    else if($benchNo == 'bench2') {
        $cardData2 = calculateStatus($energy2, $programStatus2, $stopCondition2);
    }
    else if($benchNo == 'bench3') {
        $cardData3 = calculateStatus($energy3, $programStatus3, $stopCondition3);
    }
    else if($benchNo == 'bench4') {
        $cardData4 = calculateStatus($energy4, $programStatus4, $stopCondition4);
    }
    else {
        $cardData5 = calculateStatus($energy5, $programStatus5, $stopCondition5);
    }
}


function calculateStatus($energyUrl, $programStatusUrl, $stopCondition) {
    $energy = readValue($energyUrl);
    $programStatus = readValue($programStatusUrl);
    $stopCondition = readValue($stopCondition);
    if($energy == 1 && $programStatus != 3) {
        global $currentStatus;
        $currentStatus = 1;
    }
    else {
        global $currentStatus;
        $currentStatus = 0;
        global $currentStopCondition;
        $currentStopCondition = $stopCondition;
    }

}