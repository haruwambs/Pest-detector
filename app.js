// ============================================
// DIRECT API CALLS - No proxies on Cloudflare Pages
// ============================================
var INAT_API = 'https://api.inaturalist.org/v1/computervision/score';
var WIKI_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

var PEST_KEYWORDS = [
    'armyworm','borer','aphid','hopper','maggot','caterpillar',
    'weevil','thrips','mite','mealybug','leafminer','bollworm',
    'stemfly','midge','skipper','caseworm','leafworm','jassid',
    'phylloxera','nematode','rodent','locust','grasshopper',
    'rust','blight','smut','scab','powdery mildew','leaf spot',
    'wilt','rot','greening','anthracnose','mold','mosaic'
];

var ADVICE = {
    'armyworm':'CRITICAL! Apply Bt or neem oil immediately.',
    'borer':'Apply neem oil or Bt spray. Remove infected stalks.',
    'aphid':'Spray with soapy water (1 tbsp/liter) or neem oil.',
    'hopper':'Drain field for 3-5 days. Use resistant varieties.',
    'maggot':'Apply neem cake to soil. Use yellow sticky traps.',
    'caterpillar':'Apply Bt spray or neem oil. Hand-pick larvae.',
    'weevil':'Apply neem oil. Practice crop rotation.',
    'thrips':'Use blue sticky traps. Spray with neem oil.',
    'mite':'Spray with water to increase humidity. Apply neem oil.',
    'mealybug':'Apply neem oil. Introduce natural predators.',
    'leafminer':'Remove infected leaves. Apply neem oil.',
    'bollworm':'Use pheromone traps. Apply Bt or neem oil.',
    'stemfly':'Apply neem cake to soil. Use yellow sticky traps.',
    'midge':'Apply neem oil. Use pheromone traps.',
    'skipper':'Apply Bt spray. Hand-pick larvae.',
    'caseworm':'Drain field periodically. Apply neem oil.',
    'leafworm':'Apply Bt or neem oil. Monitor regularly.',
    'jassid':'Spray with neem oil. Use yellow sticky traps.',
    'phylloxera':'Use resistant rootstocks. Apply neem oil.',
    'nematode':'Solarize soil. Practice crop rotation.',
    'rodent':'Use traps. Maintain field cleanliness.',
    'locust':'CRITICAL! Report to authorities.',
    'grasshopper':'Apply neem oil. Use bait traps.',
    'rust':'Apply sulfur or copper fungicide.',
    'blight':'Apply copper fungicide. Improve drainage.',
    'smut':'Remove infected plants immediately.',
    'scab':'Apply captan or sulfur fungicide.',
    'powdery mildew':'Apply sulfur fungicide.',
    'leaf spot':'Apply fungicide. Remove infected leaves.',
    'wilt':'Remove infected plants. Solarize soil.',
    'rot':'Improve drainage. Apply fungicide.',
    'greening':'Remove infected trees immediately!',
    'anthracnose':'Apply copper fungicide.',
    'mold':'Improve ventilation. Reduce humidity.',
    'mosaic':'Remove infected plants. Control aphids.'
};

var selectedFile = null;

// ============================================
// EVENT LISTENERS
// ============================================
document.getElementById('chooseBtn').addEventListener('click', function() {
    document.getElementById('f').click();
});

document.getElementById('f').addEventListener('change', function(e) {
    selectedFile = e.target.files[0];
    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function(ev) {
            document.getElementById('pv').src = ev.target.result;
            document.getElementById('pv').style.display = 'block';
            document.getElementById('btn').disabled = false;
            document.getElementById('res').style.display = 'none';
            document.getElementById('st').textContent = 'Image loaded. Ready to analyze.';
        };
        reader.readAsDataURL(selectedFile);
    }
});

