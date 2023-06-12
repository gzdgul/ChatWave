import {create} from 'zustand'

const useAuth = create((set) => ({
    currentUser: null,
    setCurrentUser: (x) => {
        set(() => ({
            currentUser: x
        }))
    }
}));

export default useAuth;