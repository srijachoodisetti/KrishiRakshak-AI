/**
 * Centralized agricultural terminology dictionary for instantaneous multilingual localization
 * between English (en), Telugu (te), and Hindi (hi) without unnecessary Gemini API round-trips.
 */

export const CROP_TRANSLATIONS: Record<string, { te: string; hi: string; en: string }> = {
  rice: { te: 'వరి', hi: 'धान / चावल', en: 'Rice (Paddy)' },
  paddy: { te: 'వరి', hi: 'धान / चावल', en: 'Rice (Paddy)' },
  tomato: { te: 'టమాటా', hi: 'टमाटर', en: 'Tomato' },
  cotton: { te: 'పత్తి', hi: 'कपास', en: 'Cotton' },
  chilli: { te: 'మిరప', hi: 'मिर्च', en: 'Chilli' },
  chili: { te: 'మిరప', hi: 'मिर्च', en: 'Chilli' },
  maize: { te: 'మొక్కజొన్న', hi: 'मक्का', en: 'Maize' },
  corn: { te: 'మొక్కజొన్న', hi: 'मक्का', en: 'Corn / Maize' },
  groundnut: { te: 'వేరుశనగ', hi: 'मूंगफली', en: 'Groundnut' },
  peanut: { te: 'వేరుశనగ', hi: 'मूंगफली', en: 'Groundnut' },
  sugarcane: { te: 'చెరకు', hi: 'गन्ना', en: 'Sugarcane' },
  turmeric: { te: 'పసుపు', hi: 'हल्दी', en: 'Turmeric' },
  wheat: { te: 'గోధుమ', hi: 'गेहूं', en: 'Wheat' },
  pulse: { te: 'పప్పుధాన్యాలు', hi: 'दलहन / दालें', en: 'Pulses' },
  citrus: { te: 'బత్తాయి / నిమ్మ', hi: 'नींबू वर्गीय फल', en: 'Citrus' },
  mango: { te: 'మామిడి', hi: 'आम', en: 'Mango' },
  banana: { te: 'అరటి', hi: 'केला', en: 'Banana' },
  onion: { te: 'ఉల్లిపాయ', hi: 'प्याज', en: 'Onion' },
  potato: { te: 'బంగాళాదుంప', hi: 'आलू', en: 'Potato' },
  mustard: { te: 'ఆవాలు', hi: 'सरसों', en: 'Mustard' },
  soybean: { te: 'సోయాబీన్', hi: 'सोयाबीन', en: 'Soybean' },
  unknown: { te: 'గుర్తించబడని పంట', hi: 'अज्ञात फसल', en: 'Unknown Crop' },
}

