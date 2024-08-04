import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetching (...args){
        try {
            setIsLoading(true)

            await callback(...args)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}