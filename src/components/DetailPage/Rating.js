import React, { useState, useEffect, useCallback } from "react";
import { API, handleError } from "../../config/api";
import {
  Wrapper,
  Rate as Star,
  InputSection,
  ReviewsWrapper,
  RatingComments,
  Comments,
  AutoComments,
} from "./RatingPage.styled";
import starIcon from "../../img/star.png";
import blankstarIcon from "../../img/blankstar.png";

const initalForm = {
  comment: "",
  rating: 0,
};

const Rating = ({ id }) => {
  const [token, setToken] = useState(null);
  const [comments, setComments] = useState([]);
  // Form for rating
  const [form, setForm] = useState(initalForm);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      // Get token(rating) to require for do rating // user without token can't do rating
      API.get(`/rating/token/${id}`, { signal })
        .then((res) => {
          setToken(res.data?.token);
        })
        .catch((err) => handleError(err));

      // Get comment of this product
      API.get(`/rating/${id}`, { signal })
        .then((res) => setComments(res.data.comments))
        .catch((err) => handleError(err));
    })();
    return () => controller.abort();
  }, [form, id]);

  const Rate = useCallback(
    ({ state, totalStar }) => {
      const container = [];

      switch (state) {
        case "input":
          // Use 1 - 6 its because there is no zero rating for form for db,
          // at minum client should rating 1, rating zero === choose to not rating.
          for (let i = 1; i < 6; i++) {
            if (i > form.rating) {
              // Add blank star
              container.push(
                <Star
                  key={i + "-" + form.rating}
                  src={blankstarIcon}
                  onMouseEnter={() =>
                    setForm((prev) => ({ ...prev, rating: i }))
                  }
                />
              );
            } else {
              // Add star
              container.push(
                <Star
                  key={i + "-" + form.rating}
                  src={starIcon}
                  onMouseEnter={() =>
                    setForm((prev) => ({ ...prev, rating: i }))
                  }
                />
              );
            }
          }
          break;
        case "rating":
          for (let i = 1; i < 6; i++) {
            if (i > totalStar) {
              // Add blank star
              container.push(
                <Star key={i + "-" + totalStar} R src={blankstarIcon} />
              );
            } else {
              // Add star
              container.push(
                <Star key={i + "-" + totalStar} R src={starIcon} />
              );
            }
          }
          break;
        default:
          return <></>;
      }
      return container;
    },
    [form.rating]
  );

  const handleAutoGrow = (e) => {
    e.preventDefault();
    if (e.target.value === "") return (e.target.style.height = "10px");
    e.target.style.height = `${e.target.scrollHeight - 15}px`;
  };

  const enter = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      if (!token?.id) return;
      if (form.comment === "") return;

      // Prevent user to upload zero rating
      let formData = form;
      if (form.rating === 0) formData = { ...form, rating: 1 };

      e.preventDefault();
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      API.patch(`/rating/${token.id}`, formData, config)
        .then(() => {
          setForm(initalForm);
          e.target.style.height = `0px`;
        })
        .catch((err) => handleError(err));
    }
  };

  return (
    <Wrapper>
      {token && (
        <div className="rating">
          <Rate state={"input"} />
          <InputSection
            value={form.comment}
            placeholder="Put your review here~"
            onInput={handleAutoGrow}
            onChange={(e) => {
              e.preventDefault();
              setForm((prev) => ({
                ...prev,
                comment: e.target.value,
              }));
            }}
            onKeyDown={enter}
          />
        </div>
      )}
      <ReviewsWrapper>
        <h1>Reviews</h1>
        <RatingComments>
          {/* Loop */}
          {comments.map((c) => {
            return (
              <div key={c?.comment + c.id}>
                <Rate state={"rating"} totalStar={c?.rating} />
                <AutoComments>
                  <Comments>
                    <h4>{c?.comment}</h4>
                  </Comments>
                </AutoComments>
              </div>
            );
          })}
        </RatingComments>
      </ReviewsWrapper>
    </Wrapper>
  );
};

export default Rating;
