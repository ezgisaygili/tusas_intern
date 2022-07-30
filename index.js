$(document).ready(function () {
    setInterval(function () {
        writeDataToDatabase();
        writeDataToDatabase();
        writeDataToDatabase();
        writeDataToDatabase();
        writeDataToDatabase();
    }, 1000);

    setInterval(function () {
        writeDataToTable('bench1');
        writeDataToTable('bench2');
        writeDataToTable('bench3');
        writeDataToTable('bench4');
        writeDataToTable('bench5');
    }, 1000);

    setInterval(function () {
        writeDataOnCards('bench1');
        writeDataOnCards('bench2');
        writeDataOnCards('bench3');
        writeDataOnCards('bench4');
        writeDataOnCards('bench5');
    }, 1000);

});

function writeDataToTable(benchNo) {
    $.ajax({
        url: 'readvaluesfromdatabase.php',
        type: 'POST',
        dataType: 'JSON',
        data: {'benchNo': benchNo},
        success: function (response) {

            var len = response.length;
            var benchPerf = 0;
            var benchAv = 0;

            for (var i = 0; i < len; i++) {
                if(response[i].performance != 0) {
                    benchPerf += parseInt(response[i].performance); 
                }
                if(response[i].energy == 1 && response[i].programStatus != 3) {
                    benchAv++;
                }             
            } 
            
            var quality = 1;
            var performance = benchPerf / benchAv;
            var availability = benchAv / len;
            var oee = parseInt(quality * performance * availability); 

            if(benchNo == 'bench1') {
                $('#bench1OEE').text("OEE: %");
                $('#bench1OEE').append(oee);
            } 
            else if(benchNo == 'bench2') {
                $('#bench2OEE').text("OEE: %");
                $('#bench2OEE').append(oee);
            }
            else if(benchNo == 'bench3') {
                $('#bench3OEE').text("OEE: %");
                $('#bench3OEE').append(oee);
            }  
            else if(benchNo == 'bench4') {
                $('#bench4OEE').text("OEE: %");
                $('#bench4OEE').append(oee);
            }
            else{
                $('#bench5OEE').text("OEE: %");
                $('#bench5OEE').append(oee);
            } 
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + textStatus + errorThrown);
        }
    });
}

function writeDataToDatabase() {
    $.ajax({
        url: 'readvaluesfromkepserver.php',
        type: 'POST',
        dataType: 'JSON',
        data: {},
        success: function (response) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + textStatus + errorThrown);
        }
    });
}

function writeDataOnCards(benchNo) {
    $.ajax({
        url: 'livefromkepserver.php',
        type: 'POST',
        dataType: 'JSON',
        data: {'benchNo': benchNo},
        success: function (response) {

            var stopCond = calculateStopCondition(response);

            if(response.benchNo == 'bench1') {
                if(response.currentStatus == 1) {
                    $('#bench1Card').css('background-color', 'green');
                    $('#bench1Status').text("Working");
                }
                else {
                    $('#bench1Card').css('background-color', 'red');
                    $('#bench1Status').text(stopCond);
                }
            }
            else if(response.benchNo == 'bench2') {
                if(response.currentStatus == 1) {
                    $('#bench2Card').css('background-color', 'green');
                    $('#bench2Status').text("Working");
                }
                else {
                    $('#bench2Card').css('background-color', 'red');
                    $('#bench2Status').text(stopCond);
                }
            }
            else if(response.benchNo == 'bench3') {
                if(response.currentStatus == 1) {
                    $('#bench3Card').css('background-color', 'green');
                    $('#bench3Status').text("Working");
                }
                else {
                    $('#bench3Card').css('background-color', 'red');
                    $('#bench3Status').text(stopCond);
                }
            }
            else if(response.benchNo == 'bench4') {
                if(response.currentStatus == 1) {
                    $('#bench4Card').css('background-color', 'green');
                    $('#bench4Status').text("Working");
                }
                else {
                    $('#bench4Card').css('background-color', 'red');
                    $('#bench4Status').text(stopCond);
                }
            }
            else{
                if(response.currentStatus == 1) {
                    $('#bench5Card').css('background-color', 'green');
                    $('#bench5Status').text("Working");
                }
                else {
                    $('#bench5Card').css('background-color', 'red');
                    $('#bench5Status').text(stopCond);
                }
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + textStatus + errorThrown);
        }
    });
}

function calculateStopCondition(response) {
    var x = response.currentStopCondition;
    var resp;
    if(x ==1){
        resp = "Program Failure";
    }
    else if(x==2){
        resp = "Breakdown";
    }
    else if(x==3){
        resp = "Tool Errors";
    }
    else if(x==4){
        resp = "Program Ended";
    }
    else{
        resp = "Idle";
    }
    return resp;
}