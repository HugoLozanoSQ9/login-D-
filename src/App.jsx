import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import clsx from "clsx"
import AsideTop from "./assets/components/AsideAndTop"
import { Toaster, toast } from 'sonner'
import { login } from "./api"



export default function App() {

  const tokenExists = localStorage.getItem("Token")

  const [token, setToken] = useState(null)


  const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset, setFocus } = useForm()



  async function onSubmit(data) {

    try {

     const userToken = JSON.stringify(await login({
        email: data.email,
        password: data.password
      }))

      setFocus("email")
      reset()

      localStorage.setItem("Token", userToken)
      setToken(userToken)

      toast.success("Estas Logeado")


    } catch (error) {
      console.log("Error al iniciar sesión", error)
      alert("Error al iniciar sesión", error)
    }


  }




  return (
    <>
      <Toaster position="top-right" richColors />

      <main className="grid grid-cols-6  grid-rows-[3.2rem_1fr] bg-[#1A2130]  min-h-screen">

        <AsideTop />


        <div className='col-start-3 col-end-7'>

          <form className="flex flex-col gap-2 justify-center items-center h-[80%] p-5 flex-grow flex-wrap"
            onSubmit={handleSubmit(onSubmit)} //onSubmit
          >



            <div className="gap-2 justify-center p-5 flex w-full">

              <input

                type="text"
                placeholder="Ingresa tu correo"
                className={clsx("p-2 rounded text-black w-[60%]")}
                required
                {...register('email', {
                  required: { value: true, message: "Campo email requerido" },
                  minLength: { value: 7, message: "El email debe tener minimo 7 caracteres" },
                  maxLength: { value: 50, message: " El email debe tener máximo 50 caracteres" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Formato incorrecto de E-mail"
                  }
                })}

              />

            </div>

            <div className="gap-2 justify-center p-5 flex w-full">

              <input

                type="text"
                placeholder="Ingresa tu password"
                className={clsx("p-2 rounded text-black w-[60%]")}
                required

                {...register('password', {
                  required: { value: true, message: "Campo password requerido" }
                })}

              />

            </div>


            <button className={" text-black px-3 rounded bg-white disabled:bg-stone-400"} disabled={isSubmitted ? !isValid : false /*isSubmitted && !isValid*/}> Ingresar</button>

            {
              errors.password && (
                <p className=" text-red-500 text-center text-sm font-bold-sm w-full">
                  {errors.password?.message}
                </p>
              )
            }
            {
              errors.email && (
                <p className=" text-red-500 text-center text-sm font-bold-sm w-full">
                  {errors.email?.message}
                </p>
              )
            }



            {
              tokenExists ? <p className="text-white">
                Bienvenido Ahora estás logueado y ya tienes tu token en el local storage
              </p> : <p className="text-white"> Intenta ingresar con el correo: thernandez@void.com y la contraseña: 12345</p>
            }

          </form>



        </div>


      </main>

    </>
  )
}
