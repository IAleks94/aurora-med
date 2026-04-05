import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const isDark = (t: { colors: { text: string } }) => t.colors.text === '#FFFFFF'

export const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  overflow: hidden;
`

export const HeroBackdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  ${({ theme }) =>
    isDark(theme)
      ? css`
          background:
            radial-gradient(
              ellipse 80% 50% at 50% -20%,
              rgba(255, 255, 255, 0.08) 0%,
              transparent 55%
            ),
            radial-gradient(
              1px 1px at 8% 18%,
              rgba(255, 255, 255, 0.85) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 18% 42%,
              rgba(255, 255, 255, 0.6) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 28% 12%,
              rgba(255, 255, 255, 0.75) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 42% 58%,
              rgba(255, 255, 255, 0.5) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 55% 22%,
              rgba(255, 255, 255, 0.9) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 68% 48%,
              rgba(255, 255, 255, 0.55) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 78% 15%,
              rgba(255, 255, 255, 0.7) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 88% 38%,
              rgba(255, 255, 255, 0.65) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 92% 72%,
              rgba(255, 255, 255, 0.5) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 35% 78%,
              rgba(255, 255, 255, 0.45) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 12% 65%,
              rgba(255, 255, 255, 0.55) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 62% 82%,
              rgba(255, 255, 255, 0.4) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 48% 88%,
              rgba(255, 255, 255, 0.5) 50%,
              transparent 51%
            ),
            linear-gradient(180deg, #0b1026 0%, #0f1a3e 100%);
        `
      : css`
          background:
            radial-gradient(
              ellipse 80% 40% at 50% 0%,
              rgba(11, 16, 38, 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              1px 1px at 12% 25%,
              rgba(11, 16, 38, 0.2) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 88% 18%,
              rgba(11, 16, 38, 0.15) 50%,
              transparent 51%
            ),
            radial-gradient(
              1px 1px at 44% 72%,
              rgba(11, 16, 38, 0.12) 50%,
              transparent 51%
            ),
            linear-gradient(180deg, #f5f0e8 0%, #faf7f2 100%);
        `}
`

export const HeroConstellation = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: ${({ theme }) => (isDark(theme) ? 0.4 : 0.14)};
  stroke: ${({ theme }) => theme.colors.decorative};
  fill: none;
  stroke-width: 1;
`

export const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 920px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.12;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`

export const HeroSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 400;
  font-size: clamp(1.0625rem, 2vw, 1.25rem);
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 36rem;
`

export const HeroCtas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
  }
`

const primaryButtonCss = css`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: 14px;
  letter-spacing: 2px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) =>
    theme.colors.accent === '#FFFFFF' ? '#0B1026' : '#FAF7F2'};

  &:hover {
    box-shadow: ${({ theme }) =>
      theme.colors.accent === '#FFFFFF'
        ? '0 4px 20px rgba(255, 255, 255, 0.25)'
        : '0 4px 20px rgba(11, 16, 38, 0.25)'};
  }

  &:active {
    transform: translateY(1px);
  }
`

const outlineButtonCss = css`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: 14px;
  letter-spacing: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.card};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.accent};
  }

  &:active {
    transform: translateY(1px);
  }
`

export const HeroPrimaryLink = styled(Link)`
  ${primaryButtonCss}
`

export const HeroSecondaryButton = styled.button`
  ${outlineButtonCss}
`

export const ProcessSection = styled.section`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  background: ${({ theme }) => theme.colors.card};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const ProcessInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 0;
  }
`

export const ProcessStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1 1 0;
  min-width: 0;
`

export const ProcessConnector = styled.div`
  display: none;
  flex: 0 0 2rem;
  height: 2px;
  flex-shrink: 0;
  margin-top: 3.75rem;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.decorative},
    ${({ theme }) => theme.colors.border}
  );
  opacity: 0.85;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  }
`

export const ProcessIllustration = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  font-size: 1.75rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  border: 2px dashed ${({ theme }) => theme.colors.decorative};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
`

export const ProcessStepLabel = styled.p`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 500;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.text};
  max-width: 14rem;
`
