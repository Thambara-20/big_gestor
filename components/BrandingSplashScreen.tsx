import React from 'react';
import { useAppData } from '../hooks/useAppData';
import { APP_NAME, LOGO_LIGHT_THEME_BASE64, LOGO_DARK_THEME_BASE64 } from '../constants';

interface BrandingSplashScreenProps {
  isFadingOut: boolean;
}

const BrandingSplashScreen: React.FC<BrandingSplashScreenProps> = ({ isFadingOut }) => {
  const { settings, loading: settingsLoading } = useAppData();

  const bgColor = settings.splashScreenBackgroundColor || '#111827'; // Default dark slate if not set

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`fixed inset-0 flex flex-col items-center justify-center z-[100] transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Wait for settings to load to prevent flicker */}
      {!settingsLoading && (
        <div className="animate-pulse">
          <img src={LOGO_LIGHT_THEME_BASE64} alt={`${APP_NAME} Logo`} className="logo-light h-32 max-h-48 max-w-xs object-contain" />
          <img src={LOGO_DARK_THEME_BASE64} alt={`${APP_NAME} Logo`} className="logo-dark h-32 max-h-48 max-w-xs object-contain" />
        </div>
      )}
    </div>
  );
};

export default BrandingSplashScreen;