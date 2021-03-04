import styled from 'styled-components'

const Input = styled.input`
    color: #000;
    max-width: ${props => props.fullWidth ? '100%' : '8rem' };
    width: ${props => props.fullWidth ? 'auto' : '100%' };
    padding: .5rem;
    margin: 0 0 .25rem 0;
    border-radius: 3px;
    border: 1px solid transparent;
`;

export default Input
