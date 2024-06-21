import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './css/signup.css'

const SignUp = () => {
  const navigate = useNavigate();
  const SignUpSchema = Yup.object().shape({
    role: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Role is required"),
    category: Yup.string().required("Category is required"),
    businessName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Business name is required"),
    address: Yup.string().required("Address is required"),
    RegisterMobile: Yup.string().required("Register Mobile is required"),
    Mobile1: Yup.string().required("Mobile 1 is required"),
    Mobile2: Yup.string(),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Status: Yup.string().required("Status is required"),
    Website: Yup.string().url("Invalid URL"),
    logo: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      role: "",
      category: "",
      businessName: "",
      address: "",
      RegisterMobile: "",
      Mobile1: "",
      Mobile2: "",
      Email: "",
      Status: "",
      Website: "",
      logo: null,
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      const data = new FormData();
      data.append('Category', values.category);
      data.append('BussinessName', values.businessName);
      data.append('Address', values.address);
      data.append('Mobile1', values.Mobile1);
      data.append('Mobile2', values.Mobile2);
      data.append('Email', values.Email);
      data.append('RegisterMobile', values.RegisterMobile);
      data.append('Role', values.role);
      let headers
      data.append('Status', values.Status);
      if (values.logo) {
        data.append('logo', values.logo);
        headers = {
          'Content-Type': 'multipart/form-data'
      }
      }else{
        headers = {
          'Content-Type': 'x-www-form-urlencoded'
        }
      }
      try {
        console.log('data :', data);
        const result = await axios.post('http://localhost:804/register', data,headers);
        console.log('result', result.data.Success);
        if(result.data.Success === true){
          localStorage.setItem( "Taxposter", result?.data?.token);
          localStorage.setItem( "Taxposter/RegisterMobile", values.RegisterMobile);
          navigate(`/home?Number=${data.RegisterMobile}`)
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    },
  });

  const { handleSubmit, handleChange, setFieldValue, errors, values, touched } = formik;

  return (
    <div className="signup-page bg-success-subtle d-flex justify-content-center align-items-center">
      <div className=" bg-white p-3">
        <h1 className="mb-3">Signup</h1>
        <form onSubmit={handleSubmit} className="row signup-form">
          <div className="w-50">
          <label>Role :</label><br/>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="role"
            onChange={handleChange}
            value={values.role}
            className=" w-100"
          />
          {errors.role && touched.role ? (
            <span className="text-danger">{errors.role}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Category :</label><br/>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            value={values.category}
            className=" w-100"
          />
          {errors.category && touched.category ? (
            <span className="text-danger">{errors.category}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Business Name :</label><br/>
          <input
            type="text"
            id="businessName"
            name="businessName"
            placeholder="Business Name"
            onChange={handleChange}
            value={values.businessName}
            className=" w-100"
          />
          {errors.businessName && touched.businessName ? (
            <span className="text-danger">{errors.businessName}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Address :</label><br/>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            onChange={handleChange}
            value={values.address}
            className=" w-100"
          />
          {errors.address && touched.address ? (
            <span className="text-danger">{errors.address}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Register Mobile :</label><br/>
          <input
            type="number"
            name="RegisterMobile"
            id="registerMobile"
            placeholder="Register Mobile"
            onChange={handleChange}
            value={values.RegisterMobile}
            className=" w-100"
          />
          {errors.RegisterMobile && touched.RegisterMobile ? (
            <span className="text-danger">{errors.RegisterMobile}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Mobile 1 :</label><br/>
          <input
            type="number"
            name="Mobile1"
            id="mobile1"
            placeholder="Mobile 1"
            onChange={handleChange}
            value={values.Mobile1}
            className=" w-100"
          />
          {errors.Mobile1 && touched.Mobile1 ? (
            <span className="text-danger">{errors.Mobile1}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Mobile 2 :</label><br/>
          <input
            type="number"
            name="Mobile2"
            id="mobile2"
            placeholder="Mobile 2"
            onChange={handleChange}
            value={values.Mobile2}
            className=" w-100"
          />
          {errors.Mobile2 && touched.Mobile2 ? (
            <span className="text-danger">{errors.Mobile2}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Email :</label><br/>
          <input
            type="email"
            name="Email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.Email}
            className=" w-100"
          />
          {errors.Email && touched.Email ? (
            <span className="text-danger">{errors.Email}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Status :</label><br/>
          <input
            type="text"
            name="Status"
            id="status"
            placeholder="Status"
            onChange={handleChange}
            value={values.Status}
            className=" w-100"
          />
          {errors.Status && touched.Status ? (
            <span className="text-danger">{errors.Status}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Website :</label><br/>
          <input
            type="text"
            name="Website"
            id="website"
            placeholder="Website"
            onChange={handleChange}
            value={values.Website}
            className=" w-100"
          />
          {errors.Website && touched.Website ? (
            <span className="text-danger">{errors.Website}</span>
          ) : null}
          </div>
          <div className="w-50">
          <label>Logo :</label><br/>
          <input
            type="file"
            name="logo"
            id="logo"
            placeholder="logo"
            onChange={(e) => setFieldValue("logo", e.target.files[0])}
            className="w-100"
          />
          </div>
          <div className="col-12">
          <button type="submit" className="w-100">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
