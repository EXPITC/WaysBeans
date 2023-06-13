import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
const Barcode = ({ src }) => {
  const [data, setData] = useState("");
  useEffect(() => {
    QRCode.toDataURL(src).then((qr) => setData(qr));
  }, [src]);

  return (
    <img
      src={data}
      style={{
        width: "50px",
        height: "50px",
      }}
      alt="barcode payment"
    />
  );
};

export default Barcode;
