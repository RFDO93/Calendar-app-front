import './LoginPage.css';
import {useAuthStore, useForm} from '../../hooks'
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

const loginFormFields = {
  loginEmail:'',
  loginPassword:'',
}

const registerFormFields = {
  registerName:'',
  registerEmail:'',
  registerPassword:'',
  registerPasswordConfirm:'',
}

export const LoginPage = () => {
  const {startLogin, errorMessage,startRegisterUser} = useAuthStore()

  useEffect(() => {
    if(errorMessage !== undefined) {
      Swal.fire(errorMessage.title,errorMessage.msg,'error')
    }
  }, [errorMessage])
  

  const { 
    loginEmail,
    loginPassword,
    onInputChange:onLoginInputChange, 
  } = useForm(loginFormFields)

  const { 
    registerName,
    registerEmail,
    registerPassword,
    registerPasswordConfirm,
    onInputChange:onRegisterInputChange, 
  } = useForm(registerFormFields)

  const loginSubmit = (event) => {
    event.preventDefault()
    startLogin({email:loginEmail,password:loginPassword})
  }

  const registerSubmit = (event) => {
    event.preventDefault()
    
    if(registerPassword !== registerPasswordConfirm) {
      Swal.fire('Error en registro', 'Contraseña no son iguales','error')
      return 
    }

    startRegisterUser({
      name:registerName,
      email:registerEmail,
      password:registerPassword,
    })
  }


  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input 
                type="text"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input 
                type="submit"
                className="btnSubmit"
                value="Login" 
              />
            </div>
          </form>
        </div>
        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name='registerEmail'
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña" 
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña" 
                name='registerPasswordConfirm'
                value={registerPasswordConfirm}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input 
                type="submit" 
                className="btnSubmit" 
                value="Crear cuenta" 
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}