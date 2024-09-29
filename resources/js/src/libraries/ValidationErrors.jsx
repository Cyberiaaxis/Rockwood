import React from 'react';

/**
 * ValidationErrors Component
 * 
 * This component displays validation error messages. It accepts a `data` prop,
 * which can either be an array of error messages or an object containing a message.
 * 
 * @param {Object} props - The component props
 * @param {Array|Object} props.data - An array of error messages or an object with a message
 * 
 * @returns {JSX.Element} The rendered error messages or a single message.
 */
export default function ValidationErrors({ data }) {
    return (
        <>
            {Array.isArray(data) ? (
                <>
                    {data.length ? (
                        data.map((error, index) => (
                            <div key={index}>
                                {index + 1}. {error}
                            </div>
                        ))
                    ) : (
                        <div>{data?.message}</div>
                    )}
                </>
            ) : (
                <div>{data?.message}</div>
            )}
        </>
    );
}
