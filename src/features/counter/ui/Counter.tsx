import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@shared/ui'
import { dec, inc } from '../model/slice'
import { selectCount } from '../model/selectors'

export const Counter: React.FC = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)

  return (
    <div className="card">
      <div className="row">
        <Button onClick={() => dispatch(dec())}>-</Button>
        <strong style={{minWidth: 40, textAlign: 'center'}}>{count}</strong>
        <Button onClick={() => dispatch(inc())}>+</Button>
      </div>
    </div>
  )
}