import {create} from 'zustand'

const useModal = create((set) => ({
    modalStatus: false,
    setModalStatus: (x) => {
        set(() => ({
            modalStatus: x
        }))
    }
}));

export default useModal;