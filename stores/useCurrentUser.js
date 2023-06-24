import {create} from 'zustand'

const useCurrentUser = create((set) => ({
    currentUser: null,
    setCurrentUser: (x) => {
        set(() => ({
            currentUser: x
        }))
    }
}));

export default useCurrentUser;