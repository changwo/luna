import React, {useEffect, useState} from "react";
import {BaseInput} from "../../style/GlobalInputs";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {MainTitle, Title, TitleHr} from "../../style/GlobalTitles";
import {PageContainer} from "../../style/GlobalWrappers";
import {BigButton} from "../../style/GlobalButtons";
import {
    createRestaurantAction,
    getRestaurantByIDAction,
    updateRestaurantAction
} from "../../store/actions/restaurantActions";
import {useHistory} from "react-router";
import {connect, useDispatch} from "react-redux";
import {restaurantReducer} from "../../store/reducers/restaurantReducer";
import TextareaAutosize from "react-autosize-textarea";

const RestaurantCreateWrapper = styled(PageContainer)`
    flex-direction: column ;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F2F2F2;
    padding-top: ${rem("50px")};
    padding-bottom: ${rem("60px")};
    height: 100%;
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    height: 95%;
`;

const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0px 34px;
`;

const DesciptionContainer = styled.div`
    width: 95%;
    display: flex;
    justify-content: center;
`;

const RestaurantCreateTitle = styled(MainTitle)`
    margin-bottom: ${rem("16px")};
`;

const RestaurantCreateTitleHr = styled(TitleHr)`
    margin-bottom: ${rem("28px")};
`;

const InputContainer = styled.div`
    height: ${rem("140px")};
    width: ${rem("370px")};
    display: flex;
    flex-direction: column;
`;

const RestaurantCreateInput = styled(BaseInput)`
    background: #FFFFFF;
    box-sizing: border-box;
    width: ${rem("370px")};
`;

const RestaurantCreateSelect = styled.select`
    background: #FFFFFF;
    box-sizing: border-box;
    width: ${rem("370px")};
    height: ${rem("50px")};
    font-family: Helvetica, sans-serif;
    font-size: ${rem("22px")};
    line-height: ${rem("26px")};
    padding: ${rem("5px")};
    border: 1px solid #ebebeb;
    border-radius: 3px;
    //color: #D8D8D8;
    color: #000
`;

const Options = styled.option`
    color: #000
`;

const CategoryTitle = styled(Title)`
    font-family: Karla, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #4C4C4C;
    height: ${rem("23px")};
    margin-bottom: ${rem("9px")};
`;

const CategoryDetailTitle = styled(Title)`
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #979797;
    margin-bottom: ${rem("11px")};
`;

export const RequiredText = styled.p`
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    color: #B00000;
    margin-top: ${rem("5px")};
`;

const InputLabel = styled.label`
      border-radius: ${rem("30px")};
      border: none;
      width: ${rem("216px")};
      height: ${rem("38px")};
      background: #e47d31;
      cursor: pointer;
      font-style: normal;
      font-weight: normal;
      line-height: ${rem("18px")};
      text-align: center;
      padding-top: ${rem("10px")};
      color: #ffffff;
      margin-top: ${rem("12px")};

      :hover {
          background-color: #cd702c;
      }
      :active {
          background-color: #cd702c;
      }
`

const InputFile = styled.input`
      display: none;
      
`

const CreateRestaurantButton = styled(BigButton)`
    margin-top: ${rem("30px")};
`;

const Input = styled(TextareaAutosize)`
    display: flex;
    width: 1175px;
    resize: none;
    border-radius: ${rem("3px")};
    border: none;
    line-height: ${rem("26px")};
    height: ${rem("100px")};
    outline: none;
    margin-top: ${rem("20px")};
    padding: ${rem("18px")};
    font-size: 22px;
    
    ::placeholder{
        color: #D8D8D8;
    }
