import { useState } from "react";
import "../styles/RegistrationForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import gameServerApi from "../libraries/gameServerApi";
import { useNavigate, Link } from "react-router-dom";

const RegistrationForm = (onOK) => {
    const [message, setMessage] = useState('');
    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
        clearErrors,
    } = useForm();
    const navigate = useNavigate();

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 500);
    }
    
    const onSubmit = async (data) => {
        const result = gameServerApi("register", 'POST', data );

         if(result.status){
            setMessage(result.message);
            onOK = message;
            refreshPage();
        }else{
            for (const [fieldName, errors] of Object.entries(result.errors)) {
                setError(fieldName, {
                    type: "manual",
                    message: errors[0],
                });
        }
    }

    };
    return (
        <>
        <div>{errors?.email?.message || message }</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <div className="input-group">
                        <span className="form-addon">
                            <FontAwesomeIcon icon={faUser} color="#63102f" size="xs" />
                        </span>
                        <input type="text" placeholder="Name" className="form-control" {...register("name", { required: true })} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <span className="form-addon">
                            <FontAwesomeIcon icon={faEnvelope} color="#63102f" size="xs" />
                        </span>
                        <input type="email" placeholder="Email" className="form-control" {...register("email", { required: true })} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <span className="form-addon">
                            <FontAwesomeIcon icon={faKey} color="#63102f" size="xs" />
                        </span>
                        <input type="password" placeholder="Password" className="form-control" {...register("password", { required: true, maxLength: 20 })} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <span className="form-addon">
                            <FontAwesomeIcon icon={faKey} color="#63102f" size="xs" />
                        </span>
                        <input type="password" placeholder="Confirm Password" className="form-control" {...register("password_confirmation", { required: true, maxLength: 20 })} />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary registerButton">
                        Join Us
                    </button>
                </div>
            </form>
        </>
    );
};

export default RegistrationForm;
