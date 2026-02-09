import { useForm, } from "react-hook-form"
import { useAuth } from "../context/AuthContext";




const Login = () => {
    const { checkLogin } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }, } = useForm(
            {

            }
        );


    const onSubmit = (data) => {
        checkLogin(data.username, data.password);
    }


    return (
        <>
            <div className="login">
                <div className="form-signin text-center">
                    {/* Logo */}
                    <svg fill="none" className="mb-3" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                    <h2 className="fw-bold mb-1 tracking-widest">UNOS</h2>
                    <p className="text-muted mb-4">後台管理系統</p>

                    {/* 表單 */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingEmail"
                                placeholder="name@example.com"
                                {...register("username", {
                                    required: " Email 必填",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "請輸入有效的 Email 格式",
                                    },
                                })}
                            />
                            <label htmlFor="floatingEmail">Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="密碼"
                                {...register("password", {
                                    required: " 密碼 必填",
                                    minLength: {
                                        value: 6,
                                        message: "密碼至少輸入 6 個字元",

                                    }
                                })}
                            />
                            <label htmlFor="floatingPassword">密碼</label>
                        </div>
                        <span className="error-text">
                            {errors.username ? errors.username.message : ""}
                            {errors.password ? errors.password.message : ""}
                        </span>

                        <button className="btn btn-yellow w-100 py-2 mt-2" type="submit" disabled={!isValid}>
                            登入
                        </button>
                    </form>


                </div>
            </div>
        </>


    )
}
export default Login