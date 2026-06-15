// Deep sector data — all 7 sectors, fully specialized

export const SECTORS = [
  {
    id: 'vastgoed',
    name: 'Vastgoedmakelaars',
    color: '#2563EB',
    icon: 'Building2',
    tagline: 'Automatisch leads opvolgen, bezichtigingen inplannen & commissies factureren',
    automationBullets: [
      'Leads binnen 90 seconden automatisch beantwoord via WhatsApp & e-mail',
      'Bezichtigingen ingepland zonder handmatig werk — 24/7 beschikbaar',
      'Woningbeschrijvingen, foto-opdrachten & commissiefacturen automatisch gegenereerd',
    ],
    metrics: [
      { label: 'Nieuwe leads vandaag', value: '12', delta: '+4', deltaPos: true, sparkline: [4,6,5,8,10,9,12] },
      { label: 'Bezichtigingen ingepland', value: '7', delta: '+2', deltaPos: true, sparkline: [3,4,5,4,6,5,7] },
      { label: 'Tijd bespaard vandaag', value: '3u 15m', delta: '+18m', deltaPos: true, sparkline: [2.5,2.8,3,2.9,3.1,3,3.25] },
      { label: 'Reactietijd', value: '1m 42s', delta: '−35%', deltaPos: true, sparkline: [4,3.5,3,2.8,2.5,2,1.7] },
    ],
    weekActivity: [4,7,5,9,12,8,6],
    activityFeed: [
      { time: '14:32', text: 'Bezichtiging bevestigd di 14:00 — Lange Nieuwstraat 12', icon: 'Calendar', color: '#2563EB' },
      { time: '14:18', text: 'Lead automatisch opgevolgd — Sophie Janssens (Immoweb)', icon: 'MessageSquare', color: '#10B981' },
      { time: '13:55', text: 'Woningbeschrijving gegenereerd — Parkstraat 8, 85m²', icon: 'FileText', color: '#8B5CF6' },
      { time: '13:40', text: 'Commissiefactuur verstuurd: €4.250 — Koper De Smedt', icon: 'Receipt', color: '#F59E0B' },
      { time: '12:22', text: 'Nieuwe lead — Jan Pieters via website chatbot', icon: 'UserPlus', color: '#10B981' },
      { time: '11:45', text: 'Herinnering verstuurd — bezichtiging woe 10:00 Meir 42', icon: 'Bell', color: '#06B6D4' },
      { time: '11:12', text: 'Lead automatisch opgevolgd — Thomas Verbeke (Zimmo)', icon: 'MessageSquare', color: '#10B981' },
      { time: '10:30', text: 'Bezichtiging ingepland — Grotesteenweg 112, vr 15:00', icon: 'Calendar', color: '#2563EB' },
    ],
    liveItems: [
      'Nieuwe lead — Karen De Wolf via Immoweb (€380.000 budget)',
      'Herinnering verstuurd — bezichtiging morgen 09:00 Parkstraat',
      'Bezichtiging bevestigd — Stationsstraat 7, do 11:00',
      'Woningbeschrijving gegenereerd — Antwerpsesteenweg 34',
      'Lead automatisch opgevolgd — Fam. Bogaert (2e contact)',
    ],
    whatsapp: [
      {
        id: 'c1', contact: 'Sophie Janssens', avatar: 'SJ', status: 'Actief lead',
        messages: [
          { from: 'client', text: 'Goedemiddag, ik zag uw appartement in de Lange Nieuwstraat. Is er nog plaats voor een bezichtiging?', time: '14:05' },
          { from: 'ai', text: 'Goedemiddag Sophie! Bedankt voor uw interesse in Lange Nieuwstraat 12 (2 slpk, 78m², €285.000).\n\nIk heb nog 2 momenten beschikbaar:\n📅 Dinsdag 18/06 om 14:00\n📅 Donderdag 20/06 om 10:30\n\nWelk tijdstip past u?', time: '14:05', delay: '8 sec' },
          { from: 'client', text: 'Dinsdag 14u past perfect, dank u!', time: '14:07' },
          { from: 'ai', text: '✅ Bevestigd! Bezichtiging dinsdag 18/06 om 14:00\n📍 Lange Nieuwstraat 12, Antwerpen\n\nU ontvangt morgen een herinnering. Heeft u al een hypotheekbeslissing?', time: '14:07', delay: '5 sec' },
        ]
      },
      {
        id: 'c2', contact: 'Thomas Verbeke', avatar: 'TV', status: 'Actieve zoekopdracht',
        messages: [
          { from: 'client', text: 'Zijn er nog opties in Hasselt centrum, budget €350.000?', time: '11:10' },
          { from: 'ai', text: 'Goedemorgen Thomas! 3 panden in Hasselt binnen budget:\n\n🏠 Maastrichterstraat 7 — €325.000 (3 slpk, 112m²)\n🏠 Koningin Astridlaan 14 — €345.000 (4 slpk, 145m²)\n🏠 Leopoldplein 3B — €349.500 (nieuwbouw, 2 slpk)\n\nBezichtiging inplannen?', time: '11:11', delay: '12 sec' },
        ]
      },
    ],
    email: {
      from: 'peter.claes@gmail.com', subject: 'Interesse pand Hasselt — Ref. H2024-089',
      original: 'Geachte,\n\nIk ben geïnteresseerd in het pand Kolonel Dusartplein Hasselt (ref. H2024-089). Info over dak & EPC? Bezichtiging mogelijk volgende week?\n\nPeter Claes',
      aiReply: 'Geachte heer Claes,\n\nDak vernieuwd in 2019 (garantie tot 2029). EPC-score: C (220 kWh/m²jaar).\n\nBezichtiging:\n📅 Maandag 17/06 om 14:00\n📅 Woensdag 19/06 om 10:00\n\nMet vriendelijke groeten,\nEDA Assistant — Immobiliënkantoor De Smet',
      responseTime: '4 min 12 sec',
    },
    agenda: [
      { day: 'Ma', items: [
        { time: '09:00', title: 'Bezichtiging', sub: 'Meir 42 — Fam. Puts (4 slpk)', color: '#2563EB', duration: 45 },
        { time: '11:00', title: 'Notaris overleg', sub: 'Dossier Vandenberghe — compromis', color: '#8B5CF6', duration: 60 },
        { time: '14:00', title: 'Bezichtiging', sub: 'Parkstraat 8 — Mevr. Leclercq', color: '#2563EB', duration: 45 },
      ]},
      { day: 'Di', items: [
        { time: '10:30', title: 'Bezichtiging', sub: 'Lange Nieuwstraat 12 — Janssens', color: '#2563EB', duration: 45 },
        { time: '14:00', title: 'Bezichtiging', sub: 'Leopoldstraat 3B — De Wolf', color: '#2563EB', duration: 45 },
        { time: '16:00', title: 'Fotoshoot', sub: 'Nieuw pand Hasselt centrum', color: '#F59E0B', duration: 90 },
      ]},
      { day: 'Wo', items: [
        { time: '10:00', title: 'Bezichtiging', sub: 'Grotesteenweg 112 — Hermans', color: '#2563EB', duration: 45 },
        { time: '15:00', title: 'Compromis ondertekening', sub: 'Notaris Pieters — Meir 42', color: '#10B981', duration: 60 },
      ]},
      { day: 'Do', items: [
        { time: '09:30', title: 'Bezichtiging', sub: 'Hasselt 3 panden — Verbeke', color: '#2563EB', duration: 120 },
        { time: '14:00', title: 'Prijsbepaling', sub: 'Nieuw mandaat Stationsstraat 7', color: '#8B5CF6', duration: 60 },
      ]},
      { day: 'Vr', items: [
        { time: '10:00', title: 'Open huis', sub: 'Meir 42 — algemeen publiek', color: '#EF4444', duration: 120 },
        { time: '15:00', title: 'Bezichtiging', sub: 'Meir 42 — 2e bekijking Fam. Claes', color: '#2563EB', duration: 45 },
      ]},
    ],
    adminItems: [
      { id: 'INV-2024-0156', date: '13/06/2024', desc: 'Commissie verkoop Meir 42', client: 'Fam. Puts', amount: 8500, vat: 1785, total: 10285, status: 'Betaald', category: 'Commissie' },
      { id: 'INV-2024-0155', date: '12/06/2024', desc: 'Commissie verhuur Parkstraat 8', client: 'Mevr. Leclercq', amount: 1200, vat: 252, total: 1452, status: 'Betaald', category: 'Commissie' },
      { id: 'INV-2024-0154', date: '11/06/2024', desc: 'Commissie verkoop Lange Nieuwstraat 12', client: 'Fam. Janssens', amount: 4250, vat: 892.50, total: 5142.50, status: 'Openstaand', category: 'Commissie' },
      { id: 'INV-2024-0153', date: '10/06/2024', desc: 'Administratiekosten dossier H2024-089', client: 'Dhr. Claes', amount: 350, vat: 73.50, total: 423.50, status: 'Betaald', category: 'Administratie' },
      { id: 'INV-2024-0152', date: '09/06/2024', desc: 'Commissie verkoop Grotesteenweg 112', client: 'Dhr. Hermans', amount: 6750, vat: 1417.50, total: 8167.50, status: 'Openstaand', category: 'Commissie' },
      { id: 'INV-2024-0151', date: '07/06/2024', desc: 'Fotografie & marketing Leopoldstraat 3B', client: 'Interne kost', amount: 450, vat: 94.50, total: 544.50, status: 'Betaald', category: 'Marketing' },
    ],
    agendaStats: { reminders: 14, noShows: 2, trend: '+12%', weekData: [3,4,2,3,4,1,0] },
    adminSummary: { total: 21500, count: 18, timeSaved: '6u 20m', openstaand: 14917 },
    accountManager: 'Lien Hermans',
    aiQuestions: [
      { q: 'Hoeveel leads hadden we deze week?', a: 'Deze week: 34 nieuwe leads (+21% vs vorige week). Verdeling:\n• Immoweb: 14 leads\n• Website chatbot: 11 leads\n• Zimmo: 6 leads\n• Referrals: 3 leads\n\nConversieratio naar bezichtiging: 58% — uitstekend (sectorgemiddelde: 32%). Gemiddelde reactietijd: 1m 42s.' },
      { q: 'Welke panden verkopen het snelst?', a: 'Top presterende panden (tijd tot bod):\n1. Appartement 2-3 slpk €200k-€320k → gemiddeld 18 dagen\n2. Nieuwbouw projecten → gemiddeld 12 dagen\n3. Woningen met tuin €320k-€450k → gemiddeld 34 dagen\n\nMeir 42 staat 22 dagen te koop — 2 biedingen ontvangen, onderhandeling lopende.' },
      { q: 'Zijn er leads die ik moet opvolgen?', a: '3 leads zonder reactie >48u:\n• Karen De Wolf — bezichtiging voorgesteld, geen antwoord (72u)\n• Dhr. Lemmens — prijsvraag, geen follow-up (58u)\n• Fam. Bogaert — 2e bezichtiging niet bevestigd (49u)\n\n→ Automatische opvolgberichten versturen? [Bevestigen]' },
      { q: 'Genereer rapport deze week', a: 'Weekrapport gegenereerd:\n📊 34 nieuwe leads | 19 bezichtigingen | 3 biedingen | 2 compromissen\n💰 Omzet commissies: €21.500\n⏱️ Gem. responstijd: 1m 42s\n🏆 Best scorend kanaal: Immoweb (41%)\n\nRapport verstuurd naar lien.hermans@eda.be ✅' },
    ],
    report: {
      period: 'Week 24 — 10 t/m 14 juni 2024',
      highlights: [
        { label: 'Nieuwe leads', value: '34', trend: '+21%' },
        { label: 'Bezichtigingen', value: '19', trend: '+8%' },
        { label: 'Conversieratio', value: '58%', trend: '+4%' },
        { label: 'Commissie-omzet', value: '€21.500', trend: '+15%' },
      ],
      topAction: 'Meir 42: 2 actieve biedingen — actie vereist deze week',
    },
  },

  {
    id: 'tandartsen',
    name: 'Tandartsen',
    color: '#10B981',
    icon: 'Heart',
    tagline: 'Minder no-shows, meer behandelingen, tevreden patiënten — automatisch',
    automationBullets: [
      'Patiënten herinnerd 24u & 2u voor afspraak → 73% minder no-shows',
      'Herplanningen & nieuwe afspraken 24/7 zonder receptionist',
      'Intakeformulieren, behandelverslagen & facturen automatisch',
    ],
    metrics: [
      { label: 'Afspraken vandaag', value: '14', delta: '+2', deltaPos: true, sparkline: [10,12,11,13,12,14,14] },
      { label: 'No-shows deze maand', value: '2', delta: '−73%', deltaPos: true, sparkline: [8,7,6,5,4,3,2] },
      { label: 'Patiënttevredenheid', value: '4.8★', delta: '+0.3', deltaPos: true, sparkline: [4.4,4.5,4.5,4.6,4.7,4.7,4.8] },
      { label: 'Tijd bespaard vandaag', value: '2u 45m', delta: '+30m', deltaPos: true, sparkline: [1.5,1.8,2,2.2,2.4,2.5,2.75] },
    ],
    weekActivity: [12,14,13,15,14,10,0],
    activityFeed: [
      { time: '14:45', text: 'Herinnering verstuurd — 8 patiënten morgen (WhatsApp + SMS)', icon: 'Bell', color: '#10B981' },
      { time: '14:20', text: 'Intakeformulier ontvangen — nieuwe patiënt Lars De Backer', icon: 'FileText', color: '#8B5CF6' },
      { time: '13:50', text: 'Halfjaarlijkse controle ingepland — Verbeke (6 mnd automatisch)', icon: 'Calendar', color: '#2563EB' },
      { time: '12:30', text: 'No-show opgevolgd — Dhr. Maes, herplanning vrijdag 10:00 OK', icon: 'RefreshCw', color: '#F59E0B' },
      { time: '12:00', text: 'Review-uitnodiging verstuurd — 5 patiënten van gisteren', icon: 'Star', color: '#F59E0B' },
      { time: '11:15', text: 'Betaalherinnering — openstaand factuur €145 (14 dagen)', icon: 'Receipt', color: '#EF4444' },
      { time: '10:45', text: 'Behandelverslag aangemaakt — implantaat fase 1 Dhr. Claes', icon: 'Clipboard', color: '#8B5CF6' },
      { time: '09:00', text: 'Dagplanning + bezetting gegenereerd & verstuurd naar team', icon: 'Layout', color: '#06B6D4' },
    ],
    liveItems: [
      'Herinnering verstuurd — Dhr. Peters, morgen 10:30 (Kroon)',
      'Nieuwe patiënt geregistreerd — Mevr. Van den Berg (doorverwijzing)',
      'Factuur betaald — Mevr. Claes €145 (iDeal)',
      'Review ontvangen ⭐⭐⭐⭐⭐ — "Fantastisch, geen pijn!"',
    ],
    whatsapp: [
      {
        id: 'c1', contact: 'Marie Claes', avatar: 'MC', status: 'Vaste patiënt',
        messages: [
          { from: 'client', text: 'Kan ik mijn afspraak van morgen om 9u verzetten? Ik ben ziek.', time: '13:10' },
          { from: 'ai', text: 'Goedemiddag Marie, beterschap! 🌡️\n\nGeen probleem. Vrije momenten:\n📅 Vrijdag 21/06 om 10:00 (controle + reiniging, 60min)\n📅 Maandag 24/06 om 14:30\n\nWelk moment past u?', time: '13:10', delay: '6 sec' },
          { from: 'client', text: 'Vrijdag 10u is perfect!', time: '13:12' },
          { from: 'ai', text: '✅ Verplaatst naar vrijdag 21/06 om 10:00.\n\nDonderdag ontvangt u een herinnering. Vlug beter! 🙏', time: '13:12', delay: '4 sec' },
        ]
      },
      {
        id: 'c2', contact: 'Thomas Willems', avatar: 'TW', status: 'Spoedpatiënt',
        messages: [
          { from: 'client', text: 'Mijn kiespijn is erger geworden, is er morgen nog iets?', time: '10:20' },
          { from: 'ai', text: 'Hallo Thomas! 😟 Kiespijn begrijp ik.\n\nSpoedgaatje morgen om 08:30 (20 min, gratis consultatie).\n\nReserveer ik dit voor u?', time: '10:20', delay: '9 sec' },
          { from: 'client', text: 'Ja graag!', time: '10:21' },
          { from: 'ai', text: '✅ Spoed gereserveerd morgen 08:30.\n\nNeem uw SIS-kaart mee. Bij hevige pijn: ibuprofen 400mg elke 6u. Tot morgen! 💊', time: '10:21', delay: '5 sec' },
        ]
      },
    ],
    email: {
      from: 'jan.vandenberghe@hotmail.com', subject: 'Nieuwe patiënt — afspraak aanvragen',
      original: 'Goedemiddag,\n\nIk zoek een nieuwe tandarts. Laatste controle: 2 jaar geleden. Afspraak mogelijk voor controle + reiniging?\n\nJan Vandenberghe',
      aiReply: 'Goedemiddag Jan,\n\nWelkom! Voor nieuwe patiënten: intake + controle + reiniging (60 min).\n\n📅 Dinsdag 18/06 om 13:30\n📅 Donderdag 20/06 om 09:00\n\nIntakeformulier volgt na bevestiging (5 min, online).\n\nPraktijk Dr. Lemmens',
      responseTime: '2 min 44 sec',
    },
    agenda: [
      { day: 'Ma', items: [
        { time: '08:30', title: 'Controle + reiniging', sub: 'Mevr. Peeters — Behandelaar: Dr. Lemmens', color: '#10B981', duration: 60 },
        { time: '10:00', title: 'Composietvulling M6', sub: 'Dhr. Maes — Dr. Lemmens', color: '#F59E0B', duration: 45 },
        { time: '11:30', title: 'Kindertandzorg', sub: 'Sofie De Wolf (8j) — Dr. Claes', color: '#06B6D4', duration: 30 },
        { time: '14:00', title: 'Controle', sub: 'Mevr. Janssen — halfjaarlijks', color: '#10B981', duration: 30 },
        { time: '15:00', title: 'Bleekbehandeling', sub: 'Mevr. De Wolf — LED bleking', color: '#8B5CF6', duration: 90 },
      ]},
      { day: 'Di', items: [
        { time: '09:00', title: 'Kroon plaatsing PFM', sub: 'Mevr. Hermans — fase 2/2', color: '#EF4444', duration: 90 },
        { time: '11:00', title: 'Periodontologie', sub: 'Dhr. Verbeke — tandsteen verwijdering', color: '#F59E0B', duration: 60 },
        { time: '13:30', title: 'Nieuwe patiënt intake', sub: 'Jan Vandenberghe — controle + reiniging', color: '#10B981', duration: 60 },
        { time: '15:30', title: 'Reiniging', sub: 'Mevr. De Smedt — kwartaalreiniging', color: '#06B6D4', duration: 45 },
      ]},
      { day: 'Wo', items: [
        { time: '08:30', title: '⚡ Spoed', sub: 'Dhr. Willems — kiespijn', color: '#EF4444', duration: 20 },
        { time: '09:30', title: 'Orthodontie check', sub: 'Tim (14j) — beugel maandelijks', color: '#8B5CF6', duration: 30 },
        { time: '11:00', title: 'Controle + reiniging', sub: 'Mevr. Janssen — jaarlijks', color: '#10B981', duration: 60 },
        { time: '14:00', title: 'Wortelkanaalbehandeling', sub: 'Dhr. Peters — fase 1/2', color: '#EF4444', duration: 90 },
      ]},
      { day: 'Do', items: [
        { time: '09:30', title: 'Implantaat fase 1', sub: 'Dhr. Claes — plaatsing schroef', color: '#EF4444', duration: 120 },
        { time: '13:00', title: 'Controle', sub: 'Fam. Peters — 3 kinderen (8, 11, 14j)', color: '#10B981', duration: 45 },
        { time: '15:00', title: 'Spalktherapie', sub: 'Mevr. Bogaert — kaakpijn', color: '#8B5CF6', duration: 60 },
      ]},
      { day: 'Vr', items: [
        { time: '10:00', title: 'Controle + reiniging', sub: 'Mevr. Claes — verplaatst', color: '#10B981', duration: 60 },
        { time: '11:30', title: 'Vulling', sub: 'Dhr. Lemmens — M4 composiet', color: '#F59E0B', duration: 45 },
        { time: '14:30', title: 'Reiniging + advies', sub: 'Mevr. Bogaert — preventief', color: '#06B6D4', duration: 45 },
      ]},
    ],
    adminItems: [
      { id: 'INV-2024-0312', date: '13/06/2024', desc: 'Controle + professionele reiniging', client: 'Mevr. A. Peeters', amount: 120.50, vat: 0, total: 120.50, status: 'Betaald', category: 'Preventieve zorg', behandelaar: 'Dr. Lemmens', mutualiteit: 'CM — €31.50 terugbetaald' },
      { id: 'INV-2024-0311', date: '13/06/2024', desc: 'Composietvulling M6 (klasse II)', client: 'Dhr. P. Maes', amount: 78, vat: 0, total: 78, status: 'Betaald', category: 'Restauratieve zorg', behandelaar: 'Dr. Lemmens', mutualiteit: 'Mutualiteit Solidaris — €21 terugbetaald' },
      { id: 'INV-2024-0310', date: '12/06/2024', desc: 'Porseleinen kroon op metaalbasis (PFM)', client: 'Mevr. K. Hermans', amount: 650, vat: 0, total: 650, status: 'Openstaand', category: 'Prothetische zorg', behandelaar: 'Dr. Lemmens', mutualiteit: 'OZ — €125 terugbetaald' },
      { id: 'INV-2024-0309', date: '12/06/2024', desc: 'Spoedconsultatie + pijnstilling', client: 'Dhr. T. Willems', amount: 55, vat: 0, total: 55, status: 'Betaald', category: 'Spoed', behandelaar: 'Dr. Claes', mutualiteit: 'CM — €18 terugbetaald' },
      { id: 'INV-2024-0308', date: '11/06/2024', desc: 'Tandimplantaat fase 1 — plaatsing titanium schroef', client: 'Dhr. R. Claes', amount: 1200, vat: 0, total: 1200, status: 'Openstaand', category: 'Implantologie', behandelaar: 'Dr. Lemmens', mutualiteit: 'Niet terugbetaald' },
      { id: 'INV-2024-0307', date: '10/06/2024', desc: 'Controle + reiniging + fluoride', client: 'Mevr. B. De Smedt', amount: 145, vat: 0, total: 145, status: 'Betaald', category: 'Preventieve zorg', behandelaar: 'Dr. Claes', mutualiteit: 'Helan — €31.50 terugbetaald' },
    ],
    agendaStats: { reminders: 22, noShows: 1, trend: '+8%', weekData: [10,12,11,13,12,8,0] },
    adminSummary: { total: 4850, count: 28, timeSaved: '8u 15m', openstaand: 1850 },
    accountManager: 'Lien Hermans',
    aiQuestions: [
      { q: 'Hoeveel no-shows hadden we deze maand?', a: 'Deze maand: 2 no-shows (vorig jaar gemiddeld: 15/maand → −87%).\n\nBeide patiënten zijn gecontacteerd:\n• Dhr. Maes → herplanning vrijdag 10:00 ✅\n• Mevr. Bogaert → nog geen reactie, 2e herinnering verstuurd\n\nDe automatische herinneringen 24u + 2u voor afspraak zijn verantwoordelijk voor deze daling.' },
      { q: 'Welke behandelingen zijn meest winstgevend?', a: 'Top behandelingen deze maand op marge:\n1. Implantaten — €1.200/behandeling (4 patiënten = €4.800)\n2. Bleekbehandelingen — €380/behandeling (7 patiënten = €2.660)\n3. Kronen — €650/behandeling (5 patiënten = €3.250)\n\nControles zijn hoogvolume (52 patiënten) maar laagste marge per behandeling.' },
      { q: 'Zijn er patiënten zonder jaarlijkse controle?', a: '23 actieve patiënten hadden meer dan 12 maanden geen controle.\n\nAutomatische uitnodiging verstuurd: ✅\n• 14 reageerden → afspraak ingepland\n• 9 nog geen reactie → follow-up gepland over 7 dagen\n\nVerwachte extra omzet: ~€3.335 (23 × €145)' },
      { q: 'Hoeveel reviews ontvingen we?', a: 'Dit jaar: 47 reviews\n• Google: 42 reviews — gem. 4.8★\n• Facebook: 5 reviews — gem. 4.6★\n\n3 negatieve reviews → allemaal persoonlijk opgevolgd → 2 klanten teruggekomen.' },
    ],
    report: {
      period: 'Week 24 — 10 t/m 14 juni 2024',
      highlights: [
        { label: 'Behandelingen', value: '68', trend: '+8%' },
        { label: 'No-shows', value: '1', trend: '−87%' },
        { label: 'Tevredenheid', value: '4.8★', trend: '+0.3' },
        { label: 'Omzet', value: '€4.850', trend: '+12%' },
      ],
      topAction: 'Implantaat Dhr. Claes fase 2 inplannen over 8 weken',
    },
  },

  {
    id: 'kinesisten',
    name: 'Kinesisten',
    color: '#F59E0B',
    icon: 'Activity',
    tagline: 'Meer therapietrouw, betere resultaten, minder administratie',
    automationBullets: [
      'Dagelijkse oefenherinneringen + video\'s automatisch per patiënt verstuurd',
      'Therapietrouw gestegen van 72% naar 94% via slimme check-ins',
      'Sessiereeksen, voortgangsrapporten & facturen volledig automatisch',
    ],
    metrics: [
      { label: 'Sessies vandaag', value: '8', delta: '+1', deltaPos: true, sparkline: [5,6,6,7,7,8,8] },
      { label: 'Therapietrouw', value: '94%', delta: '+22%', deltaPos: true, sparkline: [72,76,80,84,88,91,94] },
      { label: 'Actieve patiënten', value: '34', delta: '+3', deltaPos: true, sparkline: [28,29,30,31,32,33,34] },
      { label: 'Tijd bespaard vandaag', value: '3u 10m', delta: '+25m', deltaPos: true, sparkline: [2,2.2,2.5,2.6,2.8,3,3.17] },
    ],
    weekActivity: [5,7,6,8,7,5,0],
    activityFeed: [
      { time: '14:30', text: 'Oefenprogramma verstuurd — Ellen De Backer (dag 12/21)', icon: 'Bell', color: '#F59E0B' },
      { time: '14:00', text: 'Sessiereeks ingepland — Luc Vermeersch 8 sessies (di/do)', icon: 'Calendar', color: '#2563EB' },
      { time: '13:15', text: 'Voortgangsrapport gegenereerd — Tom Claes sessie 5/8', icon: 'FileText', color: '#8B5CF6' },
      { time: '12:30', text: 'Thuisoefeningen verstuurd — PDF + 3 video\'s — 4 patiënten', icon: 'Send', color: '#10B981' },
      { time: '11:45', text: 'Tevredenheidsenquête verstuurd — reeks afgerond Marc Pieters', icon: 'Star', color: '#F59E0B' },
      { time: '11:00', text: 'Check-in ontvangen — "Oefeningen gaan beter, pijn 4/10" (was 7/10)', icon: 'MessageSquare', color: '#10B981' },
      { time: '10:30', text: 'Sessiereeks verlengd — patiënt Van den Berg +4 sessies (goedgekeurd)', icon: 'RefreshCw', color: '#8B5CF6' },
      { time: '09:00', text: 'Dagplanning + oefenprogramma\'s gegenereerd — 8 sessies vandaag', icon: 'Layout', color: '#06B6D4' },
    ],
    liveItems: [
      'Oefenherinnering verstuurd — Marc Pieters dag 5/21 (rugprogramma)',
      'Check-in ontvangen — "Voelt al veel beter! 😊" (pijnscore: 3/10)',
      'Sessiereeks ingepland — nieuwe patiënt Kim Hermans (8 sessies)',
      'Thuisoefeningen verstuurd — An Bogaert sessie 3/8 (videoprogramma)',
    ],
    whatsapp: [
      {
        id: 'c1', contact: 'Ellen De Backer', avatar: 'ED', status: 'Reeks 3/8 — Heup',
        messages: [
          { from: 'ai', text: '🏃 Goedemorgen Ellen! Oefeningen dag 12:\n\n1️⃣ Heupstrekking — 3×30 sec (beide zijden)\n2️⃣ Gluteusactivatie — 3×15 reps\n3️⃣ Balans op 1 been — 2×45 sec\n\nVideos: [link]\n\nSucces! 💪', time: '08:00', delay: 'Automatisch om 08:00' },
          { from: 'client', text: 'Gedaan! Maar de heupstrekking links deed pijn (6/10).', time: '09:15' },
          { from: 'ai', text: 'Goed dat u dit meldt Ellen! 🙏\n\nPijn >5/10 is een signaal. Ik noteer dit voor Benedicte (sessie donderdag).\n\nTijdelijk: sla oefening 1 links over, doe wél rechts. Uw veiligheid eerst! 🛡️', time: '09:15', delay: '7 sec' },
        ]
      },
      {
        id: 'c2', contact: 'Marc Pieters', avatar: 'MP', status: 'Reeks 8/8 — Rug',
        messages: [
          { from: 'ai', text: 'Goedemiddag Marc 👋 Uw reeks is bijna klaar!\n\nVoortgang vandaag: pijnscore op schaal 1-10?', time: '12:00', delay: 'Automatisch' },
          { from: 'client', text: 'Een 3! Begon op 8 haha 😊', time: '12:10' },
          { from: 'ai', text: '🎉 Van 8 naar 3 — ongelooflijke vooruitgang Marc!\n\nBenedicte stelt 4 onderhoudssessies voor (1×/maand):\n📅 Eerste: vrijdag 12/07 om 14:00\n\nBevestigen?', time: '12:10', delay: '6 sec' },
        ]
      },
    ],
    email: {
      from: 'sarah.willems@outlook.com', subject: 'Nieuwe patiënt — doorverwijzing Dr. Janssen',
      original: 'Goedemiddag,\n\nDoorverwijzing van Dr. Janssen voor cervicale pijn (whiplash 2023). Wanneer kan ik terecht?\n\nSarah Willems',
      aiReply: 'Goedemiddag Sarah,\n\nCervicale revalidatie is onze specialiteit.\n\nIntake (45 min):\n📅 Maandag 17/06 om 09:00\n📅 Woensdag 19/06 om 14:00\n\nBreng het doorverwijsbriefje van Dr. Janssen mee.\n\nPraktijk Benedicte Claes',
      responseTime: '3 min 18 sec',
    },
    agenda: [
      { day: 'Ma', items: [
        { time: '09:00', title: 'Intake cervicaal', sub: 'Sarah Willems — whiplash', color: '#F59E0B', duration: 45 },
        { time: '10:30', title: 'Sessie 3/8 — Heup', sub: 'Ellen De Backer — heupflexoren', color: '#10B981', duration: 50 },
        { time: '11:30', title: 'Sessie 5/8 — Rug', sub: 'Tom Claes — lumbale stabilisatie', color: '#10B981', duration: 50 },
        { time: '14:00', title: 'Sessie 2/8 — Knie', sub: 'An Bogaert — post-operatief', color: '#10B981', duration: 50 },
        { time: '15:30', title: 'Sessie 7/8 — Rug', sub: 'Marc Pieters — functionele training', color: '#2563EB', duration: 50 },
      ]},
      { day: 'Di', items: [
        { time: '09:00', title: 'Sessie 1/8 — Rug', sub: 'Luc Vermeersch — intake + start', color: '#F59E0B', duration: 60 },
        { time: '11:00', title: 'Sessie 4/8 — Schouder', sub: 'Kim Hermans — rotator cuff', color: '#10B981', duration: 50 },
        { time: '14:00', title: 'Sessie 8/8 — Rug', sub: 'Marc Pieters — afsluiting + rapport', color: '#2563EB', duration: 60 },
      ]},
      { day: 'Wo', items: [
        { time: '09:30', title: 'Sessie 2/8 — Rug', sub: 'Luc Vermeersch — oefenprogramma', color: '#10B981', duration: 50 },
        { time: '11:00', title: 'Intake cervicaal', sub: 'Sarah Willems — alternatief moment', color: '#F59E0B', duration: 45 },
        { time: '13:00', title: 'Sessie 4/8 — Heup', sub: 'Ellen De Backer — progressie', color: '#10B981', duration: 50 },
      ]},
      { day: 'Do', items: [
        { time: '09:00', title: 'Sessie 6/8 — Rug', sub: 'Tom Claes — krachtontwikkeling', color: '#10B981', duration: 50 },
        { time: '10:30', title: 'Sessie 3/8 — Knie', sub: 'An Bogaert — loopanalyse', color: '#10B981', duration: 50 },
        { time: '14:30', title: 'Intake', sub: 'Nieuwe patiënt: Kim Hermans', color: '#F59E0B', duration: 45 },
      ]},
      { day: 'Vr', items: [
        { time: '09:00', title: 'Sessie 3/8 — Rug', sub: 'Luc Vermeersch — cardio integratie', color: '#10B981', duration: 50 },
        { time: '11:00', title: 'Onderhoud', sub: 'Marc Pieters — 1×/maand', color: '#8B5CF6', duration: 45 },
        { time: '14:00', title: 'Groepssessie', sub: 'Rugprogramma — 4 patiënten', color: '#F97316', duration: 60 },
      ]},
    ],
    adminItems: [
      { id: 'INV-2024-0089', date: '13/06/2024', desc: 'Kinesitherapie sessie 3/8 — heup (nomenclatuur 556110)', client: 'Mevr. E. De Backer', amount: 48, vat: 0, total: 48, status: 'Betaald', category: 'Kinesitherapie', behandelaar: 'Benedicte Claes', mutualiteit: 'CM — €28.60 terugbetaald' },
      { id: 'INV-2024-0088', date: '13/06/2024', desc: 'Kinesitherapie sessie 5/8 — rug (nomenclatuur 556110)', client: 'Dhr. T. Claes', amount: 48, vat: 0, total: 48, status: 'Betaald', category: 'Kinesitherapie', behandelaar: 'Benedicte Claes', mutualiteit: 'OZ — €28.60 terugbetaald' },
      { id: 'INV-2024-0087', date: '12/06/2024', desc: 'Afsluiting sessiereeks 8/8 + eindverslag', client: 'Dhr. M. Pieters', amount: 58, vat: 0, total: 58, status: 'Openstaand', category: 'Kinesitherapie', behandelaar: 'Benedicte Claes', mutualiteit: 'Helan — €28.60 terugbetaald' },
      { id: 'INV-2024-0086', date: '12/06/2024', desc: 'Intake + kinesitherapeutisch onderzoek', client: 'Mevr. S. Willems', amount: 65, vat: 0, total: 65, status: 'Betaald', category: 'Intake', behandelaar: 'Benedicte Claes', mutualiteit: 'CM — €18 terugbetaald' },
      { id: 'INV-2024-0085', date: '11/06/2024', desc: 'Sessiepakket 8× kinesitherapie — vooraf betaald', client: 'Dhr. L. Vermeersch', amount: 384, vat: 0, total: 384, status: 'Betaald', category: 'Pakket', behandelaar: 'Benedicte Claes', mutualiteit: 'Mutualiteit Solidaris' },
      { id: 'INV-2024-0084', date: '10/06/2024', desc: 'Kinesitherapie sessie 2/8 — knie post-operatief', client: 'Mevr. A. Bogaert', amount: 48, vat: 0, total: 48, status: 'Betaald', category: 'Kinesitherapie', behandelaar: 'Benedicte Claes', mutualiteit: 'CM — €28.60 terugbetaald' },
    ],
    agendaStats: { reminders: 18, noShows: 0, trend: '+15%', weekData: [5,6,5,7,6,4,0] },
    adminSummary: { total: 2840, count: 42, timeSaved: '9u 30m', openstaand: 506 },
    accountManager: 'Pieter Jacobs',
    aiQuestions: [
      { q: 'Wat is de therapietrouw deze maand?', a: 'Therapietrouw juni: 94% (oefeningen thuis uitgevoerd).\nVorige maand: 72% → stijging van +22%\n\nDankzij automatische dagelijkse herinneringen + video-oefenprogramma\'s.\n\nEnkele patiënten met lage trouw:\n• 1 patiënt: 68% (pijn als reden → sessie aanpassen)\n• 2 patiënten: 78% (werkdrukte → herinnering verschoven naar 07:30)' },
      { q: 'Welke patiënten ronden hun reeks af?', a: 'Reeksen die deze week afronden:\n• Marc Pieters — sessie 8/8 dinsdag → onderhoud aangeboden ✅\n• Tom Claes — sessie 8/8 donderdag → verlenging +4 sessies aanbevolen\n\nWil ik automatisch tevredenheidsenquête + verlengingsvoorstel sturen?' },
      { q: 'Stuur oefeningen naar alle actieve patiënten', a: '✅ Gepersonaliseerde oefenprogramma\'s verstuurd naar 12 actieve patiënten via WhatsApp:\n• PDF met oefeningen (aangepast per fase)\n• 3 videodemonstraties per patiënt\n• Moeilijkheidsgraad aangepast op laatste voortgangscheck\n\nGeschatte tijdsbesparing: 42 minuten vs. manueel versturen.' },
      { q: 'Genereer voortgangsrapporten', a: '✅ 8 voortgangsrapporten gegenereerd:\n• Ellen De Backer (heup): pijnscore 8→4 | mobiliteit +35%\n• Tom Claes (rug): pijnscore 7→3 | kracht +28%\n• Marc Pieters (rug): pijnscore 8→3 | functioneel herstel 85%\n\nRapporten verstuurd naar behandelend arts én patiënt.' },
    ],
    report: {
      period: 'Week 24 — 10 t/m 14 juni 2024',
      highlights: [
        { label: 'Sessies', value: '38', trend: '+12%' },
        { label: 'Therapietrouw', value: '94%', trend: '+22%' },
        { label: 'Gem. pijnreductie', value: '−58%', trend: 'vs intake' },
        { label: 'Omzet', value: '€2.840', trend: '+8%' },
      ],
      topAction: '3 patiënten ronden reeks af deze week — verlengingsvoorstel versturen',
    },
  },

  {
    id: 'accountants',
    name: 'Accountants',
    color: '#8B5CF6',
    icon: 'FileText',
    tagline: 'Van factuur tot aangifte — volledig geautomatiseerd, 0 deadlines gemist',
    automationBullets: [
      'Facturen automatisch ingelezen via OCR & gecategoriseerd met 98.7% nauwkeurigheid',
      'Bankafschriften automatisch gematcht — gemiddeld 94% match-ratio',
      'BTW-aangiftes, jaarrekeningen & deadlineherinneringen volledig geautomatiseerd',
    ],
    metrics: [
      { label: 'Facturen verwerkt vandaag', value: '23', delta: '+5', deltaPos: true, sparkline: [12,15,14,18,20,21,23] },
      { label: 'Gemiddelde verwerkingstijd', value: '2.1 min', delta: '−74%', deltaPos: true, sparkline: [8,7,6,5,4,3,2.1] },
      { label: 'Deadlines gemist', value: '0', delta: 'dit jaar', deltaPos: true, sparkline: [0,0,0,0,0,0,0] },
      { label: 'Tijd bespaard deze week', value: '14u', delta: '+2u', deltaPos: true, sparkline: [8,9,10,11,12,13,14] },
    ],
    weekActivity: [14,20,17,24,20,9,0],
    activityFeed: [
      { time: '14:50', text: 'Factuur verwerkt — Proximus NV €450 → Telecom (99% zekerheid)', icon: 'FileCheck', color: '#8B5CF6' },
      { time: '14:30', text: 'Bankafschrift gematcht — 14/14 transacties — Bakkerij Claes', icon: 'CheckCircle', color: '#10B981' },
      { time: '13:45', text: 'BTW-deadline herinnering verstuurd — De Smedt BVBA (7 dagen)', icon: 'Bell', color: '#EF4444' },
      { time: '13:20', text: 'BTW-voorbereiding voltooid — Lemmens & Partners Q2 klaar', icon: 'Calculator', color: '#8B5CF6' },
      { time: '12:30', text: 'Factuur verwerkt — Belfius Lease €1.250 → Investeringen', icon: 'FileCheck', color: '#8B5CF6' },
      { time: '11:45', text: 'Jaarrekening herinnering — 3 klanten, deadline 30/06', icon: 'AlertCircle', color: '#EF4444' },
      { time: '11:00', text: 'OCR batch voltooid — 23 facturen Horeca Verbeke (98.7%)', icon: 'Scan', color: '#06B6D4' },
      { time: '10:15', text: 'Bankafschrift mei verwerkt — Transport Willems (12/12)', icon: 'Building', color: '#10B981' },
    ],
    liveItems: [
      'Factuur verwerkt — Total Energie NV €890 → Energie & Nutsvoorzieningen',
      'Bankafschrift gematcht — 8/8 — Apotheek Van Dam',
      'BTW-aangifte gereed voor controle — Horeca Verbeke Q2',
      'Ontbrekende docs herinnering verstuurd — klant Claes & Zonen',
    ],
    whatsapp: [
      {
        id: 'c1', contact: 'Bakkerij Claes', avatar: 'BC', status: 'BTW-kwartaal klant',
        messages: [
          { from: 'client', text: 'Wanneer is mijn BTW-aangifte Q2 klaar? Deadline 20/06?', time: '10:30' },
          { from: 'ai', text: 'Goedemorgen! Status BTW Q2 Bakkerij Claes:\n\n📊 Verwerkt: 94% (47/50 facturen)\n⏳ Afronding: vandaag ~16:00\n✅ Deadline 20/06 — 6 dagen buffer\n\nU ontvangt een bericht voor goedkeuring via het portaal.', time: '10:30', delay: '8 sec' },
        ]
      },
      {
        id: 'c2', contact: 'De Smedt BVBA', avatar: 'DS', status: 'Prioriteit: BTW deadline',
        messages: [
          { from: 'ai', text: '⚠️ Herinnering: BTW Q2 deadline over 7 dagen (20/06).\n\nNog ontbrekend: facturen mei (14 stuks).\n\nUpload via portaal of stuur naar docs@kantoor.be', time: '13:45', delay: 'Automatisch' },
          { from: 'client', text: 'Sorry ik stuur ze vanavond door!', time: '14:10' },
          { from: 'ai', text: 'Dank u! Zodra ontvangen starten we onmiddellijk. ⚡\n\nWe halen de deadline zeker. 👍', time: '14:10', delay: '4 sec' },
        ]
      },
    ],
    email: {
      from: 'info@transportwillems.be', subject: 'Facturen maart — upload fout',
      original: 'Goedemiddag, uploadprobleem met 12 facturen maart (PDF fout). Stuur ze als bijlage.\n\nKoen Willems',
      aiReply: 'Goedemiddag Koen,\n\n12 facturen ontvangen ✅\n📊 Verwerkingstijd: ~15 min\n✅ Klaar in uw portaal voor 17:00\n\nUploadprobleem (PDF v1.7+) wordt woensdag opgelost. Excuses!\n\nKantoor Peeters & Maes',
      responseTime: '1 min 52 sec',
    },
    documentProcessing: [
      { date: '13/06', supplier: 'Proximus NV', amount: '€ 450', category: 'Telecom', ocr: 'Verwerkt', confidence: '99%', bankMatch: true, vatCode: '6701' },
      { date: '13/06', supplier: 'Belfius Lease', amount: '€ 1.250', category: 'Investeringen', ocr: 'Verwerkt', confidence: '98%', bankMatch: true, vatCode: '2300' },
      { date: '13/06', supplier: 'Esso Belgium', amount: '€ 185', category: 'Brandstof', ocr: 'Verwerkt', confidence: '97%', bankMatch: false, vatCode: '6100' },
      { date: '12/06', supplier: 'Colruyt Groothandel', amount: '€ 2.340', category: 'Aankopen', ocr: 'Verwerkt', confidence: '99%', bankMatch: true, vatCode: '6000' },
      { date: '12/06', supplier: 'DHL Express', amount: '€ 67', category: 'Transport', ocr: 'In behandeling', confidence: '94%', bankMatch: false, vatCode: '6120' },
      { date: '11/06', supplier: 'Securitas NV', amount: '€ 320', category: 'Beveiliging', ocr: 'Verwerkt', confidence: '99%', bankMatch: true, vatCode: '6150' },
    ],
    agenda: [
      { day: 'Ma', items: [
        { time: '09:00', title: 'Klantmeeting', sub: 'Transport Willems — jaarrekening 2023', color: '#8B5CF6', duration: 60 },
        { time: '14:00', title: 'BTW Q2 verwerking', sub: '6 klanten — deadline 20/06', color: '#EF4444', duration: 180 },
      ]},
      { day: 'Di', items: [
        { time: '10:00', title: 'Boekhouding', sub: 'Horeca Verbeke — mei + juni', color: '#8B5CF6', duration: 120 },
        { time: '14:30', title: 'Klantmeeting', sub: 'Lemmens & Partners — audit prep', color: '#8B5CF6', duration: 90 },
      ]},
      { day: 'Wo', items: [
        { time: '09:00', title: 'BTW-aangiftes', sub: 'Bakkerij Claes + 3 andere', color: '#EF4444', duration: 180 },
        { time: '13:00', title: 'Jaarrekening', sub: 'De Smedt BVBA — 2023', color: '#F59E0B', duration: 120 },
      ]},
      { day: 'Do', items: [
        { time: '10:00', title: 'Onboarding', sub: 'Nieuw klant: Apotheek Van Dam', color: '#10B981', duration: 90 },
        { time: '15:00', title: 'BTW controle', sub: 'Finale check alle Q2-aangiftes', color: '#EF4444', duration: 60 },
      ]},
      { day: 'Vr', items: [
        { time: '09:30', title: 'Boekhouding', sub: 'Bouwbedrijf Hermans — kwartaal', color: '#8B5CF6', duration: 120 },
        { time: '14:00', title: 'Weekrapport', sub: 'Statusoverzicht alle 34 klanten', color: '#10B981', duration: 60 },
      ]},
    ],
    adminItems: [
      { id: 'INV-2024-0445', date: '13/06/2024', desc: 'Maandelijkse boekhouding — Transport Willems', client: 'Transport Willems BV', amount: 350, vat: 73.50, total: 423.50, status: 'Betaald', category: 'Boekhouding' },
      { id: 'INV-2024-0444', date: '13/06/2024', desc: 'BTW-aangifte Q2 2024', client: 'Bakkerij Claes VOF', amount: 180, vat: 37.80, total: 217.80, status: 'Openstaand', category: 'BTW' },
      { id: 'INV-2024-0443', date: '12/06/2024', desc: 'Jaarrekening 2023 + neerlegging', client: 'De Smedt BVBA', amount: 950, vat: 199.50, total: 1149.50, status: 'Openstaand', category: 'Jaarrekening' },
      { id: 'INV-2024-0442', date: '12/06/2024', desc: 'Maandelijkse boekhouding — mei 2024', client: 'Horeca Verbeke NV', amount: 420, vat: 88.20, total: 508.20, status: 'Betaald', category: 'Boekhouding' },
      { id: 'INV-2024-0441', date: '11/06/2024', desc: 'Audit voorbereiding + dossier', client: 'Lemmens & Partners BV', amount: 1200, vat: 252, total: 1452, status: 'Openstaand', category: 'Audit' },
      { id: 'INV-2024-0440', date: '10/06/2024', desc: 'Oprichting BVBA + statuten', client: 'Nieuw klant', amount: 750, vat: 157.50, total: 907.50, status: 'Betaald', category: 'Juridisch' },
    ],
    agendaStats: { reminders: 8, noShows: 0, trend: '+5%', weekData: [3,3,4,2,3,0,0] },
    adminSummary: { total: 12400, count: 31, timeSaved: '14u 45m', openstaand: 2601.30 },
    accountManager: 'Lien Hermans',
    aiQuestions: [
      { q: 'Welke BTW-deadlines komen eraan?', a: 'Aankomende BTW-deadlines:\n• 20/06 — Q2 aangifte: 8 klanten\n  ✅ Klaar: 6 | ⏳ Wachten op docs: 2\n• 30/06 — Jaarrekeningen: 3 klanten\n• 15/07 — Q2 buitenlandse klant\n\n0 risico op gemiste deadlines. Alle herinneringen verstuurd.' },
      { q: 'Hoeveel facturen verwerkt deze maand?', a: 'Juni tot nu: 234 facturen verwerkt voor 34 klanten.\n\nOCR statistieken:\n• Nauwkeurigheid: 98.7%\n• Gemiddelde verwerkingstijd: 2.1 min (vs 8 min manueel)\n• Bank match-ratio: 94%\n• Tijdsbesparing: ~21 uur' },
      { q: 'Zijn er openstaande facturen bij klanten?', a: 'Openstaande klantfacturen:\n• 7 facturen — totaal €4.850\n• Oudste: Transport Willems — 42 dagen\n• Gemiddelde betalingstermijn: 18 dagen (30 dagen normaal)\n\n→ Betalingsherinneringen sturen voor >30 dagen? [Ja / Nee]' },
      { q: 'Status alle BTW-aangiftes Q2', a: 'BTW Q2 statusoverzicht (8 klanten):\n✅ Klaar (6): Bakkerij Claes, Transport Willems, Horeca Verbeke, Lemmens, Apotheek Van Dam, Bouwbedrijf Hermans\n⏳ Wachten op docs (2): De Smedt BVBA (facturen mei ontbrekend), Claes & Zonen\n\nDeadline 20/06 — 7 dagen resterend.' },
    ],
    report: {
      period: 'Week 24 — 10 t/m 14 juni 2024',
      highlights: [
        { label: 'Facturen verwerkt', value: '234', trend: '+12%' },
        { label: 'OCR nauwkeurigheid', value: '98.7%', trend: '+0.3%' },
        { label: 'Deadlines gemist', value: '0', trend: '0 dit jaar' },
        { label: 'Tijd bespaard', value: '14u', trend: '+2u' },
      ],
      topAction: 'De Smedt BVBA: facturen mei nog ontbrekend — actie vereist voor 20/06',
    },
  },

  {
    id: 'architecten',
    name: 'Architecten',
    color: '#EF4444',
    icon: 'PenTool',
    tagline: 'Projecten op schema, klanten geïnformeerd, facturen automatisch',
    automationBullets: [
      'Automatische projectstatusberichten bij elke mijlpaal',
      'Vergadernotulen gegenereerd binnen 5 min na meeting',
      'Offertes per fase & factuurherinneringen volledig automatisch',
    ],
    metrics: [
      { label: 'Actieve projecten', value: '6', delta: '+1', deltaPos: true, sparkline: [4,4,5,5,5,6,6] },
      { label: 'Gem. responstijd klant', value: '3m 45s', delta: '−45%', deltaPos: true, sparkline: [8,7,6,5,4.5,4,3.75] },
      { label: 'Offertes geaccepteerd', value: '78%', delta: '+12%', deltaPos: true, sparkline: [60,64,68,70,74,76,78] },
      { label: 'Tijd bespaard vandaag', value: '2u 30m', delta: '+20m', deltaPos: true, sparkline: [1.5,1.8,2,2.1,2.2,2.3,2.5] },
    ],
    weekActivity: [2,3,4,3,5,2,0],
    activityFeed: [
      { time: '14:40', text: 'Offerte verstuurd — renovatieproject Verbeke €42.000 (fase 1-5)', icon: 'FileText', color: '#EF4444' },
      { time: '14:10', text: 'Werfbezoek ingepland — Villa Janssens woe 14:00 (klantbezoek)', icon: 'Calendar', color: '#2563EB' },
      { time: '13:30', text: 'Notulen opgesteld — meeting Appartementen Hasselt (8 pagina\'s)', icon: 'PenTool', color: '#8B5CF6' },
      { time: '12:45', text: 'Projectupdate verstuurd — De Smedt: fase 2 ruwbouw 75%', icon: 'Send', color: '#10B981' },
      { time: '12:00', text: 'Factuur verstuurd — fase 2 project Claes €18.500', icon: 'Receipt', color: '#F59E0B' },
      { time: '11:15', text: 'Vergunningsdossier herinnering — deadline Hasselt 30/06', icon: 'AlertCircle', color: '#EF4444' },
      { time: '10:30', text: 'Mijlpaal bereikt — Villa Janssens: ruwbouw voltooid ✅', icon: 'CheckCircle', color: '#10B981' },
      { time: '09:15', text: 'Nieuwe aanvraag — uitbreiding horecazaak Pieters (40m²)', icon: 'UserPlus', color: '#10B981' },
    ],
    liveItems: [
      'Mijlpaal update verstuurd — project Claes: fase 3 gestart',
      'Offerte goedgekeurd — project Verbeke (+€42.000)',
      'Notulen verstuurd — vergadering Appartementen Hasselt',
      'Werfbezoek bevestigd — project De Smedt vr 10:00',
    ],
    whatsapp: [
      {
        id: 'c1', contact: 'Familie De Smedt', avatar: 'FD', status: 'Project ARCH-2024-012',
        messages: [
          { from: 'client', text: 'Wat is de status van ons renovatieproject?', time: '12:30' },
          { from: 'ai', text: 'Update project ARCH-2024-012:\n\n📊 Fase 2/5 — Ruwbouw: 75%\n📅 Oplevering fase 2: 28 juni\n⏭️ Volgende mijlpaal: Dakwerken (start 1 juli)\n💰 Budget: op schema\n\nAlles loopt perfect!', time: '12:30', delay: '10 sec' },
          { from: 'client', text: 'Wanneer kunnen we de werf bezoeken?', time: '12:33' },
          { from: 'ai', text: 'Werfbezoek opties:\n📅 Woensdag 19/06 om 14:00\n📅 Vrijdag 21/06 om 10:00\n\nWelk moment?', time: '12:33', delay: '6 sec' },
        ]
      },
      {
        id: 'c2', contact: 'Dhr. Verbeke', avatar: 'DV', status: 'Offerte fase',
        messages: [
          { from: 'client', text: 'Offerte ontvangen. Wanneer kunnen jullie starten?', time: '14:05' },
          { from: 'ai', text: 'Bij akkoord voor 14/06:\n\n📅 Vergunningsdossier: week 25\n📅 Indiening: 1 juli\n📅 Vergunning (verwacht): september\n📅 Start werken: oktober\n\nGesprek inplannen?', time: '14:06', delay: '9 sec' },
        ]
      },
    ],
    email: {
      from: 'marie.claes@gmail.com', subject: 'Bijgebouw 40m² — advies nodig',
      original: 'Goedemiddag, wij denken aan een bijgebouw (40m²). Vergunning, kosten, tijdsduur?\n\nMarie Claes',
      aiReply: 'Goedemiddag Marie,\n\n✅ Haalbaar!\n📋 Vergunning: ja vereist\n⏱️ Procedure: 60-90 dagen\n💰 Budget: €60.000-€90.000\n🗓️ Oplevering: voorjaar 2025\n\nGratis kennismakingsgesprek:\n📅 Di 18/06 om 17:30\n📅 Do 20/06 om 12:00\n\nArchitectenbureau Hermans & Partners',
      responseTime: '5 min 08 sec',
    },
    agenda: [
      { day: 'Ma', items: [
        { time: '09:00', title: 'Werfbezoek', sub: 'Project Claes — fase 2 inspectie', color: '#EF4444', duration: 90 },
        { time: '14:00', title: 'Intake meeting', sub: 'Nieuwe aanvraag: Horecazaak Pieters', color: '#10B981', duration: 60 },
      ]},
      { day: 'Di', items: [
        { time: '09:00', title: 'Tekenwerk', sub: 'Villa Janssens — plannen fase 3/6', color: '#EF4444', duration: 180 },
        { time: '17:30', title: 'Kennismakingsgesprek', sub: 'Familie Claes — bijgebouw 40m²', color: '#10B981', duration: 30 },
      ]},
      { day: 'Wo', items: [
        { time: '10:00', title: 'Projectmeeting', sub: 'Villa Janssens — volledig team', color: '#8B5CF6', duration: 120 },
        { time: '14:00', title: 'Werfbezoek klant', sub: 'Project De Smedt — fam. De Smedt', color: '#EF4444', duration: 60 },
      ]},
      { day: 'Do', items: [
        { time: '09:00', title: 'Vergunningsdossier', sub: 'Appartementen Hasselt — finalisatie', color: '#F59E0B', duration: 180 },
        { time: '12:00', title: 'Kennismakingsgesprek', sub: 'Mevr. Claes — bijgebouw', color: '#10B981', duration: 30 },
      ]},
      { day: 'Vr', items: [
        { time: '10:00', title: 'Werfbezoek klant', sub: 'Project De Smedt — fam. De Smedt', color: '#EF4444', duration: 60 },
        { time: '14:00', title: 'Tekenwerk', sub: 'Bijgebouw fam. Willems — 1e concept', color: '#EF4444', duration: 120 },
      ]},
    ],
    adminItems: [
      { id: 'INV-2024-0067', date: '13/06/2024', desc: 'Offerte renovatie compleet — fase 1 t/m 5', client: 'Dhr. R. Verbeke', amount: 42000, vat: 8820, total: 50820, status: 'Openstaand', category: 'Offerte/Bestelling' },
      { id: 'INV-2024-0066', date: '12/06/2024', desc: 'Architectenhonorarium fase 2 — ruwbouw + stabiliteit', client: 'Fam. Claes', amount: 18500, vat: 3885, total: 22385, status: 'Betaald', category: 'Honorarium' },
      { id: 'INV-2024-0065', date: '11/06/2024', desc: 'Vergunningsdossier + EPB-aangifte', client: 'Appartementen Hasselt NV', amount: 3200, vat: 672, total: 3872, status: 'Betaald', category: 'Administratie' },
      { id: 'INV-2024-0064', date: '10/06/2024', desc: 'Architectenhonorarium fase 1 — ontwerp + vergunning', client: 'Villa Janssens', amount: 12000, vat: 2520, total: 14520, status: 'Openstaand', category: 'Honorarium' },
      { id: 'INV-2024-0063', date: '07/06/2024', desc: 'Architectenhonorarium fase 3 — uitvoering', client: 'Fam. De Smedt', amount: 15750, vat: 3307.50, total: 19057.50, status: 'Betaald', category: 'Honorarium' },
    ],
    agendaStats: { reminders: 6, noShows: 1, trend: '+18%', weekData: [2,3,3,2,3,1,0] },
    adminSummary: { total: 91450, count: 12, timeSaved: '5u 45m', openstaand: 37305 },
    accountManager: 'Pieter Jacobs',
    aiQuestions: [
      { q: 'Status alle actieve projecten', a: 'Overzicht 6 actieve projecten:\n• Villa Janssens — fase 3/6 (42%) — op schema\n• Project Claes — fase 2/5 (75%) — 1 week voor schema\n• Project De Smedt — fase 2/5 (15%) — gestart\n• Appartementen Hasselt — vergunningsfase (60 dgn wachten)\n• Project Verbeke — offerte geaccepteerd, start oktober\n• Bijgebouw Willems — tekenwerk fase (nieuw)' },
      { q: 'Welke facturen zijn openstaand?', a: 'Openstaande facturen: 2 dossiers — totaal €37.305\n• Offerte Verbeke: €50.820 (offerte goedgekeurd, aanbetaling 30% verwacht)\n• Villa Janssens fase 1: €14.520 — 18 dagen open\n\n→ Betalingsherinnering sturen voor Villa Janssens? [Ja]' },
      { q: 'Genereer notulen laatste meeting', a: '✅ Notulen gegenereerd — Meeting Appartementen Hasselt (12/06):\n\n1. Vergunningsstatus: indiening verwacht 1 juli\n2. EPB-eisen: aanpassing isolatiewaarden nodig (architect Hermans)\n3. Budget: €2.400 meerwerk stabiliteitsstudie goedgekeurd\n4. Volgende meeting: 26/06 om 10:00\n\nVerstuurd naar alle aanwezigen (8 personen) ✅' },
      { q: 'Hoeveel leads hadden we deze week?', a: 'Deze week: 5 nieuwe projectaanvragen\n• 3 via website contactformulier\n• 1 via aanbeveling (klant Villa Janssens)\n• 1 open huis\n\nIngepland voor gesprek: 3 | Offerte verzonden: 1 | In behandeling: 1\nPotentiële omzet nieuw werk: ±€180.000' },
    ],
    report: {
      period: 'Week 24 — 10 t/m 14 juni 2024',
      highlights: [
        { label: 'Actieve projecten', value: '6', trend: '+1' },
        { label: 'Offerteconversie', value: '78%', trend: '+12%' },
        { label: 'Openstaande omzet', value: '€91.450', trend: '+8%' },
        { label: 'Nieuwe aanvragen', value: '5', trend: '+2' },
      ],
      topAction: 'Vergunningsdossier Appartementen Hasselt indienen voor 30/06',
    },
  },

  {
    id: 'garage',
    name: 'Garagebedrijven',
    color: '#06B6D4',
    icon: 'Wrench',
    tagline: 'Minder telefoontjes, snellere betalingen, meer trouwe klanten',
    automationBullets: [
      'Klant automatisch verwittigd zodra voertuig klaar + betaallink WhatsApp',
      'Slimme onderhoudsherinneringen op basis van km-stand & datum',
      'Werkorders, offertes & facturen in één klik aangemaakt',
    ],
    metrics: [
      { label: 'Voertuigen vandaag', value: '7', delta: '+2', deltaPos: true, sparkline: [4,5,5,6,6,7,7] },
      { label: 'Herstellingen deze maand', value: '68', delta: '+8', deltaPos: true, sparkline: [55,58,60,62,64,66,68] },
      { label: 'Gem. betalingstermijn', value: '0.8 dgn', delta: '−85%', deltaPos: true, sparkline: [5.5,4.5,3.5,2.5,1.8,1.2,0.8] },
      { label: 'Tijd bespaard vandaag', value: '2u 15m', delta: '+10m', deltaPos: true, sparkline: [1.5,1.6,1.8,1.9,2,2.1,2.25] },
    ],
    weekActivity: [8,11,9,13,11,7,0],
    activityFeed: [
      { time: '14:55', text: 'VW Golf Claes klaar — verwittigd + betaallink verstuurd', icon: 'Bell', color: '#06B6D4' },
      { time: '14:20', text: 'Betaling ontvangen €245 — dhr. Claes (link geopend na 4 min)', icon: 'CheckCircle', color: '#10B981' },
      { time: '13:45', text: 'Offerte verstuurd — BMW 320i transmissie €850 — Hermans', icon: 'FileText', color: '#8B5CF6' },
      { time: '13:00', text: 'Onderhoudsherinnering — Toyota Yaris Janssen (14.850 km)', icon: 'Bell', color: '#F59E0B' },
      { time: '12:30', text: 'APK afspraak bevestigd — Peugeot 308 Di 09:00', icon: 'Calendar', color: '#2563EB' },
      { time: '11:45', text: 'Werkorder aangemaakt — Mercedes airco Mevr. Peters', icon: 'Clipboard', color: '#8B5CF6' },
      { time: '11:00', text: '17 onderhoudsherinneringen verstuurd (jaarlijkse beurt batch)', icon: 'Bell', color: '#F59E0B' },
      { time: '09:30', text: 'Werkplaatsplanning gegenereerd — 7 voertuigen vandaag', icon: 'Layout', color: '#06B6D4' },
    ],
    liveItems: [
      'Betaling ontvangen — Toyota Yaris Janssen €189 (na herinnering)',
      'Werkorder aangemaakt — Renault Clio airco probleem',
      'Voertuig klaar — Opel Corsa Willems, verwittigd',
      '3 nieuwe onderhoudsherinneringen automatisch verstuurd',
    ],
    whatsapp: [
      {
        id: 'c1', contact: 'Dhr. Claes — VW Golf', avatar: 'DC', status: 'Voertuig klaar ✅',
        messages: [
          { from: 'ai', text: '🔧 Uw VW Golf is klaar!\n\n1-ABC-234 | Volkswagen Golf 1.4 TSI\nWerken: Remmen voor+achter, olieverversing\n💰 Factuur: €245,00\n\n✅ Betaal via: pay.garage-vermeersch.be/CL245\n\n📄 Factuur als PDF via de betaallink.', time: '14:10', delay: 'Automatisch verstuurd' },
          { from: 'client', text: 'Super! Wanneer kan ik hem afhalen?', time: '14:15' },
          { from: 'ai', text: 'Klaar voor afhaling! 🚗\n\n⏰ Vandaag tot 18:00\n📍 Industrielaan 45, 3500 Hasselt\n\nU betaalde al — gewoon ophalen. 👍\nParking rechts bij ingang.', time: '14:15', delay: '6 sec' },
        ]
      },
      {
        id: 'c2', contact: 'Mevr. Janssen — Toyota Yaris', avatar: 'MJ', status: 'Onderhoud herinnering',
        messages: [
          { from: 'ai', text: '🚗 Herinnering voor uw Toyota Yaris 2-XYZ-789\n\n📍 14.850 km bereikt — tijd voor jaarlijkse beurt!\n\n🔧 Aanbevolen:\n• Olieverversing (€45)\n• Lucht- & oliefilter (€38)\n• Remcontrole (€25 + eventueel onderdelen)\n• Vloeistoffen aanvullen (inbegrepen)\n\n💰 Totaal geschat: €189\n\nAfspraak inplannen?', time: '11:00', delay: 'Automatisch' },
          { from: 'client', text: 'Ja graag!', time: '11:20' },
          { from: 'ai', text: 'Morgen nog 1 plek! 🎯\n📅 Woensdag 19/06 om 08:30 (±90 min)\n\nBevestig met ✅ of geef een alternatieve datum.', time: '11:20', delay: '5 sec' },
          { from: 'client', text: '✅', time: '11:22' },
          { from: 'ai', text: 'Bevestigd! 🎉\n📅 Woensdag 19/06 om 08:30\n📍 Industrielaan 45, Hasselt\n\nU ontvangt dinsdagochtend een herinnering. Tot woensdag!', time: '11:22', delay: '4 sec' },
        ]
      },
    ],
    email: {
      from: 'tom.hermans@telenet.be', subject: 'Offerte herstelling BMW 320i',
      original: 'Dag, mijn BMW 320i (2018, 95.000 km) maakt geluid bij optrekken. Vermoedelijk transmissie. Offerte?\n\nTom Hermans',
      aiReply: 'Dag Tom,\n\nKan transmissie, koppeling of aandrijfassen zijn.\n\nGratis diagnosegesprek (30 min):\n📅 Dinsdag 18/06 om 08:30\n📅 Donderdag 20/06 om 14:00\n\nNa diagnose: gedetailleerde offerte vóór goedkeuring.\n\nGarage Vermeersch & Zonen',
      responseTime: '3 min 35 sec',
    },
    agenda: [
      { day: 'Ma', items: [
        { time: '08:00', title: 'Remmen + olieverversing', sub: 'VW Golf 1-ABC-234 — Dhr. Claes', color: '#06B6D4', duration: 90, status: 'Klaar' },
        { time: '10:00', title: 'APK keuring', sub: 'Ford Focus 3-DEF-567 — Verbeke', color: '#F59E0B', duration: 45 },
        { time: '14:00', title: 'Koelwatersysteem', sub: 'Audi A3 5-GHI-890 — Peters', color: '#EF4444', duration: 120 },
      ]},
      { day: 'Di', items: [
        { time: '08:30', title: 'Gratis diagnose', sub: 'BMW 320i — Dhr. Hermans (transmissie)', color: '#8B5CF6', duration: 30 },
        { time: '09:30', title: 'Herstelling', sub: 'BMW 320i — Hermans (na offerte OK)', color: '#EF4444', duration: 180 },
      ]},
      { day: 'Wo', items: [
        { time: '08:30', title: 'Jaarlijks onderhoud', sub: 'Toyota Yaris 2-XYZ-789 — Janssen', color: '#06B6D4', duration: 90 },
        { time: '10:30', title: 'Airco herstelling', sub: 'Mercedes A-klasse — Mevr. Peters', color: '#EF4444', duration: 120 },
        { time: '14:00', title: 'APK + kleine beurt', sub: 'Peugeot 308 — De Wolf', color: '#F59E0B', duration: 90 },
      ]},
      { day: 'Do', items: [
        { time: '09:00', title: 'Transmissie herstelling', sub: 'Skoda Octavia — Willems', color: '#EF4444', duration: 240 },
        { time: '14:00', title: 'Routineonderhoud', sub: 'Opel Corsa — 2 klanten', color: '#06B6D4', duration: 90 },
      ]},
      { day: 'Vr', items: [
        { time: '08:00', title: 'Bandenwisseling', sub: '4 klanten — seizoenswisseling', color: '#10B981', duration: 120 },
        { time: '11:00', title: 'Jaarlijks onderhoud', sub: 'Renault Clio — Mevr. De Backer', color: '#06B6D4', duration: 90 },
        { time: '14:00', title: 'Bandenopslag', sub: 'Winterbanden — 6 sets', color: '#10B981', duration: 60 },
      ]},
    ],
    adminItems: [
      { id: 'WO-2024-0234', date: '13/06/2024', desc: 'Remmen voor+achter + olieverversing 5W30', client: 'Dhr. R. Claes — VW Golf 1-ABC-234', amount: 204.13, vat: 42.87, total: 245, status: 'Betaald', category: 'Onderhoud', mileage: '87.234 km', nextService: '97.234 km' },
      { id: 'WO-2024-0233', date: '13/06/2024', desc: 'APK keuring 2024 — geslaagd', client: 'Dhr. P. Verbeke — Ford Focus 3-DEF-567', amount: 53.72, vat: 11.28, total: 65, status: 'Betaald', category: 'Keuring', mileage: '124.560 km', nextService: '134.560 km' },
      { id: 'WO-2024-0232', date: '12/06/2024', desc: 'Koelwatersysteem — waterpomp + thermostaatklep', client: 'Mevr. A. Peters — Audi A3 5-GHI-890', amount: 347.11, vat: 72.89, total: 420, status: 'Openstaand', category: 'Herstelling', mileage: '98.450 km', nextService: '108.450 km' },
      { id: 'WO-2024-0231', date: '12/06/2024', desc: 'Routineonderhoud — olie + filters', client: 'Dhr. J. Maes — Renault Clio 7-JKL-123', amount: 152.89, vat: 32.11, total: 185, status: 'Betaald', category: 'Onderhoud', mileage: '45.230 km', nextService: '55.230 km' },
      { id: 'WO-2024-0230', date: '11/06/2024', desc: 'Airco herlading R134a + dichtheidstest', client: 'Mevr. K. Bogaert — Seat Ibiza 8-MNO-456', amount: 78.51, vat: 16.49, total: 95, status: 'Betaald', category: 'Airco', mileage: '67.890 km', nextService: 'Jaarlijks' },
      { id: 'WO-2024-0229', date: '10/06/2024', desc: 'Diagnose + vervanging koppelingsset compleet', client: 'Dhr. T. Willems — Skoda Octavia 9-PQR-789', amount: 561.98, vat: 118.02, total: 680, status: 'Openstaand', category: 'Herstelling', mileage: '156.780 km', nextService: '166.780 km' },
    ],
    agendaStats: { reminders: 18, noShows: 0, trend: '+10%', weekData: [6,8,7,9,8,5,0] },
    adminSummary: { total: 8750, count: 42, timeSaved: '7u 00m', openstaand: 1100 },
    accountManager: 'Pieter Jacobs',
    aiQuestions: [
      { q: 'Welke voertuigen zijn klaar vandaag?', a: 'Voertuigen klaar vandaag:\n✅ VW Golf Claes — Klaar, betaald €245\n✅ Renault Clio Maes — Klaar, wacht op afhaling\n🔧 Audi A3 Peters — Klaar om 16:30 (waterpomp)\n⏳ BMW 320i Hermans — Diagnose klaar, offerte verstuurd (wachten)\n📋 Toyota Yaris Janssen — Gepland morgen 08:30' },
      { q: 'Stuur onderhoudsherinneringen', a: '✅ Batch verstuurd naar 17 klanten:\n• 8 op basis van km-stand (>10.000 km sinds laatste beurt)\n• 6 op basis van datum (>11 maanden geleden)\n• 3 APK-herinnering (keuring verlopen of bijna verlopen)\n\nVerwachte conversie: ~38% boekt binnen 7 dagen (historisch gemiddelde)' },
      { q: 'Hoeveel omzet deze maand?', a: 'Juni tot nu: €18.450\n• Herstellingen: €11.200 (61%)\n• Onderhoud: €5.400 (29%)\n• APK keuringen: €1.850 (10%)\n\nVs vorig jaar juni: €15.200 → +21%\nTop klant: Dhr. Willems (4 bezoeken, €1.840/jaar)' },
      { q: 'Zijn er openstaande betalingen?', a: 'Openstaande werkorders: 2 — totaal €1.100\n• Audi A3 Peters: €420 (1 dag oud) — betaallink verstuurd\n• Skoda Octavia Willems: €680 (3 dagen oud) — 2e herinnering vandaag\n\nGemiddelde betaaltermijn na betaallink: 4.2 uur (was 5.4 dagen voor het systeem)' },
    ],
    report: {
      period: 'Week 24 — 10 t/m 14 juni 2024',
      highlights: [
        { label: 'Voertuigen gediend', value: '38', trend: '+10%' },
        { label: 'Gem. betaalduur', value: '4.2u', trend: '−85%' },
        { label: 'Herinneringen', value: '17', trend: 'vandaag' },
        { label: 'Omzet', value: '€18.450', trend: '+21%' },
      ],
      topAction: 'Skoda Octavia Willems: betaling €680 openstaand — 2e herinnering verstuurd',
    },
  },

  {
    id: 'horeca',
    name: 'Horeca',
    color: '#F97316',
    icon: 'UtensilsCrossed',
    tagline: 'Vollere tafels, minder no-shows, tevreden gasten — alles automatisch',
    automationBullets: [
      'Reserveringen 24/7 via WhatsApp — allergieën automatisch genoteerd',
      'Tafelbeheer voor 50 couverts — optimale bezetting elke avond',
      'Reviews direct opgevolgd, negatieve feedback omgezet naar kansen',
    ],
    metrics: [
      { label: 'Reserveringen vandaag', value: '18', delta: '+4', deltaPos: true, sparkline: [10,12,13,15,16,17,18] },
      { label: 'Bezettingsgraad', value: '87%', delta: '+12%', deltaPos: true, sparkline: [65,70,73,78,82,85,87] },
      { label: 'Gem. tafelrotatie', value: '1u 45m', delta: 'optimaal', deltaPos: true, sparkline: [2.2,2.1,2.0,1.9,1.8,1.75,1.75] },
      { label: 'Tijd bespaard vandaag', value: '2u 10m', delta: '+20m', deltaPos: true, sparkline: [1.2,1.4,1.5,1.7,1.8,2.0,2.17] },
    ],
    weekActivity: [12,16,14,18,22,28,10],
    activityFeed: [
      { time: '14:50', text: 'Reservering bevestigd — tafel 6 (4p) vrijdag 20:00 — De Backer, glutenvrij genoteerd', icon: 'Calendar', color: '#F97316' },
      { time: '14:25', text: 'Verjaardag automatisch herkend — Mevr. Claes 50j — speciale tafelopstelling gepland', icon: 'Gift', color: '#F59E0B' },
      { time: '13:55', text: 'Review ⭐⭐⭐⭐⭐ Google — "Beste restaurant in Hasselt" — Thomas V.', icon: 'Star', color: '#F59E0B' },
      { time: '13:30', text: 'Negatieve review opgevolgd — compensatiebon €25 verstuurd — klant Mark Willems', icon: 'MessageSquare', color: '#EF4444' },
      { time: '12:45', text: 'Extra kelner ingepland vrijdag — bezetting 95%, piekdienst verwacht', icon: 'Users', color: '#8B5CF6' },
      { time: '12:00', text: 'Allergie dashboard bijgewerkt — 3 allergieën komende 48u', icon: 'AlertCircle', color: '#EF4444' },
      { time: '11:30', text: 'Zakelijk diner bevestigd — 8p donderdag 19:00 — Salon privé', icon: 'Calendar', color: '#8B5CF6' },
      { time: '10:00', text: 'Dagomzetrapport verstuurd — gisteren €3.240 (+14% vs dinsdag)', icon: 'TrendingUp', color: '#10B981' },
    ],
    liveItems: [
      'Reservering bevestigd — tafel 3 (2p) zaterdag 19:30 — Dhr. Lemmens',
      'Review ⭐⭐⭐⭐⭐ — "Fantastisch eten, sfeer perfect!"',
      'Allergie genoteerd — Dhr. Peeters zaterdag: lactose + noten (ERNSTIG)',
      'No-show opgevolgd — tafel 4 vrijdag 19:00 opnieuw aangeboden',
    ],
    whatsapp: [
      {
        id: 'c1', contact: 'Sophie De Backer', avatar: 'SD', status: 'Nieuwe reservering',
        messages: [
          { from: 'client', text: 'Goedemiddag, tafel voor vrijdag 20u, 4 personen? Iemand bij ons is glutenintolerant.', time: '14:10' },
          { from: 'ai', text: 'Goedemiddag Sophie! 👋\n\n✅ Tafel 6 (4 personen) vrijdag 21/06 om 20:00 — beschikbaar!\n\n🌾 Glutenintolerantie genoteerd voor 1 gast — onze chef wordt verwittigd.\n\nReserveer ik op naam De Backer?', time: '14:10', delay: '7 sec' },
          { from: 'client', text: 'Ja graag!', time: '14:12' },
          { from: 'ai', text: '🍽️ Bevestigd!\n\n📅 Vrijdag 21 juni om 20:00\n👥 4 personen — De Backer\n🍽️ Tafel 6 (raam, rustige hoek)\n🌾 1× glutenvrij menu beschikbaar\n\nU ontvangt donderdag een herinnering. Smakelijk alvast! 🥂', time: '14:12', delay: '5 sec' },
        ]
      },
      {
        id: 'c2', contact: 'Mark Willems', avatar: 'MW', status: 'Klacht → opgelost',
        messages: [
          { from: 'client', text: 'Gisteravond was mijn vlees koud en de service traag. Ik ga dit online melden.', time: '10:45' },
          { from: 'ai', text: 'Goedemorgen Mark, dit spijt ons oprecht. 😔\n\nDit is absoluut niet onze standaard. Ik stuur uw feedback direct door aan de zaakvoerder én de keukenchef.\n\nAls blijk van excuses: bon van €25 voor uw volgend bezoek. Mag ik uw e-mail?', time: '10:45', delay: '8 sec' },
          { from: 'client', text: 'mark.willems@gmail.com. Dank voor de snelle reactie!', time: '10:48' },
          { from: 'ai', text: '✅ Bon verstuurd naar mark.willems@gmail.com.\n\nWe hopen u snel terug te verwelkomen voor een betere ervaring. 🙏\n\nDe zaakvoerder neemt deze week persoonlijk contact op.', time: '10:48', delay: '5 sec' },
        ]
      },
    ],
    email: {
      from: 'events@belfius.be', subject: 'Zakelijk diner 12 personen — 27 juni',
      original: 'Geachte, zakelijk diner 12p op do 27 juni om 19:00. Privé salon + AV. Budget €50 p.p. incl. dranken.\n\nBelfius NV Events',
      aiReply: 'Geachte,\n\n✅ Privé salon beschikbaar do 27 juni!\n\n• Capaciteit: tot 16 personen\n• AV: projector + scherm + WiFi\n• Menu: 3 gangen €45 p.p. + dranken à la carte\n\nProeverij (gratis):\n📅 Maandag 17/06 om 12:30\n\nRestaurant De Gouden Vork',
      responseTime: '3 min 22 sec',
    },
    // Horeca heeft dubbele agenda: keuken (bestellingen) + restaurant (tafels)
    kitchenOrders: [
      { time: '18:00', order: 'BON #001', table: 'T3', items: ['2× Filet pur', '1× Vegetarisch seizoensgerecht', '2× Huiswijn rood'], status: 'Klaar', prepTime: '18 min' },
      { time: '18:15', order: 'BON #002', table: 'T7', items: ['4× Garnaalkroketten (starter)', '4× Ribeye medium'], status: 'In bereiding', prepTime: '22 min' },
      { time: '18:30', order: 'BON #003', table: 'T1', items: ['2× Soep van de dag', '1× Carpaccio', '3× Hoofdgerecht chef'], status: 'Wacht', prepTime: '—' },
      { time: '18:45', order: 'BON #004', table: 'T9', items: ['6× Menu découverte (3 gangen)', '1× Glutenvrij alternatief'], status: 'Wacht', prepTime: '—' },
      { time: '19:00', order: 'BON #005', table: 'Salon', items: ['8× Zakelijk menu (3 gangen)', '8× Aperitief, water en wijn'], status: 'Gepland', prepTime: '—' },
    ],
    restaurantTables: [
      { id: 'T1', seats: 2, status: 'Bezet', name: 'Fam. Peters', since: '18:30', expectedLeave: '20:00', nextReservation: '20:30 — Hermans (2p)' },
      { id: 'T2', seats: 4, status: 'Vrij', name: null, since: null, expectedLeave: null, nextReservation: '20:00 — De Wolf (4p)' },
      { id: 'T3', seats: 2, status: 'Bezet', name: 'Dhr. Lemmens', since: '18:00', expectedLeave: '19:45', nextReservation: '20:00 — Claes (2p)' },
      { id: 'T4', seats: 6, status: 'Bezet', name: 'Fam. Bogaert', since: '18:30', expectedLeave: '20:15', nextReservation: 'Vrij' },
      { id: 'T5', seats: 4, status: 'Schoonmaken', name: null, since: null, expectedLeave: null, nextReservation: '19:30 — Janssen (3p)' },
      { id: 'T6', seats: 4, status: 'Gereserveerd', name: 'De Backer', since: null, expectedLeave: null, nextReservation: '20:00 — De Backer (4p) 🌾 glutenvrij' },
      { id: 'T7', seats: 4, status: 'Bezet', name: 'Fam. Claes', since: '18:15', expectedLeave: '20:00', nextReservation: '20:30 — Verbeke (4p)' },
      { id: 'T8', seats: 8, status: 'Vrij', name: null, since: null, expectedLeave: null, nextReservation: '20:00 — Groep 8p' },
      { id: 'T9', seats: 6, status: 'Bezet', name: 'Fam. De Smedt', since: '18:45', expectedLeave: '20:30', nextReservation: '21:00 — Willems (5p)' },
      { id: 'Salon', seats: 16, status: 'Gepland', name: null, since: null, expectedLeave: null, nextReservation: '19:00 — Belfius zakelijk (12p)' },
    ],
    agenda: [
      { day: 'Ma', items: [
        { time: '12:00', title: 'Lunchservice', sub: '8 tafels — 18 couverts', color: '#F97316', duration: 120 },
        { time: '18:30', title: 'Dinerservice', sub: '12 tafels — 34 couverts', color: '#F97316', duration: 240 },
      ]},
      { day: 'Di', items: [
        { time: '12:00', title: 'Lunchservice', sub: '6 tafels — 14 couverts', color: '#F97316', duration: 120 },
        { time: '19:00', title: 'Privé event', sub: 'Salon — zakelijk diner 8p', color: '#8B5CF6', duration: 180 },
      ]},
      { day: 'Wo', items: [
        { time: '12:00', title: 'Lunchservice', sub: '10 tafels — 24 couverts', color: '#F97316', duration: 120 },
        { time: '18:30', title: 'Dinerservice', sub: '14 tafels — 42 couverts', color: '#F97316', duration: 240 },
      ]},
      { day: 'Do', items: [
        { time: '12:00', title: 'Lunchservice', sub: '7 tafels — 16 couverts', color: '#F97316', duration: 120 },
        { time: '19:00', title: 'Zakelijk diner Belfius', sub: 'Salon privé — 12p — 3 gangen', color: '#8B5CF6', duration: 210 },
      ]},
      { day: 'Vr', items: [
        { time: '12:00', title: 'Lunchservice', sub: '11 tafels — 28 couverts', color: '#F97316', duration: 120 },
        { time: '19:00', title: '🔴 Piekservice', sub: '10 tafels vol — 42 couverts | +1 kelner', color: '#EF4444', duration: 270 },
      ]},
    ],
    adminItems: [
      { id: 'INV-2024-0892', date: '13/06/2024', desc: 'Dinerservice woensdag — 42 couverts', client: 'Dagomzet Restaurant', amount: 2677.69, vat: 562.31, total: 3240, status: 'Verwerkt', category: 'Dagomzet' },
      { id: 'INV-2024-0891', date: '12/06/2024', desc: 'Privé event — Zakelijk diner 8p (3 gangen)', client: 'Fam. Claes event', amount: 561.98, vat: 118.02, total: 680, status: 'Betaald', category: 'Event' },
      { id: 'INV-2024-0890', date: '12/06/2024', desc: 'Dinerservice dinsdag — 28 couverts', client: 'Dagomzet Restaurant', amount: 1611.57, vat: 338.43, total: 1950, status: 'Verwerkt', category: 'Dagomzet' },
      { id: 'INV-2024-0889', date: '12/06/2024', desc: 'Baruitbating + cocktails avond', client: 'Dagomzet Bar', amount: 396.69, vat: 83.31, total: 480, status: 'Verwerkt', category: 'Bar' },
      { id: 'INV-2024-0888', date: '11/06/2024', desc: 'Zakelijk diner 10p + dranken — Proximus NV', client: 'Proximus NV Events', amount: 702.48, vat: 147.52, total: 850, status: 'Betaald', category: 'Event' },
      { id: 'INV-2024-0887', date: '10/06/2024', desc: 'Dinerservice maandag — 34 couverts', client: 'Dagomzet Restaurant', amount: 1752.07, vat: 367.93, total: 2120, status: 'Verwerkt', category: 'Dagomzet' },
    ],
    agendaStats: { reminders: 28, noShows: 2, trend: '+18%', weekData: [14,18,16,20,26,32,8] },
    adminSummary: { total: 28450, count: 67, timeSaved: '6u 30m', openstaand: 0 },
    accountManager: 'Lien Hermans',
    aiQuestions: [
      { q: 'Hoeveel reserveringen vandaag?', a: 'Vandaag: 18 reserveringen\n• Lunch (12:00-14:30): 8 tafels, 22 couverts\n• Diner (18:00-22:00): 10 tafels, 42 couverts\n\nBezettingsgraad avond: 87% (42/50 couverts)\n\nVerwachte omzet vandaag: €3.200-€3.600\n\n⚠️ Allergieën: 2 glutenvrij (Backer + De Wolf), 1 lactose+noten (Peeters — ERNSTIG, chef verwittigd)' },
      { q: 'Zijn de tafels goed gevuld vanavond?', a: 'Tafelstatus vanavond 19:00:\n🔴 Bezet (6): T1, T3, T4, T7, T9, Salon\n🟡 Gereserveerd (2): T6 (20:00), T8 (20:00)\n🟢 Beschikbaar (2): T2, T5\n\nBezetting: 87% — 2 tafels nog vrij (T2 voor 4p, T5 voor 3p)\n\n→ Walk-ins actief toelaten? [Ja / Nee]' },
      { q: 'Wat is de omzet deze week?', a: 'Weekomzet tot nu (ma-do):\n• Ma: €2.120 | Di: €2.630 | Wo: €3.240 | Do: €2.980\n• Totaal: €10.970 (vs €9.430 vorige week = +16%)\n\nBeste avond: woensdag (42 couverts, gem. €77/couvert)\n\nVerwachte weekomzet (incl. vr/za): ±€18.500' },
      { q: 'Hoeveel reviews ontvingen we?', a: 'Reviews dit jaar: 89 total\n• Google: 74 (gem. ⭐⭐⭐⭐⭐ 4.7)\n• TripAdvisor: 15 (gem. ⭐⭐⭐⭐ 4.4)\n\n4 negatieve reviews:\n• 3 → persoonlijk beantwoord + compensatie → klanten terug\n• 1 → onterechte review, flagged\n\nResponsetijd gemiddeld: 2.3 uur' },
    ],
    report: {
      period: 'Week 24 — 10 t/m 14 juni 2024',
      highlights: [
        { label: 'Couverts gediend', value: '312', trend: '+14%' },
        { label: 'Bezettingsgraad', value: '87%', trend: '+12%' },
        { label: 'Weekomzet', value: '€18.500', trend: '+16%' },
        { label: 'Reviews ★', value: '4.7', trend: '+0.2' },
      ],
      topAction: 'Vrijdag piekdienst: extra kelner ingepland, allergie-briefing voor chef om 17:30',
    },
  },
];

export default SECTORS;