export const DISEASE_TRANSLATIONS: Record<string, { te: string; hi: string; en: string }> = {
  'rice blast': { te: 'వరి అగ్గి తెగులు', hi: 'धान का झुलसा रोग (ब्लास्ट)', en: 'Rice Blast' },
  'bacterial leaf blight': { te: 'బాక్టీరియా ఆకు ఎండు తెగులు', hi: 'जीवाणु पत्ती झुलसा रोग', en: 'Bacterial Leaf Blight' },
  'sheath blight': { te: 'కాండం / తొడుగు కుళ్ళు తెగులు', hi: 'शीथ ब्लाइट (पर्णच्छद झुलसा)', en: 'Sheath Blight' },
  'brown spot': { te: 'గోధుమ రంగు మచ్చ తెగులు', hi: 'भूरा धब्बा रोग (ब्राउन स्पॉट)', en: 'Brown Spot' },
  'early blight': { te: 'ముందస్తు ఆకు మాడు తెగులు', hi: 'अगेती झुलसा (अगेती ब्लाइट)', en: 'Early Blight' },
  'late blight': { te: 'ఆలస్యపు ఆకు మాడు తెగులు', hi: 'पछेती झुलसा (पछेती ब्लाइट)', en: 'Late Blight' },
  'leaf curl': { te: 'ఆకు ముడత తెగులు', hi: 'पर्ण कुंचन रोग (लीफ कर्ल)', en: 'Leaf Curl' },
  'powdery mildew': { te: 'బూడిద తెగులు', hi: 'चूर्णी फफूंद (पाउडरी मिल्ड्यू)', en: 'Powdery Mildew' },
  'downy mildew': { te: 'డౌనీ మిల్డ్యూ తెగులు', hi: 'मृदुरोमिल फफूंद (डाउनी मिल्ड्यू)', en: 'Downy Mildew' },
  'rust': { te: 'తుప్పు తెగులు', hi: 'गेरुआ / रतुआ रोग (रस्ट)', en: 'Rust Disease' },
  'anthracnose': { te: 'ఆంత్రాక్నోస్ / పండు కుళ్ళు తెగులు', hi: 'एंथ्रेक्नोज (श्याम वर्ण रोग)', en: 'Anthracnose' },
  'collar rot': { te: 'మొక్క మొదలు కుళ్ళు తెగులు', hi: 'कॉलर रॉट (तना गलन रोग)', en: 'Collar Rot' },
  'root rot': { te: 'వేరు కుళ్ళు తెగులు', hi: 'जड़ गलन रोग (रूट रॉट)', en: 'Root Rot' },
  'fusarium wilt': { te: 'ఫ్యుసేరియం వడలు తెగులు', hi: 'उकठा रोग (विल्ट)', en: 'Fusarium Wilt' },
  'yellow mosaic': { te: 'పసుపు పచ్చ మొజాయిక్ తెగులు', hi: 'पीला मोजेक वायरस रोग', en: 'Yellow Mosaic' },
  'healthy': { te: 'ఆరోగ్యకరమైన పంట / తెగులు లక్షణాలు లేవు', hi: 'स्वस्थ फसल / कोई रोग लक्षण नहीं', en: 'Healthy Crop / No Visible Pathogen' },
  'uncertain': { te: 'అస్పష్టమైన లక్షణాలు / నిర్ధారించబడని తెగులు', hi: 'अस्पष्ट लक्षण / अनिर्धारित रोग', en: 'Uncertain / Inconclusive Symptoms' },
}

export const PHRASE_TRANSLATIONS_TE: Record<string, string> = {
  'leaf': 'ఆకు',
  'leaves': 'ఆకులు',
  'stem': 'కాండం',
  'lesion': 'మచ్చ',
  'lesions': 'మచ్చలు',
  'spots': 'మచ్చలు',
  'chlorosis': 'ఆకులు పసుపు రంగులోకి మారడం',
  'yellowing': 'పసుపు రంగులోకి మారడం',
  'necrosis': 'కణజాలం ఎండిపోవడం',
  'wilting': 'వడలిపోవడం',
  'fungal': 'శిలీంద్ర సంబంధిత',
  'bacterial': 'బాక్టీరియా సంబంధిత',
  'drainage': 'మురుగునీటి పారుదల',
  'spacing': 'మొక్కల మధ్య సరైన దూరం',
  'sanitation': 'పొల పరిశుభ్రత',
  'neem oil': 'వేప నూనె',
  'trichoderma': 'ట్రైకోడెర్మా విరిడి',
  'fungicide': 'శిలీంద్ర సంహారిణి',
  'consult': 'సంప్రదించండి',
  'extension officer': 'వ్యవసాయ విస్తరణాధికారి',
  'inspection': 'క్షేత్ర పరిశీలన',
}

export const PHRASE_TRANSLATIONS_HI: Record<string, string> = {
  'leaf': 'पत्ती',
  'leaves': 'पत्तियां',
  'stem': 'तना',
  'lesion': 'धब्बा',
  'lesions': 'धब्बे',
  'spots': 'धब्बे',
  'chlorosis': 'पत्तियों का पीला पड़ना',
  'yellowing': 'पीलापन',
  'necrosis': 'ऊतक क्षय (सड़न/सूखना)',
  'wilting': 'मुरझाना',
  'fungal': 'फफूंद जनित',
  'bacterial': 'जीवाणु जनित',
  'drainage': 'जल निकासी',
  'spacing': 'उचित दूरी',
  'sanitation': 'खेत की स्वच्छता',
  'neem oil': 'नीम का तेल',
  'trichoderma': 'ट्राइकोडर्मा',
  'fungicide': 'फफूंदनाशक',
  'consult': 'संपर्क करें',
  'extension officer': 'कृषि विस्तार अधिकारी',
  'inspection': 'निरीक्षण',
}

/**
 * Translates a crop name into target language (en, te, hi).
 */
