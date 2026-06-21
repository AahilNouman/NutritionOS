// ===================================================
// NutritionOS — script.js
// Logic for calculations, I18N, state, and UI binding
// ===================================================

// --- TRANSLATIONS (EN / HI / KN) ---
const i18n = {
    en: {
        heroTitle: "Know Exactly What Your Body Needs.",
        heroSub: "Calculate calories, macros, hydration, and nutrition targets in seconds.",
        btnStart: "Start Calculation",
        btnNext: "Next",
        btnBack: "Back",
        btnCalculate: "Calculate",
        btnRecalculate: "Recalculate",
        step1Title: "Unit Selection", step1Sub: "How do you prefer to measure?",
        lblWeightUnit: "Weight Unit", lblHeightUnit: "Height Unit",
        step2Title: "Body Stats", step2Sub: "Let's get some basic measurements.",
        lblAge: "Age (10-100)", lblGender: "Gender", optMale: "Male", optFemale: "Female",
        lblWeight: "Weight", lblHeight: "Height",
        errAge: "Enter valid age", errWeight: "Enter valid weight", errHeight: "Enter valid height",
        step3Title: "Activity Level", step3Sub: "How active is your daily routine?",
        act1Title: "Sedentary", act1Desc: "Little or no exercise, desk job",
        act2Title: "Lightly Active", act2Desc: "Light exercise/sports 1-3 days/week",
        act3Title: "Moderately Active", act3Desc: "Moderate exercise 3-5 days/week",
        act4Title: "Very Active", act4Desc: "Hard exercise 6-7 days/week",
        step4Title: "Your Goal", step4Sub: "What are you trying to achieve?",
        goalCut: "Fat Loss", goalCutDesc: "Lose fat while preserving muscle.",
        goalBulkLean: "Lean Bulk", goalBulkLeanDesc: "Build muscle with minimal fat gain.",
        goalBulkAgg: "Aggressive Bulk", goalBulkAggDesc: "Maximum muscle gain.",
        goalMaintain: "Maintenance", goalMaintainDesc: "Maintain current weight.",
        goalRecomp: "Recomposition", goalRecompDesc: "Lose fat and gain muscle (slower).",
        resTitle: "Your Dashboard", resSub: "Based on your stats, here is your customized plan.",
        lblDailyCalories: "Daily Target", lblDay: "day",
        secMacros: "Macronutrients", secMacrosSub: "Precise targets based on your goal.",
        lblProtein: "Protein", lblCarbs: "Carbs", lblFat: "Fat",
        secWater: "Hydration Target", lblLiters: "Liters", lblWaterSub: "Daily minimum intake",
        secFood: "Smart Food Sources", secFoodSub: "Local options to hit your targets.",
        foodItem: "Food", foodServing: "Typical Serving", foodMacro: "You Get",
        secBudget: "Budget Planner (₹)", secBudgetSub: "Select your daily budget to generate a sample meal plan.",
        secProgress: "Timeline Predictor", secProgressSub: "Estimated weight trajectory over 12 weeks.",
        secVitamins: "Micronutrients (ICMR RDA)",
        secReco: "Smart Recommendations",
        vitName: "Nutrient", vitTarget: "Daily Target",
        disclaimer: "Disclaimer: Results are estimates based on standard formulas. Consult a professional for medical advice.",
        foodProt1: "Soya Chunks", foodProt2: "Chicken Breast", foodProt3: "Paneer (Low Fat)", foodProt4: "Eggs (Whole)",
        foodCarb1: "White Rice", foodCarb2: "Oats", foodCarb3: "Chapati/Roti", foodCarb4: "Potato",
        foodFat1: "Peanuts", foodFat2: "Almonds", foodFat3: "Ghee", foodFat4: "Peanut Butter",
        recoWater: "Drink at least %L% liters of water daily.",
        recoSleep: "Aim for 7-8 hours of sleep to support recovery.",
        recoProtein: "Prioritize protein intake to reach %P%g.",
        recoDeficit: "Your deficit is aggressive. Ensure adequate micronutrient intake.",
        recoSurplus: "Your surplus is aggressive. Monitor body fat weekly."
    },
    hi: {
        heroTitle: "जानें आपके शरीर को क्या चाहिए।",
        heroSub: "कुछ ही सेकंड में कैलोरी, मैक्रोज़, पानी और पोषण लक्ष्य की गणना करें।",
        btnStart: "गणना शुरू करें",
        btnNext: "अगला",
        btnBack: "पीछे",
        btnCalculate: "परिणाम देखें",
        btnRecalculate: "पुनः गणना करें",
        step1Title: "इकाई का चयन", step1Sub: "आप कैसे मापना पसंद करते हैं?",
        lblWeightUnit: "वजन इकाई", lblHeightUnit: "ऊंचाई इकाई",
        step2Title: "शारीरिक आंकड़े", step2Sub: "कुछ बुनियादी माप दर्ज करें।",
        lblAge: "आयु (10-100)", lblGender: "लिंग", optMale: "पुरुष", optFemale: "महिला",
        lblWeight: "वजन", lblHeight: "ऊंचाई",
        errAge: "सही आयु दर्ज करें", errWeight: "सही वजन दर्ज करें", errHeight: "सही ऊंचाई दर्ज करें",
        step3Title: "गतिविधि स्तर", step3Sub: "आपकी दिनचर्या कितनी सक्रिय है?",
        act1Title: "गतिहीन (Sedentary)", act1Desc: "न के बराबर व्यायाम, डेस्क जॉब",
        act2Title: "हल्की सक्रिय (Light)", act2Desc: "हल्का व्यायाम सप्ताह में 1-3 दिन",
        act3Title: "मध्यम सक्रिय (Moderate)", act3Desc: "मध्यम व्यायाम सप्ताह में 3-5 दिन",
        act4Title: "अत्यधिक सक्रिय (Very Active)", act4Desc: "कठिन व्यायाम सप्ताह में 6-7 दिन",
        step4Title: "आपका लक्ष्य", step4Sub: "आप क्या हासिल करना चाहते हैं?",
        goalCut: "फैट लॉस (वजन कम करना)", goalCutDesc: "मांसपेशियों को बचाते हुए फैट कम करें।",
        goalBulkLean: "लीन बल्क (मांसपेशियां बढ़ाना)", goalBulkLeanDesc: "कम फैट के साथ मांसपेशियां बढ़ाएं।",
        goalBulkAgg: "एग्रेसिव बल्क", goalBulkAggDesc: "अधिकतम मांसपेशी वृद्धि।",
        goalMaintain: "रखरखाव (Maintenance)", goalMaintainDesc: "वर्तमान वजन बनाए रखें।",
        goalRecomp: "रीकम्पोज़िशन", goalRecompDesc: "फैट कम करें और मांसपेशियां बढ़ाएं।",
        resTitle: "आपका डैशबोर्ड", resSub: "आपके आंकड़ों के आधार पर यह आपकी योजना है।",
        lblDailyCalories: "दैनिक लक्ष्य", lblDay: "दिन",
        secMacros: "मैक्रोन्यूट्रिएंट्स", secMacrosSub: "आपके लक्ष्य के आधार पर सटीक लक्ष्य।",
        lblProtein: "प्रोटीन", lblCarbs: "कार्ब्स", lblFat: "वसा (फैट)",
        secWater: "पानी का लक्ष्य", lblLiters: "लीटर", lblWaterSub: "न्यूनतम दैनिक आवश्यकता",
        secFood: "स्थानीय खाद्य स्रोत", secFoodSub: "आपके लक्ष्य को पूरा करने के लिए।",
        foodItem: "भोजन", foodServing: "मात्रा (1 सर्विंग)", foodMacro: "मिलता है",
        secBudget: "बजट प्लानर (₹)", secBudgetSub: "अपने दैनिक बजट के अनुसार भोजन योजना बनाएं।",
        secProgress: "प्रगति अनुमान", secProgressSub: "12 हफ्तों में वजन का अनुमान।",
        secVitamins: "सूक्ष्म पोषक तत्व (ICMR RDA)",
        secReco: "स्मार्ट सुझाव",
        vitName: "पोषक तत्व", vitTarget: "दैनिक लक्ष्य",
        disclaimer: "अस्वीकरण: परिणाम मानक सूत्रों पर आधारित अनुमान हैं। चिकित्सा सलाह के लिए डॉक्टर से परामर्श लें।",
        foodProt1: "सोया चंक्स", foodProt2: "चिकन ब्रेस्ट", foodProt3: "पनीर (कम वसा)", foodProt4: "अंडे (साबुत)",
        foodCarb1: "सफ़ेद चावल", foodCarb2: "ओट्स", foodCarb3: "चपाती/रोटी", foodCarb4: "आलू",
        foodFat1: "मूंगफली", foodFat2: "बादाम", foodFat3: "घी", foodFat4: "पीनट बटर",
        recoWater: "प्रतिदिन कम से कम %L% लीटर पानी पिएं।",
        recoSleep: "रिकवरी के लिए 7-8 घंटे की नींद का लक्ष्य रखें।",
        recoProtein: "प्रोटीन सेवन को %P%g तक पहुँचाने को प्राथमिकता दें।",
        recoDeficit: "आपकी कैलोरी में कमी अधिक है। पर्याप्त सूक्ष्म पोषक तत्व लें।",
        recoSurplus: "आपकी कैलोरी अधिकता ज्यादा है। साप्ताहिक रूप से शरीर की वसा की निगरानी करें।"
    },
    kn: {
        heroTitle: "ನಿಮ್ಮ ದೇಹಕ್ಕೆ ಏನು ಬೇಕು ಎಂದು ತಿಳಿಯಿರಿ.",
        heroSub: "ಕೆಲವೇ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಕ್ಯಾಲೊರಿಗಳು, ಮ್ಯಾಕ್ರೋಗಳು, ನೀರು ಮತ್ತು ಪೋಷಣೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ.",
        btnStart: "ಲೆಕ್ಕಾಚಾರ ಪ್ರಾರಂಭಿಸಿ",
        btnNext: "ಮುಂದೆ",
        btnBack: "ಹಿಂದೆ",
        btnCalculate: "ಫಲಿತಾಂಶ ನೋಡಿ",
        btnRecalculate: "ಮರು ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ",
        step1Title: "ಘಟಕ ಆಯ್ಕೆ", step1Sub: "ನೀವು ಹೇಗೆ ಅಳೆಯಲು ಬಯಸುತ್ತೀರಿ?",
        lblWeightUnit: "ತೂಕದ ಘಟಕ", lblHeightUnit: "ಎತ್ತರದ ಘಟಕ",
        step2Title: "ದೇಹದ ಅಂಕಿಅಂಶಗಳು", step2Sub: "ಕೆಲವು ಮೂಲಭೂತ ಅಳತೆಗಳನ್ನು ನಮೂದಿಸಿ.",
        lblAge: "ವಯಸ್ಸು (10-100)", lblGender: "ಲಿಂಗ", optMale: "ಪುರುಷ", optFemale: "ಮಹಿಳೆ",
        lblWeight: "ತೂಕ", lblHeight: "ಎತ್ತರ",
        errAge: "ಸರಿಯಾದ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ", errWeight: "ಸರಿಯಾದ ತೂಕವನ್ನು ನಮೂದಿಸಿ", errHeight: "ಸರಿಯಾದ ಎತ್ತರವನ್ನು ನಮೂದಿಸಿ",
        step3Title: "ಚಟುವಟಿಕೆ ಮಟ್ಟ", step3Sub: "ನಿಮ್ಮ ದಿನಚರಿ ಎಷ್ಟು ಸಕ್ರಿಯವಾಗಿದೆ?",
        act1Title: "ಕುಳಿತು ಕೆಲಸ (Sedentary)", act1Desc: "ವ್ಯಾಯಾಮವಿಲ್ಲ, ಡೆಸ್ಕ್ ಕೆಲಸ",
        act2Title: "ಸ್ವಲ್ಪ ಸಕ್ರಿಯ (Light)", act2Desc: "ವಾರಕ್ಕೆ 1-3 ದಿನ ಲಘು ವ್ಯಾಯಾಮ",
        act3Title: "ಮಧ್ಯಮ ಸಕ್ರಿಯ (Moderate)", act3Desc: "ವಾರಕ್ಕೆ 3-5 ದಿನ ವ್ಯಾಯಾಮ",
        act4Title: "ತುಂಬಾ ಸಕ್ರಿಯ (Very Active)", act4Desc: "ವಾರಕ್ಕೆ 6-7 ದಿನ ಕಠಿಣ ವ್ಯಾಯಾಮ",
        step4Title: "ನಿಮ್ಮ ಗುರಿ", step4Sub: "ನೀವು ಏನನ್ನು ಸಾಧಿಸಲು ಬಯಸುತ್ತೀರಿ?",
        goalCut: "ಕೊಬ್ಬು ಕಡಿತ (Fat Loss)", goalCutDesc: "ಸ್ನಾಯು ಉಳಿಸಿಕೊಂಡು ಕೊಬ್ಬು ಕರಗಿಸಿ.",
        goalBulkLean: "ಸ್ನಾಯು বৃদ্ধি (Lean Bulk)", goalBulkLeanDesc: "ಕಡಿಮೆ ಕೊಬ್ಬಿನೊಂದಿಗೆ ಸ್ನಾಯು ಬೆಳೆಸಿ.",
        goalBulkAgg: "ಹೆಚ್ಚು ಸ್ನಾಯು (Aggressive Bulk)", goalBulkAggDesc: "ಗರಿಷ್ಠ ಸ್ನಾಯು বৃদ্ধি.",
        goalMaintain: "ನಿರ್ವಹಣೆ (Maintenance)", goalMaintainDesc: "ಪ್ರಸ್ತುತ ತೂಕವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳಿ.",
        goalRecomp: "ಮರುಸಂಯೋಜನೆ (Recomposition)", goalRecompDesc: "ಕೊಬ್ಬು ಕರಗಿಸಿ ಮತ್ತು ಸ್ನಾಯು ಬೆಳೆಸಿ.",
        resTitle: "ನಿಮ್ಮ ಡ್ಯಾಶ್ಬೋರ್ಡ್", resSub: "ನಿಮ್ಮ ಅಂಕಿಅಂಶಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಯೋಜನೆ.",
        lblDailyCalories: "ದೈನಂದಿನ ಗುರಿ", lblDay: "ದಿನ",
        secMacros: "ಮ್ಯಾಕ್ರೋನ್ಯೂಟ್ರಿಯೆಂಟ್ಸ್", secMacrosSub: "ನಿಮ್ಮ ಗುರಿಯ ಆಧಾರದ ಮೇಲೆ ನಿಖರ ಗುರಿಗಳು.",
        lblProtein: "ಪ್ರೋಟೀನ್", lblCarbs: "ಕಾರ್ಬ್ಸ್", lblFat: "ಕೊಬ್ಬು (Fat)",
        secWater: "ನೀರಿನ ಗುರಿ", lblLiters: "ಲೀಟರ್", lblWaterSub: "ಕನಿಷ್ಠ ದೈನಂದಿನ ಅವಶ್ಯಕತೆ",
        secFood: "ಸ್ಥಳೀಯ ಆಹಾರ ಮೂಲಗಳು", secFoodSub: "ನಿಮ್ಮ ಗುರಿ ತಲುಪಲು ಆಯ್ಕೆಗಳು.",
        foodItem: "ಆಹಾರ", foodServing: "ಸಾಮಾನ್ಯ ಪ್ರಮಾಣ", foodMacro: "ಸಿಗುತ್ತದೆ",
        secBudget: "ಬಜೆಟ್ ಪ್ಲಾನರ್ (₹)", secBudgetSub: "ನಿಮ್ಮ ದೈನಂದಿನ ಬಜೆಟ್ ಆಧಾರಿತ ಆಹಾರ ಯೋಜನೆ.",
        secProgress: "ಪ್ರಗತಿ ಅಂದಾಜು", secProgressSub: "12 ವಾರಗಳಲ್ಲಿ ತೂಕದ ಅಂದಾಜು.",
        secVitamins: "ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶಗಳು (ICMR RDA)",
        secReco: "ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಳು",
        vitName: "ಪೋಷಕಾಂಶ", vitTarget: "ದೈನಂದಿನ ಗುರಿ",
        disclaimer: "ಹಕ್ಕು ನಿರಾಕರಣೆ: ಫಲಿತಾಂಶಗಳು ಪ್ರಮಾಣಿತ ಸೂತ್ರಗಳ ಆಧಾರದ ಮೇಲಿನ ಅಂದಾಜುಗಳು. ವೈದ್ಯಕೀಯ ಸಲಹೆಗಾಗಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        foodProt1: "ಸೋಯಾ ಚಂಕ್ಸ್", foodProt2: "ಚಿಕನ್ ಬ್ರೆಸ್ಟ್", foodProt3: "ಪನೀರ್ (ಕಡಿಮೆ ಕೊಬ್ಬು)", foodProt4: "ಮೊಟ್ಟೆ (ಪೂರ್ಣ)",
        foodCarb1: "ಬಿಳಿ ಅನ್ನ", foodCarb2: "ಓಟ್ಸ್", foodCarb3: "ಚಪಾತಿ/ರೊಟ್ಟಿ", foodCarb4: "ಆಲೂಗಡ್ಡೆ",
        foodFat1: "ಕಡಲೆಕಾಯಿ", foodFat2: "ಬಾದಾಮಿ", foodFat3: "ತುಪ್ಪ", foodFat4: "ಪೀನಟ್ ಬಟರ್",
        recoWater: "ದಿನಕ್ಕೆ ಕನಿಷ್ಠ %L% ಲೀಟರ್ ನೀರು ಕುಡಿಯಿರಿ.",
        recoSleep: "ಚೇತರಿಕೆಗಾಗಿ 7-8 ಗಂಟೆಗಳ ನಿದ್ರೆಯ ಗುರಿ ಹೊಂದಿರಿ.",
        recoProtein: "ಪ್ರೋಟೀನ್ ಸೇವನೆಯನ್ನು %P%g ಗೆ ತಲುಪಲು ಆದ್ಯತೆ ನೀಡಿ.",
        recoDeficit: "ನಿಮ್ಮ ಕ್ಯಾಲೋರಿ ಕೊರತೆಯು ತೀವ್ರವಾಗಿದೆ. ಸಾಕಷ್ಟು ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶಗಳನ್ನು ಸೇವಿಸಿ.",
        recoSurplus: "ನಿಮ್ಮ ಕ್ಯಾಲೋರಿ ಹೆಚ್ಚಳ ತೀವ್ರವಾಗಿದೆ. ವಾರಕ್ಕೊಮ್ಮೆ ದೇಹದ ಕೊಬ್ಬನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ."
    }
};

