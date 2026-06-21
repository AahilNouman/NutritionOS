/* ============================================================
   NutritionOS — script.js
   Handles: landing page, calculator wizard, calculations,
   theming, language switcher, modals.
   ============================================================ */

'use strict';

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const I18N = {
  en: {
    navFeatures: "Features", navHow: "How It Works", navScience: "Science", navStart: "Start Calculating →", navBack: "Back to home",
    heroBadge: "Evidence-Based Nutrition Science", heroSub: "Calculate calories, macros, hydration needs, maintenance calories, weight loss targets, muscle gain goals, and nutrition plans using evidence-based nutrition science.",
    heroBtnCalc: "Start Calculation", heroBtnHow: "See How It Works",
    pCard1Lbl: "Daily Calories", pCard1Unit: "kcal / day", pCard2Lbl: "Protein", pCard3Lbl: "Hydration", pCard3Unit: "per day",
    stat1: "Scientific Formulas", stat2: "Languages Supported", stat3: "Week Projection", stat4: "Free, No Signup",
    featTag: "What You Get", featTitle: "Everything your nutrition plan needs", featSub: "Not a rough estimate — a science-grade breakdown built for your exact body and goals.",
    f1Title: "TDEE + BMR Calculation", f1Desc: "Mifflin-St Jeor formula with FAO/WHO/UNU activity multipliers gives the most accurate calorie target for your lifestyle.",
    f2Title: "Macro Breakdown", f2Desc: "Protein, carbs, and fat targets calculated using ISSN and ACSM guidelines — scaled precisely to your body weight and goal.",
    f3Title: "Hydration Plan", f3Desc: "EFSA-backed daily water targets adjusted for your body weight and activity level — not a one-size-fits-all 2L.",
    f4Title: "12-Week Predictor", f4Desc: "See your body weight trajectory plotted week by week based on your calorie deficit or surplus rate — realistic and science-backed.",
    f5Title: "Budget Meal Planner", f5Desc: "Practical Indian food sources and sample meal plans from ₹100 to ₹500 per day, making nutrition affordable for everyone.",
    f6Title: "Micronutrient RDA", f6Desc: "ICMR-NIN 2020 recommended daily allowances for Vitamin D, Iron, Calcium, Zinc, B12, Potassium and more.",
    howTag: "The Process", howTitle: "Three steps to your nutrition plan", howSub: "No guesswork. No fitness trackers. Just your body stats and your goal.",
    h1Title: "Enter Your Stats", h1Desc: "Age, weight, height, and biological sex — used only to calculate your Basal Metabolic Rate with the gold-standard Mifflin-St Jeor equation.",
    h2Title: "Set Activity & Goal", h2Desc: "Select your typical weekly activity level, then choose your goal — from aggressive fat loss to maximum muscle growth.",
    h3Title: "Get Your Plan", h3Desc: "Instantly receive your calorie target, macro split, hydration goal, food sources, budget planner, and 12-week weight projection.",
    sciTag: "Our Sources", sciTitle: "Backed by peer-reviewed research", sciSub: "Every formula, multiplier and recommendation in NutritionOS is sourced from published nutrition science. We don't make up numbers.", sciBtn: "Try It Now",
    sc1: "Gold-standard BMR formula, validated across populations", sc2: "Physical Activity Level multipliers for TDEE calculation", sc3: "Evidence-based macronutrient recommendations for athletes", sc4: "European standards for daily water intake per kg bodyweight", sc5: "Indian Council of Medical Research micronutrient guidelines", sc6: "Meta-analysis on dietary protein and muscle hypertrophy",
    ctaBadge: "Free Forever — No Account Required", ctaTitle: "Ready to know your numbers?", ctaSub: "Join thousands of people who have calculated their nutrition plan with NutritionOS.", ctaBtn: "Start My Plan →",
    discTitle: "Scientific Disclaimer", discBody: "NutritionOS provides educational estimates based on established nutrition and exercise science. Calculations are derived from validated research, including the Mifflin-St Jeor equation and evidence-based nutrition guidelines. Individual requirements vary based on genetics, health status, activity levels, and other factors. Always consult a qualified healthcare professional before making significant dietary changes.",
    ftDesc: "Science-based nutrition for everyone. Free, multilingual, and no signup required.", ftCol1: "Product", ftCalc: "Calculator", ftCol2: "Science", ftSources: "Our Sources", ftFormulas: "Formulas Used", ftResearch: "Research", ftCol3: "Legal", ftPrivacy: "Privacy Policy", ftTerms: "Terms of Use", ftMedical: "Medical Disclaimer", ftCopy: "© 2026 NutritionOS", ftBuilt: "Powered by evidence-based nutrition science.",
    modPrivTitle: "Privacy Policy", modPrivH1: "1. Data Collection", modPrivP1: "NutritionOS operates entirely on the client side (in your browser). We do not collect, store, or transmit your personal body stats, age, weight, or calculated results to any servers. All calculations happen locally on your device.", modPrivH2: "2. Cookies and Storage", modPrivP2: "We use local storage strictly to save your preferred theme (dark/light) and language settings. No tracking cookies or third-party analytics are used.", modPrivH3: "3. Third-Party Links", modPrivP3: "Our website may contain links to scientific research or third-party resources. We are not responsible for the privacy practices of external sites.",
    modTermsTitle: "Terms of Use", modTermsH1: "1. Acceptance of Terms", modTermsP1: "By accessing and using NutritionOS, you accept and agree to be bound by the terms and provisions of this agreement.", modTermsH2: "2. Educational Purposes Only", modTermsP2: "The tools and information provided by NutritionOS are strictly for educational and informational purposes. They are not intended as a substitute for professional medical advice, diagnosis, or treatment.", modTermsH3: "3. Accuracy of Information", modTermsP3: "While we use established scientific formulas, we make no guarantees regarding the accuracy, completeness, or suitability of the calculations for any specific individual.",
    modMedTitle: "Medical Disclaimer", modMedP1: "The content, calculators, and recommendations provided by NutritionOS are for educational and informational purposes only.", modMedS1: "Not Medical Advice:", modMedP2: "This website does not provide medical, dietary, or healthcare advice. The estimations provided are based on generalized scientific formulas (such as the Mifflin-St Jeor equation) which may not be accurate for individuals with specific medical conditions, metabolic disorders, pregnant or nursing women, or elite athletes.", modMedS2: "Consult a Professional:", modMedP3: "Always seek the advice of your physician, registered dietitian, or other qualified health provider with any questions you may have regarding a medical condition or before starting any new diet, fitness, or nutrition program.", modMedP4: "Reliance on any information provided by NutritionOS is solely at your own risk.",
    modSrcTitle: "Scientific Sources & Formulas", modSrcIntro: "NutritionOS utilizes the following peer-reviewed formulas and established guidelines to generate your estimates:",
    step1Name: "Your Stats", step2Name: "Activity", step3Name: "Goal", step4Name: "Results",
    s1Title: "Your body stats", s1Sub: "Used only for your BMR calculation — we never store this data.", s1L1: "UNITS", s1L2: "Weight unit", s1L3: "Height unit", s1L4: "ABOUT YOU", s1L5: "Age (10–100)", s1L6: "Biological sex", s1Male: "♂ Male", s1Female: "♀ Female", s1L7: "Height (cm)", s1L8: "Feet", s1L9: "Inches", s1Err1: "Enter an age between 10 and 100", s1Err2: "Please select a sex", s1Err3: "Enter a valid weight", s1Err4: "Enter a height between 100 and 250 cm", s1Err5: "Enter 3–8 ft", s1Err6: "Enter 0–11 in", btnBack: "← Back", btnNext: "Next",
    s2Title: "Activity level", s2Sub: "Your typical week — not your best or worst.",
    act1T: "Sedentary", act1D: "Little or no exercise",
    act2T: "Lightly Active", act2D: "Exercise 1–3 times per week",
    act3T: "Moderately Active", act3D: "Exercise 3–5 times per week",
    act4T: "Very Active", act4D: "Hard training 6–7 days per week",
    act5T: "Extremely Active", act5D: "Athlete-level training or highly physical work",
    s3Title: "Your goal", s3Sub: "This determines your caloric target and macro ratios.", btnGen: "Generate My Plan",
    g1T: "Fat Loss", g1D: "Burn fat while preserving muscle.", g1B: "Burn Fat",
    g2T: "Recomposition", g2D: "Lose fat and build muscle simultaneously.", g2B: "Build Muscle & Lose Fat",
    g3T: "Maintenance", g3D: "Keep your current weight stable.", g3B: "Maintain Weight",
    g4T: "Lean Bulk", g4D: "Build muscle with minimal fat gain.", g4B: "Lean Muscle Gain",
    g5T: "Aggressive Bulk", g5D: "Maximize size and strength gains.", g5B: "Maximum Muscle Growth",
    s4Title: "Your Nutrition Dashboard", rTarget: "Daily Calorie Target", rKcal: "kcal / day", rBMR: "Basal Metabolic Rate", rBMRSub: "kcal / day at complete rest", rTDEE: "Total Daily Energy", rTDEESub: "kcal / day maintenance", rMacro: "Macronutrient Breakdown", rProt: "Protein", rCarb: "Carbs", rFat: "Fat", rHydro: "Daily Hydration", rHydroSub: "litres / day minimum", rPPM: "Protein per Meal", rPPMSub: "across 4 meals/day", rFood: "Smart Food Sources", rBudget: "Budget Meal Planner", rTime: "12-Week Weight Predictor", rMicro: "Micronutrients (ICMR-NIN RDA 2020)", rReco: "Smart Recommendations", btnRecalc: "Recalculate",
    jsMaintain: "= Maintain", jsSplit: "Split:", jsRemainder: "Remainder", jsPPM_calc: "Protein per meal (4 meals): ~", jsRateRecomp: "Rate: Body recomposition — weight may remain stable while composition shifts.", jsRateMaintain: "Rate: 0 kg / week — maintaining current weight.", jsRate: "Rate:", jsWk: "week", jsGain: "gain", jsLoss: "loss", jsTraj: "Estimated weight trajectory over 12 weeks.",
    thFood: "Food", thServe: "Serving", thYield: "Yield", thNut: "Nutrient", thRda: "Daily Target (RDA)", thSrc: "Key Sources"
  },
  hi: {
    navFeatures: "विशेषताएं", navHow: "यह कैसे काम करता है", navScience: "विज्ञान", navStart: "गणना शुरू करें →", navBack: "होम पर वापस जाएँ",
    heroBadge: "विज्ञान-आधारित पोषण", heroSub: "Calculate calories, macros, hydration needs, maintenance calories, weight loss targets, muscle gain goals, and nutrition plans using evidence-based nutrition science.", heroBtnCalc: "गणना शुरू करें", heroBtnHow: "यह कैसे काम करता है",
    pCard1Lbl: "दैनिक कैलोरी", pCard1Unit: "कैलोरी / दिन", pCard2Lbl: "प्रोटीन", pCard3Lbl: "हाइड्रेशन", pCard3Unit: "प्रति दिन",
    stat1: "वैज्ञानिक सूत्र", stat2: "समर्थित भाषाएँ", stat3: "सप्ताह का अनुमान", stat4: "मुफ्त, कोई साइनअप नहीं",
    featTag: "आपको क्या मिलता है", featTitle: "आपके पोषण योजना के लिए सब कुछ", featSub: "कोई अनुमान नहीं — आपके शरीर और लक्ष्यों के लिए एक विज्ञान-आधारित योजना।",
    f1Title: "TDEE + BMR गणना", f1Desc: "मिफ्लिन-सेंट जियोर फॉर्मूला जो आपकी जीवनशैली के लिए सबसे सटीक कैलोरी लक्ष्य देता है।",
    f2Title: "मैक्रो ब्रेकडाउन", f2Desc: "प्रोटीन, कार्बोहाइड्रेट, और वसा का लक्ष्य — जो आपके शरीर के वजन और लक्ष्य के अनुसार सटीक रूप से मापा गया है।",
    f3Title: "हाइड्रेशन योजना", f3Desc: "ईएफएसए-समर्थित पानी के लक्ष्य जो आपके वजन और गतिविधि के अनुसार समायोजित हैं।",
    f4Title: "12-सप्ताह भविष्यवक्ता", f4Desc: "अपने कैलोरी लक्ष्य के आधार पर सप्ताह दर सप्ताह अपने शरीर के वजन की प्रगति देखें।",
    f5Title: "बजट भोजन योजनाकार", f5Desc: "₹100 से ₹500 प्रति दिन के व्यावहारिक भारतीय खाद्य स्रोत और नमूना भोजन योजनाएं।",
    f6Title: "सूक्ष्म पोषक तत्व आरडीए", f6Desc: "विटामिन डी, आयरन, कैल्शियम और अन्य के लिए आईसीएमआर 2020 की सिफारिशें।",
    howTag: "प्रक्रिया", howTitle: "आपकी योजना के तीन चरण", howSub: "कोई अनुमान नहीं। बस आपके आंकड़े और लक्ष्य।",
    h1Title: "अपने आंकड़े दर्ज करें", h1Desc: "आयु, वजन, ऊंचाई और लिंग — केवल आपके बीएमआर की गणना के लिए।",
    h2Title: "गतिविधि और लक्ष्य निर्धारित करें", h2Desc: "अपनी सामान्य गतिविधि का चयन करें, फिर अपना लक्ष्य चुनें — वसा कम करने से लेकर मांसपेशी बढ़ाने तक।",
    h3Title: "अपनी योजना प्राप्त करें", h3Desc: "तुरंत अपना कैलोरी लक्ष्य, मैक्रो, हाइड्रेशन और वजन अनुमान प्राप्त करें।",
    sciTag: "हमारे स्रोत", sciTitle: "सहकर्मी-समीक्षित शोध द्वारा समर्थित", sciSub: "हर फॉर्मूला प्रकाशित पोषण विज्ञान से लिया गया है। हम अनुमान नहीं लगाते।", sciBtn: "अभी आज़माएं",
    sc1: "स्वर्ण-मानक BMR फॉर्मूला", sc2: "TDEE गणना के लिए गतिविधि गुणक", sc3: "मैक्रोन्यूट्रिएंट की सिफारिशें", sc4: "पानी के सेवन के लिए यूरोपीय मानक", sc5: "भारतीय सूक्ष्म पोषक तत्व दिशानिर्देश", sc6: "आहार प्रोटीन पर मेटा-विश्लेषण",
    ctaBadge: "हमेशा मुफ्त — कोई खाता आवश्यक नहीं", ctaTitle: "क्या आप अपने आंकड़े जानने के लिए तैयार हैं?", ctaSub: "उन हजारों लोगों से जुड़ें जिन्होंने न्यूट्रिशनओएस के साथ अपनी पोषण योजना की गणना की है।", ctaBtn: "मेरी योजना शुरू करें →",
    discTitle: "वैज्ञानिक अस्वीकरण", discBody: "यह वेबसाइट पोषण विज्ञान के आधार पर शैक्षिक अनुमान प्रदान करती है। गणना सिद्ध शोध से ली गई है। व्यक्तिगत आवश्यकताएं आनुवंशिकी और स्वास्थ्य के आधार पर भिन्न होती हैं। आहार में बड़े बदलाव करने से पहले हमेशा किसी डॉक्टर से सलाह लें।",
    ftDesc: "सभी के लिए विज्ञान-आधारित पोषण। मुफ्त, बहुभाषी, और कोई साइनअप आवश्यक नहीं।", ftCol1: "उत्पाद", ftCalc: "कैलक्यूलेटर", ftCol2: "विज्ञान", ftSources: "हमारे स्रोत", ftFormulas: "प्रयुक्त सूत्र", ftResearch: "अनुसंधान", ftCol3: "कानूनी", ftPrivacy: "गोपनीयता नीति", ftTerms: "उपयोग की शर्तें", ftMedical: "चिकित्सा अस्वीकरण", ftCopy: "© 2026 NutritionOS. परिणाम व्यक्तियों के बीच भिन्न हो सकते हैं और यह चिकित्सा सलाह का विकल्प नहीं है।", ftBuilt: "पोषण विज्ञान द्वारा संचालित।",
    modPrivTitle: "गोपनीयता नीति", modPrivH1: "1. डेटा संग्रह", modPrivP1: "हम सर्वर पर आपका व्यक्तिगत डेटा एकत्र या सहेजते नहीं हैं। सभी गणनाएँ आपके डिवाइस पर स्थानीय रूप से होती हैं।", modPrivH2: "2. कुकीज़", modPrivP2: "हम केवल आपकी थीम और भाषा सेटिंग्स को सहेजने के लिए स्थानीय स्टोरेज का उपयोग करते हैं।", modPrivH3: "3. तृतीय पक्ष", modPrivP3: "हम बाहरी साइटों की गोपनीयता प्रथाओं के लिए ज़िम्मेदार नहीं हैं।",
    modTermsTitle: "उपयोग की शर्तें", modTermsH1: "1. शर्तें", modTermsP1: "इस वेबसाइट का उपयोग करके, आप इन शर्तों से सहमत होते हैं।", modTermsH2: "2. केवल शैक्षिक उद्देश्य", modTermsP2: "उपकरण केवल सूचनात्मक उद्देश्यों के लिए हैं। यह चिकित्सा सलाह का विकल्प नहीं है।", modTermsH3: "3. सटीकता", modTermsP3: "हम किसी विशिष्ट व्यक्ति के लिए गणनाओं की सटीकता की गारंटी नहीं देते हैं।",
    modMedTitle: "चिकित्सा अस्वीकरण", modMedP1: "सामग्री केवल शैक्षिक उद्देश्यों के लिए है।", modMedS1: "चिकित्सा सलाह नहीं:", modMedP2: "यह वेबसाइट चिकित्सा या स्वास्थ्य सलाह नहीं देती है। अनुमान सामान्यीकृत हैं।", modMedS2: "परामर्श करें:", modMedP3: "नया आहार शुरू करने से पहले हमेशा डॉक्टर से सलाह लें।", modMedP4: "जानकारी पर निर्भरता आपके अपने जोखिम पर है।",
    modSrcTitle: "वैज्ञानिक स्रोत", modSrcIntro: "हम अनुमानों के लिए इन दिशानिर्देशों का उपयोग करते हैं:",
    step1Name: "आंकड़े", step2Name: "गतिविधि", step3Name: "लक्ष्य", step4Name: "परिणाम",
    s1Title: "आपके शरीर के आंकड़े", s1Sub: "केवल आपके BMR की गणना के लिए उपयोग किया जाता है — हम यह डेटा कभी सहेजते नहीं।", s1L1: "इकाइयां", s1L2: "वजन की इकाई", s1L3: "ऊंचाई की इकाई", s1L4: "आपके बारे में", s1L5: "आयु (10–100)", s1L6: "जैविक लिंग", s1Male: "♂ पुरुष", s1Female: "♀ महिला", s1L7: "ऊंचाई (cm)", s1L8: "फुट", s1L9: "इंच", s1Err1: "10 और 100 के बीच आयु दर्ज करें", s1Err2: "कृपया एक लिंग चुनें", s1Err3: "वैध वजन दर्ज करें", s1Err4: "100 और 250 सेमी के बीच ऊंचाई दर्ज करें", s1Err5: "3-8 फुट दर्ज करें", s1Err6: "0-11 इंच दर्ज करें", btnBack: "← पीछे", btnNext: "अगला",
    s2Title: "गतिविधि स्तर", s2Sub: "आपका सामान्य सप्ताह — सबसे अच्छा या सबसे खराब नहीं।",
    act1T: "गतिहीन", act1D: "थोड़ा या कोई व्यायाम नहीं",
    act2T: "हल्के सक्रिय", act2D: "प्रति सप्ताह 1-3 बार व्यायाम",
    act3T: "मध्यम सक्रिय", act3D: "प्रति सप्ताह 3-5 बार व्यायाम",
    act4T: "बहुत सक्रिय", act4D: "प्रति सप्ताह 6-7 दिन कठिन प्रशिक्षण",
    act5T: "अत्यधिक सक्रिय", act5D: "एथलीट-स्तर का प्रशिक्षण या शारीरिक कार्य",
    s3Title: "आपका लक्ष्य", s3Sub: "यह आपके कैलोरी लक्ष्य और मैक्रो अनुपात को निर्धारित करता है।", btnGen: "मेरी योजना बनाएं",
    g1T: "वसा कम करें", g1D: "मांसपेशियों को संरक्षित करते हुए वसा जलाएं।", g1B: "वसा जलाएं",
    g2T: "शारीरिक संरचना", g2D: "एक साथ वसा कम करें और मांसपेशी बनाएं।", g2B: "मांसपेशी बनाएं और वसा कम करें",
    g3T: "रखरखाव", g3D: "अपना वर्तमान वजन स्थिर रखें।", g3B: "वजन बनाए रखें",
    g4T: "मांसपेशी वृद्धि", g4D: "न्यूनतम वसा लाभ के साथ मांसपेशी बनाएं।", g4B: "दुबली मांसपेशी वृद्धि",
    g5T: "तीव्र वृद्धि", g5D: "मांसपेशियों के आकार और ताकत को अधिकतम करें।", g5B: "अधिकतम मांसपेशी वृद्धि",
    s4Title: "आपका पोषण डैशबोर्ड", rTarget: "दैनिक कैलोरी लक्ष्य", rKcal: "कैलोरी / दिन", rBMR: "बेसल मेटाबोलिक दर (BMR)", rBMRSub: "पूर्ण आराम पर कैलोरी / दिन", rTDEE: "कुल दैनिक ऊर्जा", rTDEESub: "रखरखाव कैलोरी / दिन", rMacro: "मैक्रोन्यूट्रिएंट ब्रेकडाउन", rProt: "प्रोटीन", rCarb: "कार्बोहाइड्रेट", rFat: "वसा", rHydro: "दैनिक हाइड्रेशन", rHydroSub: "लीटर / दिन न्यूनतम", rPPM: "प्रति भोजन प्रोटीन", rPPMSub: "दिन में 4 भोजन", rFood: "खाद्य स्रोत", rBudget: "बजट भोजन योजनाकार", rTime: "12-सप्ताह भविष्यवक्ता", rMicro: "सूक्ष्म पोषक तत्व", rReco: "सिफारिशें", btnRecalc: "पुनर्गणना",
    jsMaintain: "= बनाए रखें", jsSplit: "विभाजन:", jsRemainder: "शेष", jsPPM_calc: "प्रति भोजन प्रोटीन (4 भोजन): ~", jsRateRecomp: "दर: शरीर की संरचना — वजन स्थिर रह सकता है।", jsRateMaintain: "दर: 0 किग्रा / सप्ताह — वर्तमान वजन बनाए रखना।", jsRate: "दर:", jsWk: "सप्ताह", jsGain: "वृद्धि", jsLoss: "कमी", jsTraj: "12 सप्ताह में अनुमानित वजन प्रक्षेपवक्र।",
    thFood: "भोजन", thServe: "मात्रा", thYield: "पोषण", thNut: "पोषक तत्व", thRda: "दैनिक लक्ष्य", thSrc: "प्रमुख स्रोत"
  },
  kn: {
    navFeatures: "ವೈಶಿಷ್ಟ್ಯಗಳು", navHow: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", navScience: "ವಿಜ್ಞಾನ", navStart: "ಲೆಕ್ಕಾಚಾರ ಪ್ರಾರಂಭಿಸಿ →", navBack: "ಹೋಮ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    heroBadge: "ವಿಜ್ಞಾನ ಆಧಾರಿತ ಪೋಷಣೆ", heroSub: "Calculate calories, macros, hydration needs, maintenance calories, weight loss targets, muscle gain goals, and nutrition plans using evidence-based nutrition science.", heroBtnCalc: "ಲೆಕ್ಕಾಚಾರ ಪ್ರಾರಂಭಿಸಿ", heroBtnHow: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    pCard1Lbl: "ದೈನಂದಿನ ಕ್ಯಾಲೋರಿಗಳು", pCard1Unit: "ಕ್ಯಾಲೊರಿ / ದಿನ", pCard2Lbl: "ಪ್ರೋಟೀನ್", pCard3Lbl: "ಜಲಸಂಚಯನ", pCard3Unit: "ದಿನಕ್ಕೆ",
    stat1: "ವೈಜ್ಞಾನಿಕ ಸೂತ್ರಗಳು", stat2: "ಬೆಂಬಲಿತ ಭಾಷೆಗಳು", stat3: "ವಾರದ ಅಂದಾಜು", stat4: "ಉಚಿತ, ಸೈನ್ ಅಪ್ ಇಲ್ಲ",
    featTag: "ನೀವು ಏನು ಪಡೆಯುತ್ತೀರಿ", featTitle: "ನಿಮ್ಮ ಪೋಷಣೆ ಯೋಜನೆಗೆ ಎಲ್ಲವೂ", featSub: "ನಿಮ್ಮ ದೇಹ ಮತ್ತು ಗುರಿಗಳಿಗಾಗಿ ವಿಜ್ಞಾನ-ದರ್ಜೆಯ ವಿಭಜನೆ.",
    f1Title: "TDEE + BMR ಲೆಕ್ಕಾಚಾರ", f1Desc: "ನಿಮ್ಮ ಜೀವನಶೈಲಿಗೆ ಹೆಚ್ಚು ನಿಖರವಾದ ಕ್ಯಾಲೋರಿ ಗುರಿ.",
    f2Title: "ಮ್ಯಾಕ್ರೋ ವಿಭಜನೆ", f2Desc: "ಪ್ರೋಟೀನ್, ಕಾರ್ಬ್ಸ್ ಮತ್ತು ಕೊಬ್ಬಿನ ಗುರಿಗಳು.",
    f3Title: "ಜಲಸಂಚಯನ ಯೋಜನೆ", f3Desc: "ದೈನಂದಿನ ನೀರಿನ ಗುರಿಗಳನ್ನು ಸರಿಹೊಂದಿಸಲಾಗಿದೆ.",
    f4Title: "12-ವಾರಗಳ ಭವಿಷ್ಯಸೂಚಕ", f4Desc: "ನಿಮ್ಮ ದೇಹದ ತೂಕದ ಪ್ರಗತಿಯನ್ನು ನೋಡಿ.",
    f5Title: "ಬಜೆಟ್ ಊಟದ ಯೋಜನೆ", f5Desc: "ಪ್ರಾಯೋಗಿಕ ಭಾರತೀಯ ಆಹಾರ ಮೂಲಗಳು ಮತ್ತು ಬಜೆಟ್ ಯೋಜನೆಗಳು.",
    f6Title: "ಮೈಕ್ರೋನ್ಯೂಟ್ರಿಯಂಟ್", f6Desc: "ವಿಟಮಿನ್ ಮತ್ತು ಖನಿಜಗಳ ದೈನಂದಿನ ಶಿಫಾರಸುಗಳು.",
    howTag: "ಪ್ರಕ್ರಿಯೆ", howTitle: "ಮೂರು ಹಂತಗಳು", howSub: "ಊಹೆಗಳಿಲ್ಲ. ಕೇವಲ ನಿಮ್ಮ ಅಂಕಿಅಂಶಗಳು.",
    h1Title: "ನಿಮ್ಮ ಅಂಕಿಅಂಶಗಳನ್ನು ನಮೂದಿಸಿ", h1Desc: "ನಿಮ್ಮ BMR ಲೆಕ್ಕಾಚಾರ ಮಾಡಲು ವಯಸ್ಸು, ತೂಕ, ಎತ್ತರ.",
    h2Title: "ಚಟುವಟಿಕೆ ಮತ್ತು ಗುರಿ", h2Desc: "ನಿಮ್ಮ ಚಟುವಟಿಕೆ ಮತ್ತು ಗುರಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    h3Title: "ಯೋಜನೆ ಪಡೆಯಿರಿ", h3Desc: "ತಕ್ಷಣ ನಿಮ್ಮ ಕ್ಯಾಲೋರಿ ಮತ್ತು ಮ್ಯಾಕ್ರೋಗಳನ್ನು ಪಡೆಯಿರಿ.",
    sciTag: "ನಮ್ಮ ಮೂಲಗಳು", sciTitle: "ಸಂಶೋಧನೆಯಿಂದ ಬೆಂಬಲಿತವಾಗಿದೆ", sciSub: "ಪ್ರತಿಯೊಂದು ಸೂತ್ರವು ವಿಜ್ಞಾನದಿಂದ ಬಂದಿದೆ.", sciBtn: "ಈಗ ಪ್ರಯತ್ನಿಸಿ",
    sc1: "BMR ಸೂತ್ರ", sc2: "ಚಟುವಟಿಕೆ ಗುಣಕ", sc3: "ಮ್ಯಾಕ್ರೋ ಶಿಫಾರಸುಗಳು", sc4: "ಯುರೋಪಿಯನ್ ನೀರಿನ ಮಾನದಂಡ", sc5: "ಭಾರತೀಯ ಮೈಕ್ರೋನ್ಯೂಟ್ರಿಯಂಟ್", sc6: "ಪ್ರೋಟೀನ್ ವಿಶ್ಲೇಷಣೆ",
    ctaBadge: "ಉಚಿತ — ಖಾತೆ ಅಗತ್ಯವಿಲ್ಲ", ctaTitle: "ಸಿದ್ಧರಿದ್ದೀರಾ?", ctaSub: "ಸಾವಿರಾರು ಜನರೊಂದಿಗೆ ಸೇರಿ.", ctaBtn: "ಯೋಜನೆ ಪ್ರಾರಂಭಿಸಿ →",
    discTitle: "ಹಕ್ಕು ನಿರಾಕರಣೆ", discBody: "ಇದು ಶೈಕ್ಷಣಿಕ ಅಂದಾಜು. ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ. ಯಾವುದೇ ಬದಲಾವಣೆಗೂ ಮೊದಲು ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    ftDesc: "ಎಲ್ಲರಿಗೂ ವಿಜ್ಞಾನ ಆಧಾರಿತ ಪೋಷಣೆ.", ftCol1: "ಉತ್ಪನ್ನ", ftCalc: "ಕ್ಯಾಲ್ಕುಲೇಟರ್", ftCol2: "ವಿಜ್ಞಾನ", ftSources: "ಮೂಲಗಳು", ftFormulas: "ಸೂತ್ರಗಳು", ftResearch: "ಸಂಶೋಧನೆ", ftCol3: "ಕಾನೂನು", ftPrivacy: "ಗೌಪ್ಯತಾ ನೀತಿ", ftTerms: "ಬಳಕೆಯ ನಿಯಮಗಳು", ftMedical: "ವೈದ್ಯಕೀಯ ಹಕ್ಕು ನಿರಾಕರಣೆ", ftCopy: "© 2026 NutritionOS", ftBuilt: "ವಿಜ್ಞಾನದಿಂದ ಚಾಲಿತವಾಗಿದೆ.",
    modPrivTitle: "ಗೌಪ್ಯತಾ ನೀತಿ", modPrivH1: "1. ಡೇಟಾ", modPrivP1: "ನಾವು ಡೇಟಾ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.", modPrivH2: "2. ಕುಕೀಸ್", modPrivP2: "ಥೀಮ್ ಉಳಿಸಲು ಮಾತ್ರ.", modPrivH3: "3. ಲಿಂಕ್‌ಗಳು", modPrivP3: "ಹೊರಗಿನ ಸೈಟ್‌ಗಳಿಗೆ ನಾವು ಜವಾಬ್ದಾರರಲ್ಲ.",
    modTermsTitle: "ಬಳಕೆಯ ನಿಯಮಗಳು", modTermsH1: "1. ನಿಯಮಗಳು", modTermsP1: "ಬಳಸುವ ಮೂಲಕ ನೀವು ಒಪ್ಪುತ್ತೀರಿ.", modTermsH2: "2. ಶೈಕ್ಷಣಿಕ", modTermsP2: "ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ.", modTermsH3: "3. ನಿಖರತೆ", modTermsP3: "ನಿಖರತೆಯ ಖಾತರಿ ಇಲ್ಲ.",
    modMedTitle: "ವೈದ್ಯಕೀಯ ಹಕ್ಕು ನಿರಾಕರಣೆ", modMedP1: "ಶೈಕ್ಷಣಿಕ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಮಾತ್ರ.", modMedS1: "ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ:", modMedP2: "ಇದು ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ.", modMedS2: "ಸಂಪರ್ಕಿಸಿ:", modMedP3: "ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.", modMedP4: "ಸ್ವಂತ ಅಪಾಯದಲ್ಲಿ ಬಳಸಿ.",
    modSrcTitle: "ವೈಜ್ಞಾನಿಕ ಮೂಲಗಳು", modSrcIntro: "ನಾವು ಈ ಮೂಲಗಳನ್ನು ಬಳಸುತ್ತೇವೆ:",
    step1Name: "ಅಂಕಿಅಂಶ", step2Name: "ಚಟುವಟಿಕೆ", step3Name: "ಗುರಿ", step4Name: "ಫಲಿತಾಂಶ",
    s1Title: "ನಿಮ್ಮ ಅಂಕಿಅಂಶಗಳು", s1Sub: "ನಿಮ್ಮ BMR ಗಾಗಿ ಮಾತ್ರ.", s1L1: "ಘಟಕಗಳು", s1L2: "ತೂಕ ಘಟಕ", s1L3: "ಎತ್ತರ ಘಟಕ", s1L4: "ನಿಮ್ಮ ಬಗ್ಗೆ", s1L5: "ವಯಸ್ಸು (10–100)", s1L6: "ಲಿಂಗ", s1Male: "♂ ಪುರುಷ", s1Female: "♀ ಮಹಿಳೆ", s1L7: "ಎತ್ತರ (cm)", s1L8: "ಅಡಿ", s1L9: "ಇಂಚು", s1Err1: "10-100 ನಡುವೆ ನಮೂದಿಸಿ", s1Err2: "ಲಿಂಗ ಆಯ್ಕೆಮಾಡಿ", s1Err3: "ಸರಿಯಾದ ತೂಕ ನಮೂದಿಸಿ", s1Err4: "100-250cm ನಮೂದಿಸಿ", s1Err5: "3-8 ಅಡಿ ನಮೂದಿಸಿ", s1Err6: "0-11 ಇಂಚು ನಮೂದಿಸಿ", btnBack: "← ಹಿಂದೆ", btnNext: "ಮುಂದೆ",
    s2Title: "ಚಟುವಟಿಕೆ ಮಟ್ಟ", s2Sub: "ನಿಮ್ಮ ಸಾಮಾನ್ಯ ವಾರ.",
    act1T: "ಜಡತ್ವ", act1D: "ವ್ಯಾಯಾಮವಿಲ್ಲ",
    act2T: "ಲಘು ಸಕ್ರಿಯ", act2D: "ವಾರಕ್ಕೆ 1-3 ಬಾರಿ",
    act3T: "ಮಧ್ಯಮ ಸಕ್ರಿಯ", act3D: "ವಾರಕ್ಕೆ 3-5 ಬಾರಿ",
    act4T: "ಬಹಳ ಸಕ್ರಿಯ", act4D: "ವಾರಕ್ಕೆ 6-7 ದಿನ",
    act5T: "ಅತ್ಯಂತ ಸಕ್ರಿಯ", act5D: "ಕ್ರೀಡಾಪಟು-ಮಟ್ಟದ ತರಬೇತಿ",
    s3Title: "ನಿಮ್ಮ ಗುರಿ", s3Sub: "ನಿಮ್ಮ ಕ್ಯಾಲೋರಿ ನಿರ್ಧರಿಸುತ್ತದೆ.", btnGen: "ಯೋಜನೆ ರಚಿಸಿ",
    g1T: "ಕೊಬ್ಬು ಕರಗಿಸಿ", g1D: "ಕೊಬ್ಬು ಸುಟ್ಟುಹಾಕಿ.", g1B: "ಕೊಬ್ಬು ಕರಗಿಸಿ",
    g2T: "ಮರುಸಂಯೋಜನೆ", g2D: "ಕೊಬ್ಬು ಕರಗಿಸಿ, ಸ್ನಾಯು ಬೆಳೆಸಿ.", g2B: "ಸ್ನಾಯು & ಕೊಬ್ಬು",
    g3T: "ನಿರ್ವಹಣೆ", g3D: "ತೂಕ ಕಾಪಾಡಿಕೊಳ್ಳಿ.", g3B: "ತೂಕ ನಿರ್ವಹಣೆ",
    g4T: "ಸ್ನಾಯು ಬೆಳವಣಿಗೆ", g4D: "ಸ್ನಾಯುಗಳನ್ನು ಬೆಳೆಸಿ.", g4B: "ಸ್ನಾಯು ಬೆಳವಣಿಗೆ",
    g5T: "ಗರಿಷ್ಠ ಬೆಳವಣಿಗೆ", g5D: "ಗರಿಷ್ಠ ಸ್ನಾಯು ಬೆಳವಣಿಗೆ.", g5B: "ಗರಿಷ್ಠ ಸ್ನಾಯು",
    s4Title: "ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", rTarget: "ದೈನಂದಿನ ಕ್ಯಾಲೋರಿ", rKcal: "ಕ್ಯಾಲೊರಿ / ದಿನ", rBMR: "BMR", rBMRSub: "ವಿಶ್ರಾಂತಿ ಕ್ಯಾಲೋರಿ", rTDEE: "TDEE", rTDEESub: "ನಿರ್ವಹಣೆ ಕ್ಯಾಲೋರಿ", rMacro: "ಮ್ಯಾಕ್ರೋ ವಿಭಜನೆ", rProt: "ಪ್ರೋಟೀನ್", rCarb: "ಕಾರ್ಬ್ಸ್", rFat: "ಕೊಬ್ಬು", rHydro: "ಜಲಸಂಚಯನ", rHydroSub: "ಲೀಟರ್ / ದಿನ ಕನಿಷ್ಠ", rPPM: "ಪ್ರತಿ ಊಟಕ್ಕೆ ಪ್ರೋಟೀನ್", rPPMSub: "ದಿನಕ್ಕೆ 4 ಊಟ", rFood: "ಆಹಾರ ಮೂಲಗಳು", rBudget: "ಬಜೆಟ್ ಯೋಜನೆ", rTime: "12-ವಾರಗಳ ಭವಿಷ್ಯ", rMicro: "ಮೈಕ್ರೋನ್ಯೂಟ್ರಿಯಂಟ್", rReco: "ಶಿಫಾರಸುಗಳು", btnRecalc: "ಮರು ಲೆಕ್ಕಾಚಾರ",
    jsMaintain: "= ನಿರ್ವಹಣೆ", jsSplit: "ವಿಭಜನೆ:", jsRemainder: "ಉಳಿದದ್ದು", jsPPM_calc: "ಪ್ರತಿ ಊಟಕ್ಕೆ: ~", jsRateRecomp: "ದರ: ಮರುಸಂಯೋಜನೆ — ತೂಕ ಸ್ಥಿರವಾಗಿರಬಹುದು.", jsRateMaintain: "ದರ: 0 ಕೆಜಿ / ವಾರ.", jsRate: "ದರ:", jsWk: "ವಾರ", jsGain: "ಹೆಚ್ಚಳ", jsLoss: "ಇಳಿಕೆ", jsTraj: "ಅಂದಾಜು ತೂಕದ ಪಥ.",
    thFood: "ಆಹಾರ", thServe: "ಪ್ರಮಾಣ", thYield: "ಇಳುವರಿ", thNut: "ಪೋಷಕಾಂಶ", thRda: "ಗುರಿ", thSrc: "ಮೂಲಗಳು"
  }
};

