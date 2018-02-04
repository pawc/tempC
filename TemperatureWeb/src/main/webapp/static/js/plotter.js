var chart;
var minPrimary;
var maxPrimary;

function plot(response){	
	
	generatedDataPoints = [];
	generatedDataPointsNull = [];
	len = response.results.length;
	
	for(var i = 0; i < len; i++){
		generatedDataPoints.push({
			y : response.results[i].tempC,
			x : new Date(response.results[i].timestamp)
		})
		
	}
	
	for(var i = 0; i < len; i++){
		generatedDataPointsNull.push({
			y : null,
			x : new Date(response.results[i].timestamp)
		})
		
	}
	
	minPrimary = response.min;
	maxPrimary = response.max;
	span = maxPrimary - minPrimary;
	if(span == 0) span = 1;
	minPrimary = minPrimary-0.1*span;
	maxPrimary = maxPrimary+0.1*span;

		 
	chart = new CanvasJS.Chart("chartContainer", {
		axisX: {
			valueFormatString: "DDD HH:mm"
		},
		axisY: {
			title : "temperature C",
			minimum: minPrimary,
			maximum: maxPrimary
		},
		axisY2: {
			title : "humidity",
		},
		backgroundColor: "#d0f4bc",
		data: [              
			{
				type: "line",
				showInLegend: true,
				legendText: response.owner,
				dataPoints: generatedDataPoints
			},
			{
				type: "line",
				showInLegend: false,
				axisYType: "secondary",
				legendText: "humidity",
				dataPoints: generatedDataPointsNull
			}],
	});
	chart.render();
	
}

function updateChart(response){
	
	generatedDataPoints = [];
	len = response.results.length;
	
	for(var i = 0; i < len; i++){
		generatedDataPoints.push({
			y : response.results[i].tempC,
			x : new Date(response.results[i].timestamp)
		})
		
	}
	
    var newSeries = {
		type: "line",
		showInLegend: true,
		axisYType: "secondary",
		legendText: response.owner,
		dataPoints: generatedDataPoints
    };
    
	chart.options.data.push(newSeries);
	//updateMinMaxPrimary(response);
	chart.render();
}

function updateMinMaxPrimary(response){
	minTemp = response.min;
	maxTemp = response.max;
	
	if(minPrimary > minTemp) minPrimary = minTemp;
	if(maxPrimary < maxTemp) maxPrimary = maxTemp;
		
	span = maxPrimary - minPrimary;
	if(span == 0) span = 1;
	
	chart.options.axisY.minimum = minPrimary - span * 0.1;
	chart.options.axisY.maximum = maxPrimary + span * 0.1;
}

function clearChart(){
	for(var i=chart.data.length-1; i >= 0; i--){
		chart.data[i].remove();
	}
	min = Number.POSITIVE_INFINITY;
	max = Number.NEGATIVE_INFINITY;
	chart.render();
}