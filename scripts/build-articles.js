const fs = require('fs'), path = require('path');
const SITE = 'https://premium.decopoluzbekistan.uz/', DIR = 'maqolalar';
const KEYS = {sarlavha:'title',nomi:'title',title:'title','заголовок':'title','название':'title',sana:'date',date:'date','дата':'date',rasm:'image',foto:'image',image:'image',img:'image',cover:'image','картинка':'image','фото':'image','изображение':'image',qisqacha:'excerpt',tavsif:'excerpt',excerpt:'excerpt',description:'excerpt','кратко':'excerpt','описание':'excerpt',muallif:'author',author:'author','автор':'author',seo:'seotitle',kalit:'keywords','ключи':'keywords'};

const esc = t => String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const abs = p => /^https?:/i.test(p) ? p : SITE + String(p).replace(/^\//,'');
const rel = p => /^(https?:|\/)/i.test(p) ? p : '/' + p;
function inline(t){
  t = esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(a,x,u)=>'<a href="'+u+'"'+(/^https?:/i.test(u)?' target="_blank" rel="noopener"':'')+'>'+x+'</a>');
  return t.replace(/(^|[^"'>=])(https?:\/\/[^\s<]+)/g,(a,p,u)=>p+'<a href="'+u+'" target="_blank" rel="noopener">'+u+'</a>');
}
const ytId = s => { const m=/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/.exec(s); return m?m[1]:''; };
function mdLite(src){
  let out='', para=[], list=null;
  const fp=()=>{ if(para.length){ out+='<p>'+para.map(inline).join('<br>')+'</p>'; para=[]; } };
  const fl=()=>{ if(list){ out+='<'+list.t+'>'+list.items.map(x=>'<li>'+inline(x)+'</li>').join('')+'</'+list.t+'>'; list=null; } };
  src.split('\n').forEach(ln=>{
    const t=ln.trim(); let m;
    if(!t){fp();fl();return;}
    if((m=/^#{1,3}\s+(.*)$/.exec(t))){fp();fl();out+='<h2>'+inline(m[1])+'</h2>';return;}
    m=/^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(t);
    if(!m&&/^\S+\.(?:jpe?g|png|webp|gif)(\?\S*)?$/i.test(t)) m=[t,'',t];
    if(m){fp();fl();out+='<figure><img src="'+esc(rel(m[2]))+'" alt="'+esc(m[1]||'')+'" loading="lazy"></figure>';return;}
    const y=ytId(t); if(y&&/^\S+$/.test(t)){fp();fl();out+='<div class="vbox"><iframe src="https://www.youtube.com/embed/'+y+'?rel=0" loading="lazy" allowfullscreen></iframe></div>';return;}
    if((m=/^(?:[-*•]\s+)(.*)$/.exec(t))){fp();if(!list||list.t!=='ul'){fl();list={t:'ul',items:[]};}list.items.push(m[1]);return;}
    if((m=/^\d+[.)]\s+(.*)$/.exec(t))){fp();if(!list||list.t!=='ol'){fl();list={t:'ol',items:[]};}list.items.push(m[1]);return;}
    if((m=/^>\s?(.*)$/.exec(t))){fp();fl();out+='<blockquote>'+inline(m[1])+'</blockquote>';return;}
    fl(); para.push(t);
  });
  fp(); fl(); return out;
}
function parseBlock(txt){
  const lines=txt.replace(/\r/g,'').split('\n'), meta={}; let i=0;
  for(;i<lines.length;i++){
    const ln=lines[i];
    if(/^\s*-{3,}\s*$/.test(ln)){i++;break;}
    const m=/^\s*([A-Za-zА-Яа-яЁёʼ'’]+)\s*:\s*(.*)$/.exec(ln);
    if(m&&KEYS[m[1].toLowerCase()]){meta[KEYS[m[1].toLowerCase()]]=m[2].trim();continue;}
    if(!ln.trim()){ if(Object.keys(meta).length){i++;break;} continue; }
    break;
  }
  const body=lines.slice(i).join('\n').trim();
  meta.html=mdLite(body);
  meta.plain=body.replace(/\S+\.(?:jpe?g|png|webp|gif)\S*/gi,'').replace(/https?:\S+/g,'').replace(/[#*>\-\[\]()!]/g,' ').replace(/\s+/g,' ').trim();
  return meta;
}
function isoDate(s){
  if(!s) return '';
  let m=/^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s); if(m) return m[1]+'-'+('0'+m[2]).slice(-2)+'-'+('0'+m[3]).slice(-2);
  m=/^(\d{1,2})[.\/](\d{1,2})[.\/](\d{4})/.exec(s); if(m) return m[3]+'-'+('0'+m[2]).slice(-2)+'-'+('0'+m[1]).slice(-2);
  return s;
}
function parseArticle(name,txt){
  const parts=txt.replace(/\r/g,'').split(/^\s*={3,}\s*(RU|UZ|РУ|УЗ)\s*={3,}\s*$/mi);
  let uz=null,ru=null,label='UZ';
  parts.forEach((p,i)=>{
    if(i%2===1){label=p.toUpperCase();return;}
    if(!p.trim())return;
    const b=parseBlock(p);
    if(label==='RU'||label==='РУ') ru=b; else uz=b;
  });
  if(!uz) uz=ru; if(!uz) return null;
  ru=ru||{};
  ['title','date','image','excerpt','author','html','plain','seotitle','keywords'].forEach(k=>{ if(!ru[k]) ru[k]=uz[k]; });
  uz.date=isoDate(uz.date); ru.date=isoDate(ru.date)||uz.date;
  const id=name.replace(/\.(md|txt)$/i,'');
  if(!uz.title){ uz.title=id.replace(/^\d{4}-\d{2}-\d{2}[-_]?/,'').replace(/[-_]+/g,' ').trim()||id; if(!ru.title) ru.title=uz.title; }
  return {id,uz,ru};
}
function page(a,lang){
  const v=a[lang], ru=lang==='ru';
  const file='maqola-'+encodeURIComponent(a.id)+'.html';
  const url=SITE+(ru?'ru/':'')+file;
  let title=v.seotitle||v.title; if(!/decopol/i.test(title)) title+=' | Decopol';
  let desc=(v.excerpt||v.plain||'').replace(/\s+/g,' ').trim();
  if(desc.length>160) desc=desc.slice(0,157).replace(/\s+\S*$/,'')+'…';
  const img=v.image?abs(v.image):SITE+'img/hero-home.jpg';
  const org={'@type':'Organization',name:'Decopol',url:SITE};
  const ld=[{'@context':'https://schema.org','@type':'Article',headline:v.title.slice(0,110),description:desc,image:[img],datePublished:v.date||undefined,dateModified:v.date||undefined,inLanguage:ru?'ru':'uz',author:v.author?{'@type':'Person',name:v.author}:org,publisher:org,mainEntityOfPage:{'@type':'WebPage','@id':url}},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Decopol',item:SITE+(ru?'ru/':'')},
      {'@type':'ListItem',position:2,name:ru?'Статьи':'Maqolalar',item:SITE+(ru?'ru/':'')+'maqolalar.html'},
      {'@type':'ListItem',position:3,name:v.title,item:url}]}];
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${v.keywords?`<meta name="keywords" content="${esc(v.keywords)}">\n`:''}<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="uz" href="${SITE+file}">
<link rel="alternate" hreflang="ru" href="${SITE+'ru/'+file}">
<link rel="alternate" hreflang="x-default" href="${SITE+file}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Decopol">
<meta property="og:locale" content="${ru?'ru_RU':'uz_UZ'}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(img)}">
${v.date?`<meta property="article:published_time" content="${v.date}">\n`:''}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(img)}">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g,'\\u003c')}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap" rel="stylesheet">
      <link rel="icon" type="image/png" href="/img/favicon.avif">
   <link rel="apple-touch-icon" href="/img/favicon.avif">
   <link rel="stylesheet" href="/style-v9.css">
</head>
<body data-page="article" data-lang="${lang}"${ru?' data-base="../"':''}>
<div id="hdr"></div>
<main id="app"><article class="dp dh"><h1>${esc(v.title)}</h1>${v.date?`<p><time datetime="${v.date}">${v.date}</time></p>`:''}<div class="prose">${v.html}</div></article></main>
<div id="ftr"></div>
<script src="/app-v9.js"></script>
</body>
</html>
`;
}

// 1) eski generatsiya qilingan fayllarni tozalash
for (const d of ['.','ru']) if (fs.existsSync(d)) fs.readdirSync(d).filter(f=>/^maqola-.+\.html$/.test(f)).forEach(f=>fs.unlinkSync(path.join(d,f)));
fs.mkdirSync('ru',{recursive:true});

// 2) maqolalarni o'qish
const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(n=>/\.(md|txt)$/i.test(n)&&n[0]!=='_'&&!/^readme/i.test(n)) : [];
const arts = files.map(n=>parseArticle(n,fs.readFileSync(path.join(DIR,n),'utf8'))).filter(a=>a&&a.uz.title);
arts.forEach(a=>{
  fs.writeFileSync('maqola-'+a.id+'.html',page(a,'uz'));
  fs.writeFileSync('ru/maqola-'+a.id+'.html',page(a,'ru'));
});

// 3) sitemap.xml
const stat=['','about.html','franshiza.html','cases.html','panel.html','designers.html','maqolalar.html','showroom.html','contact.html'];
const today=new Date().toISOString().slice(0,10);
const entry=(f,lm)=>`<url><loc>${SITE+f}</loc>${lm?`<lastmod>${lm}</lastmod>`:''}<xhtml:link rel="alternate" hreflang="uz" href="${SITE+f}"/><xhtml:link rel="alternate" hreflang="ru" href="${SITE+'ru/'+f}"/></url>\n<url><loc>${SITE+'ru/'+f}</loc>${lm?`<lastmod>${lm}</lastmod>`:''}<xhtml:link rel="alternate" hreflang="uz" href="${SITE+f}"/><xhtml:link rel="alternate" hreflang="ru" href="${SITE+'ru/'+f}"/></url>`;
let xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
stat.forEach(f=>xml+=entry(f,today)+'\n');
arts.forEach(a=>xml+=entry('maqola-'+encodeURIComponent(a.id)+'.html',a.uz.date||today)+'\n');
fs.writeFileSync('sitemap.xml',xml+'</urlset>\n');
console.log('Maqolalar:',arts.length);
