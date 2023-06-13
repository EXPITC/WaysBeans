import { React, useEffect, useState, useContext, useMemo, useRef } from "react";
import { API, handleError } from "../../config/api";
import Header from "../Header";
import convertRupiah from "rupiah-format";
import {
  Wrapper,
  Product,
  DetailProduct,
  InputT,
  InputS,
  InputD,
  InputP,
  Inline,
} from "./DetailPage.styled";
import { useParams } from "react-router";
import { UserContext } from "../../Context/userContext";
// Components
import Rating from "./Rating";

const TITLE = "title";
const STOCK = "stock";
const DESCRIPTION = "description";
const PRICE = "price";
const IMG = "img";
const DEFAULT = "";

const DetailPage = () => {
  const { id } = useParams();
  const { state } = useContext(UserContext);
  const { user } = state;
  const isOwner = useMemo(
    () => (user?.role === "owner" ? true : false),
    [user?.role]
  );
  const globalController = new AbortController();

  const [editProduct, setEditProduct] = useState({
    title: "",
    stock: "",
    description: "",
    price: "",
    img: "",
    prevImg: "",
  });

  const [product, setProduct] = useState();
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [isEdit, setEdit] = useState(DEFAULT);
  const [isUpdate, setUpdate] = useState(DEFAULT);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    if (isEdit === IMG && inputRef.current) inputRef.current?.click();
  }, [isEdit]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get(`/product/${id}`, { signal })
        .then((res) => {
          setProduct({
            ...res.data.data,
            img: res.data.data.img.replace("/q_auto:good", ""),
          });
          if (!isOwner) return;
          const resProduct = { ...res.data.data };
          delete resProduct.id;
          delete resProduct.seller;
          setEditProduct({
            ...resProduct,
            prevImg: resProduct.img.replace("/q_auto:good", ""),
          });
        })
        .catch((err) => {
          handleError(err);
        });
    })();

    return () => controller.abort();
  }, [id, isRefresh, isOwner]);

  // For admin edit their product

  const handleChange = (e) => {
    if (e.target.name === IMG)
      return setEditProduct((prev) => ({
        ...prev,
        img: e.target.file[0],
        prevImg: URL.createObjectURL(e.target.file[0]),
      }));
    setEditProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const upload = async (e, isPass = false) => {
    if ((!isPass && isUpdate === DEFAULT) || !e.target?.name) return;

    setLoading(true);
    const signal = globalController.signal;
    const configJSON = {
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    };
    const configMultipart = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal,
    };

    const updateProduct = async (newProductData, config = configJSON) =>
      await API.patch(`/product/${id}`, newProductData, config)
        .then(() => {
          setProduct((prev) => ({ ...prev, ...newProductData }));
          setEdit(DEFAULT);
          setUpdate(DEFAULT);
          isLoading(false);
        })
        .catch((err) => {
          handleError(err);
          setEdit(DEFAULT);
          setUpdate(DEFAULT);
          setLoading(false);
        });

    switch (e.target.name || isUpdate) {
      case TITLE:
        updateProduct({ title: editProduct });
        break;
      case STOCK:
        updateProduct({ stock: editProduct.stock });
        break;
      case DESCRIPTION:
        updateProduct({ description: editProduct.description });
        break;
      case PRICE:
        updateProduct({ price: editProduct.price });
        break;
      case IMG:
        const formData = new FormData();
        formData.set("image", editProduct.img, editProduct.img.name);
        updateProduct(formData, configMultipart);
        break;
      default:
        return setEdit(DEFAULT);
    }
  };

  const handleEnter = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      upload(e, true);
      setEdit(DEFAULT);
    }
  };

  const handleBlur = (e) => {
    if (product[e.target.name] !== editProduct[e.target.name]) {
      setUpdate(e.target.name);
      setEdit(DEFAULT);
      return;
    }
    setEdit(DEFAULT);
  };

  const handleImg = (e) => {
    setEditProduct((prev) => ({
      ...prev,
      img: e.target.files[0],
      prevImg: URL.createObjectURL(e.target.files[0]),
    }));
    setUpdate(IMG);
  };

  const handleCancelEdit = () => {
    globalController.abort();
    const resProduct = { ...product };
    delete resProduct.id;
    delete resProduct.seller;

    setEditProduct({
      ...resProduct,
      prevImg: product.img,
    });
    setEdit(DEFAULT);
    setUpdate(DEFAULT);
    setLoading(false);
  };

  // For client order product

  const handleOrder = async (sellerId) => {
    if (isLoading) return;

    if (!sellerId) return console.error("can't get seller id from product");
    if (!product.id) return console.error("No product id found");

    try {
      setLoading(true);
      const form = {
        sellerId,
        products: [
          {
            productId: product.id,
            qty: 1,
          },
        ],
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Create transaction if there is no current transaction
      let transaction = await API.post("/add/transaction", form, config);

      // If transaction already created then just add to order api
      if (transaction.status === 201) {
        transaction = {
          products: form.products,
          transactionId: transaction.data.activeTransaction.id,
        };

        // transaction = JSON.stringify(transaction);
        // Add new order to the transaction
        await API.post("/add/order", transaction, config);
      }
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (err) {
      setLoading(false);
      handleError(err);
    }
  };

  return (
    <>
      <Header refresh={isRefresh} isTroll={true} />
      <Wrapper>
        {isOwner &&
        isEdit === IMG &&
        (isUpdate === DEFAULT || isUpdate === IMG) ? (
          <label htmlFor={IMG}>
            <Product src={editProduct.prevImg} alt={product?.title} />
            <input
              ref={inputRef}
              type="file"
              name={IMG}
              id={IMG}
              onChange={handleImg}
              hidden
            />
          </label>
        ) : (
          <>
            <Product
              src={isOwner ? editProduct.prevImg : product?.img}
              onClick={() => setEdit(IMG)}
              alt={product?.title}
            />
          </>
        )}
        <DetailProduct h noPointer={!isOwner}>
          {isOwner ? (
            <>
              {isEdit === TITLE &&
              (isUpdate === DEFAULT || isUpdate === TITLE) ? (
                <InputT
                  ref={inputRef}
                  name={TITLE}
                  onBlur={handleBlur}
                  value={editProduct.title}
                  onChange={handleChange}
                  onKeyDown={handleEnter}
                />
              ) : (
                <h1 onClick={() => setEdit(TITLE)}>{editProduct?.title}</h1>
              )}
              {isEdit === STOCK &&
              (isUpdate === DEFAULT || isUpdate === STOCK) ? (
                <Inline>
                  <h3>Stock:</h3>
                  <InputS
                    ref={inputRef}
                    onBlur={handleBlur}
                    type="number"
                    name={STOCK}
                    value={editProduct.stock}
                    onChange={handleChange}
                    onKeyDown={handleEnter}
                  />
                </Inline>
              ) : (
                <h3 onClick={() => setEdit(STOCK)}>
                  Stock: {editProduct?.stock}
                </h3>
              )}
              {isEdit === DESCRIPTION &&
              (isUpdate === DEFAULT || isUpdate === DESCRIPTION) ? (
                <InputD
                  ref={inputRef}
                  name={DESCRIPTION}
                  onBlur={handleBlur}
                  value={editProduct.description}
                  onChange={handleChange}
                  onKeyDown={handleEnter}
                />
              ) : (
                <p onClick={() => setEdit(DESCRIPTION)}>
                  {editProduct?.description}
                </p>
              )}
              {isEdit === PRICE &&
              (isUpdate === PRICE || isUpdate === DEFAULT) ? (
                <InputP
                  ref={inputRef}
                  onBlur={handleBlur}
                  value={editProduct.price}
                  name={PRICE}
                  type="number"
                  onChange={handleChange}
                  onKeyDown={handleEnter}
                />
              ) : (
                <h2 onClick={() => setEdit(PRICE)}>
                  {convertRupiah.convert(editProduct?.price)}
                </h2>
              )}
              {isUpdate !== DEFAULT && (
                <>
                  <button name={isUpdate} onClick={isLoading ? null : upload}>
                    {isLoading
                      ? "Loading..."
                      : `Update Product ${
                          isUpdate.charAt(0).toUpperCase() + isUpdate.slice(1)
                        }`}
                  </button>
                  {!isLoading && (
                    <button onClick={handleCancelEdit}>Cancel</button>
                  )}
                </>
              )}
            </>
          ) : (
            // Customer
            <>
              <h1>{product?.title}</h1>
              <h3>Stock: {product?.stock}</h3>
              <p>{product?.description}</p>
              <h2>{convertRupiah.convert(product?.price)}</h2>
              <button onClick={() => handleOrder(product.seller?.id)}>
                {isLoading ? "Loading..." : "Add Cart"}
              </button>
            </>
          )}
        </DetailProduct>
        <Rating id={id} />
      </Wrapper>
    </>
  );
};

export default DetailPage;
