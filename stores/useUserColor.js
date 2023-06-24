import {create} from 'zustand'

const useUserColor = create((set) => ({
    userColor: null,
    setUserColor: (x) => {
        set(() => ({
            userColor: x
        }))
    }
}));

export default useUserColor;