/* ============================================================
   DATA
   ============================================================ */
const ACTIVITY = [
  { id:'sed',    pal:1.475, icon:'<i class="ti ti-chair-director"></i>', i18nTitle:'act1T', i18nDesc:'act1D' },
  { id:'light',  pal:1.625, icon:'<i class="ti ti-walk"></i>', i18nTitle:'act2T', i18nDesc:'act2D' },
  { id:'mod',    pal:1.775, icon:'<i class="ti ti-run"></i>', i18nTitle:'act3T', i18nDesc:'act3D' },
  { id:'very',   pal:1.925, icon:'<i class="ti ti-barbell"></i>', i18nTitle:'act4T', i18nDesc:'act4D' },
  { id:'ext',    pal:2.200, icon:'<i class="ti ti-bolt"></i>', i18nTitle:'act5T', i18nDesc:'act5D' }
];

const GOALS = [
  { id:'cut',      type:'cut',      icon:'<i class="ti ti-flame"></i>', i18nTitle:'g1T', i18nDesc:'g1D', i18nBadge:'g1B', tm:0.825, p:2.2, f:1.0, full:false },
  { id:'recomp',   type:'recomp',   icon:'<i class="ti ti-scale"></i>', i18nTitle:'g2T', i18nDesc:'g2D', i18nBadge:'g2B', tm:0.925, p:1.9, f:1.0, full:false },
  { id:'maintain', type:'maintain', icon:'<i class="ti ti-target"></i>', i18nTitle:'g3T', i18nDesc:'g3D', i18nBadge:'g3B', tm:1.000, p:1.5, f:1.1, full:true  },
  { id:'lean',     type:'bulk',     icon:'<i class="ti ti-trending-up"></i>', i18nTitle:'g4T', i18nDesc:'g4D', i18nBadge:'g4B', tm:1.075, p:1.8, f:1.1, full:false },
  { id:'agg',      type:'bulk',     icon:'<i class="ti ti-rocket"></i>', i18nTitle:'g5T', i18nDesc:'g5D', i18nBadge:'g5B', tm:1.150, p:1.8, f:1.2, full:false }
];

