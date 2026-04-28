export interface Conjugation {
  subject: string;
  form: string;
}

export interface VerbTheory {
  verb: string;
  meaning: string;
  conjugations: Conjugation[];
}

export interface PedroQuestion {
  id: string;
  prompt: string;
  choices: string[];
  target: string;
  translation: string;
}

export const VERB_THEORY: VerbTheory[] = [
  {
    verb: 'Trabajar',
    meaning: 'Used for PEOPLE working (performing tasks, having a job).',
    conjugations: [
      { subject: 'Yo', form: 'trabajo' },
      { subject: 'Tú', form: 'trabajas' },
      { subject: 'Él/Ella', form: 'trabaja' },
      { subject: 'Nosotros', form: 'trabajamos' },
      { subject: 'Ellos/Ellas', form: 'trabajan' }
    ]
  },
  {
    verb: 'Funcionar',
    meaning: 'Used for MACHINES, SYSTEMS, or PLANS (to function, to be in working order).',
    conjugations: [
      { subject: 'Yo', form: 'funciono' },
      { subject: 'Tú', form: 'funcionas' },
      { subject: 'Él/Ella', form: 'funciona' },
      { subject: 'Nosotros', form: 'funcionamos' },
      { subject: 'Ellos/Ellas', form: 'funcionan' }
    ]
  }
];

export const TENNIS_QUESTIONS: PedroQuestion[] = [
  { id: '1', prompt: 'La raqueta rota no ___.', choices: ['trabaja', 'funciona'], target: 'funciona', translation: 'Կոտրված թենիսի ռակետը չի աշխատում (սարքին չէ):' },
  { id: '2', prompt: 'Pedro y Ernesto ___ en el club.', choices: ['trabajan', 'funcionan'], target: 'trabajan', translation: 'Պեդրոն և Էռնեստոն աշխատում են ակումբում:' },
  { id: '3', prompt: 'El sistema del torneo ___ bien.', choices: ['trabaja', 'funciona'], target: 'funciona', translation: 'Մրցաշարի համակարգը լավ է աշխատում (գործում է):' },
  { id: '4', prompt: 'Ernesto ___ como entrenador.', choices: ['trabaja', 'funciona'], target: 'trabaja', translation: 'Էռնեստոն աշխատում է որպես մարզիչ:' },
  { id: '5', prompt: '¿___ el marcador electrónico?', choices: ['Trabaja', 'Funciona'], target: 'Funciona', translation: 'Էլեկտրոնային լուսատախտակը աշխատո՞ւմ է (սարքին է):' },
  { id: '6', prompt: 'Pedro ___ con su revés.', choices: ['trabaja', 'funciona'], target: 'trabaja', translation: 'Պեդրոն աշխատում է իր հետհարվածի վրա:' },
  { id: '7', prompt: 'El reloj del estadio no ___.', choices: ['trabaja', 'funciona'], target: 'funciona', translation: 'Մարզադաշտի ժամացույցը չի աշխատում:' },
  { id: '8', prompt: '¿Dónde ___ Ernesto hoy?', choices: ['trabajas', 'trabaja'], target: 'trabaja', translation: 'Որտե՞ղ է աշխատում Էռնեստոն այսօր:' },
  { id: '9', prompt: 'Esta pelota vieja no ___.', choices: ['trabaja', 'funciona'], target: 'funciona', translation: 'Այս հին գնդակը չի աշխատում (չի թռչում):' },
  { id: '10', prompt: 'Pedro y yo ___ en el gimnasio.', choices: ['trabajamos', 'funcionamos'], target: 'trabajamos', translation: 'Պեդրոն և ես աշխատում ենք մարզասրահում:' },
  { id: '11', prompt: 'La máquina de encordar ___ hoy.', choices: ['trabaja', 'funciona'], target: 'funciona', translation: 'Լարելու մեքենան այսօր աշխատում է:' },
  { id: '12', prompt: 'Ernesto ___ los fines de semana.', choices: ['trabaja', 'funciona'], target: 'trabaja', translation: 'Էռնեստոն աշխատում է հանգստյան օրերին:' },
  { id: '13', prompt: 'La red de la pista no ___.', choices: ['trabaja', 'funciona'], target: 'funciona', translation: 'Դաշտի ցանցը չի աշխատում (սարքին չէ):' },
  { id: '14', prompt: 'Ustedes ___ para Ernesto.', choices: ['trabajan', 'funcionan'], target: 'trabajan', translation: 'Դուք աշխատում եք Էռնեստոյի համար:' },
  { id: '15', prompt: 'Este método de entreno ___.', choices: ['trabaja', 'funciona'], target: 'funciona', translation: 'Մարզումների այս մեթոդը աշխատում է (արդյունավետ է):' }
];

export const ASSETS = {
  PEDRO: 'https://images.unsplash.com/photo-1542144557-f505c21b8c36?q=80&w=800&auto=format&fit=crop',
  ERNESTO: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop',
  TENNIS_COURT: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1200&auto=format&fit=crop',
  STADIUM: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop'
};