// --- STATE ---
const state = {
    lang: localStorage.getItem('nutri_lang') || 'en',
    theme: localStorage.getItem('nutri_theme') || 'light',
    units: { weight: 'kg', height: 'cm' },
    step: 1,
    inputs: { age: null, gender: 'male', weightKg: null, heightCm: null },
    activity: 1.2,
    goal: 'maintain',
    budget: 200,
    results: {}
};

const activities = [
    { id: 1.2, key: 'act1', icon: 'ti-sofa' },
    { id: 1.375, key: 'act2', icon: 'ti-walk' },
    { id: 1.55, key: 'act3', icon: 'ti-bike' },
    { id: 1.9, key: 'act4', icon: 'ti-flame' }
];

const goals = [
    { id: 'cut', key: 'goalCut', type: 'cut', icon: 'ti-trending-down' },
    { id: 'recomp', key: 'goalRecomp', type: 'cut', icon: 'ti-refresh' },
    { id: 'maintain', key: 'goalMaintain', type: 'maintain', icon: 'ti-scale' },
    { id: 'bulk_lean', key: 'goalBulkLean', type: 'bulk', icon: 'ti-trending-up' },
    { id: 'bulk_agg', key: 'goalBulkAgg', type: 'bulk', icon: 'ti-barbell' }
];