const FOODS = {
  protein:[
    { name:'Soya chunks', serving:'50g (dry)', value:'~25g' },
    { name:'Chicken breast', serving:'100g', value:'~31g' },
    { name:'Paneer (low fat)', serving:'100g', value:'~18g' },
    { name:'Whole eggs', serving:'2 eggs', value:'~12g' },
    { name:'Greek yogurt', serving:'150g', value:'~15g' }
  ],
  carbs:[
    { name:'Brown rice', serving:'100g (dry)', value:'~76g' },
    { name:'Oats', serving:'80g', value:'~54g' },
    { name:'Sweet potato', serving:'150g', value:'~29g' },
    { name:'Whole wheat roti', serving:'2 rotis', value:'~30g' },
    { name:'Banana', serving:'1 medium', value:'~27g' }
  ],
  fat:[
    { name:'Almonds', serving:'30g', value:'~15g' },
    { name:'Peanut butter', serving:'2 tbsp', value:'~16g' },
    { name:'Coconut oil', serving:'1 tbsp', value:'~14g' },
    { name:'Avocado', serving:'100g', value:'~15g' },
    { name:'Groundnuts', serving:'30g', value:'~14g' }
  ]
};

const BUDGETS = {
  100:['Eggs ×4 (₹24)','Soya chunks 100g (₹12)','Oats 100g (₹18)','Banana ×2 (₹20)','Groundnuts 50g (₹15)'],
  200:['Eggs ×4 (₹24)','Chicken breast 150g (₹75)','Oats 100g (₹18)','Dals 100g (₹30)','Peanut butter 1 tbsp (₹20)'],
  300:['Eggs ×4 (₹24)','Chicken breast 200g (₹100)','Paneer 100g (₹60)','Brown rice 100g (₹25)','Veg 200g (₹40)'],
  500:['Eggs ×4 (₹24)','Chicken breast 300g (₹150)','Greek yogurt 150g (₹80)','Oats 100g (₹18)','Almonds 30g (₹60)','Banana ×2 (₹20)']
};

