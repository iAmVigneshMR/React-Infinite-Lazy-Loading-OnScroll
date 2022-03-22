import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { lazyload } from "react-lazyload";
import "./infiniteScrolling.css";

const ReacctInfiniteScrollComponent = () => {
    const [first, setfirst] = useState([]);
    const [count, setCount] = useState(0);
    const [hasMore, sethasMore] = useState(true);
    // const [first, setfirst] = useState({arrayPosts : []});
    const apiData = () => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res => {
                let count2 = count + 10;
                // console.log(typeof(count));
                // console.log(typeof(count2));
                // console.log(count2);
                if(res.data.length === count){
                    sethasMore(false);
                }
                let arraySlice = res.data.slice(count,count2);
                var joined = first.concat(arraySlice);
                // arrayPosts.push(arraySlice);
                // setfirst((arrayPosts)=> [...arrayPosts, arraySlice]);
                setfirst(joined);
                setCount(count2)
                // console.log(res.data.length);
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        apiData();
    }, [])
    // const handleCounter = () => {
    //     setCount(count + 10);
    // }

    return (
        <Fragment>
            <div className="inf-container">
                <InfiniteScroll
                    dataLength={first.length}
                    // next={handleCounter}
                    next={apiData}
                    hasMore={hasMore}
                    loader={<h4 className='cardLoader'>Loading ...</h4>}
                    >
                {first.length > 0 && first ? first.map((val) => {
                    return (
                            <div key={val.id}>
                                {console.log(first.length)}
                                <div>{val.id}</div>
                                <div>{val.title}</div>
                                <div>{val.body}</div>
                            </div>
                    )
                }) : null}
                </InfiniteScroll>
            </div>
        </Fragment>
    )
}

export default ReacctInfiniteScrollComponent