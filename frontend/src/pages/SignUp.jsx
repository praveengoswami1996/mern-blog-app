import InputBox from "../components/InputBox"
import PasswordInput from "../components/PasswordInput"
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { handleSubmit, control, formState: { errors } } = useForm({ mode: "all" });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setErrorMessage(null); //Setting error here to null to clear previous error stored in the state
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      if(data.success === false) {
        return setErrorMessage(data.message);
      }
      setIsLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto">
        {/* Left Side Starts */}
        <div className="flex-1">
          <span>Devv Blog</span>
        </div>
        {/* Left Side Ends */}
        
        {/* Right Side Starts*/}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <Controller 
              name="username"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Name is required"
                },
                pattern: {
                  value: /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/,
                  message: 'Please enter a valid name'
                }
              }}
              defaultValue={""}
              render={({ field: { value, onChange } }) => {
                return (
                  <InputBox 
                    id={"username"}
                    type="text"
                    value={value}
                    onChange={onChange}
                    label={"Your username"}
                    placeholder={"Choose a username"}
                    error={errors.username?.message}
                  />
                )
              }}
            />

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
                    placeholder={"Create a strong password"}
                    error={errors.password?.message}
                  />
                )
              }}
            />

            <button disabled={isLoading} type="submit" className="w-full inline-flex items-center justify-center px-5 py-2.5 bg-indigo-500 text-white font-semibold rounded-lg">
              { isLoading ? "Signing up...": "Sign Up" }
            </button>
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

export default SignUp