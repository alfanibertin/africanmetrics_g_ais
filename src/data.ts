import { Country, COUNTRIES } from './shared/countries';

export { COUNTRIES };
export type { Country };

export const getCountryFlag = (id: string): string => {
  const cleanId = id.toLowerCase().trim().replace(/_/g, '-');
  const flags: Record<string, string> = {
    'egypt': '🇪🇬',
    'algeria': '🇩🇿',
    'morocco': '🇲🇦',
    'tunisia': '🇹🇳',
    'libya': '🇱🇾',
    'sudan': '🇸🇩',
    'mauritania': '🇲🇷',
    'nigeria': '🇳🇬',
    'ghana': '🇬🇭',
    'ivory-coast': '🇨🇮',
    'cote-divoire': '🇨🇮',
    'côte-d-ivoire': '🇨🇮',
    'senegal': '🇸🇳',
    'mali': '🇲🇱',
    'burkina-faso': '🇧🇫',
    'niger': '🇳🇪',
    'guinea': '🇬🇳',
    'benin': '🇧🇯',
    'togo': '🇹🇬',
    'sierra-leone': '🇸🇱',
    'liberia': '🇱🇷',
    'gambia': '🇬🇲',
    'guinea-bissau': '🇬🇼',
    'cape-verde': '🇨🇻',
    'cabo-verde': '🇨🇻',
    'south-africa': '🇿🇦',
    'cameroon': '🇨🇲',
    'central-african-republic': '🇨🇫',
    'chad': '🇹🇩',
    'congo': '🇨🇬',
    'dr-congo': '🇨🇩',
    'democratic-republic-of-the-congo': '🇨🇩',
    'republic-of-the-congo': '🇨🇬',
    'equatorial-guinea': '🇬🇶',
    'gabon': '🇬🇦',
    'sao-tome': '🇸🇹',
    'são-tomé-and-príncipe': '🇸🇹',
    'sao-tome-and-principe': '🇸🇹',
    'kenya': '🇰🇪',
    'ethiopia': '🇪🇹',
    'tanzania': '🇹🇿',
    'uganda': '🇺🇬',
    'rwanda': '🇷🇼',
    'burundi': '🇧🇮',
    'somalia': '🇸🇴',
    'djibouti': '🇩🇯',
    'eritrea': '🇪🇷',
    'seychelles': '🇸🇨',
    'mauritius': '🇲🇺',
    'comoros': '🇰🇲',
    'madagascar': '🇲🇬',
    'mozambique': '🇲🇿',
    'malawi': '🇲🇼',
    'zambia': '🇿🇲',
    'zimbabwe': '🇿🇼',
    'angola': '🇦🇴',
    'namibia': '🇳🇦',
    'botswana': '🇧🇼',
    'lesotho': '🇱🇸',
    'eswatini': '🇸🇿',
    'swaziland': '🇸🇿',
    'south-sudan': '🇸🇸',
    'western-sahara': '🇪🇭',
    'eritera': '🇪🇷',
    'saint-helena': '🇸🇭',
    'mayotte': '🇾🇹',
    'reunion': '🇷🇪',
    'réunion': '🇷🇪',
    'somaliland': '🇸🇴',
    'congo-rep': '🇨🇬'
  };
  return flags[cleanId] || '🌍';
};

export const getCountryISO2 = (id: string): string => {
  const cleanId = id.toLowerCase().trim().replace(/_/g, '-');
  if (cleanId === 'congo-rep') return 'cg';
  if (cleanId === 'saint-helena') return 'sh';
  if (cleanId === 'sao-tome') return 'st';
  if (cleanId === 'cote-divoire' || cleanId === 'ivory-coast' || cleanId === 'côte-d-ivoire') return 'ci';
  if (cleanId === 'cabo-verde' || cleanId === 'cape-verde') return 'cv';
  if (cleanId === 'dr-congo' || cleanId === 'democratic-republic-of-the-congo') return 'cd';
  
  const flag = getCountryFlag(id);
  if (!flag || flag === '🌍') return 'af';
  
  try {
    const codePoints = Array.from(flag);
    let code = '';
    for (const char of codePoints) {
      const cp = char.codePointAt(0);
      if (cp && cp >= 0x1F1E6 && cp <= 0x1F1FF) {
        code += String.fromCharCode(cp - 0x1F1E6 + 65);
      }
    }
    return code.toLowerCase() || 'af';
  } catch (e) {
    return 'af';
  }
};
