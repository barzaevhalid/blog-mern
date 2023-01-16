import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useForm} from "react-hook-form";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export const Registration = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)
    const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        },
        mode: "onChange"
    });
    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));
        if (!data.payload) {
            return  alert('Не удалось зарагистрироваться ')
        }
        if('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    }

    if(isAuth) {
        return <Navigate to="/" />
    }

  return (
    <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <TextField
                error={Boolean(errors.fullName?.message)}
                helperText={errors.fullName?.message}
                {...register('fullName', {required: 'Укажите полное имя'})}
                fullWidth className={styles.field} label="Полное имя" fullWidth  />
            <TextField error={Boolean(errors.email?.message)}
                 helperText={errors.email?.message}
                 type='email'
                 {...register('email', {required: 'Укажите почту'})}
                 fullWidth className={styles.field} label="E-Mail"  />
            <TextField error={Boolean(errors.password?.message)}
                 helperText={errors.password?.message}
                 {...register('password', {required: 'Укажите пароль'})}
                 fullWidth className={styles.field} label="Пароль" />
            <Button type="submit" size="large" variant="contained" fullWidth disabled={!isValid}>
                Зарегистрироваться
            </Button>
        </form>
    </Paper>
  );
};
