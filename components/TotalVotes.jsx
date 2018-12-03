import React from 'react'
import { Slider } from 'antd'

const VotesPercentage = ({ onChange, value, max }) => (
  <div>
    <span>Total votes</span>
    <Slider
      value={value.length ? value : [0, 0]}
      range
      max={max || 100}
      onChange={onChange}
    />
  </div>
)

export default VotesPercentage