// --- APP LOGIC ---
const app = {
    init() {
        this.applyTheme(state.theme);
        this.changeLang(state.lang, true);
        this.renderCards();
        
        // Unit events
        document.getElementById('inpHeightFt').addEventListener('input', this.syncHeightFtIn);
        document.getElementById('inpHeightIn').addEventListener('input', this.syncHeightFtIn);
    },

    // Theme Management
    toggleTheme() {
        const themes = ['light', 'dark', 'amoled'];
        let next = themes[(themes.indexOf(state.theme) + 1) % themes.length];
        this.applyTheme(next);
    },
    applyTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nutri_theme', theme);
        
        const btn = document.getElementById('themeBtn');
        btn.innerHTML = theme === 'light' ? '<i class="ti ti-moon"></i>' : (theme === 'dark' ? '<i class="ti ti-sun"></i>' : '<i class="ti ti-bulb"></i>');
    },

    // I18n Management
    changeLang(lang, init = false) {
        state.lang = lang;
        document.getElementById('langSelect').value = lang;
        localStorage.setItem('nutri_lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang][key]) el.innerHTML = i18n[lang][key];
        });

        if(!init) {
            this.renderCards(); // Re-render dynamic cards
            if(state.step > 4) {
                this.renderResults(); // Re-render results if already calculated
            }
        }
    },
    t(key) { return i18n[state.lang][key] || key; },

    // Navigation
    showView(viewId) {
        const current = document.querySelector('.view.active');
        const next = document.getElementById(`view-${viewId}`);
        if (!current || current === next) return;

        // Animate outgoing view
        current.classList.add('view-exiting');
        setTimeout(() => {
            current.classList.remove('active', 'view-exiting');
        }, 300);

        // Animate incoming view
        next.classList.add('active', 'view-entering');
        setTimeout(() => next.classList.remove('view-entering'), 450);

        window.scrollTo(0, 0);
    },
    startWizard() {
        state.step = 1;
        // Only switch views if there is a hero view to leave (index.html has it; calculator.html does not)
        if (document.getElementById('view-hero')) {
            this.showView('wizard');
        }
        // Reset slide track immediately (no animation on first entry)
        const track = document.getElementById('stepsTrack');
        if (track) { track.style.transition = 'none'; track.style.transform = 'translateX(0)'; }
        setTimeout(() => { if (track) track.style.transition = ''; }, 50);
        this.updateWizardUI();
    },
    nextStep() {
        if (this.validateStep(state.step)) {
            state.step++;
            this.updateWizardUI();
        }
    },
    prevStep() {
        state.step--;
        this.updateWizardUI();
    },
    updateWizardUI() {
        // Slide the track
        const track = document.getElementById('stepsTrack');
        if (track) track.style.transform = `translateX(-${(state.step - 1) * 100}%)`;

        // Update progress bar (only present on calculator.html)
        const pb = document.getElementById('progressBar');
        if (pb) pb.style.width = `${(state.step / 4) * 100}%`;

        // Update step dots
        for (let i = 1; i <= 4; i++) {
            const dot = document.getElementById(`dot-${i}`);
            if (dot) dot.classList.toggle('active', i === state.step);
        }
    },

    // Unit toggles
    setUnit(type, unit, el) {
        state.units[type] = unit;
        document.querySelectorAll(`#seg${type.charAt(0).toUpperCase() + type.slice(1)} .segmented-btn`).forEach(b => b.classList.remove('active'));
        if (el) el.classList.add('active');

        if (type === 'weight') {
            document.getElementById('lblWeightUnitDisp').innerText = unit;
            // Auto convert current value if exists
            const inp = document.getElementById('inpWeight');
            if(inp.value) {
                inp.value = unit === 'kg' ? (inp.value / 2.20462).toFixed(1) : (inp.value * 2.20462).toFixed(1);
            }
        } else if (type === 'height') {
            if (unit === 'cm') {
                document.getElementById('groupHeightCm').style.display = 'block';
                document.getElementById('groupHeightFt').style.display = 'none';
            } else {
                document.getElementById('groupHeightCm').style.display = 'none';
                document.getElementById('groupHeightFt').style.display = 'block';
                // Convert CM to FT/IN
                const cm = document.getElementById('inpHeightCm').value;
                if(cm) {
                    const totalInches = cm / 2.54;
                    document.getElementById('inpHeightFt').value = Math.floor(totalInches / 12);
                    document.getElementById('inpHeightIn').value = Math.round(totalInches % 12);
                }
            }
        }
    },
    syncHeightFtIn() {
        const ft = parseInt(document.getElementById('inpHeightFt').value) || 0;
        const inc = parseInt(document.getElementById('inpHeightIn').value) || 0;
        document.getElementById('inpHeightCm').value = Math.round((ft * 12 + inc) * 2.54);
    },

    // Validation
    validateStep(s) {
        let valid = true;
        if (s === 2) {
            const age = parseInt(document.getElementById('inpAge').value);
            const w = parseFloat(document.getElementById('inpWeight').value);
            const h = parseFloat(document.getElementById('inpHeightCm').value);

            if (!age || age < 10 || age > 100) { document.getElementById('errAge').style.display='block'; valid=false; } 
            else { document.getElementById('errAge').style.display='none'; state.inputs.age = age; }

            if (!w || w <= 0) { document.getElementById('errWeight').style.display='block'; valid=false; } 
            else { 
                document.getElementById('errWeight').style.display='none'; 
                state.inputs.weightKg = state.units.weight === 'kg' ? w : w / 2.20462;
            }

            if (!h || h <= 0) { document.getElementById('errHeight').style.display='block'; valid=false; } 
            else { 
                document.getElementById('errHeight').style.display='none'; 
                state.inputs.heightCm = h;
            }
            state.inputs.gender = document.getElementById('inpGender').value;
        }
        return valid;
    },

    // Render Cards
    renderCards() {
        // Activity
        const ag = document.getElementById('activityGrid');
        ag.innerHTML = activities.map(a => `
            <div class="selectable-card ${state.activity === a.id ? 'selected' : ''}" onclick="app.setActivity(${a.id})">
                <i class="ti ${a.icon}"></i>
                <h4>${this.t(a.key + 'Title')}</h4>
                <p>${this.t(a.key + 'Desc')}</p>
            </div>
        `).join('');

        // Goals
        const gg = document.getElementById('goalGrid');
        gg.innerHTML = goals.map(g => `
            <div class="selectable-card goal-${g.type} ${state.goal === g.id ? 'selected' : ''}" onclick="app.setGoal('${g.id}')">
                <i class="ti ${g.icon}"></i>
                <h4>${this.t(g.key)}</h4>
                <p>${this.t(g.key + 'Desc')}</p>
            </div>
        `).join('');
    },
    setActivity(id) { state.activity = id; this.renderCards(); },
    setGoal(id) { state.goal = id; this.renderCards(); },

    // Engine
    calculateAndShowResults() {
        const i = state.inputs;
        // BMR Mifflin-St Jeor
        let bmr = (10 * i.weightKg) + (6.25 * i.heightCm) - (5 * i.age);
        bmr += (i.gender === 'male' ? 5 : -161);
        
        const tdee = bmr * state.activity;
        let cal = tdee;
        let goalType = 'maintain';

        if(state.goal === 'cut') { cal = tdee - 500; goalType = 'cut'; }
        else if(state.goal === 'recomp') { cal = tdee - 250; goalType = 'cut'; }
        else if(state.goal === 'bulk_lean') { cal = tdee + 250; goalType = 'bulk'; }
        else if(state.goal === 'bulk_agg') { cal = tdee + 500; goalType = 'bulk'; }

        // Macros
        let p_g, f_g, c_g;
        if(goalType === 'cut') {
            p_g = i.weightKg * 2.2;
            f_g = i.weightKg * 0.8;
        } else if(goalType === 'bulk') {
            p_g = i.weightKg * 2.0;
            f_g = i.weightKg * 1.0;
        } else { // maintain
            p_g = i.weightKg * 1.8;
            f_g = i.weightKg * 1.0;
        }
        
        const p_cal = p_g * 4;
        const f_cal = f_g * 9;
        const c_cal = cal - (p_cal + f_cal);
        c_g = Math.max(0, c_cal / 4);

        state.results = {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            cal: Math.round(cal),
            p: Math.round(p_g),
            f: Math.round(f_g),
            c: Math.round(c_g),
            goalType: goalType,
            water: (i.weightKg * 0.033).toFixed(1)
        };

        this.renderResults();
        this.showView('results');
        state.step++; // Mark as finished
    },

    // Render Results
    renderResults() {
        const r = state.results;
        
        document.getElementById('calHero').setAttribute('data-goal', r.goalType);
        document.getElementById('resTDEE').innerText = r.tdee;
        document.getElementById('resBMR').innerText = r.bmr;
        document.getElementById('resWater').innerText = r.water;

        // Animate Calories
        this.animateValue('resCalories', 0, r.cal, 1000);

        // Animate Macro Rings
        const setRing = (id, val, max, textId) => {
            const circle = document.getElementById(id);
            const circumference = 2 * Math.PI * 40; // r=40
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
            document.getElementById(textId).innerText = val;
            
            setTimeout(() => {
                const offset = circumference - (Math.min(val / max, 1) * circumference);
                circle.style.strokeDashoffset = Math.max(0, offset);
            }, 150);
        };
        
        // Approximate max for ring scale (just visual)
        const totalMacros = r.p + r.f + r.c;
        setRing('ringP', r.p, totalMacros * 0.5, 'valP');
        setRing('ringC', r.c, totalMacros * 0.6, 'valC');
        setRing('ringF', r.f, totalMacros * 0.4, 'valF');

        // Water fill
        setTimeout(() => {
            document.getElementById('waterFill').style.height = '80%';
        }, 150);

        // Populate Vitamins
        const isFemale = state.inputs.gender === 'female';
        const vits = [
            { n: 'Vitamin D', t: '600-800 IU' },
            { n: 'Vitamin C', t: '65-90 mg' },
            { n: 'Iron', t: isFemale ? '18 mg' : '8 mg' },
            { n: 'Calcium', t: '1000 mg' },
            { n: 'Magnesium', t: '310-420 mg' },
            { n: 'Zinc', t: isFemale ? '8 mg' : '11 mg' },
            { n: 'Vitamin B12', t: '2.4 mcg' },
            { n: 'Potassium', t: '3500 mg' }
        ];
        document.getElementById('vitTable').innerHTML = `
            <tr><th>${this.t('vitName')}</th><th>${this.t('vitTarget')}</th></tr>
            ${vits.map(v => `<tr><td>${v.n}</td><td>${v.t}</td></tr>`).join('')}
        `;

        // Render Chart
        this.renderChart(r.goalType, state.inputs.weightKg);

        // Init Food and Budget
        this.showFood('protein');
        this.showBudget(state.budget);
        this.renderRecommendations();
    },

    // Charting logic (SVG)
    renderChart(goalType, startW) {
        const svg = document.getElementById('predChart');
        svg.innerHTML = '';
        const w = svg.clientWidth || 600;
        const h = 200;
        const pad = 30;
        
        let data = [];
        let changePerWeek = goalType === 'cut' ? -0.5 : (goalType === 'bulk' ? 0.25 : 0);
        for(let i=0; i<=12; i+=4) {
            data.push({ x: i, y: startW + (changePerWeek * i) });
        }

        const minW = Math.min(...data.map(d=>d.y)) - 2;
        const maxW = Math.max(...data.map(d=>d.y)) + 2;

        // Grid
        for(let i=0; i<3; i++) {
            const y = pad + i * ((h - pad*2) / 2);
            svg.innerHTML += `<line x1="${pad}" y1="${y}" x2="${w-pad}" y2="${y}" class="chart-grid"/>`;
        }

        // Line
        let path = `M ${pad} ${h - pad - ((data[0].y - minW) / (maxW - minW) * (h - pad*2))}`;
        data.forEach((d, i) => {
            const cx = pad + (d.x / 12) * (w - pad*2);
            const cy = h - pad - ((d.y - minW) / (maxW - minW) * (h - pad*2));
            if(i>0) path += ` L ${cx} ${cy}`;
            
            // Label
            svg.innerHTML += `<text x="${cx}" y="${h-5}" class="chart-text" text-anchor="middle">Wk ${d.x}</text>`;
            svg.innerHTML += `<circle cx="${cx}" cy="${cy}" r="4" fill="var(--primary)" />`;
            svg.innerHTML += `<text x="${cx}" y="${cy-10}" class="chart-text" text-anchor="middle">${d.y.toFixed(1)}kg</text>`;
        });
        
        svg.innerHTML += `<path d="${path}" class="chart-line"/>`;
    },

    // Food Engine
    showFood(macro) {
        document.querySelectorAll('#segFood .segmented-btn').forEach((b, i) => {
            b.classList.remove('active');
            if (['protein','carbs','fat'][i] === macro) b.classList.add('active');
        });

        let list = [];
        if(macro === 'protein') {
            list = [
                { n: this.t('foodProt1'), s: '50g (dry)',   m: '~25g protein' },
                { n: this.t('foodProt2'), s: '100g',        m: '~31g protein' },
                { n: this.t('foodProt3'), s: '100g',        m: '~18g protein' },
                { n: this.t('foodProt4'), s: '2 whole',     m: '~12g protein' }
            ];
        } else if(macro === 'carbs') {
            list = [
                { n: this.t('foodCarb1'), s: '1 cup (raw)', m: '~80g carbs' },
                { n: this.t('foodCarb2'), s: '1 cup (dry)', m: '~54g carbs' },
                { n: this.t('foodCarb3'), s: '2 rotis',     m: '~40g carbs' },
                { n: this.t('foodCarb4'), s: '1 medium',    m: '~26g carbs' }
            ];
        } else {
            list = [
                { n: this.t('foodFat1'), s: 'Small handful', m: '~14g fat' },
                { n: this.t('foodFat2'), s: '20–25 pieces',  m: '~14g fat' },
                { n: this.t('foodFat3'), s: '1 tbsp (12g)',  m: '~10g fat' },
                { n: this.t('foodFat4'), s: '2 tbsp (32g)',  m: '~16g fat' }
            ];
        }

        document.getElementById('foodTable').innerHTML = `
            <tr><th>${this.t('foodItem')}</th><th>${this.t('foodServing')}</th><th>${this.t('foodMacro')}</th></tr>
            ${list.map(f => `<tr><td>${f.n}</td><td style="color:var(--text-muted);">${f.s}</td><td style="font-weight:600;color:var(--primary);">${f.m}</td></tr>`).join('')}
        `;
    },

    // Budget Planner
    showBudget(amt) {
        state.budget = amt;
        document.querySelectorAll('#segBudget .segmented-btn').forEach(b => {
            b.classList.remove('active');
            if(b.innerText.includes(String(amt))) b.classList.add('active');
        });

        let plan = '';
        if(amt === 100) {
            plan = `<ul>
                <li>${this.t('foodProt4')} (4x)</li>
                <li>${this.t('foodProt1')} (100g)</li>
                <li>${this.t('foodCarb1')} (200g)</li>
                <li>${this.t('foodFat1')} (50g)</li>
            </ul>`;
        } else if(amt === 200) {
            plan = `<ul>
                <li>${this.t('foodProt4')} (4x)</li>
                <li>${this.t('foodProt2')} (150g)</li>
                <li>${this.t('foodCarb2')} (100g)</li>
                <li>${this.t('foodFat4')} (30g)</li>
            </ul>`;
        } else if(amt === 300) {
            plan = `<ul>
                <li>${this.t('foodProt4')} (4x)</li>
                <li>${this.t('foodProt2')} (250g)</li>
                <li>${this.t('foodCarb2')} (100g)</li>
                <li>${this.t('foodFat2')} (30g)</li>
            </ul>`;
        } else {
            plan = `<ul>
                <li>${this.t('foodProt4')} (4x)</li>
                <li>${this.t('foodProt2')} (250g)</li>
                <li>${this.t('foodProt3')} (200g)</li>
                <li>${this.t('foodFat2')} (50g)</li>
            </ul>`;
        }
        document.getElementById('budgetPlan').innerHTML = plan;
    },

    // Recommendations
    renderRecommendations() {
        const r = state.results;
        const i = state.inputs;
        let recos = [];

        recos.push({ icon: 'ti-droplet', text: this.t('recoWater').replace('%L%', r.water) });
        recos.push({ icon: 'ti-moon', text: this.t('recoSleep') });
        recos.push({ icon: 'ti-meat', text: this.t('recoProtein').replace('%P%', r.p) });

        if(r.cal < r.tdee - 600) {
            recos.push({ icon: 'ti-alert-circle', text: this.t('recoDeficit') });
        }
        if(r.cal > r.tdee + 600) {
            recos.push({ icon: 'ti-alert-triangle', text: this.t('recoSurplus') });
        }

        document.getElementById('recoList').innerHTML = recos.map(rc => `
            <div class="reco-item">
                <div class="reco-icon"><i class="ti ${rc.icon}"></i></div>
                <div>${rc.text}</div>
            </div>
        `).join('');
    },

    // Utils
    animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    },
    resetWizard() {
        state.step = 1;
        this.showView('wizard');
        setTimeout(() => this.updateWizardUI(), 350);
    }
};

// Initialize on load (index.html uses this directly;
// calculator.html overrides with its own window.onload that also calls startWizard)
if (!window._nutritionOSCalcPage) {
    window.addEventListener('load', () => app.init());
}
