import React from 'react'
import styled from 'styled-components'
import type { User } from '../model/types'

const Card = styled.div`padding:12px;border:1px solid #e5e7eb;border-radius:12px;margin:8px 0;`
export const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <Card>User: <strong>{user.name}</strong></Card>
)