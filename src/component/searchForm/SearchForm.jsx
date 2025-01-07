
import { useEffect } from 'react'
import style from './SearchForm.module.scss'


function SearchForm( { search, setSearch } ) {


    useEffect(() => {

        localStorage.setItem('search', search)

    }, [search])
   

  return (
    <form>
        <label htmlFor='search'>search</label>
        <input type='search' value={search} onChange={(event) => setSearch(event.target.value)}></input>
        
        <button type='sumit'>envoyer</button>
    </form>

  )
}

export default SearchForm
