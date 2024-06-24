import React from 'react'
import{ Doughnut } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

const DoughnutChart = ({data}) => {
  return (
    <Doughnut data={data}/>
  )
}

export default DoughnutChart