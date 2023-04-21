import { useEffect, useState } from "react";
import "./App.css";
import generatePassword from "./passwordUtilities";
function App() {
  const [passwordLength, setPasswordLength] = useState(6);

  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [btnDisable, setBtnDisabled] = useState(false);
  useEffect(() => {
    const savedPasswordsText = localStorage.getItem("Passwords");
    const savedPasswords = JSON.parse(savedPasswordsText);
    if (savedPasswords && savedPasswords.length > 0) {
      setPasswords(savedPasswords); 
    }
    const generatedPassword = generatePassword(passwordLength);
    setPassword(generatedPassword);
  }, []);
  const handleSliderChange = (e) => {
    setPasswordLength(e.target.value);
    const generatedPassword = generatePassword(e.target.value);
    setPassword(generatedPassword);
    setBtnDisabled(false);
  };
  const setPasswordLengthColor = (pwlegnth) => {
    if (!pwlegnth) pwlegnth = passwordLength;
    if (pwlegnth < 11) return "bg-danger";
    else if (pwlegnth > 11 && pwlegnth < 20) return "bg-warning";
    else return "bg-success";
  };
  const handleSaveButtonClick = (e) => {
    const newPasswords = [...passwords, password];
    localStorage.setItem("Passwords", JSON.stringify(newPasswords));
    setPasswords(newPasswords);
    setBtnDisabled(true);
  };
  const handlePasswordClick = (e) => {
    e.target.select();
    document.execCommand("copy");
    e.target.focus();
    const selectedPassword = passwords.find((p) => p === e.target.value);
    if (!selectedPassword) {
      const updatedPassword = [...passwords, e.target.value];
      setPasswords(updatedPassword);
      setBtnDisabled(true);
    }
  };
  const handleResetPasswordClick = (e) => {
    setPasswords([]);
    localStorage.setItem("Passwords",JSON.stringify([]));
    localStorage.removeItem("Passwords");
    setBtnDisabled(false);
  };
  return (
    <div className="container">
      {/* Container */}
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column justify-content-center align-items-center">
            {/* Card Section */}
            <div className="card mt-3">
              <div className="card-body">
                <div className="card-title text-center">
                  <h2 className="text-info">Simple Password Generator</h2>
                  <p>Create secure password with Simple Password Generator</p>
                </div>
                <div className="mt-2">
                  <label
                    className="form-label"
                    htmlFor="password-length-slider"
                  >
                    Password Length
                    <span className={`badge ${setPasswordLengthColor()}`}>
                      {passwordLength}
                    </span>
                  </label>
                  {/* Slider */}
                  <input
                    id="password-length-slider"
                    className="form-range"
                    type="range"
                    min={6}
                    max={40}
                    step={1}
                    value={passwordLength}
                    onChange={(e) => handleSliderChange(e)}
                  />
                </div>
                <div className="mt-2">
                  <input
                    className="form-control text-center"
                    type="text"
                    style={{ cursor: "pointer" }}
                    value={password}
                    readOnly={true}
                    onClick={(e) => handlePasswordClick(e)}
                  />
                  <button
                    className="btn btn-info mt-3"
                    onClick={(e) => handleSaveButtonClick(e)}
                    disabled={btnDisable}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-info mt-3 float-end"
                    onClick={(e) => handleResetPasswordClick(e)}
                  >
                    Reset Saved Password
                  </button>
                </div>
              </div>
            </div>
            {/* Password List Card */}
            <div className="card mt-3">
              <div className="card-body">
                <h2 className="text-info">Recent Generated Passwords </h2>
                <ul className="list-group list-group-flush text-center">
                  {passwords.map((password, index) => (
                    <li key={index} className="list-group-item">
                      <span className="fst-italic float-start">
                        {index + 1}
                      </span>
                      <div
                        className={`badge ${setPasswordLengthColor(
                          password.length
                        )}`}
                        style={{ cursor: "pointer" }}
                      >
                        {password}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
