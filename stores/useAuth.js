import {create} from 'zustand'

const useAuth = create((set) => ({
    authUser: null,
    setAuthUser: (x) => {
        set(() => ({
            authUser: x
        }))
    }
}));

export default useAuth;