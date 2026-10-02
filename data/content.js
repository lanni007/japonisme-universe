/* Shared records, relationships and editorial copy, preserved from the regional edition. */
(()=>{
'use strict';
const M=HistoryModel;
const places={...DATA.PLACES,...M.extraPlaces};
const nodes=[...DATA.N,...M.additionalNodes].map(a=>({id:a[0],kind:a[1],name:a[2],year:a[3],place:a[4],subtitle:a[5],description:a[6],note:a[7]||''}));
const byId=new Map(nodes.map(n=>[n.id,n]));
const links=[...DATA.L,...M.newLinks].map((a,i)=>({id:i,a:a[0],b:a[1],kind:a[2],reason:a[3]}));
const imageMap={...IMAGES,monet_japonaise:IMAGES.monet};

const EXTRA_EN={
  'ゴルド':'Gordes','オルジュヴァル':'Orgeval','ハイ・フォールズ':'High Falls','1887〜1985':'1887–1985','1887年・パリ':'1887 · Paris','1876年・パリで展示':'Exhibited in Paris, 1876',
  '元データのゴッホと広重の関係を、制作記録として分けて表示。':'The existing Van Gogh–Hiroshige connection is also represented as a dated work record.',
  '図版・説明は旧版のモネ項目から引き継ぎ。':'Image and description carried over from the original Monet entry.',
  '制作：1887年、パリ':'Painted in Paris, 1887','広重の浮世絵を油彩で模写':'Oil painting after a Hiroshige print','1876年のパリで作品を展示':'Work exhibited in Paris in 1876',
  'マルク・シャガール':'Marc Chagall','ゴッホ：広重「梅屋舗」の模写':'Van Gogh: copy after Hiroshige’s Plum Garden','モネ「ラ・ジャポネーズ」展示':'Monet: La Japonaise exhibited',
  'アルル':'Arles','サン＝レミ':'Saint-Rémy','オーヴェル':'Auvers-sur-Oise','ニューネン':'Nuenen','アントウェルペン':'Antwerp','ハーグ':'The Hague','エッテン':'Etten','ズンデルト':'Zundert','ボリナージュ':'Borinage','アルジャントゥイユ':'Argenteuil','ヴェトゥイユ':'Vétheuil','ポワシー':'Poissy','ヴィテプスク':'Vitebsk','サンクトペテルブルク':'Saint Petersburg','モスクワ':'Moscow','ヴァンス':'Vence','サン＝ポール＝ド＝ヴァンス':'Saint-Paul-de-Vence','プラハ':'Prague','ブダペスト':'Budapest',
  'ヴィテプスクに生まれ、パリ、ロシア、ベルリン、アメリカ、南フランスなどで活動した画家。ここでは移動歴の例として収録し、日本美術との直接の影響関係は追加していない。':'Born in Vitebsk, Chagall worked in Paris, Russia, Berlin, the United States and southern France. His documented moves demonstrate activity-based placement; no direct influence from Japanese art has been added.',
  'ゴッホが広重の浮世絵を油絵に置き換えた作品。画家が翌年アルルへ移っても、制作の記録はパリに残る。':'Van Gogh translated Hiroshige’s print into an oil painting. The record of its creation stays in Paris when the artist moves to Arles the next year.',
  '着物姿のカミーユを描いた作品。ここでは1876年のパリでの展示記録を配置し、制作地とは区別している。':'A portrait of Camille in a kimono. This point records its exhibition in Paris in 1876, rather than asserting its place of creation.'
};

const MEANING_TYPES={export:['輸出・交易','Export & trade'],exhibition:['展示・国際交流','Exhibition & exchange'],work:['制作・発表','Work & presentation'],influence:['表現への影響','Influence on art'],activity:['活動・交流','Activity & exchange'],publication:['出版・発信','Publication'],return:['日本への還流','Return to Japan'],style:['様式・運動の成立','Style & movement'],origin:['文化・技法の成立','Cultural development'],crisis:['社会・産業への影響','Social & industrial impact']};
// Short editorial summaries of the existing records. Record dates are not birth dates.
const MEANINGS={
fan:['export','日本の折りたたみ扇が中国へ渡り、珍重された。','Japanese folding fans reached China and became prized objects.'],
sword:['export','勘合貿易で、日本刀が主要な輸出品として中国へ渡った。','Japanese swords were a major export to China in tally trade.'],
byobu:['export','金屏風は、明の皇帝への贈り物としても海を渡った。','Gold screens crossed the sea, including as gifts to Ming emperors.'],
namban:['work','日本の絵師が、来航したポルトガル人を屏風に描いた。','Japanese painters depicted visiting Portuguese people on folding screens.'],
kabuki:['origin','町人の芝居が育ち、浮世絵の役者絵にもつながった。','Popular theatre developed and became a subject for actor prints.'],
imari:['export','中国磁器の輸出が滞り、オランダ東インド会社が有田の磁器を買い付けた。','Disrupted Chinese exports led the Dutch East India Company to buy Arita porcelain.'],
lacquer:['export','日本の漆器が珍重され、欧州の模倣技法にもつながった。','Prized Japanese lacquerware inspired European imitation techniques.'],
rinpa:['work','草花を大胆に単純化する、日本の装飾表現を示す。','An example of Japanese decoration that boldly simplifies plants and flowers.'],
sharaku:['work','写楽が強烈な役者絵を制作した時期。','The period when Sharaku produced his striking actor prints.'],
utamaro:['work','美人画や母子像を描き、のちにパリでも評価された。','His images of women and children later gained recognition in Paris.'],
hokusai:['influence','北斎の波や人物の表現が海を渡り、西洋の画家を刺激した。','Hokusai’s waves and figures crossed the sea and inspired Western artists.'],
hiroshige:['influence','広重の大胆な構図は、ゴッホが油彩で模写する手本にもなった。','Hiroshige’s bold compositions became models for Van Gogh’s oil copies.'],
expo1862:['exhibition','集められた日本の工芸品がロンドンで展示され、西洋の注目を集めた。','Japanese crafts exhibited in London attracted Western attention.'],
expo1867:['exhibition','日本がパリ万博に初参加し、幕府や薩摩藩が出展した。','Japan first participated in the Paris exposition; the shogunate and Satsuma exhibited.'],
expo1873:['exhibition','明治政府が工芸品と日本庭園をウィーンで紹介した。','The Meiji government presented crafts and a Japanese garden in Vienna.'],
expo1876:['exhibition','日本の展示が、アメリカで日本趣味が広がるきっかけになった。','Japanese exhibits helped spread enthusiasm for Japan in the United States.'],
expo1878:['exhibition','日本の展示が人気を集め、パリの日本熱を強めた。','Popular Japanese exhibits intensified enthusiasm for Japan in Paris.'],
expo1888:['exhibition','日本も参加し、バルセロナで日本美術を知る機会が広がった。','Japan’s participation introduced Japanese art to a wider audience in Barcelona.'],
expo1893:['exhibition','日本がシカゴに「鳳凰殿」を建て、建築と庭園を紹介した。','Japan built the Ho-o-den in Chicago, presenting architecture and gardens.'],
expo1900:['exhibition','林忠正が日本側を担い、アール・ヌーヴォーが華やぐパリで出展した。','Hayashi Tadamasa represented Japan amid Art Nouveau’s prominence in Paris.'],
hayashi:['activity','通訳として渡仏し、美術商として浮世絵を売り、画家たちをつないだ。','After arriving as an interpreter, he traded prints and connected with artists in Paris.'],
lartnouveau:['style','ビングの店名「アール・ヌーヴォー」が、様式全体の呼び名になった。','Bing’s shop name, Art Nouveau, became the name of a wider style.'],
tenshin:['publication','英語の『茶の本』を出版し、日本の美意識を海外へ語った。','The Book of Tea presented Japanese aesthetics to readers in English.'],
monet:['influence','着物姿の妻を描いた「ラ・ジャポネーズ」を発表した。','Monet presented La Japonaise, depicting his wife in a kimono.'],
monet_japonaise:['exhibition','「ラ・ジャポネーズ」をパリで展示した記録。','A record of La Japonaise being exhibited in Paris.'],
degas:['influence','浮世絵の構図から学んだとされ、踊り子などを大胆に切り取って描いた。','His cropped compositions of dancers are thought to reflect lessons from Japanese prints.'],
vangogh:['influence','パリで広重の版画を油彩で模写し、日本の表現を取り込んだ。','In Paris, Van Gogh copied Hiroshige prints in oils, incorporating Japanese imagery.'],
vg_plum:['work','広重の「梅屋舗」をもとに、パリで油彩の模写を制作した。','He made an oil copy of Hiroshige’s Plum Garden in Paris.'],
cassatt:['influence','浮世絵展を見た経験から、母子を描く色刷り版画の連作へ進んだ。','Seeing a Japanese print exhibition inspired a series of colour prints of mothers and children.'],
lautrec:['work','平らな色面と大胆な構図を、街のポスターに用いた。','He brought flat colours and bold compositions to street posters.'],
whistler:['influence','日本の陶磁器や扇を絵に取り入れ、室内装飾も手がけた。','He incorporated Japanese ceramics and fans into paintings and worked on interior decoration.'],
klimt:['influence','日本美術を収集。平面的な装飾にその影響を見る解釈もある。','He collected Japanese art; some interpretations connect it with his flat decoration.'],
mucha:['work','女優のポスターで名を広め、植物の曲線が新しい様式を象徴した。','His theatre posters brought fame, and plant-like curves became emblems of a new style.'],
galle:['activity','虫や植物の形を生かしたガラス工芸で活動した。','He worked in glass, drawing on the shapes of insects and plants.'],
guimard:['work','植物の茎を思わせる曲線を、パリ地下鉄の入口に使った。','He used plant-like curves for entrances to the Paris Métro.'],
horta:['work','タッセル邸で鉄と石の曲線を生かし、新しい建築表現を示した。','The Hôtel Tassel used curves in iron and stone to demonstrate a new architecture.'],
gaudi:['activity','カサ・ビセンスなどに取り組み、自然や日本趣味を建築に取り入れた。','Working on Casa Vicens and other projects, he drew on nature and Japanese taste.'],
tiffany:['activity','花やトンボのガラス工芸を制作し、パリではビングが作品を扱った。','He made floral and dragonfly glass designs; Bing handled his work in Paris.'],
fujishima:['return','アール・ヌーヴォー風の表現が、『みだれ髪』の表紙へ戻ってきた。','Art Nouveau-style design returned to Japan on the cover of Midaregami.'],
goyo:['return','海外の新しい装飾表現を、日本の本の装丁に取り込んだ。','He brought new decorative ideas from abroad into Japanese book design.'],
akiko:['publication','『みだれ髪』を発表。表紙にも新しい装飾表現が使われた。','Midaregami was published with new decorative imagery on its cover.'],
soseki:['publication','『吾輩は猫である』などの刊行期。装丁にも海外の様式が関わった。','The publication period of I Am a Cat, with overseas styles also influencing its design.'],
jugend:['style','雑誌『ユーゲント』の名前が、ドイツ語圏の新様式の呼び名になった。','The magazine Jugend gave its name to the new style in German-speaking regions.'],
secession:['style','保守的な美術界から離れ、新しい芸術を求める集団が成立した。','A group broke from the conservative art establishment to pursue new art.'],
imperial:['return','日本から学んだライトが、日本に帝国ホテルを建てた。','Wright, who had learned from Japan, built the Imperial Hotel in Japan.'],
manet:['work','ゾラの肖像画の背景に、浮世絵と日本の屏風を描き込んだ。','He placed Japanese prints and a Japanese screen behind Zola in the portrait.'],
gauguin:['influence','平らな色面と太い輪郭線を用い、浮世絵の影響が指摘される。','His flat colour and strong outlines have been linked to Japanese prints.'],
beardsley:['influence','白黒の平面的な線画に、浮世絵の影響が指摘される。','Japanese-print influences have been identified in his flat black-and-white drawings.'],
kurosawa:['activity','『羅生門』の頃。映画祭での評価を経て、海外の映画づくりにも影響した。','Around Rashomon: festival recognition helped his work influence filmmaking abroad.'],
mizoguchi:['activity','『雨月物語』などが国際映画祭で評価され、日本映画を海外へ伝えた。','Films including Ugetsu gained festival recognition and brought Japanese cinema abroad.'],
miyazaki:['activity','『風の谷のナウシカ』の頃。後の『千と千尋』は海外でも高く評価された。','Around Nausicaä: his later Spirited Away would receive major international recognition.']
};

const CAUSES={
  imari:{ja:['中国の明清交代の混乱で、磁器の輸出が滞る。','オランダ東インド会社が、仕入れ先として有田に目を向ける。','日本の磁器が海外へ渡り、欧州で収集・模倣される。'],en:['The Ming–Qing transition disrupts Chinese porcelain exports.','The Dutch East India Company turns to Arita as a source.','Japanese porcelain travels abroad and is collected and imitated in Europe.'],ids:['voc','imari','meissen','japanpalace']},
  pebrine:{ja:['フランス・イタリアで蚕の病気が広がり、絹産業が危機に陥る。','生産者や商人が、日本の蚕卵と生糸を求める。','日本からの供給が求められ、フランスと日本の結びつきが強まる。'],en:['Silkworm disease threatens silk production in France and Italy.','Producers and merchants seek silkworm eggs and raw silk from Japan.','Demand for Japanese supplies strengthens ties between France and Japan.'],ids:['pebrine','expo1867']},
  treaties:{ja:['関税自主権などを制限する、不平等な条約が結ばれる。','日本側は条約改正をめざし、「西洋並み」の国家だと示そうとする。','鹿鳴館の舞踏会など、外交のための欧化が進む。'],en:['Unequal treaties restrict powers including tariff autonomy.','Japanese leaders seek revision by presenting Japan as a state on Western terms.','Westernization becomes part of diplomacy, including balls at the Rokumeikan.'],ids:['treaties','rokumeikan','meiji']},
  opium:{ja:['清がアヘン戦争に敗れ、不利な条約を結ばされる。','日本でも、西洋列強の力を警戒する材料になる。','元資料では、幕府が戦争を避けて開国へ進む背景として結びつけられている。'],en:['Qing China loses the Opium War and faces unequal treaties.','The outcome serves as a warning about Western powers in Japan.','The original records connect this warning with the shogunate choosing opening over war.'],ids:['opium','treaties']},
  perry:{ja:['アメリカの艦隊が来航し、開国を迫る。','幕府が、外国との交渉と条約へ進む。','人や物が海を渡る条件が変わっていく。'],en:['An American fleet demands that Japan open.','The shogunate moves into negotiations and treaties.','Conditions for people and goods to cross the sea change.'],ids:['perry','treaties']},
  satsuei:{ja:['薩摩・長州が西洋の艦隊と戦い、軍事力の差に直面する。','外国を打ち払う攘夷の限界を知り、西洋化へ向かう。','西洋の知識・技術を取り入れる方向へ行動が変わる。'],en:['Satsuma and Choshu face Western fleets and a gap in military power.','They recognize the limits of expelling foreigners and turn toward Westernization.','Their actions shift toward adopting Western knowledge and technology.'],ids:['satsuei','meiji']},
  haibutsu:{ja:['国内の神仏分離を背景に、寺院や仏像が破壊される。','寺の宝物などが手放され、海外の収集家の手にも渡る。','美術品の流出が進む一方、のちに保存の仕組みが作られる。'],en:['Separation of Shinto and Buddhism is followed by destruction of temples and images.','Treasures are relinquished, with some acquired by overseas collectors.','Art flows abroad; preservation measures are later established.'],ids:['haibutsu','outflow','kosha']},
  sangoku:{ja:['ロシア・ドイツ・フランスが、遼東半島の返還を日本に迫る。','日本は返還を受け入れ、国内では屈辱が強調される。','「臥薪嘗胆」を合言葉に、軍備拡張へ進む。'],en:['Russia, Germany and France press Japan to return the Liaodong Peninsula.','Japan accepts; humiliation is emphasized at home.','The slogan of enduring hardship helps mobilize military expansion.'],ids:['sangoku','gashin']},
  occupation:{ja:['敗戦と占領で、日本の社会や文化の条件が大きく変わる。','アメリカの音楽・映画が流入し、歌舞伎は占領下の検閲にも向き合う。','外からの文化が広がり、外の人による文化保護も起こる。'],en:['Defeat and occupation change the conditions of Japanese society and culture.','American music and film arrive, while kabuki faces occupation censorship.','Foreign culture spreads; outsiders also help preserve existing culture.'],ids:['occupation','bowers']}
};

const pressureIds=['imari','pebrine','treaties','satsuei','haibutsu','sangoku','occupation'];
DATA.STORIES.push({id:'pressure_actions',t:'外圧が人を動かす',thesis:'貿易・病気・条約・戦争を、きっかけと人の行動からたどる。',chapters:pressureIds.map(id=>{const n=byId.get(id),c=CAUSES[id];return{t:n.name,why:c.ja.join(' '),ids:c.ids,y0:n.year,y1:Math.max(n.year,...c.ids.map(k=>byId.get(k)?.year||0))};})});
Object.assign(EXTRA_EN,{'外圧が人を動かす':'How external pressures change human action','貿易・病気・条約・戦争を、きっかけと人の行動からたどる。':'Follow trade, disease, treaties and war through triggers and human responses.'});for(const c of Object.values(CAUSES))EXTRA_EN[c.ja.join(' ')]=c.en.join(' ');

// Editorial interpretation of the user-supplied essay, with bibliographic checks.
Object.assign(MEANINGS,{
  bushido:['publication','新渡戸稲造は英語で、武士の倫理を手がかりに日本の道徳観を海外へ説明した。','Nitobe wrote in English, presenting his account of Japanese ethics through the ideals of the samurai.'],
  yokohama_trade:['export','開港で、人や商品だけでなく、機械・生活様式・新しい日本像も行き交うようになった。','Open ports brought exchanges of people, goods, machines, ways of life and images of Japan.'],
  godwin:['influence','日本の家具や美術に学んだ建築家が、細い部材と直線を生かした家具を設計した。','An architect informed by Japanese art and furniture designed slender, linear furnishings.'],
  dresser:['influence','日本の工芸を学び、装飾を抑えた形や機能を英国の製品デザインへ取り入れた。','Studying Japanese craft, Dresser brought restrained forms and functional ideas into British design.'],
  akiko:['return','歌集『みだれ髪』の装丁にアール・ヌーヴォーの影響。海外へ渡った美が、日本の本で別の表現になる。','Art Nouveau informed Midaregami’s cover: ideas that travelled overseas took new form in a Japanese book.'],
  soseki:['return','漱石の小説を、五葉の装丁が包む。国内の近代文学と、海を越えて巡った装飾表現が出会う。','Soseki’s novel meets Goyo’s book design: modern Japanese literature and decorative ideas circulating across borders.'],
  tenshin:['publication','『茶の本』を英語で刊行。茶や美術を通して、日本の美意識を自らの言葉で海外へ語った。','The Book of Tea used English to present Japanese aesthetics through tea and art in Okakura’s own voice.'],
  cassatt:['influence','1890年の浮世絵展に刺激を受け、色刷り版画を制作。模様と色面で女性の日常を描いた。','Inspired by the 1890 Japanese-print exhibition, Cassatt made colour prints using patterns and colour planes to depict everyday life.']
});
const bookStory={id:'japan_in_its_own_words',t:'日本を語る本、美が帰る本',thesis:'海外からのまなざしに応え、自分たちの言葉と形で日本を表現し直す。',chapters:[
{t:'英語で日本の倫理を語る — 『武士道』',why:'新渡戸稲造は、武士の倫理を西洋の読者にも伝わる言葉で説明しようとした。1900年版の表紙を見ながら、著者が構成した日本像を読む。日本人全員の価値観をそのまま代表する本ではない。',ids:['bushido','nitobegarden'],y0:1900,y1:1900},
{t:'美が装丁になって帰る — 『みだれ髪』',why:'与謝野晶子の歌集を藤島武二が装う。表紙にはアール・ヌーヴォーの影響が見られる。海外向けの日本紹介書ではなく、海を越えて変化した美が国内の文学と出会う場面として読む。',ids:['akiko','fujishima','mucha'],y0:1901,y1:1901},
{t:'日本の内側を見つめる — 『吾輩は猫である』',why:'夏目漱石の小説と橋口五葉の装丁。海外留学を経験した漱石は、日本の近代社会を内側から問い直した。装丁の国際的なつながりと、本文の社会への問いは、別々の手がかりとしてたどる。',ids:['soseki','goyo'],y0:1905,y1:1905},
{t:'茶と美術から日本を語る — 『茶の本』',why:'岡倉天心は1906年、英語の『茶の本』を刊行した。日本を戦争や珍奇な品々だけで理解する見方に対し、茶・美術・日常の美意識から語ろうとした。西洋から見られる日本から、自ら語りかける日本へ。',ids:['tenshin','bushido'],y0:1906,y1:1906}
]};
DATA.STORIES.push(bookStory);
const bookEnglish=[['日本を語る本、美が帰る本','Books that explain Japan; books that bring art home'],['海外からのまなざしに応え、自分たちの言葉と形で日本を表現し直す。','Responding to overseas views by expressing Japan in new words and forms.'],
[bookStory.chapters[0].t,'Explaining ethics in English — Bushido'],[bookStory.chapters[0].why,'Nitobe sought to explain samurai ethics to Western readers. The 1900 cover introduces his interpretation of Japan, rather than a description representing every Japanese person.'],
[bookStory.chapters[1].t,'Art returns as book design — Midaregami'],[bookStory.chapters[1].why,'Takeji Fujishima designed the cover of Akiko Yosano’s poetry collection under the influence of Art Nouveau. This was domestic literature, where ideas transformed overseas met Japanese writing.'],
[bookStory.chapters[2].t,'Looking within Japanese society — I Am a Cat'],[bookStory.chapters[2].why,'Soseki’s novel meets Goyo Hashiguchi’s design. After studying abroad, Soseki questioned modern Japanese society from within. The design’s international connections and the text’s social questions offer distinct paths through the book.'],
[bookStory.chapters[3].t,'Explaining Japan through tea and art — The Book of Tea'],[bookStory.chapters[3].why,'Okakura published The Book of Tea in English in 1906. He presented tea, art and everyday aesthetics as an alternative to understanding Japan only through warfare or exotic curiosities: Japan speaking for itself.']];Object.assign(EXTRA_EN,Object.fromEntries(bookEnglish));

const bingSource='https://www.vam.ac.uk/articles/art-nouveau-an-international-style';
M.sources.bingName=['V&A：アール・ヌーヴォーという呼び名とビングの店',bingSource];
M.sources.bingTrade=['V&A：日本美術商ビングと1895年の画廊','https://www.vam.ac.uk/articles/art-nouveau-and-the-erotic'];
const bingCopy={
bing:['日本美術を扱い、雑誌『芸術の日本』でも紹介したパリの美術商。1895年に新しい装飾芸術を扱う店を開いた。その店名「ラール・ヌーヴォー（新しい芸術）」が、様式の呼び名を広める重要なきっかけになった。','A Paris dealer who promoted Japanese art through trade and Le Japon artistique. In 1895 he opened a gallery for contemporary decorative arts. Its name, L’Art Nouveau (The New Art), helped popularize the name of the style.'],
lartnouveau:['日本美術商ジークフリート・ビングが1895年にパリで開いた店。店名は「新しい芸術」という意味で、様式の名称を広めた。日本美術の紹介と、新しい家具・ガラス・室内装飾の展示販売が、同じ商人の活動でつながる。日本美術だけがこの様式の起源という意味ではない。','Opened in Paris in 1895 by Japanese-art dealer Siegfried Bing. The shop’s name meant The New Art and helped popularize the style’s name. His career connected the promotion of Japanese art with new furniture, glass and interiors. Japanese art was one influence among several.']};
for(const [id,row]of Object.entries(bingCopy)){byId.get(id).description=row[0];EXTRA_EN[row[0]]=row[1];}
MEANINGS.bing=['activity','日本美術を紹介する商人が、新しい装飾芸術の発信拠点をつくった。','A dealer in Japanese art created a platform for new decorative arts.'];
MEANINGS.lartnouveau=['style','日本美術商ビングが1895年に開いた店。その店名が「アール・ヌーヴォー」という呼び名を広めた。','The shop opened by Japanese-art dealer Bing in 1895 helped popularize the name Art Nouveau.'];
const worldWhy=['日本美術に学んだ表現は、ほかの源流とも交わり、各地の新しい装飾芸術へ。日本美術商ビングの店名「アール・ヌーヴォー」が、様式の呼び名を広める。','Japanese-inspired forms joined other influences in new decorative arts across countries. The name of Japanese-art dealer Bing’s shop helped popularize the term Art Nouveau.'];
for(const ch of [DATA.CHAPTERS,...DATA.STORIES.map(s=>s.chapters)].flat())if(ch.t==='世界へ広がる')ch.why=worldWhy[0];EXTRA_EN[worldWhy[0]]=worldWhy[1];
const bingStory={id:'bing_and_a_name',t:'日本美術商の店から、様式の名へ',thesis:'日本美術の紹介 → ビングの店 → 新しい装飾芸術の呼び名 → 日本の装丁へ。',chapters:[
{t:'1895年、店の名前が様式の名前へ',why:bingCopy.lartnouveau[0],ids:['lartnouveau','bing','tiffany'],y0:1895,y1:1895},
{t:'日本へ帰る、新しい装飾',why:'アール・ヌーヴォーの表現は、藤島武二による『みだれ髪』の装丁にも見られる。日本美術を海外へ紹介した商人の活動と、日本の本への還流を一つの物語としてたどる。ビングがこの装丁を直接指導したという意味ではない。',ids:['akiko','fujishima','lartnouveau'],y0:1901,y1:1901}
]};DATA.STORIES.push(bingStory);
Object.assign(EXTRA_EN,{'日本美術商の店から、様式の名へ':'From a Japanese-art dealer’s shop to a style’s name','日本美術の紹介 → ビングの店 → 新しい装飾芸術の呼び名 → 日本の装丁へ。':'Japanese art → Bing’s gallery → the name of a new decorative style → book design in Japan.','1895年、店の名前が様式の名前へ':'1895: a shop’s name becomes a style’s name','日本へ帰る、新しい装飾':'New decoration returns to Japan',[bingStory.chapters[1].why]:'Art Nouveau appears in Takeji Fujishima’s cover for Midaregami. This narrative connects a dealer’s promotion of Japanese art with the return of transformed ideas to Japanese books, without claiming that Bing directly guided this design.'});

const IMPACTS={
  opium:{icon:'💣',ja:'戦争・不平等な条約',en:'War and unequal treaties'},
  perry:{icon:'⚓',ja:'艦隊の来航・開国への圧力',en:'Naval arrival and pressure to open Japan'},
  sangoku:{icon:'⚠️',ja:'三国による外交的圧力',en:'Diplomatic pressure from three powers'},
  satsuei:{icon:'💣',ja:'戦争・砲撃',en:'War and bombardment'},
  russojp:{icon:'💣',ja:'戦争',en:'War'},
  haibutsu:{icon:'🔥',ja:'寺院・仏像の破壊',en:'Destruction of temples and Buddhist images'},
  pebrine:{icon:'🐛',badge:'🤒',ja:'蚕の病気・養蚕業の危機',en:'Silkworm disease and a silk-industry crisis',echo:['it']},
  abomb:{icon:'💥',ja:'原爆による被害',en:'Atomic bombing and devastation'},
  occupation:{icon:'🤕',ja:'戦後の被害・占領',en:'Postwar devastation and occupation'},
  treaties:{icon:'⚠️',ja:'不平等条約による制約',en:'Restrictions imposed by unequal treaties'}
};

// Editorial scope: preserve archived source records; exclude unsubstantiated examples from all current views.
// A missing source is not proof that influence never existed.
const excludedRecordIds=new Set(['chagall','garcia','ba']);
for(let i=nodes.length-1;i>=0;i--)if(excludedRecordIds.has(nodes[i].id)){byId.delete(nodes[i].id);nodes.splice(i,1);}
for(let i=links.length-1;i>=0;i--)if(excludedRecordIds.has(links[i].a)||excludedRecordIds.has(links[i].b))links.splice(i,1);

// The chapter includes painting, architecture and decorative arts.
const artsThemeTitle='芸術家が取り込む';
const artsThemeWhy='画家や建築家、工芸家が、日本美術の構図や意匠、空間の考え方を、それぞれの表現に取り込んだ。';
for(const chapter of [DATA.CHAPTERS,...DATA.STORIES.map(s=>s.chapters)].flat()){
  if(chapter.t==='画家が取り込む'){chapter.t=artsThemeTitle;chapter.why=artsThemeWhy;}
}
EXTRA_EN[artsThemeTitle]='Artists make it their own';
EXTRA_EN[artsThemeWhy]='Painters, architects and craftspeople incorporated Japanese approaches to composition, decorative design and space into their own work.';

const translate=(s,lang)=>lang==='en'?(ENGLISH[s]||EXTRA_EN[s]||s):s;
function meaningFor(n,lang){const row=MEANINGS[n.id],type=row?.[0]||(IMPACTS[n.id]?'crisis':n.kind==='artist'?'activity':'work');return {type,label:MEANING_TYPES[type][lang==='en'?1:0],text:row?row[lang==='en'?2:1]:translate(n.description,lang).split(lang==='en'?/(?<=\.)\s/:/。/)[0]+(lang==='ja'?'。':'')};}
window.JaponismeContent={places,nodes,byId,links,imageMap,EXTRA_EN,MEANING_TYPES,MEANINGS,CAUSES,IMPACTS,bookStory,bingCopy,bingStory,translate,meaningFor};
})();
