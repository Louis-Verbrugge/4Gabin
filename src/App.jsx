


import Post from './component/Post/Post';
import SearchForm from './component/searchForm/SearchForm';
import style from './App.module.scss';

import { useEffect, useState } from 'react';

function App() {

  const [search, setSearch] = useState(localStorage.getItem('search') || '')



  const list = [
    {
      id: 1,
      title: "React",
      url: 'https://reactjs.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
    },
    {
      id: 2,
      title: "Redux",
      url: 'https://redux.js.org',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
    }
  ]
  


  function displayAllPosts() {

    let listeAllPostsSort = list.filter((item, index) => {
      if (item.title.toLowerCase().includes(search.toLowerCase()) ) return item;
    })

    return listeAllPostsSort.map((item, index) => {
      return <Post dataPost={item} key={item.id}  />
    })
  }


  return (
    <>
      <SearchForm search={search} setSearch={setSearch} />

      <div className={style.displayAllPosts}>
        {displayAllPosts()}
      </div>

    </>

  )
}

export default App
