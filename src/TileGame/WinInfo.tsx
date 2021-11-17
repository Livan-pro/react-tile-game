import { FC } from 'react'
import styled from 'styled-components'
import Button from './Button'

export default styled<FC<{ className?: string; onReset: () => void; win: boolean; time: number }>>(
  ({ className, time, onReset }) => {
    return (
      <div {...{ className }}>
        <div>WIN! Elapsed time: {(time / 1000).toFixed(3)} s</div>
        <Button onClick={onReset}>Try again</Button>
      </div>
    )
  }
)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 1.5em;
  gap: 32px;
  max-height: ${(props) => (props.win ? '200px' : '0px')};

  transition: max-height 1s ease;
`
