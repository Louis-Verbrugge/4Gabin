


import Post from './component/Post/Post';
import SearchForm from './component/searchForm/SearchForm';
import styles from './App.module.scss';

import { useEffect, useReducer, useState } from 'react';

import axios from 'axios'
import Loading from './component/Loading/Loading';

import { initialState, reducer } from './_herlpers/dataReducerApi';

function App() {


  const [search, setSearch] = useState(localStorage.getItem('search') || '');

  const [dataApi, setDataApi] = useReducer(reducer, initialState);
  const [postDelete, setPostDelete] = useState();
  const [listMoreInfo, setListMoreInfo] = useState();


  useEffect(() => {
    if (postDelete === undefined) return;

    setDataApi({type: 'SEARCH_API_DATA', payload: dataApi.dataListApi.filter((item) => item.id !== postDelete)});
  }, [postDelete]);


  function getApiData() {
    axios({
      method: 'get',
      url: import.meta.env.VITE_API_ENDPOINT,
    })
      .then(function (response) {

        setDataApi({type: 'GET_API_DATA', payload: response.data})
      })  

      .catch(function (error) {
        console.error('Erreur lors de la récupération des actualités :', error);
        setDataApi({type: 'ERROR_API_DATA', payload: error})
      })


      .finally(function () {
        setDataApi({type: 'LOADING_API_DATA', payload: false})
        
      })
  };

  useEffect(() => {
    //console.log("voici la longueur de la liste" + dataApi.dataListApi.length)
    console.log("listMoreInfo: "+listMoreInfo)
    if (dataApi.dataListApi === undefined) return;
    setListMoreInfo(  
      dataApi.dataListApi.map(() => {
        return "open"
    }))
    console.log("listMoreInfo: "+listMoreInfo)
  }, [dataApi.dataListApi]) 

  useEffect(() => {
    getApiData()
  }, [])
  

  function changeMoreInfo(index) {

    console.log("click more info ID: " + dataApi.dataListApi[index])
    if (listMoreInfo[index] === "open") { 
      document.getElementById(`moreText${dataApi.dataListApi[index].id}`).style.color = "rgb(189, 15, 15)";
      
    } else {
      document.getElementById(`moreText${dataApi.dataListApi[index].id}`).style.color = "rgb(0, 122, 18)";
    }
    
    setListMoreInfo(prevList =>
      prevList.map((item, i) => (i === index ? (item === "close" ? "open" : "close") : item))
    );
  }



  function displayAllPosts() {

    if (dataApi.dataListApi === undefined) return;

    let listeAllPostsSort = dataApi.dataListApi.filter((item, index) => {

      if (item.name !== undefined) {
        if (item.name.toLowerCase().includes(search.toLowerCase()) ) return item;
      }

    })

    return listeAllPostsSort.map((item, index) => {
      return <Post dataPost={item} key={item.id} setPostDelete={setPostDelete} listMoreInfo={listMoreInfo[index]} changeMoreInfo={changeMoreInfo} indexList={index} />
    })
  }

  useEffect(() => {
    console.log("dataApi :"+dataApi.loadingData)
  }, [dataApi])

  return (
    <div className={styles.App}>

      <SearchForm search={search} setSearch={setSearch} getApiData={getApiData} />

      {dataApi.loadingData? (<Loading />) :  

        (
          dataApi.errorDataApi? (<h2>error</h2>) :
            (<div className={styles.displayAllPosts}>
              {displayAllPosts()}
            </div>)
        )
      }

      

    </div>

  )
}

export default App