export function localizeCropName(name: string, lang: 'en' | 'te' | 'hi'): string {
  if (!name) {
    if (lang === 'te') return 'గుర్తించబడని పంట'
    if (lang === 'hi') return 'अज्ञात फसल'
    return 'Unknown Crop'
  }
  const lower = name.toLowerCase().trim()

  for (const [key, val] of Object.entries(CROP_TRANSLATIONS)) {
    if (lower.includes(key) || key.includes(lower)) {
      return val[lang]
    }
  }

  // Check reverse matches from Telugu or Hindi
  for (const val of Object.values(CROP_TRANSLATIONS)) {
    if (val.te === name.trim() || val.hi === name.trim()) {
      return val[lang]
    }
  }

  return name
}

/**
 * Translates a disease name into target language (en, te, hi).
 */
export function localizeDiseaseName(name: string, lang: 'en' | 'te' | 'hi'): string {
  if (!name) {
    if (lang === 'te') return 'అస్పష్టమైన లక్షణాలు'
    if (lang === 'hi') return 'अस्पष्ट लक्षण'
    return 'Indeterminate'
  }
  const lower = name.toLowerCase().trim()

  for (const [key, val] of Object.entries(DISEASE_TRANSLATIONS)) {
    if (lower.includes(key)) {
      return val[lang]
    }
  }

  // Check reverse matches
  for (const val of Object.values(DISEASE_TRANSLATIONS)) {
    if (val.te === name.trim() || val.hi === name.trim()) {
      return val[lang]
    }
  }

  return name
}

/**
 * Translates an individual sentence or phrase to Telugu or Hindi using agricultural terminology,
 * while strictly preserving Latin scientific names (e.g. Oryza sativa, Pyricularia oryzae).
 */
