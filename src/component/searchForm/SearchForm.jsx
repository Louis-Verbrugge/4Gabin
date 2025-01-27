
import { useEffect, useRef } from 'react'
import styles from './SearchForm.module.scss'

// pour les annimations:
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);


function SearchForm( { search, setSearch, getApiData, searchButton } ) {


  useEffect(() => {

      localStorage.setItem('search', search)

  }, [search])
  
  const barSearch = useRef(null);

  const buttonReload = useRef(null);
  

  useEffect(() => {

    if (barSearch.current) {
      gsap.fromTo(barSearch.current,
        { x: -1000, opacity: 0}, 
        { x: 0, 
            opacity: 1, 
            rotateZ: 360, 
            duration: 3, 
            
            ease:"bounce",
      });
    }
  }, []);



  useEffect(() => {

    if (buttonReload.current) {
      gsap.fromTo(buttonReload.current,
        { x: 2000, y:300, opacity: 0}, 
        { x: 0, 
            y:300,
            opacity: 1, 
            rotateZ: 360, 
            duration: 3, 
            
            ease:"elastic",
            onComplete: () => {
              gsap.to(buttonReload.current, { y: 0, duration: 3, ease:"elastic"
            });
            }
      });
    }
  }, []);

  function reload() {
    window.location.reload();
  }

  return (
    <form className={styles.searchForm} onSubmit={(e) => { e.preventDefault(); getApiData(); }}>
      <label htmlFor='search'>recherche</label>
      <input ref={barSearch} className={styles.searchBar} type='search' value={search} onChange={(event) => setSearch(event.target.value)}></input>
      <button type='button' onClick={() => searchButton()}>search</button>
      <button onClick={() => reload()} ref={buttonReload}>reload</button>
    </form>
    )
} 

export default SearchForm
