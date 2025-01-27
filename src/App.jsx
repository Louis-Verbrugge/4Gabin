


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

  const [sortByTitle, setSortByTitle] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);

  const [searchButtonVar, setSearchButtonVar] = useState([]);


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
    if (dataApi.dataListApi === undefined) return;
    setListMoreInfo(  
      dataApi.dataListApi.map(() => {
        return "open"
    }))
  }, [dataApi.dataListApi]) 


  

  function changeMoreInfo(index) {

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

    // je trie les données en fonction de la recherche
    let listeAllPostsSort = dataApi.dataListApi.filter((item, index) => {
      if (item.name !== undefined) {
        if (item.name.toLowerCase().includes(search.toLowerCase()) ) return item;
      }
    })

    // sort by name:
    if (sortByTitle) {
      listeAllPostsSort.sort((a, b) => a.name.localeCompare(b.name))
    }
    else if (sortByTitle == false) { // il ne faut pas metter !sortByTitle, car ça n'exclut pas le null
      listeAllPostsSort.sort((a, b) => a.name.localeCompare(b.name)).reverse()
    }

    // sort by price:

    if (sortByPrice == true) {
      listeAllPostsSort.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    }
    else if (sortByPrice == false) {
      listeAllPostsSort.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)).reverse();
    }




    return listeAllPostsSort.map((item, index) => {
      return <Post dataPost={item} key={item.id} setPostDelete={setPostDelete} listMoreInfo={listMoreInfo[index]} changeMoreInfo={changeMoreInfo} indexList={index} />
    })
  }

  function searchButton() {

    getApiData();

    if (searchButtonVar.length >= 5) {
      setSearchButtonVar(searchButtonVar.shift())
    }

    if (!searchButtonVar.includes(search)) {
      //console.log("searchButtonVar :"+search)
      setSearchButtonVar([...searchButtonVar, search])

    }

    

  }

  useEffect(() => {
    console.log("____________________")
    console.log("searchButtonVar :"+searchButtonVar)
  }
  , [searchButtonVar])

  return (
    <div className={styles.App}>

      <SearchForm search={search} setSearch={setSearch} getApiData={getApiData} searchButton={searchButton} />
      <button onClick={() => searchButton()} >SEARCH</button>
      <h3>last search: </h3>

      <div className={styles.lastSearch}>
      {
        searchButtonVar.map((item, index) => {
          return <h3 key={index}>{item}</h3>
        })
      }
      </div>

      {dataApi.loadingData? (<Loading />) :  

        (
          dataApi.errorDataApi? (<h2>error</h2>) :
            (
              <>

              <button onClick={() => {setSortByTitle(sortByTitle ? false : sortByTitle==null ? true : null)}}>Sort name {sortByTitle == null ? "default" : null} {sortByTitle == true ? "true" : null} {sortByTitle == false ? "false" : null}</button>
              <button onClick={() => {setSortByPrice(sortByPrice ? false : sortByPrice==null ? true : null)}}>Sort price {sortByPrice == null ? "default" : null} {sortByPrice == true ? "true" : null} {sortByPrice == false ? "false" : null}</button>

              
                <div className={styles.displayAllPosts}>
                  {displayAllPosts()}
                </div>
              </>
            )
        )
      }

      

    </div>

  )
}

export default App
