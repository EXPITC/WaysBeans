import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'
const Barcode = ({ src}) => {

    const [data, setData] = useState('');
    useEffect(() => {
        QRCode.toDataURL(src).then(x => setData(x))            
    }, [])
    
    return <img src={data} style={{width: '50px',
        height: '50px' }}/>
}

export default Barcode