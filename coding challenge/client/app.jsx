import React, { useState, useEffect, useCallback, useRef } from 'react';
import Card from './components/Card.jsx';
import Filter from './components/Filter.jsx';
import axios from 'axios';

const App = () => {
  // Set first pagination State
  const [first, setFirst] = useState(0);

  //Set list entries state
  const [list, setList] = useState([])

  // Set filter State
  const [filter, setFilter] = useState(null);

  const changeFilterState = (e) => {
    setFilter(e);
    setFirst(0);
    setList([])
  };

  // Set sortby State
  const [sortby, setSortby] = useState('date');

  const changeSortCritState = (e) => {
    setSortby(e);
    setFirst(0);
  };

  //Set hasMore state (to check if there is more entries)
  const [hasMore, setHasMore] = useState(true)

  //Set ref for last
  const observer = useRef();
  let lastRef = useCallback((node) => {
    if (node === null) return;
    if (hasMore === false) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setFirst(prev => prev + 5)
      }
    })
    if (node) observer.current.observe(node)
  }, [hasMore])

  useEffect(() => {
    const getEntries = `
      query {
        getEntries(input: {first: ${first}, sortby: ${sortby}, filter: ${filter}, offset: 5}) {
          author {
            name
            picture
            score
          }
          popularity
          isTrending
          date
          title
          description
          numComments
          thumbnail
          codeSubmissionTotal
          pledgeTotal
          pledgeGoal
          pledgerCount
          status
        }
      }
    `;
    axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: JSON.stringify({ query: getEntries })
    })
      .then(data => {
        return data.data.data.getEntries
      })
      .then(entries => {
        setList([...list, ...entries])
        if (entries.length > 0) {
          setHasMore(true)
        } else if (entries.length === 0) {
          setHasMore(false)
        }
      })
      .then(() => console.log(first))
      .catch(err => console.log(err))
  }, [sortby, first, filter])

  return (
    <div style={{ margin: '5em' }}>
      <Filter changeFilterState={changeFilterState.bind(this)}
        changeSortCritState={changeSortCritState.bind(this)}
      />
      <ul>
        {list.map((e, index) => {
          if (index === list.length - 1) {
            return (
              <li
                style={{ listStyleType: 'none' }}
                key={e.title}
                ref={lastRef}>
                <Card
                  author={e.author}
                  isTrending={e.isTrending}
                  title={e.title}
                  description={e.description}
                  numComments={e.numComments}
                  thumbnail={e.thumbnail}
                  codeSubmissionTotal={e.codeSubmissionTotal}
                  pledgeTotal={e.pledgeTotal}
                  pledgeGoal={e.pledgeGoal}
                  pledgerCount={e.pledgerCount}
                  status={e.status}
                />
              </li>)
          } else {
            return (
              <li
                style={{ listStyleType: 'none' }}
                key={e.title}
              >
                <Card
                  author={e.author}
                  isTrending={e.isTrending}
                  title={e.title}
                  description={e.description}
                  numComments={e.numComments}
                  thumbnail={e.thumbnail}
                  codeSubmissionTotal={e.codeSubmissionTotal}
                  pledgeTotal={e.pledgeTotal}
                  pledgeGoal={e.pledgeGoal}
                  pledgerCount={e.pledgerCount}
                  status={e.status}
                />
              </li>)
          }
        })
        }
      </ul>
      <button onClick={() => {
        setFirst(prev => prev + 5)
      }}>Load More</button>
    </div>
  )
}

export default (App);