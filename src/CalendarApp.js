import React from 'react'
import { Provider } from 'react-redux'

import { store } from './store/store'
import { RouterApp } from './router/RouterApp'

export const CalendarApp = () => {
    return (
        <Provider store={ store }>
            <RouterApp />
        </Provider>
    )
}
