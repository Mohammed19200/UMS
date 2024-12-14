import "./Login.css";

export default function Login() {
  return(
    <div className="col-12 bigest-login-Div">
        
        <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4 bigDiv-form-login">

<div className="div-description-form-login">
<h2 className="h2-form-description">User Management System</h2>
<h3 className="h3-form-description">SIGN IN</h3>
<small className="small-form-description">Enter your credentials to access your account</small>
</div>

<form className="form-login" action="">
<div className="col-10 m-auto">
<label className="col-12 label-input-form-login" htmlFor="email">Email</label>
<input className="col-12 input-form-login" id="email" type="text" placeholder="Enter Your Email"/>
</div>
<div className="col-10 m-auto">
<label className="col-12 label-input-form-login" htmlFor="password">Password</label>
    <input className="col-12 input-form-login" id="password" type="text" placeholder="Enter Your Password"/>
</div>
    <button className="col-10 button-form-login">SIGN IN</button>
</form>

        </div>

        </div>
  )
}