/* ============================================================
   STATE
   ============================================================ */
const S = {
  step:         1,
  weightUnit:   'kg',
  heightUnit:   'cm',
  age:          null,
  sex:          null,
  weightKg:     null,
  heightCm:     null,
  activity:     null,
  goal:         null,
  results:      {},
  lang:         'en'
};

/* ============================================================
   INIT & THEME/LANG
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Theme init
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeMeta = document.getElementById('metaTheme');
  if(themeMeta) themeMeta.setAttribute('content', savedTheme === 'dark' ? '#08081A' : '#F4F3FF');
  updateThemeIcon(savedTheme);

  // Lang init
  const savedLang = localStorage.getItem('lang') || 'en';
  setLang(savedLang, true);

  if (document.getElementById('step-1')) initCalculator();
  else                                    initLanding();

  // Close lang menu when clicking outside
  document.addEventListener('click', (e) => {
    if(!e.target.closest('#langSwitcher')) {
      const menu = document.getElementById('langMenu');
      if(menu) menu.classList.remove('open');
    }
  });
});

/* Theme */
function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const themeMeta = document.getElementById('metaTheme');
  if(themeMeta) themeMeta.setAttribute('content', next === 'dark' ? '#08081A' : '#F4F3FF');
  updateThemeIcon(next);
}
function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if(icon) icon.className = theme === 'dark' ? 'ti ti-moon' : 'ti ti-sun';
}

