import { useEffect, useState } from 'react'

type DataType<T> = T | null
type ErrorType = Error | null

// Como el tipo que devolvera es generico usamos genericos.
interface Params<T> {
    data: DataType<T>
    loading: boolean
    error: Error | null
}

export const useFetch = <T>(url: string): Params<T> => {

    const [data, setData] = useState<DataType<T>>('lala' as T)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ErrorType>(null)

    const fetchData = async () => {

        // Crear un abort controller y mandarselo al fetch
        // const controller = new AbortController();
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Cambiar por un fetch.
        const res = 'Respuesta' as T

        if (!(res === 'Respuesta')) {

            throw Error('Error al hacer el fetch.')
        } else {

            setData(res)
            setError(null)
        }
    }

    useEffect(() => {

        try {

            setLoading(true)
            fetchData()
            setLoading(false)
        } catch (error) {

            setError(error)
        } finally {

            setLoading(false)
        }
        return () => {
          
            // Si se destruye el componente nos cargamos el fetch.
            // controller.abort;
        }
    }, [])

    return { data, loading, error }
}
