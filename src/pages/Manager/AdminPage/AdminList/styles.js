import styled from 'styled-components';

export const Area = styled.div`

    .title--table {
        font-weight: bold;
    }

    .emptylist {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #b00;
        opacity: 0.7;
    }

    .title--box {
        display: flex;
        height: 50px;
        background-color: #ccc;
        padding: 0 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        h3 {
            font-size: 18px;
            text-transform: uppercase;
        }

        .title--search {
            align-items: center;

            input {
                height: 30px;
                width: 300px;
                border: 0;
                border-radius: 5px;
                outline: 0;
                font-size: 14px;
                color: #000;
                padding: 0 5px;
                background-color: #fff;
            }
        }
    }

    .button--group {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .link--table {
            text-decoration: none;

            button  {
                color: #fff;
                text-decoration: none;
                display: inline-block;
                font-size: 14px;
                transition-duration: 0.4s;
                height: 35px;
                width: 35px;
                display: flex;
                cursor: pointer;
            }

            .button--report {
                background-color: #A890D5; 
                &:hover {
                    background-color: #80709E;
                }
            }

            .button--detail {
                background-color: #4CAF50;
                &:hover {
                    background-color: #0C7112;
                }
            }

            .button--edit {
                background-color: #049DCF;
                &:hover {
                    background-color: #016788;
                }
            }

            .button--delete {
                background-color: #E7422E; 
                &:hover {
                    background-color: #9A2B1D;
                }
            }

            .button--delete-disabled {
                background-color: #aaa;
            }

        }
    }

    .link--activity {
        border: none;
        text-decoration: none;
    }

    
`;