export function localizeText(text: string, lang: 'en' | 'te' | 'hi'): string {
  if (!text || lang === 'en') return text

  // Preserve scientific names
  const scientificMatches: string[] = []
  const textWithTokens = text.replace(/([A-Z][a-z]+(?:\s+[a-z]+)+)/g, (match) => {
    if (
      match.includes('sativa') ||
      match.includes('oryzae') ||
      match.includes('lycopersicum') ||
      match.includes('solani') ||
      match.includes('capsici') ||
      match.includes('nicotianae') ||
      match.includes('graminicola') ||
      match.includes('sp.') ||
      match.includes('spp.')
    ) {
      scientificMatches.push(match)
      return `__SCI_${scientificMatches.length - 1}__`
    }
    return match
  })

  let result = textWithTokens

  if (lang === 'te') {
    if (result.toLowerCase().includes('parallel-veined') || result.toLowerCase().includes('parallel veins')) {
      result = 'సమాంతర ఈనెలు కలిగిన పొడవైన ఆకులు, గడ్డి జాతి పెరుగుదల లక్షణాలు గమనించబడ్డాయి.'
    } else if (result.toLowerCase().includes('diamond-shaped') || result.toLowerCase().includes('spindle-shaped')) {
      result = 'ఆకులపై కంటి ఆకారంలో లేదా కదురు ఆకారంలో బూడిద/గోధుమ రంగు మచ్చలు గమనించబడ్డాయి.'
    } else if (result.toLowerCase().includes('water-soaked') || result.toLowerCase().includes('blight lesions')) {
      result = 'ఆకుల అంచుల వెంబడి నీటిలో నానినట్లుగా కనిపించే గోధుమ రంగు మాడు మచ్చలు వ్యాపించాయి.'
    } else if (result.toLowerCase().includes('curling') || result.toLowerCase().includes('puckering')) {
      result = 'ఆకులు పైకి మరియు లోపలికి ముడుచుకుపోయి పసుపు రంగులోకి మారాయి.'
    } else if (result.toLowerCase().includes('neem oil')) {
      result = 'లీటరు నీటికి 5 మి.లీ చల్లగా తీసిన వేప నూనెను కలిపి సాయంత్రం వేళ పిచికారీ చేయాలి.'
    } else if (result.toLowerCase().includes('drainage') && result.toLowerCase().includes('aeration')) {
      result = 'పొలంలో నీరు నిల్వ ఉండకుండా సరైన మురుగునీటి పారుదల సౌకర్యం మరియు గాలి వెలుతురు కల్పించాలి.'
    } else if (result.toLowerCase().includes('spacing') || result.toLowerCase().includes('crop rotation')) {
      result = 'మొక్కల మధ్య సరైన దూరం పాటించాలి మరియు తెగులు వ్యాప్తిని నివారించడానికి పంట మార్పిడి చేయాలి.'
    } else if (result.toLowerCase().includes('extension specialist') || result.toLowerCase().includes('kvk')) {
      result = 'లక్షణాలు అధికంగా ఉంటే స్థానిక వ్యవసాయ విస్తరణాధికారి లేదా కృషి విజ్ఞాన కేంద్రం (KVK) నిపుణులను సంప్రదించండి.'
    } else if (result.toLowerCase().includes('healthy') || result.toLowerCase().includes('no visible pathogen')) {
      result = 'ఆకులు పచ్చగా, ఏపుగా మరియు ఎలాంటి తెగులు లేదా మచ్చల ఆనవాళ్లు లేకుండా ఆరోగ్యకరంగా ఉన్నాయి.'
    } else {
      for (const [enWord, teWord] of Object.entries(PHRASE_TRANSLATIONS_TE)) {
        const reg = new RegExp(`\\b${enWord}\\b`, 'gi')
        if (reg.test(result)) {
          result = result.replace(reg, teWord)
        }
      }
    }
  } else if (lang === 'hi') {
    if (result.toLowerCase().includes('parallel-veined') || result.toLowerCase().includes('parallel veins')) {
      result = 'समानांतर नसों वाली लंबी पत्तियां और घास प्रजाति की विकास संरचना देखी गई।'
    } else if (result.toLowerCase().includes('diamond-shaped') || result.toLowerCase().includes('spindle-shaped')) {
      result = 'पत्तियों पर आंख के आकार या तकुआ के आकार के भूरे/धूसर धब्बे देखे गए।'
    } else if (result.toLowerCase().includes('water-soaked') || result.toLowerCase().includes('blight lesions')) {
      result = 'पत्तियों के किनारों पर पानी से भीगे हुए जैसे भूरे झुलसा धब्बे फैल गए हैं।'
    } else if (result.toLowerCase().includes('curling') || result.toLowerCase().includes('puckering')) {
      result = 'पत्तियां ऊपर और अंदर की ओर मुड़कर पीली पड़ गई हैं।'
    } else if (result.toLowerCase().includes('neem oil')) {
      result = 'प्रति लीटर पानी में 5 मिली नीम का तेल मिलाकर शाम के समय छिड़काव करें।'
    } else if (result.toLowerCase().includes('drainage') && result.toLowerCase().includes('aeration')) {
      result = 'खेत में पानी जमा न होने दें और उचित जल निकासी तथा हवा-प्रकाश की व्यवस्था करें।'
    } else if (result.toLowerCase().includes('spacing') || result.toLowerCase().includes('crop rotation')) {
      result = 'पौधों के बीच उचित दूरी बनाए रखें और रोग नियंत्रण के लिए फसल चक्र अपनाएं।'
    } else if (result.toLowerCase().includes('extension specialist') || result.toLowerCase().includes('kvk')) {
      result = 'रोग अधिक होने पर तुरंत स्थानीय कृषि विस्तार अधिकारी या कृषि विज्ञान केंद्र (KVK) से संपर्क करें।'
    } else if (result.toLowerCase().includes('healthy') || result.toLowerCase().includes('no visible pathogen')) {
      result = 'पत्तियां हरी, स्वस्थ और बिना किसी रोग या धब्बों के पूर्णतः सामान्य हैं।'
    } else {
      for (const [enWord, hiWord] of Object.entries(PHRASE_TRANSLATIONS_HI)) {
        const reg = new RegExp(`\\b${enWord}\\b`, 'gi')
        if (reg.test(result)) {
          result = result.replace(reg, hiWord)
        }
      }
    }
  }

  // Restore scientific names
  scientificMatches.forEach((sci, idx) => {
    result = result.replace(`__SCI_${idx}__`, sci)
  })

  return result
}

/**
 * Standardizes crop names to a canonical English key for robust cross-linguistic matching.
 */
