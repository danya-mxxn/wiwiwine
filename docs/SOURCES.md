# Реестр официальных источников Sommelier Academy

Реестр фактически использованных материалов для наполнения базы. Последняя сверка: **09.11.2026**.

В базе 370 вопросов, 37 категорий; 105 материалов на 30 доменах.

Вопросы сформулированы самостоятельно по фактам из открытых материалов. Это не выгрузка закрытых официальных экзаменов.
Ссылки ниже раскрывают фактическую основу ответов, а не происхождение дословно скопированных формулировок.

## Где хранится связь с вопросами

- `src/data/sources.json` — машинный каталог: ID, организация, название, URL и дата сверки.
- `src/data/questions/*.json` — массивы вопросов; поле `sourceIds` связывает вопрос с каталогом.
- Этот документ — читаемый реестр сайтов, материалов и соответствующих категорий.
- Полная карта приложения: [PROJECT_MAP.md](PROJECT_MAP.md).

## Сайты и категории

| Сайт | Материалов | Категории, для которых использован |
| --- | ---: | --- |
| [cremants.com](https://cremants.com/) | 2 | Игристые вина; Креман |
| [doriasbaixas.com](https://doriasbaixas.com/) | 2 | Винодельческие регионы; Испания; Почвы и терруар |
| [drinkcalvados.com](https://drinkcalvados.com/) | 1 | Ликёры и другие спирты |
| [franciacorta.wine](https://franciacorta.wine/) | 2 | Игристые вина; Италия; Почвы и терруар; Франчакорта |
| [riojawine.com](https://riojawine.com/) | 2 | Испания |
| [styles.bjcp.org](https://styles.bjcp.org/) | 10 | Пивные стили: практика; Стили пива |
| [winesofargentina.org](https://winesofargentina.org/) | 1 | Винодельческие регионы; Новый Свет |
| [winesofportugal.com](https://winesofportugal.com/) | 3 | Виноградные сорта; Винодельческие регионы; Португалия |
| [wsetglobal.com](https://wsetglobal.com/) | 2 | Винная терминология; Ром |
| [www.awri.com.au](https://www.awri.com.au/) | 7 | Белое, красное и розовое; Белые вина; Винная терминология; Красные вина; Розовые вина; Технология виноделия |
| [www.bjcp.org](https://www.bjcp.org/) | 1 | Стили пива |
| [www.bordeaux.com](https://www.bordeaux.com/) | 6 | Белые вина; Винная терминология; Виноградные сорта; Винодельческие регионы; Красные вина; Франция; Grand Cru и классификации |
| [www.bourgogne-wines.com](https://www.bourgogne-wines.com/) | 1 | Белые вина; Виноградные сорта; Франция |
| [www.champagne.fr](https://www.champagne.fr/) | 8 | Винный сервис; Игристые вина; Почвы и терруар; Технология виноделия; Франция; Шампань |
| [www.chianticlassico.com](https://www.chianticlassico.com/) | 1 | Италия |
| [www.cognac.fr](https://www.cognac.fr/) | 2 | Коньяк и бренди |
| [www.crt.org.mx](https://www.crt.org.mx/) | 1 | Текила и мескаль |
| [www.ecfr.gov](https://www.ecfr.gov/) | 1 | Стили виски |
| [www.gob.mx](https://www.gob.mx/) | 1 | Текила и мескаль |
| [www.ivdp.pt](https://www.ivdp.pt/) | 1 | Креплёные вина; Португалия |
| [www.langhevini.it](https://www.langhevini.it/) | 1 | Виноградные сорта; Италия |
| [www.nzwine.com](https://www.nzwine.com/) | 2 | Винодельческие регионы; Новый Свет |
| [www.prosecco.wine](https://www.prosecco.wine/) | 2 | Игристые вина; Италия; Просекко |
| [www.scotch-whisky.org.uk](https://www.scotch-whisky.org.uk/) | 3 | Бочки и выдержка; Виски; Стили виски |
| [www.sherry.wine](https://www.sherry.wine/) | 5 | Испания; Креплёные вина |
| [www.vins-bourgogne.fr](https://www.vins-bourgogne.fr/) | 2 | Белые вина; Почвы и терруар; Grand Cru и классификации |
| [www.vinsdeprovence.com](https://www.vinsdeprovence.com/) | 3 | Белое, красное и розовое; Розовые вина; Франция |
| [www.winesofgermany.com](https://www.winesofgermany.com/) | 6 | Виноградные сорта; Винодельческие регионы; Германия |
| [www.wosa.co.za](https://www.wosa.co.za/) | 1 | Новый Свет |
| [www.wsetglobal.com](https://www.wsetglobal.com/) | 25 | Белое, красное и розовое; Белые вина; Бочки и выдержка; Винная терминология; Винный сервис; Винодельческие регионы; Виски; Гастрономические сочетания; Дегустация; Джин и водка; Италия; Коньяк и бренди; Красные вина; Ликёры и другие спирты; Основы крепкого алкоголя; Пивоварение; Почвы и терруар; Розовые вина; Ром; Технология виноделия; Франция; Шампань |

## Материалы с точными ссылками

В таблицах указаны только категории, в которых соответствующий материал действительно связан с вопросом через `sourceIds`.
Одна публикация может использоваться в нескольких категориях. Номер редакции документа сохраняется в названии, если он указан.

### Australian Wine Research Institute

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `awri-mlf` | [Малолактическая конверсия в белых и игристых винах](https://www.awri.com.au/files/attachment/mlf-in-white-and-sparkling-wine/) | Белые вина; Технология виноделия | 4 | 2026-11-09 |
| `awri-skins` | [Контакт с кожицей](https://www.awri.com.au/industry_support/winemaking_resources/winemaking-practices/winemaking-treatment-skin-contact/) | Белое, красное и розовое; Белые вина | 2 | 2026-11-09 |
| `awri-lees` | [Выдержка на осадке](https://www.awri.com.au/industry_support/winemaking_resources/winemaking-practices/winemaking-treatment-lees-contact/) | Белые вина; Винная терминология; Технология виноделия | 3 | 2026-11-09 |
| `awri-cold` | [Холодная мацерация](https://www.awri.com.au/industry_support/winemaking_resources/winemaking-practices/winemaking-treatment-cold-soak/) | Красные вина; Технология виноделия | 2 | 2026-11-09 |
| `awri-carbonic` | [Углекислотная мацерация](https://www.awri.com.au/industry_support/winemaking_resources/winemaking-practices/winemaking-treatment-carbonic-maceration/) | Красные вина; Технология виноделия | 2 | 2026-11-09 |
| `awri-temp` | [Температура ферментации](https://www.awri.com.au/industry_support/winemaking_resources/winemaking-practices/fermentation-temperature/) | Красные вина; Технология виноделия | 2 | 2026-11-09 |
| `awri-saignee` | [Saignée и розовые вина](https://www.awri.com.au/industry_support/winemaking_resources/winemaking-practices/winemaking-treatment-saignee/) | Розовые вина | 1 | 2026-11-09 |

### Beer Judge Certification Program

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `bjcp-intro` | [Введение в стили пива: редакция 2021](https://www.bjcp.org/beer-styles/introduction-to-beer-styles/) | Стили пива | 2 | 2026-11-09 |
| `bjcp-ipa` | [2021: 21A American IPA](https://styles.bjcp.org/bjcp-2021-beer/21/21a-american-ipa) | Пивные стили: практика | 2 | 2026-11-09 |
| `bjcp-weiss` | [2021: 10A Weissbier](https://styles.bjcp.org/bjcp-2021-beer/10/10a-weissbier) | Пивные стили: практика; Стили пива | 2 | 2026-11-09 |
| `bjcp-stout` | [2021: 15B Irish Stout](https://styles.bjcp.org/bjcp-2021-beer/15/15b-irish-stout) | Пивные стили: практика; Стили пива | 3 | 2026-11-09 |
| `bjcp-pils` | [2021: 3B Czech Premium Pale Lager](https://styles.bjcp.org/bjcp-2021-beer/3/3b-czech-premium-pale-lager) | Пивные стили: практика; Стили пива | 2 | 2026-11-09 |
| `bjcp-lambic` | [2021: 23D Lambic](https://styles.bjcp.org/bjcp-2021-beer/23/23d-lambic) | Пивные стили: практика; Стили пива | 2 | 2026-11-09 |
| `bjcp-wit` | [2021: 24A Witbier](https://styles.bjcp.org/bjcp-2021-beer/24/24a-witbier) | Пивные стили: практика; Стили пива | 2 | 2026-11-09 |
| `bjcp-hazy` | [2021: 21C Hazy IPA](https://styles.bjcp.org/bjcp-2021-beer/21/21c-hazy-ipa) | Пивные стили: практика; Стили пива | 2 | 2026-11-09 |
| `bjcp-saison` | [2021: 25B Saison](https://styles.bjcp.org/bjcp-2021-beer/25/25b-saison) | Пивные стили: практика; Стили пива | 2 | 2026-11-09 |
| `bjcp-tripel` | [2021: 26C Belgian Tripel](https://styles.bjcp.org/bjcp-2021-beer/26/26c-belgian-tripel) | Стили пива | 1 | 2026-11-09 |
| `bjcp-gueuze` | [2021: 23E Gueuze](https://styles.bjcp.org/bjcp-2021-beer/23/23e-gueuze) | Пивные стили: практика | 2 | 2026-11-09 |

### BIVB / Vins de Bourgogne

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `bourgogne-grapes` | [Пино Нуар, Шардоне и другие сорта Бургундии](https://www.bourgogne-wines.com/wine-and-terroir/our-grape-varietals-our-colors/pinot-noir-and-chardonnay-the-bourgogne-region-s-two-noble-grape-varietals%2C2475%2C9265.html) | Белые вина; Виноградные сорта; Франция | 7 | 2026-11-09 |
| `bourgogne-crus` | [Классификация аппелласьонов](https://www.vins-bourgogne.fr/plan-de-site/classification-des-appellations%2C2314%2C12208.html) | Grand Cru и классификации | 6 | 2026-11-09 |
| `bourgogne-soil` | [Геология Шабли](https://www.vins-bourgogne.fr/vins-et-terroirs/nos-atouts-naturels/geologie/les-heritiers-du-bassin-parisien/chablis-grand-auxerrois-et-chatillonnais-aux-limites-du-bassin-parisien%2C2512%2C9385.html) | Белые вина; Почвы и терруар | 2 | 2026-11-09 |

### Bureau National Interprofessionnel du Cognac

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `cognac-faq` | [Cognac: вопросы и ответы](https://www.cognac.fr/faq/) | Коньяк и бренди | 5 | 2026-11-09 |
| `cognac-rules` | [Cognac AOC: возрастные обозначения](https://www.cognac.fr/decouvrir/spiritueux-unique/une-origine-controlee/) | Коньяк и бренди | 4 | 2026-11-09 |

### CIVB / Bordeaux Wines

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `bordeaux-crus` | [Классификации Бордо](https://www.bordeaux.com/en/classifications/) | Grand Cru и классификации | 3 | 2026-11-09 |
| `bordeaux-1855` | [Классификация 1855 года](https://www.bordeaux.com/en/classifications/classifications-1855/) | Винодельческие регионы; Grand Cru и классификации | 4 | 2026-11-09 |
| `bordeaux-grapes` | [Сорта Бордо](https://www.bordeaux.com/en/grape-varieties/) | Франция | 2 | 2026-11-09 |
| `bordeaux-cabernet` | [Каберне Совиньон](https://www.bordeaux.com/en/grape-varieties/cabernet-sauvignon/) | Виноградные сорта; Красные вина | 3 | 2026-11-09 |
| `bordeaux-merlot` | [Мерло](https://www.bordeaux.com/en/grape-varieties/merlot/) | Винная терминология; Красные вина; Франция | 3 | 2026-11-09 |
| `bordeaux-semillon` | [Семийон](https://www.bordeaux.com/en/grape-varieties/semillon/) | Белые вина; Виноградные сорта; Франция | 3 | 2026-11-09 |

### Comité Champagne

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `champagne-grapes` | [Сорта винограда Шампани](https://www.champagne.fr/en/about-champagne/a-great-blended-wine/champagne-and-its-grape-varieties) | Франция; Шампань | 4 | 2026-11-09 |
| `champagne-soil` | [Почвы Шампани](https://www.champagne.fr/en/about-champagne/the-champagne-terroir/champagne-and-its-soil) | Почвы и терруар | 3 | 2026-11-09 |
| `champagne-dosage` | [Дозаж и содержание сахара](https://www.champagne.fr/en/about-champagne/how-champagne-is-made/dosage) | Игристые вина; Шампань | 4 | 2026-11-09 |
| `champagne-age` | [Созревание на осадке](https://www.champagne.fr/en/about-champagne/how-champagne-is-made/maturation) | Игристые вина; Шампань | 4 | 2026-11-09 |
| `champagne-riddling` | [Ремюаж](https://www.champagne.fr/en/about-champagne/how-champagne-is-made/riddling) | Игристые вина; Шампань | 2 | 2026-11-09 |
| `champagne-disgorge` | [Дегоржаж](https://www.champagne.fr/en/about-champagne/how-champagne-is-made/disgorgement) | Игристые вина | 2 | 2026-11-09 |
| `champagne-ferment` | [Спиртовая и малолактическая ферментация](https://www.champagne.fr/en/about-champagne/how-champagne-is-made/fermentation) | Технология виноделия; Шампань | 2 | 2026-11-09 |
| `champagne-service` | [Частые вопросы: бокалы и подача](https://www.champagne.fr/en/champagne-frequently-asked-questions) | Винный сервис | 1 | 2026-11-09 |

### Conseil Interprofessionnel des Vins de Provence

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `provence-method` | [Производство розовых вин](https://www.vinsdeprovence.com/en/le-rose/l-elaboration-du-rose) | Белое, красное и розовое; Розовые вина | 5 | 2026-11-09 |
| `provence-guide` | [Практический справочник вин Прованса](https://www.vinsdeprovence.com/files/5356acb8/2023_vf_guide_pratique_eng.pdf) | Розовые вина; Франция | 4 | 2026-11-09 |
| `provence-tasting` | [Дегустация розовых вин](https://www.vinsdeprovence.com/le-rose/la-degustation-du-rose) | Розовые вина | 2 | 2026-11-09 |

### Consejo Regulador de Jerez

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `sherry-fino` | [Fino](https://www.sherry.wine/sherry-wine/dry-sherry-wines/fino) | Испания; Креплёные вина | 3 | 2026-11-09 |
| `sherry-oloroso` | [Oloroso](https://www.sherry.wine/sherry-wine/dry-sherry-wines/oloroso) | Креплёные вина | 1 | 2026-11-09 |
| `sherry-amontillado` | [Amontillado](https://www.sherry.wine/sherry-wine/dry-sherry-wines/amontillado) | Креплёные вина | 1 | 2026-11-09 |
| `sherry-solera` | [Система выдержки](https://www.sherry.wine/sherry-wine/production/ageing) | Креплёные вина | 1 | 2026-11-09 |
| `sherry-px` | [Pedro Ximénez](https://www.sherry.wine/sherry-wine/naturally-sweet-sherry-wine/pedro-ximenez) | Креплёные вина | 1 | 2026-11-09 |

### Consejo Regulador del Tequila

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `crt` | [Сырьё, производство и классы текилы (испанский оригинал)](https://www.crt.org.mx/nuestro-tequila/) | Текила и мескаль | 6 | 2026-11-09 |

### Consejo Regulador DO Rías Baixas

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `rias-grapes` | [Разрешённые сорта](https://doriasbaixas.com/variedades-de-uva-rias-baixas/) | Испания | 3 | 2026-11-09 |
| `rias-region` | [География и пять субзон](https://doriasbaixas.com/quienes-somos-d-o-rias-baixas/) | Винодельческие регионы; Испания; Почвы и терруар | 3 | 2026-11-09 |

### Consejo Regulador DOCa Rioja

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `rioja` | [Классификация по выдержке](https://riojawine.com/en-gb/blog/classification-of-rioja-wines-according-to-their-ageing/) | Испания | 1 | 2026-11-09 |
| `rioja-grapes` | [Информационный справочник: сорта и выдержка](https://riojawine.com/wp-content/uploads/2019/02/INFORMATION-GUIDE-.pdf) | Испания | 4 | 2026-11-09 |

### Consorzio Barolo Barbaresco Alba Langhe e Dogliani

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `barolo` | [Barolo DOCG: спецификация](https://www.langhevini.it/wp-content/uploads/2019/05/Disciplinare-BAROLO-EN.pdf) | Виноградные сорта; Италия | 4 | 2026-11-09 |

### Consorzio Franciacorta

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `franciacorta` | [Метод и этапы производства](https://franciacorta.wine/en/wine/method/) | Игристые вина; Италия; Франчакорта | 10 | 2026-11-09 |
| `franciacorta-terroir` | [Геология и климат](https://franciacorta.wine/en/wine/geology-climate/) | Почвы и терруар; Франчакорта | 4 | 2026-11-09 |

### Consorzio Tutela Prosecco DOC

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `prosecco-rules` | [Спецификация Prosecco DOC](https://www.prosecco.wine/en/prosecco/production-regulation/) | Италия; Просекко | 8 | 2026-11-09 |
| `prosecco-method` | [Производство Prosecco DOC](https://www.prosecco.wine/en/prosecco/discover/winemaking/) | Игристые вина; Просекко | 4 | 2026-11-09 |

### Consorzio Vino Chianti Classico

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `chianti` | [Типы Chianti Classico](https://www.chianticlassico.com/vino/tipologie/) | Италия | 4 | 2026-11-09 |

### Deutsches Weininstitut

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `dwi-riesling` | [Рислинг](https://www.winesofgermany.com/our-wine/grape-varieties/grape-variety/105/riesling) | Виноградные сорта; Германия | 5 | 2026-11-09 |
| `dwi-regions` | [Карта 13 регионов Германии](https://www.winesofgermany.com/our-regions/region-map) | Винодельческие регионы; Германия | 2 | 2026-11-09 |
| `dwi-pradikat` | [Prädikate](https://www.winesofgermany.com/our-wine/wine-tasting/wine-tasting/449/pr%C3%A4dikate) | Германия | 1 | 2026-11-09 |
| `dwi-sweetness` | [Обозначения сладости](https://www.winesofgermany.com/our-wine/wine-tasting/wine-tasting/195/levels-of-sweetness-in-german-wines) | Германия | 2 | 2026-11-09 |
| `dwi-eiswein` | [Eiswein](https://www.winesofgermany.com/our-wine/wine-products/wine-product/418/eiswein) | Германия | 2 | 2026-11-09 |
| `dwi-pinot` | [Spätburgunder / Pinot Noir](https://www.winesofgermany.com/our-wine/grape-varieties/grape-variety/94/sp%C3%A4tburgunder-pinot-noir/) | Виноградные сорта; Германия | 2 | 2026-11-09 |

### eCFR / Alcohol and Tobacco Tax and Trade Bureau

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `us-whisky` | [27 CFR §5.143: Whisky](https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-5/subpart-I/section-5.143) | Стили виски | 4 | 2026-11-09 |

### FNPEC

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `cremant` | [Правила производства Crémant](https://cremants.com/le-cremant/) | Игристые вина; Креман | 6 | 2026-11-09 |
| `cremant-regions` | [Французские регионы Crémant](https://cremants.com/) | Креман | 5 | 2026-11-09 |

### Instituto dos Vinhos do Douro e do Porto

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `ivdp` | [Стили портвейна](https://www.ivdp.pt/en/wines/port-wines/introduction) | Креплёные вина; Португалия | 6 | 2026-11-09 |

### Interprofession des Appellations Cidricoles / Calvados France

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `calvados-aoc` | [Три AOC кальвадоса и терруары Нормандии](https://drinkcalvados.com/en/discover/the-calvados-appellations/) | Ликёры и другие спирты | 1 | 2026-11-09 |

### New Zealand Winegrowers

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `nz-marlborough` | [Регион Мальборо](https://www.nzwine.com/en/regions/marlborough/) | Винодельческие регионы; Новый Свет | 4 | 2026-11-09 |
| `nz-sauvignon` | [Совиньон Блан Новой Зеландии](https://www.nzwine.com/en/winestyles/sauvignonblanc/) | Новый Свет | 3 | 2026-11-09 |

### Scotch Whisky Association

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `swa-faq` | [Правила производства Scotch Whisky](https://www.scotch-whisky.org.uk/discover-scotch/faqs/) | Бочки и выдержка; Виски; Стили виски | 6 | 2026-11-09 |
| `swa-categories` | [Пять категорий Scotch Whisky](https://www.scotch-whisky.org.uk/discover-scotch/enjoying-scotch/scotch-whisky-categories/) | Виски; Стили виски | 8 | 2026-11-09 |
| `swa-age` | [Возрастные обозначения: руководство, 2025](https://www.scotch-whisky.org.uk/media/2387/guidance-for-bottlers-and-producers_2025.pdf) | Виски | 2 | 2026-11-09 |

### Secretaría de Economía / Diario Oficial de la Federación

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `mezcal-nom` | [NOM-070-SCFI-2016: Mezcal](https://www.gob.mx/cms/uploads/attachment/file/559353/NOM-070-SCFI-2016_Bebidas_alcoholicas-Mezcal-Especificaciones.pdf) | Текила и мескаль | 4 | 2026-11-09 |

### ViniPortugal / Wines of Portugal

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `portugal-regions` | [Регионы Португалии](https://winesofportugal.com/en/discover/wine-regions/) | Винодельческие регионы; Португалия | 4 | 2026-11-09 |
| `portugal-touriga` | [Турига Насьонал](https://winesofportugal.com/en/portuguese-wines/grape-varieties/touriga-nacional/) | Виноградные сорта; Португалия | 4 | 2026-11-09 |
| `portugal-verde` | [Vinho Verde](https://winesofportugal.com/pt/descobrir/regioes-vitivinicolas/vinho-verde/) | Португалия | 2 | 2026-11-09 |

### Wines of Argentina

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `argentina-mendoza` | [Провинция Мендоса](https://winesofargentina.org/en/provinces/mendoza) | Винодельческие регионы; Новый Свет | 4 | 2026-11-09 |

### Wines of South Africa

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `wosa` | [Виноградарство и Пинотаж](https://www.wosa.co.za/Themes/Content%20Themes/WOSA/Templates/General.aspx?pageidref=2787) | Новый Свет | 2 | 2026-11-09 |

### WSET

| ID источника | Материал | Категории | Вопросов | Проверено |
| --- | --- | --- | ---: | --- |
| `wset-geography` | [Как география влияет на стиль вина](https://www.wsetglobal.com/news-insights/insight-opinion/how-does-geography-affect-a-wine-s-style/) | Винодельческие регионы; Почвы и терруар | 6 | 2026-11-09 |
| `wset-colour` | [Что определяет цвет вина](https://www.wsetglobal.com/news-insights/insight-opinion/what-determines-the-colour-of-wine/) | Белое, красное и розовое; Белые вина; Технология виноделия; Шампань | 6 | 2026-11-09 |
| `wset-wine` | [Состав и основы вина](https://www.wsetglobal.com/news-insights/insight-opinion/what-is-wine/) | Винная терминология; Дегустация; Красные вина | 4 | 2026-11-09 |
| `wset-styles` | [Типы и стили вина](https://www.wsetglobal.com/news-insights/insight-opinion/how-many-wine-types-and-styles-are-there/) | Белое, красное и розовое; Белые вина; Гастрономические сочетания; Дегустация; Розовые вина | 7 | 2026-11-09 |
| `wset-oak` | [Дуб в виноделии](https://www.wsetglobal.com/news-insights/insight-opinion/why-is-oak-used-in-winemaking/) | Белые вина; Бочки и выдержка; Красные вина | 3 | 2026-11-09 |
| `wset-acidity` | [Кислотность вина](https://www.wsetglobal.com/news-insights/insight-opinion/understanding-acidity-in-wine/) | Белые вина; Дегустация | 4 | 2026-11-09 |
| `wset-pairing` | [Принципы сочетания еды и вина](https://www.wsetglobal.com/news-insights/insight-opinion/four-rules-to-masterful-food-and-wine-pairing/) | Гастрономические сочетания | 5 | 2026-11-09 |
| `wset-spice` | [Напитки и острая еда](https://www.wsetglobal.com/news-insights/insight-opinion/how-to-pair-drinks-with-spice/) | Гастрономические сочетания | 3 | 2026-11-09 |
| `wset-storage` | [Температура подачи и хранение](https://www.wsetglobal.com/news-insights/insight-opinion/ideal-serving-temperatures-and-top-tips-for-wine-storage/) | Винный сервис | 4 | 2026-11-09 |
| `wset-service` | [Подача и декантация вина](https://www.wsetglobal.com/news-insights/insight-opinion/frequently-asked-questions-about-serving-and-decanting-wine/) | Винная терминология; Винный сервис | 6 | 2026-11-09 |
| `wset-ageing` | [Зачем выдерживают вино](https://www.wsetglobal.com/news-insights/insight-opinion/why-do-we-age-wine/) | Белое, красное и розовое; Дегустация; Красные вина | 4 | 2026-11-09 |
| `wset-labels` | [Как читать винные этикетки](https://wsetglobal.com/news-insights/insight-opinion/how-to-read-wine-labels-common-features-on-wine-labels/) | Винная терминология | 4 | 2026-11-09 |
| `wset-vintage` | [Погода и винтаж](https://www.wsetglobal.com/news-insights/insight-opinion/weather-wine-and-vintages/) | Винная терминология; Почвы и терруар | 3 | 2026-11-09 |
| `wset-tasting` | [Развитие навыков дегустации](https://www.wsetglobal.com/knowledge-centre/blog/2019/november/how-to-build-your-wine-tasting-skills/) | Белые вина; Дегустация | 4 | 2026-11-09 |
| `wset-wines2` | [Level 2 Wines: программа занятий, 2023](https://www.wsetglobal.com/media/13022/wset_l2wines_sessionplans_en_may2023_issue2.pdf) | Италия; Красные вина; Технология виноделия; Франция | 5 | 2026-11-09 |
| `wset-spirits2` | [Level 2 Spirits: спецификация, 2022](https://www.wsetglobal.com/media/11713/wset_l2spirits_specification_en_may2022_issue2.pdf) | Бочки и выдержка; Коньяк и бренди; Ликёры и другие спирты; Основы крепкого алкоголя; Ром | 10 | 2026-11-09 |
| `wset-spirits3` | [Level 3 Spirits: спецификация, 2020](https://www.wsetglobal.com/media/10041/wset_l3spirits_specification_en_jun2020.pdf) | Основы крепкого алкоголя | 7 | 2026-11-09 |
| `wset-barrel` | [Выдержка крепких напитков в дубе](https://www.wsetglobal.com/news-insights/insight-opinion/the-alchemy-of-oak-barrel-ageing-in-spirits/) | Бочки и выдержка; Ром | 6 | 2026-11-09 |
| `wset-world-whisky` | [Виски мира и роль климата](https://www.wsetglobal.com/news-insights/insight-opinion/world-whisky-and-its-global-evolution/) | Бочки и выдержка; Виски | 3 | 2026-11-09 |
| `wset-rum` | [История и стили рома](https://wsetglobal.com/news-insights/insight-opinion/history-of-rum-styles-origins-and-traditions/) | Ром | 7 | 2026-11-09 |
| `wset-gin` | [Можжевельник и стили джина](https://www.wsetglobal.com/news-insights/insight-opinion/gin-the-spirit-of-juniper/) | Джин и водка | 3 | 2026-11-09 |
| `wset-gin-flavour` | [Способы ароматизации джина](https://www.wsetglobal.com/news-insights/insight-opinion/understanding-flavours-in-gin/) | Джин и водка | 3 | 2026-11-09 |
| `wset-vodka` | [Сырьё и производство водки](https://www.wsetglobal.com/knowledge-centre/blog/2024/premium-vodka-and-how-to-savour-it/) | Джин и водка | 4 | 2026-11-09 |
| `wset-liqueur` | [Ликёры и ароматизированные напитки: спецификация Level 2](https://www.wsetglobal.com/media/6331/wset_l2spirits_specification_en_jun2018.pdf) | Ликёры и другие спирты | 6 | 2026-11-09 |
| `wset-beer` | [Основы пива и его компоненты](https://www.wsetglobal.com/news-insights/insight-opinion/what-is-beer-a-beginner-s-guide/) | Пивоварение | 5 | 2026-11-09 |
| `wset-beer2` | [Level 2 Beer: спецификация, 2023](https://www.wsetglobal.com/media/14172/wset_l2beer_specification_en_dec2023_issue1.pdf) | Пивоварение | 5 | 2026-11-09 |
| `wset-winter-pairing` | [Сочетания: сахар, жир и интенсивность](https://www.wsetglobal.com/news-insights/insight-opinion/winter-wine-and-food-matching/) | Гастрономические сочетания | 1 | 2026-11-09 |

## Наполнение категорий

| Категория | Вопросов | ID используемых материалов |
| --- | ---: | --- |
| Белое, красное и розовое | 10 | `awri-skins`, `provence-method`, `wset-ageing`, `wset-colour`, `wset-styles` |
| Белые вина | 10 | `awri-lees`, `awri-mlf`, `awri-skins`, `bordeaux-semillon`, `bourgogne-grapes`, `bourgogne-soil`, `wset-acidity`, `wset-colour`, `wset-oak`, `wset-styles`, `wset-tasting` |
| Бочки и выдержка | 10 | `swa-faq`, `wset-barrel`, `wset-oak`, `wset-spirits2`, `wset-world-whisky` |
| Винная терминология | 10 | `awri-lees`, `bordeaux-merlot`, `wset-labels`, `wset-service`, `wset-vintage`, `wset-wine` |
| Винный сервис | 10 | `champagne-service`, `wset-service`, `wset-storage` |
| Виноградные сорта | 10 | `barolo`, `bordeaux-cabernet`, `bordeaux-semillon`, `bourgogne-grapes`, `dwi-pinot`, `dwi-riesling`, `portugal-touriga` |
| Винодельческие регионы | 10 | `argentina-mendoza`, `bordeaux-1855`, `dwi-regions`, `nz-marlborough`, `portugal-regions`, `rias-region`, `wset-geography` |
| Виски | 10 | `swa-age`, `swa-categories`, `swa-faq`, `wset-world-whisky` |
| Гастрономические сочетания | 10 | `wset-pairing`, `wset-spice`, `wset-styles`, `wset-winter-pairing` |
| Германия | 10 | `dwi-eiswein`, `dwi-pinot`, `dwi-pradikat`, `dwi-regions`, `dwi-riesling`, `dwi-sweetness` |
| Дегустация | 10 | `wset-acidity`, `wset-ageing`, `wset-styles`, `wset-tasting`, `wset-wine` |
| Джин и водка | 10 | `wset-gin`, `wset-gin-flavour`, `wset-vodka` |
| Игристые вина | 10 | `champagne-age`, `champagne-disgorge`, `champagne-dosage`, `champagne-riddling`, `cremant`, `franciacorta`, `prosecco-method` |
| Испания | 10 | `rias-grapes`, `rias-region`, `rioja`, `rioja-grapes`, `sherry-fino` |
| Италия | 10 | `barolo`, `chianti`, `franciacorta`, `prosecco-rules`, `wset-wines2` |
| Коньяк и бренди | 10 | `cognac-faq`, `cognac-rules`, `wset-spirits2` |
| Красные вина | 10 | `awri-carbonic`, `awri-cold`, `awri-temp`, `bordeaux-cabernet`, `bordeaux-merlot`, `wset-ageing`, `wset-oak`, `wset-wine`, `wset-wines2` |
| Креман | 10 | `cremant`, `cremant-regions` |
| Креплёные вина | 10 | `ivdp`, `sherry-amontillado`, `sherry-fino`, `sherry-oloroso`, `sherry-px`, `sherry-solera` |
| Ликёры и другие спирты | 10 | `calvados-aoc`, `wset-liqueur`, `wset-spirits2` |
| Новый Свет | 10 | `argentina-mendoza`, `nz-marlborough`, `nz-sauvignon`, `wosa` |
| Основы крепкого алкоголя | 10 | `wset-spirits2`, `wset-spirits3` |
| Пивные стили: практика | 10 | `bjcp-gueuze`, `bjcp-hazy`, `bjcp-ipa`, `bjcp-lambic`, `bjcp-pils`, `bjcp-saison`, `bjcp-stout`, `bjcp-weiss`, `bjcp-wit` |
| Пивоварение | 10 | `wset-beer`, `wset-beer2` |
| Португалия | 10 | `ivdp`, `portugal-regions`, `portugal-touriga`, `portugal-verde` |
| Почвы и терруар | 10 | `bourgogne-soil`, `champagne-soil`, `franciacorta-terroir`, `rias-region`, `wset-geography`, `wset-vintage` |
| Просекко | 10 | `prosecco-method`, `prosecco-rules` |
| Розовые вина | 10 | `awri-saignee`, `provence-guide`, `provence-method`, `provence-tasting`, `wset-styles` |
| Ром | 10 | `wset-barrel`, `wset-rum`, `wset-spirits2` |
| Стили виски | 10 | `swa-categories`, `swa-faq`, `us-whisky` |
| Стили пива | 10 | `bjcp-hazy`, `bjcp-intro`, `bjcp-lambic`, `bjcp-pils`, `bjcp-saison`, `bjcp-stout`, `bjcp-tripel`, `bjcp-weiss`, `bjcp-wit` |
| Текила и мескаль | 10 | `crt`, `mezcal-nom` |
| Технология виноделия | 10 | `awri-carbonic`, `awri-cold`, `awri-lees`, `awri-mlf`, `awri-temp`, `champagne-ferment`, `wset-colour`, `wset-wines2` |
| Франция | 10 | `bordeaux-grapes`, `bordeaux-merlot`, `bordeaux-semillon`, `bourgogne-grapes`, `champagne-grapes`, `provence-guide`, `wset-wines2` |
| Франчакорта | 10 | `franciacorta`, `franciacorta-terroir` |
| Шампань | 10 | `champagne-age`, `champagne-dosage`, `champagne-ferment`, `champagne-grapes`, `champagne-riddling`, `wset-colour` |
| Grand Cru и классификации | 10 | `bordeaux-1855`, `bordeaux-crus`, `bourgogne-crus` |

## Как расширять базу до большого объёма

1. Выберите категорию и первичный источник: регулятор, официальный консорциум, профильный институт или учебная организация.
2. Откройте конкретный документ, проверьте редакцию и область действия. Числа, возрастные нормы, разрешённые сорта и географические границы сверяйте по спецификации наименования.
3. Добавьте материал в `src/data/sources.json` с уникальным ID, организацией, названием, точным HTTPS-адресом и реальной датой проверки. Не ставьте новую дату без повторного чтения.
4. Напишите самостоятельные русскоязычные вопросы с однозначными ответами, правдоподобными отвлекающими вариантами и объяснениями. Свяжите каждый с одним или несколькими `sourceIds`.
5. Размещайте новые массивы в тематических `src/data/questions/*.json`. Не храните вопросы в коде или Markdown. Используйте стабильные уникальные ID; не переиспользуйте старый ID для другой темы и не переставляйте варианты существующего вопроса без учёта сохранённых ответов.
6. Обновите этот реестр и карту проекта по фактическим связям из JSON. Не создавайте дополнительные параллельные списки сайтов или временные отчёты в корне.
7. Выполните `npm run validate`, `npm test`, `npm run build`. Проверьте, что источники показываются в обучении после ответа, а в экзамене — в итоговом разборе.

### Особенности текущих источников

- BJCP: вопросы привязаны к редакции **2021**. При переходе на другую редакцию сверять каждый изменившийся стиль.
- WSET: используются открытые статьи и опубликованные спецификации, а не закрытые задания экзаменов. У документов в каталоге указаны годы редакций.
- BNIC, CRT, SWA, консорциумы вина: требования относятся к конкретному наименованию и юрисдикции; не переносить их автоматически на всю категорию напитков.
- При расхождении переводов читать оригинал. Например, для Tequila Reposado использована испанская страница CRT: минимум два месяца в дубе.
- Часть официальных PDF выпущена раньше даты сверки. `checkedAt` означает дату чтения, а не год публикации или гарантию отсутствия более новой редакции.
- Сайты могут менять адреса и содержание. В приложении вопросы работают из локальной сборки; открытие внешнего первоисточника требует интернета.
