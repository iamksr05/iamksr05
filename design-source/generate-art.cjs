const fs=require('fs'),path=require('path');
const sharp=require('sharp');
const root=path.resolve(__dirname,'..');
const assets=root+'/assets';
const frames=path.join(root,'.render-frames');
fs.mkdirSync(frames,{recursive:true});
const tau=Math.PI*2;
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const txt=(x,y,s,size=16,color='#eff4ff',weight=400,extra='')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}" ${extra}>${esc(s)}</text>`;
const mono='font-family="DejaVu Sans Mono,monospace"';
const circle=(x,y,r,c,o=1)=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r}" fill="${c}" opacity="${o}"/>`;
function shell(w,h,body){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><clipPath id="art"><rect width="${w}" height="${h}" rx="22"/></clipPath>
<radialGradient id="nebula"><stop stop-color="#5924b6" stop-opacity=".65"/><stop offset=".5" stop-color="#281362" stop-opacity=".35"/><stop offset="1" stop-color="#070916" stop-opacity="0"/></radialGradient>
<radialGradient id="cyan"><stop stop-color="#00a9c5" stop-opacity=".25"/><stop offset="1" stop-color="#070916" stop-opacity="0"/></radialGradient>
<radialGradient id="core"><stop stop-color="#070816"/><stop offset=".78" stop-color="#0f0b29"/><stop offset="1" stop-color="#4b287c"/></radialGradient>
<linearGradient id="chrome" x2=".25" y2="1"><stop stop-color="#fff"/><stop offset=".49" stop-color="#e1e0ff"/><stop offset=".5" stop-color="#af9cea"/><stop offset="1" stop-color="#f1eaff"/></linearGradient>
<linearGradient id="stroke"><stop stop-color="#69f7e9"/><stop offset=".5" stop-color="#a586ff"/><stop offset="1" stop-color="#ff85db"/></linearGradient>
<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#8673b6" opacity=".055"/></pattern>
</defs><style>text{font-family:Arial,Helvetica,sans-serif}text[font-family]{font-family:DejaVu Sans Mono,monospace}</style><rect width="${w}" height="${h}" rx="22" fill="#070916"/><rect width="${w}" height="${h}" rx="22" fill="url(#grid)"/><g clip-path="url(#art)">${body}</g><rect x=".75" y=".75" width="${w-1.5}" height="${h-1.5}" rx="22" fill="none" stroke="#695698" stroke-opacity=".4"/></svg>`;}
function stars(w,h,t,count=85){let s='';for(let i=0;i<count;i++){let x=((i*127.43)%w),y=(i*73.83)%h;let o=.15+.5*(.5+.5*Math.sin(i*6.78+t*tau));s+=circle(x,y,i%9===0?1.7:.7,i%3?'#ae9fcf':'#91f8ff',o.toFixed(2));}return s;}
function portal(cx,cy,scale,t){
 let s=`<ellipse cx="${cx}" cy="${cy}" rx="${310*scale}" ry="${300*scale}" fill="url(#nebula)"/><ellipse cx="${cx-80*scale}" cy="${cy+100*scale}" rx="${260*scale}" ry="${230*scale}" fill="url(#cyan)"/>`;
 let paths=[];
 const rot=t*tau;
 function point(u,v){let R=136+11*Math.sin(3*u+rot),r=48+7*Math.cos(2*u-rot);let x=(R+r*Math.cos(v))*Math.cos(u),y=(R+r*Math.cos(v))*Math.sin(u),z=r*Math.sin(v);let yy=y*.67-z*.742,zz=y*.742+z*.67;let xx=x*.94-yy*.342;yy=x*.342+yy*.94;let p=680/(680-zz);return [cx+xx*p*scale,cy+yy*p*scale,zz];}
 for(let a=0;a<44;a++){let u=a*tau/44+rot;let d='',depth=0;for(let j=0;j<=60;j++){let p=point(u,j*tau/60);d+=(j?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1);depth+=p[2];}paths.push({d,z:depth/61,c:a%3?'#b189ff':'#62e9ff',o:.35,width:.8});}
 for(let b=0;b<20;b++){let v=b*tau/20+rot*.4,d='',depth=0;for(let j=0;j<=180;j++){let p=point(j*tau/180,v);d+=(j?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1);depth+=p[2];}paths.push({d,z:depth/181,c:b%4?'#a26cff':'#ffb1f2',o:.5,width:1});}
 paths.sort((a,b)=>a.z-b.z);
 for(let p of paths)s+=`<path d="${p.d}" fill="none" stroke="${p.c}" stroke-width="${p.width*scale}" opacity="${p.o}"/>`;
 for(let n=0;n<110;n++){let u=n*2.39996+rot,v=n*1.72+rot;let p=point(u,v);s+=circle(p[0],p[1],(n%13===0?2:1)*scale,n%3?'#e8bdff':'#7cfff7',.65);}
 s+=`<g transform="rotate(-24 ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="${260*scale}" ry="${80*scale}" fill="none" stroke="#a278e2" stroke-width=".7" opacity=".4"/>`;
 for(let n=0;n<3;n++){let u=rot+n*tau/3;s+=circle(cx+260*scale*Math.cos(u),cy+80*scale*Math.sin(u),3*scale,n===1?'#6efae7':'#e6b0ff');}s+='</g>';
 s+=txt(cx,cy+5,'{ / }',32*scale,'#ded1ff',400,'text-anchor="middle" '+mono);
 return s;
}
function hero(t,mobile=false){let w=mobile?640:1200,h=mobile?760:660;
 let s=stars(w,h,t)+portal(mobile?460:920,mobile?264:306,mobile?.84:1.18,t);
 s+=txt(42,48,'K / IAMKSR05',14,'#d5c6ec',500,mono);
 s+=circle(w-193,42,3,'#85ffcf')+txt(w-180,47,'CURIOSITY: ALWAYS ON',10,'#b7c8d3',400,mono);
 s+=txt(44,mobile?128:145,'DEVELOPER BY CURIOSITY.',mobile?16:17,'#b6a3ef',500,mono);
 // Chromatic offsets give the name a luminous, dimensional edge.
 let y=mobile?260:302,size=mobile?113:149;
 s+=txt(36,y+1,'KARAN',size,'#8457d8',800,'letter-spacing="-9"');
 s+=txt(40,y-1,'KARAN',size,'url(#chrome)',800,'letter-spacing="-9"');
 s+=txt(45,mobile?355:370,'Turning wild ideas',mobile?33:37,'#f0ebff',600,'letter-spacing="-1"');
 s+=txt(45,mobile?401:417,'into working systems.',mobile?33:37,'#a996da',600,'letter-spacing="-1"');
 let cmd=mobile?492:491;
 s+=`<rect x="44" y="${cmd-24}" width="${mobile?548:540}" height="48" rx="8" fill="#121125" stroke="#3b2c59"/>`;
 const commands=['connect(ideas, systems);','build. break. learn. repeat.','keepCuriosityAlive();'];
 let phase=t*3,ix=Math.floor(phase)%3,progress=phase%1;
 let line=commands[ix],letters=Math.min(line.length,Math.floor(progress*line.length*2.8)+1);
 s+=txt(61,cmd+6,'❯',20,'#77f3df',400,mono)+txt(89,cmd+6,line.slice(0,letters),mobile?17:18,'#c4b8e4',400,mono);
 s+=`<rect x="${89+letters*(mobile?10.24:10.84)}" y="${cmd-11}" width="8" height="20" fill="#aa82fa" opacity="${Math.sin(t*tau*6)>0?1:.25}"/>`;
 let by=mobile?599:577;
 s+=`<path d="M44 ${by-32}H${w-44}" stroke="#312646"/>`;
 if(mobile){s+=txt(44,by,'01 / BACKENDS',17,'#8aeadf',400,mono)+txt(44,by+42,'02 / CONNECTED SYSTEMS',17,'#bd9af4',400,mono)+txt(44,by+84,'03 / CREATIVE THINKING',17,'#e6a5d4',400,mono);}
 else {s+=txt(44,by,'01 / BACKENDS',13,'#8aeadf',400,mono)+txt(347,by,'02 / CONNECTED SYSTEMS',13,'#bd9af4',400,mono)+txt(777,by,'03 / CREATIVE THINKING',13,'#e6a5d4',400,mono)+txt(44,624,'DREAM IT.  UNDERSTAND IT.  BUILD IT.',10,'#726988',400,mono)+txt(1156,624,'SCROLL TO EXPLORE ↓',10,'#a69ac0',400,'text-anchor="end" '+mono);}
 return shell(w,h,s);
}
function project(t,second=false){let w=580,h=370,c=second?'#76efdb':'#ba97ff';let s=stars(w,h,t,35);
 if(!second){s+=portal(429,137,.67,t);}
 else {s+=`<ellipse cx="420" cy="128" rx="180" ry="150" fill="url(#cyan)"/>`;let points=[];for(let n=0;n<24;n++){let a=n*tau/12+t*tau,r=n<12?93:56;points.push([422+Math.cos(a)*r,124+Math.sin(a)*r*.72+(n<12?-20:22)]);}for(let n=0;n<24;n++){for(let k=0;k<24;k++){if((n+k)%7===0)s+=`<path d="M${points[n].join(' ')}L${points[k].join(' ')}" stroke="#64c9b9" stroke-width=".8" opacity=".25"/>`;}s+=circle(...points[n],n%4?2:4,c,.8);}}
 s+=txt(28,40,second?'BUILD LOG / 02':'BUILD LOG / 01',12,c,500,mono);
 s+=txt(28,91,second?'02':'01',60,'#443454',700);
 s+=txt(28,248,second?'comrade-learn-ai':'InfoGeniusAI',34,'#efebfa',700,'letter-spacing="-1"');
 s+=txt(29,280,'Open the repository. Explore the work.',16,'#a497ba');
 s+=`<path d="M28 305H552" stroke="#312646"/>`+txt(28,341,'VIEW SOURCE',12,c,500,mono)+txt(546,345,'↗',25,c,400,'text-anchor="end"');
 return shell(w,h,s);
}
function footer(){let s=stars(1200,260,0,44)+`<ellipse cx="1040" cy="170" rx="450" ry="270" fill="url(#nebula)"/>`+txt(44,53,'NEXT CHAPTER / LET’S BUILD IT TOGETHER',13,'#b599f1',400,mono)+txt(42,127,'Good things start with',48,'#f2ecff',700,'letter-spacing="-1.5"')+txt(42,184,'“what if?”',53,'#ac87f4',700,'letter-spacing="-1.5"')+txt(44,225,'Open to collaborations & interesting projects.',16,'#9c91b3')+`<circle cx="1076" cy="137" r="56" fill="#1a1230" stroke="#60438e"/><path d="M1046 164L1105 105M1061 105H1105V149" fill="none" stroke="#c2a4fc" stroke-width="3"/>`;return shell(1200,260,s);}
function section(n,title,sub){return shell(1200,86,txt(26,54,n,24,'#ad85f0',400,mono)+`<path d="M86 24V63" stroke="#46305f"/>`+txt(111,55,title,28,'#e7e0f5',600,'letter-spacing="-.6"')+txt(1172,52,sub,12,'#837293',400,'text-anchor="end" '+mono));}
async function main(){
 for(let [name,fn] of [['hero',()=>hero(.20)],['hero-mobile',()=>hero(.20,true)],['project-infogenius',()=>project(0)],['project-comrade',()=>project(0,true)],['footer',footer]])fs.writeFileSync(assets+'/'+name+'.svg',fn());
 for(let [n,title,sub] of [['01','A human behind the handle.','THE MINDSET'],['02','Ideas, out in the open.','SELECTED WORK'],['03','My creative toolkit.','TOOLS OF THE TRADE']])fs.writeFileSync(assets+'/section-'+n+'.svg',section(n,title,sub));
 for(let [name,label,w] of [['portfolio','ENTER PORTFOLIO',204],['linkedin','LINKEDIN',146],['email','LET’S TALK',164],['x','X / TWITTER',170]])fs.writeFileSync(assets+'/link-'+name+'.svg',shell(w,46,txt(15,29,label,12,'#cdb5ff',600,mono)+txt(w-16,29,'↗',18,'#84e6db',400,'text-anchor="end"')));
 if(process.env.STATIC_ONLY)return;
 const tasks=[['hero',72,t=>hero(t),840],['hero-mobile',60,t=>hero(t,true),520],['project-infogenius',40,t=>project(t),500],['project-comrade',40,t=>project(t,true),500]];
 for(let [name,count,fn,width] of tasks){let dir=frames+'/'+name;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});for(let i=0;i<count;i++){await sharp(Buffer.from(fn(i/count))).resize({width}).flatten({background:'#070916'}).png().toFile(dir+'/'+String(i).padStart(3,'0')+'.png');}console.log('Rendered',name,count,'frames');}
}
main().then(()=>{
 const {spawnSync}=require('child_process');
 for(const [name,fps] of [['hero',12],['hero-mobile',10],['project-infogenius',10],['project-comrade',10]]){
  const result=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate',String(fps),'-i',path.join(frames,name,'%03d.png'),'-filter_complex','[0:v]split[a][b];[a]palettegen=max_colors=256:stats_mode=full[p];[b][p]paletteuse=dither=bayer:bayer_scale=5','-loop','0',path.join(assets,name+'.gif')],{stdio:'inherit'});
  if(result.error||result.status!==0)throw new Error('FFmpeg export failed: '+name);
 }
 fs.rmSync(frames,{recursive:true,force:true});
}).catch(e=>{console.error(e);process.exit(1)});
