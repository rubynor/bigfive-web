import { type TemplateDomain } from '../../types'

const agreeableness: TemplateDomain = {
  domain: 'A',
  title: 'Afabilidade',
  shortDescription: 'Pessoas agradáveis, simpáticas. Se preocupam com a cooperação e a harmonia social e facilmente se dão bem com outras pessoas.',
  description: `São atenciosos, amigáveis, generosos e se comprometem com os 
interesses do próximo. Pessoas com esse perfil também têm uma visão otimista 
sobre a humanidade. Eles acreditam que as pessoas são honestas, decentes, 
e confiáveis por natureza. Já os que não se encaixam nesse perfil são 
considerados mais individualistas, colocam o interesse próprio acima do 
interesse alheio e geralmente não se preocupam com o bem-estar dos outros e 
normalmente não estão dispostos a ajudar. Às vezes, sua desconfiança faz com 
que suspeitem dos outros, sejam hostis e não pensem no cooperativismo.
A "afabilidade" é uma virtude para alcançar e manter popularidade. Pessoas 
"afáveis" tendem a conquistar uma admiração sem terem que se esforçar para isso. 
Por outro lado, essa busca por aceitação pode atrapalhar em situações que requerem 
decisões objetivas e mais complexas, pois a opinião externa e a harmonia entre os 
demais pesam mais do que seu ponto de vista. Se esforçam demais para que suas 
ações agradem a maioria.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: 'Sua pontuação para "afabilidade" é baixa, indicando que você se preocupa mais com as próprias necessidades do que com a dos outros. As pessoas podem te considerar rigoroso, crítico e inflexível.'
    },
    {
      score: 'neutral', // do not translate this line
      text: `Seu nível de "amabilidade" é médio, indicando que você se preocupa 
com as necessidades alheias, mas, dificilmente você se sacrifica para 
fazê-las ou agradar aos outros.`
    },
    {
      score: 'high', // do not translate this line
      text: `Seu alto nível de "afabilidade" indica um forte interesse em atender 
necessidades dos outros, promover o bem-estar dos que estão a sua volta 
e o cooperativismo. Você é agradável, simpático, e solidário.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Confiança',
      text: `Quem pontua alto para confiança normalmente acredita que a maioria 
das pessoas são justas, honestas e bem-intencionadas por natureza. Pessoas com 
baixa pontuação são desconfiados, enxergam os outros como egoístas, 
desonestos e perigosos.`
    },
    {
      facet: 2,
      title: 'Moralidade',
      text: 'Pessoas que se baseiam na ética e justiça, indivíduo sincero e franco. Esse grupo têm facilidade em lidar com outras pessoas e normalmente não gostam de manipulações nas relações. Pessoas com baixa pontuação aqui podem ser vistas como mais dispostas a usar de astúcia ou a ocultar a verdade para atingir seus próprios objetivos, e podem não hesitar em manipular os outros se acharem vantajoso.'
    },
    {
      facet: 3,
      title: 'Altruísmo',
      text: `Se sentem recompensados ao ajudar outras pessoas como forma de 
auto-realização, fortemente movidos pela compaixão e dedicados a promover o 
bem-estar dos outros. Extremamente generoso e disposto a ajudar aqueles que estão 
em necessidade. Pontuação baixa para altruísmo indica pessoas que não se sentem 
bem ajudando necessitados. Ajudar parece mais uma obrigação para eles 
do que uma ação gratificante.`
    },
    {
      facet: 4,
      title: 'Cooperação',
      text: `Indivíduos que não gostam de confrontos/agressividade. Preferem 
comprometer ou negar suas próprias necessidades, se isso resultar em harmonia entre 
os demais. Já os que pontuam pouco são mais propensos a intimidar os outros para 
conseguir o que querem.`
    },
    {
      facet: 5,
      title: 'Modéstia',
      text: `Pessoas que falam de realizações próprias com bastante humildade.
Não gostam de ser considerados superiores ou melhores do que os outros. Em alguns 
casos essa atitude pode ocasionar baixa autoconfiança/autoestima. Os que têm 
pontuação baixa se consideram superiores e podem ser vistos como arrogante 
por outras pessoas.`
    },
    {
      facet: 6,
      title: 'Empatia',
      text: `Pontuação alta indica capacidade de se pôr no lugar do outro. Sentem a 
dor alheia com compaixão e se preocupam com os demais. O sofrimento humano é algo que 
os afeta fortemente. Os que pontuam baixo nessa competência não se afetam muito pelo 
sofrimento humano. Acreditam na meritocracia e que julgamentos são baseados na razão. 
Estão mais preocupados com a verdade e justiça imparcial do que com a misericórdia/pena.`
    }
  ]
}

export default agreeableness
