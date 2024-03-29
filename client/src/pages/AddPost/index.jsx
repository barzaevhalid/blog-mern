import React, {useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import {Navigate, useNavigate, useParams} from "react-router-dom";

import 'easymde/dist/easymde.min.css';
import {selectIsAuth} from "../../redux/slices/auth";
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import axios from "../../axios";

export const AddPost = () => {
  const {id} = useParams();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef(null);
  const isEditing = !!id;
  const handleChangeFile = async (e) => {
      try {
          const formData = new FormData();
          const file = e.target.files[0]
          formData.append('image', file)
          const { data } = await axios.post('/uploads', formData);
          setImageUrl(data.url)
      } catch (e) {
          console.log(e)
      }
  };

  useEffect(() => {
      if(id) {
          console.log(  id)
          axios.get(`/posts/${id}`).then((res) => {
              console.log(res)
              setTitle(res.data.title);
              setText(res.data.text);
              setImageUrl(res.data.imageUrl);
              setTags(res.data.tags)
          })
      }
  },[])

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText
    (value);
  }, []);

  const onSubmit = async () => {
      try {
          setLoading(true);
          const fields = {
              title,
              imageUrl,
              tags: tags.split(','),
              text
          }
          const {data} = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);
          const _id = isEditing ? id :  data._id;
          navigate(`/posts/${_id}`)
      } catch (e) {
          console.warn(e, 'lorem ipsum')
      }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
    if(!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/"/>
    }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
          <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
              <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
          </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField value={tags} onChange={e => setTags(e.target.value)} classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
            {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
