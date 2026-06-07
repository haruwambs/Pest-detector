// Direct API endpoints – works perfectly when hosted on Cloudflare Pages (or any https origin)
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
    'armyworm':'CRITICAL! Apply Bt (Bacillus thuringiensis) or neem oil immediately. Monitor field daily for 1 week.',
    'borer':'Apply neem oil or Bt spray. Remove and destroy infected stalks. Practice crop rotation.',
    'aphid':'Spray with soapy water (1 tbsp per liter) or neem oil. Introduce natural predators like ladybugs.',
    'hopper':'Drain field for 3-5 days. Use resistant varieties. Apply neem oil.',
    'maggot':'Apply neem cake to soil. Use yellow sticky traps for adults.',
    'caterpillar':'Apply Bt spray or neem oil. Hand-pick larvae if infestation is small.',
    'weevil':'Apply neem oil. Practice crop rotation. Store grains properly.',
    'thrips':'Use blue sticky traps. Spray with neem oil or insecticidal soap.',
    'mite':'Spray plants with water to increase humidity. Apply neem oil.',
    'mealybug':'Apply neem oil. Introduce natural predators like ladybugs and lacewings.',
    'leafminer':'Remove and destroy infected leaves. Apply neem oil.',
    'bollworm':'Use pheromone traps. Apply Bt or neem oil. Introduce Trichogramma wasps.',
    'stemfly':'Apply neem cake to soil. Use yellow sticky traps.',
    'midge':'Apply neem oil. Use pheromone traps for monitoring.',
    'skipper':'Apply Bt spray. Hand-pick larvae when possible.',
    'caseworm':'Drain field periodically. Apply neem oil.',
    'leafworm':'Apply Bt or neem oil. Monitor regularly.',
    'jassid':'Spray with neem oil. Use yellow sticky traps.',
    'phylloxera':'Use resistant rootstocks. Apply neem oil to foliage.',
    'nematode':'Solarize soil before planting. Practice crop rotation. Apply neem cake.',
    'rodent':'Use traps. Maintain field cleanliness. Remove nearby hiding places.',
    'locust':'CRITICAL! Report to authorities immediately. Apply approved pesticides.',
    'grasshopper':'Apply neem oil. Use bait traps. Till soil to expose eggs.',
    'rust':'Apply sulfur-based or copper fungicide. Improve air circulation between plants.',
    'blight':'Apply copper-based fungicide. Improve field drainage. Remove infected plants.',
    'smut':'Remove and destroy infected plants immediately. Avoid mechanical damage to plants.',
    'scab':'Apply captan or sulfur fungicide. Rake and destroy fallen leaves.',
    'powdery mildew':'Apply sulfur fungicide. Improve air flow around plants. Avoid overhead watering.',
    'leaf spot':'Apply appropriate fungicide. Remove infected leaves. Improve air circulation.',
    'wilt':'Remove infected plants immediately. Solarize soil before next planting.',
    'rot':'Improve drainage significantly. Apply fungicide. Avoid overwatering.',
    'greening':'Remove infected trees immediately! Control psyllid vectors with imidacloprid.',
    'anthracnose':'Apply copper-based fungicide. Prune infected branches. Improve air flow.',
    'mold':'Improve ventilation. Reduce humidity. Apply appropriate fungicide.',
    'mosaic':'Remove infected plants. Control aphid vectors. Use virus-free seeds.'
};

var selectedFile = null;

// ============================================
// EVENT LISTENERS
// ============================================
document.getElementById('chooseBtn').addEventListener('click',function(){
    document.getElementById('f').click();
});