export function normalizeCropKey(raw: string): string {
  if (!raw) return ''
  const trimmed = raw.trim().toLowerCase()

  for (const [key, val] of Object.entries(CROP_TRANSLATIONS)) {
    if (trimmed === key || trimmed.includes(key)) return key === 'paddy' ? 'rice' : key === 'corn' ? 'maize' : key === 'peanut' ? 'groundnut' : key
    if (trimmed === val.en.toLowerCase() || val.en.toLowerCase().includes(trimmed) || trimmed.includes(val.en.toLowerCase())) {
      return key === 'paddy' ? 'rice' : key === 'corn' ? 'maize' : key === 'peanut' ? 'groundnut' : key
    }
    if (trimmed === val.te.trim() || trimmed.includes(val.te.trim()) || val.te.trim().includes(trimmed)) {
      return key === 'paddy' ? 'rice' : key === 'corn' ? 'maize' : key === 'peanut' ? 'groundnut' : key
    }
    if (trimmed === val.hi.trim() || trimmed.includes(val.hi.trim()) || val.hi.trim().includes(trimmed)) {
      return key === 'paddy' ? 'rice' : key === 'corn' ? 'maize' : key === 'peanut' ? 'groundnut' : key
    }
  }

  return trimmed.replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '').trim()
}

/**
 * Checks whether two crop names refer to the same botanical crop.
 */
export function isCropMatching(cropA: string, cropB: string): boolean {
  if (!cropA || !cropB) return false
  const keyA = normalizeCropKey(cropA)
  const keyB = normalizeCropKey(cropB)
  if (keyA && keyB && keyA === keyB) return true

  const lowerA = cropA.trim().toLowerCase()
  const lowerB = cropB.trim().toLowerCase()
  return lowerA.includes(lowerB) || lowerB.includes(lowerA)
}

// Soil types localization
export const SOIL_TRANSLATIONS: Record<string, { te: string; hi: string; en: string }> = {
  'Red Soil': { te: 'ఎర్ర నేలలు', hi: 'लाल मिट्टी', en: 'Red Soil' },
  'Black Soil': { te: 'నల్ల రేగడి నేలలు', hi: 'काली मिट्टी', en: 'Black Soil' },
  'Alluvial Soil': { te: 'ఒండ్రు నేలలు', hi: 'जलोढ़ मिट्टी', en: 'Alluvial Soil' },
  'Sandy Soil': { te: 'ఇసుక నేలలు', hi: 'बलुई / रेतीली मिट्टी', en: 'Sandy Soil' },
  'Clay Soil': { te: 'బంకమట్టి నేలలు', hi: 'चिकनी मिट्टी', en: 'Clay Soil' },
  'Loamy Soil': { te: 'సారవంతమైన గోరుమట్టి నేలలు', hi: 'दोमट मिट्टी', en: 'Loamy Soil' },
  'Other': { te: 'ఇతర నేల రకం', hi: 'अन्य मिट्टी', en: 'Other' },
}

export function localizeSoilType(soil: string | undefined | null, lang: 'en' | 'te' | 'hi'): string {
  if (!soil) return lang === 'te' ? 'పేర్కొనబడలేదు' : lang === 'hi' ? 'अनिर्दिष्ट' : 'Unspecified'
  return SOIL_TRANSLATIONS[soil]?.[lang] || soil
}

// Irrigation types localization
export const IRRIGATION_TRANSLATIONS: Record<string, { te: string; hi: string; en: string }> = {
  'Drip Irrigation': { te: 'బిందు సేద్యం (డ్రిప్)', hi: 'ड्रिप सिंचाई (टपक प्रणाली)', en: 'Drip Irrigation' },
  'Sprinkler Irrigation': { te: 'తుంపర సేద్యం (స్ప్రింక్లర్)', hi: 'फव्वारा सिंचाई (स्प्रिंकलर)', en: 'Sprinkler Irrigation' },
  'Canal Irrigation': { te: 'కాలువ నీటిపారుదల', hi: 'नहर सिंचाई', en: 'Canal Irrigation' },
  'Borewell': { te: 'బోరుబావి', hi: 'नलकूप / बोरवेल', en: 'Borewell' },
  'Rainfed': { te: 'వర్షాధారం', hi: 'वर्षा आधारित (बारानी)', en: 'Rainfed' },
  'Other': { te: 'ఇతర నీటి వనరు', hi: 'अन्य सिंचाई', en: 'Other' },
}

export function localizeIrrigationType(irr: string | undefined | null, lang: 'en' | 'te' | 'hi'): string {
  if (!irr) return lang === 'te' ? 'సాధారణం' : lang === 'hi' ? 'सामान्य' : 'Standard'
  return IRRIGATION_TRANSLATIONS[irr]?.[lang] || irr
}

