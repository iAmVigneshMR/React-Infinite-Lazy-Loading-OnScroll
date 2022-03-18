// import axios from "axios";
// import { Fragment, useEffect, useState } from "react";
// import "./infiniteScrolling.css";

// let PAGE_NUMBER = 1;

// const InfiniteScrolling = () => {
//     const [first, setfirst] = useState([]);
//     const [page, setPage] = useState(PAGE_NUMBER);
//     const apiData = () => {
//         axios.get("https://jsonplaceholder.typicode.com/posts")
//             .then(res => {
//                 setfirst(res.data);
//             })
//             .catch(err => console.log(err));
//     }
//     useEffect(() => {
//         apiData();
//     }, [page])

//     const scrollToEnd = () => {
//         setPage(page + 1);
//     }

//     window.onscroll = function () {
//         if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
//             scrollToEnd();
//         }
//     }
//     return (
//         <Fragment>
//             <div className="inf-container">
//                 {first.length > 0 && first ? first.map((val) => {
//                     return (
//                         <div key={val.id}>
//                             {/* {console.log(val)} */}
//                             <div>{val.title}</div>
//                             <div>{val.body}</div>
//                         </div>
//                     )
//                 }) : null}
//             </div>
//         </Fragment>
//     )
// }

// export default InfiniteScrolling



import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

class InfiniteScrolling extends React.Component {
  state = {
    allposts: [],
    posts: [],
    hasMore: true,
    curpage: 0,
    pagesize: 30,
    totalPage: 0,
    total: 0
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
      let curpage = this.state.curpage;
      let posts = res.data.slice(
        curpage * this.state.pagesize,
        (curpage + 1) * this.state.pagesize
      );
      this.setState({
        allposts: res.data,
        posts: posts,
        total: res.data.length,
        totalPage: Math.ceil(res.data.length / this.state.pagesize)
      });
    });
  }

  loadmoreItem() {
    if (this.state.curpage + 1 < this.state.totalPage) {
      let curpage =
        this.state.curpage < this.state.totalPage
          ? this.state.curpage + 1
          : this.state.curpage;
      let posts = this.state.allposts.slice(
        0,
        (curpage + 1) * this.state.pagesize
      );
      this.setState({ posts: posts, curpage });
    } else {
      this.setState({ hasMore: false });
    }
  }

  render() {
    if (this.state.posts.length === 0) return <h1>loading...</h1>;
    else {
    //   console.log(this.state);
      return (
        <div>
          <Table
            hasMore={this.state.hasMore}
            posts={this.state.posts}
            loadmoreItem={this.loadmoreItem.bind(this)}
          />
        </div>
      );
    }
  }
}

export default InfiniteScrolling;

const Table = props => {
//   console.log("props: ", props);
  return (
    <React.Fragment>
      <div style={{ height: "500px", overflow: "auto" }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={props.loadmoreItem}
          hasMore={props.hasMore}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
          threshold={350}
        >
          <table>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>body</th>
            </tr>
            {props.posts.map(item => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                </tr>
              );
            })}
          </table>
        </InfiniteScroll>
      </div>
      {/* <button onClick={props.loadmoreItem}>next</button> */}
    </React.Fragment>
  );
};
