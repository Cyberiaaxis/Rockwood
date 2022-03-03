import { useForm } from 'react-hook-form';
import { gameServerService } from '../../services';

const ExampleForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);

        gameServerService('test3');

        alert(JSON.stringify(data));
    };

    console.log(watch("example"));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue="test" {...register("example")} />
            <input {...register("exampleRequired", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <button type="submit">Push Me</button>
        </form>
    );
}

export {
    ExampleForm
};
