import { React, useState, useEffect } from "react";
import Header from "../Header";
import approve from "../../img/approve.svg";
import cancel from "../../img/cancel.svg";
import { Wrapper, Head, Tab, Special, TwoB } from "./TransactionPage.styled";
import useSocket from "../../config/socket";

const TransactionPage = () => {
  const [transaction, setTransaction] = useState([]);
  const socket = useSocket();
  useEffect(() => {
    socket.on("connect", () => {
      console.info("socket alive: ", socket.connected);
    });

    // Get init transaction data
    socket.emit("loadTransaction");
    socket.on("transaction", (t) => {
      if (!t) return;
      setTransaction(t);
    });

    // Reciver from client
    socket.on("newTransactionData", (t) => {
      if (!t) return;
      setTransaction(t);
    });
    socket.on("connect_error", (err) => {
      console.error(err.message);
    });
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = (transactionId) => {
    socket.emit("accept", transactionId);
    socket.on("acceptData", (t) => {
      setTransaction((prev) => {
        return prev.map((obj) => (obj.id === t.id ? { ...obj, ...t } : obj));
      });
    });
  };
  const handleCancel = (transactionId) => {
    socket.emit("cancel", transactionId);
    socket.on("cancelData", (t) => {
      setTransaction((prev) => {
        return prev.map((obj) => (obj.id === t.id ? { ...obj, ...t } : obj));
      });
    });
  };

  return (
    <>
      <Header isTroll={false} />
      <Wrapper>
        <h1>Income Transaction</h1>
        <Tab>
          <thead>
            <tr>
              <Head n>No</Head>
              <Head n2>Name</Head>
              <Head a>Address</Head>
              <Head p>Products Order</Head>
              <Head s>Status</Head>
              <Head m p>
                Action
              </Head>
            </tr>
          </thead>
          {/* TC~REPEAT */}
          <tbody>
            {transaction?.map((i, index) => {
              return (
                <tr key={i.name + index}>
                  <Special>{index + 1}</Special>
                  <Special>{i.name}</Special>
                  <Special>{i.address}</Special>
                  <Special>
                    {i.product.map((p) => {
                      return `${p.title} x${p.order.qty}, \n`;
                    })}
                  </Special>
                  {i.status === `Waiting Approve` && (
                    <Special w>{i.status}</Special>
                  )}
                  {i.status === `Success` && <Special s>{i.status}</Special>}
                  {i.status === `Cancel` && <Special c>{i.status}</Special>}
                  {i.status === `On The Way` && <Special o>{i.status}</Special>}
                  <Special bt>
                    {i.status === `Waiting Approve` ? (
                      <>
                        <TwoB onClick={() => handleCancel(i.id)} a>
                          Cancel
                        </TwoB>
                        <TwoB onClick={() => handleApprove(i.id)}>Aprove</TwoB>
                      </>
                    ) : (
                      <>
                        {i.status === `Cancel` && (
                          <img src={cancel} alt={`${cancel}`} />
                        )}
                        {i.status === "Success" && (
                          <img src={approve} alt={`${approve}`} />
                        )}
                      </>
                    )}
                  </Special>
                </tr>
              );
            })}
          </tbody>
        </Tab>
      </Wrapper>
    </>
  );
};

export default TransactionPage;
