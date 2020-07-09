import React, {useState} from "react";
import {InputTextArea} from "../../style/GlobalInputs";
import styled from "styled-components";
import {PageContainer, StarContainer, StarContainerFix} from "../../style/GlobalWrappers";
import Food_pic from "../../assets/images/food-4505943_1920.jpg";
import star from "../../assets/icons/star.svg";
import rem from "polished/lib/helpers/rem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {RequiredText} from "../RestaurantCreate";
import {BigButton} from "../../style/GlobalButtons";
import {useHistory} from "react-router";
import {useDispatch, connect} from "react-redux";
import {createReviewAction} from "../../store/actions/reviewActions";
import StarRatingFix from "../StarRatingFix";


const CreateReviewWrapper = styled(PageContainer)`
    flex-direction: column ;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F2F2F2;
`;

const CreateReviewHeader = styled.section`
    background-image: url(${Food_pic});
    background-repeat: no-repeat;
    background-size: cover;
    max-width:100%;
    max-height:100%;
    height: 20vh;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const HeaderText = styled.div`
    height: ${rem("115px")};
    width: ${rem("420px")};
    margin: 23px 897px 49px 130px;
`;

const RestaurantName = styled.h1`
    font-weight: bold;
    font-size: 30px;
    line-height: 34px;
    color: #FFFFFF;
    margin-bottom: 5px;
`;

const RestaurantCategory = styled.p`
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
    margin-bottom: 10px;
`;

const StarsRated = styled(StarContainer)`
    justify-content: flex-start;
`;

const ReviewStarChoiceContainer = styled.div`
    display: flex;
    height: ${rem("45px")};
    margin-left: ${rem("30px")};
    width: ${rem("450px")};
    align-items: center;
`;
const BaseRatingInputs = styled.input`
  display: none;
`;
const StarTextContainer = styled.div`
    height: ${rem("45px")};
    width: ${rem("160px")};
    font-weight: 300;
    font-size: 20px;
    line-height: 23px;
    color: #7E7E7E;
    display: flex;
    align-items: center;
    margin-left: ${rem("30px")};
`;

const CreateReviewMainContainer = styled.form`
    height: 67.5vh;
    margin-top: ${rem("20px")};
`;

const ReviewText = styled(InputTextArea)`
    resize: none;
    background: #FFFFFF;
    border: 1px solid #E3E3E3;
    box-sizing: border-box;
    line-height: 23px;
    margin-top: ${rem("15px")};
    
    ::placeholder{
        color: #BBB7B7;
    }
`;

const RequiredAndButtonContainer = styled.div`
    height: ${rem("57px")};
    width: ${rem("832px")};
    display: flex;
    justify-content: space-between;
`;

const CreateReviewButton = styled(BigButton)`
    margin-top: ${rem("10px")};
`;

const ReviewCreate = (props) => {
    const {
        match: {
            params: {restaurantId},
        },
    } = props
    console.log("props", props)
    const history = useHistory()
    const dispatch = useDispatch()
    const [reviewInfo, setReviewInfo] = useState({
        content: "",
        rating: "",
    });

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const renderRating = [...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
            <label key={i}>
                <BaseRatingInputs
                    name="rating"
                    type="radio"
                    value={ratingValue}
                    onClick={() => {
                        setReviewInfo({...reviewInfo, rating: ratingValue})
                        setRating(ratingValue)
                    }}
                />
                <FontAwesomeIcon className="star"
                                 icon={["fas", "star"]}
                                 color={ratingValue <= (hover || rating) ? "#f8e71c" : "#e4e5e9"}
                                 onMouseEnter={() => setHover(ratingValue)}
                                 onMouseLeave={() => setHover(null)}
                />
            </label>
        );
    })

    console.log("reviewInfo", reviewInfo)

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setReviewInfo({...reviewInfo, [property]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(createReviewAction(restaurantId, reviewInfo));
        if (response.status < 300) {
            history.push(`/restaurants/${restaurantId}`)
        }
        console.log("response", response)
    };


    return (
        <CreateReviewWrapper>
            <CreateReviewHeader>
                <HeaderText>
                    <RestaurantName>Läderach Chocolatier Suisse</RestaurantName>
                    <RestaurantCategory>Chocolatiers & Shops</RestaurantCategory>
                    <StarContainerFix>
                        <StarRatingFix></StarRatingFix>
                    </StarContainerFix>
                </HeaderText>
            </CreateReviewHeader>
            <CreateReviewMainContainer onSubmit={handleSubmit}>
                <ReviewStarChoiceContainer>
                    <StarContainer>
                        {renderRating}
                    </StarContainer>
                    <StarTextContainer>Select your rating</StarTextContainer>
                </ReviewStarChoiceContainer>
                <ReviewText onChange={(e) => onChangeHandler(e, "content")} placeholder=" Your review helps others learn about great local businesses.
                Please don't review this business if you received a freebie for writing this review,
                or if you're connected in any way to the owner or employees."
                            rows={20}>
                </ReviewText>
                <RequiredAndButtonContainer>
                    <RequiredText>This field is required</RequiredText>
                    <CreateReviewButton>Submit</CreateReviewButton>
                </RequiredAndButtonContainer>
            </CreateReviewMainContainer>
        </CreateReviewWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        restaurantReducer: state.restaurantReducer,
    }
}

export default connect(mapStateToProps)(ReviewCreate)
