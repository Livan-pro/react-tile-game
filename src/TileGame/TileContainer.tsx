import styled from 'styled-components'

export default styled(({ className, children }) => <div className={className}>{children}</div>)`
  width: 100vw;
  max-width: 720px;
  height: 100vw;
  max-height: 720px;
  padding: 16px;
  display: grid;
  grid-template-rows: repeat(${(props) => props.size}, 1fr);
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
`
