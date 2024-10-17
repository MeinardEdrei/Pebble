import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [input, setInput] = useState('');
  const [content, setContent] = useState([]);
  const [edit, setEdit] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3000/addNew', { input });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3000/contents');
    setContent(res.data);
    // console.log(res.data);
  }

  useEffect(() => {
    fetchData();
  }, [content]); // making content as a dependency triggers re-render after every content makes changes

  const handleDelete = async (id) => {
    try {
      const res = await axios.post('http://localhost:3000/removeItem', { id });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = async (id, currInput) => {
    setEdit(id);
    setEditInput(currInput);
  }

  const handleEdited = async (id) => {
    try {
      const res = await axios.post('http://localhost:3000/updateItem', { id, editInput }); 
      setEdit(null);
      fetchData();
  } catch (error) {
      console.error(error);
  }
  }

  return (
    <div className='flex m-10 flex-col'>
      <header className='flex justify-between'>
        <div>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} // fetching the input data for passing to the api
            className='border text-white border-white p-2' type="text" placeholder='Add New' />
          <button 
            onClick={handleSubmit}
            className='font-bold p-2 rounded-se-full bg-white m-2'>+
          </button>
        </div>
        <h1 className='text-white p-4 border border-white'>Pebble Developers</h1>
      </header>

      <section className='flex flex-wrap my-20'>
        {content.map((item) => ( // mapping every content, using index as key for formality and grammar
          <div key={item._id} className='flex gap-5 p-4 m-2 rounded-full' style={{backgroundColor: '#F25F4C'}}>
            {/* <h1 
                  onClick={() => handleEdit(item._id, item.input)}
                  onInput={(e) => setEditInput(e.target.textContent)}
                  contentEditable={edit === item._id}
                  onBlur={() => handleEdited(item._id)}
                  suppressContentEditableWarning={true}
                  className='text-white font-bold' style={{backgroundColor: '#F25F4C'}}>
                  {edit === item._id ? editInput : item.input}
                </h1> */}
              {edit === item._id ? (
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  onBlur={() => handleEdited(item._id)}
                  className='w-auto text-white font-bold'
                  style={{ backgroundColor: '#F25F4C' }}
                />
              ) : (
                <div 
                  onClick={() => handleEdit(item._id, item.input)}
                  className='text-white font-bold' style={{ backgroundColor: '#F25F4C' }}>
                  {item.input}
                </div>
              )}
            <div className='flex'>
              <FontAwesomeIcon className='p-1' style={{backgroundColor: '#F25F4C'}} onClick={() => handleDelete(item._id)} icon={faTrash} />
            </div>
          </div>
        ))
        }
      </section>
    </div>
  )
}

export default Home
