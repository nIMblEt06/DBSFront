import React from 'react'
import "../App.css"

function Table(props) {
    const { details } = props;
    function toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            rv[i] = arr[i];
        return rv;
    }
    const cards = details.map(row => {
        let rowObject = toObject(row)
        return <tr>
            <td>{rowObject['4']}</td>
            <td>{rowObject['5']}</td>
            <td>{rowObject['6']}</td>
        </tr>
    })
    return (
        <div className='tableContainer'>
            {details.length == 0 ? "you have no bookings made." : <table>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                </tr>
                {cards}
            </table>}
        </div>
    )
}

export default Table