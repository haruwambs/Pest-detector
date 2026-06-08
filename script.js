// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    maxRequests: 8,
    cacheEnabled: true
};

// ============================================
// PEST SEARCH TERMS FOR WIKIPEDIA API
// ============================================
const PEST_SEARCH = {
    maize: {
        holes: ["Fall armyworm", "Corn earworm", "African armyworm", "Spodoptera frugiperda"],
        chewed: ["African armyworm", "Grasshopper pest", "Locust"],
        yellowing: ["Maize streak virus", "Corn stunt disease"],
        spots: ["Northern corn leaf blight", "Gray leaf spot maize", "Southern corn leaf blight"],
        rust: ["Corn rust", "Puccinia sorghi", "Southern rust maize"],
        tunnels: ["European corn borer", "African stem borer maize", "Busseola fusca"],
        rot: ["Corn smut", "Ustilago maydis", "Fusarium ear rot"],
        stunted: ["Maize dwarf mosaic virus"]
    },
    rice: {
        holes: ["Rice leaf roller", "Cnaphalocrocis medinalis", "Rice skipper"],
        chewed: ["Rice grasshopper", "Rice caterpillar"],
        yellowing: ["Brown planthopper", "Nilaparvata lugens", "Rice tungro disease"],
        spots: ["Rice blast", "Magnaporthe oryzae", "Brown spot rice"],
        tunnels: ["Rice stem borer", "Scirpophaga incertulas", "Yellow stem borer rice"],
        rot: ["Sheath blight rice", "Rhizoctonia solani", "Bacterial blight rice"],
        stunted: ["Rice dwarf virus", "Rice grassy stunt virus"]
    },
    tomato: {
        holes: ["Tomato fruitworm", "Helicoverpa armigera", "Tomato hornworm"],
        chewed: ["Tomato hornworm", "Manduca quinquemaculata"],
        spots: ["Tomato late blight", "Phytophthora infestans", "Early blight tomato", "Alternaria solani"],
        curling: ["Tomato yellow leaf curl virus", "Tomato leaf curl virus"],
        yellowing: ["Tomato spotted wilt virus", "Fusarium wilt tomato"],
        rot: ["Tomato bacterial wilt", "Ralstonia solanacearum", "Blossom end rot"],
        tunnels: ["Tomato leaf miner", "Tuta absoluta", "Phthorimaea absoluta"],
        stunted: ["Root-knot nematode tomato", "Meloidogyne incognita"]
    },
    cassava: {
        yellowing: ["African cassava mosaic virus", "Cassava mosaic disease"],
        stunted: ["Cassava brown streak disease", "Cassava brown streak virus"],
        spots: ["Cassava bacterial blight", "Xanthomonas axonopodis"],
        rot: ["Cassava root rot", "Phytophthora cassava"],
        holes: ["Cassava green mite", "Mononychellus tanajoa", "Cassava mealybug"],
        curling: ["Cassava mosaic virus"]
    },
    citrus: {
        curling: ["Citrus leafminer", "Phyllocnistis citrella"],
        yellowing: ["Citrus greening disease", "Huanglongbing", "Candidatus Liberibacter"],
        spots: ["Citrus canker", "Xanthomonas citri", "Citrus black spot"],
        sticky: ["Citrus aphid", "Toxoptera citricida", "Citrus mealybug"],
        rot: ["Citrus brown rot", "Phytophthora citrophthora"]
    },
    coffee: {
        rust: ["Coffee leaf rust", "Hemileia vastatrix"],
        holes: ["Coffee berry borer", "Hypothenemus hampei"],
        spots: ["Coffee leaf spot", "Cercospora coffeicola"],
        rot: ["Coffee root rot", "Armillaria coffee"],
        yellowing: ["Coffee wilt disease"]
    },
    banana: {
        yellowing: ["Banana bunchy top virus", "Panama disease banana", "Fusarium wilt banana"],
        spots: ["Black sigatoka", "Sigatoka banana", "Mycosphaerella fijiensis"],
        rot: ["Banana bacterial wilt", "Xanthomonas campestris banana"],
        holes: ["Banana weevil", "Cosmopolites sordidus"],
        stunted: ["Banana bunchy top virus"]
    },
    cotton: {
        holes: ["Cotton bollworm", "Helicoverpa armigera", "Cotton leafworm"],
        curling: ["Cotton leaf curl virus"],
        spots: ["Cotton leaf spot", "Alternaria cotton"],
        yellowing: ["Cotton aphid", "Aphis gossypii"],
        sticky: ["Cotton aphid", "Whitefly cotton"]
    },
    soybean: {
        holes: ["Soybean looper", "Chrysodeixis includens"],
        yellowing: ["Soybean aphid", "Aphis glycines", "Soybean cyst nematode"],
        spots: ["Soybean rust", "Phakopsora pachyrhizi", "Frogeye leaf spot soybean"],
        rot: ["Soybean root rot", "Phytophthora sojae"]
    },
    potato: {
        holes: ["Colorado potato beetle", "Leptinotarsa decemlineata", "Potato tuber moth"],
        spots: ["Potato late blight", "Phytophthora infestans", "Early blight potato"],
        rot: ["Potato bacterial wilt", "Potato soft rot"],
        yellowing: ["Potato virus Y", "Potato leafroll virus"]
    },
    mango: {
        holes: ["Mango seed weevil", "Mango fruit fly"],
        spots: ["Mango anthracnose", "Colletotrichum gloeosporioides"],
        powder: ["Mango powdery mildew", "Oidium mangiferae"],
        rot: ["Mango bacterial black spot"]
    },
    groundnut: {
        holes: ["Groundnut leaf miner", "Aproaerema modicella"],
        spots: ["Groundnut leaf spot", "Cercospora arachidicola"],
        rot: ["Groundnut stem rot", "Sclerotium rolfsii"],
        yellowing: ["Groundnut rosette virus"],
        stunted: ["Root-knot nematode groundnut"]
    },
    wheat: {
        holes: ["Wheat stem sawfly", "Cereal leaf beetle", "Wheat aphid"],
        chewed: ["Armyworm wheat", "Cutworm wheat", "Grasshopper wheat"],
        yellowing: ["Wheat streak mosaic virus", "Barley yellow dwarf virus", "Wheat yellow rust"],
        spots: ["Septoria leaf blotch wheat", "Tan spot wheat", "Wheat leaf rust"],
        rust: ["Wheat stem rust", "Puccinia graminis", "Stripe rust wheat", "Puccinia striiformis"],
        powder: ["Wheat powdery mildew", "Blumeria graminis"],
        rot: ["Wheat scab", "Fusarium head blight", "Common bunt wheat", "Wheat take-all"],
        stunted: ["Wheat take-all disease", "Gaeumannomyces graminis", "Wheat soilborne mosaic"]
    },
    sorghum: {
        holes: ["Sorghum stem borer", "Sorghum shoot fly", "Atherigona soccata"],
        chewed: ["Sorghum armyworm", "Sorghum head caterpillar"],
        yellowing: ["Sorghum aphid", "Melanaphis sacchari", "Sorghum yellow banding virus"],
        spots: ["Sorghum leaf blight", "Exserohilum turcicum", "Sorghum anthracnose"],
        rust: ["Sorghum rust", "Puccinia purpurea"],
        rot: ["Sorghum grain mold", "Fusarium sorghum", "Sorghum charcoal rot"],
        stunted: ["Sorghum downy mildew", "Sorghum mosaic virus", "Striga weed sorghum"]
    },
    sugarcane: {
        holes: ["Sugarcane stem borer", "Diatraea saccharalis", "Sugarcane top borer"],
        chewed: ["Sugarcane woolly aphid", "Sugarcane leafhopper"],
        yellowing: ["Sugarcane yellow leaf virus", "Sugarcane mosaic virus", "Sugarcane chlorotic streak"],
        spots: ["Sugarcane leaf spot", "Sugarcane rust", "Sugarcane eye spot"],
        rust: ["Sugarcane rust", "Puccinia melanocephala", "Sugarcane orange rust"],
        rot: ["Sugarcane red rot", "Colletotrichum falcatum", "Sugarcane pineapple disease"],
        stunted: ["Sugarcane ratoon stunting", "Sugarcane grassy shoot", "Sugarcane white leaf"]
    },
    coconut: {
        holes: ["Coconut leaf caterpillar", "Coconut rhinoceros beetle", "Oryctes rhinoceros"],
        chewed: ["Coconut hispine beetle", "Brontispa longissima", "Coconut skipper"],
        yellowing: ["Coconut lethal yellowing", "Coconut cadang-cadang viroid", "Coconut root wilt"],
        spots: ["Coconut leaf spot", "Coconut gray leaf spot", "Pestalotiopsis palmarum"],
        rot: ["Coconut bud rot", "Phytophthora palmivora", "Coconut stem bleeding"],
        stunted: ["Coconut tinangaja disease", "Coconut foliar decay", "Lethal bole rot coconut"],
        sticky: ["Coconut scale insect", "Aspidiotus destructor", "Coconut mealybug"]
    },
    tea: {
        holes: ["Tea mosquito bug", "Helopeltis theivora", "Tea leaf roller"],
        chewed: ["Tea looper caterpillar", "Biston suppressaria", "Tea tortrix"],
        yellowing: ["Tea yellow tea thrips", "Scirtothrips dorsalis", "Tea aphid"],
        spots: ["Tea leaf spot", "Tea blister blight", "Exobasidium vexans"],
        rust: ["Tea rust", "Tea root rot disease"],
        rot: ["Tea root rot", "Tea brown root rot", "Phellinus noxius"],
        stunted: ["Tea red spider mite", "Oligonychus coffeae", "Tea nematode"],
        powder: ["Tea powdery mildew"]
    },
    apple: {
        holes: ["Apple codling moth", "Cydia pomonella", "Apple aphid"],
        chewed: ["Apple sawfly", "Winter moth apple", "Apple leaf roller"],
        yellowing: ["Apple chlorotic leaf spot virus", "Apple mosaic virus"],
        spots: ["Apple scab", "Venturia inaequalis", "Apple leaf spot", "Marssonina apple blotch"],
        rust: ["Apple cedar rust", "Gymnosporangium juniperi-virginianae", "Apple rust mite"],
        powder: ["Apple powdery mildew", "Podosphaera leucotricha"],
        rot: ["Apple bitter rot", "Apple black rot", "Apple brown rot", "Monilinia fructigena"],
        stunted: ["Apple replant disease", "Apple root rot", "Phytophthora apple"],
        curling: ["Apple leaf curling aphid", "Dysaphis devecta", "Rosy apple aphid"]
    },
    grape: {
        holes: ["Grape berry moth", "Grape phylloxera", "Daktulosphaira vitifoliae"],
        chewed: ["Grape leafhopper", "Japanese beetle grape", "Grape flea beetle"],
        yellowing: ["Grape fanleaf virus", "Grape leafroll disease", "Grapevine yellow speckle"],
        spots: ["Grape downy mildew", "Grape powdery mildew", "Grape black rot"],
        rust: ["Grape rust", "Phakopsora grape"],
        powder: ["Grape powdery mildew", "Uncinula necator", "Oidium grape"],
        rot: ["Grape bunch rot", "Botrytis cinerea", "Grape sour rot", "Grape ripe rot"],
        stunted: ["Grape root rot", "Armillaria grape", "Grape nematode"],
        curling: ["Grape leafroll virus", "Grapevine fanleaf degeneration"]
    },
    strawberry: {
        holes: ["Strawberry aphid", "Strawberry leaf beetle", "Strawberry blossom weevil"],
        chewed: ["Strawberry root weevil", "Otiorhynchus ovatus", "Strawberry sawfly"],
        yellowing: ["Strawberry mild yellow edge virus", "Strawberry mottle virus"],
        spots: ["Strawberry leaf spot", "Strawberry angular leaf spot", "Strawberry leaf scorch"],
        rot: ["Strawberry gray mold", "Botrytis fruit rot", "Strawberry black root rot", "Strawberry red stele"],
        powder: ["Strawberry powdery mildew", "Sphaerotheca macularis"],
        stunted: ["Strawberry nematode", "Aphelenchoides fragariae", "Strawberry crown rot"],
        curling: ["Strawberry aphid curling", "Strawberry crinkle virus"],
        sticky: ["Strawberry aphid honeydew", "Strawberry tarsonemid mite"]
    },
    sweet_potato: {
        holes: ["Sweet potato weevil", "Cylas formicarius", "Sweet potato hornworm"],
        chewed: ["Sweet potato looper", "Sweet potato leaf folder", "Sweet potato tortoise beetle"],
        yellowing: ["Sweet potato virus disease", "Sweet potato chlorotic stunt virus", "Sweet potato feathery mottle virus"],
        spots: ["Sweet potato leaf spot", "Sweet potato scab", "Elsinoe batatas"],
        rot: ["Sweet potato black rot", "Ceratocystis fimbriata", "Sweet potato soft rot", "Rhizopus soft rot"],
        stunted: ["Sweet potato stem rot", "Fusarium wilt sweet potato", "Root-knot nematode sweet potato"],
        curling: ["Sweet potato leaf curl virus", "Sweet potato whitefly"]
    },
    oil_palm: {
        holes: ["Oil palm bagworm", "Metisa plana", "Oil palm leaf miner"],
        chewed: ["Oil palm nettle caterpillar", "Darna trima", "Oil palm slug caterpillar"],
        yellowing: ["Oil palm bud rot", "Oil palm lethal yellowing"],
        spots: ["Oil palm leaf spot", "Oil palm anthracnose"],
        rot: ["Oil palm basal stem rot", "Ganoderma boninense", "Oil palm trunk rot"],
        stunted: ["Oil palm crown disease", "Oil palm little leaf syndrome"],
        sticky: ["Oil palm mealybug", "Oil palm scale insect"]
    },
    rubber: {
        holes: ["Rubber leaf caterpillar", "Rubber leaf miner"],
        yellowing: ["Rubber leaf blight", "Rubber yellow leaf disease"],
        spots: ["Rubber leaf spot", "Colletotrichum rubber", "Rubber powdery mildew"],
        rot: ["Rubber white root disease", "Rigidoporus microporus", "Rubber brown root disease"],
        stunted: ["Rubber red root disease", "Rubber nematode"]
    },
    tobacco: {
        holes: ["Tobacco budworm", "Heliothis virescens", "Tobacco hornworm", "Manduca sexta"],
        chewed: ["Tobacco cutworm", "Spodoptera litura", "Tobacco flea beetle"],
        yellowing: ["Tobacco mosaic virus", "Tobacco etch virus", "Tobacco vein mottling virus"],
        spots: ["Tobacco leaf spot", "Tobacco brown spot", "Alternaria tobacco"],
        rot: ["Tobacco black shank", "Phytophthora nicotianae", "Tobacco root rot"],
        stunted: ["Tobacco rattle virus", "Root-knot nematode tobacco", "Tobacco stunt"],
        curling: ["Tobacco leaf curl virus", "Tobacco aphid curling"]
    },
    peach: {
        holes: ["Peach fruit fly", "Bactrocera zonata", "Peach twig borer"],
        chewed: ["Peach aphid", "Myzus persicae", "Peach tree borer"],
        yellowing: ["Peach leaf curl", "Peach yellows phytoplasma", "Peach mosaic virus"],
        spots: ["Peach leaf spot", "Peach scab", "Cladosporium carpophilum"],
        rot: ["Peach brown rot", "Monilinia fructicola", "Peach root rot"],
        powder: ["Peach powdery mildew", "Sphaerotheca pannosa"],
        stunted: ["Peach root-knot nematode", "Peach replant disease", "Armillaria root rot peach"],
        curling: ["Peach leaf curl", "Taphrina deformans", "Peach silver leaf"]
    },
    pear: {
        holes: ["Pear codling moth", "Pear psylla", "Cacopsylla pyricola"],
        chewed: ["Pear slug sawfly", "Pear leaf roller", "Pear aphid"],
        yellowing: ["Pear decline phytoplasma", "Pear stony pit virus"],
        spots: ["Pear scab", "Venturia pirina", "Pear leaf spot", "Fabraea leaf spot"],
        rust: ["Pear rust", "Gymnosporangium sabinae", "Pear trellis rust"],
        rot: ["Pear fire blight", "Erwinia amylovora", "Pear brown rot"],
        stunted: ["Pear root rot", "Phytophthora pear", "Pear nematode"]
    }
};

