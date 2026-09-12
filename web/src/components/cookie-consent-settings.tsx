'use client';

import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal';
import { Switch } from '@nextui-org/switch';
import { CookieIcon } from './icons';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface CookieConsentSettingsProps {
  showCookieConsentSettings: boolean;
  setShowCookieConsentSettings: (show: boolean) => void;
}

export const CookieConsentSettings = (props: CookieConsentSettingsProps) => {
  const t = useTranslations('cookieConsent');
  const [isAnalyticsSelected, setIsAnalyticsSelected] = useState(true);
  const [isMarketingSelected, setIsMarketingSelected] = useState(true);

  const handleSavePreferences = () => {
    localStorage.setItem(
      'cookie_consent_analytics',
      isAnalyticsSelected.toString()
    );
    localStorage.setItem(
      'cookie_consent_marketing',
      isAnalyticsSelected.toString()
    );
    localStorage.setItem('cookie_consent', 'accepted');
    props.setShowCookieConsentSettings(false);
  };

  useEffect(() => {
    const storedMarketingCookieConsent = localStorage.getItem(
      'cookie_consent_marketing'
    );
    const storedAnalyticsCookieConsent = localStorage.getItem(
      'cookie_consent_analytics'
    );

    if (storedAnalyticsCookieConsent === 'false') {
      setIsAnalyticsSelected(false);
    }
    if (storedMarketingCookieConsent === 'false') {
    setIsMarketingSelected(false);
    }
  }, []);

  return (
    <Modal
      isOpen={props.showCookieConsentSettings}
      placement='center'
      className='max-w-lg w-full'
      isDismissable={false}
      isKeyboardDismissDisabled
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1 border-b border-dark-gray'>
          <div className='flex items-center'>
            <CookieIcon className='mr-2' />
            <span className='whitespace-nowrap text-2xl font-semibold leading-none tracking-tight'>
              {t('settingsTitle')}
            </span>
          </div>
          <div className='text-sm text-gray-500 font-normal m-4'>
            {t('settingsDescription')}
          </div>
        </ModalHeader>
        <ModalBody className='space-y-4 pt-4'>
          <div className='flex justify-between items-start space-y-2'>
            <div>
              <label>{t('essentialCookiesLabel')}</label>
              <p className='text-dark-gray-500 text-sm'>
                {t('essentialCookiesDescription')}
              </p>
            </div>
            <Switch
              className='ml-auto'
              id='essential'
              isDisabled
              defaultSelected
            />
          </div>
          <div className='flex justify-between items-start space-y-2'>
            <div>
              <label>{t('analyticsCookiesLabel')}</label>
              <p className='text-dark-gray-500 text-sm'>
                {t('analyticsCookiesDescription')}
              </p>
            </div>
            <Switch
              className='ml-auto'
              id='analytics'
              isSelected={isAnalyticsSelected}
              onValueChange={setIsAnalyticsSelected}
            />
          </div>
          <div className='flex justify-between items-start space-y-2'>
            <div>
              <label>{t('marketingCookiesLabel')}</label>
              <p className='text-dark-gray-500 text-sm'>
                {t('marketingCookiesDescription')}
              </p>
            </div>
            <Switch
              className='ml-auto'
              id='marketing'
              isSelected={isMarketingSelected}
              onValueChange={setIsMarketingSelected}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            className='ml-auto'
            type='submit'
            onPress={handleSavePreferences}
          >
            {t('savePreferencesButton')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
