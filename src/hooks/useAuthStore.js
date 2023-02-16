import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store"

export const useAuthStore = () => {
  const {
    status,
    user,
    errorMessage
  } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const startLogin = async({email,password}) => {
    dispatch(onChecking())
    try {

      const {data} = await calendarApi.post('/auth',{email,password})
      localStorage.setItem('token',data.token)
      localStorage.setItem('token-init-date',new Date().getTime())
      dispatch(onLogin(data.user))

    } catch (error) {
      dispatch(onLogout({
        title:'Error en la autenticación',
        msg:'Credenciales Incorrecta'
      }))
      setTimeout(() => {
        dispatch(clearErrorMessage()) 
      },100)
    }
  }

  const startRegisterUser = async({name,email,password}) => {
    
    dispatch(onChecking())

    try {

      const {data} = await calendarApi.post('/auth/new', {name,email,password}) 
      localStorage.setItem('token',data.token)
      localStorage.setItem('token-init-date',new Date().getTime())
      dispatch(onLogin(data.user))
      
    } catch (error) {
      const errors = error?.response?.data?.errors || error?.response?.data

      const err= errors ? Object.values(errors).at(0) : false
      const msgError = err?.msg || errors?.msg

      dispatch(onLogout({
        title:'Error en el registro de usuario',
        msg: msgError ? msgError : 'Algo salio mal en la creación del registro.'
      }))
      setTimeout(() => {
        dispatch(clearErrorMessage()) 
      },100)
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')
    if(!token) return dispatch(onLogout())

    try {
      const {data} = await calendarApi.get('/auth/renew')
      localStorage.setItem('token',data.token)
      localStorage.setItem('token-init-date',new Date().getTime())
      dispatch(onLogin({name:data.name,uid:data.uid}))

    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout())
  }

  return {
    // Propiedades
    status,
    user,
    errorMessage,

    //Métodos
    startLogin,
    startRegisterUser,
    checkAuthToken,
    startLogout
  }
}