// ============================================
// GENERIC PEST SEARCH TERMS
// ============================================
const GENERIC_PESTS = {
    aphid: "Aphid pest agriculture",
    caterpillar: "Caterpillar pest crop",
    whitefly: "Whitefly Bemisia tabaci agriculture",
    mite: "Spider mite Tetranychus crop pest",
    mealybug: "Mealybug Pseudococcidae pest",
    thrips: "Thrips Thysanoptera crop pest",
    nematode: "Root-knot nematode Meloidogyne",
    locust: "Locust Schistocerca pest",
    grasshopper: "Grasshopper pest agriculture",
    powdery_mildew: "Powdery mildew plant disease",
    rust: "Rust fungus plant disease",
    blight: "Blight plant disease",
    wilt: "Wilt disease plant",
    mosaic: "Mosaic virus plant",
    smut: "Smut fungus plant disease",
    cutworm: "Cutworm Noctuidae pest agriculture",
    bollworm: "Bollworm Helicoverpa pest cotton maize",
    fruit_fly: "Fruit fly Tephritidae pest agriculture",
    scale_insect: "Scale insect Coccoidea pest plant",
    leafhopper: "Leafhopper Cicadellidae pest agriculture",
    stink_bug: "Stink bug Pentatomidae pest agriculture",
    termite: "Termite Isoptera pest agriculture crop",
    bacterial_wilt: "Bacterial wilt Ralstonia plant disease",
    leaf_curl: "Leaf curl virus plant disease",
    root_rot: "Root rot Phytophthora plant disease",
    damping_off: "Damping off Pythium plant disease",
    downy_mildew: "Downy mildew plant disease",
    chlorosis: "Chlorosis plant nutrient deficiency",
    canker: "Canker plant disease bacterial fungal"
};