// Growth stages localization
export const GROWTH_STAGE_TRANSLATIONS: Record<string, { te: string; hi: string; en: string }> = {
  'Sowing / Seedling': { te: 'విత్తే దశ / నారు దశ', hi: 'बुवाई / अंकुरण / पौध अवस्था', en: 'Sowing / Seedling' },
  'Vegetative': { te: 'శాకీయ పెరుగుదల దశ', hi: 'वानस्पतिक वृद्धि अवस्था', en: 'Vegetative' },
  'Flowering': { te: 'పూత దశ', hi: 'फूल आने की अवस्था (पुष्पन)', en: 'Flowering' },
  'Fruiting / Grain Formation': { te: 'కాయ / గింజ పాలుపోసుకునే దశ', hi: 'फल / दाना भराव अवस्था', en: 'Fruiting / Grain Formation' },
  'Maturity / Harvesting': { te: 'పక్వత / కోత దశ', hi: 'परिपक्वता / कटाई अवस्था', en: 'Maturity / Harvesting' },
  'Post-Harvest': { te: 'కోత అనంతర దశ', hi: 'कटाई उपरांत अवस्था', en: 'Post-Harvest' },
}

export function localizeGrowthStage(stage: string | undefined | null, lang: 'en' | 'te' | 'hi'): string {
  if (!stage) return lang === 'te' ? 'సాగులో ఉంది' : lang === 'hi' ? 'सक्रिय' : 'Active'
  return GROWTH_STAGE_TRANSLATIONS[stage]?.[lang] || stage
}

// Activity types localization
export const ACTIVITY_TRANSLATIONS: Record<string, { te: string; hi: string; en: string }> = {
  'Irrigation': { te: 'నీటి తడులు', hi: 'सिंचाई', en: 'Irrigation' },
  'Fertilizer application': { te: 'ఎరువుల యాజమాన్యం', hi: 'उर्वरक / खाद प्रयोग', en: 'Fertilizer application' },
  'Pesticide application': { te: 'పురుగు / తెగులు మందుల పిచికారీ', hi: 'कीटनाशक / दवा छिड़काव', en: 'Pesticide application' },
  'Sowing': { te: 'విత్తనం విత్తడం / నాటడం', hi: 'बुवाई / रोपाई', en: 'Sowing' },
  'Weeding': { te: 'కలుపు తీత', hi: 'निराई-गुड़ाई', en: 'Weeding' },
  'Harvesting': { te: 'పంట కోత', hi: 'फसल कटाई', en: 'Harvesting' },
  'Other': { te: 'ఇతర క్షేత్ర పని', hi: 'अन्य कृषि कार्य', en: 'Other' },
}

export function localizeActivityType(act: string | undefined | null, lang: 'en' | 'te' | 'hi'): string {
  if (!act) return ''
  return ACTIVITY_TRANSLATIONS[act]?.[lang] || act
}

// Land unit localization
export function localizeLandUnit(unit: string | undefined | null, lang: 'en' | 'te' | 'hi'): string {
  if (unit === 'Hectares') return lang === 'te' ? 'హెక్టార్లు' : lang === 'hi' ? 'हेक्टेयर' : 'Hectares'
  return lang === 'te' ? 'ఎకరాలు' : lang === 'hi' ? 'एकड़' : 'Acres'
}

// Treatment type localization
export function localizeTreatmentType(type: string | undefined | null, lang: 'en' | 'te' | 'hi'): string {
  if (!type) return ''
  if (type.includes('Organic') || type.includes('Biological') || type.includes('సేంద్రీయ')) {
    return lang === 'te' ? 'సేంద్రీయ / జీవ నియంత్రణ' : lang === 'hi' ? 'जैविक / प्राकृतिक उपचार' : 'Organic / Biological'
  }
  if (type.includes('Chemical') || type.includes('రసాయన')) {
    return lang === 'te' ? 'రసాయన యాజమాన్యం' : lang === 'hi' ? 'रासायनिक प्रबंधन' : 'Chemical Guidance'
  }
  if (type.includes('Cultural') || type.includes('సాగు')) {
    return lang === 'te' ? 'సాగు పద్ధతులు / నివారణ' : lang === 'hi' ? 'सस्य क्रियाएं / निवारक उपाय' : 'Cultural / Agronomic'
  }
  return lang === 'te' ? 'ఇతర సిఫార్సు' : lang === 'hi' ? 'अन्य सिफारिश' : 'Other Guidance'
}

