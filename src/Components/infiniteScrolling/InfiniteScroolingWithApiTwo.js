import React, { useEffect, useState } from 'react';
import request from 'superagent';
import debounce from 'lodash.debounce';

const InfiniteScroolingWithApiTwo = () => {
    const [state, setState] = useState({
        error: false,
        hasMore: true,
        isLoading: false,
        apods: []
    });

    const loadApods = () => {
        {
            setState({ ...state, isLoading: true })
            request
                // .get('https://api.nasa.gov/planetary/apod?date=' + dayOffset() + '&api_key=DEMO_KEY')
                // .get("https://jsonplaceholder.typicode.com/posts" + dayOffset())
                .get("https://jsonplaceholder.typicode.com/posts")
                .then((results) => {
                    // console.log(results);
                    const nextApod = {
                        id: results.body.id,
                        title: results.body.title,
                        body: results.body.body,
                    };

                    setState({
                        hasMore: (state.apods.length < 5),
                        isLoading: false,
                        apods: [
                            ...state.apods,
                            nextApod
                        ],
                    });
                })
                .catch((err) => {
                    setState({
                        error: err.message,
                        isLoading: false
                    });
                });
        };
    }

    window.onscroll = debounce(() => {
        const { error, isLoading, hasMore } = state;

        if (error || isLoading || !hasMore) return;

        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadApods();
        }
    }, 100);

    useEffect(() => {
        loadApods();
    }, [])

    const dayOffset = () => {
        let today = new Date();
        let day = today.setDate(-1 * state.apods.length);
        return new Date(day).toISOString().split('T')[0];
    }

    return (
        <div style={{
            padding: 10
        }}>
            <h1>Infinite Space!</h1>
            <p>Scroll down to load more!!</p>

            {state.apods.map(apod => (
                <React.Fragment key={apod.id}>
                    {console.log(apod)}
                    <hr />
                    <div>
                        <h2>{apod.title}</h2>
                        <div>{apod.body}</div>
                    </div>
                </React.Fragment>
            ))}

            <hr />

            {state.error &&
                <div style={{ color: '#900' }}>
                    {state.error}
                </div>
            }

            {state.isLoading &&
                <div>Loading...</div>
            }

            {!state.hasMore &&
                <div>Loading Complete</div>
            }
        </div>
    );
}

export default InfiniteScroolingWithApiTwo