// Drag & drop
var card = document.querySelector('.card');
card.addEventListener('dragover', function(e) { e.preventDefault(); });
card.addEventListener('drop', function(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        selectedFile = file;
        var reader = new FileReader();
        reader.onload = function(ev) {
            document.getElementById('pv').src = ev.target.result;
            document.getElementById('pv').style.display = 'block';
            document.getElementById('btn').disabled = false;
            document.getElementById('res').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

function fileToBase64(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result.split(',')[1]); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function filterPests(results) {
    var pests = [];
    for (var i = 0; i < results.length; i++) {
        var r = results[i];
        var taxon = r.taxon || {};
        var name = taxon.preferred_common_name || taxon.name || 'Unknown';
        var sciName = taxon.name || '';
        var score = r.score || 0;
        var nameLower = name.toLowerCase();
        var sciLower = sciName.toLowerCase();
        
        for (var j = 0; j < PEST_KEYWORDS.length; j++) {
            if (nameLower.indexOf(PEST_KEYWORDS[j]) !== -1 || 
                sciLower.indexOf(PEST_KEYWORDS[j]) !== -1) {
                pests.push({
                    name: name,
                    scientific: sciName,
                    confidence: score,
                    keyword: PEST_KEYWORDS[j],
                    advice: ADVICE[PEST_KEYWORDS[j]] || 'Monitor crop regularly.'
                });
                break;
            }
        }
    }
    pests.sort(function(a, b) { return b.confidence - a.confidence; });
    return pests.slice(0, 5);
}

async function fetchWikipediaInfo(searchTerm) {
    try {
        var encoded = encodeURIComponent(searchTerm);
        var response = await fetch(WIKI_API + encoded);
        if (!response.ok) return null;
        var data = await response.json();
        return {
            title: data.title || '',
            extract: data.extract || '',
            url: data.content_urls?.desktop?.page || 'https://en.wikipedia.org/wiki/' + encoded
        };
    } catch(e) {
        return null;
    }
}

// ============================================
// ANALYZE BUTTON - Direct API call
// ============================================
document.getElementById('btn').addEventListener('click', async function() {
    if (!selectedFile) return;
    
    var btn = document.getElementById('btn');
    var spinner = document.getElementById('spinner');
    var res = document.getElementById('res');
    var st = document.getElementById('st');
    
    btn.disabled = true;
    spinner.style.display = 'block';
    res.style.display = 'none';
    st.textContent = 'Identifying species...';
    
    try {
        var base64 = await fileToBase64(selectedFile);
        
        // Direct API call - works on Cloudflare Pages
        var response = await fetch(INAT_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
        });
        
        if (!response.ok) throw new Error('API returned ' + response.status);
        
        var data = await response.json();
        var results = data.results || [];
        var pests = filterPests(results);
        
        var html = '';
        
        if (pests.length === 0) {
            html = '<div class="no-pest">' +
                   '<i class="fas fa-check-circle"></i>' +
                   '<h3>No Pests Detected</h3>' +
                   '<p style="color:#888;">Your crop appears healthy.</p></div>';
            
            if (results.length > 0) {
                html += '<div style="margin-top:14px;padding-top:12px;border-top:1px solid #2c2c2c;">' +
                        '<p style="color:#666;font-size:0.7rem;">Top matches:</p>';
                for (var i = 0; i < Math.min(results.length, 3); i++) {
                    var r = results[i];
                    var name = (r.taxon && r.taxon.preferred_common_name) || 'Unknown';
                    var score = r.score || 0;
                    html += '<div style="display:flex;justify-content:space-between;font-size:0.73rem;">' +
                            '<span style="color:#aaa;">- ' + name + '</span>' +
                            '<span style="color:#666;">' + (score * 100).toFixed(0) + '%</span></div>';
                }
                html += '</div>';
            }
        } else {
            st.textContent = 'Fetching Wikipedia info...';
            
            for (var i = 0; i < pests.length; i++) {
                var pest = pests[i];
                var conf = (pest.confidence * 100).toFixed(1);
                var barColor = pest.confidence > 0.8 ? '#10B981' : 
                              pest.confidence > 0.5 ? '#f59e0b' : '#f97316';
                
                html += '<div class="pest-item">' +
                        '<div class="pest-name"><i class="fas fa-bug"></i> ' + pest.name + '</div>' +
                        (pest.scientific ? '<div class="pest-sci">' + pest.scientific + '</div>' : '') +
                        '<div class="pest-conf">Confidence: ' + conf + '%</div>' +
                        '<div class="pest-bar"><div class="pest-bar-fill" style="width:' + conf + 
                        '%;background:' + barColor + '"></div></div>' +
                        '<div class="pest-advice"><i class="fas fa-leaf"></i> ' + pest.advice + '</div>';
                
                if (i === 0) {
                    var wiki = await fetchWikipediaInfo(pest.scientific || pest.name);
                    if (wiki && wiki.extract) {
                        var short = wiki.extract.substring(0, 300);
                        if (wiki.extract.length > 300) short += '...';
                        html += '<div class="wiki-section">' +
                                '<div class="wiki-title"><i class="fab fa-wikipedia-w"></i> ' + 
                                wiki.title + '</div>' +
                                '<div class="wiki-text">' + short + '</div>' +
                                '<a href="' + wiki.url + '" target="_blank" class="wiki-link">' +
                                'Read more on Wikipedia</a></div>';
                    }
                }
                html += '</div>';
            }
        }
        
        res.innerHTML = html;
        res.style.display = 'block';
        st.textContent = pests.length > 0 ? 'Found ' + pests.length + ' pest(s)' : 'No pests detected';
        
    } catch(e) {
        console.error(e);
        res.innerHTML = '<div style="text-align:center;padding:15px;">' +
                        '<i class="fas fa-exclamation-triangle" style="font-size:2rem;color:#ef4444;"></i>' +
                        '<p style="color:#ef4444;">Error: ' + e.message + '</p></div>';
        res.style.display = 'block';
        st.textContent = 'Detection failed';
    }
    
    btn.disabled = false;
    spinner.style.display = 'none';
});
