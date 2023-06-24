import {create} from 'zustand'

const useNotification = create((set) => ({
    unreadContacts: [],
    setUnreadContacts: (x) => {
        set((state) => ({
            unreadContacts: [x, ...(state.unreadContacts.filter(y => y !== x && y !== undefined))]
        }))
    },
    removeUnread: (z) => {
        set((state) => ({
            unreadContacts: [...state.unreadContacts.filter(y => y !== z && y !== undefined)]
        }))
    },
}));

export default useNotification;