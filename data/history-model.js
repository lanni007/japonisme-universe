/* Historical layout model. Dates are decimal years; intervals are [start, end).
   Geographic anchors persist. Political groups contain anchors, never overwrite them. */
const HistoryModel = (() => {
  const regions = {
    jp: {name:'日本',en:'Japan',color:'#edb95f',yz:[-30,340],r:145},
    fr: {name:'フランス',en:'France',color:'#7dcad1',yz:[145,-15],r:130},
    en: {name:'イングランド',en:'England',color:'#91a9e8',yz:[390,-140],r:70},
    sc: {name:'スコットランド',en:'Scotland',color:'#91a9e8',yz:[520,-280],r:52},
    nl: {name:'北ネーデルラント',en:'Northern Low Countries',color:'#e69d77',yz:[70,-280],r:62},
    be: {name:'南ネーデルラント',en:'Southern Low Countries',color:'#d7b380',yz:[-100,-310],r:53},
    pt: {name:'ポルトガル地域',en:'Portuguese region',color:'#97c9a6',yz:[-375,60],r:60},
    es: {name:'スペイン地域',en:'Spanish regions',color:'#e6af88',yz:[-220,-90],r:74},
    dw: {name:'ドイツ西部',en:'Western German regions',color:'#b0a2dd',yz:[335,-460],r:62},
    de: {name:'ドイツ東部',en:'Eastern German regions',color:'#b0a2dd',yz:[160,-540],r:58},
    at: {name:'オーストリア地域',en:'Austrian region',color:'#d6a4bd',yz:[-55,-570],r:59},
    hu: {name:'ハンガリー地域',en:'Hungarian region',color:'#d6a4bd',yz:[-190,-750],r:48},
    cz: {name:'ボヘミア地域',en:'Bohemian region',color:'#d6a4bd',yz:[115,-740],r:48},
    it: {name:'イタリア地域',en:'Italian regions',color:'#a7cabc',yz:[-310,-445],r:69},
    cn: {name:'中国地域',en:'Chinese regions',color:'#bfbd77',yz:[230,550],r:85},
    kr: {name:'朝鮮半島',en:'Korean Peninsula',color:'#b9bfe4',yz:[35,690],r:55},
    ru: {name:'ロシア・東欧地域',en:'Russia / Eastern Europe',color:'#a6b9bd',yz:[430,425],r:76},
    us: {name:'北アメリカ東部',en:'North American regions',color:'#82b8d0',yz:[-295,690],r:94},
    ca: {name:'北アメリカ北部',en:'Northern North America',color:'#8dc5c3',yz:[-515,545],r:51},
    mx: {name:'メキシコ地域',en:'Mexican region',color:'#91bb95',yz:[-490,825],r:45},
    ar: {name:'ラプラタ地域',en:'Rio de la Plata region',color:'#c0c69c',yz:[-500,-165],r:54},
    mc: {name:'モナコ',en:'Monaco',color:'#d9c2a0',yz:[-85,-120],r:30}
  };
  const placeRegions = {
    edo:'jp',kyoto:'jp',uraga:'jp',yokohama:'jp',kagoshima:'jp',nagasaki:'jp',arita:'jp',osaka:'jp',hiraizumi:'jp',matsue:'jp',
    paris:'fr',nancy:'fr',lyon:'fr',giverny:'fr',pontaven:'fr',arles:'fr',saintremy:'fr',auvers:'fr',argenteuil:'fr',vetheuil:'fr',poissy:'fr',vence:'fr',saintpaul:'fr',
    london:'en',glasgow:'sc',amsterdam:'nl',leiden:'nl',nuenen:'nl',thehague:'nl',etten:'nl',zundert:'nl',brussels:'be',antwerp:'be',borinage:'be',
    lisbon:'pt',seville:'es',barcelona:'es',berlin:'de',dresden:'de',munich:'dw',kassel:'dw',vienna:'at',prague:'cz',budapest:'hu',
    turin:'it',venice:'it',milan:'it',guangzhou:'cn',liaodong:'cn',nanjing:'cn',ningbo:'cn',seoul:'kr',
    vitebsk:'ru',petersburg:'ru',moscow:'ru',newyork:'us',chicago:'us',boston:'us',losangeles:'us',sanfrancisco:'us',philadelphia:'us',washington:'us',
    vancouver:'ca',mexico:'mx',buenosaires:'ar',monaco:'mc'
  };
  const extraPlaces = {arles:['アルル',43.68,4.63],saintremy:['サン＝レミ',43.79,4.83],auvers:['オーヴェル',49.07,2.17],nuenen:['ニューネン',51.47,5.55],antwerp:['アントウェルペン',51.22,4.4],thehague:['ハーグ',52.08,4.3],etten:['エッテン',51.57,4.64],zundert:['ズンデルト',51.47,4.66],borinage:['ボリナージュ',50.43,3.85],argenteuil:['アルジャントゥイユ',48.95,2.25],vetheuil:['ヴェトゥイユ',49.06,1.7],poissy:['ポワシー',48.93,2.04],vitebsk:['ヴィテプスク',55.19,30.2],petersburg:['サンクトペテルブルク',59.93,30.31],moscow:['モスクワ',55.76,37.62],vence:['ヴァンス',43.72,7.11],saintpaul:['サン＝ポール＝ド＝ヴァンス',43.7,7.12],prague:['プラハ',50.08,14.44],budapest:['ブダペスト',47.5,19.04]};
  const sources = {
    lowlands:['オランダ王室：ネーデルラントの歴史','https://www.royal-house.nl/topics/history/history-of-the-kingdom-of-the-netherlands'],
    british:['英国議会：国家の成立年','https://api.parliament.uk/regnal-years/kingdoms'],
    austria:['ハプスブルク史：1867年の二重君主国','https://ww1.habsburger.net/en/chapters/dual-monarchy-two-states-single-empire/1000'],
    austria1804:['ハプスブルク史：1804年の帝国成立','https://www.habsburger.net/en/chapter/franz-i-and-austrian-empire'],
    austria1918:['オーストリア議会：共和国の成立','https://www.parlament.gv.at/verstehen/historisches/1918-1945/geburt-der-republik'],
    germany:['ドイツ連邦政府：1990年の再統一','https://www.bundesregierung.de/breg-de/schwerpunkte/deutsche-einheit/einigungsvertrag-353990'],
    iberia:['ポルトガル政府観光局：1580〜1640年','https://www.visitportugal.com/en/content/jardim-do-paco-episcopal'],
    portugal:['ポルトガル議会：1910年の共和制','https://www.parlamento.pt/Parlamento/Paginas/republica.aspx'],
    france:['ヴェルサイユ宮殿：フランスの共和制','https://en.chateauversailles.fr/sites/default/files/presse/documents/cp_150_ans_republique_vdef_en.pdf'],
    vangogh:['ゴッホ美術館：年譜','https://www.vangoghmuseum.nl/assets/98d4f72e-df9a-4790-8aee-49d41d1f41e2?c=d0d17502b7796a23a2765d41634814c8c4a83f693b08ed5936bc5da47d5561d9'],
    monet:['モネ財団：活動拠点の変遷','https://fondation-monet.com/wp-content/uploads/2024/03/dossier-institutionnel-EN-2024-6.pdf'],
    chagall:['国立シャガール美術館：伝記','https://musees-nationaux-alpesmaritimes.fr/chagall/en/biography-marc-chagall']
  };
  Object.assign(placeRegions,{gordes:'fr',orgeval:'fr',highfalls:'us'});
  Object.assign(extraPlaces,{gordes:['ゴルド',43.91,5.2],orgeval:['オルジュヴァル',48.98,1.98],highfalls:['ハイ・フォールズ',41.83,-74.13]});
  sources.chagallChronology=['国立シャガール美術館：年譜','https://musees-nationaux-alpesmaritimes.fr/chagall/en/actualite/chronologie-de-marc-chagall'];
  // Only documented periods are trajectories. Gaps remain gaps, not invented residences.
  const profiles = {
    vangogh: {birth:1853.24,death:1890.58,origin:'ズンデルト（オランダ）',originEn:'Zundert, Netherlands',source:'vangogh',stays:[
      [1881,1881.99,'etten'],[1882,1883.7,'thehague'],[1883.95,1885.9,'nuenen'],[1885.9,1886.17,'antwerp'],[1886.17,1888.14,'paris'],[1888.14,1889.35,'arles'],[1889.35,1890.38,'saintremy'],[1890.38,1890.58,'auvers']
    ]},
    monet: {birth:1840.86,death:1926.93,origin:'パリ（フランス）',originEn:'Paris, France',source:'monet',stays:[[1871,1878,'argenteuil'],[1878,1881,'vetheuil'],[1881,1883.32,'poissy'],[1883.32,1926.93,'giverny']]},
    chagall: {birth:1887.51,death:1985.24,origin:'ヴィテプスク（当時ロシア帝国、現在ベラルーシ）',originEn:'Vitebsk (then Russian Empire; now Belarus)',source:'chagall',stays:[
      [1907,1910,'petersburg'],[1911,1914.5,'paris'],[1914.5,1915.5,'vitebsk'],[1915.5,1918,'petersburg'],[1918,1920,'vitebsk'],[1920,1922,'moscow'],[1922,1923,'berlin'],[1923,1939,'paris'],[1940,1941.4,'gordes'],[1941.4,1946,'newyork'],[1946,1948,'highfalls'],[1948,1950,'orgeval'],[1950,1966,'vence'],[1966,1985.24,'saintpaul']
    ]}
  };
  const additionalNodes = [
    ['chagall','artist','マルク・シャガール',1911,'paris','1887〜1985','ヴィテプスクに生まれ、パリ、ロシア、ベルリン、アメリカ、南フランスなどで活動した画家。ここでは移動歴の例として収録し、日本美術との直接の影響関係は追加していない。','出典：国立シャガール美術館の伝記'],
    ['vg_plum','style','ゴッホ：広重「梅屋舗」の模写',1887,'paris','1887年・パリ','ゴッホが広重の浮世絵を油絵に置き換えた作品。画家が翌年アルルへ移っても、制作の記録はパリに残る。','元データのゴッホと広重の関係を、制作記録として分けて表示。'],
    ['monet_japonaise','style','モネ「ラ・ジャポネーズ」展示',1876,'paris','1876年・パリで展示','着物姿のカミーユを描いた作品。ここでは1876年のパリでの展示記録を配置し、制作地とは区別している。','図版・説明は旧版のモネ項目から引き継ぎ。']
  ];
  const newLinks = [['vangogh','vg_plum','tie','制作：1887年、パリ'],['hiroshige','vg_plum','infl','広重の浮世絵を油彩で模写'],['monet','monet_japonaise','tie','1876年のパリで作品を展示']];
  const transitions = [
    {year:1580.7,id:'iberia',title:'イベリアの同君連合',en:'Iberian dynastic union',text:'王国の区別を残し、共通の君主を持つ範囲を外側の球で示します。',before:1578,after:1584},
    {year:1640.92,id:'iberia',title:'ポルトガルの王政復古',en:'Portuguese Restoration',text:'ポルトガルを包んでいた同君連合の外側の球が解けます。',before:1638,after:1643},
    {year:1707.33,id:'britain',title:'グレートブリテン王国の成立',en:'Union of England and Scotland',text:'イングランドとスコットランドの球が、一つの国家の球にまとまります。',before:1705,after:1710},
    {year:1815.2,id:'lowlands',title:'南北ネーデルラントの統合',en:'Union of the Low Countries',text:'南北の地域が、ネーデルラント連合王国の球にまとまります。',before:1814.5,after:1817},
    {year:1830.75,id:'lowlands',title:'ベルギーの分離',en:'Belgium separates',text:'南部の分離を1830年の分岐として示します。オランダによる独立承認は1839年です。',before:1828,after:1832},
    {year:1918.85,id:'habsburg',title:'ハプスブルク君主国の解体',en:'Dissolution of the Habsburg monarchy',text:'表示中の中欧地域が分かれます。帝国全土や全ての後継国を表す地図ではありません。',before:1916,after:1921},
    {year:1949.77,id:'germany',title:'東西ドイツの成立',en:'Two German states',text:'二つの地域の球を、西ドイツと東ドイツとして分けて表示します。',before:1948,after:1952},
    {year:1990.756,id:'germany',title:'ドイツ再統一',en:'German reunification',text:'1990年10月3日、東西の球が一つにまとまります。',before:1988,after:1992}
  ];
  const hash = s => { let h=2166136261; for(const c of s) h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0; };
  const pick = (t, rows) => { let r=rows[0];for(const row of rows)if(t>=row[0])r=row;return {name:r[1],en:r[2],detail:r[3]||'',detailEn:r[4]||''}; };
  function label(id,t) {
    const base={name:regions[id].name,en:regions[id].en,detail:'地域の位置',detailEn:'Geographic anchor'};
    const rows={
      jp:[[900,'日本','Japan','地域の通史','Regional history'],[1603,'日本','Japan','江戸幕府の時代','Tokugawa period'],[1868,'日本','Japan','明治以降','From the Meiji period'],[1945,'日本','Japan','戦後','Postwar period']],
      fr:[[900,'フランス地域','French regions'],[1589,'フランス王国','Kingdom of France','ブルボン朝','House of Bourbon'],[1792.72,'フランス共和国','French Republic','第一共和政','First Republic'],[1804.38,'フランス帝国','French Empire','第一帝政','First Empire'],[1814.26,'フランス王国','Kingdom of France','王政復古','Bourbon Restoration'],[1815.21,'フランス帝国','French Empire','百日天下','Hundred Days'],[1815.48,'フランス王国','Kingdom of France','王政復古','Bourbon Restoration'],[1830.6,'フランス王国','Kingdom of France','七月王政','July Monarchy'],[1848.15,'フランス共和国','French Republic','第二共和政','Second Republic'],[1852.92,'フランス帝国','French Empire','第二帝政','Second Empire'],[1870.67,'フランス共和国','French Republic','第三共和政','Third Republic'],[1940.5,'フランス地域','France','占領・ヴィシー政権・自由フランス','Occupation / Vichy / Free France'],[1944.65,'フランス共和国','French Republic','臨時政府','Provisional government'],[1946.8,'フランス共和国','French Republic','第四共和政','Fourth Republic'],[1958.75,'フランス共和国','French Republic','第五共和政','Fifth Republic']],
      en:[[900,'イングランド地域','English region'],[1500,'イングランド王国','Kingdom of England'],[1649.08,'イングランド共和国','Commonwealth of England'],[1660.4,'イングランド王国','Kingdom of England']],
      sc:[[900,'スコットランド地域','Scottish region'],[1500,'スコットランド王国','Kingdom of Scotland'],[1654,'スコットランド地域','Scottish region','共和政下','Commonwealth period'],[1660.4,'スコットランド王国','Kingdom of Scotland']],
      nl:[[900,'北ネーデルラント','Northern Low Countries'],[1581.57,'ネーデルラント連邦共和国','Dutch Republic'],[1795.05,'バタヴィア共和国','Batavian Republic'],[1806.43,'ホラント王国','Kingdom of Holland'],[1810.52,'北ネーデルラント','Northern Low Countries','フランス帝国領','Within the French Empire'],[1813.9,'ネーデルラント','Netherlands','独立回復','Restored independence'],[1830.75,'オランダ王国','Kingdom of the Netherlands']],
      be:[[900,'南ネーデルラント','Southern Low Countries'],[1581,'スペイン領南ネーデルラント','Spanish Netherlands'],[1714,'オーストリア領南ネーデルラント','Austrian Netherlands'],[1795.75,'南ネーデルラント','Southern Low Countries','フランス領','Under French rule'],[1814,'南ネーデルラント','Southern Low Countries','移行期','Transition period'],[1830.75,'ベルギー','Belgium','1830年分離／1839年承認','Separation 1830 / recognition 1839'],[1831.55,'ベルギー王国','Kingdom of Belgium']],
      pt:[[900,'イベリア半島西部','Western Iberia'],[1143,'ポルトガル王国','Kingdom of Portugal'],[1580.7,'ポルトガル王国','Kingdom of Portugal','同君連合下','Dynastic union'],[1640.92,'ポルトガル王国','Kingdom of Portugal','王政復古','Restored monarchy'],[1910.76,'ポルトガル共和国','Portuguese Republic']],
      es:[[900,'イベリア半島の諸地域','Iberian regions'],[1516,'スペイン王政','Spanish monarchy','複数の王国からなる君主国','Composite monarchy'],[1931.28,'スペイン共和国','Spanish Republic'],[1936.55,'スペイン地域','Spanish regions','内戦','Civil War'],[1939.25,'スペイン','Spain','フランコ体制','Franco regime'],[1975.9,'スペイン王国','Kingdom of Spain']],
      at:[[900,'オーストリア地域','Austrian region'],[1918.86,'ドイツ＝オーストリア共和国','Republic of German-Austria'],[1919.7,'オーストリア共和国','Republic of Austria'],[1938.2,'オーストリア地域','Austrian region','ナチス・ドイツによる併合','Annexed by Nazi Germany'],[1945.32,'オーストリア共和国','Republic of Austria']],
      hu:[[900,'ハンガリー地域','Hungarian region'],[1918.87,'ハンガリー','Hungary']],
      cz:[[900,'ボヘミア地域','Bohemian region'],[1918.82,'チェコスロヴァキア','Czechoslovakia','ボヘミア地域を表示','Bohemian anchor shown'],[1939.2,'ボヘミア・モラヴィア','Bohemia and Moravia','ナチス・ドイツの保護領','Nazi protectorate'],[1945.35,'チェコスロヴァキア','Czechoslovakia'],[1993,'チェコ共和国','Czech Republic']],
      it:[[900,'イタリア諸地域','Italian regions'],[1861.21,'イタリア王国','Kingdom of Italy'],[1946.42,'イタリア共和国','Italian Republic']],
      cn:[[900,'中国地域','Chinese regions'],[1368,'明','Ming'],[1644,'中国地域','Chinese regions','明末清初','Ming–Qing transition'],[1683,'清','Qing'],[1912,'中華民国','Republic of China'],[1949.75,'中華人民共和国','People’s Republic of China']],
      kr:[[900,'朝鮮半島','Korean Peninsula'],[1392,'朝鮮','Joseon'],[1897.78,'大韓帝国','Korean Empire'],[1910.66,'朝鮮半島','Korean Peninsula','日本の植民地支配下','Under Japanese colonial rule'],[1945.62,'朝鮮半島','Korean Peninsula','南北に分割','Divided peninsula'],[1948.62,'大韓民国・ソウル','South Korea / Seoul','既存項目はソウルを配置','Seoul records shown']],
      ru:[[900,'東欧・ロシア地域','Eastern Europe / Russia'],[1721,'ロシア帝国','Russian Empire'],[1917.2,'ロシア・東欧地域','Russia / Eastern Europe','革命と内戦','Revolution and civil war'],[1922.99,'ソビエト連邦圏','Soviet Union','表示地点の概要','Overview of represented places'],[1991.99,'ロシア・ベラルーシ地域','Russia / Belarus','地点ごとに区別','Separate regional anchors']],
      us:[[900,'北アメリカの諸地域','North American regions'],[1776.51,'アメリカ合衆国','United States']],ca:[[900,'北アメリカ北部','Northern North America'],[1867.5,'カナダ','Canada']],ar:[[900,'ラプラタ地域','Rio de la Plata region'],[1816,'アルゼンチン地域','Argentine region']],mx:[[900,'メキシコ地域','Mexican region'],[1821,'メキシコ','Mexico']]
    };
    return rows[id]?pick(t,rows[id]):base;
  }
  function groupsAt(t) {
    const result=[],used=new Set();
    function put(id,members,name,en,detail='',detailEn='',source='') { members.forEach(m=>used.add(m));result.push({id,members,name,en,detail,detailEn,source}); }
    if(t>=1707.33)put('britain',['en','sc'],t<1801?'グレートブリテン王国':'連合王国',t<1801?'Kingdom of Great Britain':'United Kingdom',t<1801?'1707年の統合':t<1927?'グレートブリテン及びアイルランド':'グレートブリテン及び北アイルランド',t<1801?'Union of 1707':t<1927?'Great Britain and Ireland':'Great Britain and Northern Ireland','british');
    if(t>=1815.2&&t<1830.75)put('lowlands',['nl','be'],'ネーデルラント連合王国','United Kingdom of the Netherlands','南北ネーデルラントの統合','Union of the northern and southern provinces','lowlands');
    if(t>=1526&&t<1918.85)put('habsburg',['at','hu','cz'],t<1804.6?'ハプスブルク君主国':t<1867.45?'オーストリア帝国':'オーストリア＝ハンガリー',t<1804.6?'Habsburg monarchy':t<1867.45?'Austrian Empire':'Austria-Hungary',t<1867.45?'表示中の中欧地域／領域は模式化':'二重君主国／表示中の中欧地域',t<1867.45?'Selected Central European regions':'Dual monarchy / selected regions',t<1804.6?'austria1804':t<1867.45?'austria1804':'austria');
    if(!(t>=1949.77&&t<1990.756)) {
      const n=t<1871?'ドイツ諸邦':t<1918.86?'ドイツ帝国':t<1933.08?'ドイツ共和国':t<1945.35?'ドイツ（ナチス政権）':t<1949.77?'ドイツの占領地域':'ドイツ連邦共和国';
      const e=t<1871?'German states':t<1918.86?'German Empire':t<1933.08?'German Republic':t<1945.35?'Germany (Nazi regime)':t<1949.77?'Occupied German regions':'Federal Republic of Germany';
      put('germany',['dw','de'],n,e,t<1871?'地域をまとめた表示／単一国家ではない':t>=1990.756?'1990年の再統一':'',t<1871?'Regional grouping, not one state':t>=1990.756?'Reunification of 1990':'','germany');
    } else { put('dw',['dw'],'ドイツ連邦共和国','Federal Republic of Germany','西ドイツ','West Germany','germany');put('de',['de'],'ドイツ民主共和国','German Democratic Republic','東ドイツ','East Germany','germany'); }
    for(const id of Object.keys(regions)) if(!used.has(id)) {
      const a=label(id,t);put(id,[id],a.name,a.en,a.detail,a.detailEn,['nl','be'].includes(id)?'lowlands':id==='fr'?'france':id==='pt'?'portugal':['at','hu','cz'].includes(id)?'austria1918':'');
    }
    return result.map(g=>{
      const volume=g.members.reduce((a,id)=>a+regions[id].r**3,0);
      const yz=[0,0];for(const id of g.members){const v=regions[id].r**3/volume;yz[0]+=regions[id].yz[0]*v;yz[1]+=regions[id].yz[1]*v;}
      return {...g,yz,r:Math.cbrt(volume),color:regions[g.members[0]].color};
    });
  }
  function stayAt(id,t) { return profiles[id]?.stays.find(s=>t>=s[0]&&t<s[1])||null; }
  function lastStay(id,t){return profiles[id]?.stays.filter(s=>s[0]<=t).at(-1)||null;}
  function placeAt(node,t,span='century') { return profiles[node.id]?(stayAt(node.id,t)||(span==='history'?lastStay(node.id,t):null))?.[2]||null:node.place; }
  function groupForPlace(place,t,groups=groupsAt(t)) { const region=placeRegions[place];return groups.find(g=>g.members.includes(region))||null; }
  function visibleAt(node,t,span='century') {
    if(profiles[node.id])return Boolean(stayAt(node.id,t)||(span==='history'&&lastStay(node.id,t)));
    if(node.year==null)return false;
    const from=span==='history'?-Infinity:span==='century'?Math.floor(t/100)*100:t-Number(span);
    return node.year>=from&&node.year<=t;
  }
  function cityOffset(place,region) {
    const keys=Object.keys(placeRegions).filter(k=>placeRegions[k]===region).sort();
    const i=keys.indexOf(place),angle=i*2.3999632297;
    const radius=Math.min(regions[region]?.r||60,90)*(.25+.42*Math.sqrt((i+1)/(keys.length+1)));
    return [Math.cos(angle)*radius,Math.sin(angle)*radius];
  }
  return {regions,placeRegions,extraPlaces,sources,profiles,additionalNodes,newLinks,transitions,hash,label,groupsAt,stayAt,lastStay,placeAt,groupForPlace,visibleAt,cityOffset};
})();
if(typeof module!=='undefined')module.exports=HistoryModel;