/* Lang */
function toggleLangMenu() {
  document.getElementById('langMenu').classList.toggle('open');
}
function setLang(code, isInit = false) {
  S.lang = code;
  localStorage.setItem('lang', code);
  
  // update UI flags
  const iconMap = { en: '🇬🇧', hi: '🇮🇳', kn: '🇮🇳' };
  const lblMap  = { en: 'EN', hi: 'HI', kn: 'KN' };
  document.getElementById('currentLangIcon').textContent = iconMap[code];
  document.getElementById('currentLangLabel').textContent = lblMap[code];
  
  document.querySelectorAll('.lang-option').forEach(el => el.classList.remove('active'));
  const opts = document.querySelectorAll('.lang-option');
  if(code==='en' && opts[0]) opts[0].classList.add('active');
  if(code==='hi' && opts[1]) opts[1].classList.add('active');
  if(code==='kn' && opts[2]) opts[2].classList.add('active');

  const menu = document.getElementById('langMenu');
  if(menu) menu.classList.remove('open');

  applyTranslations();

  // If in calculator, re-render dynamic content
  if (!isInit && document.getElementById('step-1')) {
    renderActivityCards();
    renderGoalCards();
    if(S.step === 4) renderResults();
  }
}
function t(key) {
  return I18N[S.lang][key] || I18N['en'][key] || key;
}
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key);
  });
}