// ============================================
// INTEGRATED PEST MANAGEMENT ADVICE
// ============================================
const IPM_ADVICE = {
    "armyworm": {
        advice: "Apply Bt (Bacillus thuringiensis) or neem oil immediately. Monitor field daily for one week. Early detection is critical as larvae are most vulnerable in early stages.",
        control: {
            biological: "Bt spray, neem oil, spinosad, beneficial nematodes",
            cultural: "Early planting, crop rotation with non-host crops, dig trench barriers around field",
            chemical: "Emamectin benzoate or lambda-cyhalothrin (last resort only, follow label instructions)"
        }
    },
    "borer": {
        advice: "Apply neem oil or Bt granules into the plant whorl. Remove and destroy infected stalks. Practice crop rotation with legumes.",
        control: {
            biological: "Bt granules, neem oil, Trichogramma parasitic wasps",
            cultural: "Destroy crop residue after harvest, rotate with non-host crops, plant resistant varieties",
            chemical: "Carbofuran granules at plant base (last resort, highly toxic - use protective equipment)"
        }
    },
    "aphid": {
        advice: "Spray with soapy water solution (1 tablespoon soap per liter of water) or neem oil. Introduce natural predators like ladybugs and lacewings.",
        control: {
            biological: "Ladybugs, lacewings, parasitic wasps, neem oil, insecticidal soap",
            cultural: "Avoid excessive nitrogen fertilizer, use reflective mulch, remove infested leaves",
            chemical: "Imidacloprid (severe infestations only, toxic to bees - avoid during flowering)"
        }
    },
    "leafminer": {
        advice: "Remove and destroy infected leaves. Apply neem oil spray. Use yellow sticky traps to monitor adult flies.",
        control: {
            biological: "Neem oil, parasitic wasps (Diglyphus isaea)",
            cultural: "Remove infested leaves, practice crop rotation, use floating row covers",
            chemical: "Abamectin (severe cases only, follow pre-harvest interval)"
        }
    },
    "blight": {
        advice: "Apply copper-based fungicide immediately. Improve field drainage. Remove and destroy infected leaves. Avoid overhead watering.",
        control: {
            biological: "Copper fungicide, Bacillus subtilis biofungicide",
            cultural: "Improve drainage, wider plant spacing, crop rotation, resistant varieties",
            chemical: "Mancozeb or chlorothalonil (preventive spray before symptoms appear)"
        }
    },
    "rust": {
        advice: "Apply sulfur-based or copper fungicide. Improve air circulation between plants. Remove infected leaves and destroy them.",
        control: {
            biological: "Sulfur fungicide, neem oil, Bacillus subtilis",
            cultural: "Plant resistant varieties, wider spacing, avoid overhead irrigation, remove volunteer plants",
            chemical: "Tebuconazole or propiconazole (severe cases, rotate fungicides to prevent resistance)"
        }
    },
    "mosaic": {
        advice: "Remove and destroy infected plants immediately. Control aphid vectors with neem oil. Use disease-free seeds and resistant varieties.",
        control: {
            biological: "Control aphid vectors with neem oil and beneficial insects",
            cultural: "Use certified disease-free seeds, resistant varieties, remove infected plants, control weeds",
            chemical: "No effective chemical treatment for viruses. Control insect vectors."
        }
    },
    "planthopper": {
        advice: "Drain field for 3-5 days. Use resistant rice varieties like IR64. Apply neem oil at the base of plants where insects congregate.",
        control: {
            biological: "Neem oil, conserve natural predators (spiders, mirid bugs, dragonflies)",
            cultural: "Drain field periodically, avoid dense planting, use resistant varieties, synchronized planting",
            chemical: "Buprofezin (targets nymphs, less toxic to natural enemies)"
        }
    },
    "weevil": {
        advice: "Apply neem oil. Practice crop rotation. Use pheromone traps for monitoring. For storage pests, use hermetic storage bags.",
        control: {
            biological: "Neem oil, entomopathogenic nematodes, Beauveria bassiana fungus",
            cultural: "Crop rotation, clean storage facilities, hermetic storage, pheromone traps",
            chemical: "Pyrethrins (storage), aluminum phosphide (professional fumigation only)"
        }
    },
    "mealybug": {
        advice: "Apply neem oil thoroughly. Introduce ladybugs and parasitic wasps. Remove heavily infested plant parts. Avoid excess nitrogen fertilizer.",
        control: {
            biological: "Ladybugs (Cryptolaemus montrouzieri), parasitic wasps, neem oil",
            cultural: "Remove infested parts, avoid excess nitrogen, control ants that protect mealybugs",
            chemical: "Imidacloprid (severe nursery infestations, avoid on flowering plants)"
        }
    },
    "whitefly": {
        advice: "Use yellow sticky traps to monitor and reduce populations. Apply neem oil spray to leaf undersides. Introduce Encarsia formosa parasitic wasps.",
        control: {
            biological: "Encarsia wasps, predatory beetles, neem oil, entomopathogenic fungi",
            cultural: "Yellow sticky traps, reflective mulch, remove infested leaves, control weeds",
            chemical: "Imidacloprid (severe only, avoid near flowering crops to protect bees)"
        }
    },
    "mite": {
        advice: "Spray plants with strong water jet to dislodge mites. Increase humidity around plants. Apply neem oil or insecticidal soap.",
        control: {
            biological: "Predatory mites (Phytoseiulus persimilis), neem oil, insecticidal soap",
            cultural: "Increase humidity with overhead watering, remove dust from leaves, avoid broad-spectrum pesticides",
            chemical: "Spiromesifen or fenazaquin (rotate acaricides to prevent resistance)"
        }
    },
    "greening": {
        advice: "CRITICAL! Remove and destroy infected trees immediately. Control Asian citrus psyllid vector with neem oil. Plant only disease-free certified seedlings.",
        control: {
            biological: "Neem oil for psyllid control, Tamarixia radiata parasitic wasp",
            cultural: "Remove infected trees, use certified disease-free planting material, area-wide management",
            chemical: "Imidacloprid for psyllid control (soil drench for young trees)"
        }
    },
    "smut": {
        advice: "Remove and destroy infected plants before galls burst open. Avoid mechanical damage to plants. Practice 3-year crop rotation.",
        control: {
            biological: "No effective biological control available",
            cultural: "Remove galls before they release spores, crop rotation, resistant varieties, avoid wounding plants",
            chemical: "Fungicide seed treatment with carboxin or thiram (preventive only)"
        }
    },
    "brown streak": {
        advice: "Use disease-free cuttings from certified sources. Remove and destroy infected plants immediately. This disease threatens food security for over 4 million Zambians.",
        control: {
            biological: "No effective biological control available",
            cultural: "Use resistant varieties, plant clean cuttings, rogue infected plants, disinfect tools",
            chemical: "No effective chemical treatment available"
        }
    },
    "sigatoka": {
        advice: "Remove infected leaves. Apply mancozeb fungicide. Improve air circulation by wider spacing and pruning.",
        control: {
            biological: "None consistently effective",
            cultural: "Remove infected leaves, improve drainage, wider spacing, resistant varieties",
            chemical: "Mancozeb, propiconazole (rotate fungicides to prevent resistance)"
        }
    },
    "berry borer": {
        advice: "Harvest coffee cherries regularly and completely. Use Beauveria bassiana fungus traps. Remove all fallen berries from ground.",
        control: {
            biological: "Beauveria bassiana fungus, parasitic wasps (Cephalonomia stephanoderis)",
            cultural: "Regular complete harvesting, remove fallen berries, shade management",
            chemical: "Chlorpyrifos (last resort, highly restricted in many countries)"
        }
    },
    "wilt": {
        advice: "Remove and destroy infected plants immediately. Solarize soil before next planting. Use resistant varieties. Practice long crop rotation.",
        control: {
            biological: "Trichoderma fungi as soil treatment, biofumigation with mustard",
            cultural: "Resistant varieties, soil solarization, crop rotation (4-5 years), improve drainage",
            chemical: "No effective chemical treatment. Soil fumigation (professional only, expensive)"
        }
    },
    "nematode": {
        advice: "Practice crop rotation with non-host crops. Solarize soil. Apply neem cake to soil. Use resistant varieties where available.",
        control: {
            biological: "Neem cake, Paecilomyces lilacinus fungus, beneficial nematodes",
            cultural: "Crop rotation with marigold or mustard, soil solarization, organic matter addition",
            chemical: "Nematicides (highly toxic, professional application only, banned in many countries)"
        }
    },
    "powdery mildew": {
        advice: "Apply sulfur fungicide or neem oil. Improve air circulation. Avoid overhead watering. Remove infected leaves.",
        control: {
            biological: "Sulfur fungicide, neem oil, potassium bicarbonate, Bacillus subtilis",
            cultural: "Improve air circulation, avoid overhead watering, resistant varieties, remove infected leaves",
            chemical: "Myclobutanil or trifloxystrobin (rotate with different modes of action)"
        }
    },
    "anthracnose": {
        advice: "Apply copper fungicide. Prune infected branches. Improve air circulation. Avoid overhead irrigation.",
        control: {
            biological: "Copper fungicide, Bacillus subtilis",
            cultural: "Prune infected parts, improve airflow, avoid overhead watering, clean tools",
            chemical: "Chlorothalonil or azoxystrobin (rotate fungicides)"
        }
    }
};

