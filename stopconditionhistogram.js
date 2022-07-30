var stopData1 = [];
var stopData2 = [];
var stopData3 = [];
var stopData4 = [];
var stopData5 = [];

var actionTimeData = [];
var preBench;

var countStopDataPercentages = [];
var countStopDataPercentage1 = [];
var countStopDataPercentage2 = [];
var countStopDataPercentage3 = [];
var countStopDataPercentage4 = [];
var countStopDataPercentage5 = [];

$(document).ready(function () {
    writeDataToHistogram('bench1');
    writeDataToHistogram('bench2');
    writeDataToHistogram('bench3');
    writeDataToHistogram('bench4');
    writeDataToHistogram('bench5');
    setInterval(function () {
        writeDataToHistogram('bench1');
        writeDataToHistogram('bench2');
        writeDataToHistogram('bench3');
        writeDataToHistogram('bench4');
        writeDataToHistogram('bench5');
    }, 45000);
});

function writeDataToHistogram(benchNo) {
    $.ajax({
        url: "readvaluesfromdatabase.php",
        type: "POST",
        dataType: 'JSON',
        data: { 'benchNo': benchNo },
        success: function (response) {
            if (benchNo == 'bench1') {
                stopData1 = [];
            }
            else if (benchNo == 'bench2') {
                stopData2 = [];
            }
            else if (benchNo == 'bench3') {
                stopData3 = [];
            }
            else if (benchNo == 'bench4') {
                stopData4 = [];
            }
            else if (benchNo == 'bench5') {
                stopData5 = [];
            }

            for (var i in response) {

                if (!actionTimeData.includes(response[i].actionTime) || benchNo != preBench) {
                    actionTimeData.push(response[i].actionTime);

                    if (response[i].stopCondition != 0) {
                        if (benchNo == 'bench1') {
                            stopData1.push(response[i].stopCondition);
                            //console.log(stopData1);
                        }
                        else if (benchNo == 'bench2') {
                            stopData2.push(response[i].stopCondition);
                        }
                        else if (benchNo == 'bench3') {
                            stopData3.push(response[i].stopCondition);
                        }
                        else if (benchNo == 'bench4') {
                            stopData4.push(response[i].stopCondition);
                        }
                        else if (benchNo == 'bench5') {
                            stopData5.push(response[i].stopCondition);
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

            var countStopData1 = [];
            var countStopData2 = [];
            var countStopData3 = [];
            var countStopData4 = [];
            var countStopData5 = [];

            for (let i = 0; i < 5; i++) {
                countStopData1[i] = 0;
                countStopData2[i] = 0;
                countStopData3[i] = 0;
                countStopData4[i] = 0;
                countStopData5[i] = 0;
            }

            for (let i = 0; i < stopData1.length; i++) {
                var item = stopData1[i];
                countStopData1[item - 1]++;
            }
            for (let i = 0; i < stopData2.length; i++) {
                var item = stopData2[i];
                countStopData2[item - 1]++;
            }
            for (let i = 0; i < stopData3.length; i++) {
                var item = stopData3[i];
                countStopData3[item - 1]++;
            }
            for (let i = 0; i < stopData4.length; i++) {
                var item = stopData4[i];
                countStopData4[item - 1]++;
            }
            for (let i = 0; i < stopData5.length; i++) {
                var item = stopData5[i];
                countStopData5[item - 1]++;
            }

            preBench = benchNo;

            countStopDataPercentage1 = calculatePercentage(countStopData1);
            countStopDataPercentage2 = calculatePercentage(countStopData2);
            countStopDataPercentage3 = calculatePercentage(countStopData3);
            countStopDataPercentage4 = calculatePercentage(countStopData4);
            countStopDataPercentage5 = calculatePercentage(countStopData5);
            countStopDataPercentages = calculateOverallPercentage(countStopDataPercentage1, countStopDataPercentage2, countStopDataPercentage3, countStopDataPercentage4, countStopDataPercentage5);

            var ctx = $("#canvas3");

            var histogram = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopData1,
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Count',
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Stop Condition'
                            }
                        }],
                    },
                    legend: {
                        display: false
                    },
                }
            });


            var ctx = $("#canvas4");

            var Histogram = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopData2,
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Count',
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Stop Condition'
                            }
                        }],
                    },
                    legend: {
                        display: false
                    },
                }
            });


            var ctx = $("#canvas5");

            var Histogram = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopData3,
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Count',
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Stop Condition'
                            }
                        }],
                    },
                    legend: {
                        display: false
                    },
                }
            });


            var ctx = $("#canvas6");

            var Histogram = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopData4,
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Count',
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Stop Condition'
                            }
                        }],
                    },
                    legend: {
                        display: false
                    },
                }
            });


            var ctx = $("#canvas7");

            var Histogram = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopData5,
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Count',
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Stop Condition'
                            }
                        }],
                    },
                    legend: {
                        display: false
                    },
                }
            });




            var ctx = $("#canvas8");

            var PieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopDataPercentages,
                        borderColor: ['black', 'black', 'black', 'black', 'black'],
                        borderWidth: [1, 1],
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        labels: {
                            render: 'percentage',
                            fontColor: ['white', 'white', 'white', 'white', 'white'],
                            precision: 1,
                        }
                    },
                },
            });

            var ctx = $("#canvas9");

            var PieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopDataPercentage1,
                        borderColor: ['black', 'black', 'black', 'black', 'black'],
                        borderWidth: [1, 1],
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
            });

            var ctx = $("#canvas10");

            var PieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopDataPercentage2,
                        borderColor: ['black', 'black', 'black', 'black', 'black'],
                        borderWidth: [1, 1],
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
            });

            var ctx = $("#canvas11");

            var PieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopDataPercentage3,
                        borderColor: ['black', 'black', 'black', 'black', 'black'],
                        borderWidth: [1, 1],
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
            });

            var ctx = $("#canvas12");

            var PieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopDataPercentage4,
                        borderColor: ['black', 'black', 'black', 'black', 'black'],
                        borderWidth: [1, 1],
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
            });

            var ctx = $("#canvas13");

            var PieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Program Failure", "Breakdown", "Tool Errors", "Program Ended", "Idle"],
                    datasets: [{
                        data: countStopDataPercentage5,
                        borderColor: ['black', 'black', 'black', 'black', 'black'],
                        borderWidth: [1, 1],
                        backgroundColor: ["rgba(0, 0, 255, 0.75)", "rgba(0, 255, 0, 0.75)", "rgba(255, 255, 0, 0.75)", "rgba(255, 0, 0, 0.75)", "rgba(210, 125, 45, 0.75)"]
                    }]
                },
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + textStatus + errorThrown);
        }
    });
}

function calculatePercentage(arr) {
    var newArr = [];
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        console.log(arr[i]);
    }
    for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[i] / sum * 100;
    }
    return newArr;
}

function calculateOverallPercentage(arr1, arr2, arr3, arr4, arr5) {
    var newArr = [];
    var sum = 0;

    for (let i = 0; i < arr1.length; i++) {
        newArr[i] = ((arr1[i] + arr2[i] + arr3[i] + arr4[i] + arr5[i]) / 5);
    }
    return newArr;
}