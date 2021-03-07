import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { storesContext } from  '../../store/TodoStore'

import Input from '../Input'
import Button from '../Button'

export const useTodoStores = () => React.useContext(storesContext)

function CreateTodo() {
    const { TodoStore } = useTodoStores()
    const [newTodo, setNewTodo] = React.useState(''); // TODO: Hook with input validation

    const handleSubmit = (e) => {
        if(newTodo.trim().length > 1) TodoStore.addItem(newTodo);
        setNewTodo('');
        e.preventDefault();
    }

    return (
        <section>
            <h2 className="title">Create TODO</h2>
            <form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    placeholder="Hello, Ratehub!"
                    value={newTodo} 
                    onChange={(e) => setNewTodo(e?.target?.value)} 
                />
                <Button type="submit">New Todo</Button>
            </form>
        </section>
    )
}

export default styled(observer(CreateTodo))``
