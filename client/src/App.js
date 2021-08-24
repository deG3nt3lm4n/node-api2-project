import React,{useState, useEffect} from 'react'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {

    fetch('http://localhost:3001/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.log(err))


  },[])

  function showPosts(){
    return posts.map(post => {
      return (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
        </div>
      )
    })
  }

  console.log(posts)

  return (
    <div className="App">
     <h2>pop</h2>
     {
       posts.length > 0 ? showPosts() : 'you suck'
     }
    </div>
  );
}

export default App;
