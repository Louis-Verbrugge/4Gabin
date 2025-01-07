


import Post from './component/Post/Post';
import SearchForm from './component/searchForm/SearchForm';
import styles from './App.module.scss';

import { useEffect, useState } from 'react';

import axios from 'axios'
import Loading from './component/Loading/Loading';



function App() {


  const [search, setSearch] = useState(localStorage.getItem('search') || '');

  const [dataListApi, setDataListApi] = useState([]);
  const [errorDataApi, setErrorDataApi] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [postDelete, setPostDelete] = useState();

  const [listMoreInfo, setListMoreInfo] = useState();

  const [buttonListMoreInfo, setButtonListMoreInfo] = useState();


  useEffect(() => {
    console.log("click delete ID: " + postDelete)
    
    setDataListApi(dataListApi.filter(( item )=> item.id != postDelete))
    
  }, [postDelete])



  function getApiData() {
    axios({
      method: 'get',
      url: import.meta.env.VITE_API_ENDPOINT,
    })
      .then(function (response) {
          console.log(response.data)
          setDataListApi(response.data)
      })  

      .catch(function (error) {
        console.error('Erreur lors de la récupération des actualités :', error);
        setErrorDataApi(true)
      })


      .finally(function () {
        setLoadingData(false)
        
      })
  };

  useEffect(() => {
    console.log("voici la longueur de la liste" + dataListApi.length)
    setListMoreInfo(
      dataListApi.map(() => {
        return "open"
    }))
    console.log("listMoreInfo: "+listMoreInfo)
  }, [dataListApi]) 

  useEffect(() => {
    getApiData()
  }, [])
  

  function changeMoreInfo(index) {

    console.log("click more info ID: " + dataListApi[index])
    if (listMoreInfo[index] === "open") { 
      document.getElementById(`moreText${dataListApi[index].id}`).style.color = "rgb(189, 15, 15)";
      
    } else {
      document.getElementById(`moreText${dataListApi[index].id}`).style.color = "rgb(0, 122, 18)";
    }
    
    setListMoreInfo(prevList =>
      prevList.map((item, i) => (i === index ? (item === "close" ? "open" : "close") : item))
    );
  }



  function displayAllPosts() {


    
    let listeAllPostsSort = dataListApi.filter((item, index) => {

      if (item.name !== undefined) {
        if (item.name.toLowerCase().includes(search.toLowerCase()) ) return item;
      }

    })

    return listeAllPostsSort.map((item, index) => {
      return <Post dataPost={item} key={item.id} setPostDelete={setPostDelete} listMoreInfo={listMoreInfo[index]} changeMoreInfo={changeMoreInfo} indexList={index} />
    })
  }


  return (
    <div className={styles.App}>

      <SearchForm search={search} setSearch={setSearch} getApiData={getApiData} />
      


      {loadingData? (<Loading />) :  

        (
            errorDataApi? (<h2>error</h2>) :
            (<div className={styles.displayAllPosts}>
              {displayAllPosts()}
            </div>)
        )
      }

      

    </div>

  )
}

export default App
