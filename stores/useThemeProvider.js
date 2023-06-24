import {create} from 'zustand'
import {darkTheme, lightTheme, natureTheme, oceanTheme, sunsetTheme} from "../config/constants";

const useThemeProvider = create((set) => ({
    theme: lightTheme,
    setTheme: (x) => {
        set((state) => ({
            theme: x
        }))
    }
}));

export default useThemeProvider;