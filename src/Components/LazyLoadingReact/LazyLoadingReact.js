import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const LazyLoadingReact = () => {
    const [first, setfirst] = useState([]);
    const apiData = () => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(res => {
            setfirst(res.data);
        })
        .catch(err => console.log(err));
    }
    useEffect(() => {
      apiData();
    }, [])
    
    return (
        <Fragment>
            {first.length > 0 && first ? first.map((val) => {
                return(
                <div key={val.id}>
                    {/* {console.log(val)} */}
                    <div>{val.title}</div>
                    <div>{val.body}</div>
                </div>
                )
            }) : null}
        </Fragment>
    )
}

export default LazyLoadingReact