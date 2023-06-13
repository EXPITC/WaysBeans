import { React, useState } from "react";
import { API, handleError } from "../../config/api";

import Header from "../Header";
import Clip from "../../img/clip.svg";
import AddImg from "../../img/add.png";
import {
  Wrapper,
  Preview,
  InputSide,
  Flex,
  Popout,
  Modal,
} from "./AddProduct.styled";

const initialForm = {
  title: "",
  image: "",
  price: "",
  stock: "",
  description: "",
};

const AddProduct = () => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isErr, setErr] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [pre, setPre] = useState(AddImg);

  const handleChange = (e) => {
    if (isErr) setErr(false);
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      try {
        setPre(URL.createObjectURL(e.target.files[0]));
      } catch (e) {
        setPre(AddImg);
      }
    }
  };
  const handleSubmit = async (e) => {
    if (isLoading) return;
    if (isErr) return;
    try {
      setLoading(true);
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("title", form.title);
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("price", form.price);
      formData.set("stock", form.stock);
      formData.set("description", form.description);
      await API.post("/add/product", formData, config);

      setForm(initialForm);
      setPre(AddImg);

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleError(err);
    }
  };

  return (
    <>
      {success && (
        <Popout onClick={() => setSuccess(false)}>
          <Modal>
            <p>Success Add Product</p>
          </Modal>
        </Popout>
      )}
      <>
        <Header noTroll />
        <Wrapper>
          <InputSide>
            <h2>Add Product</h2>
            <input
              required
              type="text"
              name="title"
              placeholder="Title"
              className="first"
              onChange={handleChange}
              value={form.title}
              disabled={isLoading}
              onError={() => setErr(true)}
            />
            <input
              required
              type="number"
              name="stock"
              placeholder="Stock"
              className="first"
              onChange={handleChange}
              value={form.stock}
              disabled={isLoading}
              onError={() => setErr(true)}
            />
            <input
              required
              className="third"
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={form.price}
              disabled={isLoading}
              onError={() => setErr(true)}
            />
            <textarea
              required
              type="text"
              name="description"
              placeholder="Description Product"
              className="first"
              onChange={handleChange}
              value={form.description}
              disabled={isLoading}
              onError={() => setErr(true)}
            />
            <label className="second" htmlFor="imgFile">
              Photo Product
              <img src={Clip} alt="Clip" />
              <input
                hidden
                required
                id="imgFile"
                type="file"
                name="image"
                onChange={handleChange}
                disabled={isLoading}
              />
            </label>
            <Flex>
              <button type="submit" onClick={isLoading ? null : handleSubmit}>
                {isLoading ? "Loading..." : "Add Product"}
              </button>
            </Flex>
          </InputSide>
          <Preview src={pre} />
        </Wrapper>
      </>
    </>
  );
};

export default AddProduct;
