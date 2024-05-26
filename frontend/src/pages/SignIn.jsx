import { AiFillGoogleCircle } from "react-icons/ai"
import { MdErrorOutline } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from "../components/PasswordInput"
import { Controller, useForm } from "react-hook-form"
import InputBox from "../components/InputBox"
import { useState } from "react"

const SignIn = () => {
  const { handleSubmit, control, formState: { errors } } = useForm({ mode: "all" })
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setErrorMessage(null); 
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      setIsLoading(false);
      if(data.success === false) {
        return setErrorMessage(data.message);
      }
      navigate("/");
    } catch (error) {
      console.log("Error Aaya hai Bhaiya");
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row gap-10 p-3 max-w-4xl mx-auto">
        {/* Left Side Starts */}
        <div className="flex-1">
          <img 
            src={"/sign-up.svg"}
            alt="Sign up Image"
            width={500}
            height={600}
          />
        </div>
        {/* Left Side Ends */}
        
        {/* Right Side Starts*/}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <Controller 
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Email is required"
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format"
                }
              }}
              defaultValue={""}
              render={({ field: { value, onChange } }) => {
                return (
                  <InputBox 
                    id={"email"}
                    type="email"
                    value={value}
                    onChange={onChange}
                    label={"Your email"}
                    placeholder={"xyz@email.com"}
                    error={errors.email?.message}
                  />
                )
              }}
            />

            <Controller 
              name="password"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Password is required"
                }
              }}
              defaultValue={""}
              render={({ field: { value, onChange } }) => {
                return (
                  <PasswordInput 
                    id={"password"}
                    value={value}
                    onChange={onChange}
                    label={"Your password"}
                    placeholder={"**********"}
                    error={errors.password?.message}
                  />
                )
              }}
            />

            <button 
              // disabled={isLoading} 
              type="submit" 
              className="w-full inline-flex items-center justify-center px-5 py-2.5 bg-indigo-500 text-white font-semibold rounded-lg"
            >
              { isLoading ? "Please wait...": "Sign In" }
            </button>

            <button disabled={isLoading} type="button" className="w-full inline-flex items-center justify-center gap-1 px-5 py-2.5 text-indigo-500 border-2 border-indigo-500 font-semibold rounded-lg">
              <span className="text-2xl"><AiFillGoogleCircle /></span>
              Continue with Google
            </button>

            <div className="flex items-center gap-1 text-sm">
              <span>Don't have an account?</span>
              <Link to="/signup" className="text-blue-500">
                Sign up
              </Link>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-10 w-full border border-red-600 rounded-xl bg-red-100 py-3 text-center text-red-600 font-medium flex items-center justify-center gap-2">
              <span><MdErrorOutline className="text-red-600 text-3xl"/></span>
              <span>{ errorMessage }</span>
            </div>
          )}
        </div>
        {/* Right Side Ends */}
      </div>
    </div>
  )
}

export default SignIn