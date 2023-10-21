import { Provider } from 'react-redux'
import { persistor, store } from '@/app/store/initialStore'
import { PersistGate } from 'redux-persist/integration/react'

interface IStoreProvider {
    children: React.ReactElement
}
export const StoreProvider: React.FC<IStoreProvider> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
