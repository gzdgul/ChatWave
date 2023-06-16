import {create} from 'zustand'

const useSelectedUser = create((set) => ({
    selectedUser: null,
    setSelectedUser: (x) => {
        set(() => ({
            selectedUser: x
        }))
    }
}));

export default useSelectedUser;