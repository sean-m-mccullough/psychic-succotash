import React from 'react'
import { observable } from 'mobx'
import { v4 as uuid} from 'uuid'

const statusType = ['Incompleted', 'In Progress', 'Completed']

function createTodoStore() {
    const self = observable({
        items: [{
            id: uuid(),
            name: "Hello, Ratehub!",
            status: 1
        }],

        get activeItems() {
            return self.items.filter(i => i.status < 2);
        },
        get completedItems() {
            return self.items.filter(i => i.status >= 2);
        },

        addItem(name) {
            self.items.push({
                id: uuid(),
                name,
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
        },
        statusName(statusId) {
            return statusType[statusId] || statusType[0];
        }
    })

    return self;
}

export const storesContext = React.createContext({
    TodoStore: createTodoStore()
})

export default createTodoStore;
