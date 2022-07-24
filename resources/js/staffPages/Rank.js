import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "../../styles/LoginForm.scss";


const useStyles = makeStyles({
    root: {
        padding: 120,
        paddingTop: 20,
        //   backgroundColor: 'blue',
    },
});


export default function Rank() {
    return (
        <React.Fragment>
        <form className="form-inline" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" placeholder="Rank name" {...register("text", { required: true })} />
                </div>
                <div className="form-group">
                        <button type="submit">
                           Create
                        </button>
                    </div>
            </div>
        </form>
        </React.Fragment>

    )
}

