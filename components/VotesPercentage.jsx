import React from 'react'
import { Slider } from 'antd'

function formatter(value) {
  return `${value}%`
}

const VotesPercentage = ({ onChange, value }) => (
  <div>
    <span>Votes with party percentage</span>
    <Slider value={value} range tipFormatter={formatter} onChange={onChange} />
  </div>
)

export default VotesPercentage
