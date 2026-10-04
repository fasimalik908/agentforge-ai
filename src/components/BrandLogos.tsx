import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

// OpenAI authentic icon
export const OpenAILogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.02-1.1683a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6726a.79.79 0 0 0-.4023-.686zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.407 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1636a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.6069 1.4997-2.602-1.4997z" />
  </svg>
);

// Claude / Anthropic authentic icon
export const ClaudeLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M17.3 3.5H6.7C4.9 3.5 3.5 4.9 3.5 6.7v10.6c0 1.8 1.4 3.2 3.2 3.2h10.6c1.8 0 3.2-1.4 3.2-3.2V6.7c0-1.8-1.4-3.2-3.2-3.2zm-2.4 12.8h-2.1l-.8-2.6h-2.2l-.7 2.6H7.1L9.9 8h2.3l2.9 8.3zm-3.4-4.5l-.6-2.2-.7 2.2h1.3z" />
  </svg>
);

// Google Gemini authentic 4-pointed sparkle
export const GeminiLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
  </svg>
);

// Meta / Llama authentic infinity loop
export const MetaLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M12 16.5c-2.3 0-4.1-1.8-4.1-4.1S9.7 8.3 12 8.3s4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1zm6.9-9.9c-1.8 0-3.3 1-4.2 2.5-.9-1.5-2.4-2.5-4.2-2.5-2.8 0-5.1 2.3-5.1 5.1s2.3 5.1 5.1 5.1c1.8 0 3.3-1 4.2-2.5.9 1.5 2.4 2.5 4.2 2.5 2.8 0 5.1-2.3 5.1-5.1s-2.3-5.1-5.1-5.1z" />
  </svg>
);

// Qwen authentic polygonal geometric icon
export const QwenLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.2L18.4 8 12 11.6 5.6 8 12 5.2zM5 9.5l6 3.4v6.8l-6-3.3V9.5zm8 10.2v-6.8l6-3.4v6.9l-6 3.3z" />
  </svg>
);

// DeepSeek authentic whale icon
export const DeepSeekLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M21.5 13.5c-.8-3.2-3.6-5.8-7.1-6.4 1.1-1.4 1.5-3.3 1-5.1-.3-.1-.6-.2-1-.2-1.9 0-3.6 1.1-4.5 2.8-2.6.4-4.8 1.9-6.1 4.1C2.4 10.8 2 13.3 2.6 16c.8 3.5 3.7 6.1 7.2 6.5 4.4.5 8.4-1.9 10.1-5.8 1.1-1 1.7-2.1 1.6-3.2zm-12.8 1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
  </svg>
);

// Mistral authentic icon
export const MistralLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M3 4h4v4H3V4zm7 0h4v4h-4V4zm7 0h4v4h-4V4zM3 11h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4zm-7 7h4v4h-4v-4z" />
  </svg>
);

// Gmail authentic envelope logo
export const GmailLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path fill="#EA4335" d="M24 5.4v13.2c0 1.3-1.1 2.4-2.4 2.4h-3.6V11.3L12 15.6l-6-4.3V21H2.4C1.1 21 0 19.9 0 18.6V5.4c0-1.9 2.2-3 3.7-1.8L12 9.5l8.3-5.9c1.5-1.2 3.7-.1 3.7 1.8z" />
  </svg>
);

// Slack authentic multi-color logo
export const SlackLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path fill="#E01E5A" d="M5.5 10.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1.5H3a2.5 2.5 0 0 0 0 5h2.5v-5z" />
    <path fill="#36C5F0" d="M10.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm1.5 0V3a2.5 2.5 0 0 0-5 0v2.5h5z" />
    <path fill="#2EB67D" d="M18.5 13.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm0-1.5H21a2.5 2.5 0 0 0 0-5h-2.5v5z" />
    <path fill="#ECB22E" d="M13.5 18.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm-1.5 0V21a2.5 2.5 0 0 0 5 0v-2.5h-5z" />
  </svg>
);

// HubSpot authentic sprocket logo
export const HubSpotLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="#FF7A59"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M18.8 8.4V6.1c.9-.4 1.5-1.3 1.5-2.3 0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5c0 1 .6 1.9 1.5 2.3v2.3c-.9.3-1.6.8-2.2 1.5l-5.3-4.1c.1-.3.2-.6.2-1 0-1.7-1.3-3-3-3s-3 1.3-3 3c0 1.6 1.3 2.9 2.9 3 .1 0 .2 0 .3 0l5.1 4c-.3.7-.5 1.5-.5 2.4 0 1.2.4 2.3 1 3.2l-2.4 2.4c-.4-.2-.8-.3-1.3-.3-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5c0-.5-.1-.9-.3-1.3l2.4-2.4c.9.6 2 1 3.2 1 3.3 0 6-2.7 6-6 0-2.4-1.4-4.5-3.4-5.5z" />
  </svg>
);

