import React, { useState } from 'react'

export default function addBook(props) {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [review, setReview] = useState("")

    const handleSubmit = event => {
        event.preventDefault()
        
        if (title !== "" && author !== "") {
            fetch("http://127.0.0.1:5000/book/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    author: author,
                    review: review
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }
    }

   return (
       <div className='add-book-wrapper'>
           <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={event => setTitle(event.target.value)}
                />
                <input 
                    type="text"
                    value={author}
                    placeholder="Author"
                    onChange={event => setAuthor(event.target.value)}
                />
                <textarea 
                    value={review}
                    placeholder="Review"
                    onChange={event => setReview(event.target.value)}
                />
                <button type="submit">Add Book</button>
           </form>
       </div>
   )
}