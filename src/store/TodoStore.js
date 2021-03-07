import React from 'react'
import { observable } from 'mobx'
import { v4 as uuid} from 'uuid'

const statusType = ['Incompleted', 'In Progress', 'Completed']

// returns an array of intersecting values from the arrays given
function intersect(arr1, arr2) {
    return arr1.filter(value => arr2.includes(value))
}

function createTodoStore() {
    const self = observable({
        items: [{
            id: uuid(),
            name: "Contact candidates to explain the coding exercise",
            status: 1,
            tags: ["Hiring"]
        }],
        tagCatalog: ["Hiring", "Urgent"],
        filteredTags: [],
        actionLog: [],

        get activeItems() {
            return self.items.filter(i => {
                const filterList = self.filteredTags.length > 0 ? intersect(i.tags, self.filteredTags).length > 0 : true
                return i.status < 2 && filterList
            })
        },
        get completedItems() {
            return self.items.filter(i => {
                const filterList = self.filteredTags.length > 0 ? intersect(i.tags, self.filteredTags).length > 0 : true
                return i.status >= 2 && filterList
            })
        },

        addTag(tag, id) {
            const item = self.items.find(i => i.id === id);
            self.actionLog.push(`addTag - "${tag}" added to ${JSON.stringify(item)} `);
            item.tags.push(tag);
        },
        removeTag(tag, id) {
            const item = self.items.find(i => i.id === id);
            self.actionLog.push(`removeTag - "${tag}" removed from ${JSON.stringify(item)}`);
            item.tags = item.tags.filter(t => t !== tag);
        },
        addItem(name) {
            const newItem = {
                id: uuid(),
                name,
                status: 0,
                tags: []
            };
            self.actionLog.push(`addItem - ${JSON.stringify(newItem)}`);
            self.items.push(newItem);
        },
        removeItem(id) {
            const removeItem = self.items.filter(item => item.id !== id);
            self.actionLog.push(`removeItem - ${JSON.stringify(removeItem)}`);
            self.items = removeItem;
        },
        setItemName(id, name) {
            const item = self.items.find(i => i.id === id);
            self.actionLog.push(`Item name updated - from "${item.name}" to "${name}"`);
            item.name = name;
        },
        nextStatus(id) {
            const item = self.items.find(i => i.id === id);
            const updatedItemStatus = item.status + 1;
            self.actionLog.push(`Update status (Next) - ${item.status} -> ${updatedItemStatus} - ${item.name}`);
            item.status = updatedItemStatus;
        },
        previousStatus(id) {
            const item = self.items.find(i => i.id === id);
            const updatedItemStatus = item.status - 1;
            self.actionLog.push(`Update status (Previous) - ${item.status} -> ${updatedItemStatus} - ${item.name}`);
            item.status = updatedItemStatus;
        },
        statusName(statusId) {
            return statusType[statusId] || statusType[0];
        },
        addTagFilter(tag){
            self.filteredTags.push(tag);
        },
        removeTagFilter(tag){
            self.filteredTags = self.filteredTags.filter(t => t !== tag);
        }
    })

    return self;
}

export const storesContext = React.createContext({
    TodoStore: createTodoStore()
})

export default createTodoStore;
