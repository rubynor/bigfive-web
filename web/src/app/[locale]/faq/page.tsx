'use client';
import { title } from '@/components/primitives';
import { Accordion, AccordionItem } from '@nextui-org/accordion';

export default function FaqPage() {
  const faq = [
    {
      question: 'I got an error on this website',
      answer:
        'Submit an issue on GitHub or send us an e-mail at bigfive-test@rubynor.com'
    },
    {
      question: 'Can I use the code for this website for Commercial Purposes?',
      answer: 'Yes, this project is licensed under the MIT license.'
    },
    {
      question: 'Can I use the questions for Commercial Purposes?',
      answer:
        'Yes, the questions and translations are licensed under the MIT license.'
    },
    {
      question: 'How do I print my test results?',
      answer:
        'Try to print the results-page from your browser or save it as a PDF-document and print that instead.'
    },
    {
      question: 'I want to translate the questions to my language',
      answer:
        "Use this website to translate the questions. Select the language you want to translate from.Translate the questions and click 'generate'. This will generate a file and download it to your computer. Send the downloaded file to bigfive- test@rubynor.com and tell us which language you have translated. If you want to translate it directly on github instead, you can follow the description here."
    },
    {
      question: 'I want to translate the result text to my language',
      answer:
        'If you want to translate the result text you need to follow the description here.'
    },
    {
      question:
        'Where can I find more information about the questions and the evaluation?',
      answer: 'See the IPIP Website for more information.'
    },
    {
      question: 'Where can I find the questions?',
      answer:
        'All questions and translations are in this repo in the data folder. The questions and scoring are taken from ipip.ori.org'
    },
    {
      question: 'Where can I find the code?',
      answer: 'The code is found here on GitHub.'
    }
  ];
  return (
    <div>
      <h1 className={title()}>Frequently asked questions.</h1>
      <Accordion className='mt-10'>
        {faq.map((item, index) => (
          <AccordionItem
            key={index}
            textValue={item.question}
            title={
              <span className='text-foreground text-large font-medium'>
                {item.question}
              </span>
            }
          >
            <div className='py-2 pt-0 pb-6 text-base text-default-500'>
              {item.answer}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
