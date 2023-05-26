import React from 'react';
import ReactDOM from 'react-dom';
import { SigninForm } from './forms/SigninForm';
import { Test1Form } from './forms/Test1Form';
import { Test2Form } from './forms/Test2Form';
import { Test3Form } from './forms/Test3Form';
import { ExampleForm } from './forms/ExampleForm';

const Example = () => {

    return (
        <>
            <SigninForm/>
            <hr/>
            <Test1Form/>
            <hr/>
            <Test2Form/>
            <hr/>
            <Test3Form/>
            <hr/>
            <ExampleForm/>
            <hr/>
        </>
    );
}

export default Example;

if (document.querySelector('#root')) {
    ReactDOM.render(<Example />, document.querySelector('#root'));
}
