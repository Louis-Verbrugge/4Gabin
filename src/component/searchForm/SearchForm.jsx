
import { useEffect, useRef } from 'react'
import styles from './SearchForm.module.scss'

// pour les annimations:
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);


function SearchForm( { search, setSearch, getApiData } ) {


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
              gsap.to(buttonReload.current, { y: 0, duration: 3, ease:"elastic", onComplete: () => {
                gsap.to(buttonReload.current, { rotationY: 360, rotateX: 360, duration: 2, yoyo: true, repeat: -1})
               }
            });
            }
      });
    }
  }, []);

  return (
    <form className={styles.searchForm}>
        <label htmlFor='search'>recherche</label>
        <input ref={barSearch}  className={styles.searchBar} type='search' value={search} onChange={(event) => setSearch(event.target.value)}></input>
        <button ref={buttonReload} onClick={getApiData}>reload</button>
    </form>

  )
}

export default SearchForm
