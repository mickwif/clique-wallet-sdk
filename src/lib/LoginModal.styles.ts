import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 100%;
  max-width: 28rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
`;

export const CloseButton = styled.button`
  color: #6b7280;
  &:hover {
    color: #374151;
  }
`;

export const CloseIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

export const LoadingSpinner = styled.div`
  height: 3rem;
  width: 3rem;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.p`
  font-size: 1rem;
  color: #6b7280;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  &:disabled {
    background-color: #f3f4f6;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

export const DividerContainer = styled.div`
  position: relative;
  margin: 1.5rem 0;
`;

export const DividerLine = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
`;

export const DividerBorder = styled.div`
  width: 100%;
  border-top: 1px solid #e5e7eb;
`;

export const DividerText = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.875rem;
  span {
    padding: 0 0.5rem;
    background-color: white;
    color: #6b7280;
  }
`;

export const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  &:hover {
    background-color: #f9fafb;
  }
`;

export const SocialIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
`;

export const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const VerificationTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const VerificationSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const CodeInputs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const CodeInput = styled.input`
  width: 3rem;
  height: 3rem;
  text-align: center;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

export const BackButton = styled.button`
  color: #3b82f6;
  font-size: 0.875rem;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

export const FooterText = styled.p`
  margin-top: 1rem;
  font-size: 0.75rem;
  text-align: center;
  color: #6b7280;
`;
