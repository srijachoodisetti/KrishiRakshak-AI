import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper to decode any HTML entities (e.g. &#x50; -> P, &amp; -> &, etc.)
function decodeHTMLEntities(text: string): string {
  if (typeof text !== 'string') return ''
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function cleanStringArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) return []
  return arr
    .map((item) => decodeHTMLEntities(String(item).trim()))
    .filter(Boolean)
}

function buildDiagnosisPrompt(language: string): string {
  if (language === 'te') {
    return `మీరు అనుభవజ్ఞులైన వ్యవసాయ నిపుణులు మరియు పంట తెగుళ్ల విశ్లేషణ సహాయకులు.

అప్‌లోడ్ చేసిన మొక్క/ఆకు చిత్రాన్ని జాగ్రత్తగా పరిశీలించండి.
ప్రతి వివరణను, వాక్యాన్ని సహజమైన తెలుగులో (ఆంధ్రప్రదేశ్ మరియు తెలంగాణ రైతులకు అర్థమయ్యే వ్యవసాయ పరిభాషలో) రూపొందించండి.

టాస్క్ A - పంట గుర్తింపు:
1. ఆకు ఆకారం, ఈనెల అమరిక, మొక్క పెరుగుదల తీరును పరిశీలించి పంటను గుర్తించండి.
2. వరి (Rice - Oryza sativa), మొక్కజొన్న (Maize), చెరకు, పత్తి, మిరప, టమాటా, వేరుశనగ మొదలైన పంటలను నిర్ధారించండి.
3. సాధారణ తెలుగు పంట పేర్లను ఉపయోగించండి: "వరి", "టమాటా", "మిరప", "పత్తి", "మొక్కజొన్న", "వేరుశనగ", "చెరకు", "పసుపు", మొదలైనవి.
4. మొక్కను కచ్చితంగా గుర్తించలేకపోతే "గుర్తించబడని పంట" అని పేర్కొనండి.

టాస్క్ B - వ్యాధి & లక్షణాల పరిశీలన:
1. ఆకులు లేదా కాండంపై కనిపించే మచ్చలు, రంగు మార్పు లేదా తెగులు లక్షణాలను విశ్లేషించండి.
2. స్పష్టమైన ఆధారాలు ఉన్న సమస్యలను మాత్రమే పేర్కొనండి. అస్పష్టమైన చిత్రాలకు తెగుళ్లను ఊహించవద్దు.
3. మొక్క ఆరోగ్యంగా ఉంటే, disease_name ను "ఆరోగ్యకరమైన పంట / తెగులు లక్షణాలు లేవు", severity ను "Low" అని పేర్కొనండి.
4. తెలుగు వ్యాధి పేర్లు: ఉదా. "వరి అగ్గి తెగులు" (Rice Blast), "బాక్టీరియా ఆకు ఎండు తెగులు", "ఆకు ముడత తెగులు", "బూడిద తెగులు", మొదలైనవి.

టాస్క్ C - AI స్మార్ట్ పంట పరిష్కార సలహాదారు (AI Smart Crop Solution Advisor):
1. likely_cause: గుర్తించిన సమస్యకు గల కారణం (ఉదా. గాలిలో అధిక తేమ, నత్రజని అధిక వాడకం, నీటి నిల్వ లేదా శిలీంద్ర బీజాలు).
2. immediate_actions: రైతు వెంటనే చేయవలసిన ప్రాథమిక చర్యలు (ఉదా. వ్యాధిగ్రస్తు ఆకులను తొలగించడం, నీటి తడులు ఆపడం).
3. organic_treatments: వేప నూనె స్ప్రే, ట్రైకోడెర్మా, జీవామృతం, పొల పరిశుభ్రత వంటి సేంద్రీయ & బయో పద్ధతులు.
4. chemical_treatments: రిజిస్టర్డ్ ఆధారాలున్న రసాయన మందుల తరగతులు లేదా క్రియాశీల పదార్థాలు (Active Ingredients). ముఖ్య గమనిక: రసాయన మందుల మోతాదులు (dosages), పిచికారీ వ్యవధులు ఎట్టి పరిస్థితుల్లోనూ ఊహించవద్దు; ఎల్లప్పుడూ లేబుల్ మార్గదర్శకాలు మరియు స్థానిక అధికారి సలహాను అనుసరించాలని తెలపండి. ఒకవేళ వ్యాధి నిర్ధారణ అస్పష్టంగా ఉంటే chemical_treatments ను ఖాళీగా ఉంచండి.
5. prevention_steps: సరైన మొక్కల దూరం, పంట మార్పిడి, నీటి పారుదల మరియు పరిశుభ్రత.
6. recovery_monitoring: కోలుకునే పర్యవేక్షణ ప్రణాళిక:
   - follow_up_3d: 3 రోజుల తర్వాత పరిశీలించవలసిన అంశాలు.
   - follow_up_7d: 7 రోజుల తర్వాత పరిశీలించవలసిన పురోగతి అంశాలు.
7. recommendations: రైతు తీసుకోవాల్సిన తక్షణ చర్యలు, విస్తరణాధికారి లేదా KVK నిపుణులను ఎప్పుడు సంప్రదించాలి.

తీవ్రత (Severity):
- "Low" (తక్కువ / స్వల్పం)
- "Medium" (మధ్యస్థం)
- "High" (ఎక్కువ / తీవ్రం)

ముఖ్యమైన నిబంధనలు:
1. కేవలం చెల్లుబాటు అయ్యే ముడి JSON ఆబ్జెక్ట్‌ను మాత్రమే తిరిగి ఇవ్వండి (మార్క్‌డౌన్ కోడ్ బ్లాక్‌లు లేకుండా).
2. html entities (ఉదా. &#x50;, &amp;) ఎప్పుడూ ఉపయోగించవద్దు. సాధారణ UTF-8 అక్షరాలను మాత్రమే ఉపయోగించండి.
3. శాస్త్రీయ లాటిన్ పేర్లను (ఉదా. Oryza sativa, Pyricularia oryzae) లాటిన్ ఆంగ్లంలోనే ఉంచండి.
4. మిగిలిన అన్ని వివరణలు, పరిశీలనలు, లక్షణాలు, సూచనలు తప్పనిసరిగా స్పష్టమైన, పూర్తి తెలుగులో ఉండాలి.

JSON నమూనా:
{
  "crop_name": "వరి",
  "scientific_name": "Oryza sativa",
  "crop_identification_confidence": 0.90,
  "disease_name": "వరి అగ్గి తెగులు",
  "disease_confidence": 0.85,
  "severity": "Medium",
  "likely_cause": "గాలిలో 90% కంటే ఎక్కువ తేమ, రాత్రి వేళల్లో చల్లని ఉష్ణోగ్రతలు మరియు అధిక నత్రజని వాడకం వల్ల శిలీంద్ర బీజాలు వేగంగా వృద్ధి చెందాయి.",
  "immediate_actions": [
    "పొలంలో నిలిచి ఉన్న అదనపు నీటిని బయటకు తీసివేయాలి",
    "నత్రజని ఎరువుల వాడకాన్ని తాత్కాలికంగా నిలిపివేయాలి",
    "తీవ్రంగా దెబ్బతిన్న దిగువ ఆకులను తీసివేసి నాశనం చేయాలి"
  ],
  "visible_symptoms": ["ఆకులపై కంటి ఆకారంలో ఇరుకైన గోధుమ రంగు మచ్చలు ఏర్పడ్డాయి"],
  "observations": ["సమాంతర ఈనెలు కలిగిన పొడవైన వరి ఆకులు"],
  "organic_treatments": ["లీటరు నీటికి 5 మి.లీ వేప నూనె కలిపి సాయంత్రం వేళ పిచికారీ చేయాలి"],
  "chemical_treatments": ["ట్రైసైక్లాజోల్ (Tricyclazole) లేదా ఐసోప్రోథియోలేన్ వంటి గుర్తింపు పొందిన శిలీంద్ర సంహారిణులను స్థానిక నిపుణుల సలహాతో మాత్రమే వాడాలి"],
  "prevention_steps": ["నత్రజని ఎరువులను సిఫార్సు చేసిన మోతాదులోనే వాడాలి", "మురుగునీటి పారుదల సౌకర్యం కల్పించాలి"],
  "recovery_monitoring": {
    "follow_up_3d": "కొత్తగా ఏర్పడే మచ్చల పరిమాణాన్ని మరియు ఆకుల రంగును పరిశీలించండి; మచ్చల వ్యాప్తి ఆగిందో లేదో తనిఖీ చేయండి.",
    "follow_up_7d": "కొత్తగా చిగురించే పైరు ఆకుల ఆరోగ్యాన్ని మరియు పిలకల పెరుగుదలను సమీక్షించండి."
  },
  "recommendations": ["పొలంలో 15% కంటే ఎక్కువ వ్యాప్తి ఉంటే వెంటనే స్థానిక వ్యవసాయ అధికారిని లేదా KVK ను సంప్రదించండి"],
  "is_uncertain": false,
  "disclaimer": "ఇది AI ప్రాథమిక అంచనా మాత్రమే. రసాయన మందులు పిచికారీ చేసే ముందు తప్పనిసరిగా ఉత్పత్తి లేబుల్ మరియు స్థానిక వ్యవసాయ విస్తరణాధికారి సలహాలను పాటించండి."
}`
  }

  if (language === 'hi') {
    return `आप एक अनुभवी कृषि वैज्ञानिक और फसल रोग निदान विशेषज्ञ हैं।

अपलोड की गई पौधे/पत्ती की तस्वीर का ध्यानपूर्वक निरीक्षण करें।
प्रत्येक व्याख्या, लक्षण और सलाह को स्पष्ट, प्राकृतिक और सरल हिंदी में प्रस्तुत करें (ताकि किसान इसे आसानी से समझ सकें)।

टास्क A - फसल की पहचान:
1. पत्ती के आकार, शिरा विन्यास (venation) और पौधे की संरचना को देखकर फसल पहचानें।
2. धान (Rice - Oryza sativa), मक्का (Maize), गन्ना, कपास, मिर्च, टमाटर, मूंगफली, गेहूं आदि फसलों की पुष्टि करें।
3. प्रचलित हिंदी फसल नामों का उपयोग करें: "धान", "टमाटर", "मिर्च", "कपास", "मक्का", "मूंगफली", "गन्ना", "हल्दी", "आलू" आदि।
4. यदि स्पष्ट पहचान न हो पाए, तो crop_name में "अज्ञात फसल" लिखें।

टास्क B - रोग एवं लक्षण विश्लेषण:
1. पत्तियों या तने पर धब्बे, पीलापन, झुलसा या सड़न के लक्षणों का विश्लेषण करें।
2. केवल दृश्य साक्ष्य पर आधारित स्पष्ट रोग का उल्लेख करें।
3. यदि पौधा पूरी तरह स्वस्थ है, तो disease_name में "स्वस्थ फसल / कोई रोग लक्षण नहीं" और severity में "Low" लिखें।
4. मानक हिंदी रोग नाम: उदा. "धान का झुलसा रोग (ब्लास्ट)", "जीवाणु पत्ती झुलसा", "पर्ण कुंचन रोग (लीफ कर्ल)", "अगेती झुलसा", "चूर्णी फफूंद (पाउडरी मिल्ड्यू)" आदि।

टास्क C - AI स्मार्ट फसल समाधान सलाहकार (AI Smart Crop Solution Advisor):
1. likely_cause: रोग या समस्या का मुख्य कारण (उदा. हवा में अत्यधिक नमी, अधिक नाइट्रोजन खाद, जलजमाव, फफूंद बीजाणु)।
2. immediate_actions: किसान द्वारा तुरंत उठाए जाने वाले कदम (उदा. संक्रमित पत्तियों को हटाना, सिंचाई रोकना)।
3. organic_treatments: नीम तेल, ट्राइकोडर्मा, जीवामृत, खेत की सफाई जैसे जैविक और प्राकृतिक उपाय।
4. chemical_treatments: पंजीकृत और प्रमाणित रासायनिक सक्रिय घटक (Active Ingredients)। अति महत्वपूर्ण: किसी भी कीटनाशक/फफूंदनाशक की खुराक (dosage) या छिड़काव अंतराल का मनगढ़ंत अनुमान न लगाएं। हमेशा उत्पाद लेबल और स्थानीय कृषि अधिकारी की सलाह का पालन करने का निर्देश दें। यदि रोग अनिश्चित हो तो इसे खाली छोड़ दें।
5. prevention_steps: पौधों के बीच उचित दूरी, फसल चक्र, जल निकासी और खेत की स्वच्छता।
6. recovery_monitoring: सुधार की निगरानी योजना:
   - follow_up_3d: 3 दिन बाद किन लक्षणों और धब्बों की जांच करनी है।
   - follow_up_7d: 7 दिन बाद नए कल्ले और नई पत्तियों की स्थिति की जांच।
7. recommendations: किसान के लिए तुरंत जरूरी कदम और कृषि विज्ञान केंद्र (KVK) या कृषि विशेषज्ञ से कब संपर्क करें।

गंभीरता (Severity):
- "Low" (कम / सामान्य)
- "Medium" (मध्यम)
- "High" (उच्च / गंभीर)

महत्वपूर्ण नियम:
1. केवल वैध रॉ JSON ऑब्जेक्ट वापस करें (बिना किसी मार्कडाउन कोड ब्लॉक के)।
2. html entities (उदा. &#x50;, &amp;) कभी न लिखें। स्वच्छ देवनागरी हिंदी अक्षरों का प्रयोग करें।
3. वैज्ञानिक लैटिन नामों को (उदा. Oryza sativa, Pyricularia oryzae) लैटिन अंग्रेजी में ही रखें।
4. अन्य सभी विवरण, टिप्पणियां, लक्षण और उपचार स्पष्ट हिंदी में होने चाहिए।

JSON प्रारूप:
{
  "crop_name": "धान",
  "scientific_name": "Oryza sativa",
  "crop_identification_confidence": 0.90,
  "disease_name": "धान का झुलसा रोग (ब्लास्ट)",
  "disease_confidence": 0.85,
  "severity": "Medium",
  "likely_cause": "हवा में 90% से अधिक आर्द्रता और अत्यधिक यूरिया के प्रयोग से फफूंद का संक्रमण तेजी से फैला।",
  "immediate_actions": [
    "खेत में जमा अतिरिक्त पानी तुरंत बाहर निकालें",
    "यूरिया (नाइट्रोजन) खाद का प्रयोग तुरंत रोक दें",
    "गंभीर रूप से प्रभावित निचली पत्तियों को काटकर नष्ट करें"
  ],
  "visible_symptoms": ["पत्तियों पर आंख के आकार के भूरे धब्बे बने हुए हैं"],
  "observations": ["समानांतर शिराओं वाली धान की लंबी पत्तियां"],
  "organic_treatments": ["प्रति लीटर पानी में 5 मिली नीम तेल मिलाकर शाम को छिड़कें"],
  "chemical_treatments": ["ट्राईसाइक्लाजोल (Tricyclazole) या आइसोप्रोथियोलेन फफूंदनाशक का प्रयोग स्थानीय कृषि अधिकारी के परामर्श से ही करें"],
  "prevention_steps": ["संतुलित उर्वरकों का प्रयोग करें", "उचित जल निकासी की व्यवस्था रखें"],
  "recovery_monitoring": {
    "follow_up_3d": "धब्बों के फैलाव की जांच करें कि क्या धब्बे बढ़ना बंद हो गए हैं।",
    "follow_up_7d": "नई निकलने वाली पत्तियों के स्वास्थ्य और पौधे के विकास का निरीक्षण करें।"
  },
  "recommendations": ["यदि संक्रमण 15% से अधिक क्षेत्र में हो तो तुरंत नजदीकी कृषि विज्ञान केंद्र (KVK) से संपर्क करें"],
  "is_uncertain": false,
  "disclaimer": "यह AI प्रारंभिक आकलन है। किसी भी रासायनिक छिड़काव से पहले उत्पाद लेबल और कृषि विस्तार अधिकारी की सलाह अवश्य लें।"
}`
  }

  // English Prompt
  return `You are an expert agricultural plant identification and crop disease analysis assistant.

Carefully inspect the uploaded plant or leaf image.

Task A - Crop Identification:
1. Examine visible botanical characteristics: leaf shape, leaf arrangement, venation, and plant structure.
2. Differentiate graminoids (Rice/Paddy - Oryza sativa, Maize, Sugarcane) with parallel veins and ligules from broadleaf crops (Cotton, Groundnut, Tomato, Chilli).
3. If confident, provide common name (e.g., Rice, Tomato, Cotton, Chilli, Maize, Groundnut) and Latin scientific name.
4. If image quality or botanical evidence is insufficient, identify as "Unknown Crop" or "Uncertain".

Task B - Pathology & Symptoms Analysis:
1. Inspect foliage, stems, or fruits for visible lesions, chlorosis, necrosis, or wilting.
2. Report diseases reasonably supported by visible evidence. Never invent symptoms for blurry images.
3. If the plant looks vigorous and lesion-free, set disease_name to "Healthy Crop / No Visible Pathogen" and severity to "Low".

Task C - AI Smart Crop Solution Advisor:
1. likely_cause: Scientific explanation of contributing factors (humidity, pathogen spore load, excess nitrogen, poor drainage).
2. immediate_actions: Concrete first-response actions (sanitizing tools, draining stagnant water, isolating affected plots).
3. organic_treatments: Validated biological and organic control measures (neem oil, Trichoderma, biocontrol, compost tea).
4. chemical_treatments: Mention active ingredient classes only when supported by credible extension guidance (e.g. Azoxystrobin, Tricyclazole, Copper oxychloride). CRITICAL: NEVER invent chemical dosages, application frequencies, or tank mixes. Explicitly state that product labels and local extension officer approval must be followed. If diagnosis is uncertain, leave chemical_treatments empty.
5. prevention_steps: Proactive cultural, spatial, and varietal prevention practices.
6. recovery_monitoring: Structured follow-up plan:
   - follow_up_3d: Specific symptoms and lesion margins to re-inspect 3 days post-treatment.
   - follow_up_7d: Canopy recovery and new shoot evaluation after 7 days.
7. recommendations: Practical immediate steps and when to consult local extension officers or Krishi Vigyan Kendra (KVK).

Assess Severity:
- "Low": Healthy plant or minor isolated cosmetic spotting without yield threat.
- "Medium": Noticeable active lesions requiring timely management.
- "High": Rapid necrotic blight, systemic wilting, collar rot, or extensive spread requiring urgent attention.

Rules:
1. Return ONLY a valid, raw JSON object without markdown code blocks.
2. Never output HTML entities (e.g. no &#x50;, &amp;). Use clean UTF-8 text directly.
3. Scientific names must be in Latin (e.g. Oryza sativa, Pyricularia oryzae).
4. Distinguish visible symptoms from confirmed disease.

JSON Structure:
{
  "crop_name": "Identified Crop Name",
  "scientific_name": "Botanical Latin Name or null",
  "crop_identification_confidence": 0.90,
  "disease_name": "Specific Disease Name or Healthy Crop / No Visible Pathogen",
  "disease_confidence": 0.85,
  "severity": "Low",
  "likely_cause": "High relative humidity combined with dense canopy and overcast weather promoted spore germination.",
  "immediate_actions": [
    "Temporarily suspend overhead irrigation to reduce canopy moisture",
    "Remove severely necrotic lower leaves and safely dispose off-field"
  ],
  "visible_symptoms": ["List specific visible symptoms observed on the leaf or stem"],
  "observations": ["Botanical features and visual indicators that led to this identification"],
  "organic_treatments": ["List organic or biocontrol management steps"],
  "chemical_treatments": ["List cautious chemical active ingredients if appropriate, without unsupported dosages"],
  "prevention_steps": ["Preventive cultural and field hygiene practices"],
  "recovery_monitoring": {
    "follow_up_3d": "Examine lesion perimeters to confirm margins are no longer expanding.",
    "follow_up_7d": "Check newly emerged upper leaves for clean growth free of chlorosis."
  },
  "recommendations": ["Safe, agronomic management and inspection steps; advise consulting local agronomist"],
  "is_uncertain": false,
  "disclaimer": "AI-assisted preliminary assessment. Confirm with a local agricultural extension officer or certified agronomist before taking chemical intervention."
}`
}

