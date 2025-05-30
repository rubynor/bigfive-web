import { Link as NextUILink } from '@nextui-org/link';
import { Link } from '../navigation';

import {
  TwitterIcon,
  GithubIcon,
  LinkedInIcon,
  FacebookIcon,
  Logo
} from '@/components/icons';
import { siteConfig } from '@/config/site';
import { useTranslations } from 'next-intl';

interface FooterProps {
  footerLinks: {
    label: string;
    href: string;
  }[];
}

export default function Footer({ footerLinks }: FooterProps) {
  const year = new Date().getFullYear();
  const t = useTranslations('footer');
  const tNavbar = useTranslations('navbar');
  return (
    <footer className='container mx-auto max-w-7xl py-24 px-12'>
      <div className='container mx-auto flex justify-between'>
        <div className='w-1/2'>
          <span className='text-center'>
            <Logo />
          </span>
        </div>
        <div className='w-1/2 flex justify-end'>
          <NextUILink
            isExternal
            href={siteConfig.links.twitter}
            aria-label={tNavbar('ariaTwitter')}
          >
            <TwitterIcon size={48} className='text-default-500' />
          </NextUILink>
          <NextUILink
            isExternal
            href={siteConfig.links.github}
            aria-label={tNavbar('ariaGithub')}
          >
            <GithubIcon size={48} className='text-default-500' />
          </NextUILink>
          <NextUILink
            isExternal
            href={siteConfig.links.linkedIn}
            aria-label={t('ariaLinkedIn')}
          >
            <LinkedInIcon size={48} className='text-default-500' />
          </NextUILink>
          <NextUILink
            isExternal
            href={siteConfig.links.facebook}
            aria-label={t('ariaFacebook')}
          >
            <FacebookIcon size={48} className='text-default-500' />
          </NextUILink>
        </div>
      </div>

      <div className='w-full flex justify-center mt-12'>
        <ul className='flex mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          {footerLinks.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className='hover:underline me-4 md:me-6'>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 mt-14 justify-center'>
        {`© ${year} — B5 Holding AS - ${t('allRightsReserved')}.`}
      </div>
    </footer>
  );
}