document.getElementById('f').addEventListener('change',function(e){
    selectedFile = e.target.files[0];
    if(selectedFile){
        var reader = new FileReader();
        reader.onload = function(ev){
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
card.addEventListener('dragover',function(e){e.preventDefault();});
card.addEventListener('drop',function(e){
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    if(file && file.type.startsWith('image/')){
        selectedFile = file;
        var reader = new FileReader();
        reader.onload = function(ev){
            document.getElementById('pv').src = ev.target.result;
            document.getElementById('pv').style.display = 'block';
            document.getElementById('btn').disabled = false;
            document.getElementById('res').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

function fileToBase64(file){
    return new Promise(function(resolve,reject){
        var reader = new FileReader();
        reader.onload = function(){resolve(reader.result.split(',')[1]);};
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function filterPests(results){
    var pests = [];
    for(var i=0;i<results.length;i++){
        var r = results[i];
        var taxon = r.taxon || {};
        var name = taxon.preferred_common_name || taxon.name || 'Unknown';
        var sciName = taxon.name || '';
        var score = r.score || 0;
        var nameLower = name.toLowerCase();
        var sciLower = sciName.toLowerCase();
        
        for(var j=0;j<PEST_KEYWORDS.length;j++){
            if(nameLower.indexOf(PEST_KEYWORDS[j])!==-1 || sciLower.indexOf(PEST_KEYWORDS[j])!==-1){
                pests.push({
                    name:name,
                    scientific:sciName,
                    confidence:score,
                    keyword:PEST_KEYWORDS[j],
                    advice:ADVICE[PEST_KEYWORDS[j]]||'Monitor crop regularly.',
                    taxonId:taxon.id||null
                });
                break;
            }
        }
    }
    pests.sort(function(a,b){return b.confidence-a.confidence;});
    return pests.slice(0,5);
}

async function fetchWikipediaInfo(searchTerm){
    try{
        var encoded = encodeURIComponent(searchTerm);
        var response = await fetch(WIKI_API + encoded);
        if(!response.ok) return null;
        var data = await response.json();
        return {
            title:data.title||'',
            extract:data.extract||'',
            description:data.description||'',
            url:data.content_urls?.desktop?.page||'https://en.wikipedia.org/wiki/'+encoded
        };
    }catch(e){
        return null;
    }
}

document.getElementById('btn').addEventListener('click',async function(){
    if(!selectedFile) return;
    
    var btn = document.getElementById('btn');
    var spinner = document.getElementById('spinner');
    var res = document.getElementById('res');
    var st = document.getElementById('st');
    
    btn.disabled = true;
    spinner.style.display = 'block';
    res.style.display = 'none';
    st.textContent = 'Identifying species via iNaturalist...';
    
    try{
        var base64 = await fileToBase64(selectedFile);
        var response = await fetch(INAT_API,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({image:base64})
        });
        
        if(!response.ok) throw new Error('API Error: '+response.status);
        
        var data = await response.json();
        var results = data.results||[];
        var pests = filterPests(results);
        
        var html = '';
        
        if(pests.length===0){
            html = '<div class="no-pest">'+
                   '<i class="fas fa-check-circle"></i>'+
                   '<h3>No Agricultural Pests Detected</h3>'+
                   '<p style="color:#888;font-size:0.82rem;">Your crop appears healthy.</p></div>';
            
            if(results.length>0){
                html += '<div style="margin-top:14px;padding-top:12px;border-top:1px solid #2c2c2c;">'+
                        '<p style="color:#666;font-size:0.7rem;margin-bottom:8px;">Top matches (non-pest):</p>';
                for(var i=0;i<Math.min(results.length,3);i++){
                    var r = results[i];
                    var name = (r.taxon&&r.taxon.preferred_common_name)||(r.taxon&&r.taxon.name)||'Unknown';
                    var score = r.score||0;
                    html += '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.73rem;">'+
                            '<span style="color:#aaa;">- '+name+'</span>'+
                            '<span style="color:#666;">'+(score*100).toFixed(0)+'%</span></div>';
                }
                html += '</div>';
            }
        } else {
            st.textContent = 'Fetching Wikipedia information...';
            
            for(var i=0;i<pests.length;i++){
                var pest = pests[i];
                var conf = (pest.confidence*100).toFixed(1);
                var barColor = pest.confidence>0.8?'#10B981':pest.confidence>0.5?'#f59e0b':'#f97316';
                
                html += '<div class="pest-item">'+
                        '<div class="pest-name"><i class="fas fa-bug"></i> '+pest.name+'</div>'+
                        (pest.scientific?'<div class="pest-sci">'+pest.scientific+'</div>':'')+
                        '<div class="pest-conf">Confidence: '+conf+'%</div>'+
                        '<div class="pest-bar"><div class="pest-bar-fill" style="width:'+conf+'%;background:'+barColor+'"></div></div>'+
                        '<div class="pest-advice"><i class="fas fa-leaf"></i> '+pest.advice+'</div>';
                
                if(i===0){
                    var wikiSearch = pest.scientific||pest.name;
                    var wiki = await fetchWikipediaInfo(wikiSearch);
                    if(wiki&&wiki.extract){
                        var shortExtract = wiki.extract.substring(0,300);
                        if(wiki.extract.length>300) shortExtract += '...';
                        html += '<div class="wiki-section">'+
                                '<div class="wiki-title"><i class="fab fa-wikipedia-w"></i> Wikipedia: '+wiki.title+'</div>'+
                                '<div class="wiki-text">'+shortExtract+'</div>'+
                                '<a href="'+wiki.url+'" target="_blank" class="wiki-link">Read more on Wikipedia</a>'+
                                '</div>';
                    }
                }
                
                html += '</div>';
            }
        }
        
        res.innerHTML = html;
        res.style.display = 'block';
        st.textContent = pests.length>0?'Found '+pests.length+' pest(s)':'No pests detected';
        
    }catch(e){
        console.error(e);
        res.innerHTML = '<div style="text-align:center;color:#ef4444;padding:15px;">'+
                        '<i class="fas fa-exclamation-triangle" style="font-size:2rem;margin-bottom:8px;"></i>'+
                        '<p>'+e.message+'</p>'+
                        '<p style="font-size:0.7rem;color:#888;">Host this file on Cloudflare Pages (free) for full functionality.</p></div>';
        res.style.display = 'block';
        st.textContent = 'Detection failed';
    }
    
    btn.disabled = false;
    spinner.style.display = 'none';
});
