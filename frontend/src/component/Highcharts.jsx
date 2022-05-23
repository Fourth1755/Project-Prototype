import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const HighchartsAnime = (props) =>{
    const { data } = props
    const episodesEachAnime = data.map((e)=>e.episodes)
    const nameEachAnime =data.map((e)=>e.name)
    const configObj ={
        chart: {
            type: 'bar',
            height:800
        },
        title: {
            text: 'Historic World Population by Region'
        },
        xAxis: {
            categories: nameEachAnime,
            title: {
                text: null
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        colors: ['#000000', '#655FCD', '#B3AFEB'],
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: -10,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Episodes',
            data: episodesEachAnime
            }//, {
        //     name: 'Year 1900',
        //     data: [133, 156, 947, 408, 6]
        // }, {
        //     name: 'Year 2000',
        //     data: [814, 841, 714, 727, 31]
        // }
    ]
    }
    return(
        <HighchartsReact
            highcharts={Highcharts}
            options={configObj}
        />
    )
}
export default HighchartsAnime