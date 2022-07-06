import { useState, useEffect, useContext } from "react";
import "../styles/LoginForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import gameServerApi from "../libraries/gameServerApi";
import Model from "./Model";
import RegistrationForm from "./RegistrationForm";
import ForgetPassword from "./ForgetPassword";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../libraries/AuthContext";
// import { ModalContext } from "../libraries/ModalContext";

const Login = () => {
    const { user, setUser } = useContext(AuthContext);
    // const [modalState, setModalState] = useState({modal: '', opened: false});
    const [registrationModal, setRegistrationModal] = useState(false);
    const [forgetModal, setForgetModal] = useState(false);
    const handleOK = (event) => {
        // console.log(event);
    };

    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
        clearErrors,
    } = useForm();
    const history = useHistory()

    const onSubmit = async (data) => {
        // console.log("data", data);
        const result = await gameServerApi("auth/login", 'POST',  data );
        // console.log("result",result);
        if (result.userId) {
            const userDetails = {
                userId: result.userId,
                userName: result.userName,
                userRole: result.userRoles
            };
            setUser(userDetails);
            history.push("/dashboard");
        } else {
            // console.log(result);
            for (const [fieldName, errors] of Object.entries(result.errors)) {
                setError(fieldName, {
                    type: "manual",
                    message: errors[0],
                });
            }

            setTimeout(() => {
                clearErrors();
            }, 10000);
        }
    };

    return (
        <>
            <div>
                <span className="top" onClick={() => {
                    setForgetModal(true);
                    setRegistrationModal(false);
                    // setModal(forgetModal);
                 }}>
                    Recover Account
                </span>

                <form className="form-inline" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="form-addon">
                                <FontAwesomeIcon icon={faUser} color="#63102f" size="xs" />
                            </span>

                            <input type="email" placeholder="Username" {...register("email", { required: true })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="form-addon">
                                <FontAwesomeIcon icon={faKey} color="#63102f" size="xs" />
                            </span>

                            <input type="password" placeholder="Password" className="form-control" {...register("password", { required: true })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            <FontAwesomeIcon icon={faArrowAltCircleRight} color="red" size="xs" />
                        </button>
                    </div>
                </form>
                <span className="bottom" onClick={() => {
                    setRegistrationModal(true)
                    setForgetModal(false);
                    // setModal(registrationModal);
                    }}>
                    Join Us
                </span>
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            {registrationModal ? (
                <Model title="Singup" onCancel={() => setRegistrationModal(false)}>
                    <RegistrationForm onOK={handleOK} />
                </Model>
            ) : (
                forgetModal && (
                    <Model title="Forget Password" onCancel={() => setForgetModal(false)}>
                        <ForgetPassword />
                    </Model>
                )
            )}
        </>
    );
};

export default Login;

// https://codesandbox.io/s/react-router-with-authentication-original-forked-ojyht?file=/index.js
