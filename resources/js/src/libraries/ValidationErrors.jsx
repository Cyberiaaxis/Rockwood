import React from 'react'

export default function ValidationErrors({ data }) {
    return (
        <>
            {Array.isArray(data) ? <>
                {data.length ? data.map((x, i) =>
                    <div key={i}>
                        {i + 1}.  {x}
                    </div>
                ) : <div>{data?.message}</div>}
            </> : data?.message}
        </>
    )
}
