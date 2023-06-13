import { React, useState, useEffect, useMemo } from "react";
import { API, handleError } from "../../config/api";
import convertRupiah from "rupiah-format";

import {
  Wrapper,
  WrapOrder,
  Pp,
  WrapOrder2,
  Flex,
  FlexCollum,
  Wrap1,
  Wrap2,
  Wrap3,
} from "./DetailTrans.styled";

import Header from "../Header";
import { useParams } from "react-router";

const DetailTransPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState([]);
  const [transaction, setTransaction] = useState(null);
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get(`/transaction/${id}`, { signal })
        .then((res) => {
          setOrder(res.data.transaction.product);
          setTransaction(res.data.transaction);
        })
        .catch((err) => handleError(err));
    })();
    return () => controller.abort();
  }, [id]);

  const total = useMemo(
    () => order.reduce((current, b) => current + b.order.qty, 0),
    [order]
  );
  return (
    <>
      <Header isTroll={false} />
      <Wrapper>
        <h1> Transaction</h1>
        <h2>Review Your Transaction</h2>
        <WrapOrder>
          <div className="over">
            <WrapOrder2>
              {/* TC~REPEAT */}
              <tbody>
                <tr>
                  {order.map((p) => {
                    return (
                      <Flex key={p.id}>
                        <Wrap1>
                          <img src={p.img} alt={p.title} />
                          <Wrap2>
                            <Wrap3>
                              <h4>{p.title}</h4>
                            </Wrap3>
                            <Wrap3>
                              <div>
                                <h4 className="pinkBg">{p.order.qty}</h4>
                              </div>
                              <p>
                                {convertRupiah.convert(p.order.qty * p.price)}
                              </p>
                            </Wrap3>
                          </Wrap2>
                        </Wrap1>
                      </Flex>
                    );
                  })}
                </tr>
              </tbody>
            </WrapOrder2>
          </div>
          <FlexCollum>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Wrap3>
                      <Pp>Subtotal</Pp>
                      <Pp r="true">
                        {convertRupiah.convert(transaction?.price)}
                      </Pp>
                    </Wrap3>
                    <Wrap3>
                      <Pp>Qty</Pp>
                      <Pp>{total}</Pp>
                    </Wrap3>
                    <Wrap3>
                      <Pp>Ongkir</Pp>
                      <Pp r="true">Rp.10.000</Pp>
                    </Wrap3>
                  </td>
                </tr>
              </tbody>
            </table>

            <Wrap1>
              <Pp r="true" b="true">
                TOTAL
              </Pp>
              <Pp r="true">
                {convertRupiah.convert(transaction?.price + 10000)}
              </Pp>
            </Wrap1>
          </FlexCollum>
        </WrapOrder>
      </Wrapper>
    </>
  );
};

export default DetailTransPage;
