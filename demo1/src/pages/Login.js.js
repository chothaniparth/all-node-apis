import {useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const SignUpSchema = Yup.object().shape({
    RegisterMobile: Yup.string()
      .required("Register Mobile is required")
      .max(10, "invelid number"),
  });
  const formik = useFormik({
    initialValues: {
      RegisterMobile: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      const data = {
        RegisterMobile: values.RegisterMobile,
      };
      console.log("data :", data);
      const headers = {
        "Content-Type": "x-www-form-urlencoded",
      };
      const result = await axios.post(
        "http://localhost:804/verify",
        data,
        headers
      );
      console.log("result", result);
      if (result.data.Success === true) {
        localStorage.setItem("Taxposter", result?.data?.token);
        localStorage.setItem("Taxposter/RegisterMobile", values.RegisterMobile);
        navigate(`/home`);
      }
    },
  });
  const { handleSubmit, handleChange, errors, values, touched } = formik;


  useEffect(() => {
    const token = localStorage.getItem('Taxposter');
    if (token) {
      navigate('/home');
    }
  }, []);

  const SignUp = ()=>{
    navigate('/signup')
  }

  return (
    <div className="loginPage d-flex justify-content-center align-items-center bg-success-subtle">
      <div className="LoginForm border border-5 border-success rounded-4 p-3 bg-white">
        <h1 className=" mb-3">Login.</h1>
        <label className=" mb-1">Register Mobile :</label>
        <br />
        <input
          className=" mb-3 w-100 px-3 py-1"
          type="number"
          name="RegisterMobile"
          id="registerMobile"
          placeholder="Register Mobile"
          onChange={handleChange}
          value={values.RegisterMobile}
        />
        <br />
        {errors.role && touched.role ? (
          <span className="text-danger">{errors.role}</span>
        ) : null}
        <button
          className=" w-100 border-0 rounded-2 text-white py-1 text-uppercase font-monospace mb-3"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className=" w-100 border-0 rounded-2 text-white py-1 text-uppercase font-monospace"
          type="submit"
          onClick={SignUp}
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Login;
