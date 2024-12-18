import "./AddUser.css";

export default function AddUser() {
  return (
    <div>
      <div className="col-11 m-auto div-Description-Add-User">
        <h5>Add User</h5>
      </div>

      <div className="col-11 m-auto" style={{ padding: "2rem 0rem" }}>
        <form action="" className="Form-Add-User col-12">
          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label
              className="label-input-form-login col-12"
              htmlFor="FirstName"
            >
              First Name
            </label>
            <input
              className="input-form-login col-12"
              id="FirstName"
              type="text"
              placeholder="Enter your First Name"
            />
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label className="label-input-form-login col-12" htmlFor="LastName">
              Last Name
            </label>
            <input
              className="input-form-login col-12"
              id="LastName"
              type="text"
              placeholder="Enter your Last Name"
            />
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label className="label-input-form-login col-12" htmlFor="Email">
              Email
            </label>
            <input
              className="input-form-login col-12"
              id="Email"
              type="text"
              placeholder="Enter your Email"
            />
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label className="label-input-form-login col-12" htmlFor="Age">
              Age
            </label>
            <input
              className="input-form-login col-12"
              id="Age"
              type="text"
              placeholder="Enter your Age"
            />
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label
              className="label-input-form-login col-12"
              htmlFor="PhoneNumber"
            >
              Phone Number
            </label>
            <input
              className="input-form-login col-12"
              id="PhoneNumber"
              type="text"
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label
              className="label-input-form-login col-12"
              htmlFor="birthDate"
            >
              birth Date
            </label>
            <input
              className="input-form-login col-12"
              id="birthDate"
              type="text"
              placeholder="Enter your birth Date"
            />
          </div>

          <button className="col-8 col-sm-7 col-md-7 col-lg-5 col-xl-4 button-form-login">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
