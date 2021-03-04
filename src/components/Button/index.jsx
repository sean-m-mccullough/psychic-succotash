import styled from 'styled-components'

const Button = styled.button`
    color: #fff;
    background-color: #000;
    max-width: 8rem;
    width: 100%;
    padding: .5rem;
    margin: 0 0 0 .5rem;
    border-radius: 3px;
    border: 1px solid transparent;
    text-transform: lowercase;
    transition: all 300ms ease;
    cursor: pointer;

    &:hover {
        border: 1px solid #000;
        color: #000;
        background-color: #fff;
    }
`;

export const TagButton = styled(Button)`
    font-size: .75rem;
    background-color: gray;
    min-width: 4rem;
    width: auto;
    padding: .25rem;
    border: 1px solid darkgray;
    margin: 0 0 0 .25rem;
`;

export default Button
