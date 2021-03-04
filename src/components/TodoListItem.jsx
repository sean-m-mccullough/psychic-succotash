import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { storesContext } from  '../store/TodoStore'

import Input from './Input'
import Button from './Button'
import { RemoveTodo } from './TodoList'

export const useTodoStores = () => React.useContext(storesContext)

function TodoListItem({ className, name, status, onComplete, onChange, revertStatus, onRemove }) {
    const { TodoStore } = useTodoStores()

    const previousStatusName = TodoStore.statusName(status - 1)
    const nextStatusName = TodoStore.statusName(status + 1)

    return (
        <li className={className}>
            <div className="todoCardHeader">
                <p className="todoCardStatus">{TodoStore.statusName(status)}</p>
                <div className="todoCardActions">
                    {status === 1 && <Button onClick={revertStatus}>{previousStatusName}</Button>}
                    <Button onClick={onComplete}>{nextStatusName}</Button>
                </div>
            </div>
            <div className="todoCardBody">
                <Input onChange={onChange} value={name} fullWidth />
                <RemoveTodo onRemoveTodo={onRemove} />
            </div>
        </li>
    )
}

export default styled(observer(TodoListItem))`
    display: flex;
    flex-direction: column;
    background-color: lightgray;
    max-width: 300px;
    margin: .25rem 0;
    border-radius: .25rem;
    padding: .5rem 1rem 1rem;
    border: 2px solid darkgrey;

    .todoCardHeader {
        display: flex;
        flex-direction: row;
        padding: 0 0 .5rem;
        margin: 0 0 .5rem;
        border-bottom: 2px solid darkgrey;
        align-items: center;
        justify-content: space-between;
    }

    .todoCardStatus {
        font-size: 0.75rem;
        color: grey;
        margin: 0;
    }

    .todoCardActions {
        display: flex;
    }

    .todoCardBody {
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        button {
            align-self: flex-end;
        }
    }
`