function buildStructuredTranslationPrompt(sourceDiagnosis: Record<string, unknown>, targetLang: string): string {
  const langName = targetLang === 'te' ? 'Telugu' : targetLang === 'hi' ? 'Hindi' : 'English'

  return `You are a professional agricultural linguist and plant pathologist translating an existing structured crop diagnosis into ${langName}.

CRITICAL TRANSLATION RULES:
1. Accurately translate all crop names, disease names, symptoms, causes, immediate actions, treatments, prevention steps, and recommendations into fluent, natural ${langName}.
2. PRESERVE scientific Latin binomial names (e.g. Oryza sativa, Pyricularia oryzae, Solanum lycopersicum) exactly as Latin English.
3. PRESERVE chemical active ingredient names (e.g. Mancozeb, Tricyclazole, Azoxystrobin, Chlorantraniliprole) and numerical measurements untouched or alongside the translation.
4. Keep the exact same JSON schema and keys. Do NOT change key names.
5. Return ONLY a valid, raw JSON object without markdown fences.

Original structured diagnosis JSON:
${JSON.stringify(sourceDiagnosis, null, 2)}
`
}

// Active primary model with fast, reliable vision capabilities:
const PRIMARY_MODEL = 'gemini-2.5-flash'
const FALLBACK_MODELS = ['gemini-2.5-flash-lite', 'gemini-3.5-flash-lite']

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    const apiKeyHeader = req.headers.get('apikey')

    // 1. Verify User Authentication via Supabase
    let isAuthorized = false

    if (authHeader) {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
      )
      const token = authHeader.replace('Bearer ', '').trim()
      const { data: { user } } = await supabaseClient.auth.getUser(token)
      if (user) {
        isAuthorized = true
      }
    }

    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')
    if (!isAuthorized && anonKey) {
      if (apiKeyHeader === anonKey || authHeader?.replace('Bearer ', '').trim() === anonKey) {
        isAuthorized = true
      }
    }

    if (!isAuthorized) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Valid Supabase session or API key is required.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 2. Validate Gemini Secret Key
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({
          error: 'GEMINI_API_KEY is not configured in Supabase Edge Function secrets.'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 3. Parse Request Payload
    const body = await req.json().catch(() => ({}))

    // DIAGNOSTIC ACTION: List models
    if (body.action === 'list_models') {
      const listEndpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiApiKey}`
      const listRes = await fetch(listEndpoint)
      const listData = await listRes.json()
      return new Response(
        JSON.stringify({
          status: listRes.status,
          endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
          models: listData.models ? listData.models.map((m: Record<string, unknown>) => ({
            name: m.name,
            displayName: m.displayName,
            supportedGenerationMethods: m.supportedGenerationMethods
          })) : listData
        }),
        { status: listRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ACTION: Translate structured diagnosis JSON using existing Gemini integration
    if (body.action === 'translate_diagnosis') {
      const { sourceDiagnosis, targetLanguage = 'te' } = body
      if (!sourceDiagnosis || typeof sourceDiagnosis !== 'object') {
        return new Response(
          JSON.stringify({ error: 'Missing or invalid sourceDiagnosis in request body.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const validLangs = ['en', 'te', 'hi']
      const safeTargetLang = validLangs.includes(targetLanguage) ? targetLanguage : 'te'
      const translationPrompt = buildStructuredTranslationPrompt(sourceDiagnosis, safeTargetLang)

      const transPayload = {
        contents: [
          {
            parts: [{ text: translationPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 20,
          topP: 0.95,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json'
        }
      }

      const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS]
      let translatedText = ''
      let usedModel = ''

      for (const modelName of modelsToTry) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 18000)
          const gRes = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transPayload),
            signal: controller.signal
          })
          clearTimeout(timeoutId)

          if (gRes.ok) {
            const gData = await gRes.json()
            const text = gData?.candidates?.[0]?.content?.parts?.[0]?.text
            if (text) {
              translatedText = text
              usedModel = modelName
              break
            }
          }
        } catch {
          // fallback to next model
        }
      }

      if (!translatedText) {
        return new Response(
          JSON.stringify({ error: 'Translation service could not generate translation.' }),
          { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      let cleaned = translatedText.trim()
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim()
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim()
      }

      let parsedTrans: Record<string, unknown>
      try {
        parsedTrans = JSON.parse(cleaned)
      } catch {
        const match = cleaned.match(/\{[\s\S]*\}/)
        if (match) {
          parsedTrans = JSON.parse(match[0])
        } else {
          return new Response(
            JSON.stringify({ error: 'Failed to parse translated structure.' }),
            { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
      }

      // Sanitize fields
      parsedTrans.crop_name = decodeHTMLEntities(String(parsedTrans.crop_name || ''))
      parsedTrans.disease_name = decodeHTMLEntities(String(parsedTrans.disease_name || ''))
      parsedTrans.likely_cause = decodeHTMLEntities(String(parsedTrans.likely_cause || ''))
      parsedTrans.disclaimer = decodeHTMLEntities(String(parsedTrans.disclaimer || ''))
      parsedTrans.immediate_actions = cleanStringArray(parsedTrans.immediate_actions)
      parsedTrans.visible_symptoms = cleanStringArray(parsedTrans.visible_symptoms)
      parsedTrans.observations = cleanStringArray(parsedTrans.observations)
      parsedTrans.organic_treatments = cleanStringArray(parsedTrans.organic_treatments)
      parsedTrans.chemical_treatments = cleanStringArray(parsedTrans.chemical_treatments)
      parsedTrans.prevention_steps = cleanStringArray(parsedTrans.prevention_steps)
      parsedTrans.recommendations = cleanStringArray(parsedTrans.recommendations)

      if (parsedTrans.recovery_monitoring && typeof parsedTrans.recovery_monitoring === 'object') {
        const rec = parsedTrans.recovery_monitoring as Record<string, unknown>
        parsedTrans.recovery_monitoring = {
          follow_up_3d: decodeHTMLEntities(String(rec.follow_up_3d || '')),
          follow_up_7d: decodeHTMLEntities(String(rec.follow_up_7d || ''))
        }
      }

      parsedTrans._meta = {
        model_used: usedModel,
        targetLanguage: safeTargetLang,
        translated_at: new Date().toISOString()
      }

      return new Response(
        JSON.stringify(parsedTrans),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Default: Crop Image Diagnosis
    const { imageBase64, mimeType, language = 'en' } = body

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid imageBase64 in request body.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
    const safeMimeType = validMimes.includes(mimeType) ? mimeType : 'image/jpeg'

    const sizeInBytes = (imageBase64.length * 3) / 4
    if (sizeInBytes > 10 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: 'Image exceeds the maximum 10MB file limit.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const targetLanguage = language === 'te' ? 'te' : language === 'hi' ? 'hi' : 'en'
    const promptText = buildDiagnosisPrompt(targetLanguage)

    const geminiPayload = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: safeMimeType,
                data: imageBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.15,
        topK: 24,
        topP: 0.95,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json'
      }
    }

    // Try Primary Model first, with Fallback models only if primary returns 404, 503, or 429
    const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS]
    let selectedModel = ''
    let candidateText = ''
    let usedEndpoint = ''
    const diagnosticErrors: Array<{ model: string; status: number; message: string }> = []

    for (const modelName of modelsToTry) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`
      const safeEndpointPath = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 20000) // 20s timeout per attempt

        const geminiRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(geminiPayload),
          signal: controller.signal
        })
        clearTimeout(timeoutId)

        if (!geminiRes.ok) {
          const errBody = await geminiRes.text()
          let parsedErr: { error?: { message?: string; code?: number; status?: string } } | null = null
          try {
            parsedErr = JSON.parse(errBody)
          } catch {
            // raw string
          }

          diagnosticErrors.push({
            model: modelName,
            status: geminiRes.status,
            message: parsedErr?.error?.message || errBody.slice(0, 300)
          })

          // Only fallback on 404 (model not found), 503 (model overloaded), 429 (rate-limited)
          if (geminiRes.status === 404 || geminiRes.status === 503 || geminiRes.status === 429) {
            continue
          } else {
            return new Response(
              JSON.stringify({
                error: `Gemini API call failed (${geminiRes.status}): ${parsedErr?.error?.message || geminiRes.statusText}`,
                gemini_status: geminiRes.status,
                model_used: modelName,
                details: parsedErr?.error?.message || errBody
              }),
              { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }
        }

        const geminiData = await geminiRes.json()
        const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text

        if (text) {
          selectedModel = modelName
          candidateText = text
          usedEndpoint = safeEndpointPath
          break
        }
      } catch (fetchErr: unknown) {
        diagnosticErrors.push({
          model: modelName,
          status: 500,
          message: fetchErr instanceof Error ? fetchErr.message : String(fetchErr)
        })
      }
    }

    if (!candidateText) {
      return new Response(
        JSON.stringify({
          error: 'Diagnosis service could not process image. Please try again with a clear photo.',
          attempted_diagnostics: diagnosticErrors
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Clean & Parse JSON
    let cleaned = candidateText.trim()
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim()
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim()
    }

    let parsedResult: Record<string, unknown>
    try {
      parsedResult = JSON.parse(cleaned)
    } catch {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0])
      } else {
        return new Response(
          JSON.stringify({
            error: 'Failed to parse model response into structured JSON.',
            model_used: selectedModel,
            endpoint_path: usedEndpoint
          }),
          { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Sanitize any HTML entities that might have been emitted
    parsedResult.crop_name = decodeHTMLEntities(String(parsedResult.crop_name || ''))
    parsedResult.disease_name = decodeHTMLEntities(String(parsedResult.disease_name || ''))
    parsedResult.likely_cause = decodeHTMLEntities(String(parsedResult.likely_cause || ''))
    parsedResult.disclaimer = decodeHTMLEntities(String(parsedResult.disclaimer || ''))
    parsedResult.immediate_actions = cleanStringArray(parsedResult.immediate_actions)
    parsedResult.visible_symptoms = cleanStringArray(parsedResult.visible_symptoms)
    parsedResult.observations = cleanStringArray(parsedResult.observations)
    parsedResult.organic_treatments = cleanStringArray(parsedResult.organic_treatments)
    parsedResult.chemical_treatments = cleanStringArray(parsedResult.chemical_treatments)
    parsedResult.prevention_steps = cleanStringArray(parsedResult.prevention_steps)
    parsedResult.recommendations = cleanStringArray(parsedResult.recommendations)

    if (parsedResult.recovery_monitoring && typeof parsedResult.recovery_monitoring === 'object') {
      const rec = parsedResult.recovery_monitoring as Record<string, unknown>
      parsedResult.recovery_monitoring = {
        follow_up_3d: decodeHTMLEntities(String(rec.follow_up_3d || '')),
        follow_up_7d: decodeHTMLEntities(String(rec.follow_up_7d || ''))
      }
    }

    // Include diagnostic metadata
    parsedResult._meta = {
      model_used: selectedModel,
      language: targetLanguage,
      analyzed_at: new Date().toISOString()
    }

    return new Response(
      JSON.stringify(parsedResult),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error'
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
