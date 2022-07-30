var actionTimeData = [];
var benchData = [];

var preBench;
var benchArr = [];

google.charts.load("current", {
    packages: ["timeline"]
}).then(function () {
    writeDataToStackedBarChart('bench1');
    writeDataToStackedBarChart('bench2');
    writeDataToStackedBarChart('bench3');
    writeDataToStackedBarChart('bench4');
    writeDataToStackedBarChart('bench5');

    setInterval(function () {
        writeDataToStackedBarChart('bench1');
        writeDataToStackedBarChart('bench2');
        writeDataToStackedBarChart('bench3');
        writeDataToStackedBarChart('bench4');
        writeDataToStackedBarChart('bench5');
    }, 45000);
});

function writeDataToStackedBarChart(benchNo) {
    $.ajax({
        url: "readvaluesfromdatabase.php",
        type: "POST",
        dataType: 'JSON',
        data: { 'benchNo': benchNo },
        success: function (response) {
            mapData(benchNo, response);

            drawTimelineChart();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + textStatus + errorThrown);
        }
    });
}

function calculateResponseStatus(response) {
    if (response.energy == "1" && response.programStatus != "3") {
        return "Working";
    }
    else {
        if (response.stopCondition == 1) {
            return "Program Failure";
        }
        else if (response.stopCondition == 2) {
            return "Breakdown";
        }
        else if (response.stopCondition == 3) {
            return "Tool Errors";
        }
        else if (response.stopCondition == 4) {
            return "Program Ended";
        }
        else {
            return "Idle";
        }
    }
}

function mapData(benchNo, response) {
    for (let i = 0; i < response.length - 1; i++) {

        if (!actionTimeData.includes(response[i].actionTime) || (benchNo != preBench && benchArr.length < 5)) {
            actionTimeData.push(response[i].actionTime);

            var map = new Map();
            map.set("benchNo", benchNo)
            map.set("status", calculateResponseStatus(response[i]));
            map.set("startTime", response[i].actionTime);
            map.set("endTime", response[i + 1].actionTime);

            benchData.push(map);
        }
    }
    preBench = benchNo;
    benchArr.push(benchNo);
}

function drawTimelineChart() {
    var container = document.getElementById("canvas1");
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({
        type: 'string',
        id: 'Bench'
    });
    dataTable.addColumn({
        type: 'string',
        id: 'Status'
    });
    dataTable.addColumn({
        type: 'datetime',
        id: 'Start'
    });
    dataTable.addColumn({
        type: 'datetime',
        id: 'End'
    });

    for (let i = 0; i < benchData.length; i++) {
        var bench, status, start, end;
        bench = benchData[i].get("benchNo");
        status = benchData[i].get("status");
        start = new Date(benchData[i].get("startTime"));
        end = new Date(benchData[i].get("endTime"));

        if (start < end) {
            dataTable.addRow(
                [bench, status, start, end]
            );
        }
    }
    chart.draw(dataTable);
}