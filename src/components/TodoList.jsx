import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { storesContext } from  '../store/TodoStore'

import CreateTodo from './Todo/CreateTodo'
import TodoListItem from './TodoListItem'
import Button from './Button'

export const useTodoStores = () => React.useContext(storesContext)

export function RemoveTodo({onRemoveTodo}) {
    return (
        <Button onClick={onRemoveTodo}>Remove</Button>
    )
}

function TodoList({ className }) {
    const { TodoStore } = useTodoStores()

    return (
        <div className={className}>
            <header>
                <h1 className="title">TODO List Example</h1>
            </header>
            <CreateTodo />
            <section>
                {TodoStore.activeItems.length > 0 && <h2 className="title">TODO Items</h2>}
                <ul>
                    {TodoStore.activeItems.map(item => (
                        <TodoListItem
                            key={item.id}
                            name={item.name}
                            status={item.status}
                            tags={item.tags}
                            onComplete={() => {
                                TodoStore.nextStatus(item.id)
                            }}
                            revertStatus={() => {
                                TodoStore.previousStatus(item.id)
                            }}
                            onChange={(e) => TodoStore.setItemName(item.id, e.target.value)}
                            onRemove={() => TodoStore.removeItem(item.id)}
                            onTagClick={(e) => {
                                const tag = e.target.value
                                if(item.tags.includes(tag)) {
                                    TodoStore.removeTag(tag, item.id)
                                } else {
                                    TodoStore.addTag(tag, item.id)
                                }
                            }}
                        />
                    ))}
                </ul>
            </section>
            <section>
                {TodoStore.completedItems.length > 0 && <h2 className="title">Completed TODO</h2>}
                <ul>
                    {TodoStore.completedItems.map(item => (
                        <li key={item.id}>
                            <p>{item.name} - {TodoStore.statusName(item.status)}</p>
                            <RemoveTodo onRemoveTodo={() => TodoStore.removeItem(item.id)} />
                        </li>
                    ))}
                </ul>
            </section>
            <footer>
                <div className="todoListFilter">
                    <p>Filter Lists with: {TodoStore.filteredTags.map(tag => (<span>{tag}</span>))}</p>
                    {TodoStore.tagCatalog.map(tag => (
                        <Button key={tag} value={tag} onClick={(e) => {
                            const tag = e.target.value
                            if(TodoStore.filteredTags.includes(tag)) {
                                TodoStore.removeTagFilter(tag)
                            } else {
                                TodoStore.addTagFilter(tag)
                            }
                        }}>{tag}</Button>
                    ))}
                </div>
            </footer>
        </div>
    )
}

export default styled(observer(TodoList))`
    font-family: sans-serif;
    font-size: 1rem;
    font-weight: 400;
    background-color: lightgray;

    .title {
        color: orange;
    }

    section {
        margin: .5rem;
    }

    ul {
        padding: 0;
    }

    footer {
        ul {
            padding: 0 .5rem;

            li {
                p { text-decoration: line-through; color: darkgrey; }
                display: flex;
                align-items: center;
            }
        }
    }
`
