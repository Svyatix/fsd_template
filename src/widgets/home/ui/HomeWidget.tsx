import React from 'react'
import styled from 'styled-components'
import { Counter } from '@features/counter'
import { UserCard } from '@entities/user'

const Title = styled.h1`margin: 0 0 12px 0;`
const Box = styled.div`display:flex;flex-direction:column;gap:12px;`

export const HomeWidget: React.FC = () => (
  <Box>
    <Title>MF Home</Title>
    <UserCard user={{ id: '1', name: 'Ada Lovelace' }} />
    <Counter />
  </Box>
)