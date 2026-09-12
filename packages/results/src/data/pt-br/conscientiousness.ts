import { type TemplateDomain } from '../../types'

const conscientiousness: TemplateDomain = {
  domain: 'C',
  title: 'Conscienciosidade',
  shortDescription: 'Diz respeito à forma como controlamos, conduzimos e direcionamos nossos impulsos.',
  description: `Consciência gira em torno da ideia de organização e perseverança. 
Indivíduos conscientes normalmente são considerados inteligentes, pois idealizam 
metas de longo prazo, planejam como vão alcançar seus objetivos e persistem até 
concluírem, por esse motivo, sua inteligência também está ligada a capacidade de 
controlar impulsos. São extremamente capazes de pensar sobre consequências futuras 
antes de agir. Ao invés de ir em busca de recompensas rápidas, o consciente tende 
a dedicar-se a grandes projetos, onde é devidamente cauteloso em suas atividades. 
As pessoas o consideram uma pessoa prudente e sábia. Os benefícios de ser uma pessoa 
dessa categoria é a consciência de seus atos, pois evitam problemas e os ajuda a 
alcançar altos níveis de assertividade e sucesso através de planejamento, propósito 
e persistência. Também são considerados extremamente confiáveis. Porém podem ser 
perfeccionistas, obcecados e 'workaholics'. Em alguns momentos são considerados 
chatos e "impositores". Já as pessoas que não estão nessa categoria podem ser criticadas 
por não serem tão confiáveis, terem pouca ou nenhuma ambição e por serem desobedientes. 
Agem sem pensar. Porém, ao agir com espontaneidade e impulsivamente podem ser considerados 
divertidos e alegres. Vale lembrar que os impulsos não são necessariamente ruins, pois em alguns 
casos uma decisão rápida pode estar ligada a agilidade e eficácia. No entanto, agir por 
impulso pode levar a vários problemas e inclusive prejudicar a sociedade. Outro problema 
com atos impulsivos é que eles muitas vezes produzem recompensas imediatas, mas suas 
consequências a longo prazo são ruins. O comportamento impulsivo, mesmo quando não é 
totalmente destrutivo, prejudica a assertividade pois dificulta a assimilação de resolução 
de problemas. Também afeta aos envolvidos em projetos que requerem sequências organizadas 
ou são dividiidos em etapas.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Sua pontuação em "Consciência" é baixa, indicando que você gosta 
de viver o agora e faz as coisas de maneira impulsiva. Seu trabalho tende a ser 
desorganizado e costumam te avaliar como descuidado.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Sua pontuação em "Consciência" é média. Isso significa que você 
é razoavelmente organizado e tem auto-controle.`
    },
    {
      score: 'high', // do not translate this line
      text: "Sua pontuação em Conscienciosidade é alta. Você é uma pessoa que define bem seus objetivos e os realiza com determinação. Te consideram confiável e trabalhador."
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Autoeficácia',
      text: `Quem pontua alto normalmente tem confiança para realizar as coisas. Se 
sente capaz, acredita que têm a inteligência (senso comum) e autocontrole necessários 
para alcançar o sucesso e lidam tranquilamente com os desafios e dificuldades da vida. 
Pessoas com pontuação baixa não se sentem eficazes, e podem se sentir perdidos, como se 
não estivessem no controle de suas vidas.`
    },
    {
      facet: 2,
      title: 'Ordem',
      text: `Pontuação alta indica clareza e abordagem metódica das tarefas. Essas pessoas 
gostam de viver de acordo com rotinas e horários, costumam criar listas e fazer planejamento. 
Organização é seu sobrenome. Pessoas com baixa pontuação tendem a ser desorganizadas e dispersas.`
    },
    {
      facet: 3,
      title: 'Senso de Dever',
      text: `Pessoas conscientes, muito dogmáticas em seus valores. Valorizam o dever e 
obrigação. Têm um forte senso de moral. Pessoas com pontuação baixa consideram regras, 
contratos e regulamentações exageradas, podendo ser vistos como não confiáveis ou até mesmo 
irresponsáveis.`
    },
    {
      facet: 4,
      title: 'Realização-Esforço',
      text: `Disposição para trabalhar duro e são motivados por metas (se esforçam para 
alcançar a excelência). Gostam de se sentir reconhecidos e tem objetivos claros na vida. Às 
vezes a busca por perfeição os tornam 'workaholic', obcecados com o trabalho. Pessoas que 
pontuam pouco nessa competência se sentem realizados quando cumprem determinada tarefa com 
o mínimo de trabalho/esforço, podendo ser visto como preguiçoso.`
    },
    {
      facet: 5,
      title: 'Autodisciplina',
      text: `Alta capacidade de seguir com as tarefas e limitar a distração. Se mantém a 
persistentes mesmo em tarefas difíceis ou que não gostem de fazer. Não procrastinam para 
começar e finalizar tarefas e são extremamente focadas quando iniciam uma atividade. Aqueles 
com pouca autodisciplina procrastinam e tem mais dificuldade de 'acompanhar o ritmo'. Muitas 
vezes não conseguem completar tarefas, mesmo as que eles queiram muito finalizar.`
    },
    {
      facet: 6,
      title: 'Cautela',
      text: `Tendem a refletir cuidadosamente sobre as decisões antes de agir. Pensam nas 
possibilidades e consequências das ações antes de tomar uma decisão. Já os que pontuam baixo 
normalmente falam/fazem a primeira coisa que vem à mente sem pensar muito nas consequências das 
suas palavras e ações.`
    }
  ]
}

export default conscientiousness
