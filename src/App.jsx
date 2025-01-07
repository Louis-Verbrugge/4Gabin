


import Post from './component/Post/Post';
import SearchForm from './component/searchForm/SearchForm';
import styles from './App.module.scss';

import { useEffect, useState } from 'react';

import axios from 'axios'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

function App() {

  const [search, setSearch] = useState(localStorage.getItem('search') || '')

  const [dataListApi, setDataListApi] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        url: API_ENDPOINT,

      
      })
        .then(function (response) {

            console.log(response.data.hits)
            setDataListApi(response.data.hits)
        })  

        .catch(function (error) {
          console.error('Erreur lors de la récupération des actualités :', error);
        })


        .finally(function () {
        })
    };
    fetchData();
  }, []);


  function displayAllPosts() {


    
    let listeAllPostsSort = dataListApi.filter((item, index) => {

      if (item.title !== undefined) {
        if (item.title.toLowerCase().includes(search.toLowerCase()) ) return item;
      }

    })

    return listeAllPostsSort.map((item, index) => {
      return <Post dataPost={item} key={item.id}  />
    })
  }


  return (
    <>
      <SearchForm search={search} setSearch={setSearch} />

      <h2>{process.env.API_ENDPOINT}</h2>

      <div className={styles.displayAllPosts}>
        {displayAllPosts()}
      </div>


    </>

  )
}

export default App
