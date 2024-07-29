import { useEffect, useState } from "react"

export const useFetch = (url)=>{
    [data,setData] = useState('');
    [loading,setLoading] = useState(false)
    [err,setErr] = useState("")

    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
                setLoading(false)
            } catch (error) {
                setErr(error)
            }
        }
        fetchData();
    },[url])

    const reFetch = async()=>{
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data)
            setLoading(false)
        } catch (error) {
            setErr(error)
        }
    }
    return {data,loading,err, reFetch}
}