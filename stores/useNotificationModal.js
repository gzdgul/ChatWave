import {create} from 'zustand'

const useNotificationModal = create((set) => ({
    notificationModalStatus: false,
    notificationNumber: 0,
    notificationData: null,
    setNotificationModalStatus: (x) => {
        set(() => ({
            notificationModalStatus: x
        }))
    } ,
    setNotificationNumber: () => {
        set((state) => ({
            notificationNumber: state.notificationNumber + 1
        }))
    },
    setNotificationData: (x) => {
        set(() => ({
            notificationData: x
        }))
    }
}));

export default useNotificationModal;