import { useContext } from 'react'

import { themeContext } from '@/providers/ThemeProvider'

function useTheme() {
    return useContext(themeContext);
}

export default useTheme;