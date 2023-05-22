import React from 'react';

export default function SelectOptions({ uniq }) {
    return (
        uniq.map(uname => {
            return (
                <option key={uname}>{uname}</option>
            )
        })
    )
}
