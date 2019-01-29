import React from 'react'
import { StyleSheet, View } from 'react-native'
import Echarts from 'native-echarts'

import data from './data.json'

export default class App extends React.Component {
  render() {
    const temperatures = data.temperatures
    const temperatureRanges = data.temperatureRanges

    const option = {
      grid: {
          top: 36,
          bottom: 36,
      },
      tooltip: {
          show: true,
          trigger: 'item',
          triggerOn: 'mousemove|click',
          formatter: function (params, ticket, callback) {
              if (params.data[1] === undefined) {
                  return null
              }
              const date = new Date(params.data[0])
              const time = date.toLocaleString('pt-BR', {
                hour: 'numeric', minute: 'numeric', hour12: true
              })
              const temperature = params.data[1]
              return `${temperature}&#176;C<br />${time}`
          }
      },
      xAxis: {
          type: 'time',
          name: 'h',
          nameLocation: 'end',
          min: null,
          max: null,
          splitNumber: 6,
          axisLabel: {
              formatter: function (value, index) {
                  return new Date(value).getHours()
              },
          }
      },
      yAxis: {
          type: 'value',
          name: '°C',
          nameLocation: 'end',
      },
      series: [
          {
              name: 'warning',
              type: 'line',
              smooth: true,
              lineStyle: {
                  color: '#1F80A9',
              },
              itemStyle: {
                  color: '#1F80A9',
              },
              symbol: 'circle',
              symbolSize: 6,
              markArea: {
                  itemStyle: {
                      normal: {
                          color: 'rgba(252, 243, 207, 0.75)',
                      },
                  },
                  data: temperatureRanges.warning,
              },
          },
          {
              name: 'good',
              type: 'line',
              smooth: true,
              lineStyle: {
                  color: '#1F80A9',
              },
              itemStyle: {
                  color: '#1F80A9',
              },
              symbol: 'circle',
              symbolSize: 6,
              markArea: {
                  itemStyle: {
                      normal: {
                          color: 'rgba(213, 245, 227, 0.75)',
                      },
                  },
                  data: temperatureRanges.good,
              },
          },
          {
              name: 'Temperatura',
              data: temperatures.reverse(),
              showAllSymbol: 'auto',
              type: 'line',
              smooth: true,
              lineStyle: {
                  color: '#1F80A9',
              },
              itemStyle: {
                  color: '#1F80A9',
              },
              symbol: 'circle',
              symbolSize: 8,
              markArea: {
                  itemStyle: {
                      normal: {
                          color: 'rgba(250, 219, 216, 0.75)',
                      },
                  },
                  data: temperatureRanges.danger,
              },
          },
      ],
    }

    return (
      <View style={styles.container}>
        <Echarts
          option={option}
          // height={this.state.screen.height - 56 - 56 - 24}
          // width={this.state.screen.width}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
