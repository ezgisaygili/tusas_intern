<?php
include 'connection.php';

$energy1 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.energy1";
$energy2 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.energy2";
$energy3 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.energy3";
$energy4 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.energy4";
$energy5 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.energy5";

$programStatus1 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.progstatus1";
$programStatus2 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.progstatus2";
$programStatus3 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.progstatus3";
$programStatus4 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.progstatus4";
$programStatus5 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.progstatus5";

$performance1 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.performance1";
$performance2 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.performance2";
$performance3 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.performance3";
$performance4 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.performance4";
$performance5 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.performance5";

$stopCondition1 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.stopCond1";
$stopCondition2 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.stopCond2";
$stopCondition3 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.stopCond3";
$stopCondition4 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.stopCond4";
$stopCondition5 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.stopCond5";

$axis1 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.eksen1";
$axis2 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.eksen2";
$axis3 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.eksen3";
$axis4 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.eksen4";
$axis5 = "http://127.0.0.1:39320/iotgateway/read?ids=OEE_Deneme.PLC.eksen5";

$currentTime = date('Y-m-d H:i:s');

function readValue($url)
{
    $json = file_get_contents($url);
    $json_data = json_decode($json, true);
    return $json_data["readResults"][0]["v"];
}

$writeDatabaseBench1 = writeDatabase($conn, $currentTime, $energy1, $programStatus1, $performance1, $stopCondition1, $axis1, "bench1");
$writeDatabaseBench2 = writeDatabase($conn, $currentTime, $energy2, $programStatus2, $performance2, $stopCondition2, $axis2, "bench2");
$writeDatabaseBench3 = writeDatabase($conn, $currentTime, $energy3, $programStatus3, $performance3, $stopCondition3, $axis3, "bench3");
$writeDatabaseBench4 = writeDatabase($conn, $currentTime, $energy4, $programStatus4, $performance4, $stopCondition4, $axis4, "bench4");
$writeDatabaseBench5 = writeDatabase($conn, $currentTime, $energy5, $programStatus5, $performance5, $stopCondition5, $axis5, "bench5");

function writeDatabase($conn, $currentTime, $energyUrl, $programStatusUrl, $performanceUrl, $stopConditionUrl, $axisUrl, $databaseTable)
{
    $energy = readValue($energyUrl);
    $programStatus = readValue($programStatusUrl);
    $performance = readValue($performanceUrl);
    $stopCondition = readValue($stopConditionUrl);
    $axis = readValue($axisUrl);

    $readLastValues = $conn->query("SELECT * FROM $databaseTable ORDER by id DESC LIMIT 1");
    $readLastValue = mysqli_fetch_assoc($readLastValues);

    $lastEnergy = $readLastValue['energy'];
    $lastProgramStatus = $readLastValue['programStatus'];
    $lastPerformance = $readLastValue['performance'];
    $lastStopCondition = $readLastValue['stopCondition'];
    $lastAxis = $readLastValue['axis'];

//    echo $lastEnergy . ' - ' . $energy . '<br>';
//    echo $lastProgramStatus . ' - ' . $programStatus . '<br>';
//    echo $lastPerformance . ' - ' . $performance . '<br>';
//    echo $lastStopCondition . ' - ' . $stopCondition . '<br>';
//    echo $lastAxis . ' - ' . $axis . '<br>';

    if ($energy != $lastEnergy || $programStatus != $lastProgramStatus || $performance != $lastPerformance || $stopCondition != $lastStopCondition || $axis != $lastAxis) {
        $result = $conn->query("INSERT IGNORE INTO $databaseTable (actionTime, energy, programStatus, performance, stopCondition, axis) VALUES ('$currentTime', '$energy', '$programStatus', '$performance', '$stopCondition', '$axis')");
    }
}