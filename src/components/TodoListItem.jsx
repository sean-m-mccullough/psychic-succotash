import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { RemoveTodo } from './TodoList'


function TodoListItem({ className, name, onComplete, onChange, onRemove }) {
    return (
        <li className={className}>
            <button onClick={onComplete}>Done?</button>
            <input onChange={onChange} value={name} />
            <RemoveTodo onRemoveTodo={onRemove} />
        </li>
    )
}

export default styled(observer(TodoListItem))`
    color: red;
`
