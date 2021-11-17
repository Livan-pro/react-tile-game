import styled from 'styled-components'
import TileGame from './TileGame/TileGame'

export default styled(({ className }) => {
  return (
    <div className={className}>
      <TileGame />
    </div>
  )
})`
  background-color: #282c34;
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  color: white;
`
