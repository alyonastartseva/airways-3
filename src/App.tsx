import {QueryClient, QueryClientProvider} from 'react-query'
import {ChakraProvider} from '@chakra-ui/react'
import './App.css'
import {LoginAdminForm} from "@components/LoginAdminForm"

const queryClient = new QueryClient()

function App() {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <LoginAdminForm/>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default App
