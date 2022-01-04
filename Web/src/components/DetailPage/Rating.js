import React, { useState, useEffect } from 'react';
import { API, handleError } from '../../config/api'
import {Wrapper,Rate, InputSection ,ReviewsWrapper ,RatingComments ,Comments ,AutoComments} from './RatingPage.styled'
import Star from '../../img/star.png'
import blankstar from '../../img/blankstar.png'


const Rating = () => {
    const [token, setToken] = useState(null)
    const [data, setData] = useState({
        comment: '',
        rating: ''
    })
    const getToken = () => {
        API.get(' ')
            .then(res => setToken(res))
    }
    const [y, setY] = useState(0)
    useEffect(() => {
        setData({
            ...data,
            rating: y
        })
    },[y])
    const _Rate = ({state, R}) => {
        let container = [];
        let x = 5
        let z;
        switch (state) {
            case 'input':
                z = x - y
                for (let i = 1; i < 6; i++) {
                    if (x <= z) {
                        container.push(<Rate src={blankstar} onClick={() => setY(i)} />)
                    } else {
                        container.push(<Rate src={Star} onClick={() => { setY(i) }} />)
                    }
                    x--
                }
                break;
            case 'rating':
                z = x - R
                for (let i = 0; i < 5; i++){
                    if (x <= z) {
                        container.push(<Rate R src={blankstar} />)
                    } else {
                        container.push(<Rate R src={Star} />)
                    }
                    x--
                }
        }
        return container
    }
    const autogrow = (e) => {
        e.target.style.height = `${e.target.scrollHeight}px`;
    }
    const enter = (e) => {
        // e.preventDefault();
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            e.preventDefault();
            // const config = {
            //     header: {
            //         'Content-Type': 'application/json'
            //     }
            // }
            if (data.comment != '') {
                console.log('have')
                // API.post('', data, config)
                //     .then(() => {
                //         setY(0)
                //         setData({
                //             comment: ''
                //         })
                //     })
            }
            
            setY(0)
            setData({
                comment: '',
                rating: ''
            })
            e.target.style.height = `0px`;
        }
    }
    return (
        <Wrapper>
            <_Rate state={'input'} />
            <InputSection
                value={data.comment}
                placeholder='Put your review here~'
                onInput={autogrow} onChange={(e) => {
                    setData({
                     ...data,
                    comment: e.target.value
                    })
                }}
                onKeyDown={(e) => { enter(e) }} />
            <ReviewsWrapper>
                <h1>Reviews</h1>
                <RatingComments>
                    <_Rate state={'rating'} R={3} />
                    <AutoComments>
                        <Comments><h4>Well Hello there</h4></Comments>
                    </AutoComments>
                </RatingComments>
            </ReviewsWrapper>
        </Wrapper>
    )

}

export default Rating