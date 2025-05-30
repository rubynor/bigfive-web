import { type TemplateDomain } from '../../types'

const extraversion: TemplateDomain = {
  domain: 'E',
  title: 'Extroversão',
  shortDescription: 'A extroversão é marcada pela sociabilidade, engajamento com o mundo externo.',
  description: `Extrovertidos gostam de estar rodeados de pessoas, são cheios 
de energia, e normalmente seus dias são carregados de emoções positivas. Eles 
tendem a ser animados, orientados para a ação. Provavelmente você vai escutar 
deles palavras motivadoras, como 'Bora!' e 'Vamos? Vamos!' Quando estão em 
grupos eles gostam de falar, se destacar e chamar a atenção. Ao contrário, os
introvertidos tendem a ser discretos e mais quietos, gostam de passar o tempo 
sozinhos. Sua falta de envolvimento social não deve ser interpretado como timidez 
ou depressão. O introvertido simplesmente precisa de menos estímulo do que um 
extrovertido e prefere sua própria companhia. A independência e reserva do 
introvertido é às vezes confundido como falta de amizade ou arrogância. 
Na verdade, um introvertido que pontua alto na "afabilidade" é o tipo de pessoa 
que não busca ajuda de outros, mas será bastante simpático e solicito quando o chamarem.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: 'Sua pontuação para "extroversão" é baixa, indicando que você tende a ser mais introvertido, reservado e tranquilo. Você curte a solidão e atividades individuais. Ter alguns amigos próximos para você já é um grande nível de socialização.'
    },
    {
      score: 'neutral', // do not translate this line
      text: `Sua pontuação extroversão é média, indicando que você 
não é nem super tímido e nem o mais comunicativo do seu grupo. Você 
aproveita o tempo com outros, mas também gosta de estar sozinho.`
    },
    {
      score: 'high', // do not translate this line
      text: `Sua pontuação para extroversão é alta, indicando que 
você é bastante sociável, extrovertido, energético e animado. Você 
prefere estar por perto de pessoas a maior parte do tempo. `
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Simpatia',
      text: `Pessoas amigáveis, que fazem amigos rapidamente e com 
muita facilidade. Os que pontuam baixo para simpatia não são 
necessariamente frios e hostis, são apenas menos comunicativos, mais 
distantes e reservados.`
    },
    {
      facet: 2,
      title: 'Sociabilidade',
      text: `Preferência pela companhia dos outros e evita estar 
sozinho. Se sentem bem em multidões/aglomerações. Já os que pontuam 
pouco tendem a se sentir tensos em grandes multidões e por isso evitam 
aglomerações. Não são antisociais/antipáticos, apenas sentem mais 
necessidade de privacidade e tempo para si mesmos do que as pessoas 
que têm pontuação alta.`
    },
    {
      facet: 3,
      title: 'Assertividade',
      text: `Gostam de assumir o comando e direcionar as atividades 
dos outros. Tendem a conquistar cargos de liderança e dominar situações 
sociais. Já as pessoas com pontuação baixa tendem a ser mais quietos e 
não se incomodam quando os outros comandam as atividades em grupos.`
    },
    {
      facet: 4,
      title: 'Atividade',
      text: `Pessoas com estilo de vida acelerado e propensos a estarem 
ativos. Gostam de estar em movimento e normalmente estão envolvidos em 
muitas atividades ao mesmo tempo. Pesoas que tem pontuação baixa seguem 
um ritmo mais lento e tranquilo, são mais relaxadas.`
    },
    {
      facet: 5,
      title: 'Busca de Sensações',
      text: `Alegres e estimulados. Têm preferência por barulho. Ficam 
entediados facilmente, adoram luzes brilhantes e movimento. Eles são mais 
propensos a arriscar-se e viver fortes emoções. Os com pontuação baixa não 
gostam de barulho e tumulto e fogem de experiências com fortes emoções.`
    },
    {
      facet: 6,
      title: 'Emoções Positivas',
      text: `Pessoas alto astral, bem humoradas, lidam com as situações com 
emoções positivas com felicidade, entusiasmo e alegria. As pessoas que 
alcançam uma pontuação baixa não tem um temperamento tão enérgico e alto astral`
    }
  ]
}

export default extraversion
