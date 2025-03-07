import React, { useState } from "react";
import { SocialType, WalletInfo } from "./types";
import { Loader2 } from "lucide-react";
import { WalletClient } from "./client";
import { getOAuth2Link } from "./utils/twitter";
import { useGoogleLogin } from "@react-oauth/google";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  CloseIcon,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  FormContainer,
  InputField,
  Button,
  DividerContainer,
  DividerLine,
  DividerBorder,
  DividerText,
  SocialButtons,
  SocialButton,
  SocialIcon,
  VerificationContainer,
  VerificationTitle,
  VerificationSubtitle,
  CodeInputs,
  CodeInput,
  BackButton,
  FooterText,
} from "./LoginModal.styles";

interface LoginModalProps {
  client: WalletClient;
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (walletInfo: WalletInfo) => void;
  isLoading?: boolean;
  type?: SocialType;
}

export function LoginModal({
  client,
  isOpen,
  onClose,
  onLogin,
  isLoading = false,
  type,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);

  const inputRefs = React.useMemo(
    () =>
      Array(6)
        .fill(null)
        .map(() => React.createRef<HTMLInputElement>()),
    []
  );

  const handleCodeChange = (index: number, value: string) => {
    // Handle single digit input
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    }
    // Handle paste event
    else if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      setVerificationCode([
        ...pastedCode,
        ...Array(6 - pastedCode.length).fill(""),
      ]);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSendVerificationCode = async () => {
    try {
      if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return;
      }
      setSendingCode(true);
      await client.sendEmailVerificationCode(email);
      setEmailSent(true);
    } catch (e) {
      alert("Failed to send verification code");
      console.error("Failed to send verification code", e);
    } finally {
      setSendingCode(false);
    }
  };

  const handleCodeSubmit = async () => {
    try {
      const code = verificationCode.join("");
      if (code.length !== 6) {
        alert("Please enter a valid verification code");
        return;
      }
      setVerifyingCode(true);
      const wallet = await client.verifyEmailVerificationCode({ email, code });
      if (wallet) {
        onLogin?.(wallet);
        onClose?.();
      }
    } catch (e) {
      alert("Failed to verify code");
      console.error("Failed to verify code", e);
    } finally {
      setVerifyingCode(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Not works for redirect mode
      console.log("Google OAuth success:", tokenResponse);
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
    flow: "auth-code", // Use authorization code flow
    scope: "email profile",
    ux_mode: "redirect",
    redirect_uri: `${window.location.origin}/google/callback`,
  });

  const onOauthLogin = async (type: SocialType) => {
    // Initial auth case - store current URL before redirect
    sessionStorage.setItem(
      "auth_return_url",
      window.location.pathname + window.location.search
    );
    console.log("auth_return_url", sessionStorage.getItem("auth_return_url"));

    // Special handling for Twitter login
    if (type === SocialType.Twitter) {
      // Get the Twitter auth URL and redirect
      const redirectUri = encodeURIComponent(
        `${window.location.origin}/twitter/callback` //TODO: use official redirect uri
      );
      const client_id = await client.getOAuth2ClientId(type);
      const authUrl = await getOAuth2Link({
        redirect_uri: redirectUri,
        client_id,
      });
      console.log("authUrl", authUrl);
      window.location.href = authUrl.url;

      // The code won't continue past this point due to redirect
      throw new Error("Redirecting to Twitter...");
    } else if (type === SocialType.Google) {
      googleLogin();
    } else {
      throw new Error("Unsupported provider");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Connect Wallet</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </CloseIcon>
          </CloseButton>
        </ModalHeader>
        {isLoading ? (
          <LoadingContainer>
            <LoadingSpinner as={Loader2} />
            <LoadingText>
              {type ? `Authenticating with ${type}...` : "Authenticating..."}
            </LoadingText>
          </LoadingContainer>
        ) : (
          <>
            {!emailSent ? (
              <FormContainer>
                <FormContainer>
                  <InputField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={sendingCode}
                  />
                  <Button
                    onClick={handleSendVerificationCode}
                    disabled={!email || sendingCode}
                  >
                    {sendingCode ? "Sending..." : "Send Verification Code"}
                  </Button>
                </FormContainer>

                <DividerContainer>
                  <DividerLine>
                    <DividerBorder />
                  </DividerLine>
                  <DividerText>
                    <span>Or continue with</span>
                  </DividerText>
                </DividerContainer>

                <SocialButtons>
                  <SocialButton onClick={() => onOauthLogin(SocialType.Google)}>
                    <SocialIcon
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                    />
                    Google
                  </SocialButton>
                  <SocialButton
                    onClick={() => onOauthLogin(SocialType.Twitter)}
                  >
                    <SocialIcon
                      src="https://abs.twimg.com/favicons/twitter.ico"
                      alt="Twitter"
                    />
                    Twitter
                  </SocialButton>
                </SocialButtons>
              </FormContainer>
            ) : (
              <VerificationContainer>
                <div>
                  <VerificationTitle>Enter Verification Code</VerificationTitle>
                  <VerificationSubtitle>
                    We sent a verification code to {email}
                  </VerificationSubtitle>
                </div>

                <CodeInputs>
                  {verificationCode.map((digit, index) => (
                    <CodeInput
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </CodeInputs>

                <Button
                  onClick={handleCodeSubmit}
                  disabled={
                    verificationCode.join("").length !== 6 || verifyingCode
                  }
                >
                  {verifyingCode ? "Verifying..." : "Verify Code"}
                </Button>

                <BackButton onClick={() => setEmailSent(false)}>
                  Back to Email
                </BackButton>
              </VerificationContainer>
            )}
          </>
        )}
        <FooterText>
          By connecting your wallet, you agree to our Terms of Service and
          Privacy Policy
        </FooterText>
      </ModalContent>
    </ModalOverlay>
  );
}
