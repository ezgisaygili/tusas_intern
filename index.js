$(document).ready(function () {
    setInterval(function () {
        writeDataToDatabase('bench1');
        writeDataToDatabase('bench2');
        writeDataToDatabase('bench3');
        writeDataToDatabase('bench4');
        writeDataToDatabase('bench5');
    }, 5000);

    setInterval(function () {
        writeDataToTable('bench1');
        writeDataToTable('bench2');
        writeDataToTable('bench3');
        writeDataToTable('bench4');
        writeDataToTable('bench5');
    }, 5000);

    setInterval(function () {
        writeDataOnCards();
    }, 5000);

});

function writeDataToTable(benchNo) {
    $.ajax({
        url: 'readvaluesfromdatabase.php',
        type: 'POST',
        dataType: 'JSON',
        data: {'benchNo': benchNo},
        success: function (response) {
            /*console.log(response);
            var bench1Energy = response[0].energy;
            var bench1ProgramStatus = response[0].programStatus;
            var bench1programStatus = response[0].programStatus;
            var bench1Performance = response[0].performance;
            var bench1stopCondition = response[0].stopCondition;
            var bench1axis = response[0].axis;
            if (bench1Energy == '1') {
                $('#bench1Card').css('background-color', 'green');
                $('#bench1Status').text(bench1Performance);
            }
            else {
                $('#bench1Card').css('background-color', 'white');
            }
            //console.log(bench1Performance);
            $('#bench1OEE').text(bench1Performance);*/
            /* var len = response.length;
             for (var i = 0; i < len; i++) {
                 var actionTime = response[i].actionTime;
                 var energy = response[i].energy;
                 var programStatus = response[i].programStatus;
                 var performance = response[i].performance;
                 var stopCondition = response[i].stopCondition;
                 var axis = response[i].axis;
 
                 var tr_str = "<tr>" +
                     "<td align='center'>" + (i + 1) + "</td>" +
                     "<td align='center'>" + actionTime + "</td>" +
                     "<td align='center'>" + energy + "</td>" +
                     "<td align='center'>" + programStatus + "</td>" +
                     "<td align='center'>" + performance + "</td>" +
                     "<td align='center'>" + stopCondition + "</td>" +
                     "<td align='center'>" + axis + "</td>" +
                     "</tr>";
 
                 //$("#benchTable1 tbody").append(tr_str);                    
             }*/
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



function writeDataOnCards() {
    $.ajax({
        url: 'livefromkepserver.php',
        type: 'POST',
        dataType: 'JSON',
        data: {'benchNo': benchNo},
        success: function (response) {
            if(benchNo == 'bench1') {
                if(response.currentStatus == 1) {
                    $('#bench1Card').css('background-color', 'green');
                    $('#bench1Status').text("Working");
                }
                else {
                    $('#bench1Card').css('background-color', 'red');
                    $('#bench1Status').text("Stop condition: " . response.currentStopCondition);
                }
            }
            else if(benchNo == 'bench2') {
                if(response.currentStatus == 1) {
                    $('#bench2Card').css('background-color', 'green');
                    $('#bench2Status').text("Working");
                }
                else {
                    $('#bench2Card').css('background-color', 'red');
                    $('#bench2Status').text("Stop condition: " . response.currentStopCondition);
                }
            }
            else if(benchNo == 'bench3') {
                if(response.currentStatus == 1) {
                    $('#bench3Card').css('background-color', 'green');
                    $('#bench3Status').text("Working");
                }
                else {
                    $('#bench3Card').css('background-color', 'red');
                    $('#bench3Status').text("Stop condition: " . response.currentStopCondition);
                }
            }
            else if(benchNo == 'bench4') {
                if(response.currentStatus == 1) {
                    $('#bench4Card').css('background-color', 'green');
                    $('#bench4Status').text("Working");
                }
                else {
                    $('#bench4Card').css('background-color', 'red');
                    $('#bench4Status').text("Stop condition: " . response.currentStopCondition);
                }
            }
            else{
                if(response.currentStatus == 1) {
                    $('#bench5Card').css('background-color', 'green');
                    $('#bench5Status').text("Working");
                }
                else {
                    $('#bench5Card').css('background-color', 'red');
                    $('#bench5Status').text("Stop condition: " . response.currentStopCondition);
                }
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + textStatus + errorThrown);
        }
    });

}