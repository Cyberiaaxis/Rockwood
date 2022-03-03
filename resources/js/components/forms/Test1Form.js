import { useForm } from 'react-hook-form';
import { gameServerService } from '../../services';

const Test1Form = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        gameServerService('test1', data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Test<input type="text" value="test1" {...register("test")} /></p>
            <button type="submit">Test 1</button>
        </form>
    );
}

export {
    Test1Form
};
