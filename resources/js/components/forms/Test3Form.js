import { useForm } from 'react-hook-form';
import { gameServerService } from '../../services';

const Test3Form = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        gameServerService('test3', data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Test<input type="text" value="test3" {...register("test")} /></p>
            <button type="submit">Test 3</button>
        </form>
    );
}

export {
    Test3Form
};