/* Modals */
function openModal(id) {
  const m = document.getElementById(id);
  if(m) m.classList.add('open');
}
function closeModalBtn(id) {
  const m = document.getElementById(id);
  if(m) m.classList.remove('open');
}
function closeModal(e) {
  if(e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
}

/* ============================================================
   LANDING PAGE
   ============================================================ */
function initLanding() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (ham) {
    ham.addEventListener('click', () => menu.classList.toggle('open'));
  }

  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => observer.observe(t));
}
function closeMobile() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
}

/* ============================================================
   CALCULATOR — INIT
   ============================================================ */
function initCalculator() {
  renderActivityCards();
  renderGoalCards();
  showStep(1);
  showFood('protein', null);
  showBudget(100, null);
}

/* ============================================================
   STEP NAVIGATION
   ============================================================ */
function showStep(n) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(`step-${n}`);
  if (el) el.classList.add('active');
  S.step = n;
  updateProgress(n);
  
  // Distraction-free onboarding
  const isResults = (n === 4);
  const logo = document.getElementById('calcNavLogo');
  const backBtn = document.getElementById('calcNavBack');
  const footer = document.getElementById('calcFooter');
  const disclaimer = document.getElementById('calcDisclaimer');
  
  if (logo) logo.style.display = isResults ? 'flex' : 'none';
  if (backBtn) backBtn.style.display = isResults ? 'flex' : 'none';
  if (footer) footer.style.display = isResults ? 'block' : 'none';
  if (disclaimer) disclaimer.style.display = isResults ? 'block' : 'none';

  window.scrollTo({ top:0, behavior:'smooth' });
}

function nextStep(from) {
  if (from === 1 && !validateStep1()) return;
  showStep(from + 1);
}

function prevStep(from) {
  showStep(from - 1);
}

