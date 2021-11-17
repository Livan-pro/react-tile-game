import styled from 'styled-components'
import { useReducer } from 'react'
import TileContainer from './TileContainer'
import Tile from './Tile'
import WinInfo from './WinInfo'

export type Action = { type: 'OPEN'; id: number } | { type: 'FINISH_OPENING'; id: number } | { type: 'RESET' }

const availableColors = ['#CD6155', '#52BE80', '#5499C7', '#F4D03F', '#AF7AC5', '#48C9B0', '#EB984E', '#CACFD2']
const getRandomInt = (min: number, max: number) => Math.random() * (max - min) + min

const getInitState = (length: number) => {
  if (length % 2 !== 0) throw new Error('Length should be even!')

  // select first length/2 colors and repeat them 2 times
  const colors = new Array(2).fill(availableColors.slice(0, length / 2)).flat(1)

  // get color by index and remove from colors
  const pickColor = (idx: number) => colors.splice(idx, 1)[0]

  return {
    tiles: new Array(length).fill(0).map(() => ({ color: pickColor(getRandomInt(0, colors.length)), open: false })),
    openQueue: [] as number[],
    win: false,
    time: 0, // start time if win=false, elapsed time otherwise
  }
}

type State = ReturnType<typeof getInitState>

const isOpen = (state: State, id: number) => state.tiles[id].open || state.openQueue.includes(id)

const reducer = (state: State, action: Action): State => {
  if (action.type === 'OPEN') {
    if (isOpen(state, action.id)) return state
    const openQueue = [...state.openQueue, action.id]
    const tiles = [...state.tiles]

    // open tiles if same colors clicked in chain
    for (let i = 0; i < openQueue.length - 1; i += 2) {
      const aIdx = openQueue[i]
      const bIdx = openQueue[i + 1]
      if (tiles[aIdx].color === tiles[bIdx].color) {
        tiles[aIdx] = { ...tiles[aIdx], open: true }
        tiles[bIdx] = { ...tiles[bIdx], open: true }
      }
    }

    const win = tiles.every((t) => t.open)
    let time = state.time === 0 ? -Date.now() : state.time
    if (win) time += Date.now()
    return { tiles, openQueue, win, time }
  }

  if (action.type === 'FINISH_OPENING') {
    const idx = state.openQueue.indexOf(action.id)
    if (idx < 0 || idx % 2 === 0) return state
    const openQueue = [...state.openQueue]
    openQueue.splice(idx - 1, 2)
    return { ...state, openQueue }
  }

  if (action.type === 'RESET') {
    return getInitState(state.tiles.length)
  }

  throw new Error('invalid action type')
}

export default styled(({ className }) => {
  const [state, dispatch] = useReducer(reducer, 16, getInitState)

  const clickTile = (id: number) => dispatch({ type: 'OPEN', id })
  const onOpened = (id: number) => setTimeout(() => dispatch({ type: 'FINISH_OPENING', id }), 250)
  const onReset = () => dispatch({ type: 'RESET' })

  return (
    <div className={className}>
      <WinInfo win={state.win} time={state.time} onReset={onReset} />
      <TileContainer size={4}>
        {state.tiles.map(({ color }, id) => (
          <Tile
            key={id}
            color={color}
            open={isOpen(state, id)}
            persistent={state.tiles[id].open}
            onClick={() => clickTile(id)}
            onTransitionEnd={() => onOpened(id)}
          />
        ))}
      </TileContainer>
    </div>
  )
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 16px;
`
