var performanceData1 = [];
var performanceData2 = [];
var performanceData3 = [];
var performanceData4 = [];
var performanceData5 = [];

var actionTimeData = [];
var preBench;

$(document).ready(function () {
    writeDataToLineChartPerformance('bench1');
    writeDataToLineChartPerformance('bench2');
    writeDataToLineChartPerformance('bench3');
    writeDataToLineChartPerformance('bench4');
    writeDataToLineChartPerformance('bench5');
    setInterval(function () {
        writeDataToLineChartPerformance('bench1');
        writeDataToLineChartPerformance('bench2');
        writeDataToLineChartPerformance('bench3');
        writeDataToLineChartPerformance('bench4');
        writeDataToLineChartPerformance('bench5');
    }, 45000);
});

function writeDataToLineChartPerformance(benchNo) {
    $.ajax({
        url: "readvaluesfromdatabase.php",
        type: "POST",
        dataType: 'JSON',
        data: { 'benchNo': benchNo },
        success: function (response) {

            for (var i in response) {

                if (!actionTimeData.includes(response[i].actionTime) || benchNo != preBench) {
                    actionTimeData.push(response[i].actionTime);

                    if (response[i].performance != 0) {
                        if (benchNo == 'bench1') {
                            performanceData1.push(response[i].performance);
                        }
                        else if (benchNo == 'bench2') {
                            performanceData2.push(response[i].performance);
                        }
                        else if (benchNo == 'bench3') {
                            performanceData3.push(response[i].performance);
                        }
                        else if (benchNo == 'bench4') {
                            performanceData4.push(response[i].performance);
                        }
                        else if (benchNo == 'bench5') {
                            performanceData5.push(response[i].performance);
                        }
                    }
                }
            }

            var actionTimeDataIndexes = [];

            var len = actionTimeData.length;

            var firstIndex = 0;
            var index = 0;
            for (let i = 0; i < 9; i++) {
                if (i == 0) {
                    firstIndex = parseInt(len / 10);
                    actionTimeDataIndexes.push(actionTimeData[firstIndex]);
                }
                else {
                    index = firstIndex * (i + 1);
                    actionTimeDataIndexes.push(actionTimeData[index]);
                }
            }

            actionTimeDataIndexes.sort();

            preBench = benchNo;

            var chartdata = {
                labels: actionTimeDataIndexes,
                datasets: [
                    {
                        label: "bench1",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(0, 0, 255, 0.75)",
                        borderColor: "rgba(0, 0, 255, 1)",
                        pointHoverBackgroundColor: "rgba(0, 0, 255, 1)",
                        pointHoverBorderColor: "rgba(0, 0, 255, 1)",
                        data: performanceData1
                    },
                    {
                        label: "bench2",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(0, 255, 0, 0.75)",
                        borderColor: "rgba(0, 255, 0, 1)",
                        pointHoverBackgroundColor: "rgba(0, 255, 0, 1)",
                        pointHoverBorderColor: "rgba(0, 255, 0, 1)",
                        data: performanceData2
                    },
                    {
                        label: "bench3",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255, 255, 0, 0.75)",
                        borderColor: "rgba(255, 255, 0, 1)",
                        pointHoverBackgroundColor: "rgba(255, 225, 0, 1)",
                        pointHoverBorderColor: "rgba(255, 255, 0, 1)",
                        data: performanceData3
                    },
                    {
                        label: "bench4",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(225, 0, 0, 0.75)",
                        borderColor: "rgba(225, 0, 0, 1)",
                        pointHoverBackgroundColor: "rgba(225, 0, 0, 1)",
                        pointHoverBorderColor: "rgba(225, 0, 0, 1)",
                        data: performanceData4
                    },
                    {
                        label: "bench5",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(210, 125, 45, 0.75)",
                        borderColor: "rgba(210, 125, 45, 1)",
                        pointHoverBackgroundColor: "rgba(210, 125, 45, 1)",
                        pointHoverBorderColor: "rgba(210, 125, 45, 1)",
                        data: performanceData5
                    },
                ]
            };

            var ctx = $("#canvas1");

            var lineGraph = new Chart(ctx, {
                type: 'line',
                data: chartdata,
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Performance %',
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Time'
                            }
                        }],
                    }
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + textStatus + errorThrown);
        }
    });
}