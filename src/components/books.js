import React, { useState, useEffect } from 'react'

export default function books(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/book/get/marshmallow", {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error))
    }, [])

    const handleDelete = async title => {
        await fetch(`http://127.0.0.1:5000/book/delete/${title}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)

            if (responseData === `Book with title ${title} was successfully deleted`) {
                const newData = data.filter(book => book.title !== title)
                setData(newData)
            }
        })
        .catch(error => console.log(error))

        // await fetch("http://127.0.0.1:5000/book/get/marshmallow", {
        //     method: "GET"
        // })
        // .then(response => response.json())
        // .then(data => {
        //     setData(data)
        //     console.log("Data updated!")
        // })
        // .catch(error => console.log(error))

        console.log("All Done!")
    }

   return (
       <div className='books-wrapper'>
           {data.map(book => {
                return (
                    <div className="book-wrapper" key={book.id}>
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <button onClick={() => handleDelete(book.title)}>Delete</button>
                    </div>
                )
            })}
       </div>
   )
}