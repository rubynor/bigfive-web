import { type TemplateDomain } from '../../types'

const openness: TemplateDomain = {
  domain: 'O',
  title: 'Abertura à Experiência',
  shortDescription: 'Pessoas criativas, apreciadores da arte e da beleza e que gostam do novo.',
  description: `Abertura à Experiência retrata pessoas intelectualmente curiosas, 
apreciadoras da arte e sensíveis à beleza. Eles tendem a ser, em comparação com 
pessoas mais fechadas, mais conscientes de seus sentimentos. Tendem a pensar e agir 
de maneira individualista. A abertura à Experiência está ligada ao intelecto, a 
pessoas consideradas intelectuais. Outra característica dessa categoria é a facilidade 
para assimilação de símbolos e ao abstrato. Habilidades intelectuais (pensamento matemático, 
lógico ou geométrico, uso artístico e metafórico da linguagem, performance musical e da 
arte visual). Pessoas com notas baixas em "Abertura à Experiência" tendem a se
interessar pelo comum. Eles preferem o simples, direto e óbvio, são conservadores e 
resistentes à mudança. Pessoas nessa categoria, abertas à experiências, são normalmente 
consideradas mais maduras, que se adaptam com mais facilidade. No entanto, estilos de 
pensamento "abertos e fechados" são úteis em diferentes ambientes. O estilo intelectual 
da pessoa aberta pode servir bem a um professor, já o indivíduo que não pontua tanto 
para abertura à experiência pode desempenhar melhor no trabalho policial, 
vendas e uma série de outras ocupações.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Sua pontuação para "abertura para experiência" é baixa, indicando 
que você gosta de pensar em termos simples e claros. Te descrevem como prático e realista.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Sua pontuação para "abertura para experiência" é média, indicando que você 
gosta de tradição, mas está disposto a tentar coisas novas. Você costuma pensar de 
maneira neutra, nem simples nem complicada. Os outros te vêem como uma pessoa educada 
mas não super intelectual.`
    },
    {
      score: 'high', // do not translate this line
      text: `Sua pontuação para "abertura para experiência" é alta, indicando que você 
gosta de novidades, de variar as atividades, e de mudanças. Você é curioso e criativo.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Fantasia',
      text: `Vida mental ativa, critiva e de forte imaginação. Para essas pessoas o 
mundo real é muito comum, normal e rotineiro, por isso estão sempre criando maneiras 
de fantasiar um mundo mais interessante e fabuloso. Quem não tem uma pontuação alta 
para fantasia são mais orientados por fatos do que imaginação.`
    },
    {
      facet: 2,
      title: 'Estética',
      text: `Forte valorização da arte e da beleza, interesse pela poesia, arte e 
música. Essas pessoas normalmente desenvolvem habilidades artísticas e têm 
sensibilidade a eventos naturais e a estética. Já as pessoas que têm baixa pontuação, 
tem pouca ou nenhuma sensibilidade estética e interesse pela arte.`
    },
    {
      facet: 3,
      title: 'Emotividade',
      text: `Receptivos e conscientes de seus próprios sentimentos e emoções. 
Sentem emoções fortes e tendem a expressá-las abertamente. As pessoas pouco emotivas
tendem a não expressar suas emoções abertamente.`
    },
    {
      facet: 4,
      title: 'Aventura',
      text: `Dispostos a explorar novos lugares, experimentar novos alimentos e 
começar novas atividades. Pessoas aventureiras estão sempre em busca do desconhecido, 
gostam de desbravar lugares e não gostam de rotina. É aquela pessoa que gosta de mudar 
a cada dia seu caminho de volta para casa. Ao contrário, as pessoas que pontuam pouco 
para aventura se sentem desconfortáveis com mudanças e preferem rotinas familiares.`
    },
    {
      facet: 5,
      title: 'Intelecto',
      text: `Curioso e cheio de ideias. Interesse por argumentos filosóficos. Pessoas 
abertas para o novo e incomum, gostam de debater questões intelectuais, de decifrar 
enigmas e de desafios para a mente. Normalmente se saem melhores em questões de raciocínio 
rápido e lógica. Já as pessoas com pontuação baixa preferem lidar com pessoas em vez de 
ideias. Eles consideram os exercícios intelectuais uma perda de tempo.`
    },
    {
      facet: 6,
      title: 'Liberalismo',
      text: `Gosta de explorar e avaliar seus próprios valores sociais, políticos e religiosos. 
Liberalismo psicológico refere-se a uma abertura a desafiar autoridade, o convencional e 
tradicional. Demonstra aversão em relação às regras, se questiona com frequência sobre o que 
é imposto e aprecia revoluções sociais. Não se importam com estabilidade e segurança, são 
inconformados e entram em conflito com a tradição. Já o contrário, os conservadores psicológicos, 
preferem a segurança e estabilidade. Se sentem bem com o tradicional e normalmente não saem 
da sua zona de conforto.`
    }
  ]
}

export default openness