// ============================================
// GLOBAL VARIABLES
// ============================================
let allResults = [];
const wikiCache = {};

// ============================================
// NAVIGATION
// ============================================
function goToStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
}

// ============================================
// WIKIPEDIA API CALL
// ============================================
async function searchWikipedia(query) {
    if (CONFIG.cacheEnabled && wikiCache[query]) return wikiCache[query];

    try {
        const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
        );
        if (!response.ok) return null;

        const data = await response.json();

        let imageUrl = '';
        if (data.thumbnail && data.thumbnail.source) {
            imageUrl = data.thumbnail.source;
        } else if (data.originalimage && data.originalimage.source) {
            imageUrl = data.originalimage.source;
        }

        const result = {
            title: data.title || query,
            extract: data.extract || 'No description available.',
            image: imageUrl,
            url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`
        };

        if (CONFIG.cacheEnabled) wikiCache[query] = result;
        return result;

    } catch (error) {
        console.error('Wikipedia API error:', error.message);
        return null;
    }
}

// ============================================
// GET IPM ADVICE FOR PEST
// ============================================
function getAdvice(pestName) {
    const lowerName = pestName.toLowerCase();

    for (const key in IPM_ADVICE) {
        if (lowerName.includes(key)) return IPM_ADVICE[key];
    }

    return {
        advice: "Monitor your crop regularly. Consult your local agricultural extension officer for specific management recommendations.",
        control: {
            biological: "Neem oil, beneficial insects (ladybugs, lacewings, parasitic wasps)",
            cultural: "Crop rotation, field sanitation, resistant varieties, proper spacing",
            chemical: "Consult extension officer for appropriate chemical control"
        }
    };
}

// ============================================
// MAIN DIAGNOSIS FUNCTION
// ============================================
async function diagnose() {
    const crop = document.getElementById('cropSelect').value;
    const location = document.getElementById('damageLocation').value;
    const symptom = document.getElementById('symptomType').value;
    const details = document.getElementById('extraDetails').value.toLowerCase();

    if (!crop || !location || !symptom) {
        alert('Please select crop, damage location, and symptom type before searching.');
        return;
    }

    document.getElementById('spinner').style.display = 'block';
    document.getElementById('status').textContent = 'Searching Wikipedia for pest information...';

    let searchTerms = [];

    if (PEST_SEARCH[crop] && PEST_SEARCH[crop][symptom]) {
        searchTerms = searchTerms.concat(PEST_SEARCH[crop][symptom]);
    }

    if (details.includes('aphid') || details.includes('small green') || details.includes('tiny bugs') || details.includes('sap')) searchTerms.push(GENERIC_PESTS.aphid);
    if (details.includes('caterpillar') || details.includes('worm') || details.includes('larva') || details.includes('larvae')) searchTerms.push(GENERIC_PESTS.caterpillar);
    if (details.includes('white fly') || details.includes('whitefly') || details.includes('tiny white flying')) searchTerms.push(GENERIC_PESTS.whitefly);
    if (details.includes('mite') || details.includes('web') || details.includes('spider') || details.includes('tiny red')) searchTerms.push(GENERIC_PESTS.mite);
    if (details.includes('mealy') || details.includes('cotton') || details.includes('white fluffy')) searchTerms.push(GENERIC_PESTS.mealybug);
    if (details.includes('thrip') || details.includes('silver') || details.includes('tiny black')) searchTerms.push(GENERIC_PESTS.thrips);
    if (details.includes('powder') || details.includes('white coating') || symptom === 'powder') searchTerms.push(GENERIC_PESTS.powdery_mildew);
    if (details.includes('rust') || details.includes('orange powder') || details.includes('brown powder') || symptom === 'rust') searchTerms.push(GENERIC_PESTS.rust);
    if (details.includes('blight') || details.includes('spots') || details.includes('lesions') || symptom === 'spots') searchTerms.push(GENERIC_PESTS.blight);
    if (details.includes('wilt') || details.includes('droop') || symptom === 'stunted' || symptom === 'yellowing') searchTerms.push(GENERIC_PESTS.wilt);
    if (details.includes('mosaic') || details.includes('mottle') || details.includes('pattern')) searchTerms.push(GENERIC_PESTS.mosaic);
    if (details.includes('smut') || details.includes('black powder') || details.includes('swollen')) searchTerms.push(GENERIC_PESTS.smut);
    if (details.includes('nematode') || details.includes('root knot') || details.includes('galls on roots')) searchTerms.push(GENERIC_PESTS.nematode);
    if (details.includes('locust') || details.includes('swarm') || details.includes('grasshopper')) searchTerms.push(GENERIC_PESTS.locust);
    if (details.includes('cutworm') || details.includes('cut worm') || details.includes('seedling cut')) searchTerms.push(GENERIC_PESTS.cutworm);
    if (details.includes('bollworm') || details.includes('boll worm') || details.includes('cotton boll')) searchTerms.push(GENERIC_PESTS.bollworm);
    if (details.includes('fruit fly') || details.includes('fruitfly') || details.includes('maggot in fruit')) searchTerms.push(GENERIC_PESTS.fruit_fly);
    if (details.includes('scale') || details.includes('scaly') || details.includes('bumps on stem')) searchTerms.push(GENERIC_PESTS.scale_insect);
    if (details.includes('leafhopper') || details.includes('leaf hopper') || details.includes('jumping bug')) searchTerms.push(GENERIC_PESTS.leafhopper);
    if (details.includes('stink bug') || details.includes('stinkbug') || details.includes('shield bug') || details.includes('smelly bug')) searchTerms.push(GENERIC_PESTS.stink_bug);
    if (details.includes('termite') || details.includes('termites') || details.includes('white ant')) searchTerms.push(GENERIC_PESTS.termite);
    if (details.includes('bacterial wilt') || details.includes('bacteria') || details.includes('ooze')) searchTerms.push(GENERIC_PESTS.bacterial_wilt);
    if (details.includes('leaf curl') || details.includes('leafcurl') || details.includes('curled leaves')) searchTerms.push(GENERIC_PESTS.leaf_curl);
    if (details.includes('root rot') || details.includes('rootrot') || details.includes('roots rotting')) searchTerms.push(GENERIC_PESTS.root_rot);
    if (details.includes('damping off') || details.includes('seedling death') || details.includes('seedlings dying')) searchTerms.push(GENERIC_PESTS.damping_off);
    if (details.includes('downy mildew') || details.includes('downy') || details.includes('fluffy underside')) searchTerms.push(GENERIC_PESTS.downy_mildew);
    if (details.includes('yellow leaves') || details.includes('chlorosis') || details.includes('pale green')) searchTerms.push(GENERIC_PESTS.chlorosis);
    if (details.includes('canker') || details.includes('sore') || details.includes('lesion on stem') || details.includes('sunken')) searchTerms.push(GENERIC_PESTS.canker);

    searchTerms = [...new Set(searchTerms)];

    allResults = [];
    const limitedTerms = searchTerms.slice(0, CONFIG.maxRequests);

    for (const term of limitedTerms) {
        const wikiResult = await searchWikipedia(term);
        if (wikiResult && wikiResult.extract && wikiResult.extract.length > 50) {
            const advice = getAdvice(wikiResult.title);
            allResults.push({ ...wikiResult, ...advice });
        }
    }

    document.getElementById('spinner').style.display = 'none';
    document.getElementById('status').textContent = '';

    if (allResults.length === 0) {
        allResults = [{
            title: 'No matching pests found',
            extract: 'No specific pest or disease matched your symptoms. Possible reasons: the combination of symptoms may not correspond to a documented pest, your description may need more detail, or the damage may be caused by nutrient deficiency, water stress, or environmental factors rather than pests. Try describing with different words or consult your local agricultural extension officer.',
            image: '',
            url: '',
            advice: 'Contact your local agricultural extension officer for field diagnosis. When you meet the officer, describe: the crop type, detailed symptoms, when symptoms first appeared, and the pattern of damage across your field.',
            control: {
                biological: 'Consult extension officer for diagnosis first',
                cultural: 'Consult extension officer for diagnosis first',
                chemical: 'Do not apply chemicals without confirmed diagnosis'
            }
        }];
    }

    displayResults();
    goToStep(2);
}

// ============================================
// DISPLAY SEARCH RESULTS
// ============================================
function displayResults() {
    const container = document.getElementById('resultsContainer');
    let html = '';

    allResults.forEach((pest, index) => {
        html += `
            <div class="result-card">
                <div class="pest-name">🐛 ${pest.title}</div>
                ${pest.image ? `<img src="${pest.image}" alt="${pest.title}" onerror="this.parentElement.querySelector('img').style.display='none'">` : ''}
                <div class="pest-desc">${pest.extract ? pest.extract.substring(0, 300) + '...' : 'No description available.'}</div>
                ${pest.url ? `<a href="${pest.url}" target="_blank" rel="noopener" class="wiki-link">📖 Read full article on Wikipedia →</a>` : ''}
                <button class="match-btn" id="matchBtn${index}" onclick="confirmPest(${index})">
                    ✓ This matches what I see
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================
// CONFIRM PEST MATCH
// ============================================
function confirmPest(index) {
    const pest = allResults[index];

    const button = document.getElementById('matchBtn' + index);
    if (button) {
        button.textContent = '✅ Matched!';
        button.classList.add('matched');
    }

    const container = document.getElementById('confirmedContainer');
    container.innerHTML = `
        <div class="result-card">
            <div class="pest-name" style="font-size: 1.2rem;">✅ Confirmed: ${pest.title}</div>
            ${pest.image ? `<img src="${pest.image}" alt="${pest.title}" onerror="this.parentElement.querySelector('img').style.display='none'">` : ''}
            
            <div style="margin-top: 12px;">
                <p style="color: #f59e0b; font-weight: 600; margin-bottom: 4px;">📋 Description</p>
                <p class="pest-desc">${pest.extract || 'No description available.'}</p>
                ${pest.url ? `<a href="${pest.url}" target="_blank" rel="noopener" class="wiki-link">📖 Read full article on Wikipedia →</a>` : ''}
            </div>

            <div class="advice-box" style="margin-top: 12px;">
                <p style="color: #10B981; font-weight: 600; margin-bottom: 6px;">💡 Management Advice</p>
                <p>${pest.advice || 'Monitor your crop regularly and consult your local agricultural extension officer.'}</p>
            </div>

            ${pest.control ? `
            <div class="control-methods">
                <p style="color: #aaa; font-weight: 600; margin-bottom: 8px;">🛠️ Integrated Control Methods</p>
                <p><strong>Biological Control:</strong> ${pest.control.biological || 'Encourage beneficial insects, apply neem oil.'}</p>
                <p><strong>Cultural Control:</strong> ${pest.control.cultural || 'Practice crop rotation, maintain field sanitation.'}</p>
                <p><strong>Chemical Control (last resort):</strong> ${pest.control.chemical || 'Consult extension officer for appropriate pesticide.'}</p>
            </div>
            ` : ''}

            <div class="warning-box">
                <p>⚠️ Always try biological and cultural control methods first. Chemical pesticides should only be used as a last resort and must be applied according to label instructions. Wear protective equipment when handling any pesticide. Consult your agricultural extension officer for confirmation and specific recommendations for your area.</p>
            </div>
        </div>
    `;

    goToStep(3);
}
