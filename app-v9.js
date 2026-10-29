(function () {
'use strict';

var PAGE = document.body.getAttribute('data-page') || 'home';
/* TIL URL ORQALI: o'zbekcha — ildizda (/franshiza.html), ruscha — /ru/ papkada (/ru/franshiza.html) */
var BODY_LANG = document.body.getAttribute('data-lang');
var IS_RU = BODY_LANG ? BODY_LANG === 'ru' : /\/ru\/[^\/]*$/.test(location.pathname);
var BASE = document.body.getAttribute('data-base') || (IS_RU && !BODY_LANG ? '../' : '');
var SITE = 'https://premium.decopoluzbekistan.uz/';
function asset(p) { return (!p || /^(?:[a-z]+:|\/|#)/i.test(p)) ? p : BASE + p; }
function pageFile() { var f = location.pathname.split('/').pop(); return f === 'index.html' ? '' : f; }
function cleanSearch() { var q = new URLSearchParams(location.search); q.delete('lang'); var t = q.toString(); return t ? '?' + t : ''; }
function langUrl(to) {
  var pre = to === 'ru' ? (IS_RU ? '' : 'ru/') : (IS_RU ? '../' : '');
  return (pre + pageFile() + cleanSearch() + location.hash) || './';
}
var FR = 'https://framerusercontent.com/images/';

/* ---------------------------------------------------------------
   Sahifalar (menyu). Hali yasalmagan sahifalar asl saytga boradi.
--------------------------------------------------------------- */
var NAV = [
  ['home',        './'],
  ['about',       'about.html'],
  ['franshiza',   'franshiza.html'],
  ['cases',       'cases.html'],
  ['panel',       'panel.html'],
  ['designers',   'designers.html'],
  ['articles',    'maqolalar.html'],
  ['showroom',    'showroom.html'],
  ['contact',     'contact.html']
];

/* ---------------------------------------------------------------
   Matnlar: UZ / RU
--------------------------------------------------------------- */
var T = {
uz: {
  nav: ["Asosiy sahifa","Biz haqimizda","Franshiza","Loyihalar","Kolleksiyalar","Dizaynerlarga","Maqolalar","Showroom","Bog'lanish"],
  cta: "Bepul konsultatsiya olish",
  contactBtn: "Bog'lanish",
  search: "Qidirish...", searchNone: "Hech narsa topilmadi",
  footTag: "Siz uchun premium panellar", footNav: "Navigatsiya", footFollow: "Bizni kuzatib boring",
  address: "Tashkent, Almazar District, Taraqqiyot-2 mavzesi, 31",
  rights: "Decopol barcha huquqlar himoyalangan",
  q: ['"','"'],

  /* home */
  heroTitle: "Siz uchun premium panellar",
  heroText: "Biz sizning uyingizni atigi <b>15 kun ichida</b> premium uyga aylantiramiz – va odamlar bizning narxlarimizga ishonmaydi!",
  stat1: "Tugallangan loyihalar", stat2: "Yillik tajriba",
  revTitle: "Mijozlarimiz fikrlari:",
  brandsTitle: "Bizga ishonch bildirgan brendlar:",
  usesTitle: "Mahsulotlarimiz qo'llanilishi:",
  faqTitle: "Tez tez so'raladigan savollar",
  reviews: [
    ["Bizning fabrikamiz va ofis xonalarimiz funksiya va estetikaga muhtoj edi. Decopol panellari ikkalasini ham taqdim etdi - ular kam texnik xizmat ko'rsatadi va ajoyib ko'rinadi. Aqlli uzoq muddatli sarmoya.","Mr.Yorqin","Yong Xin Factory","INoqUW9uhOxENagDZ6MeQz7nX4.png"],
    ["Biz pizza joyimizni issiq va tabiiy tuyg'usi bilan ajralib turishini xohladik. Decopol premium panellari bizga zamonaviy, ammo qulay ko'rinishni berdi. Ularni o'rnatish oson va juda bardoshli - oziq-ovqat muhiti uchun juda mos edi.","Sarvar","Sariq Bola Pizza","UwC15fMVjnTV7A4Y1n34A24SFOY.png"],
    ["Biz innovatsiyalarni qadrlaymiz va Decopol bunga juda mos keladi. Ularning ekologik toza Decopol panellari markazimizga zamonaviy va istiqbolli ko'rinish berdi. Biz ularning ishlarini o'z binomizda namoyish etishdan faxrlanamiz","Mr.Parviz","Innovative Center","F6c1bg7v96oH4tw1iLMNcXMxdS8.png"],
    ["Decopol panellari Toshkent shahrini rivojlantirishda bir qancha ichki hududlarda yuqori darajadagi barqaror ko'rinishga erishishimizga yordam berdi. Ularning jamoasi butun jarayon davomida professional, sezgir va tafsilotlarga yo'naltirilgan edi.","Maftuna","Toshkent city","G2ovps9HW60qbRU75mAPSYGvq0.png"],
    ["Dizayner sifatida men toza chiziqlar va oqilona materiallardan foydalanishni qadrlayman. Decopol panellari bizning texnik ofisimizga zamonaviy ko'rinish qo'shdi. Bu odamlar ichkariga kirganda maqtaydigan birinchi narsadir.","Mr.Bobur","Haitech","NgNUin1wcjz54UtyNsGRJ1mcSc.png"]
  ],
  uses: [
    ["Ofislar","Ofis, majlislar zali, konferensiya xonasi yoki foyelarda dekorativ panellar professional muhit va tartibli ko'rinish yaratadi. Bizning premium panellar ish joyiga qulaylik, nafislik va zamonaviylik baxsh etadi.",""],
    ["Tibbiyot va kosmetologiya","Kasalxona, klinika, stomatologiya yoki go'zallik salonlarida panellar tozalik, osoyishtalik va estetikani uyg'unlashtiradi. Ushbu panellar tashrif buyuruvchilar uchun ishonch va tinchlik muhiti yaratadi.",""],
    ["Restoranlar va kafelar","Kafe, qahvaxona va restoranlarda devor panellari interyerga iliqlik va uslub baxsh etib, muhitga premiumlik hissini uyg'otadi — zamonaviylik va nafislikni birlashtirgan mukammal yechim beradi.",""],
    ["Do'konlar tarmog'i va chakana pavilyonlar","Do'konlar, savdo markazlari va pavilyonlarda devorlarni bezashda ishlatiladi. Zamonaviylik va estetikani uyg'unlashtiradi.","Decopol — makoningizga o'ziga xoslik baxsh etadi."],
    ["Hukumat institutlari","Davlat idoralari, qabulxonalar va kutish joylarida panellar rasmiy muhitni yanada tartibli va zamonaviy qiladi. Har bir detal muassasaning nufuzini aks ettiradi.",""],
    ["Aeroportlar va temir yo'l stantsiyalari","Aeroport va vokzallarda panellar yo'lovchilar uchun qulay, toza va estetik muhit yaratadi. Har bir burchakda tartib va chiroy uyg'unlashadi.",""],
    ["Ishlab chiqarish ob'ektlari","Sanoat binolarida devor panellari amaliylik va bardoshlilikni ta'minlaydi. Ular ish muhitini tartibli va xavfsiz saqlashga yordam beradi.",""],
    ["Ta'lim muassasalari","Maktab, bog'cha va universitetlarda panellar tinchlik va ilhom baxsh etib, o'quv muhitiga zamonaviylik va premium estetik uyg'unlik olib kiradi.",""]
  ],
  usesRestoF: "Kafe, qahvaxona yoki restoranda devorlarni dekorativ devor panellari bilan bezash interyer dizaynidagi eng tezkor, eng tejamkor, zamonaviy va zamonaviy yechimdir.",
  faq: [
    ["Oshxona va zal hududlarida bug', yog' va namlik devorlarni tezda dog' bosadi, bu esa interyerning jozibasini yo'qotadi.","Decopol panellarining sirti silliq va namlikka chidamli, shuning uchun bug' va yog' dog' qoldirmaydi va nam latta bilan oson tozalanadi. Nam xonalar uchun maxsus suv o'tkazmaydigan seriyalarimiz mavjud."],
    ["Panellarni o'rnatish qancha vaqt oladi?","Standart xona uchun (20–30 m²) professional brigada 1–2 kun ichida o'rnatishni yakunlaydi. Panellar maxsus krepyoj tizimi bilan montaj qilinadi — bu an'anaviy qurilish ishlariga qaraganda 3–4 marta tezroq. Oldindan tayyorgarlik (devorni tekislash) kerak bo'lsa, muddatga 1 kun qo'shiladi."],
    ["Panellarning xizmat muddati qancha?","To'g'ri montaj va parvarishlash sharoitida PVC panellar 15–20 yil, WPC panellar esa 20–25 yilgacha xizmat qiladi. Panellar UV nurlanishga, mexanik ta'sirga va namlikka chidamli bo'lishi bu muddatni yanada uzaytiradi. Mahsulotlarimizga 5 yillik zavod kafolati beriladi."],
    ["Panellarni tozalash va parvarish qilish qiyinmi?","Yo'q, aksariyat hollarda nam latta yoki neytral tozalovchi vosita bilan artish yetarli. Panellar mikrob va zamburug'ga chidamli bo'lgani uchun maxsus kimyoviy moddalar talab qilmaydi. Qattiq abraziv vositalar va kimyoviy erituvchilardan qochish kerak — ular sirtni xira qilishi mumkin."],
    ["Panellar qaysi xona turlariga mos keladi?","Panellarni deyarli barcha xona turlarida — yashash xonasi, oshxona, hammom, ofis va tijorat maydonlarida ishlatish mumkin. Nam xonalar uchun maxsus suv o'tkazmaydigan seriyalarimiz mavjud. Yuqori issiqlik ta'sir qiladigan joylar uchun o'rnatishdan oldin maslahat olish tavsiya etiladi."],
    ["Minimal buyurtma hajmi qancha va yetkazib berish qancha vaqt oladi?","B2B hamkorlar uchun minimal buyurtma 50 m²dan boshlanadi. Toshkent bo'ylab yetkazib berish 1–2 ish kuni, viloyatlarga esa 3–5 ish kuni ichida amalga oshiriladi. Katta hajmdagi loyihalar (500 m² va undan ortiq) uchun alohida lojistik shart-sharoitlar kelishiladi."],
    ["Rang va fakturalar bo'yicha tanlov qanchalik keng?","Hozirgi kollektsiyamizda 80 dan ortiq rang va faktura varianti mavjud — mavsum bo'yicha yangi dizaynlar qo'shib boriladi. Tosh, yog'och, beton, matolar ko'rinishidagi fakturalardan tashqari, zamonaviy Velvet seriyamiz ham taqdim etilgan. Katta loyihalar uchun maxsus buyurtma asosida individual partiyalar ishlab chiqariladi."]
  ],

  /* about / franshiza */
  aboutHero: "Decopol haqida",
  aboutTitle: "Biz haqimizda",
  aboutText: "2012-yilda tashkil etilgan Decopol butun O‘zbekiston bo‘ylab zamonaviy interyer yechimlarini taqdim etishda yetakchi hisoblanadi. Yuqori sifatli dekorativ devor panellari, laminat va ekologik toza bambuk panellarni ishlab chiqarish va yetkazib berishga ixtisoslashgan holda sifat va dizaynga alohida e'tibor qaratamiz. Decopol o'z faoliyatini doimiy ravishda kengaytirib, yangi omborlar, ko'rgazma zallari va Decopol panellarini ishlab chiqarish bo'yicha o'z zavodini ochmoqda. O'tgan yillar davomida kompaniya turar-joy va tijorat binolarida mingdan ortiq loyihalarni amalga oshirib, minglab mijozlarning ishonchini qozondi. Bizning vazifamiz zamonaviy interyer dizaynining eng yuqori standartlariga javob beradigan zamonaviy, qulay va bardoshli joylarni yaratishdir.",
  aboutTextF: "2012-yilda tashkil etilgan Decopol butun O‘zbekiston bo‘ylab zamonaviy interyer yechimlarini taqdim etishda yetakchi hisoblanadi. Yuqori sifatli dekorativ devor panellari, laminat va ekologik toza Decopol panellarini ishlab chiqarish va yetkazib berishga ixtisoslashgan holda sifat va dizaynga alohida e'tibor qaratamiz. Decopol o'z faoliyatini doimiy ravishda kengaytirib, yangi omborlar, ko'rgazma zallari va Decopol panellarini ishlab chiqarish bo'yicha o'z zavodini ochmoqda. O'tgan yillar davomida kompaniya turar-joy va tijorat binolarida mingdan ortiq loyihalarni amalga oshirib, minglab mijozlarning ishonchini qozondi. Bizning vazifamiz zamonaviy interyer dizaynining eng yuqori standartlariga javob beradigan zamonaviy, qulay va bardoshli joylarni yaratishdir.",
  resTitle: "Natijalarimiz",
  res: [["1,000+","Tugallangan loyihalar"],["3,300+","kv.m ombor maydoni"],["200+","Xil mahsulotlar"],["15+","ta davlat bo'yicha mijozlar"]],
  advTitle: "Bizning afzalliklarimiz",
  adv: [
    ["Ko’p yillik tajriba","Ichki dizayn bozorida <b>10 yildan ortiq ishlab kelmoqdamiz.</b>","1Ebb6RsEGE31gKPNt7ENe42Eos","adv1"],
    ["Innovatsion mahsulotlar","Zamonaviy texnologiyalar va ekologik toza materiallarni, jumladan, Decopol panellarni joriy etish.","rS1jLVYoexBxkWYmAIOiT5jVe4g","adv2"],
    ["Keng tarqatish tarmog'i","Mijozlar bilan tezkor ishlash uchun asosiy shaharlardagi yirik omborlar va ko'rgazma zallari.","uxQ45xcmdmauX7ExwMYQN1xjY","adv3"],
    ["Malakali jamoa","<b>100 dan ortiq</b> mutaxassislardan iborat professional jamoa.","As8nT0TAzyVuW26vp4lWICDzGI","adv4"],
    ["Loyihani har tomonlama qo'llab-quvvatlash","Xizmatlarning <b>to'liq</b> spektri - maslahatdan tortib o'rnatishgacha.","5frgbky70YE0tzPTke6eSMuilw","adv5"],
    ["Mijoz ishonchi","Minglab mamnun mijozlar tomonidan tasdiqlangan ishonchli obro'.","ct8QQD1PtRobh5BecJ8nIVZdVE","adv6"]
  ],
  frHero: "Franshiza",
  frTech: ["Decopol franshizasi bilan"," eng ilg'or texnologik ta'mirlash kompaniyasiga aylaning"],
  frTitle: "Bizning franshizalar",
  frList: [["Farg'ona","farg-ona","farg-ona"],["Namangan","namangan","namangan"]],

  /* cases */
  casesH: "Bizning loyihalar",
  casesFilters: [["all","Barchasi"],["tv","Tv zona"],["villa","Kotedj hovli - Luxury villalar"],["dacha","Dacha"],["kv","Kvartiralar"],["pod","Pod’ezd"],["stairs","Zinalar"],["hotel","Mehmonxona va Spa"],["resto","Restoran va kafe"],["boutique","Butik va LUX showroomlar"],["office","Bank va Ofislar"],["gov","Davlat idoralari va konferens-zallar"],["school","Maktab va o‘quv markazlari"],["clinic","Klinika"],["airport","Airaport va vagzallar"],["prod","Ishlab chiqarish"],["other","Boshqa"]],
  casesSvc: {s:"Konsultatsiya, Mahsulot, Podklyuch,", n:"Konsultatsiya, Mahsulot"},
  look: "KO'RISH",
  noCases: "Bu bo'limda hozircha loyiha yo'q.",

  /* showroom */
  srTitle: "Showroom",
  srText: "Decopol showroom sahifamiz orqali sizga har bir mahsulotimizning ishlatilishi, qanday holatda turishlari qancha vaqtda bitishi haqida aniq ma'lumot olishingiz mumkin",
  srAbout: "Biz haqimizda",
  srParas: [
    "O‘zbekiston bo‘ylab zamonaviy interyer yechimlarini taqdim etuvchi Decopol kompaniyasiga 2012-yilda asos solingan.",
    "2025-yil boshida Farg‘onada 600 kvadrat metrdan ortiq maydonga ega showroomini ishga tushirgan Decopol yil oxiriga kelib, Markaziy Osiyoda yagona bo‘lgan, 400 kvadrat metrdan ortiq maydonga ega premium formatdagi showroomini ham muvaffaqiyatli yakunladi.",
    "Decopol bugun ham faoliyatini kengaytirishda davom etib, zamonaviy interyer dizaynining eng yuqori standartlariga javob beradigan chidamli va qulay maskanlarni yaratishni o‘z oldiga maqsad qilgan."
  ],
  srZones: "Showroom zonalari",
  srFilters: [["all","Barchasi"],["tv","TV zona"],["reception","Qabulxona"],["stairs","Zinalar"],["school","Maktab"],["clinic","Klinika"],["bedroom","Spalniy"],["coffee","Coffee zona"],["lift","Lift zona"],["decor","Decor zona"],["kitchen","Oshxona"],["entry","Kirish"]],
  zl: ["Nomi","Necha kunda?","Ustalar","Panellar"],
  zDays: function (n) { return n + " kun"; },
  zN: function (n) { return n + " ta"; },
  zMore: "Batafsil ko’rish",

  zAbout: "Zona haqida", zLabels: ["Nomi","Muddat","Ustalar","Panellar"],
  cAbout: "Loyiha haqida", cLabels: ["Nomi","Toifa","Xizmatlar"],
  zVideoT: "Video",
  projTitle: "Loyihalarimiz:", projAll: "Barcha loyihalarni ko'rish",
  projCat: {"sariqbola":"Fast Food","besh-bola-buildings":"Qurilish","giotto":"Restoran"},
  back: "Orqaga", otherZones: "Boshqa zonalar", otherCases: "Boshqa loyihalar",
  notFound: "Sahifa topilmadi", toHome: "Bosh sahifaga",
  cTitle: "Bog'lanish", cPhone: "Telefon", cEmail: "Email", cAddr: "Manzil", cMap: "Xaritada ochish",
  pTitle: "Kolleksiyalar",
  pIntro: "Hozirgi kollektsiyamizda 80 dan ortiq rang va faktura varianti mavjud — mavsum bo'yicha yangi dizaynlar qo'shib boriladi.",
  pItems: [["stone","Tosh"],["wood","Yog'och"],["concrete","Beton"],["fabric","Mato"],["velvet","Velvet"]],
  pCatalog: "To'liq katalogni ko'rish",
  dTitle: "Dizaynerlarga",
  dText: "Dizaynerlar uchun hamkorlik shartlari bo'yicha biz bilan bog'laning.",
  dBtn: "Telegram orqali yozish"
},

ru: {
  nav: ["Главная","О нас","Франшиза","Проекты","Коллекции","Дизайнерам","Статьи","Шоурум","Контакты"],
  cta: "Получить бесплатную консультацию",
  contactBtn: "Связаться",
  search: "Поиск...", searchNone: "Ничего не найдено",
  footTag: "Премиальные панели для вас", footNav: "Навигация", footFollow: "Следите за нами",
  address: "Ташкент, Алмазарский район, массив Тараккиёт-2, 31",
  rights: "Decopol. Все права защищены",
  q: ['«','»'],

  heroTitle: "Премиальные панели для вас",
  heroText: "Мы превратим ваш дом в премиальный всего за <b>15 дней</b> – и люди не верят нашим ценам!",
  stat1: "Завершённых проектов", stat2: "Лет опыта",
  revTitle: "Отзывы наших клиентов:",
  brandsTitle: "Бренды, которые нам доверяют:",
  usesTitle: "Где применяются наши продукты:",
  faqTitle: "Часто задаваемые вопросы",
  reviews: [
    ["Нашим фабрике и офисам нужны были и функциональность, и эстетика. Панели Decopol дали и то и другое — они не требуют сложного ухода и выглядят великолепно. Разумная долгосрочная инвестиция.","Mr.Yorqin","Yong Xin Factory","INoqUW9uhOxENagDZ6MeQz7nX4.png"],
    ["Мы хотели, чтобы наша пиццерия выделялась тёплой и натуральной атмосферой. Премиальные панели Decopol придали ей современный, но уютный вид. Их легко монтировать, они очень прочные — идеально подходят для пищевой среды.","Sarvar","Sariq Bola Pizza","UwC15fMVjnTV7A4Y1n34A24SFOY.png"],
    ["Мы ценим инновации, и Decopol идеально вписывается в это. Экологичные панели Decopol придали нашему центру современный и перспективный вид. Мы гордимся тем, что демонстрируем их работу в своём здании.","Mr.Parviz","Innovative Center","F6c1bg7v96oH4tw1iLMNcXMxdS8.png"],
    ["Панели Decopol помогли нам добиться высокого уровня и устойчивого вида в нескольких внутренних зонах при развитии города Ташкента. Их команда была профессиональной, отзывчивой и внимательной к деталям на протяжении всего процесса.","Maftuna","Toshkent city","G2ovps9HW60qbRU75mAPSYGvq0.png"],
    ["Как дизайнер я ценю чистые линии и разумное использование материалов. Панели Decopol придали нашему техническому офису современный вид. Это первое, что хвалят люди, когда входят внутрь.","Mr.Bobur","Haitech","NgNUin1wcjz54UtyNsGRJ1mcSc.png"]
  ],
  uses: [
    ["Офисы","В офисах, переговорных, конференц-залах и фойе декоративные панели создают профессиональную атмосферу и аккуратный вид. Наши премиальные панели добавляют рабочему месту комфорт, изящество и современность.",""],
    ["Медицина и косметология","В больницах, клиниках, стоматологиях и салонах красоты панели сочетают чистоту, спокойствие и эстетику. Они создают у посетителей атмосферу доверия и умиротворения.",""],
    ["Рестораны и кафе","В кафе, кофейнях и ресторанах стеновые панели добавляют интерьеру тепла и стиля и создают ощущение премиальности — идеальное решение, сочетающее современность и элегантность.",""],
    ["Торговые сети и розничные павильоны","Используются для отделки стен в магазинах, торговых центрах и павильонах. Сочетают современность и эстетику.","Decopol — придаёт вашему пространству индивидуальность."],
    ["Государственные учреждения","В государственных органах, приёмных и зонах ожидания панели делают официальную обстановку более упорядоченной и современной. Каждая деталь отражает авторитет учреждения.",""],
    ["Аэропорты и железнодорожные вокзалы","В аэропортах и на вокзалах панели создают для пассажиров удобную, чистую и эстетичную среду. В каждом уголке сочетаются порядок и красота.",""],
    ["Производственные объекты","В промышленных зданиях стеновые панели обеспечивают практичность и износостойкость. Они помогают поддерживать рабочую среду в порядке и безопасности.",""],
    ["Образовательные учреждения","В школах, детских садах и университетах панели дарят спокойствие и вдохновение, привнося в учебную среду современность и премиальную эстетическую гармонию.",""]
  ],
  usesRestoF: "В кафе, кофейнях или ресторанах отделка стен декоративными стеновыми панелями — самое быстрое, самое экономичное и современное решение в интерьерном дизайне.",
  faq: [
    ["Пар, жир и влага на кухне и в зале быстро оставляют пятна на стенах, из-за чего интерьер теряет привлекательность.","Поверхность панелей Decopol гладкая и устойчива к влаге, поэтому пар и жир не оставляют пятен, а загрязнения легко удаляются влажной тканью. Для влажных помещений у нас есть специальные водонепроницаемые серии."],
    ["Сколько времени занимает монтаж панелей?","Для стандартной комнаты (20–30 м²) профессиональная бригада завершает монтаж за 1–2 дня. Панели монтируются с помощью специальной системы креплений — это в 3–4 раза быстрее традиционных строительных работ. Если требуется предварительная подготовка (выравнивание стены), к сроку добавляется 1 день."],
    ["Каков срок службы панелей?","При правильном монтаже и уходе панели из ПВХ служат 15–20 лет, а WPC-панели — до 20–25 лет. Устойчивость к УФ-излучению, механическим воздействиям и влаге ещё больше продлевает этот срок. На нашу продукцию предоставляется 5-летняя заводская гарантия."],
    ["Сложно ли чистить и ухаживать за панелями?","Нет, в большинстве случаев достаточно протереть влажной тканью или нейтральным чистящим средством. Панели устойчивы к микробам и грибку, поэтому специальная химия не требуется. Следует избегать жёстких абразивных средств и химических растворителей — они могут сделать поверхность матовой."],
    ["Для каких типов помещений подходят панели?","Панели можно использовать практически в любых помещениях — жилых комнатах, кухне, ванной, офисе и коммерческих пространствах. Для влажных помещений у нас есть специальные водонепроницаемые серии. Для мест с высокой температурой рекомендуем проконсультироваться перед монтажом."],
    ["Каков минимальный объём заказа и сроки доставки?","Для B2B-партнёров минимальный заказ начинается от 50 м². Доставка по Ташкенту занимает 1–2 рабочих дня, по областям — 3–5 рабочих дней. Для крупных проектов (от 500 м²) отдельно согласовываются условия логистики."],
    ["Насколько широк выбор цветов и фактур?","В нашей текущей коллекции более 80 вариантов цветов и фактур — новые дизайны добавляются каждый сезон. Помимо фактур под камень, дерево, бетон и ткань, представлена современная серия Velvet. Для крупных проектов на заказ производятся индивидуальные партии."]
  ],

  aboutHero: "О Decopol",
  aboutTitle: "О нас",
  aboutText: "Компания Decopol, основанная в 2012 году, является лидером в предоставлении современных интерьерных решений по всему Узбекистану. Специализируясь на производстве и поставке высококачественных декоративных стеновых панелей, ламината и экологичных бамбуковых панелей, мы уделяем особое внимание качеству и дизайну. Decopol постоянно расширяет свою деятельность, открывая новые склады, выставочные залы и собственный завод по производству панелей Decopol. За прошедшие годы компания реализовала более тысячи проектов в жилых и коммерческих зданиях и завоевала доверие тысяч клиентов. Наша задача — создавать современные, комфортные и долговечные пространства, отвечающие высочайшим стандартам современного интерьерного дизайна.",
  aboutTextF: "Компания Decopol, основанная в 2012 году, является лидером в предоставлении современных интерьерных решений по всему Узбекистану. Специализируясь на производстве и поставке высококачественных декоративных стеновых панелей, ламината и экологичных панелей Decopol, мы уделяем особое внимание качеству и дизайну. Decopol постоянно расширяет свою деятельность, открывая новые склады, выставочные залы и собственный завод по производству панелей Decopol. За прошедшие годы компания реализовала более тысячи проектов в жилых и коммерческих зданиях и завоевала доверие тысяч клиентов. Наша задача — создавать современные, комфортные и долговечные пространства, отвечающие высочайшим стандартам современного интерьерного дизайна.",
  resTitle: "Наши результаты",
  res: [["1,000+","Завершённых проектов"],["3,300+","кв.м складских площадей"],["200+","Видов продукции"],["15+","стран, где есть клиенты"]],
  advTitle: "Наши преимущества",
  adv: [
    ["Многолетний опыт","Более <b>10 лет работаем</b> на рынке интерьерного дизайна.","1Ebb6RsEGE31gKPNt7ENe42Eos","adv1"],
    ["Инновационные продукты","Внедрение современных технологий и экологичных материалов, в том числе панелей Decopol.","rS1jLVYoexBxkWYmAIOiT5jVe4g","adv2"],
    ["Широкая сеть распространения","Крупные склады и выставочные залы в основных городах для оперативной работы с клиентами.","uxQ45xcmdmauX7ExwMYQN1xjY","adv3"],
    ["Профессиональная команда","Профессиональная команда из <b>более 100</b> специалистов.","As8nT0TAzyVuW26vp4lWICDzGI","adv4"],
    ["Комплексная поддержка проекта","<b>Полный</b> спектр услуг — от консультации до монтажа.","5frgbky70YE0tzPTke6eSMuilw","adv5"],
    ["Доверие клиентов","Надёжная репутация, подтверждённая тысячами довольных клиентов.","ct8QQD1PtRobh5BecJ8nIVZdVE","adv6"]
  ],
  frHero: "Франшиза",
  frTech: ["С франшизой Decopol"," станьте самой технологичной ремонтной компанией"],
  frTitle: "Наши франшизы",
  frList: [["Фергана","farg-ona","farg-ona"],["Наманган","namangan","namangan"]],

  casesH: "Наши проекты",
  casesFilters: [["all","Все"],["tv","ТВ-зона"],["villa","Коттеджи и дворы — люкс-виллы"],["dacha","Дачи"],["kv","Квартиры"],["pod","Подъезды"],["stairs","Лестницы"],["hotel","Отели и СПА"],["resto","Рестораны и кафе"],["boutique","Бутики и LUX-шоурумы"],["office","Банки и офисы"],["gov","Госучреждения и конференц-залы"],["school","Школы и учебные центры"],["clinic","Клиники"],["airport","Аэропорты и вокзалы"],["prod","Производство"],["other","Другое"]],
  casesSvc: {s:"Консультация, Продукция, Подключение,", n:"Консультация, Продукция"},
  look: "СМОТРЕТЬ",
  noCases: "В этом разделе пока нет проектов.",

  srTitle: "Шоурум",
  srText: "Через страницу шоурума Decopol вы можете получить точную информацию о том, как применяется каждый наш продукт, как он выглядит и за сколько времени монтируется",
  srAbout: "О нас",
  srParas: [
    "Компания Decopol, предоставляющая современные интерьерные решения по всему Узбекистану, была основана в 2012 году.",
    "В начале 2025 года Decopol открыла в Фергане шоурум площадью более 600 квадратных метров, а к концу года успешно завершила единственный в Центральной Азии шоурум премиум-формата площадью более 400 квадратных метров.",
    "Decopol и сегодня продолжает расширять свою деятельность и ставит перед собой цель создавать надёжные и комфортные пространства, отвечающие самым высоким стандартам современного интерьерного дизайна."
  ],
  srZones: "Зоны шоурума",
  srFilters: [["all","Все"],["tv","ТВ-зона"],["reception","Ресепшн"],["stairs","Лестницы"],["school","Школа"],["clinic","Клиника"],["bedroom","Спальня"],["coffee","Кофе-зона"],["lift","Лифтовая зона"],["decor","Декор-зона"],["kitchen","Кухня"],["entry","Вход"]],
  zl: ["Название","За сколько дней?","Мастера","Панели"],
  zDays: function (n) { return n + " дн."; },
  zN: function (n) { return String(n); },
  zMore: "Подробнее",

  zAbout: "О зоне", zLabels: ["Название","Срок","Мастера","Панели"],
  cAbout: "О проекте", cLabels: ["Название","Категория","Услуги"],
  zVideoT: "Видео",
  projTitle: "Наши проекты:", projAll: "Смотреть все проекты",
  projCat: {"sariqbola":"Фастфуд","besh-bola-buildings":"Строительство","giotto":"Ресторан"},
  back: "Назад", otherZones: "Другие зоны", otherCases: "Другие проекты",
  notFound: "Страница не найдена", toHome: "На главную",
  cTitle: "Контакты", cPhone: "Телефон", cEmail: "Email", cAddr: "Адрес", cMap: "Открыть на карте",
  pTitle: "Коллекции",
  pIntro: "В нашей текущей коллекции более 80 вариантов цветов и фактур — новые дизайны добавляются каждый сезон.",
  pItems: [["stone","Камень"],["wood","Дерево"],["concrete","Бетон"],["fabric","Ткань"],["velvet","Velvet"]],
  pCatalog: "Смотреть полный каталог",
  dTitle: "Дизайнерам",
  dText: "Об условиях сотрудничества для дизайнеров свяжитесь с нами.",
  dBtn: "Написать в Telegram"
}};

/* ---------------------------------------------------------------
   Ma'lumotlar
--------------------------------------------------------------- */
var BRANDS = [
 ["nbu","NATIONAL BANK OF UZBEKISTAN","","#fff","#B79A68","600 15px/1.2 'Inter Tight'"],
 ["xon-saroy","XON SAROY","","linear-gradient(160deg,#5A3470,#3A2150)","#D9B96E","500 22px 'Inter Tight'"],
 ["yuksalish","YUKSALISH","GROUP","#1D4C7C","#fff","600 24px 'Inter Tight'"],
 ["uzbekistan-airways","UZBEKISTAN","airways","#4C78D9","#fff","italic 700 21px 'Inter Tight'"],
 ["westminster","WESTMINSTER","International University in Tashkent","#2D5CA6","#fff","600 17px 'Inter Tight'"],
 ["giotto","Giotto","gelateria","#fff","#1B2370","italic 800 36px 'Inter Tight'"],
 ["besh-bola","BESH BOLA","BUILDINGS","#fff","#D8541F","800 22px 'Inter Tight'"],
 ["sariq-bola","SARIQ BOLA","pizza","#fff","#E3A31B","800 22px 'Inter Tight'"],
 ["vellario","VELLARIO","LUXURY DESIGN","#202020","#fff","600 22px 'Inter Tight'"],
 ["family-park","FAMILY PARK","BY MIRANKUL GROUP","#fff","#1B2A5E","700 22px 'Inter Tight'"],
 ["tamir-design","TAMIR DESIGN","READY TO LIFE","#000","#fff","700 23px 'Inter Tight'"],
 ["innovative-centre","Innovative Centre","Enabling world-class education","#231061","#fff","600 21px 'Inter Tight'"],
 ["premium-house","PREMIUM HOUSE","","linear-gradient(160deg,#1c1c1c,#0b0b0b)","#CDA24E","500 20px 'Inter Tight'"],
 ["nrg","NRG","","#1B5798","#fff","800 38px 'Inter Tight'"],
 ["xalqbanki","XalqBanki","since 1875","#fff","#0E6B7A","600 28px 'Inter Tight'"]
];

var ICONS = [
 '<path d="M4 21V9l6-3v15M10 21V4l10 4v13M2 21h20M13 11h4M13 15h4"/>',
 '<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-40 12 12)"/><path d="M9 9l6 6"/>',
 '<path d="M4 12h16a8 8 0 01-16 0zM8 9c0-3 3-3 4-5 1 2 4 2 4 5"/>',
 '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 7l1.5-3h5L16 7"/>',
 '<circle cx="12" cy="9" r="3.5"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6M7 4l-2-1M17 4l2-1"/>',
 '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14h4"/>',
 '<circle cx="12" cy="12" r="3.3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
 '<path d="M4 4h5v16H4zM9 7h5v13H9zM15 6l5 1.3-3 12.7-5-1.2"/>'
];

/* [id, nom, kun, ustalar, panellar, asl-havola, filtr] */
var ZONES = [
 ['salotto-tv','Salotto TV','3',2,9,'tv-zona-1-(luxury-)','tv'],
 ['angolo-caffe','Angolo Caffè','2',2,5,'coffee-zone','coffee'],
 ['ingresso','Ingresso','2',2,6,'prixoshka-(qizil)','entry'],
 ['entrada','Entrada','2',2,6,'prixoshka-ko-k','entry'],
 ['escalera','Escalera','2,5',2,11,'zina-chap-taraf','stairs'],
 ['maestra','Maestra','2',4,20,'zina-ong-taraf','stairs'],
 ['lucevista','LuceVista','4',4,13,'tv-zona-(eng-kattasi)','tv'],
 ['zonaviva','ZonaViva','3',2,6,'tv-zona-(podval)','tv'],
 ['clinica','Clinica','5',2,8,'klinika','clinic'],
 ['sapore','Sapore','3',2,9,'oshxona','kitchen'],
 ['la-tavola','La Tavola','1',2,7,'oshxona-devori','kitchen'],
 ['futuro-scuola','Futuro Scuola','4',2,8,'maktab','school'],
 ['royale','Royale','4',2,15,'spalniy','bedroom'],
 ['elevare','Elevare','3',2,7,'lift-zona-(minimalizm)','lift'],
 ['celeste','Celeste','6',2,8,'celeste','lift'],
 ['ritorante','Ritorante','3',2,4,'restoran','decor'],
 ['la-reception','La Réception','2',2,4,'reception','reception'],
 ['rialzo','Rialzo','2',3,7,'zina-tepa','stairs'],
 ['panorama','Panorama','1',2,4,'panorama','decor']
];

/* [id, nom, filtr, xizmat] */
var CASES = [
 ['sariqbola','Sariq bola pizza','resto',''],
 ['besh-bola-buildings','Besh Bola Buildings','other',''],
 ['giotto','Giotto','resto',''],
 ['innovative-centre','Innovative Centre','school',''],
 ['yong-hin-ceramics','Yong Hin Ceramics','prod',''],
 ['yuksalish-group','Yuksalish Group','office',''],
 ['uzbekistan-airways','Uzbekistan Airways','airport',''],
 ['manhattan','Manhattan','kv',''],
 ['fergana-city-uylari','Fergana city','kv','s'],
 ['zinalar','Zinalar','stairs',''],
 ['nbu-bank-toshkent','NBU uzbekistan','office','n']
];

/* rasmning qaysi qismi ko'rinib turishi (kartochka kesilganda) */
var CPOS = { 'sariqbola': '28% 50%', 'besh-bola-buildings': '58% 50%', 'giotto': '48% 50%', 'yuksalish-group': '58% 50%', 'uzbekistan-airways': '50% 38%', 'innovative-centre': '50% 40%' };
function cpos(id) { return CPOS[id] || 'center'; }
/* VIDEOLAR: har bir zona/loyiha uchun video manzili. Hozircha bo'sh — manzil yozilsa, sahifada video bo'limi o'zi paydo bo'ladi.
   Misol:  'lucevista': 'https://.../video.mp4' */
var ZVIDEO = {};
var CVIDEO = {};
var HOME_PROJ = ['sariqbola', 'besh-bola-buildings', 'giotto'];

var TONES = ['#6B4A33','#3E4B56','#4A5844','#7A5C48','#4B4F58','#5B4B3E','#445260','#6A5A45','#51453D','#5C6650','#3F4A4C'];

/* ---------------------------------------------------------------
   Holat
--------------------------------------------------------------- */
var lang = IS_RU ? 'ru' : 'uz';
/* eski havolalar (?lang=ru / ?lang=uz) to'g'ri manzilga o'tkaziladi */
var qp = new URLSearchParams(location.search).get('lang');
if ((qp === 'uz' || qp === 'ru') && qp !== lang) { location.replace(langUrl(qp)); return; }
var state = { cases: 'all', zone: 'all', coll: 'all' };

function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function ic(id, cls) { return '<svg' + (cls ? ' class="' + cls + '"' : '') + '><use href="#' + id + '"/></svg>'; }
var FRI={'farg-ona':'1Ebb6RsEGE31gKPNt7ENe42Eos.png','namangan':'rS1jLVYoexBxkWYmAIOiT5jVe4g.png'};
function FRIMG(id){return "url('"+FR+(FRI[id]||'aubSuqaqA7E0GamHaieuRn4qE.png')+"?width=1200')";}
var CIMG = {'sariqbola':'ar1WCm7XwkPIWfYThO5QKFdldM.png','besh-bola-buildings':'fahmYOdclsNGJYqsTAZTdTzBEM.png','giotto':'CMvqnmhqYqM34eABNnhlESs9ibw.gif','innovative-centre':'HCTleN1YmdvdGdjkUBV72I2VKI.png','yong-hin-ceramics':'BcTJboTHLhzNh08q4EIRcsY.png','yuksalish-group':'1rnBBhZtsowRTDIRSSxaloqens.png','uzbekistan-airways':'SuAan6zgpu7yb4nzZx6CYcpbanQ.png','manhattan':'21GiIms3yJgNy8lIdKjkmwOpTzI.png','fergana-city-uylari':'ascfRtXHLzDEOH7xEv2O7f98U0A.png','zinalar':'erWriAD2YRGhfvFSHKvogjOjQA.png','nbu-bank-toshkent':'9pKNGJov5WuWkn4oA8io3vHTzek.png'};
function bg(local, remote) {
  var m = /^img\/cases\/([\w-]+)\.jpg$/.exec(local);
  if (m && !remote && CIMG[m[1]]) remote = FR + CIMG[m[1]] + '?width=1600';
  return "url('" + asset(local) + "')" + (remote ? ",url('" + asset(remote) + "')" : ''); }
function cta(cls, label, href) {
  return '<a class="cta ' + cls + '" href="' + (href || 'tel:+998550552233') + '"><span>' + label + '</span><span class="dot">' + ic('i-arrow') + '</span></a>';
}

/* ---------------------------------------------------------------
   SVG belgilar (bir marta)
--------------------------------------------------------------- */
var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
 '<symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M13 5l7 7-7 7"/></symbol>' +
 '<symbol id="i-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></symbol>' +
 '<symbol id="i-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></symbol>' +
 '<symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 4v16M4 12h16"/></symbol>' +
 '<symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/><path d="M14 4a6 6 0 016 6M14 7.5a2.5 2.5 0 012.5 2.5"/></symbol>' +
 '<symbol id="i-person" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></symbol>' +
 '<symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
 '<symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></symbol>' +
 '<symbol id="i-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M7 4h10v16l-5-4-5 4z"/></symbol>' +
 '<symbol id="i-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/></symbol>' +
 '<symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/></symbol>' +
 '<symbol id="i-wrench" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 6a4 4 0 005 5l-9 9a2.1 2.1 0 01-3-3l9-9a4 4 0 00-2-2z"/></symbol>' +
 '<symbol id="logo-mark" viewBox="0 0 40 34" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 5h26l8 7v17H3z"/><path d="M3 5l17 12L37 5"/><path d="M3 29l12-12M37 29L25 17"/></symbol>' +
 '<symbol id="s-ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></symbol>' +
 '<symbol id="s-tg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M21 3L3 10.5l5.5 2L10 19l3.5-4 4.5 3.5z"/><path d="M8.5 12.5L21 3l-9 10"/></symbol>' +
 '<symbol id="s-yt" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/></symbol>' +
 '</svg>';

/* ---------------------------------------------------------------
   Umumiy bloklar
--------------------------------------------------------------- */
function headerHTML() {
  var d = T[lang], inner = PAGE !== 'home', items = '';
  NAV.forEach(function (n, i) { items += '<li><a href="' + n[1] + '">' + d.nav[i] + '</a></li>'; });
  return '<header><a href="./" class="logo" aria-label="Decopol">' + ic('logo-mark') +
    '<span class="wm"><b>DECOPOL</b><i>PANEL &amp; FLOORING</i></span></a>' +
    '<nav id="nav" aria-label="Menu"><ul>' + items + '</ul></nav>' +
    '<div class="hright">' +
      '<div class="lang" role="group" aria-label="Language">' +
        '<a href="' + esc(langUrl('uz')) + '" hreflang="uz" lang="uz" data-lang="uz" aria-current="' + (lang === 'uz') + '">UZ</a>' +
        '<a href="' + esc(langUrl('ru')) + '" hreflang="ru" lang="ru" data-lang="ru" aria-current="' + (lang === 'ru') + '">RU</a></div>' +
      (inner ? '<button class="srch" id="srchBtn" type="button" aria-label="Search">' + ic('i-search') + '</button>' : '') +
      '<a class="phone" href="tel:+998550552233">' + ic('i-phone') + '+998 55 055 22 33</a>' +
      '<button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false">' + ic('i-menu') + '</button>' +
    '</div></header>';
}

function footerHTML() {
  var d = T[lang], f = '';
  var order = [0, 1, 3, 4, 5, 6, 7, 8];
  order.forEach(function (i) { f += '<li><a href="' + NAV[i][1] + '">' + d.nav[i] + '</a></li>'; });
  return '<footer><div class="fgrid"><div class="fl-left"><a href="./" class="logo" aria-label="Decopol">' + ic('logo-mark') +
    '<span class="wm"><b>DECOPOL</b><i>PANEL &amp; FLOORING</i></span></a><p>' + d.footTag + '</p></div>' +
    '<div class="fcols">' +
      '<div class="fcol"><h4>' + d.footNav + '</h4><ul>' + f + '</ul></div>' +
      '<div class="fcol"><h4>' + d.footFollow + '</h4><ul>' +
        '<li><a href="https://www.instagram.com/decopoluzbekistan/" target="_blank" rel="noopener">' + ic('s-ig') + 'Instagram</a></li>' +
        '<li><a href="https://t.me/decopoluz" target="_blank" rel="noopener">' + ic('s-tg') + 'Telegram</a></li>' +
        '<li><a href="https://www.youtube.com/@DecopolUzbekistan" target="_blank" rel="noopener">' + ic('s-yt') + 'YouTube</a></li></ul></div>' +
      '<div class="fcol"><h4>' + d.nav[8] + '</h4><ul>' +
        '<li><a href="mailto:info@decopol.net">info@decopol.net</a></li>' +
        '<li><a href="tel:+998550552233">+998 55 055 22 33</a></li>' +
        '<li class="addr"><a href="https://yandex.com/maps/10335/tashkent/house/YkAYdANhT0YOQFprfX90cHVnYw==/?ll=69.241639%2C41.351947&z=16.68" target="_blank" rel="noopener">' + d.address + '</a></li></ul></div>' +
    '</div></div><div class="copy">' + d.rights + '</div></footer>';
}

function useCards(list) {
  return list.map(function (u, i) {
    return '<div class="use"><div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + ICONS[i] + '</svg></div><h3>' + esc(u[0]) + '</h3><p>' + esc(u[1]) + '</p>' + (u[2] ? '<p>' + esc(u[2]) + '</p>' : '') + '</div>';
  }).join('');
}

function homeProjects() {
  var d = T[lang];
  var blocks = HOME_PROJ.map(function (id) {
    var c = pick(CASES, 0, id), i = CASES.indexOf(c);
    return '<a class="hproj" href="case.html?id=' + id + '" style="background-color:' + TONES[i % TONES.length] + '">' +
      '<div class="bg" style="background-image:' + bg('img/cases/' + id + '.jpg') + ';background-position:' + cpos(id) + '"></div>' +
      '<div class="cap"><h3>' + esc(c[1]) + '</h3><span>' + esc(d.projCat[id] || '') + '</span></div></a>';
  }).join('');
  return '<section class="hprojs"><h2 class="sec">' + d.projTitle + '</h2>' + blocks +
    '<div class="proj-all">' + cta('tan', d.projAll, 'cases.html') + '</div></section>';
}

function aboutTwo(text) {
  var d = T[lang];
  return '<section class="two"><h2>' + d.aboutTitle + '</h2><div class="tx">' + esc(text) + '</div></section>';
}

function results() {
  var d = T[lang];
  return '<section class="res"><h2>' + d.resTitle + '</h2><div class="rrow">' +
    d.res.map(function (r) { return '<div class="rbox"><strong>' + r[0] + '</strong><span>' + esc(r[1]) + '</span></div>'; }).join('') + '</div></section>';
}

function advantages() {
  var d = T[lang], html = '';
  d.adv.forEach(function (a, i) {
    if (i === 5) {
      html += '<div class="ac logo">' + ic('logo-mark') + '<div class="wm2"><b>DECOPOL</b><i>PANEL &amp; FLOORING</i></div></div>';
    }
    html += '<div class="ac"><div class="tt"><i></i><span>' + esc(a[0]) + '</span></div><p>' + a[1] + '</p>' +
      '<img src="' + BASE + 'img/' + a[3] + '.png" alt="" loading="lazy" onerror="if(!this.dataset.f){this.dataset.f=1;this.src=\'' + FR + a[2] + '.png?width=450&height=290\'}else{this.style.display=\'none\'}"></div>';
  });
  return '<section class="advs"><h2 class="sec">' + d.advTitle + '</h2><div class="adv">' + html + '</div></section>';
}

/* ---------------------------------------------------------------
   Sahifalar
--------------------------------------------------------------- */
function pageHome() {
  var d = T[lang];
  return '<section class="hero" id="hero" style="background-image:' + bg('img/hero-home.jpg', FR + 'JhDlM2ogN3VExi82JEFddG3sA1w.png?width=1352&height=635') + '">' +
    '<h1>' + d.heroTitle + '</h1><p class="sub">' + d.heroText + '</p>' +
    '<div class="stats"><div class="stat"><strong>1,000+</strong><span>' + d.stat1 + '</span></div><div class="stat"><strong>14+</strong><span>' + d.stat2 + '</span></div></div>' +
    cta('white', d.cta) + '</section>' +
    '<section class="reviews"><h2 class="sec">' + d.revTitle + '</h2><div class="slider"><div class="track" id="track"></div>' +
      '<button class="sbtn prev" id="prev" type="button" aria-label="Previous">' + ic('i-left') + '</button>' +
      '<button class="sbtn next" id="next" type="button" aria-label="Next">' + ic('i-right') + '</button>' +
      '<div class="dots" id="dots"></div></div><div class="cta-row">' + cta('tan', d.cta) + '</div></section>' +
    homeProjects() +
    '<section class="brands"><h2 class="sec">' + d.brandsTitle + '</h2><div class="bgrid">' +
      BRANDS.map(function (b) { return '<div class="tile" style="background:' + b[3] + ';color:' + b[4] + '"><img src="' + BASE + 'img/brands/' + b[0] + '.jpg" alt="' + esc(b[1]) + '" loading="lazy" onerror="this.remove()"><b style="font:' + b[5] + '">' + esc(b[1]) + '</b>' + (b[2] ? '<small>' + esc(b[2]) + '</small>' : '') + '</div>'; }).join('') + '</div></section>' +
    '<section class="uses"><h2 class="sec">' + d.usesTitle + '</h2><div class="ugrid">' + useCards(d.uses) + '</div><div class="cta-row">' + cta('tan', d.cta) + '</div></section>' +
    '<section class="faq"><h2 class="sec">' + d.faqTitle + '</h2><div class="fl">' +
      d.faq.map(function (f) { return '<details><summary><span>' + esc(f[0]) + '</span><span class="pm">' + ic('i-plus') + '</span></summary><p>' + esc(f[1]) + '</p></details>'; }).join('') + '</div></section>';
}

function pageAbout() {
  var d = T[lang];
  return '<section class="hero plain" style="background-image:' + bg('img/about-hero.jpg', FR + 'w6twKPWqx4AaX0BXj57yUfDsk.png?width=2536&height=1692') + '"><h1>' + d.aboutHero + '</h1></section>' +
    aboutTwo(d.aboutText) + results() + advantages() + '<div style="height:130px"></div>';
}

function pageFranshiza() {
  var d = T[lang];
  var list = d.uses.map(function (u, i) { return i === 2 ? [u[0], d.usesRestoF, u[2]] : u; });
  return '<section class="hero plain" style="background-image:' + bg('img/franshiza-hero.jpg', FR + 'aubSuqaqA7E0GamHaieuRn4qE.png?width=4320&height=1800') + '"><h1>' + d.frHero + '</h1></section>' +
    aboutTwo(d.aboutTextF) + results() + advantages() +
    '<section class="tech"><h2><em>' + d.frTech[0] + '</em>' + d.frTech[1] + '</h2></section>' +
    '<div class="ugrid">' + useCards(list) + '</div>' +
    '<section class="fr"><h2 class="sec">' + d.frTitle + '</h2><div class="fgrid2">' +
      d.frList.map(function (f, i) {
        return '<a class="fcard" href="franchise.html?id=' + f[1] + '" style="background-image:' + FRIMG(f[1]) + ';background-color:#cfcfcf"><h3>' + esc(f[0]) + '</h3></a>';
      }).join('') + '</div></section>';
}

function pageCases() {
  var d = T[lang];
  var chips = d.casesFilters.map(function (f) {
    return '<button type="button" class="chip' + (state.cases === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + esc(f[1]) + '</button>';
  }).join('');
  var shown = CASES.filter(function (c) { return state.cases === 'all' || c[2] === state.cases; });
  var cards = shown.map(function (c) {
    var i = CASES.indexOf(c);
    var svc = c[3] ? '<p>' + esc(d.casesSvc[c[3]]) + '</p>' : '';
    return '<a class="case" href="case.html?id=' + c[0] + '" style="background-color:' + TONES[i % TONES.length] + '">' +
      '<div class="bg" style="background-image:' + bg('img/cases/' + c[0] + '.jpg') + ';background-position:' + cpos(c[0]) + '"></div>' +
      '<div class="cap"><h3>' + esc(c[1]) + '</h3>' + svc + '</div><span class="look">' + d.look + '</span></a>';
  }).join('') || '<div class="empty">' + d.noCases + '</div>';
  return '<div class="page-top"><h1 class="sr">' + d.casesH + '</h1><div class="chips" id="chips">' + chips + '</div><div class="cgrid">' + cards + '</div></div>';
}

function pageShowroom() {
  var d = T[lang];
  var chips = d.srFilters.map(function (f) {
    return '<button type="button" class="chip' + (state.zone === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + esc(f[1]) + '</button>';
  }).join('');
  var shown = ZONES.filter(function (z) { return state.zone === 'all' || z[6] === state.zone; });
  var cards = shown.map(function (z) {
    var i = ZONES.indexOf(z);
    var info = [['i-book', z[1]], ['i-cal', d.zDays(z[2])], ['i-user', d.zN(z[3])], ['i-wrench', d.zN(z[4])]];
    var labels = d.zl;
    var order = [0, 1, 2, 3];
    var html = order.map(function (k) {
      return '<div class="it"><div class="ci">' + ic(info[k][0]) + '</div><b>' + labels[k] + '</b><span>' + esc(info[k][1]) + '</span></div>';
    }).join('');
    return '<article class="zone"><div class="l"><h3>' + esc(z[1]) + '</h3><div class="info">' + html + '</div>' +
      '<div>' + cta('white sm', d.zMore, 'zone.html?id=' + z[0]) + '</div></div>' +
      '<div class="r" style="background-image:' + bg('img/showroom/' + z[0] + '.jpg') + ';background-color:' + TONES[(i * 2) % TONES.length] + '"></div></article>';
  }).join('');
  return '<section class="srh"><h1>' + d.srTitle + '</h1><p>' + esc(d.srText) + '</p>' + cta('tan', d.contactBtn, 'contact.html') + '</section>' +
    '<div class="srv"><div class="vid"><video autoplay muted loop playsinline preload="metadata"><source src="' + BASE + 'video/showroom.mp4" type="video/mp4"><source src="https://framerusercontent.com/assets/9DihjZmJPpsSMGB66nllbs1veQ.mp4" type="video/mp4"></video></div></div>' +
    '<section class="sab"><h2>' + d.srAbout + '</h2><div class="tx">' + d.srParas.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></section>' +
    '<section class="szt"><h2 class="sec">' + d.srZones + '</h2><div class="zchips" id="chips">' + chips + '</div><div class="zones">' + cards + '</div></section>';
}


/* ---------------------------------------------------------------
   Ichki (detal) sahifalar
--------------------------------------------------------------- */
function getId() { return new URLSearchParams(location.search).get('id'); }
function backLink(href, label) { return '<a class="back" href="' + href + '">' + ic('i-left') + esc(label) + '</a>'; }
function notFoundPage() {
  var d = T[lang];
  return '<div class="dp dh"><h1>' + d.notFound + '</h1><div class="dcta" style="text-align:left">' + cta('tan', d.toHome, './') + '</div></div>';
}
function pick(list, idx, val) { return list.filter(function (x) { return x[idx] === val; })[0]; }
function caseCard(c) {
  var d = T[lang], i = CASES.indexOf(c);
  var svc = c[3] ? '<p>' + esc(d.casesSvc[c[3]]) + '</p>' : '';
  return '<a class="case" href="case.html?id=' + c[0] + '" style="background-color:' + TONES[i % TONES.length] + '">' +
    '<div class="bg" style="background-image:' + bg('img/cases/' + c[0] + '.jpg') + ';background-position:' + cpos(c[0]) + '"></div>' +
    '<div class="cap"><h3>' + esc(c[1]) + '</h3>' + svc + '</div><span class="look">' + d.look + '</span></a>';
}
function zoneCard(z) {
  var d = T[lang], i = ZONES.indexOf(z);
  return '<a class="case" href="zone.html?id=' + z[0] + '" style="background-color:' + TONES[(i * 2) % TONES.length] + '">' +
    '<div class="bg" style="background-image:' + bg('img/showroom/' + z[0] + '.jpg') + '"></div>' +
    '<div class="cap"><h3>' + esc(z[1]) + '</h3><p>' + esc(d.zDays(z[2])) + '</p></div><span class="look">' + d.look + '</span></a>';
}

function detailHero(img, title, tone, pos) {
  return '<section class="dhero" style="background-image:' + bg(img) + ';background-position:' + (pos || 'center') + ';background-color:' + tone + '"><div class="dwrap"><h1>' + esc(title) + '</h1></div></section>';
}
function infoCols(list) {
  return '<div class="dinfo2">' + list.map(function (it) {
    return '<div class="di2"><div class="ci">' + ic(it[0]) + '</div><b>' + esc(it[1]) + '</b><span>' + esc(it[2]) + '</span></div>';
  }).join('') + '</div>';
}
function videoBlock(url, label) {
  if (!url) return '';
  return '<section class="dvid"><div class="dwrap"><h2>' + esc(label) + '</h2><div class="vbox"><video controls playsinline preload="metadata"><source src="' + esc(url) + '" type="video/mp4"></video></div></div></section>';
}

function pageCase() {
  var d = T[lang], c = pick(CASES, 0, getId());
  if (!c) return notFoundPage();
  var cat = pick(d.casesFilters, 0, c[2]), i = CASES.indexOf(c);
  var others = CASES.filter(function (x) { return x !== c; }).slice(0, 4);
  var info = [['i-book', d.cLabels[0], c[1]]];
  if (cat) info.push(['i-cal', d.cLabels[1], cat[1]]);
  if (c[3]) info.push(['i-wrench', d.cLabels[2], d.casesSvc[c[3]].replace(/,\s*$/, '')]);
  return detailHero('img/cases/' + c[0] + '.jpg', c[1], TONES[i % TONES.length], cpos(c[0])) +
    '<section class="dabout"><div class="dwrap">' + backLink('cases.html', d.nav[3]) + '<h2>' + d.cAbout + '</h2>' + infoCols(info) + '</div></section>' +
    videoBlock(CVIDEO[c[0]], d.zVideoT) +
    '<div class="dwrap dcta2">' + cta('tan', d.cta) + '</div>' +
    '<section class="more"><h2 class="sec">' + d.otherCases + '</h2><div class="cgrid">' + others.map(caseCard).join('') + '</div></section>';
}

function pageFranchise() {
  var d = T[lang], f = pick(d.frList, 1, getId());
  if (!f) return notFoundPage();
  var i = d.frList.indexOf(f), other = d.frList.filter(function (x) { return x !== f; });
  return '<div class="dp dh">' + backLink('franshiza.html', d.nav[2]) + '<h1>' + esc(f[0]) + '</h1><div class="meta"><span class="tag">' + d.frHero + '</span></div>' +
    '<div class="dimg" style="background-image:' + FRIMG(f[1]) + ';background-color:' + TONES[i * 3] + '"></div>' +
    '<div class="dcta">' + cta('tan', d.nav[8], 'contact.html') + '</div></div>' +
    (other.length ? '<section class="fr"><h2 class="sec">' + d.frTitle + '</h2><div class="fgrid2">' + other.map(function (o) {
      return '<a class="fcard" href="franchise.html?id=' + o[1] + '" style="background-image:' + FRIMG(o[1]) + ';background-color:#cfcfcf"><h3>' + esc(o[0]) + '</h3></a>';
    }).join('') + '</div></section>' : '');
}

function pageContact() {
  var d = T[lang];
  var map = 'https://yandex.com/maps/10335/tashkent/house/YkAYdANhT0YOQFprfX90cHVnYw==/?ll=69.241639%2C41.351947&z=16.68';
  var items = [
    [d.cPhone, '+998 55 055 22 33', 'tel:+998550552233'],
    [d.cEmail, 'info@decopol.net', 'mailto:info@decopol.net'],
    ['Telegram', '@decopoluz', 'https://t.me/decopoluz'],
    ['Instagram', '@decopoluzbekistan', 'https://www.instagram.com/decopoluzbekistan/'],
    ['YouTube', '@DecopolUzbekistan', 'https://www.youtube.com/@DecopolUzbekistan'],
    [d.cAddr, d.address, map]
  ];
  return '<div class="dp dh"><h1>' + d.cTitle + '</h1>' +
    '<div class="cgrid2">' + items.map(function (it) {
      var ext = it[2].indexOf('http') === 0;
      return '<a class="cc" href="' + it[2] + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '><small>' + esc(it[0]) + '</small><b>' + esc(it[1]) + '</b></a>';
    }).join('') + '</div>' +
    '<div class="mapbox"><iframe title="Map" loading="lazy" src="https://yandex.com/map-widget/v1/?ll=69.241639%2C41.351947&z=16&pt=69.241639,41.351947,pm2rdm"></iframe></div>' +
    '<div class="dcta">' + cta('tan', d.cMap, map) + '</div></div>';
}

var COLL=[["harmonia","Harmonia","apF7DYV06HM9c8oB3G1mH6wHmOc.jpg","","",[["royal-walnut","qnQHkOY31jF1WUc9h933v3c0k.png"],["lumina-oak","VA4YSJh5DxB4Je09pITcA9ZTOnM.png"],["grabhite-night","Z1w9XGH0Jj5ktwLjEJFR9QfXLQ.png"],["alpine-white","vMwcotIEbIaSOeIAdqaMkSamIE.jpg"]]],["infinity","Infinity","Sin2fgT5J0L2xeS5CXEDtj0iM.png","","",[["mocha-line","QdgdTRXFZE8DVmAcqR0licPhGA.png"],["desert-sand","Sa5CWGQYdUy6YB3DdfUnb1esk.png"],["arctic-matte","tdNjkAlN6o44zpNRLaISjopplk.png"],["amber-wood","0GoHXnFwCltkucCAkKLlAp3uJgs.png"]]],["revo-2","Revo 2","pBPL2kkgnFp4lSeupyby78UCrI.jpg","","",[["vector-shade","SlEiT0efS3Q94xr5cMnZpMVD4Bk.png"],["meteor-trace","OAsg3irzZJgJxLBYf8oH3zwgXJE.png"],["magma-edge","JiANzTjNyqSBQ0BdOZ9zgdfo.png"],["comet-dust","lpPcaKNO1rwNAm56geYty1jpSS0.png"]]],["revo","Revo","UkiMi0FbM45yNB43rtGHt9EssE.jpg","","",[["fusion-core","hBjfJYQQmCEj7CfQ8WmXUBAh2M.png"],["sonic-wave","rC8vsNntzzYC5wZ8ylu4kFFzwI.png"],["kinetic-flow","bm6htbTzUneCOO4OZ3QHFcFlhD0.png"],["steel-nomad","7cFTlCaSpUt1BA9oCYXDpVP5oM.png"]]],["satori","Satori","iwsBylTV7oNOgZAbMgaUbJwtco.jpg","","",[["ocean-depth","R8ORZhljOhvA7LacFJkZO0OkmY.png"],["canyon-wind","IcnddrCxBxyepihFAN5TdfnPjE.png"],["solar-pulse","hbgfy2CayIEE5itGpgz1DXVaJWc.png"],["indigo-soul","7a4nSm8M9DpjlstaSAf9LHn1wA8.png"]]],["yugen","YUGEN","cEfPoTjbLkCV8USl1tvUoGgg.jpg","","",[["fossil-clay","yR0Eprg8VOSl5EtJYich2fSXw.png"],["velvet-slate","rZrnTyScRQaLvxfRL5i3sFWY.png"],["onyx-shadow","gA2MV3fLP8Vkb0GucDD8ue4PV4o.png"],["basalt-grain","ox6CGeSfq39NW2jHHgWDGEIbss.png"]]],["rei","REI","2qmtYr9Sp3jKurpkEIxNHmTsqXg.jpg","","",[["copper-dusk","5iSEsoLpY5ft8q7NZOGJFV9vUA.png"],["canyon-dust","WtSK9oQv2cpJbXrVqfrrjNfbzc.png"],["jasper-flow","gNa7RFTzVDXyQGEpZGw3d6NRObM.png"],["terra-essence","ygPVNVDgtMZoIRQkb9xB0vDCVo.jpg"]]],["nova","Nova","q6YJuuz0SXyPgyPbNGjpsqoRYFU.png","oo8KFdeEUBnAJ6LieYnKtHGQr8I","t",[["kinetic-sand","g33DWPTH6pPVAnnm2lUuPuBGU.png"],["aura-walnut","abj91G1Cv9d21mrIrx8trZUseE.png"],["empiric-sand","nUMV7aXlYDuPKyrxlNgzNQMkIeo.png"],["terra-mirage","7wBYfvWcC5IJSwCADFvp1W1zcug.png"]]],["shagren","Shagren","wjKBSOKh4zaEvHlYvhTpN3lEM.png","DBhewbsWgJ5lCgYExbROodXcc","p",[["ice-frost","JR8G6lMZ0dw1M8zndSaVPKyVI.jpg"],["charcoal-mist","8PxGncLg3t6KM5ExvwuocZxNpVM.png"],["arctic-silver","zD6DKsbptUL9Nw07A0VoBlyJlY.png"],["iron-dust","qICwiwooJguQzEFZPHLeikWE8.jpg"],["snow-texture","29kbbud7DwAfg8p73HKzYGglNWE.jpg"]]],["mramor","Mramor","gu4CUrfYZh1d8c6VyjxQdLwwCY.png","DxoTyGBLUskZaDbRAsVPKNZNDTs","p",[["arctic-marble","XtXFHqeA0XvYguRXSQETkjZBBoI.jpg"],["noir-stone","LhAqGR4hyWnE3IXj0t2NAiNdiE.jpg"],["alpine-vein","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["white-halo","zMahsIYcd4lkJL3wU6ZQgcUFps.jpg"],["crystal-white","CWCG1tSnRbcs9rhQQm0KDGYjI0.jpg"],["crema-elegance","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["grey-line","6Njn6tRR8g8WrzKS1BSccU2X3E.jpg"],["silver-vein","JIG6BkdTiFB0BVgszZVnU2zodk.jpg"],["alpine-mist","rse51uyzvQdDPeC4EAYFfbTeY.png"],["travertino","Iu9N85tVm87zvlw72wldqq26QKE.jpg"],["maple-flow","i1uitDn60zVWveZ0GFdm4IXaRk.jpg"],["ebony-flow","MkDEFVqJqEZN030hJDIFxaDSro.jpg"]]],["textile","Textile","S9PAqESbqBkYPsap2ZOtmzXQYUk.png","1AJFZ1wSa79VkUpC1lBrfahhjMc","p",[["crimson-aura","kDX7NSkPDlQSIGM6J6RAWr1q2Vg.jpg"],["azure-weave","P9lZ61HNpXMUmp9xH8vfKYDvZ4.png"],["frosty-grid","d7n4LC4lnn2KbY7JxfoHKMnBw3E.jpg"]]],["mebelniy","Mebelniy","6mMYkAHlfu5yUD3bCsVjKDZhwjs.png","LksE7cndU8q1OIxg54dIKXP3BY","p",[["nordic-birch","Tz8pn2tOUGQD2jebjcUIArnMsMY.jpg"],["charcoal-stripe","nVjk9DJF4Rtxd73RKlOdk8BOeZ0.png"],["coffee-ash","fbW3HUsvAE0DGdjnS7eiOlVLNUs.png"],["walnut-silk","FEBWB5y7m7E916V0hbd0vsV1JFc.jpg"],["terra-wood","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["frost-grey","cT3jzduWTxjMg5EVc6YV5n4VsZw.jpg"],["taupe-cloud","trIqiO6mAvmq2bGLu8bUWRThs.png"],["sand-oak","sh31cukUDz9G7DuTgie8fHHGIk.jpg"],["nordic-oak","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["sand-beige","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["arctic-ash","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["sunny-oak","DnGE3Dzqhurwf6uFrCZb4vQgLuo.png"],["golden-walnut","zcSeMbvLLKTMERB40p36vl5BTA.png"],["polar-birch","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["grey-frost","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["honey-oak","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["smoky-ash","qN71FcHzrc8wiBj39f725lng.jpg"],["mocha-oak","Pb9rSoJtvkIZHXa96ckqGOXLM.jpg"],["sandy-oak","LyGTKHjTKJXSe1JVlxozB2FWEo.png"],["shadow-oak","JXHXBPRVPNPfHiYO6awjNnvlI.png"],["rustic-brown","KY4RuBJqslvXATzYOAmAJs6OcA.jpg"],["rustic-cocoa","tiKlybTGlI3Doy8DVh2yb0YM.png"]]],["metalik","Metalik","vr4u1bE74rVeSdVMP5V6QY74dk.png","leIR7h3FxruWuj5Q7Zm1rPMHX74","p",[["silver-mist","38DTVep0RO5OwqxhruHfd6bLyOM.jpg"],["bronze-liquid","a1s3jnD1FVrra8LW6z38Uy77Y.png"],["black-mirror","WWfKq0iQ5INPsVY1Fqo7kmsFjtM.jpg"],["gold-mirror","9Cy0a3fC8BnQflYNGLnhE4kExcs.jpg"],["white-mirror","7DeGVVS5JsGYXyZQY1LyqeaKmk.png"],["silver-mirror","L3BiTbk167zH85D6ztRPx7wL5hg.jpg"]]],["perlamutrviy","Perlamutrviy","nKFea1qxqpyMARr4pGS43le4EEM.png","mvPDmhYCVrk9fMzI1g2OGO5UNlQ","p",[["champagne-silk","yi6b1rcEmv0Jq1alxCZkEEtXj4Y.png"],["graphite-shine","aBmauz6cs8s7ZsSPrIbESTzXQ.jpg"],["golden-pearl","2cT3dvRtVU4BE4WvY1ouX22KPeg.jpg"],["platinum-line","ZGCvD3BYiPwVCe5m2laykZ46Qs.jpg"],["silver-dust","StmqnQKmAR2xgIVgxqpwRQ4kuk.jpg"],["bronze-wave","h82e03PsGAs2qbFoctX0zv7DM.png"],["silver-moonlight","NzggqWN1zUt61kJfaPVewQJ6pyo.jpg"],["pearl-shine","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["platinum-grey","778wFtkpxpwhdsdtefK0jJN7c8.jpg"],["arctic-pearl","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["cloud-ash","YVwZDgkR3x4o5vAObFrwS7CeGsw.png"]]],["odnotonniy","Odnotonniy","Dm8WLqmgzDjTNJKulaXI0sqwf88.png","RRBQfBrnkUEwMrSgojuYdgvU","p",[["solar-flame","Wfwlu9D9v1aeAkd93BKC0lwIjwU.jpg"],["graphite-stone","2JbdKm7SCjkqobyyUgDa0ON9L8.png"],["ivory-calm","lozKEg4qlobxZ40G6zZALWbrGU.jpg"],["polar-white","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["forest-deep","s79reQEJW7LawKprfmQ4o98v40.jpg"],["vanilla-white","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["cream-beige","MfjgfvBWe3wp1NdpicjN4eMTGas.jpg"],["meridional-grey","y75CyRvRuDFZSFHjdA7YUHvsU.jpg"],["camel","ZwMytLsll95uhw2g7T96SMma4Xg.png"],["tea-yellow","l3TgI4btcXlvarsvyCEvhjY6cA.jpg"]]],["mishkavina","Mishkavina","le47SLo5v9tcAoABLFye47mxV1k.png","PiDZyRPxHluBHC1FNAUGI1IAyj4","p",[["linen-grey","vAYi3s9SSoqAreAfDt5NIUSClw.jpg"],["nordic-thread","sXFjsMz4Eyq1MQy8ZkJD2v1EYk.jpg"],["pearl-texture","caCMnQAnGiEETxxuuQGuW4kvo.jpg"],["golden-weave","E0858SXARHZ4ZlrrfozIWs5D3vE.jpg"],["pure-snow","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["silver-cloud","CeZtyzennqS85vboVM4jltgsGA.jpg"],["urban-grey","g5j25ccZ0FKurID7q3ztEVxNlfs.jpg"],["soft-ivory","SOiyQ1QaON9mRWMl0jQpgyy7Y9Y.png"],["warm-taupe","c16QFpJa86HNSmxOy7vEDtTYkyw.jpg"],["arctic-linen","tWwD9mpLsYcI6PjA9eQEX7ItU.png"],["soft-weave","OkiNrYiGDJcYmQu6cMkSDpZ2A.jpg"],["arctic-grey","PqUsamdUaOW7uvCtybvZVm8ZG6o.png"],["taupe-weave","Y2sH1nza4Qk3DBIWv1UNnv0nCyw.jpg"],["snow-canvas","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["milky-satin","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["150-es-178254","p7t0AYLeddYEVUfUBy71lyrJmU.png"],["rustic-cocoa-150-es-598969","wBWwrNVbLq9JDEIZJ1PENO0nXA.jpg"],["150-es-598969","eQhu0rFvWWsgflIsvtA6iXb7kg.jpg"],["150-225257-wpc","thG30ibeEwdrQAMMF9Fq6u9dc.jpg"],["120-992930-wpc","4DUVn1s8hWoIL87QQ063GTrNeCw.jpg"],["120-ln-100856","94pJZ2VYZBNyJ1RX1uttYglFOnE.jpg"],["160-992930-wpc","p7t0AYLeddYEVUfUBy71lyrJmU.png"]]],["bionic","Bionica","bVJnpLgMiMI2RWynwbqnOgNbHs.png","zf5DwOjbIwTN9tnI76WMSOEAPw","t",[["rustic-brown-150-es-425980","MfNBjtaJiR6y5Nkp1NozaOJ7HYM.png"],["sand-oak-150-es-573621","tXKtfxwjjxChQ1DNzcStb6vQBwg.png"]]],["lumina","Lumina","0BCgmXTJYcxGZKUxXvPmaNjxWvM.png","WtzGfm021CA25wo2IQejka337as","t",[["150-es-425980","zWhVJo0utr3ajI9GEUI73AjBt1I.png"],["150-ln-100856","lJLoVC0q875ISfXiWlMvx4CtE.png"],["150-645673-wpc","ytNdD5U8IHzj7YA8jSCKwkT1wkc.png"],["150-917833-wpc","OJFWS0jX4C9gtPvQnfLfGylwIM.png"],["150-rf-6321","wMnFbW2sqceJ2dMrXFC7U2Y7Ao.png"],["150-992930-wpc","27tSbwp1NmG1tDOFNuWH3Mnn4s.png"],["150-es-624159","Grs49TmXvImLQy00f0N1f0Tsfg.png"],["150-rf-8579","2JggCfrBuZQol6TXGi5BSYMQooE.png"],["150-es-528964","pkNflVt1exWRphI3XesazkEkSDw.png"],["150-ln-101121","bHpOQedbpPFpUdaljJmPZ3peNg.png"]]],["oasis","Oasis","5rOCS0joEXMmJJ1cgS1rVdAmK6g.png","pHppZyzXTwPfyUqi6Gc7Y8GVs4Y","t",[["120-rf-6321","AENQcsSHsa36YPEoHjIPFZQvDWY.png"],["120-917833-wpc","NsCSkPvo13IjAWogkcMhcdjaC3I.png"],["120-es-624159","zjT7vlD3Z1fWXIekRPTQdTlMsDQ.png"],["120-es-598969","ZYwcDlFcAONsDihEXL6hBdWnPYU.png"],["120-es-528964","kleLCDLC4kYe4iH7kW8TWeywWts.png"],["120-rf-8579","l5hqHY5AdK28IbqBItiqwu8PGg.png"],["sandy-oak-120-es-573621","INrOQyFie92eEYcNcGbMC0wg.png"],["120-225257-wpc","vQQXAbxMDvVXBapzm4EnqHIVXs.png"],["120-es-425980","XdOpXMaKI5yp9sy0dSayVHS04.png"],["120-645673-wpc","RqTi0Jc7OPCgmTNquUqVzpFPk.png"],["120-es-178254","YgGrll9zSM7HmBehsmdblh9JJ7A.png"],["120-ln-101121","jWLJ2dbBOLr2UZjUVMayaiggE.png"]]],["symmetry","Symmetry","egN5kXxLWCj6Zarphgw6v4UsPc.png","Kd9VMuM8RhthLzfVQB5BfSG3YWE","t",[["urban-fog","NHRGTwMQe5l5EadqFPQzh5VvBME.png"],["160-es-425980","6jB7rHFF03J73IGEi0esPZT0Yg.png"],["150-es-573621","pTS7GbnBxvSsK5nKpndP5xicwE.png"],["160-917833-wpc","bQhKp0Eh0PeaJqH9PfB1gXlNNM.png"],["160-es-624159","lqQzpKhEas5oQnPOABmLI4ftg6I.png"],["160-es-598969","Gpxp3MvGOncvMN8s1b9B9jYNTBo.png"],["160-ln-100856","vQnuQv0n1PaJXKukqv73cUua5ZA.png"],["160-645673-wpc","KoUBHwEtNi6MwTya7v5OF7gP0.png"],["160-es-178254","0qH6mavFoaOU2YP14PNw3q8kv9w.png"],["160-ln-101121","E5ZrOXgWBiAE67g5042W1WuQEQ.png"],["160-es-528964","CWJq1valowZOGf85d8rWkqZqj2U.png"]]],["stik","Stik","R7BRpqiLORzT7ggrsdmhVY8M.png","U5g1IHqJr7EW8f29GKLSHx97YHM","s",[]],["louvre","Louvre","dnrYpH5cPOdu99aoWIk8efcupkw.png","l2t6VFiCrEDPahFavnSf1hzIkM","t",[]]];
var PROD={"meteor-trace":["Meteor Trace","104 -178254","Meteor Trace — meteorit izlaridan ilhomlangan zamonaviy dekorativ material bo‘lib, chuqur kulrang va metallik ohanglari bilan kosmik uslubni eslatadi.","Premium","20*20mm","OAsg3irzZJgJxLBYf8oH3zwgXJE.png"],"arctic-matte":["Arctic Matte","333 ES - 645673","Arctic Matte — sovuq oq va och kulrang tonlarni o‘zida mujassam etgan, silliq mat yuzali dekorativ panel bo‘lib, interyerga yorug‘lik, kenglik va zamonaviy minimalistik ko‘rinish beradi. Ayniqsa ofislar, showroomlar, mehmonxonalar va zamonaviy uy interyerlari uchun mos.","Plus","300mm*3000, 100mm*3000mm, 200mm*3000mm","tdNjkAlN6o44zpNRLaISjopplk.png"],"amber-wood":["Amber Wood","333 ES - 598969","Amber Wood — tabiiy yog‘och teksturasidan ilhomlangan premium dekorativ panel bo‘lib, interyerga iliqlik, nafislik va tabiiy ko‘rinish baxsh etadi. Mehmonxona, ofis, restoran va turar joy interyerlarida keng qo‘llaniladi.","Plus","300mm*3000, 100mm*3000mm, 200mm*3000mm","0GoHXnFwCltkucCAkKLlAp3uJgs.png"],"desert-sand":["Desert Sand","333 ES - 624159","Desert Sand — cho‘l qumlarining tabiiy to‘lqinsimon teksturasidan ilhomlangan dekorativ panel bo‘lib, interyerga iliq, tabiiy va sokin muhit bag‘ishlaydi.","Plus","300mm*3000, 100mm*3000mm, 200mm*3000mm","Sa5CWGQYdUy6YB3DdfUnb1esk.png"],"vector-shade":["Vector Shade","104 -624159","Vector Shade — geometrik chiziqlar va zamonaviy soyalar uyg‘unligidan ilhomlangan dekorativ material bo‘lib, minimalistik va futuristik ko‘rinishga ega.","Premium","20*20mm","SlEiT0efS3Q94xr5cMnZpMVD4Bk.png"],"mocha-line":["Mocha Line","333 ES - 178254","Mocha Line — interyer devorlari uchun zamonaviy dekorativ panel bo‘lib, chuqur qahva rangidagi teksturasi bilan xonaga issiq va premium ko‘rinish beradi.","Plus","300mm*3000, 100mm*3000mm, 200mm*3000mm","QdgdTRXFZE8DVmAcqR0licPhGA.png"],"magma-edge":["Magma Edge","104 -598969","Magma Edge — vulqon magmasining issiq energiyasi va tabiiy tosh teksturasidan ilhomlangan dekorativ material. To‘q kulrang, qora va olov ranglariga yaqin ohanglari bilan kuchli vizual effekt yaratadi.","Premium","20*20mm","JiANzTjNyqSBQ0BdOZ9zgdfo.png"],"comet-dust":["Comet Dust","104 - 645673","Comet Dust — kometa izlaridagi mayin chang va kosmik yorqinlikdan ilhomlangan dekorativ material bo‘lib, yumshoq kulrang va metallik yaltirash effektiga ega.","Premium","20*20mm","lpPcaKNO1rwNAm56geYty1jpSS0.png"],"lumina-oak":["Lumina Oak","222 ES - 598969","Lumina Oak — tabiiy eman yog‘ochining nafis teksturasi va yorqin ranglarini o‘zida mujassam etgan dekorativ panel bo‘lib, interyerga yorug‘lik, kenglik va zamonaviy ko‘rinish baxsh etadi.","Plus","300mm*3000, 100mm*3000mm, 200mm*3000mm, 50mm*3000mm","VA4YSJh5DxB4Je09pITcA9ZTOnM.png"],"alpine-white":["Alpine White","222 ES - 645673","Alpine White — sof oq rang va nafis mat teksturaga ega dekorativ panel bo‘lib, interyerga yorug‘lik, kenglik va zamonaviy minimalistik ko‘rinish baxsh etadi.","Plus","300mm*3000, 100mm*3000mm, 200mm*3000mm, 50mm*3000mm","vMwcotIEbIaSOeIAdqaMkSamIE.jpg"],"grabhite-night":["Grabhite Night","222 ES - 178254","Graphite Night — chuqur grafit-qora rang va zamonaviy mat teksturani o‘zida mujassam etgan dekorativ panel bo‘lib, interyerga premium va zamonaviy ko‘rinish bag‘ishlaydi.","Plus","300mm*3000, 100mm*3000mm, 200mm*3000mm, 50mm*3000mm","Z1w9XGH0Jj5ktwLjEJFR9QfXLQ.png"],"royal-walnut":["Royal Walnut","222 ES - 624159","Royal Walnut — yong‘oq daraxtining tabiiy teksturasi va chuqur jigarrang ranglaridan ilhomlangan dekorativ panel bo‘lib, interyerga hashamatli va zamonaviy ko‘rinish beradi.","Plus","300mm*3000, 100mm*3000mm, 200mm*3000mm, 50mm*3000mm","qnQHkOY31jF1WUc9h933v3c0k.png"],"steel-nomad":["Steel Nomad","103- 645673","Steel Nomad — po‘latning mustahkamligi va sayohatchi ruhidan ilhomlangan dekorativ material bo‘lib, sovuq kulrang metall ohanglari va qo‘pol teksturasi bilan ajralib turadi.","Premium","25*25mm","7cFTlCaSpUt1BA9oCYXDpVP5oM.png"],"sonic-wave":["Sonic Wave","103 -178254","Sonic Wave — tovush to‘lqinlarining dinamik harakatidan ilhomlangan dekorativ material bo‘lib, oqimga o‘xshash yumshoq chiziqlar va ritmik tekstura bilan ajralib turadi.","Premium","25*25mm","rC8vsNntzzYC5wZ8ylu4kFFzwI.png"],"fusion-core":["Fusion Core","103 -624159","Fusion Core — turli tabiiy tekstura va ranglarning uyg‘unlashuvidan ilhomlangan zamonaviy dekorativ material. Kuchli vizual kontrast va dinamik ko‘rinish bilan ajralib turadi.","Premium","25*25mm","hBjfJYQQmCEj7CfQ8WmXUBAh2M.png"],"copper-dusk":["Copper Dusk","222 - ES-624159","Copper Dusk — mis rangiga yaqin iliq jigarrang tus. Zamonaviy va premium ko‘rinish beradi, yorug‘likda yumshoq metallik effekt hosil qiladi.","Premium","210*22mm","5iSEsoLpY5ft8q7NZOGJFV9vUA.png"],"kinetic-flow":["Kinetic Flow","103 -598969","Kinetic Flow — harakat va oqim hissidan ilhomlangan zamonaviy dekorativ material bo‘lib, silliq, dinamik chiziqlar va yumshoq tekstura bilan ajralib turadi.","Premium","25*25mm","bm6htbTzUneCOO4OZ3QHFcFlhD0.png"],"canyon-dust":["Canyon Dust","222 - ES-178254","Canyon Dust — tabiiy qum va tosh ranglariga yaqin iliq, sokin beige-jigarrang tus. Zamonaviy, skandinav va eco uslubdagi dizaynlar bilan juda yaxshi uyg‘unlashadi.","Premium","210*22mm","WtSK9oQv2cpJbXrVqfrrjNfbzc.png"],"terra-essence":["Terra Essence","222 ES-645673","Terra Essence — tabiiy yer ranglari va yumshoq teksturadan ilhomlangan zamonaviy dekor uslubi. Interyerga iliq, sokin va tabiiy atmosfera beradi.","Premium","210*22mm","ygPVNVDgtMZoIRQkb9xB0vDCVo.jpg"],"jasper-flow":["Jasper Flow","222 - ES-598969","Jasper Flow — tabiiy tosh ko‘rinishiga ega zamonaviy dekor yuzasi bo‘lib, yumshoq tekstura va chuqur rang o‘tishlari bilan ajralib turadi.","Premium","210*22mm","gNa7RFTzVDXyQGEpZGw3d6NRObM.png"],"terra-mirage":["Terra Mirage","222 - ES - 645673","Terra Mirage — tabiiy ko‘rinish va yumshoq tuzilishga ega dekorativ qum. Oson shakl oladi, qo‘lga yopishmaydi.","Premium","160*12mm","7wBYfvWcC5IJSwCADFvp1W1zcug.png"],"empiric-sand":["Empiric Sand","222 - ES-598969","Empiric Sand — mayin va elastik tuzilishga ega dekorativ qum. Qo‘lga yopishmaydi, shaklni yaxshi ushlab turadi.","Premium","160*12mm","nUMV7aXlYDuPKyrxlNgzNQMkIeo.png"],"aura-walnut":["Aura Walnut","222 - ES - 178254","Aura Walnut — tabiiy yong‘oq rangiga ega, yumshoq va mayin tuzilishdagi material. Silliq teksturasi bilan yoqimli taassurot qoldiradi.","Premium","1.22x2.90","abj91G1Cv9d21mrIrx8trZUseE.png"],"kinetic-sand":["Kinetic Sand","222 - ES - 624159","Yumshoq va mayin tuzilishga ega, qo‘lga yopishmaydi. Shaklni yaxshi ushlab turadi va ijodiy o‘yinlar uchun qulay.","Premium","160*12mm","g33DWPTH6pPVAnnm2lUuPuBGU.png"],"ocean-depth":["Ocean Depth","102 -624159","Ocean Depth — chuqur okean ranglaridan ilhomlangan dekorativ yuzaga ega material bo‘lib, ko‘k va to‘q moviy ohanglari bilan ajralib turadi.","Premium","40*13MM","R8ORZhljOhvA7LacFJkZO0OkmY.png"],"canyon-wind":["Canyon Wind","102 -178254","Canyon Wind — tabiiy kanyon landshaftlaridan ilhomlangan, yumshoq qum va tosh ranglarini uyg‘unlashtirgan dekorativ material.","Premium","40*13MM","IcnddrCxBxyepihFAN5TdfnPjE.png"],"basalt-grain":["Basalt Grain","222 ES-645673","Basalt Grain — tabiiy bazalt toshining mayda donador fraksiyasidan tayyorlangan dekorativ material. Mustahkam va to‘q kulrang ranglari bilan ajralib turadi.","Premium","210*12mm","ox6CGeSfq39NW2jHHgWDGEIbss.png"],"fossil-clay":["Fossil Clay","222 - ES-624159","Fossil Clay — tabiiy loy asosida yaratilgan dekorativ material bo‘lib, yumshoq tuzilishga ega va shakl berish juda oson.","Premium","210*12mm","yR0Eprg8VOSl5EtJYich2fSXw.png"],"onyx-shadow":["Onyx Shadow","222 - ES-598969","Onyx Shadow — qoramtir, chuqur rang effektiga ega dekorativ material bo‘lib, asosan zamonaviy dizayn va interyer bezaklarida ishlatiladi.","Premium","210*12mm","gA2MV3fLP8Vkb0GucDD8ue4PV4o.png"],"velvet-slate":["Velvet Slate","222 - ES-178254","Velvet Slate — yumshoq teksturaga ega, silliq va mayin yuzali dekorativ material.","Premium","210*12mm","rZrnTyScRQaLvxfRL5i3sFWY.png"],"indigo-soul":["Indigo Soul","102 - 645673","Indigo Soul — chuqur indigo va ko‘kimtir-binafsha ohanglardan ilhomlangan dekorativ material bo‘lib, sirli va zamonaviy atmosfera yaratadi.","Premium","40*13MM","7a4nSm8M9DpjlstaSAf9LHn1wA8.png"],"arctic-silver":["Arctic Silver","602945 - wpс","Sovuq va tiniq, zamonaviy minimalist","Plus","1.22x2.90","zD6DKsbptUL9Nw07A0VoBlyJlY.png"],"charcoal-mist":["Charcoal Mist","731488 - wpс","Industrial va to‘q modern ko‘rinish","Plus","1.22x2.90","8PxGncLg3t6KM5ExvwuocZxNpVM.png"],"iron-dust":["Iron Dust","209960 - wpс","Rustik, qora donalar bilan murakkab sirt","Plus","1.22x2.90","qICwiwooJguQzEFZPHLeikWE8.jpg"],"ice-frost":["Ice Frost","70009 - wpс","Donador, sovuq effektli silliq sirt","Pro","1.22x2.90","JR8G6lMZ0dw1M8zndSaVPKyVI.jpg"],"solar-pulse":["Solar Pulse","102 -598969","Solar Pulse — quyosh nurlarining yorqin va iliq energiyasidan ilhomlangan dekorativ material, oltin-sariq va issiq to‘q ranglar uyg‘unligiga ega.","Premium","40*13MM","hbgfy2CayIEE5itGpgz1DXVaJWc.png"],"snow-texture":["Snow Texture","923080 - wpс","Donador silliqlik, yorug‘likni yaxshi aks ettiradi","Plus","1.22x2.90","29kbbud7DwAfg8p73HKzYGglNWE.jpg"],"frosty-grid":["Frosty Grid","MR-820256","Skandinaviya va modern interyer uchun zamonaviy to‘r tekstura.","Luxury","1.22x2.90","d7n4LC4lnn2KbY7JxfoHKMnBw3E.jpg"],"crimson-aura":["Crimson Aura","MR-310016","Zamonaviy interyer uchun boy, chuqur qizil, yumshoq tekstura.","Luxury","1.22x2.90","kDX7NSkPDlQSIGM6J6RAWr1q2Vg.jpg"],"charcoal-stripe":["Charcoal Stripe","182796 - wpс","Zamonaviy ofis va klassik interyerlar uchun chuqur faktura","Plus","1.22x2.90","nVjk9DJF4Rtxd73RKlOdk8BOeZ0.png"],"azure-weave":["Azure Weave","MR-610058","Minimalistik va loft interyer uchun tinchlantiruvchi moviy.","Luxury","1.22x2.90","P9lZ61HNpXMUmp9xH8vfKYDvZ4.png"],"nordic-birch":["Nordic Birch","372786 - wpс","Sokin va tabiiy ohanglar — skandinaviya interyerlariga mos uyg‘unlik","Plus","Podzakaz","Tz8pn2tOUGQD2jebjcUIArnMsMY.jpg"],"taupe-cloud":["Taupe Cloud","74893 - wpс","Yumshoq va balanslangan ranglar bilan tabiiy ko‘rinish","Plus","1.22x2.90","trIqiO6mAvmq2bGLu8bUWRThs.png"],"coffee-ash":["Coffee Ash","679200 - wpс","Issiq va sokin muhit yaratishga mos zamonaviy ohang","Plus","1.22x2.90","fbW3HUsvAE0DGdjnS7eiOlVLNUs.png"],"terra-wood":["Terra Wood","35293 - wpс","Minimalist va skandinav interyerlar uchun iliq yog‘ochning yengil teksturasi. Makonga sokinlik, tabiiylik va estetik muvozanat beradi.","Plus","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"walnut-silk":["Walnut Silk","917833 - wpс","Elegant yong‘oq fakturasi — klassika va lux dizaynlar uchun","Plus","1.22x2.90","FEBWB5y7m7E916V0hbd0vsV1JFc.jpg"],"sand-oak":["Sand Oak","907265 - wpс","Tabiatdan ilhomlangan, issiq va yorqin effekt","Plus","1.22x2.90","sh31cukUDz9G7DuTgie8fHHGIk.jpg"],"frost-grey":["Frost Grey","35292 - wpс","Minimalist va sovuq makonlar uchun mukammal fon","Plus","1.22x2.90","cT3jzduWTxjMg5EVc6YV5n4VsZw.jpg"],"polar-birch":["Polar Birch","ES-754236","Skandinav ruhidagi eng yorqin, sokin va kenglik baxsh etuvchi rang.","Pro","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"sand-beige":["Sand Beige","ES-871305","Zamonaviy interyer uchun yumshoq va iliq rang, tabiiy yog‘och teksturasi.","Premium","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"nordic-oak":["Nordic Oak","ES-528964","Sokin va tabiiy ohangli, minimalizm va skandinaviya interyerlari uchun mos panel.","Premium","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"arctic-ash":["Arctic Ash","ES-392617","Eng yorqin, zamonaviy va minimalist interyerlar uchun mukammal yechim.","Premium","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"sunny-oak":["Sunny Oak","ES-624159","Tabiiy quyoshli ohang, klassik va zamonaviy xonalarga issiqlik bag‘ishlaydi.","Premium","1.22x2.90","DnGE3Dzqhurwf6uFrCZb4vQgLuo.png"],"golden-walnut":["Golden Walnut","ES-178254","Sokin, klassik va premium muhit uchun tabiiy yog‘och teksturasi.","Premium","1.22x2.90","zcSeMbvLLKTMERB40p36vl5BTA.png"],"grey-frost":["Grey Frost","ES-419682","Zamonaviy va urban interyerlar uchun eng universal va neytral panel.","Pro","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"honey-oak":["Honey Oak","ES-419683","Yengil sariq ohangli, qulaylik va iliqlik baxsh etuvchi tabiiy rang.","Pro","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"mocha-oak":["Mocha Oak","ES-978512","Loft va klassik interyerlar uchun boy va chuqur yog‘och rangli panel.","Pro","1.22x2.90","Pb9rSoJtvkIZHXa96ckqGOXLM.jpg"],"shadow-oak":["Shadow Oak","ES-806419","Chuqur kulrang, zamonaviy va urban interyerlar uchun universal panel. Qoramtir yog‘och tekstura.","Premium","1.22x2.90","JXHXBPRVPNPfHiYO6awjNnvlI.png"],"smoky-ash":["Smoky Ash","ES-235769","Industrial va zamonaviy interyer uchun, chuqur va salqin ohangli panel.","Pro","1.22x2.90","qN71FcHzrc8wiBj39f725lng.jpg"],"sandy-oak":["Sandy Oak","ES-573621","Yengil, tabiiy qum rangli zamonaviy panel. Minimalizm va Skandiya interyerlar uchun ideal yechim.","Premium","Podzakaz","LyGTKHjTKJXSe1JVlxozB2FWEo.png"],"noir-stone":["Noir Stone","948180 - wpс","Fransuzcha minimalizm va zamonaviy interyerlarga mos qora marmar ohang","Plus","1.22x2.90","LhAqGR4hyWnE3IXj0t2NAiNdiE.jpg"],"arctic-marble":["Arctic Marble","869303 - wpс","Hasamati, sovuqlik va tabiat uyg‘unligidagi marmar tekstura — klassik interyerlar uchun ideal","Plus","1.22x2.90","XtXFHqeA0XvYguRXSQETkjZBBoI.jpg"],"alpine-vein":["Alpine Vein","948181 - wpс","Oq marmarning nozik va tabiiy to‘lqinlari — poklik va nafislikni aks ettiradi.","Plus","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"white-halo":["White Halo","499733 - wpс","Yorug‘likni aks ettiruvchi, minimalist va zamonaviy fazolar uchun mukammal tanlov","Plus","1.22x2.90","zMahsIYcd4lkJL3wU6ZQgcUFps.jpg"],"rustic-cocoa":["Rustic Cocoa","ES-598969","Minimalist va Skandinaviya interyerlarida tabiiylikni namoyon etadi. Barqarorlik va estetikani qadrlovchilar uchun ideal tanlov","Premium","1.22x2.90","tiKlybTGlI3Doy8DVh2yb0YM.png"],"rustic-brown":["Rustic Brown","ES-425980","Iliq va tabiiy yog‘och ohangi, klassik va zamonaviy muhitlar uchun mos universal panel.","Premium","1.22x2.90","KY4RuBJqslvXATzYOAmAJs6OcA.jpg"],"alpine-mist":["Alpine Mist","EM-69236","Premium klass uchun tabiiy, och rangli tosh marmar ko‘rinishi.","Premium +","1.22x2.90","rse51uyzvQdDPeC4EAYFfbTeY.png"],"crystal-white":["Crystal White","831630 - wpс","Mukammal yoritilgan, zamonaviy makonlar uchun ideal yechim","Plus","1.22x2.90","CWCG1tSnRbcs9rhQQm0KDGYjI0.jpg"],"crema-elegance":["Crema Elegance","EM-856932-1","Klassik va zamonaviy interyer uchun yengil, yumshoq krem mramor panelli dizayn.","Premium +","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"grey-line":["Grey Line","EM-190855-2","Zamonaviy, silliq va minimalistik, kulrang chiziqli panel (loft, ofislar uchun).","Premium +","1.22x2.90","6Njn6tRR8g8WrzKS1BSccU2X3E.jpg"],"silver-vein":["Silver Vein","EM-589094-2","Premium va klassik interyerlar uchun engil, toza va oqlangan kulrang mramor paneli.","Premium +","1.22x2.90","JIG6BkdTiFB0BVgszZVnU2zodk.jpg"],"travertino":["Travertino","EM-25701","Zamonaviy va klassik interyer uchun silliq tosh effekt.","Premium +","1.22x2.90","Iu9N85tVm87zvlw72wldqq26QKE.jpg"],"platinum-line":["Platinum Line","26268 - wpс","Ofis va tijorat interyerlari uchun zamonaviy va professional ko‘rinish","Plus","1.22x2.90","ZGCvD3BYiPwVCe5m2laykZ46Qs.jpg"],"golden-pearl":["Golden Pearl","141682 - wpс","Classic interyerlar va yotoq xonalariga nafislik baxsh etadi","Premium","1.22x2.90","2cT3dvRtVU4BE4WvY1ouX22KPeg.jpg"],"ebony-flow":["Ebony Flow","FS-962305-3","Diniy, premium interyer uchun qora va chuqur yog‘och naqshi.","Luxury+","1.22x2.90","MkDEFVqJqEZN030hJDIFxaDSro.jpg"],"champagne-silk":["Champagne Silk","795139 - wpс","Yorug‘likda parlaydigan ipak tuzilma — mehmonxona va ofislar uchun lux tanlov","Plus","1.22x2.90","yi6b1rcEmv0Jq1alxCZkEEtXj4Y.png"],"maple-flow":["Maple Flow","FS-862305-2","Ekologik, issiq va zamonaviy yog‘och fakturasi, tabiiy uyg‘unlik.","Luxury+","1.22x2.90","i1uitDn60zVWveZ0GFdm4IXaRk.jpg"],"graphite-shine":["Graphite Shine","980072 - wpс","Zamonaviy industrial dizaynlar uchun dramatik va jozibador yechim","Plus","1.22x2.90","aBmauz6cs8s7ZsSPrIbESTzXQ.jpg"],"pearl-shine":["Pearl Shine","LC-637125","Premium va yorqin, engil teksturali, yorug‘likni aks ettiruvchi zamonaviy panel.","Premium +","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"arctic-pearl":["Arctic Pearl","LC-932309-2","Minimalistik va premium interyer uchun yorqin oq, marjonli yengil mramor panel.","Premium +","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"silver-moonlight":["Silver Moonlight","LC-326956","Urban va zamonaviy dizayn uchun silliq, yorqin chiziqli panel, kenglik bag‘ishlaydi.","Premium +","1.22x2.90","NzggqWN1zUt61kJfaPVewQJ6pyo.jpg"],"bronze-wave":["Bronze Wave","156390 - wpс","Keng xonalar uchun chuqurlik va boylik illyuziyasini yaratadi","Plus","1.22x2.90","h82e03PsGAs2qbFoctX0zv7DM.png"],"platinum-grey":["Platinum Grey","LC-457381","Industrial va minimalistik interyerlar uchun silliq va zamonaviy kulrang panel.","Premium +","1.22x2.90","778wFtkpxpwhdsdtefK0jJN7c8.jpg"],"silver-dust":["Silver Dust","16490 - wpс","Minimalist dizayn uchun yorug‘likni o‘ynatuvchi tekstura","Premium","1.22x2.90","StmqnQKmAR2xgIVgxqpwRQ4kuk.jpg"],"gold-mirror":["Gold Mirror","SP-002-MG","Premium interyerlar uchun yorqin oltin oynali panel","Luxury","1.22x2.90","9Cy0a3fC8BnQflYNGLnhE4kExcs.jpg"],"white-mirror":["White Mirror","SP-003-MS","Industrial va zamonaviy interyerlar uchun kumush oynali panel","Luxury","1.22x2.90","7DeGVVS5JsGYXyZQY1LyqeaKmk.png"],"cloud-ash":["Cloud Ash","LC-623428","Zamonaviy va minimalistik interyerlar uchun matli, teksturali","Premium +","1.22x2.90","YVwZDgkR3x4o5vAObFrwS7CeGsw.png"],"silver-mist":["Silver Mist","VX-968003-2","High-tech va zamonaviy interyerlar uchun yorqin, industrial va silliq kumush panel.","Premium +","1.22x2.90","38DTVep0RO5OwqxhruHfd6bLyOM.jpg"],"bronze-liquid":["Bronze Liquid","VX-22009-bw","Premium zamonaviy interyerlar uchun suyuq bronza effektli panel","Premium +","1.22x2.90","a1s3jnD1FVrra8LW6z38Uy77Y.png"],"black-mirror":["Black Mirror","SP-001-MB","High-tech va luxury interyerlar uchun qora oynali effekt","Luxury","1.22x2.90","WWfKq0iQ5INPsVY1Fqo7kmsFjtM.jpg"],"forest-deep":["Forest Deep","917278 - wpс","Tabiatdan ilhomlangan muhitlar uchun ilhom baxsh etuvchi fon","Plus","1.22x2.90","s79reQEJW7LawKprfmQ4o98v40.jpg"],"polar-white":["Polar White","225257 - wpс","Toza, yorug‘ va vizual kenglikni oshiruvchi ohang","Plus","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"ivory-calm":["Ivory Calm","645673 - wpс","Minimalizmga mos yorug‘ va bejirim interyerlar uchun","Plus","1.22x2.90","lozKEg4qlobxZ40G6zZALWbrGU.jpg"],"silver-mirror":["Silver Mirror","0317-8471","Skandinaviya uslubidagi matoli faktura — yengillik va tabiiylik bilan uyg‘un","Plus","1.22x2.90","L3BiTbk167zH85D6ztRPx7wL5hg.jpg"],"solar-flame":["Solar Flame","994663 - wpс","Energiya va diqqatni tortuvchi dizaynlar uchun quvvat manbai","Plus","1.22x2.90","Wfwlu9D9v1aeAkd93BKC0lwIjwU.jpg"],"graphite-stone":["Graphite Stone","732224 - wpс","Chuqur zamonaviylik va kuch ifodasi — ofis va tijorat makonlari uchun","Plus","1.22x2.90","2JbdKm7SCjkqobyyUgDa0ON9L8.png"],"linen-grey":["Linen Grey","759033 - wpс","To‘qimachilik ilhomida yaratilgan minimalist fon — zamonaviy va issiq interyerlar uchun","Pro","1.22x2.90","vAYi3s9SSoqAreAfDt5NIUSClw.jpg"],"tea-yellow":["Tea Yellow","LN-101215","Iliq va yorqin ohang, zamonaviy interyer uchun ideal silliq panel.","Pro","1.22x2.90","l3TgI4btcXlvarsvyCEvhjY6cA.jpg"],"vanilla-white":["Vanilla White","LN-5011","Universal oq panel, kenglik va tozalik baxsh etadi.","Pro","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"meridional-grey":["Meridional Grey","LN-100856","Zamonaviy va universal interyerlar uchun yumshoq silliq panel.","Pro","1.22x2.90","y75CyRvRuDFZSFHjdA7YUHvsU.jpg"],"cream-beige":["Cream Beige","LN-5022","Yumshoq va och bej silliq panel, har qanday interyer uchun.","Pro","1.22x2.90","MfjgfvBWe3wp1NdpicjN4eMTGas.jpg"],"camel":["Camel","LN-101121","Minimalist va klassik dizayn uchun silliq va nafis bej panel.","Pro","1.22x2.90","ZwMytLsll95uhw2g7T96SMma4Xg.png"],"pure-snow":["Pure Snow","RF-5634","Minimalistik, yorqin va zamonaviy interyerlar uchun universal matoli panel.","Premium","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"nordic-thread":["Nordic Thread","343027 - wpс","Skandinaviya uslubidagi matoli faktura — yengillik va tabiiylik bilan uyg‘un","Pro","1.22x2.90","sXFjsMz4Eyq1MQy8ZkJD2v1EYk.jpg"],"urban-grey":["Urban Grey","RF-7143","Shahar uslubidagi eng universal va zamonaviy, mat tuzilmali panel.","Premium","1.22x2.90","g5j25ccZ0FKurID7q3ztEVxNlfs.jpg"],"silver-cloud":["Silver Cloud","RF-2643","Yorqin, och va mat effektli, zamonaviy ofis va uy uchun ideal panel.","Premium","1.22x2.90","CeZtyzennqS85vboVM4jltgsGA.jpg"],"golden-weave":["Golden Weave","256600 - wpс","Lux klassdagi interyerlar uchun boy va nafis vizual ta’sir","Pro","1.22x2.90","E0858SXARHZ4ZlrrfozIWs5D3vE.jpg"],"pearl-texture":["Pearl Texture","689191 - wpс","Chiroyli difuz yorug‘lik aks ettiruvchi, yorqin va sokin makonlar uchun","Pro","Podzakaz","caCMnQAnGiEETxxuuQGuW4kvo.jpg"],"soft-ivory":["Soft Ivory","160 - RF-8579","Iliq va yumshoq rang, klassik hamda minimalistik interyerlar uchun mos panel.","Premium","1.22x2.90","SOiyQ1QaON9mRWMl0jQpgyy7Y9Y.png"],"taupe-weave":["Taupe Weave","AR-301169-3","Industrial va universal interyer uchun yumshoq taupe tekstura","Premium +","1.22x2.90","Y2sH1nza4Qk3DBIWv1UNnv0nCyw.jpg"],"soft-weave":["Soft Weave","AR-986725","Klassik va universal interyerlar uchun bej-oq, toza va matli teksturali panel.","Premium +","1.22x2.90","OkiNrYiGDJcYmQu6cMkSDpZ2A.jpg"],"arctic-linen":["Arctic Linen","AR-896522","Minimalizm va skandinav interyerlar uchun sovuq-oq, yengil to‘qimalik panel.","Premium +","1.22x2.90","tWwD9mpLsYcI6PjA9eQEX7ItU.png"],"warm-taupe":["Warm Taupe","RF-6321","Iliq bej va mat tekstura uyg‘unligi, zamonaviy va universal interyer uchun mos.","Premium","1.22x2.90","c16QFpJa86HNSmxOy7vEDtTYkyw.jpg"],"arctic-grey":["Arctic Grey","AR-201165-2","Skandinav va zamonaviy interyer uchun sovuq, matli, teksturali","Premium +","1.22x2.90","PqUsamdUaOW7uvCtybvZVm8ZG6o.png"],"milky-satin":["Milky Satin","AR-765155","Minimalizm va zamonaviy interyer uchun oq, yaltiragan panel.","Premium +","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"snow-canvas":["Snow Canvas","AR-685932","Klassik va zamonaviy interyer uchun toza oq matli tekstura","Premium +","1.22x2.90","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"urban-fog":["Urban Fog","992930 - wpс","Zamonaviy interyerlar uchun balanslangan, tinchlikni ifodalovchi fon","Plus","1.22x2.90","NHRGTwMQe5l5EadqFPQzh5VvBME.png"],"150-es-178254":["Golden Walnut","150 - ES-178254","","Plus","150mm*3000mm","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"rustic-cocoa-150-es-598969":["Rustic Cocoa","150 - ES-598969","","Plus","150mm*3000mm","wBWwrNVbLq9JDEIZJ1PENO0nXA.jpg"],"150-es-598969":["Rustic Cocoa","150 - ES-598969","","Plus","150mm*3000mm","eQhu0rFvWWsgflIsvtA6iXb7kg.jpg"],"150-225257-wpc":["Polar White","150 - 225257 wpc","","Plus","150mm*3000mm","thG30ibeEwdrQAMMF9Fq6u9dc.jpg"],"120-992930-wpc":["Urban Fog","120 - 992930 wpc","","Plus","120mm*3000mm","4DUVn1s8hWoIL87QQ063GTrNeCw.jpg"],"120-ln-100856":["Meridional Grey","120 - LN-100856","","Plus","120mm*3000mm","94pJZ2VYZBNyJ1RX1uttYglFOnE.jpg"],"160-992930-wpc":["Urban Fog","160 - 992930 wpc","","Plus","160mm*3000mm","p7t0AYLeddYEVUfUBy71lyrJmU.png"],"rustic-brown-150-es-425980":["Rustic Brown","150 - ES-425980","","Plus","150mm*3000mm","MfNBjtaJiR6y5Nkp1NozaOJ7HYM.png"],"sand-oak-150-es-573621":["Sandy Oak","150 - ES-573621","","Plus","150mm*3000mm","tXKtfxwjjxChQ1DNzcStb6vQBwg.png"],"150-es-425980":["Rustic Brown","150 - ES-425980","","Plus","150mm*3000mm","zWhVJo0utr3ajI9GEUI73AjBt1I.png"],"150-ln-100856":["Meridional Grey","150 - LN-100856","","Plus","150mm*3000mm","lJLoVC0q875ISfXiWlMvx4CtE.png"],"150-645673-wpc":["Ivory Calm","150 - 645673 wpc","","Plus","150mm*3000mm","ytNdD5U8IHzj7YA8jSCKwkT1wkc.png"],"150-917833-wpc":["Walnut Silk","150 - 917833 wpc","","Plus","150mm*3000mm","OJFWS0jX4C9gtPvQnfLfGylwIM.png"],"150-rf-6321":["Warm Taupe","150 - RF-6321","","Plus","150mm*3000mm","wMnFbW2sqceJ2dMrXFC7U2Y7Ao.png"],"150-992930-wpc":["Urban Fog","150 - 992930 wpc","","Plus","150mm*3000mm","27tSbwp1NmG1tDOFNuWH3Mnn4s.png"],"150-es-624159":["Sunny Oak","150 - ES-624159","","Plus","150mm*3000mm","Grs49TmXvImLQy00f0N1f0Tsfg.png"],"150-rf-8579":["Soft Ivory","150 - RF-8579","","Plus","150mm*3000mm","2JggCfrBuZQol6TXGi5BSYMQooE.png"],"150-es-528964":["Nordic Oak","150 - ES-528964","","Plus","150mm*3000mm","pkNflVt1exWRphI3XesazkEkSDw.png"],"150-ln-101121":["Camel","150 - LN-101121","","Plus","150mm*3000mm","bHpOQedbpPFpUdaljJmPZ3peNg.png"],"120-rf-6321":["Warm Taupe","120 - RF-6321","","Plus","120mm*3000mm","AENQcsSHsa36YPEoHjIPFZQvDWY.png"],"120-917833-wpc":["Walnut Silk","120 - 917833 wpc","","Plus","120mm*3000mm","NsCSkPvo13IjAWogkcMhcdjaC3I.png"],"120-es-624159":["Sunny Oak","120 - ES-624159","","Plus","120mm*3000mm","zjT7vlD3Z1fWXIekRPTQdTlMsDQ.png"],"120-es-598969":["Rustic Cocoa","120 - ES-598969","","Plus","120mm*3000mm","ZYwcDlFcAONsDihEXL6hBdWnPYU.png"],"120-es-528964":["Nordic Oak","120 - ES-528964","","Plus","120mm*3000mm","kleLCDLC4kYe4iH7kW8TWeywWts.png"],"120-rf-8579":["Soft Ivory","120 - RF-8579","","Plus","120mm*3000mm","l5hqHY5AdK28IbqBItiqwu8PGg.png"],"sandy-oak-120-es-573621":["Sandy Oak","120 - ES-573621","","Plus","120mm*3000mm","INrOQyFie92eEYcNcGbMC0wg.png"],"120-225257-wpc":["Polar White","120 - 225257 wpc","","Plus","120mm*3000mm","vQQXAbxMDvVXBapzm4EnqHIVXs.png"],"120-es-425980":["Rustic Brown","120 - ES-425980","","Plus","120mm*3000mm","XdOpXMaKI5yp9sy0dSayVHS04.png"],"120-645673-wpc":["Ivory Calm","120 - 645673 wpc","","Plus","120mm*3000mm","RqTi0Jc7OPCgmTNquUqVzpFPk.png"],"120-es-178254":["Golden Walnut","120 - ES-178254","","Plus","120mm*3000mm","YgGrll9zSM7HmBehsmdblh9JJ7A.png"],"120-ln-101121":["Camel","120 - LN-101121","","Plus","120mm*3000mm","jWLJ2dbBOLr2UZjUVMayaiggE.png"],"160-es-425980":["Rustic Brown","160 - ES-425980","","Plus","160mm*3000mm","6jB7rHFF03J73IGEi0esPZT0Yg.png"],"150-es-573621":["Sandy Oak","150 - ES-573621","","Plus","150mm*3000mm","pTS7GbnBxvSsK5nKpndP5xicwE.png"],"160-917833-wpc":["Walnut Silk","160 - 917833 wpc","","Plus","160mm*3000mm","bQhKp0Eh0PeaJqH9PfB1gXlNNM.png"],"160-es-624159":["Sunny Oak","160 - ES-624159","","Plus","160mm*3000mm","lqQzpKhEas5oQnPOABmLI4ftg6I.png"],"160-es-598969":["Rustic Cocoa","160 - ES-598969","","Plus","160mm*3000mm","Gpxp3MvGOncvMN8s1b9B9jYNTBo.png"],"160-ln-100856":["Meridional Grey","160 - LN-100856","","Plus","160mm*3000mm","vQnuQv0n1PaJXKukqv73cUua5ZA.png"],"160-645673-wpc":["Ivory Calm","160 - 645673 wpc","","Plus","160mm*3000mm","KoUBHwEtNi6MwTya7v5OF7gP0.png"],"160-es-178254":["Golden Walnut","160 - ES-178254","","Plus","160mm*3000mm","0qH6mavFoaOU2YP14PNw3q8kv9w.png"],"160-ln-101121":["Camel","160 - LN-101121","","Plus","160mm*3000mm","E5ZrOXgWBiAE67g5042W1WuQEQ.png"],"160-es-528964":["Nordic Oak","160 - ES-528964","","Plus","160mm*3000mm","CWJq1valowZOGf85d8rWkqZqj2U.png"]};
var ZD={"salotto-tv":["GsFhOqW2c9PKyoaEPY5Zpy6DwQ.png",["p2P2rUNrGBDU1xgbTQ7THWgKXiw.jpg","9QOBe3YxHpnIxL3gWRNLf5GizaM.jpg","kcmUuD6uPqbPG78oLZG4Y2YamhM.jpg","T8eL1YcbDyFj4thJsO3AZH1U4co.jpg"],"kVOU3J2Jkso",["9","0","8"],["honey-oak","ebony-flow","black-mirror"]],"angolo-caffe":["SbnxXnm3bIcwpfSo6YB4nNMLYlQ.png",["UQ972S967niNZjHpg3yqdrvCGk.jpg","cg3iVmoAh6nJcLHaTgNVszmb4fI.jpg","nuwbt8bxxhtNT0yvg0CLFOIe6Q.jpg","MFq4hPIYJMlDVBapOUqangbdxk.jpg"],"0YDyLoUDS7w",["5","3","4"],["mocha-oak","nordic-oak"]],"ingresso":["5hubv4UFh4KDVqHtPOVvhv0wJIo.png",["ViUEpuedmpgpGLWAdwdikwrDQ.jpg","ZMAdYUhAsXKR27xk9KI1yMQIRU.jpg"],"X_hCDf9yP8E",["6","8","5"],["crimson-aura","grey-line","platinum-grey"]],"entrada":["0W6tLqVfABdRyyBmj72FouRyw.jpg",["v1e0kYc4hGCMjC3ELAnU4DYL7bw.jpg","ZSQNZo5K4l91BARDVHdrbEJYrso.jpg","Mp0XgsgFrmHe6CtO1M3PU3eQ4.jpg"],"",["6","15","6"],["azure-weave","gold-mirror","vanilla-white"]],"escalera":["A7E0FfPBtQ0ZsD66BSc7zSxNloU.png",["wBUAYl9f2oWcWrAaTgexiaq9iE.png","rVA8zxgSb70tSxvwjOH7rqmTO3Y.png"],"",["11","28","11"],["urban-grey","soft-ivory"]],"maestra":["2MgNMvrtGpkoOcx8mS76tZpEYo.png",["86ZnGG8DBIkgaT7tjj7EkLj9BA.jpeg","18slJfcANe1QoBLBJ9d52aTV7w.jpeg","yQmNb6jy3BCVnLodzQOlkZqe0I.jpeg","Im6BWTn7FQlnXb8SxX8l0t4nE.jpeg"],"BjW1NJpf_wA",["20","25","22"],["black-mirror"]],"lucevista":["CxUpLAACT8Iv15U2Teydb10LCLw.png",["1mqRTcpyfhtrLwcIa3w758p4KI.jpg","H5Hmsv1mp50sgVQopdehh4vZ0vQ.jpg","k8mcqFQA2xGJUM1ftaoLYyitM.jpg","AebTrQehK8sPUVCcGstmBMX2nE.jpg"],"RIRyLwTBoIA",["13","4 ta led","14"],["gold-mirror"]],"zonaviva":["saGjO6OrLoWg3wGE67ul52xJ4uI.png",["sc1ztwWpKSDLaZfNaZGOqcDduoI.jpeg","JNjBzDrsKsl0IDOgkTMEZzjdAc.jpeg","ULdK4vvwqOmqbZzsiVM5v6d5Ms.jpg","kcrIBgFoPHzDKSNUbF2TSylSeB8.jpg"],"TSvXBe5t-Ng",["6","4","8"],[]],"clinica":["d79CWBclMHreLSdz0VjKa0ZH8aw.png",["1LVWLBYpClxihQ0YqyAwKIn58c.jpg","H0fpX2PrE9PKZaxR2WaMMVCKJ8.jpg","NzC8afvF9s9BKIcvFqjcGudbgEY.jpg","PqGONGh1rC9TRCNOWCnXQc5OE.jpg"],"sTywVTXdDW4",["8","17","18"],[]],"sapore":["maQbjIM0wkOYEHda18Y8qZpYiGY.png",["4E86JwAJM9Z6Vl6VGfMnSJTwQo.jpg","Jk1bB659Tgg5Ts4QpG5hBC8vQZY.jpg","uHDX5Jx16cAxIcWrdJf0ua4OxrU.jpg","fPsvznAWNao3GmjwqHnRs58pc.jpg"],"edF_5_Oj2Vs",["9","9","10"],[]],"la-tavola":["E8mZ3pxMeCA1qcrRXvYrwTJ6Og.png",["XALiIJ1jtUDfT63rk7OI0hEoMBA.jpg","KnRA1oN2JquqvPjScHtzPbwLcvI.jpeg","T92mce7QA1nFtnKgagLVVTv7k0I.jpeg","Ch1hBSTrflYWJLwkWlZLx0pms.jpg"],"",["7","10","6"],[]],"futuro-scuola":["zdySFU8r0KsoeMjcB8nPhnf0f0.png",["0DOvCBPESZqskeMJw9SPg0CKjMk.jpg","MSoTRJEAJUPl3MsydHt4jv1d2u0.jpg","PVd8lV5XdmhXGP7LpBbljnSEx0.jpg","WSeWSxGGzMsg8ET3wVmlSMDKUw.jpg"],"_0PjQiZERrY",["8","10","16"],[]],"royale":["1JQEU25wao7KG7Hc4EGkdfgfDQ.png",["kR4vCYbwnRb5Ub6PZXdK8z8NfM.png","R4ibvwzs6wha88qrEwUzCJ4w.png","veIvIg2dFjdWdNMtn2XNythb5LY.png"],"7kfxg1fNmW4",["15","15","17"],[]],"elevare":["omW7rWEgBBlj0tOO0uh8oStNl0.png",["Hx8UncMdlvlnbpLmitJ568TaQSo.jpg","BWfqXCdGJ5rVDlARoTvLWiMmUA.jpg","rhZv7Jxylx53GgPXMVtSgA3OMw.jpg","Rg7dB3lN8ySw6DGm4EvbzfRFuiQ.jpg"],"xdIqtCVQqYk",["7","6","9"],[]],"celeste":["4CocHvmuoY3FL9qsQ6FJX2II9UE.png",["EkzMC67SUEkZE6QcQ16ep0Lbqpc.jpg","AaXROXxytEUGCoIn4YjQp9IufI.jpg","bl6aFxWwrD8De4muiA8IyzucM.jpg","ccp9uktMga6irY7txcA57NHFjU.jpg"],"5QIX-PDUtGw",["8","5","9"],[]],"ritorante":["QAHjAB2K7lLZjMgr54NCxhU25YI.png",["QKTg89nNifCNQMNxKVkx5LnaY4.jpg","lHAGf6zaMAzvMYHgUzyBYNwL4Ds.jpg","RqTXlN2b2zZvlS7VVA9hUaOWk.jpg","FAEAy2CCseWjVpYmzFB9JZZZrII.jpg"],"aoIW7qi5qrk",["4","5","5"],[]],"la-reception":["2hoyLEiYu8UGEfLVoM1enHAwU.png",["jL77ItgDHasUFAETWbcITw8sw8.jpg","l6eCDAbFROdu8f5R50b5u29hdZY.jpg","AwGOpg03hD0bY74EiZ62yUsgskk.jpg","qF1N9hyNezz2WDX9MOEJvd7CSCc.jpg"],"FB4cwyZEZW8",["4","0","5"],[]],"rialzo":["U76zGlG8bIRm1JGRUyg7zhjFJSo.png",["DBANVgRpYI1Jr285vh2nkNdRI7E.jpg","vtTgMvAEM5BV3SCAa6IfIpwzE.jpg"],"",["7","13","8"],[]],"panorama":["WWUZBhmOW56DNWWl2V4UHtY7v8.png",["NrqpJtfK87P0W7iqXIgFjpEA0.jpg","ack3VaPPIb0i6yCGC1PV0vQbzRY.jpg"],"7NyoyEPlIiI",["4 ta","0","5"],[]]};
/* ---------------------------------------------------------------
   Kolleksiyalar / Dizaynerlarga / Kolleksiya / Mahsulot / Zona (v6)
--------------------------------------------------------------- */
var X = {
  uz: {
    collH: 'Kolleksiyalar', fAll: 'Barchasi', fT: 'Taroq', fP: 'Panel', fS: 'Stick',
    cat: "Katalogni ko'rish", view: "Ko'rish", dzH: 'Dizaynerlar uchun',
    dzT: 'Ish quroling soz bo‘lsa, mashaqqating oz bo‘lur!',
    dzP: ['O‘z loyihalarida noyoblikni qadrlovchi dizaynerlar uchun Decopol ajoyib tanlov. Endilikda biz mahsulotlarimizni 3D va CAD formatida ham tayyorladik. Birgina yuklab olish tugmasini bosish orqali siz loyihangiz uchun hayotda 1:1 prototipi mavjud bo‘lgan sifatli panellarni ishlatishingiz mumkin.',
          'Siz yaratmoqchi bo‘lgan betakror loyihalaringiz Decopol bilan yanada unutilmas ko‘rinishga ega bo‘ladi.'],
    stats: [['10K+', 'Mijozlar', 'Xalqaro va mahalliy mijozlarimiz soni'], ['8+', 'Yil tajriba', 'Qurilish mollari bozoridamiz'], ['4+', 'Xalqaro brendlar', 'Xalqaro brendlar rasmiy dilleri'], ['100+', 'Muvaffaqiyatli loyiha', 'Qozonilgan ishonch']],
    used: 'Ishlatilgan mahsulotlar', nPanel: 'Panellar soni', nStick: 'Stick soni', nKley: 'Kley soni',
    otherZ: 'Boshqa zonalarimiz', moreZ: "Ko'proq ko'rish", zVideo: 'Video', zGallery: 'Rasmlar',
    pCat: 'Kategoriya', pSize: "O'chamlar", pFeat: 'Harakteristika', pPre: 'Podzakaz',
    pFeatV: "Suvga chidamli, Yong'inga chidamli, O'rnatish oson, Termitlarga qarshi, Ekologik toza",
    pFile: 'Faylni yuklash', pBuy: 'Mahsulotni sotib olish', prods: 'Mahsulotlar', toColl: 'Kolleksiyaga qaytish', otherP: 'Boshqa mahsulotlar',
    artH: 'Maqolalar', artSub: 'Panellar, dizayn va ta’mirlash haqida foydali maqolalar', artNone: "Hozircha maqolalar yo'q", artLoad: 'Yuklanmoqda…',
    artErr: "Maqolalarni yuklab bo'lmadi. Sahifani yangilab ko'ring.", artRead: "O'qish", artOther: 'Boshqa maqolalar', artAll: 'Barcha maqolalar', artNF: 'Maqola topilmadi',
    months: ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr']
  },
  ru: {
    collH: 'Коллекции', fAll: 'Все', fT: 'Гребёнка', fP: 'Панель', fS: 'Стик',
    cat: 'Смотреть каталог', view: 'Смотреть', dzH: 'Для дизайнеров',
    dzT: 'Если инструмент хорош, то и труд будет в радость!',
    dzP: ['Decopol — отличный выбор для дизайнеров, ценящих уникальность в своих проектах. Теперь мы подготовили нашу продукцию и в форматах 3D и CAD. Нажав всего одну кнопку загрузки, вы можете использовать в проекте качественные панели, у которых есть реальный прототип 1:1.',
          'Ваши неповторимые проекты с Decopol станут ещё более запоминающимися.'],
    stats: [['10K+', 'Клиентов', 'Количество международных и местных клиентов'], ['8+', 'Лет опыта', 'Мы на рынке строительных материалов'], ['4+', 'Международных бренда', 'Официальный дилер международных брендов'], ['100+', 'Успешных проектов', 'Завоёванное доверие']],
    used: 'Использованные продукты', nPanel: 'Количество панелей', nStick: 'Количество стиков', nKley: 'Количество клея',
    otherZ: 'Другие наши зоны', moreZ: 'Смотреть больше', zVideo: 'Видео', zGallery: 'Фото',
    pCat: 'Категория', pSize: 'Размеры', pFeat: 'Характеристика', pPre: 'Под заказ',
    pFeatV: 'Водостойкий, Огнестойкий, Простой монтаж, Защита от термитов, Экологичный',
    pFile: 'Скачать файл', pBuy: 'Купить продукцию', prods: 'Продукция', toColl: 'Назад к коллекции', otherP: 'Другая продукция',
    artH: 'Статьи', artSub: 'Полезные статьи о панелях, дизайне и ремонте', artNone: 'Статей пока нет', artLoad: 'Загрузка…',
    artErr: 'Не удалось загрузить статьи. Обновите страницу.', artRead: 'Читать', artOther: 'Другие статьи', artAll: 'Все статьи', artNF: 'Статья не найдена',
    months: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
  }
};
var PDFB = 'https://framerusercontent.com/assets/';
function fr(id, w) { return FR + id + '?width=' + (w || 1200); }
function frbg(id, w, local) { return bg(fr(id, w), local); }
function ytEmbed(id, label) {
  if (!id) return '';
  return '<section class="dvid"><div class="dwrap"><h2>' + esc(label) + '</h2><div class="vbox"><iframe src="https://www.youtube.com/embed/' + id + '?rel=0&modestbranding=1" title="' + esc(label) + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div></section>';
}
function prodName(s) { return PROD[s] ? PROD[s][0] : s; }
function prodMini(s, q) {
  var p = PROD[s]; if (!p) return '';
  return '<a class="pm" href="product.html?id=' + s + (q || '') + '"><div class="im" style="background-image:' + frbg(p[5], 600) + '"></div><b>' + esc(p[0]) + '</b></a>';
}

function collChips(d) {
  var x = X[lang];
  var f = [['all', x.fAll], ['t', x.fT], ['p', x.fP], ['s', x.fS]];
  return '<div class="zchips" id="chips">' + f.map(function (a) {
    return '<button type="button" class="chip' + (state.coll === a[0] ? ' on' : '') + '" data-f="' + a[0] + '">' + esc(a[1]) + '</button>';
  }).join('') + '</div>';
}
function collCards(designers) {
  var x = X[lang];
  var list = COLL.filter(function (c) { return state.coll === 'all' || c[4] === state.coll; });
  return '<div class="kgrid">' + list.map(function (c) {
    var href = 'collection.html?id=' + c[0] + (designers ? '&d=1' : '');
    var pdf = c[3] ? PDFB + c[3] + '.pdf' : 'contact.html';
    var ext = c[3] ? ' target="_blank" rel="noopener"' : '';
    return '<article class="kc"><a class="im" href="' + href + '" style="background-image:' + frbg(c[2], 900) + '"></a>' +
      '<h3>' + esc(c[1]) + '</h3><div class="kb"><a class="b1" href="' + pdf + '"' + ext + '>' + x.cat + '</a><a class="b2" href="' + href + '">' + x.view + '</a></div></article>';
  }).join('') + '</div>';
}
function pagePanel() {
  var x = X[lang];
  return detailHero('', x.collH, '#6B5A45').replace('background-image:' + bg('') + ';', 'background-image:' + frbg('aubSuqaqA7E0GamHaieuRn4qE.png', 2000) + ';') +
    '<section class="kl"><div class="dwrap kwide">' + collChips() + collCards(false) + '</div></section>';
}
function pageDesigners() {
  var x = X[lang];
  return detailHero('', x.dzH, '#5B4B3E').replace('background-image:' + bg('') + ';', 'background-image:' + frbg('ORb5uVNogePRo8eso6RRslzm0.png', 2000) + ';') +
    '<section class="dzi"><div class="dwrap"><h2>' + esc(x.dzT) + '</h2>' + x.dzP.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
    '<div class="dzs">' + x.stats.map(function (s) { return '<div class="st"><b>' + esc(s[0]) + '</b><strong>' + esc(s[1]) + '</strong><span>' + esc(s[2]) + '</span></div>'; }).join('') + '</div></div></section>' +
    '<section class="kl"><div class="dwrap kwide">' + collChips() + collCards(true) + '</div></section>';
}
function pageCollection() {
  var x = X[lang], d = T[lang], c = pick(COLL, 0, getId());
  if (!c) return notFoundPage();
  var des = new URLSearchParams(location.search).get('d') === '1';
  var q = '&c=' + c[0] + (des ? '&d=1' : '');
  var hero = detailHero('', c[1], '#6B5A45').replace('background-image:' + bg('') + ';', 'background-image:' + frbg(c[2], 2000) + ';');
  var body = c[5].length ? '<div class="pgrid2">' + c[5].map(function (p) { return prodMini(p[0], q); }).join('') + '</div>' : '';
  var pdf = c[3] ? '<div class="dwrap dcta2">' + cta('tan', x.cat, PDFB + c[3] + '.pdf').replace('<a ', '<a target="_blank" rel="noopener" ') + '</div>' : '';
  return hero + '<section class="dabout"><div class="dwrap">' + backLink(des ? 'designers.html' : 'panel.html', des ? d.nav[5] : d.nav[4]) + '<h2>' + x.prods + '</h2>' + body + '</div></section>' + pdf;
}
function pageProduct() {
  var x = X[lang], d = T[lang], s = getId(), p = PROD[s];
  if (!p) return notFoundPage();
  var sp = new URLSearchParams(location.search), cs = sp.get('c'), des = sp.get('d') === '1';
  var c = cs ? pick(COLL, 0, cs) : null;
  if (!c) COLL.forEach(function (cc) { if (!c && cc[5].some(function (a) { return a[0] === s; })) c = cc; });
  var q = c ? '&c=' + c[0] + (des ? '&d=1' : '') : '';
  var back = c ? backLink('collection.html?id=' + c[0] + (des ? '&d=1' : ''), c[1]) : backLink('panel.html', d.nav[4]);
  var rows = '<div class="pr"><small>' + x.pCat + '</small><b>' + esc(p[3]) + '</b></div>' +
    '<div class="pr"><small>' + x.pSize + '</small><b>' + esc(p[4]) + '</b></div>' +
    '<div class="pr"><small>' + x.pFeat + '</small><b>' + esc(x.pFeatV) + '</b></div>';
  var others = c ? c[5].filter(function (a) { return a[0] !== s; }).slice(0, 4) : [];
  return '<div class="dp dh pdet">' + back + '<div class="pcols"><div class="pimg" style="background-image:' + frbg(p[5], 1400) + '"></div>' +
    '<div class="pinfo"><h1>' + esc(p[0]) + '</h1><p class="pcode"># ' + esc(p[1]) + '</p>' + (p[2] ? '<p class="pdesc">' + esc(p[2]) + '</p>' : '') + rows +
    '<div class="pbtn">' + cta('tan sm', x.pFile, 'contact.html') + cta('white sm', x.pBuy, 'contact.html') + '</div></div></div></div>' +
    (others.length ? '<section class="more"><h2 class="sec">' + x.otherP + '</h2><div class="dwrap"><div class="pgrid2">' + others.map(function (a) { return prodMini(a[0], q); }).join('') + '</div></div></section>' : '');
}
function pageZone() {
  var d = T[lang], x = X[lang], z = pick(ZONES, 0, getId());
  if (!z) return notFoundPage();
  var zd = ZD[z[0]] || [], i = ZONES.indexOf(z);
  var L = d.zLabels;
  var info = [['i-book', L[0], z[1]], ['i-cal', L[1], d.zDays(z[2])], ['i-user', L[2], d.zN(z[3])]];
  var hero = detailHero('img/showroom/' + z[0] + '.jpg', z[1], TONES[(i * 2) % TONES.length]);
  if (zd[0]) hero = hero.replace("background-image:" + bg('img/showroom/' + z[0] + '.jpg'), 'background-image:' + frbg(zd[0], 2000, 'img/showroom/' + z[0] + '.jpg'));
  var gal = (zd[1] || []).length ? '<section class="dgal"><div class="dwrap"><div class="gg g' + zd[1].length + '">' + zd[1].map(function (g) { return '<div style="background-image:' + frbg(g, 1100) + '"></div>'; }).join('') + '</div></div></section>' : '';
  var st = zd[3] || [];
  var prods = (zd[4] || []).length ? '<div class="pgrid2 zp">' + zd[4].map(function (p) { return prodMini(p, ''); }).join('') + '</div>' : '';
  var used = st.length ? '<section class="dused"><div class="dwrap"><h2>' + x.used + '</h2><div class="dinfo3"><div class="di3"><b>' + esc(st[0]) + '</b><span>' + x.nPanel + '</span></div><div class="di3"><b>' + esc(st[1]) + '</b><span>' + x.nStick + '</span></div><div class="di3"><b>' + esc(st[2]) + '</b><span>' + x.nKley + '</span></div></div>' + prods + '</div></section>' : '';
  var others = ZONES.filter(function (q) { return q !== z; }).slice(0, 4);
  return hero +
    '<section class="dabout"><div class="dwrap">' + backLink('showroom.html', d.nav[7]) + '<h2>' + d.zAbout + '</h2>' + infoCols(info) + '</div></section>' +
    ytEmbed(zd[2], x.zVideo) + gal + used +
    '<section class="more"><h2 class="sec">' + x.otherZ + '</h2><div class="cgrid">' + others.map(zoneCard).join('') + '</div><div class="dwrap dcta2" style="padding-top:0;padding-bottom:20px">' + cta('tan', x.moreZ, 'showroom.html') + '</div></section>';
}

/* ---------------------------------------------------------------
   Qidiruv
--------------------------------------------------------------- */
/* ---------------------------------------------------------------
   MAQOLALAR: repo'dagi maqolalar/ papkasidan o'qiladi.
   Fayl qo'shish = maqola qo'shish. Format: maqolalar/_QOLLANMA.txt
--------------------------------------------------------------- */
var ART_REPOS = ['decopoluz/my-website', 'abdurakhimovfozilbek6-bit/my-website'], ART_DIR = 'maqolalar';
function artApi(i) { return 'https://api.github.com/repos/' + ART_REPOS[i] + '/contents/' + ART_DIR + '?ref=main'; }
var ART_TTL = 5 * 60 * 1000, artMem = null;
function artCache(val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem('dp_art') || 'null');
    localStorage.setItem('dp_art', JSON.stringify(val));
  } catch (e) {}
  return null;
}
function artFileOk(n) { return /\.(md|txt)$/i.test(n) && n.charAt(0) !== '_' && !/^readme/i.test(n); }
function artFiles() {
  var c = artCache();
  if (c && c.t && Date.now() - c.t < ART_TTL && c.files) return Promise.resolve(c.files);
  function tryRepo(i) {
    return fetch(artApi(i), { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) { if (r.status === 404) return i + 1 < ART_REPOS.length ? tryRepo(i + 1) : []; if (!r.ok) throw new Error('api ' + r.status); return r.json(); });
  }
  return tryRepo(0)
    .then(function (arr) {
      var files = (arr || []).filter(function (f) { return f.type === 'file' && artFileOk(f.name); })
        .map(function (f) { return { name: f.name, raw: f.download_url || '' }; });
      artCache({ t: Date.now(), files: files });
      return files;
    })
    .catch(function () {
      if (c && c.files) return c.files;
      return fetch(BASE + ART_DIR + '/index.json', { cache: 'no-cache' })
        .then(function (r) { return r.ok ? r.json() : []; })
        .then(function (list) { return (list || []).filter(function (n) { return artFileOk(typeof n === 'string' ? n : n.name); })
          .map(function (n) { return typeof n === 'string' ? { name: n, raw: '' } : n; }); })
        .catch(function () { return []; });
    });
}
function artText(f) {
  var local = BASE + ART_DIR + '/' + encodeURIComponent(f.name);
  return fetch(local, { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw 0; return r.text(); })
    .catch(function () { return f.raw ? fetch(f.raw).then(function (r) { return r.ok ? r.text() : ''; }).catch(function () { return ''; }) : ''; });
}
function artAll() {
  if (artMem) return Promise.resolve(artMem);
  return artFiles().then(function (files) {
    return Promise.all(files.map(function (f) { return artText(f).then(function (t) { return t ? parseArticle(f.name, t) : null; }); }));
  }).then(function (list) {
    list = list.filter(function (a) { return a && a.uz.title; });
    list.sort(function (a, b) { return (b.uz.date || '') < (a.uz.date || '') ? -1 : (b.uz.date || '') > (a.uz.date || '') ? 1 : (b.id < a.id ? -1 : 1); });
    artMem = list; return list;
  });
}
var ART_KEYS = { sarlavha: 'title', nomi: 'title', title: 'title', 'заголовок': 'title', 'название': 'title',
  sana: 'date', date: 'date', 'дата': 'date', rasm: 'image', foto: 'image', image: 'image', img: 'image', cover: 'image', 'картинка': 'image', 'фото': 'image', 'изображение': 'image',
  qisqacha: 'excerpt', tavsif: 'excerpt', excerpt: 'excerpt', description: 'excerpt', 'кратко': 'excerpt', 'описание': 'excerpt',
  muallif: 'author', author: 'author', 'автор': 'author' };
function parseBlock(txt) {
  var lines = txt.replace(/\r/g, '').split('\n'), meta = {}, i = 0, body;
  for (; i < lines.length; i++) {
    var ln = lines[i];
    if (/^\s*-{3,}\s*$/.test(ln)) { i++; break; }
    var m = /^\s*([A-Za-zА-Яа-яЁёʼ'’]+)\s*:\s*(.*)$/.exec(ln);
    if (m && ART_KEYS[m[1].toLowerCase()]) { meta[ART_KEYS[m[1].toLowerCase()]] = m[2].trim(); continue; }
    if (!ln.trim()) { if (Object.keys(meta).length) { i++; break; } continue; }
    break;
  }
  body = lines.slice(i).join('\n').trim();
  meta.html = mdLite(body);
  meta.plain = body.replace(/\S+\.(?:jpe?g|png|webp|gif)\S*/gi, '').replace(/https?:\S+/g, '').replace(/[#*>\-\[\]()!]/g, ' ').replace(/\s+/g, ' ').trim();
  return meta;
}
function parseArticle(name, txt) {
  var parts = txt.replace(/\r/g, '').split(/^\s*={3,}\s*(RU|UZ|РУ|УЗ)\s*={3,}\s*$/mi);
  var uz = null, ru = null, label = 'UZ';
  for (var i = 0; i < parts.length; i++) {
    if (i % 2 === 1) { label = parts[i].toUpperCase(); continue; }
    if (!parts[i].trim()) continue;
    var b = parseBlock(parts[i]);
    if (label === 'RU' || label === 'РУ') ru = b; else uz = b;
  }
  if (!uz) uz = ru;
  if (!uz) return null;
  ru = ru || {};
  ['title', 'date', 'image', 'excerpt', 'author', 'html', 'plain'].forEach(function (k) { if (!ru[k]) ru[k] = uz[k]; });
  uz.date = isoDate(uz.date); ru.date = isoDate(ru.date) || uz.date;
  var id = name.replace(/\.(md|txt)$/i, '');
  if (!uz.title) { uz.title = id.replace(/^\d{4}-\d{2}-\d{2}[-_]?/, '').replace(/[-_]+/g, ' ').trim() || id; if (!ru.title) ru.title = uz.title; }
  return { id: id, uz: uz, ru: ru };
}
function isoDate(s) {
  if (!s) return '';
  var m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s); if (m) return m[1] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[3]).slice(-2);
  m = /^(\d{1,2})[.\/](\d{1,2})[.\/](\d{4})/.exec(s); if (m) return m[3] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2);
  return s;
}
function fmtDate(iso) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) return iso || '';
  var mo = X[lang].months[+m[2] - 1] || m[2];
  return (+m[3]) + ' ' + mo + ' ' + m[1];
}
function inline(t) {
  t = esc(t);
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (a, txt, url) { return '<a href="' + url + '"' + (/^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : '') + '>' + txt + '</a>'; });
  t = t.replace(/(^|[^"'>=])(https?:\/\/[^\s<]+)/g, function (a, pre, url) { return pre + '<a href="' + url + '" target="_blank" rel="noopener">' + url + '</a>'; });
  return t;
}
function ytId(s) { var m = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/.exec(s); return m ? m[1] : ''; }
function mdLite(src) {
  var out = '', para = [], list = null;
  function flushP() { if (para.length) { out += '<p>' + para.map(inline).join('<br>') + '</p>'; para = []; } }
  function flushL() { if (list) { out += '<' + list.t + '>' + list.items.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join('') + '</' + list.t + '>'; list = null; } }
  src.split('\n').forEach(function (ln) {
    var t = ln.trim(), m;
    if (!t) { flushP(); flushL(); return; }
    if ((m = /^#{1,3}\s+(.*)$/.exec(t))) { flushP(); flushL(); out += '<h2>' + inline(m[1]) + '</h2>'; return; }
    m = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(t);
    if (!m && /^\S+\.(?:jpe?g|png|webp|gif)(\?\S*)?$/i.test(t)) m = [t, '', t];
    if (m) { flushP(); flushL(); out += '<figure><img src="' + esc(asset(m[2])) + '" alt="' + esc(m[1] || '') + '" loading="lazy"></figure>'; return; }
    var y = ytId(t); if (y && /^\S+$/.test(t)) { flushP(); flushL(); out += '<div class="vbox"><iframe src="https://www.youtube.com/embed/' + y + '?rel=0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'; return; }
    if ((m = /^(?:[-*•]\s+)(.*)$/.exec(t))) { flushP(); if (!list || list.t !== 'ul') { flushL(); list = { t: 'ul', items: [] }; } list.items.push(m[1]); return; }
    if ((m = /^\d+[.)]\s+(.*)$/.exec(t))) { flushP(); if (!list || list.t !== 'ol') { flushL(); list = { t: 'ol', items: [] }; } list.items.push(m[1]); return; }
    if ((m = /^>\s?(.*)$/.exec(t))) { flushP(); flushL(); out += '<blockquote>' + inline(m[1]) + '</blockquote>'; return; }
    flushL(); para.push(t);
  });
  flushP(); flushL();
  return out;
}
function artCard(a) {
  var x = X[lang], v = a[lang], ex = v.excerpt || (v.plain ? v.plain.slice(0, 150) + (v.plain.length > 150 ? '…' : '') : '');
  var im = v.image ? ' style="background-image:url(\'' + esc(asset(v.image)) + '\')"' : '';
  return '<article class="akc"><a class="im" href="maqola.html?id=' + encodeURIComponent(a.id) + '"' + im + '></a>' +
    '<div class="ab">' + (v.date ? '<time>' + esc(fmtDate(v.date)) + '</time>' : '') + '<h3><a href="maqola.html?id=' + encodeURIComponent(a.id) + '">' + esc(v.title) + '</a></h3>' +
    (ex ? '<p>' + esc(ex) + '</p>' : '') + '<a class="more" href="maqola.html?id=' + encodeURIComponent(a.id) + '">' + x.artRead + ' ' + ic('i-arrow') + '</a></div></article>';
}
function pageArticles() {
  var x = X[lang];
  return detailHero('', x.artH, '#4B4F58').replace('background-image:' + bg('') + ';', 'background-image:' + frbg('w6twKPWqx4AaX0BXj57yUfDsk.png', 2000) + ';') +
    '<section class="kl"><div class="dwrap kwide"><p class="asub">' + esc(x.artSub) + '</p><div class="agrid" id="artlist"><div class="empty">' + x.artLoad + '</div></div></div></section>';
}
function pageArticle() {
  var x = X[lang];
  return '<div id="artroot"><div class="dp dh">' + backLink('maqolalar.html', x.artAll) + '<p class="empty" style="padding-left:0">' + x.artLoad + '</p></div></div>';
}
function loadArticlesPage() {
  var x = X[lang];
  if (PAGE === 'articles') {
    artAll().then(function (list) {
      var el = $('#artlist'); if (!el) return;
      el.innerHTML = list.length ? list.map(artCard).join('') : '<div class="empty">' + x.artNone + '</div>';
    }).catch(function () { var el = $('#artlist'); if (el) el.innerHTML = '<div class="empty">' + x.artErr + '</div>'; });
  }
  if (PAGE === 'article') {
    var id = getId();
    artAll().then(function (list) {
      var root = $('#artroot'); if (!root) return;
      var a = list.filter(function (q) { return q.id === id; })[0];
      if (!a) { root.innerHTML = '<div class="dp dh">' + backLink('maqolalar.html', x.artAll) + '<h1>' + x.artNF + '</h1></div>'; return; }
      var v = a[lang], others = list.filter(function (q) { return q !== a; }).slice(0, 3);
      var hero = v.image ? detailHero(v.image, v.title, '#4B4F58') : '<div class="dp dh"><h1>' + esc(v.title) + '</h1></div>';
      root.innerHTML = hero +
        '<section class="dabout art"><div class="dwrap"><div class="ahead">' + backLink('maqolalar.html', x.artAll) +
        '<div class="meta"><span class="tag">' + esc(fmtDate(v.date)) + '</span>' + (v.author ? '<span class="tag">' + esc(v.author) + '</span>' : '') + '</div></div>' +
        '<div class="prose">' + v.html + '</div></div></section>' +
        '<div class="dwrap dcta2">' + cta('tan', T[lang].cta) + '</div>' +
        (others.length ? '<section class="kl"><div class="dwrap kwide"><h2 class="sec" style="padding:0">' + x.artOther + '</h2><div class="agrid">' + others.map(artCard).join('') + '</div></div></section>' : '');
      document.title = v.title + ' | Decopol';
    }).catch(function () { var root = $('#artroot'); if (root) root.innerHTML = '<div class="dp dh">' + backLink('maqolalar.html', x.artAll) + '<p class="empty" style="padding-left:0">' + x.artErr + '</p></div>'; });
  }
}

function searchItems() {
  var d = T[lang], out = [];
  NAV.forEach(function (n, i) { out.push([d.nav[i], n[1], '']); });
  CASES.forEach(function (c) { out.push([c[1], 'case.html?id=' + c[0], d.nav[3]]); });
  ZONES.forEach(function (z) { out.push([z[1], 'zone.html?id=' + z[0], 'Showroom']); });
  COLL.forEach(function (c) { out.push([c[1], 'collection.html?id=' + c[0], d.nav[4]]); });
  return out;
}
function buildSearch() {
  var d = T[lang], so = $('#so');
  if (!so) { so = document.createElement('div'); so.id = 'so'; so.className = 'so'; document.body.appendChild(so); }
  so.innerHTML = '<div class="box"><input id="sq" type="search" placeholder="' + d.search + '" autocomplete="off"><ul id="sl"></ul></div>';
  var sq = $('#sq'), sl = $('#sl');
  function fill() {
    var v = sq.value.trim().toLowerCase();
    var items = searchItems().filter(function (it) { return !v || it[0].toLowerCase().indexOf(v) > -1; }).slice(0, 12);
    sl.innerHTML = items.length ? items.map(function (it) { return '<li><a href="' + it[1] + '">' + esc(it[0]) + (it[2] ? '<small>' + esc(it[2]) + '</small>' : '') + '</a></li>'; }).join('') : '<li class="none">' + d.searchNone + '</li>';
  }
  sq.addEventListener('input', fill); fill();
  so.addEventListener('click', function (e) { if (e.target === so) so.classList.remove('open'); });
}

/* ---------------------------------------------------------------
   Chizish va hodisalar
--------------------------------------------------------------- */
function bind() {
  var nav = $('#nav'), burger = $('#burger');
  if (burger) {
    burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });
  }
  var sb = $('#srchBtn');
  if (sb) sb.addEventListener('click', function () { buildSearch(); $('#so').classList.add('open'); $('#sq').focus(); });

  $$('.case').forEach(function (c) {
    var look = $('.look', c);
    if (!look) return;
    c.addEventListener('mousemove', function (e) { var r = c.getBoundingClientRect(); look.style.left = (e.clientX - r.left) + 'px'; look.style.top = (e.clientY - r.top) + 'px'; });
  });
  if (PAGE === 'home') bindHome();
  if (PAGE === 'cases') {
    $$('#chips .chip').forEach(function (c) { c.addEventListener('click', function () { state.cases = c.getAttribute('data-f'); render(true); }); });
    $$('.case').forEach(function (c) {
      var look = $('.look', c);
      c.addEventListener('mousemove', function (e) { var r = c.getBoundingClientRect(); look.style.left = (e.clientX - r.left) + 'px'; look.style.top = (e.clientY - r.top) + 'px'; });
    });
  }
  if (PAGE === 'panel' || PAGE === 'designers') {
    $$('#chips .chip').forEach(function (c) { c.addEventListener('click', function () { state.coll = c.getAttribute('data-f'); render(true); }); });
  }
  if (PAGE === 'showroom') {
    $$('#chips .chip').forEach(function (c) { c.addEventListener('click', function () { state.zone = c.getAttribute('data-f'); render(true); }); });
  }
}

function bindHome() {
  var d = T[lang], track = $('#track'), dots = $('#dots');
  track.innerHTML = d.reviews.map(function (r) {
    return '<article class="card"><q>' + d.q[0] + esc(r[0]) + d.q[1] + '</q><div class="who"><img class="av" src="' + FR + r[3] + '?width=320&height=320" alt="' + esc(r[2]) + '" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
      '<div class="nm">' + ic('i-person') + esc(r[1]) + '</div><div class="co">' + esc(r[2]) + '</div></div></article>';
  }).join('');
  function cw() { var c = $('.card', track); return c ? c.offsetWidth + 10 : 1; }
  function sync() { var i = Math.round(track.scrollLeft / cw()); Array.prototype.forEach.call(dots.children, function (x, k) { x.classList.toggle('on', k === i); }); }
  dots.innerHTML = '';
  for (var i = 0; i < track.children.length; i++) {
    (function (i) { var x = document.createElement('i'); x.addEventListener('click', function () { track.scrollTo({ left: i * cw(), behavior: 'smooth' }); }); dots.appendChild(x); })(i);
  }
  sync();
  track.addEventListener('scroll', sync, { passive: true });
  $('#prev').addEventListener('click', function () { track.scrollBy({ left: -cw(), behavior: 'smooth' }); });
  $('#next').addEventListener('click', function () { track.scrollBy({ left: cw(), behavior: 'smooth' }); });
}

function setAlternates() {
  var head = document.head, file = pageFile(), q = cleanSearch();
  $$('link[rel="alternate"][hreflang]', head).forEach(function (l) { l.parentNode.removeChild(l); });
  [['uz', SITE + file + q], ['ru', SITE + 'ru/' + file + q], ['x-default', SITE + file + q]].forEach(function (x) {
    var l = document.createElement('link'); l.rel = 'alternate'; l.hreflang = x[0]; l.href = x[1]; head.appendChild(l);
  });
}
var DETAIL = { case: 1, zone: 1, franchise: 1, collection: 1, product: 1, article: 1 };

function render(keepScroll) {
  var y = window.scrollY;
  document.documentElement.lang = lang;
  var hdr = $('#hdr'), app = $('#app'), ftr = $('#ftr');
  hdr.innerHTML = SPRITE + headerHTML();
  ftr.innerHTML = footerHTML();
  var pages = { home: pageHome, about: pageAbout, franshiza: pageFranshiza, cases: pageCases, showroom: pageShowroom,
    case: pageCase, zone: pageZone, franchise: pageFranchise, contact: pageContact, panel: pagePanel, designers: pageDesigners, collection: pageCollection, product: pageProduct,
    articles: pageArticles, article: pageArticle };
  app.innerHTML = (pages[PAGE] || pageHome)();
  if (DETAIL[PAGE]) { var h1 = $('#app h1'); if (h1 && h1.textContent.trim()) document.title = h1.textContent.trim() + ' | Decopol'; }
  bind();
  if ((PAGE === 'articles' || PAGE === 'article') && window.fetch) loadArticlesPage();
  if (keepScroll) window.scrollTo(0, y);
}

setAlternates();
render();
})();
