$.getJSON('/json/performance', function (performanceData) {

    $('.view-full-performance-loader').removeClass('ball-clip-rotate');
    $('#view-full-performance').attr('disabled', false);

    var renderPerformanceData = function() {
        var years = Object.keys(performanceData);
        var data = years.map(function (year) {
            var months = Object.keys(performanceData[year]);
            return {
                year: year,
                months: months
            }
        });
        var monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        data.forEach(function (year) {
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

                var monthlyProfit = 0;
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
                    monthlyProfit += Number(md.profit);
                });

                html += '<tr>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td>' + monthlyProfit + '</td>';
                html += '<td>Total Profit</td>';
                html += '</tr>';

                html += '</table>';
            });


            $('#performance-' + yearVal).html(html);
        });

        $('.portfolioContainer').isotope();


    }

    renderPerformanceData();

});

