import React, { useState } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { observable } from 'mobx';
import { v4 as uuid} from 'uuid';

import TodoListItem from './TodoListItem'

export const statusType = ['Incompleted', 'In Progress', 'Completed']

export function RemoveTodo({onRemoveTodo}) {
    return (
        <button onClick={onRemoveTodo}>Remove</button>
    )
}

function TodoList({ className }) {
    const [ store ] = useState(createTodoStore);

    return (
        <div className={className}>
            <header>
                <h1 className="title">TODO List Example</h1>
            </header>
            <section>
                <button onClick={store.addItem}>
                    Add New Item
                </button>
            </section>
            <section>
                <ul>
                    {store.activeItems.map(item => (
                        <TodoListItem
                            key={item.id}
                            name={item.name}
                            status={item.status}
                            onComplete={() => {
                                store.nextStatus(item.id)
                            }}
                            revertStatus={() => {
                                store.previousStatus(item.id)
                            }}
                            onChange={(e) => store.setItemName(item.id, e.target.value)}
                            onRemove={() => store.removeItem(item.id)}
                        />
                    ))}
                </ul>
            </section>
            <footer>
                <h2 className="completedTitle">Completed Items</h2>
                <ul>
                    {store.completedItems.map(item => (
                        <li key={item.id}>
                            {item.name} - {statusType[item.status]}
                            <RemoveTodo onRemoveTodo={() => store.removeItem(item.id)} />
                        </li>
                    ))}
                </ul>
            </footer>
        </div>
    )
}

function createTodoStore() {
    const self = observable({
        items: [{
            id: uuid(),
            name: "Sample item",
            status: 0
        }],

        get activeItems() {
            return self.items.filter(i => i.status < 2);
        },
        get completedItems() {
            return self.items.filter(i => i.status >= 2);
        },

        addItem() {
            self.items.push({
                id: uuid(),
                name: `Item ${self.items.length}`,
                status: 0
            });
        },
        removeItem(id) {
            self.items = self.items.filter(item => item.id !== id);
        },
        setItemName(id, name) {
            const item = self.items.find(i => i.id === id);
            item.name = name;
        },
        nextStatus(id) {
            const item = self.items.find(i => i.id === id);
            item.status += 1
        },
        previousStatus(id) {
            const item = self.items.find(i => i.id === id);
            item.status -= 1
        }
    })

    return self;
}

export default styled(observer(TodoList))`
    background-color: lightgray;

    .title {
        color: orange;
    }
`
