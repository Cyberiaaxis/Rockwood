import { useForm } from 'react-hook-form';
import { gameServerService } from '../../services';

const Test2Form = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        gameServerService('user', data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Test<input type="text" value="test2" {...register("test")} /></p>
            <button type="submit">Test 2</button>
        </form>
    );
}

export {
    Test2Form
};
