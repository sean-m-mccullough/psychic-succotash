import React from 'react'
import { observable } from 'mobx'
import { v4 as uuid} from 'uuid'

const statusType = ['Incompleted', 'In Progress', 'Completed']

function createTodoStore() {
    const self = observable({
        items: [{
            id: uuid(),
            name: "Contact candidates to explain the coding exercise",
            status: 1,
            tags: []
        }],
        tagCatalog: ["Hiring", "Urgent"],

        get activeItems() {
            return self.items.filter(i => i.status < 2)
        },
        get completedItems() {
            return self.items.filter(i => i.status >= 2)
        },

        addTag(tag, id) {
            const item = self.items.find(i => i.id === id)
            item.tags.push(tag);
        },
        removeTag(tag, id) {
            const item = self.items.find(i => i.id === id)
            item.tags = item.tags.filter(t => t !== tag);
        },
        addItem(name) {
            self.items.push({
                id: uuid(),
                name,
                status: 0,
                tags: []
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
