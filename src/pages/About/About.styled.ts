import styled, { css } from 'styled-components'

const isDark = (t: { colors: { text: string } }) => t.colors.text === '#FFFFFF'

export const PageRoot = styled.div`
  width: 100%;
`

export const PageHero = styled.section`
  position: relative;
  min-height: 42vh;
  min-height: 42dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.spacing.xxl} clamp(${theme.spacing.md}, 4vw, ${theme.spacing.lg})`};
  overflow: hidden;
`

export const PageHeroBackdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  ${({ theme }) =>
    isDark(theme)
      ? css`
          background: linear-gradient(180deg, #0b1026 0%, #0f1a3e 55%, #0b1026 100%);
        `
      : css`
          background: linear-gradient(
            180deg,
            #f5f0e8 0%,
            #faf7f2 100%
          );
        `}
`

export const PageHeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  text-align: center;
`

export const PageHeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`

export const PageHeroIntro = styled.p`
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 400;
  line-height: 1.6;
  max-width: 42rem;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const ContentSection = styled.section`
  padding: ${({ theme }) =>
    `${theme.spacing.xxl} clamp(${theme.spacing.md}, 4vw, ${theme.spacing.lg})`};
`

export const ContentInner = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
`

export const SectionHeading = styled.h2`
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`

export const Prose = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 1.0625rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  max-width: 48rem;
`

export const ValuesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const ValueCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`

export const ValueCardBody = styled.p`
  font-size: 0.9375rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const TeamGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const TeamCardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const TeamPortraitWrap = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
`

export const TeamPortraitImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const TeamMemberName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`

export const TeamMemberRole = styled.p`
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const TeamMemberBio = styled.p`
  font-size: 0.9375rem;
  line-height: 1.65;
  text-align: left;
  color: ${({ theme }) => theme.colors.textMuted};
`