`;


const RestaurantEdit = (props) => {
    const {
        match: {
            params: {restaurantId},
        },
    } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const [imageFile, setImageFile] = useState(null)
    const [RestInfo, setRestInfo] = useState({
        name: "",
        category_id: "",
        country: "",
        street: "",
        city: "",
        zip: "",
        website: "",
        phone: "",
        email: "",
        opening_hours: "",
        price_level: "",
        image: "",
        description: ""
    });

    console.log("RestInfo", RestInfo)

    useEffect(() => {
        async function fetchData() {
            const response = await dispatch(getRestaurantByIDAction(restaurantId));
            setRestInfo(response.data)
        }

        fetchData();
    }, [])


    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setRestInfo({...RestInfo, [property]: value});
    };

    const imageSelectHandler = e => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append('name', RestInfo.name)
        form.append('category_id', RestInfo.category_id)
        form.append('country', RestInfo.country)
        form.append('street', RestInfo.street)
        form.append('city', RestInfo.city)
        form.append('zip', RestInfo.zip)
        form.append('website', RestInfo.website)
        form.append('phone', RestInfo.phone)
        form.append('email', RestInfo.email)
        form.append('opening_hours', RestInfo.opening_hours)
        form.append('price_level', RestInfo.price_level)
        form.append('description', RestInfo.description)
        if (imageFile) {
            form.append('image', imageFile)
        }
        const response = await dispatch(updateRestaurantAction(restaurantId, form));
        if (response.status < 300) {
            console.log("woohooo", response)
            history.push(`/restaurants/${restaurantId}`)
        } else {
            console.log('error in da dispatch', response)
        }
    };


    return (
        <RestaurantCreateWrapper>
            <FormWrapper onSubmit={handleSubmit}>
                <RestaurantCreateTitle>Edit restaurant</RestaurantCreateTitle>
                <RestaurantCreateTitleHr/>
                <FormContainer>
                    <InputContainer>
                        <CategoryTitle>Basic</CategoryTitle>
                        <CategoryDetailTitle>Name *</CategoryDetailTitle>
                        <RestaurantCreateInput value={RestInfo.name} onChange={(e) => onChangeHandler(e, "name")}/>
                        <RequiredText>This field is required</RequiredText>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle/>
                        <CategoryDetailTitle>Category *</CategoryDetailTitle>
                        <RestaurantCreateSelect value={RestInfo.category} onChange={(e) => onChangeHandler(e, "category_id")}>
                            <Options label="Select a value..."/>
                            <Options value={1}>Ethnic</Options>
                            <Options value={2}>Fast food</Options>
                            <Options value={3}>Fast casual</Options>
                            <Options value={4}>Casual dining</Options>
                            <Options value={5}>Premium casual</Options>
                            <Options value={6}>Family style</Options>
                            <Options value={7}>Fine dining</Options>
                            <Options value={8}>Pub</Options>
                        </RestaurantCreateSelect>
                        <RequiredText>This field is required</RequiredText>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle/>
                        <CategoryDetailTitle>Country *</CategoryDetailTitle>
                        <RestaurantCreateSelect value={RestInfo.country} onChange={(e) => onChangeHandler(e, "country")}>
                            <Options label={"Select a value..."}/>
                            <Options>Switzerland</Options>
                            <Options>Germany</Options>
                            <Options>Italy</Options>
                            <Options>France</Options>
                            {/*https://restcountries.eu/rest/v2/all*/}
                        </RestaurantCreateSelect>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle>Address</CategoryTitle>
                        <CategoryDetailTitle>Street *</CategoryDetailTitle>
                        <RestaurantCreateInput value={RestInfo.street} onChange={(e) => onChangeHandler(e, "street")}/>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle/>
                        <CategoryDetailTitle>City *</CategoryDetailTitle>
                        <RestaurantCreateInput value={RestInfo.city} onChange={(e) => onChangeHandler(e, "city")}/>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle/>
                        <CategoryDetailTitle>Zip</CategoryDetailTitle>
                        <RestaurantCreateInput value={RestInfo.zip} onChange={(e) => onChangeHandler(e, "zip")}/>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle>Contact</CategoryTitle>
                        <CategoryDetailTitle>Website</CategoryDetailTitle>
                        <RestaurantCreateInput value={RestInfo.website} onChange={(e) => onChangeHandler(e, "contact")}/>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle/>
                        <CategoryDetailTitle type={"tel"}>Phone *</CategoryDetailTitle>
                        <RestaurantCreateInput value={RestInfo.phone} onChange={(e) => onChangeHandler(e, "phone")}/>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle/>
                        <CategoryDetailTitle type={"email"}>Email</CategoryDetailTitle>
                        <RestaurantCreateInput value={RestInfo.email} onChange={(e) => onChangeHandler(e, "email")}/>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle>Details</CategoryTitle>
                        <CategoryDetailTitle>Opening hours *</CategoryDetailTitle>
                        <RestaurantCreateInput value={RestInfo.opening_hours} onChange={(e) => onChangeHandler(e, "opening_hours")}/>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle/>
                        <CategoryDetailTitle>Price level</CategoryDetailTitle>
                        <RestaurantCreateSelect value={RestInfo.price_level} onChange={(e) => onChangeHandler(e, "price_level")}>
                            <Options>$</Options>
                            <Options>$$</Options>
                            <Options>$$$</Options>
                        </RestaurantCreateSelect>
                    </InputContainer>
                    <InputContainer>
                        <CategoryTitle/>
                        <CategoryDetailTitle>Image</CategoryDetailTitle>
                        <InputLabel htmlFor="restaurant_image">Choose a file...</InputLabel>
                        <InputFile id="restaurant_image" accept={"image/*"}
                                   type="file" onChange={imageSelectHandler}/>
                    </InputContainer>
                </FormContainer>
                <DesciptionContainer>
                            <Input onResize={(e) => {
                }} value={RestInfo.description} onChange={(e) => onChangeHandler(e, "description")} placeholder="Description..."/>
                </DesciptionContainer>
                <CreateRestaurantButton>Submit</CreateRestaurantButton>
            </FormWrapper>
        </RestaurantCreateWrapper>
    )
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return {
        restaurantReducer: state.restaurantReducer,
    };
};

export default connect(mapStateToProps)(RestaurantEdit);
