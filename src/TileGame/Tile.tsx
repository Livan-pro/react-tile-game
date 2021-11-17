import styled from 'styled-components'

export default styled.button<{ color: string; open: boolean; persistent: boolean }>`
  background-color: ${(props) => (props.open ? props.color : 'grey')};
  transform: rotateY(${(props) => (props.open ? '180deg' : '0deg')});
  transition: transform 250ms linear, background-color 250ms steps(2, jump-none), border-radius 250ms linear,
    margin 250ms linear;

  border-radius: ${(props) => (props.persistent ? '2px' : '8px')};
  margin: ${(props) => (props.persistent ? '2px' : '8px')};
  border: 0;
`
