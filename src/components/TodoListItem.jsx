import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { RemoveTodo, statusType } from './TodoList'

function TodoListItem({ className, name, status, onComplete, onChange, revertStatus, onRemove }) {
    const previousStatusTitle = statusType[status - 1];
    const nextStatusTitle = statusType[status + 1];
    return (
        <TodoCard className={className}>
            <div>
                <p>{statusType[status]}</p>
            </div>
            <div>
                <p>Move to:</p>
                {status === 1 && <button onClick={revertStatus}>{previousStatusTitle}</button>}
                <button onClick={onComplete}>{nextStatusTitle}</button>
            </div>
            <div>
                <input onChange={onChange} value={name} />
                <RemoveTodo onRemoveTodo={onRemove} />
            </div>
        </TodoCard>
    )
}

const TodoCard = styled.li`
    display: flex;
    background-color: lightgray;
    max-width: 300px;
    margin: .25rem 0;
    border-radius: .25rem;
    padding: 1rem;
    border: 2px solid darkgrey;
`

export default styled(observer(TodoListItem))`
    color: red;
`
