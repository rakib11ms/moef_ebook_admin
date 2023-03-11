import backgroundlogin from "../../images/logincover.png";
import "../Auth/auth.css";
import peoplesRepublicLogo from "../../images/Government of Bangladesh-logo.png";

const loginBg = {
  background: `url(${backgroundlogin})`,
  backgroundRepeat: "no-repeat",
  position: "relative",
  backgroundSize: "cover",
  overflowX: "hiden",
};

function Login() {
  return (
    <>
      <section className="">
        <div className="">
          <div className="login-background-wrapper" style={loginBg}>
            <div className="login-input-divs container">
              <div className="p-5">
                <div className="login-logo-tags">
                  <img
                    className="peopleRepublic"
                    src={peoplesRepublicLogo}
                    alt="পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়-লোগো"
                  />
                  <h6 className="poribesh-tags">
                    পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়
                  </h6>
                </div>
                <div className="login-input-tags-div">
                  <p className="login-input-tags">শুরু করতে লগইন করুন</p>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="আপনার ইউজার আইডি / অফিস আইডি"
                    />
                    <input
                      type="password"
                      className="form-control mt-4"
                      id="inputPassword"
                      placeholder="পাসওয়ার্ড"
                    ></input>
                    <button type="submit" className="login-submit-button mb-3">
                      লগইন
                    </button>
                  </div>
                  <p className="change-pass">
                    পাসওয়ার্ড ভুলে গেছেন ?{" "}
                    <span className="change-pass-span">এখনই পরিবর্তন করুন</span>
                  </p>
                  <hr className="hr-line" />
                  <div className="">
                    <button
                      type="button"
                      className="btn btn-outline-success nobondhon-button"
                    >
                      নিবন্ধন করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
