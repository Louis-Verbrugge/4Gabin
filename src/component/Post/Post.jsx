
import style from './Post.module.scss'


function Post( {dataPost} ) {

  return (
    <div className={style.post}>
        <h2>{dataPost.title}</h2>
        <a href={dataPost.url}>{dataPost.url}</a>
        <h2>{dataPost.author}</h2>
        <h2>{dataPost.num_comments}</h2>
        <h2>{dataPost.points}</h2>
    </div>

  )
}

export default Post
