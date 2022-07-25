import styled from 'styled-components';

export const Area = styled.div`

    .title--table {
        font-weight: bold;
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
                height: 25px;
                border: 0;
                border-radius: 5px;
                outline: 0;
                font-size: 14px;
                color: #000;
                padding: 0 5px;
                background-color: #eee;
            }

            button {
                height: 25px;
                border-radius: 5px;
                margin-left: 5px;
                background-color: #0096c7;
                color: #fff;
                border: 0;
                cursor: pointer;
            }
        }
    }

    .link--table {
        text-decoration: none;

        button  {
            background-color: #4CAF50; /* Green */
            border: none;
            color: white;
            padding: 4px 8px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
            transition-duration: 0.4s;
            cursor: pointer;
            margin-left: 2px;
            border-right: none;

        }

        .button--detail {
            background-color: white; 
            color: black; 
            border: 1px solid #4CAF50;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;

            &:hover {
                background-color: #4CAF50;
                color: white;
            }
        }

        .button--edit {
            background-color: white; 
            color: black; 
            border: 1px solid #008CBA;

            &:hover {
                background-color: #008CBA;
                color: white;
            }
        }
        
        .button--delete {
            background-color: white; 
            color: black; 
            border: 1px solid #f44336;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;

            &:hover {
                background-color: #f44336;
                color: white;
            }
        }

    }

    .product--table {
        text-decoration: none;
        background-color: #DDD;
        margin: 0 3px;
        flex-wrap: wrap;
        border-radius: 3px;
        padding: 2px;

        &:hover {
            background-color: rgb(0,0,0,0.3);
        }
    }

    
`;