function restart() {
  S.sex      = null;
  S.activity = null;
  S.goal     = null;
  document.getElementById('inpAge').value    = '';
  document.getElementById('inpWeight').value = '';
  document.getElementById('inpCm').value     = '';
  if (document.getElementById('inpFt')) document.getElementById('inpFt').value = '';
  if (document.getElementById('inpIn')) document.getElementById('inpIn').value = '';
  document.querySelectorAll('.sex-pill').forEach(p => p.classList.remove('active','error'));
  document.querySelectorAll('.act-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('active'));
  document.getElementById('btnNext1').disabled = true;
  document.getElementById('btnNext2').disabled = true;
  document.getElementById('btnCalc').disabled  = true;
  showStep(1);
}

/* ============================================================
   PROGRESS BAR
   ============================================================ */
function updateProgress(step) {
  const total = 4;
  const pct = ((step - 1) / (total - 1)) * 100;
  const conn = document.getElementById('progressConnector');
  if (conn) conn.style.width = pct + '%';

  for (let i = 1; i <= total; i++) {
    const dot = document.getElementById(`dot${i}`);
    const lbl = document.getElementById(`lbl${i}`);
    if (!dot) continue;
    dot.classList.remove('active','done');
    if (lbl) lbl.classList.remove('active','done');
    if (i < step)      { dot.classList.add('done');   if(lbl) lbl.classList.add('done');   }
    else if (i === step){ dot.classList.add('active'); if(lbl) lbl.classList.add('active'); }
  }
}

/* ============================================================
   STEP 1 — UNIT TOGGLES + VALIDATION
   ============================================================ */
function setWeightUnit(unit) {
  S.weightUnit = unit;
  document.getElementById('btnKg').classList.toggle('active',  unit==='kg');
  document.getElementById('btnLbs').classList.toggle('active', unit==='lbs');
  document.getElementById('lblWeight').textContent = unit==='kg' ? 'Weight (kg)' : 'Weight (lbs)';

  const inp = document.getElementById('inpWeight');
  if (inp.value) {
    const v = parseFloat(inp.value);
    inp.value = unit==='lbs'
      ? (v * 2.20462).toFixed(1)
      : (v / 2.20462).toFixed(1);
  }
  liveValidate();
}

function setHeightUnit(unit) {
  S.heightUnit = unit;
  document.getElementById('btnCm').classList.toggle('active',   unit==='cm');
  document.getElementById('btnFtin').classList.toggle('active', unit==='ftin');
  document.getElementById('wrapCm').style.display   = unit==='cm'   ? '' : 'none';
  document.getElementById('wrapFtin').style.display = unit==='ftin' ? 'flex' : 'none';
  liveValidate();
}

function setSex(val) {
  S.sex = val;
  document.getElementById('pillM').classList.toggle('active', val==='male');
  document.getElementById('pillF').classList.toggle('active', val==='female');
  document.getElementById('pillM').classList.remove('error');
  document.getElementById('pillF').classList.remove('error');
  document.getElementById('errSex').classList.remove('show');
  liveValidate();
}

function liveValidate() {
  const ok = isStep1Valid(false);
  document.getElementById('btnNext1').disabled = !ok;
}

function isStep1Valid(showErrors) {
  let ok = true;
  const setErr = (inputId, errId, condition) => {
    const inp = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (condition) {
      if (showErrors && inp) inp.classList.add('error');
      if (showErrors && err) err.classList.add('show');
      ok = false;
    } else {
      if (inp) inp.classList.remove('error');
      if (err) err.classList.remove('show');
    }
  };

  const age = parseInt(document.getElementById('inpAge').value, 10);
  const ageOk = !isNaN(age) && age >= 10 && age <= 100;
  setErr('inpAge', 'errAge', !ageOk);
  if (ageOk) S.age = age;

  if (!S.sex) {
    if (showErrors) {
      document.getElementById('pillM').classList.add('error');
      document.getElementById('pillF').classList.add('error');
      document.getElementById('errSex').classList.add('show');
    }
    ok = false;
  }

  const wRaw = parseFloat(document.getElementById('inpWeight').value);
  const wKg  = S.weightUnit === 'lbs' ? wRaw / 2.20462 : wRaw;
  const wOk  = !isNaN(wRaw) && wKg >= 30 && wKg <= 300;
  setErr('inpWeight', 'errWeight', !wOk);
  if (wOk) S.weightKg = wKg;

  if (S.heightUnit === 'cm') {
    const h = parseFloat(document.getElementById('inpCm').value);
    const hOk = !isNaN(h) && h >= 100 && h <= 250;
    setErr('inpCm', 'errCm', !hOk);
    if (hOk) S.heightCm = h;
  } else {
    const ft  = parseInt(document.getElementById('inpFt').value, 10) || 0;
    const inc = parseInt(document.getElementById('inpIn').value, 10) || 0;
    const ftOk = ft >= 3 && ft <= 8;
    const inOk = inc >= 0 && inc <= 11;
    setErr('inpFt', 'errFt', !ftOk);
    setErr('inpIn', 'errIn', !inOk);
    if (ftOk && inOk) S.heightCm = (ft * 12 + inc) * 2.54;
    else ok = false;
  }

  return ok;
}

function validateStep1() {
  return isStep1Valid(true);
}

/* ============================================================
   STEP 2 — ACTIVITY CARDS
   ============================================================ */
function renderActivityCards() {
  const container = document.getElementById('activityList');
  if (!container) return;
  container.innerHTML = '';

  ACTIVITY.forEach(a => {
    const div = document.createElement('div');
    div.className = `act-card ${S.activity && S.activity.id === a.id ? 'active' : ''}`;
    div.innerHTML = `
      <div class="act-icon-wrap">${a.icon}</div>
      <div class="act-info">
        <div class="act-title">${t(a.i18nTitle)}</div>
        <div class="act-desc">${t(a.i18nDesc)}</div>
      </div>
    `;
    div.addEventListener('click', () => {
      document.querySelectorAll('.act-card').forEach(c => c.classList.remove('active'));
      div.classList.add('active');
      S.activity = a;
      document.getElementById('btnNext2').disabled = false;
    });
    container.appendChild(div);
  });
}

/* ============================================================
   STEP 3 — GOAL CARDS
   ============================================================ */
function renderGoalCards() {
  const container = document.getElementById('goalGrid');
  if (!container) return;
  container.innerHTML = '';

  GOALS.forEach(g => {
    const div = document.createElement('div');
    div.className = `goal-card ${g.full ? 'full' : ''} ${S.goal && S.goal.id === g.id ? 'active' : ''}`;
    div.dataset.type = g.type;
    div.innerHTML = `
      <div class="goal-icon">${g.icon}</div>
      <div class="goal-title">${t(g.i18nTitle)}</div>
      <div class="goal-desc">${t(g.i18nDesc)}</div>
      <div class="goal-badge">${t(g.i18nBadge)}</div>
    `;
    div.addEventListener('click', () => {
      document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('active'));
      div.classList.add('active');
      S.goal = g;
      document.getElementById('btnCalc').disabled = false;
    });
    container.appendChild(div);
  });
}

/* ============================================================
   CALCULATIONS
   ============================================================ */
function calculate() {
  if (!S.activity || !S.goal) return;

  const { age, sex, weightKg, heightCm, activity, goal } = S;

  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  bmr += sex === 'male' ? 5 : -161;

  const tdee = bmr * activity.pal;

  const floorCal = sex === 'male' ? 1500 : 1200;
  let target = Math.max(Math.round(tdee * goal.tm), floorCal);

  const p_g  = Math.round(goal.p * weightKg);
  const f_g  = Math.max(Math.round(goal.f * weightKg), Math.round(0.5 * weightKg));
  const p_cal = p_g * 4;
  const f_cal = f_g * 9;
  const c_cal = Math.max(target - p_cal - f_cal, 400);
  target      = p_cal + f_cal + c_cal; 
  const c_g   = Math.round(c_cal / 4);

  const p_pct = Math.round((p_cal / target) * 100);
  const c_pct = Math.round((c_cal / target) * 100);
  const f_pct = Math.round((f_cal / target) * 100);

  const water = ((weightKg * 0.035) + 0.3).toFixed(1);
  const adjPct = Math.round(((target - tdee) / tdee) * 100);

  S.results = {
    bmr:  Math.round(bmr), tdee: Math.round(tdee), pal:  activity.pal,
    target, adjPct, water,
    p_g, c_g, f_g, p_cal, c_cal, f_cal, p_pct, c_pct, f_pct,
    p_mult: goal.p, f_mult: goal.f
  };

  renderResults();
  showStep(4);
}

