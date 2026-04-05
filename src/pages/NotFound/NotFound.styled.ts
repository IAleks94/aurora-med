import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const BackLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`
