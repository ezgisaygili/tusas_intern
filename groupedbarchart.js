var performanceData1;
var performanceData2;
var performanceData3;
var performanceData4;
var performanceData5;

var availabilityData1;
var availabilityData2;
var availabilityData3;
var availabilityData4;
var availabilityData5;

var oeeData1;
var oeeData2;
var oeeData3;
var oeeData4;
var oeeData5;

$(document).ready(function () {
    writeDataToGroupedBarChart('bench1');
    writeDataToGroupedBarChart('bench2');
    writeDataToGroupedBarChart('bench3');
    writeDataToGroupedBarChart('bench4');
    writeDataToGroupedBarChart('bench5');
    setInterval(function () {
        writeDataToGroupedBarChart('bench1');
        writeDataToGroupedBarChart('bench2');
        writeDataToGroupedBarChart('bench3');
        writeDataToGroupedBarChart('bench4');
        writeDataToGroupedBarChart('bench5');
    }, 45000);
});

function writeDataToGroupedBarChart(benchNo) {
    $.ajax({
        url: "readvaluesfromdatabase.php",
        type: "POST",
        dataType: 'JSON',
        data: { 'benchNo': benchNo },
        success: function (response) {
            var performance = calculatePerformance(response);
            if (performance != 0) {
                if (benchNo == 'bench1') {
                    performanceData1 = performance;
                }
                else if (benchNo == 'bench2') {
                    performanceData2 = performance;
                }
                else if (benchNo == 'bench3') {
                    performanceData3 = performance;
                }
                else if (benchNo == 'bench4') {
                    performanceData4 = performance;
                }
                else if (benchNo == 'bench5') {
                    performanceData5 = performance;
                }
            }

            var availability = calculateAvailability(response);

            if (availability != 0) {
                if (benchNo == 'bench1') {
                    availabilityData1 = availability;
                }
                else if (benchNo == 'bench2') {
                    availabilityData2 = availability;
                }
                else if (benchNo == 'bench3') {
                    availabilityData3 = availability;
                }
                else if (benchNo == 'bench4') {
                    availabilityData4 = availability;
                }
                else if (benchNo == 'bench5') {
                    availabilityData5 = availability;
                }
            }

            var oee = calculateOEE(response);

            if (oee != 0) {
                if (benchNo == 'bench1') {
                    oeeData1 = oee;
                }
                else if (benchNo == 'bench2') {
                    oeeData2 = oee;
                }
                else if (benchNo == 'bench3') {
                    oeeData3 = oee;
                }
                else if (benchNo == 'bench4') {
                    oeeData4 = oee;
                }
                else if (benchNo == 'bench5') {
                    oeeData5 = oee;
                }
            }

            var chartdata = {
                labels: ["Bench-1", "Bench-2", "Bench-3", "Bench-4", "Bench-5"],
                datasets: [
                    {
                        label: "Performance",
                        backgroundColor: "rgba(0, 0, 255, 0.75)",
                        borderColor: "rgba(0, 0, 255, 1)",
                        borderWidth: 1,
                        data: [performanceData1, performanceData2, performanceData3, performanceData4, performanceData5]
                    },
                    {
                        label: "Availability",
                        backgroundColor: "rgba(0, 255, 0, 0.75)",
                        borderColor: "rgba(0, 255, 0, 1)",
                        borderWidth: 1,
                        data: [availabilityData1, availabilityData2, availabilityData3, availabilityData4, availabilityData5]
                    },
                    {
                        label: "OEE",
                        backgroundColor: "rgba(255, 255, 0, 0.75)",
                        borderColor: "rgba(255, 255, 0, 1)",
                        borderWidth: 1,
                        data: [oeeData1, oeeData2, oeeData3, oeeData4, oeeData5]
                    },
                ]
            };

            var ctx = $("#canvas2");

            var groupedBarGraph = new Chart(ctx, {
                type: 'bar',
                data: chartdata,
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Values %',
                            },
                            ticks: {
                                beginAtZero: true,
                                max: 100,
                            },
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Bench No'
                            }
                        }],
                    },
                    responsive: true,
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + textStatus + errorThrown);
        }
    });
}

function calculatePerformance(response) {
    var len = response.length;
    var sum = 0;
    for (var i = 0; i < len; i++) {
        if (response[i].performance != 0) {
            sum += parseInt(response[i].performance);
        }
    }
    var performance = parseInt(sum / len);
    return performance;
}

function calculateAvailability(response) {
    var len = response.length;
    var benchAv = 0;
    for (var i = 0; i < len; i++) {
        if (response[i].energy == 1 && response[i].programStatus != 3) {
            benchAv++;
        }
    }
    var availability = parseInt(benchAv / len * 100);
    return availability;
}

function calculateOEE(response) {
    var len = response.length;

    var benchPerf = 0;
    var benchAv = 0;

    for (var i = 0; i < len; i++) {
        if (response[i].performance != 0) {
            benchPerf += parseInt(response[i].performance);
        }
        if (response[i].energy == 1 && response[i].programStatus != 3) {
            benchAv++;
        }
    }

    var quality = 1;
    var performance = benchPerf / benchAv;
    var availability = benchAv / len;
    var oee = parseInt(quality * performance * availability);
    return oee;
}