/* ============================================================
   RESULTS RENDERING
   ============================================================ */
function renderResults() {
  const r = S.results;
  
  document.getElementById('resSummary').textContent =
    `${t(S.activity.i18nTitle)} • ${t(S.goal.i18nTitle)} • ${S.weightKg.toFixed(1)} kg • ${S.age}`;

  document.getElementById('resCalories').textContent = r.target.toLocaleString();
  document.getElementById('resTDEE').textContent     = r.tdee.toLocaleString();
  document.getElementById('resBMR').textContent      = r.bmr.toLocaleString();
  document.getElementById('resPAL').textContent      = r.pal.toFixed(3);
  
  const adjEl = document.getElementById('resAdj');
  adjEl.textContent = r.adjPct > 0 ? `+${r.adjPct}%` : r.adjPct < 0 ? `${r.adjPct}%` : t('jsMaintain');

  document.getElementById('miniB').textContent = r.bmr.toLocaleString();
  document.getElementById('miniT').textContent = r.tdee.toLocaleString();

  document.getElementById('macroSplit').textContent =
    `${t('jsSplit')} ${r.p_pct}% / ${r.c_pct}% / ${r.f_pct}%`;

  document.getElementById('valPg').textContent = r.p_g;
  document.getElementById('valCg').textContent = r.c_g;
  document.getElementById('valFg').textContent = r.f_g;

  document.getElementById('macroPS').textContent = `${r.p_mult} g/kg · ${r.p_cal} kcal`;
  document.getElementById('macroCS').textContent = `${t('jsRemainder')} · ${r.c_cal} kcal`;
  document.getElementById('macroFS').textContent = `${r.f_mult} g/kg · ${r.f_cal} kcal`;

  setTimeout(() => {
    animateDonut('ringP', r.p_pct);
    animateDonut('ringC', r.c_pct);
    animateDonut('ringF', r.f_pct);
  }, 150);

  const ppm = Math.round(r.p_g / 4);
  document.getElementById('perMeal').textContent = `${t('jsPPM_calc')} ${ppm}g`;
  document.getElementById('resPPM').textContent  = `~${ppm}g`;
  document.getElementById('resWater').textContent = r.water + 'L';

  showFood('protein', document.querySelector('.tabs .tab-btn:nth-child(1)'));
  showBudget(100, document.querySelectorAll('.budget-plan').length ? document.querySelector('.tabs-wrap:nth-of-type(2) .tab-btn:nth-child(1)') : null);

  renderTimeline();
  renderMicro();
  renderRecos();
}

function animateDonut(id, pct) {
  const ring = document.getElementById(id);
  if (!ring) return;
  const circ = 251;
  const arc  = (pct / 100) * circ;
  ring.style.strokeDasharray = `${arc} ${circ}`;
}

function showFood(type, btn) {
  if (btn) {
    btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  const rows = FOODS[type];
  const table = document.getElementById('foodTable');
  if (!table) return;
  table.innerHTML = `
    <thead><tr><th>${t('thFood')}</th><th>${t('thServe')}</th><th>${t('thYield')}</th></tr></thead>
    <tbody>
      ${rows.map(r => `<tr><td>${r.name}</td><td style="color:var(--text-3)">${r.serving}</td><td>${r.value}</td></tr>`).join('')}
    </tbody>
  `;
}

function showBudget(amount, btn) {
  if (btn) {
    btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  const items = BUDGETS[amount];
  const el = document.getElementById('budgetList');
  if (!el) return;
  el.innerHTML = items.map(i => `
    <div class="budget-item"><i class="ti ti-circle-check-filled"></i><span>${i}</span></div>
  `).join('');
}

function renderTimeline() {
  const wKg = S.weightKg;
  const goalId = S.goal.id;

  const rateMap = { cut: -0.0075, recomp: 0, maintain: 0, lean: +0.00375, agg: +0.0075 };
  const pct   = rateMap[goalId] ?? 0;
  const chgWk = wKg * pct;

  let rateStr;
  if (pct === 0) {
    rateStr = goalId === 'recomp' ? t('jsRateRecomp') : t('jsRateMaintain');
  } else {
    const dir = pct > 0 ? t('jsGain') : t('jsLoss');
    rateStr = `${t('jsRate')} ${Math.abs(pct*100).toFixed(2)}% BW/week (~${Math.abs(chgWk).toFixed(2)} kg/${t('jsWk')} ${dir})`;
  }

  document.getElementById('tlSub').textContent  = t('jsTraj');
  document.getElementById('tlRate').textContent = rateStr;

  const weeks = [0, 3, 6, 9, 12];
  const isLbs = S.weightUnit === 'lbs';
  const mult  = isLbs ? 2.20462 : 1;
  const uStr  = isLbs ? 'lbs' : 'kg';

  const container = document.getElementById('timelineDots');
  if (!container) return;
  container.innerHTML = '';

  weeks.forEach(wk => {
    const w   = (wKg + chgWk * wk) * mult;
    const dot = document.createElement('div');
    dot.className = 'tl-dot';
    dot.innerHTML = `
      <div class="tl-wk">Wk ${wk}</div>
      <div class="tl-circle"></div>
      <div class="tl-weight">${w.toFixed(1)} ${uStr}</div>
    `;
    container.appendChild(dot);
  });
}

function renderMicro() {
  const sex = S.sex;
  const micros = [
    { name:'Vitamin D', rda:'600–800 IU', src:'Sunlight, eggs, fatty fish' },
    { name:'Vitamin C', rda:'65–90 mg', src:'Citrus, amla, guava, tomatoes' },
    { name:'Iron', rda: sex==='female' ? '18 mg' : '8 mg', src:'Red meat, dals, spinach, soya' },
    { name:'Calcium', rda:'1000 mg', src:'Dairy, ragi, sesame, tofu' },
    { name:'Magnesium', rda:'255–420 mg', src:'Nuts, seeds, green veg, whole grains' },
    { name:'Zinc', rda: sex==='female' ? '8 mg' : '11 mg', src:'Meat, shellfish, pumpkin seeds' },
    { name:'Vitamin B12', rda:'2.4 mcg', src:'Meat, fish, dairy, fortified foods' },
    { name:'Potassium', rda:'3500 mg', src:'Banana, potato, coconut water' }
  ];

  const table = document.getElementById('microTable');
  if (!table) return;
  table.innerHTML = `
    <thead><tr><th>${t('thNut')}</th><th>${t('thRda')}</th><th>${t('thSrc')}</th></tr></thead>
    <tbody>
      ${micros.map(m => `<tr><td>${m.name}</td><td>${m.rda}</td><td style="color:var(--text-3)">${m.src}</td></tr>`).join('')}
    </tbody>
  `;
}

function renderRecos() {
  const r   = S.results;
  const g   = S.goal;
  const ppm = Math.round(r.p_g / 4);
  const list = [];

  list.push(`Drink at least ${r.water} litres of water every day — space it evenly throughout.`);
  if (g.type === 'cut' || g.type === 'recomp') {
    list.push(`Spread ~${ppm}g of protein across 4 meals to maximise muscle protein synthesis.`);
    list.push('Aim for 7–9 hours of quality sleep — sleep deprivation significantly increases cortisol and muscle loss during a cut.');
    list.push('Track your food for at least the first 3 weeks to build an accurate mental model of portion sizes.');
  } else if (g.type === 'bulk') {
    list.push(`Ensure consistent daily intake — even one day far under target can stall weekly gains.`);
    list.push('Apply progressive overload: aim to add weight or reps every 1–2 weeks across your main lifts.');
    list.push(`Post-workout meal should include ~${ppm}g protein + 50–80g carbs for optimal recovery.`);
  } else {
    list.push('Track weight weekly — maintenance calorie needs drift as body composition changes.');
    list.push('Rotate your protein and carb sources each week to improve micronutrient variety.');
  }

  const container = document.getElementById('recoList');
  if (!container) return;
  container.innerHTML = list.map(l => `
    <div class="reco-item"><i class="ti ti-circle-check-filled"></i><span>${l}</span></div>
  `).join('');
}
