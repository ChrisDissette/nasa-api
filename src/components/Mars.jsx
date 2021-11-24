import {useState, useEffect} from 'react'
import axios from 'axios'

const Mars = () => {

    const [picture, setPicture] = useState([])
    const [date, setDate] = useState(1)


    useEffect(() => {
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=OVxF4BqhlOYbNevVJPijtFanmDcCxN5UQ8SG3Fii`)
            .then(res => {
                console.log(res.data.photos)
                setPicture(res.data.photos)
            })
            .catch(err => console.log(err))
    }, [date])

    return (
        <div>
            {/* {picture.map(({item, i}) => (
                    <img src={item}></img>
                ))} */}
        </div>
    )
}

export default Mars
