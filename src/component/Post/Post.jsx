
import styles from './Post.module.scss'


function Post( {dataPost, setPostDelete, listMoreInfo, changeMoreInfo, indexList} ) {

  if (listMoreInfo === "open") {

    var texte = dataPost.info.substring(0, 100) + "...";
  } else {
    var texte = dataPost.info;
  }

  return (
    <div className={styles.post}>
        
        <img src={dataPost.image}></img>

        <div className={styles.texte}>
          <h2>{dataPost.name}</h2>
          <div className={styles.info}>
            <h4>{texte} </h4>
            <a className={styles.moreText} id={`moreText${dataPost.id}`} onClick={() => changeMoreInfo(indexList)}>{listMoreInfo}</a> 
          </div>
          <h2>price {dataPost.price}</h2>
        </div>

        <button id="deletePost" onClick={() => setPostDelete(dataPost.id)}>DELETE</button>

    </div>

  )
}

export default Post
