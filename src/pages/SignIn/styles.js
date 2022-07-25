import styled from 'styled-components';

export const Area = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 0.6;

    .title {
        font-size: 25px;
        font-variant: small-caps;
        font-weight: bold;
        margin-bottom: 25px;
    }

    img {
        width: 200px;
    }

    form{
    width: 40%;
    border-radius: 5px;
    padding: 10px;

    .area {
        align-items: center;
        padding: 10px;

        .area--title-checkbox {
            display: flex;
            align-items: center;
        }

        .area--title {
            font-size: 14px;
        }

        .area--input {
            flex: 1;

            .area--checkbox {
                width: 15px;
                height: 15px;
                margin-left: 10px;
                margin-top: 5px;
            }

            input {
                background-color: #ccc;
                width: 100%;
                height: 45px;
                font-size: 16px;
                padding: 5px;
                border: 1px solid #999;
                border-radius: 5px;
                outline: 0;
                transition: all ease 0.4s;
                padding-left: 10px;

                &:focus {
                    border: 1px solid #333;
                    color: #333;
                }
            }

            button {
                width: 100%;
                height: 45px;
                background-color: #007200;
                border: 0;
                outline: 0;
                padding: 5px 10px;
                border-radius: 5px;
                color: #fff;
                font-size: 15px;
                cursor: pointer;

                &:hover {
                    background-color: #005200;
                }
            }
        }
    }
}

`;

