import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';
import { ComparePeople } from './compare-people';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

interface Props {
  params: { locale: string };
  searchParams: { id: string };
}

export default function ComparePage({
  params: { locale },
  searchParams: { id }
}: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('getCompare');
  return (
    <div className='h-[calc(60vh)]'>
      <h1 className={title()}>{t('title')}</h1>
      <br />
      <br />
      <span className='mt-2'>{t('description1')}</span>
      <Suspense fallback={t('loadingText')}>
        <ComparePeople
          addPersonText={t('addPerson')}
          comparePeopleText={t('comparePeople')}
          paramId={id}
        />
      </Suspense>
    </div>
  );
}
