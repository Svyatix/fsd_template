import React from 'react'
import styled from 'styled-components'

const Root = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  &:hover { background: #f9fafb; }
`

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button: React.FC<Props> = ({ children, ...rest }) => <Root {...rest}>{children}</Root>