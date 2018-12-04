import React from 'react'
import { Slider } from 'antd'

const VotesPercentage = ({ onChange, value, max }) => (
  <div>
    <span>Total votes</span>
    <Slider value={value} range max={max} onChange={onChange} />
  </div>
)

export default VotesPercentage
