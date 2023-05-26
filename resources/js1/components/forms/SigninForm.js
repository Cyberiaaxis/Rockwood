import { useForm } from 'react-hook-form';
import { gameServerService } from '../../serviceWorker';

const SigninForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        gameServerService('login', data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Email<input type="email" {...register("email")} /></p>
            <p>Password<input type="password" {...register("password")} /></p>
            <button type="submit">Sign in</button>
        </form>
    );
}

export {
    SigninForm
};
