$.getJSON('/json/graph.json', function (data) {

    $.getJSON('/json/performance.json', function (performanceData) {

        $('#view-full-performance-loader').removeClass('ball-clip-rotate');
        $('#view-full-performance').attr('disabled', false);

        var intervalId = setInterval(function() {
            if (Highcharts) {
                clearInterval(intervalId);
                render();
            }
        }, 500);

        var render = () => {
            Highcharts.chart('performance-chart', {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: 'Our performance June 2016 - Jan 2017'
                },
                credits: {
                    enabled: false
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Profits'
                    },
                    labels: {
                        rotation: 0
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },

                series: [{
                    type: 'area',
                    name: 'Profits',
                    data: data
                }]
            });
            
        }

        var renderPerformanceData = function() {
            var years = [{year: 2017, months: [1]}, {year: 2016, months: [12, 11, 10, 9 , 8, 7, 6]}];
            var monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

            years.forEach(function (year) {
                var html = '';
                var yearVal = year.year;
                var monthsVal = year.months;

                monthsVal.forEach(function (month) {
                    html += '<h3>' + monthNames[month - 1] + ' ' + yearVal + '</h3>';
                    html += '<table class="table table-bordered">';
                    html += '<tr>';
                    html += '<th>Date</th>';
                    html += '<th>Currency</th>';
                    html += '<th>BUY/SELL</th>';
                    html += '<th>Open</th>';
                    html += '<th>Stop Loss</th>';
                    html += '<th>1st Take Profit</th>';
                    html += '<th>2nd Take Profit</th>';
                    html += '<th>Profit</th>';
                    html += '<th>Remark</th>';
                    html += '</tr>';

                    var monthData = performanceData[yearVal][month];
                    monthData.forEach(function (md) {
                        html += '<tr>';
                        html += '<td>' + md.date + '</td>';
                        html += '<td>' + md.currency + '</td>';
                        html += '<td>' + md.type + '</td>';
                        html += '<td>' + md.open + '</td>';
                        html += '<td>' + md.sl + '</td>';
                        html += '<td>' + md.tp1 + '</td>';
                        html += '<td>' + md.tp2 + '</td>';
                        html += '<td>' + md.profit + '</td>';
                        html += '<td>' + md.remark + '</td>';
                        html += '</tr>';
                    });

                    html += '</table>';
                });


                $('#performance-' + yearVal).html(html);
            });

            $('.portfolioContainer').isotope();


        }

        renderPerformanceData();

    });

});