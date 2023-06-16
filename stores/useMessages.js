import {create} from 'zustand'

const useChatData = create((set) => ({
    chatData: [],
    setChatData: (x) => {
        set((state) => ({
            chatData: [...state.chatData.filter((y) => y.chatId !== x.chatId ), x]
        }))
    }
}));

export default useChatData;