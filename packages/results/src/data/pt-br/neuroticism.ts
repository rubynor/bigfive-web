import { type TemplateDomain } from '../../types'

const neuroticism: TemplateDomain = {
  domain: 'N',
  title: 'Neuroticismo',
  shortDescription: 'Neuroticismo: tendência a sentir emoções negativas.',
  description: `O termo neurose foi utilizado por Freud para descrever 
uma condição marcada por sofrimento mental e emocional, e pela incapacidade 
de lidar com as circunstâncias normais da vida. O psicanalista defendia
a ideia de que todos os seres humanos mostram alguns sinais de neurose, 
mas que cada indivíduo lida de maneira diferente ao sofrimento e tem sintomas 
específicos quando "em sitações de perigo". Hoje a psicologia retrata o 
neuroticismo como a tendência à experiência de sentimentos negativos. As pessoas 
dessa personalidade tendem a sentir, dentro desses sentimentos negativos, a 
ansiedade, raiva, ou depressão. São pessoas emocionalmente reativas, ou seja, 
respondem emocionalmente a acontecimentos que não afetariam a maioria das pessoas,
e suas reações tendem a ser mais intensas do que o normal. Eles interpretam situações 
comuns como ameaçadoras, e pequenas frustrações são extremamente difíceis de lidar. 
As reações negativas tendem a persistir por períodos longos de tempo, o que significa 
que eles estão muitas vezes de mau humor. Esses problemas emocionais podem diminuir 
a capacidade de pensar com clareza, fazer decisões, e lidar com o estresse.
Indivíduos que caem na categoria neurótica tendem a ser mais propensos a 
mudanças de humor e a serem reativos.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Sua pontuação para "neuroticismo é baixa, indicando que você é 
bastante calmo, equilibrado e estável. Você não reage com
emoções intensas em situações difíceis. Em momentos de estresse você tende a ser bastante 
tranquilo e não responde emocionalmente com raiva. Geralmente confiam em sua capacidade 
de lidar com situações adversas ou desconfortáveis.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Sua pontuação para "neuroticismo" é média, indicando que seu 
nível de reatividade emocional é típica da população em geral. Situações 
estressantes e frustrantes são um pouco perturbadoras para você, mas você 
geralmente é capaz de superar esses sentimentos e lidar bem com essas situações.`
    },
    {
      score: 'high', // do not translate this line
      text: `Sua pontuação para "neuroticismo" é alta, indicando que você tende 
a experimentar emoções negativas muito intensamente e têm dificuldade em controlar 
essas emoções quando surgem. As pessoas te consideram sensível e emotivo. Pessoas 
com essa personalidade são mais vulneráveis à angústia psicológica do que 
os indivíduos que pontuam mais baixo.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Ansiedade',
      text: `Tipo de pessoa que está sempre 'em alerta'. Sente ansiedade e que algo 
perigoso está prestes a acontecer. São mais propensos a sentir medo e tensão em 
situações comuns. Pessoas com baixa pontuação para ansiedade geralmente não têm medo, 
são calmas e tranquilas.`
    },
    {
      facet: 2,
      title: 'Raiva',
      text: `As pessoas com alta pontuação nessa categoria se frustram quando as 
coisas não vão do seu jeito e têm tendência a sentir amargura e raiva. Gostam de ser 
tratados de forma justa e se sentem injustiçados quando enganados. Pessoas com pontuação 
baixa dificilmente passam raiva.`
    },
    {
      facet: 3,
      title: 'Melancolia',
      text: `Pontuações altas identificam pessoas que têm dificuldade em iniciar 
atividades e propensão maior a experimentar sintomas depressivos, como perda de energia, 
dificuldade de concentração e problemas com o sono. Já as pessoas com pontuação baixa 
tendem a não sentir esses sentimentos depressivos.`
    },
    {
      facet: 4,
      title: 'Autoconsciência',
      text: 'Esta faceta descreve a tendência a sentir constrangimento, vergonha ou desconforto em situações sociais. Pessoas com alta autoconsciência são muito sensíveis ao que os outros pensam delas, temem o ridículo e podem se sentir ansiosas ou tensas na presença de outros. Aqueles com baixa autoconsciência, por outro lado, raramente se sentem intimidados socialmente e não se preocupam excessivamente com a opinião alheia.'
    },
    {
      facet: 5,
      title: 'Impulsividade',
      text: `Pessoas impulsivas são incapazes de controlar desejos ou impulsos. 
Sentem dificuldade em resistir a vontades. Eles tendem a sanar seus prazeres e 
buscam recompensas instantâneas ao invés de longo-prazo. Já pessoas pouco impulsivas
não experimentam necessidades exageradas ou desejos que são impossíveis de resistir, 
por esse motivo costumam ser mais moderados. `
    },
    {
      facet: 6,
      title: 'Vulnerabilidade',
      text: `Pessoas que pontuam alto nessa competência têm dificuldade em lidar com 
o estresse. Estão mais propensos a passar por situações de pânico, confusão e desamparo 
quando sob pressão. Pessoas com pouca pontuação para vulnerabilidade se sentem mais 
equilibrados, confiantes e pensam com clareza quando passam por momentos de estresse.`
    }
  ]
}

export default neuroticism