// Notion authentic logo
export const NotionLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="#000000"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.713-.84c1.168-.093 1.634.373 1.354 1.447l-2.474 13.906c-.187.98-.793 1.4-1.867 1.494l-11.853.793c-1.073.093-1.54-.42-1.353-1.447l2.052-15.82zM8.33 6.96L7.164 16.15c-.093.7.187.933.7.887l3.033-.233 1.82-7.887 2.1 7.653 3.407-.233L19.43 7.24c.093-.7-.233-.933-.746-.887l-3.36.233-1.773 7.42-2.147-7.42-3.073.374z" />
  </svg>
);

// Google Drive authentic logo
export const GoogleDriveLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path fill="#FFC107" d="M8.2 2.5l7.5 13H4.7l-3.8-6.5 7.3-6.5z" />
    <path fill="#2196F3" d="M15.7 15.5l3.8 6.5H4.7l3.8-6.5h7.2z" />
    <path fill="#4CAF50" d="M15.7 2.5l7.5 13-3.7 6.5-7.5-13 3.7-6.5z" />
  </svg>
);

// PostgreSQL authentic logo
export const PostgreSQLLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="#336791"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M12 2C6.5 2 2 6.5 2 12c0 3.9 2.2 7.3 5.5 9v-3.5c-1.1-.3-2-.9-2.6-1.8-.7-1-.9-2.3-.6-3.6.4-1.8 1.8-3.2 3.6-3.6 1.4-.3 2.7 0 3.7.7.9.6 1.5 1.5 1.8 2.6.3 1.1.2 2.3-.4 3.3-.4.7-1 1.3-1.8 1.6V21c3.4-1.7 5.8-5.1 5.8-9 0-5.5-4.5-10-10-10z" />
  </svg>
);

// Stripe authentic logo
export const StripeLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="#635BFF"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C17.652.735 15.016 0 12.067 0 6.643 0 2.871 2.871 2.871 7.237c0 4.417 3.513 5.679 6.84 6.786 2.502.83 3.66 1.564 3.66 2.656 0 .973-.854 1.496-2.316 1.496-2.398 0-5.185-1.077-7.07-2.073l-.936 5.672c1.921 1.078 5.093 1.947 8.356 1.947 5.751 0 9.873-2.698 9.873-7.391 0-4.63-3.415-5.836-7.302-7.182z" />
  </svg>
);

// WhatsApp authentic logo
export const WhatsAppLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="#25D366"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.2 1.26-1.68 1.34-.44.07-1 .1-3.21-.79-2.45-1-4.04-3.52-4.16-3.68-.12-.16-.99-1.32-.99-2.52 0-1.2.63-1.79.85-2.03.22-.24.49-.3.65-.3.16 0 .33 0 .47.01.15.01.36-.06.56.42.21.5.71 1.73.78 1.86.06.13.1.29.02.46-.08.17-.12.28-.24.42-.12.14-.25.32-.36.43-.12.12-.24.25-.1.5.14.24.63 1.04 1.35 1.68.93.83 1.72 1.09 1.96 1.21.24.12.38.1.52-.06.14-.17.6-.7.76-.94.16-.24.33-.2.55-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z" />
  </svg>
);

// Airtable authentic logo
export const AirtableLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path fill="#FCB400" d="M11.6 2.3L2.2 6.5C1.5 6.8 1.5 7.7 2.2 8l9.4 4.2c.4.2.8.2 1.2 0l9.4-4.2c.7-.3.7-1.2 0-1.5l-9.4-4.2c-.4-.2-.8-.2-1.2 0z" />
    <path fill="#18BFFF" d="M12.6 13.5v8.7c0 .5.5.9 1 .7l8.7-3.8c.4-.2.7-.6.7-1V9.4L12.6 13.5z" />
    <path fill="#ED3548" d="M1.3 9.7v8.7c0 .4.3.8.7 1l8.7 3.8c.5.2 1-.2 1-.7v-8.7L1.3 9.7z" />
  </svg>
);

// n8n authentic logo
export const N8nLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="#EA4B71"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M18.5 7.5A3.5 3.5 0 0 0 15 11v2H9v-2a3.5 3.5 0 1 0-3.5 3.5H9v2h6v-2h3.5a3.5 3.5 0 0 0 0-7z" />
  </svg>
);
