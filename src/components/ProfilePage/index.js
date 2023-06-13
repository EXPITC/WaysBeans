import { React, useContext, useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { API, handleError } from "../../config/api";
import convertRupiah from "rupiah-format";
import Barcode from "./barcode";

import Header from "../Header";
import Icon from "../../img/Icon.svg";
import {
  Wrapper,
  FlexCollum,
  TextW,
  Flex,
  Pp,
  Pp2,
  ButtonsC,
  ButtonsW,
  ButtonsS,
  Preview,
  Spliter,
} from "./ProfilePage.styled";
import useSocket from "../../config/socket";
import convertStamp from "../../utils/convertStamp";

const initialInputOpen = {
  fullname: false,
  email: false,
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const socket = useSocket();

  const [isLoading, setLoading] = useState(false);

  const { state, dispatch } = useContext(UserContext);
  const { user } = state;
  const isOwner = useMemo(
    () => (user?.role === "owner" ? true : false),
    [user?.role]
  );

  const data = useMemo(
    () => ({
      title1: isOwner ? "Profile Partner" : "My Profile",
      title2: isOwner ? "History Order" : "History Transaction",
      titleName: isOwner ? "Name Partner" : "Full Name",
      img: isOwner ? "Partner" : "profile",
    }),
    [isOwner]
  );

  const [historyTransactions, setHistoryTransactions] = useState([]);
  const initialForm = useMemo(
    () => ({
      fullname: user?.fullname,
      email: user?.email,
      image: user?.image,
    }),
    [user]
  );
  const [form, setForm] = useState(initialForm);
  useEffect(() => setForm(initialForm), [initialForm]); // To sync after update success and dispatch global data

  const [isInputOpen, setInputOpen] = useState(initialInputOpen);
  const inputRef = useRef(null);

  // To enter focus mode when switch to input element
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isInputOpen]);

  // prerender image
  const [pre, setPre] = useState(
    user?.image.replace("q_auto:good", "q_auto:eco")
  );
  const isNotSame = useMemo(
    () => ({
      image: form.image !== user.image,
      fullname: form.fullname !== user.fullname,
      email: form.email !== user.email,
    }),
    [form, user]
  );

  useEffect(() => {
    if (!user?.id) return console.error("user id cannot be found");
    const room = "update/transaction/" + user.id;
    socket.on("connect", () => {
      console.info("socket alive:", socket.connected);
      socket.emit("subscribe/update/transaction", room);
    });

    const loadTransaction = () => {
      socket.emit("loadTransaction", user?.id);
      socket.on("transaction", (data) => {
        setHistoryTransactions(data);
      });
    };
    // Init populate
    loadTransaction();

    // receive emit from subscribe/update/transaction
    socket.on("update/transaction", () => {
      loadTransaction();
    });

    socket.on("connect_error", (err) => {
      console.error(err.message);
    });
    return () => {
      socket.emit("unsubscribe/update/transaction", room);
      socket.removeAllListeners();
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Handle
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    }));
    if (e.target.type === "file" && e.target.files[0])
      setPre(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = async (e) => {
    for (const attribute in form) {
      if (form[attribute] === "") return alert("form cannot be empty");
    }
    e.preventDefault();

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      // If not same with previous data then create update data
      if (isNotSame.image) formData.set("image", form.image, form.image?.name);
      if (isNotSame.fullname) formData.set("fullname", form.fullname);
      if (isNotSame.email) formData.set("email", form.email);

      await API.patch("/user", formData, config).then(async () => {
        // Update global state so header profile can change
        const response = await API.get("/auth");
        if (!response) return setLoading(false);
        dispatch({
          status: "login",
          payload: response.data,
        });
        setInputOpen(initialInputOpen);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      handleError(err);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setPre(user?.image);
  };

  return (
    <>
      <Header isTroll={!isOwner} />
      <Wrapper>
        <FlexCollum>
          <h1>{data.title1}</h1>
          <Flex>
            <FlexCollum>
              <label className="second" htmlFor="imgFile">
                <img className="img" src={pre} alt={user.fullname} />
                <input
                  type="file"
                  name="image"
                  id="imgFile"
                  hidden
                  onChange={handleChange}
                />
              </label>
              {(isNotSame.fullname ||
                isNotSame.email ||
                isNotSame.email ||
                isNotSame.image) && (
                <>
                  <button
                    type="submit"
                    onClick={isLoading ? null : handleUpdate}
                  >
                    {isLoading ? "Loading..." : "Update"}
                  </button>
                  {!isLoading && <button onClick={handleCancel}>Cancel</button>}
                </>
              )}
            </FlexCollum>
            <FlexCollum className="h">
              <div>
                <Pp
                  b
                  c
                  isPointer={!isInputOpen.fullname}
                  onClick={() =>
                    setInputOpen({ ...initialInputOpen, fullname: true })
                  }
                >
                  {data.titleName}
                </Pp>
                {!isInputOpen.fullname ? (
                  <Pp
                    isPointer={!isInputOpen.fullname}
                    onClick={() =>
                      setInputOpen({ ...initialInputOpen, fullname: true })
                    }
                  >
                    {form.fullname}
                  </Pp>
                ) : (
                  <input
                    required
                    name="fullname"
                    type="text"
                    ref={inputRef}
                    value={form.fullname}
                    onChange={handleChange}
                    onBlur={() => setInputOpen(initialInputOpen)}
                  />
                )}
              </div>
              <div>
                <Pp b c>
                  Email
                </Pp>
                {!isInputOpen.email ? (
                  <Pp
                    onClick={() =>
                      setInputOpen({ ...initialInputOpen, email: true })
                    }
                  >
                    {form.email}
                  </Pp>
                ) : (
                  <input
                    required
                    name="email"
                    type="email"
                    ref={inputRef}
                    value={form.email}
                    onChange={handleChange}
                    onBlur={() => setInputOpen(initialInputOpen)}
                  />
                )}
              </div>
            </FlexCollum>
          </Flex>
        </FlexCollum>
        <FlexCollum>
          <h1>{data.title2}</h1>
          {/* Loop */}
          <div className="wrapperHistory">
            {historyTransactions.map((t) => (
              <div key={t.id}>
                {
                  // t = each transaction data,
                  // i = product information
                }
                {t.product.map((i) => {
                  return (
                    <Flex
                      w
                      onClick={() => {
                        navigate(`/Transaction/detail/${t.id}`);
                      }}
                      key={t.id + "-" + i.id}
                    >
                      <Spliter>
                        <Preview
                          src={i.img.replace("q_auto:good", "q_auto:eco")}
                          alt={i.title}
                        />
                        <FlexCollum>
                          <div className={"split"}>
                            <h1> {i.title}</h1>
                            <Pp2 n b>
                              {convertStamp(i.order.createdAt)[0]}
                            </Pp2>
                            <Pp2 n a>
                              {convertStamp(i.order.createdAt)[1]}
                            </Pp2>
                          </div>
                          <Pp2>Price : {i.price}</Pp2>
                          <Pp2>Qty : {i.order.qty}</Pp2>
                          <Pp2 bb b>
                            Sub Total :{" "}
                            {convertRupiah.convert(i.price * i.order.qty)}
                          </Pp2>
                        </FlexCollum>
                      </Spliter>
                      {
                        // its not same component
                      }
                      {t.status === "Cancel" && (
                        <FlexCollum btwn i c t>
                          <img
                            src={Icon}
                            className={"icon"}
                            alt="icon cancel"
                          />
                          <Barcode src={t.status} />
                          <ButtonsC c red>
                            {t.status}
                          </ButtonsC>
                        </FlexCollum>
                      )}
                      {t.status === "Waiting Approve" && (
                        <FlexCollum btwn i c t>
                          <img
                            src={Icon}
                            className={"icon"}
                            alt="icon waiting approve"
                          />
                          <Barcode src={t.status} />
                          <ButtonsW w>
                            <TextW>{t.status}</TextW>
                          </ButtonsW>
                        </FlexCollum>
                      )}
                      {t.status === "On The Way" && (
                        <FlexCollum btwn i t c>
                          <img
                            src={Icon}
                            className={"icon"}
                            alt="icon on the way"
                          />
                          <Barcode src={t.status} />
                          <ButtonsS>{t.status}</ButtonsS>
                        </FlexCollum>
                      )}
                      {t.status === "Success" && (
                        <FlexCollum btwn i t c>
                          <img
                            src={Icon}
                            className={"icon"}
                            alt="icon success"
                          />
                          <Barcode src={t.status} />
                          <ButtonsS>{t.status}</ButtonsS>
                        </FlexCollum>
                      )}
                    </Flex>
                  );
                })}
              </div>
            ))}
          </div>
        </FlexCollum>
      </Wrapper>
    </>
  );
};

export default ProfilePage;
