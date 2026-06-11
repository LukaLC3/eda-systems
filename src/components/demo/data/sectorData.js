// Mock data per sector — exact features from EDA Systems price document
// Data structure matches DemoApp.tsx expectations

export const sectorData = {
  vastgoed: {
    metrics: { berichten: 47, tijdBespaard: '8 uur', afspraken: 23, omzet: '€12.400' },
    chartData: [
      { month: 'Jan', voor: 22, met: 6 }, { month: 'Feb', voor: 20, met: 5 },
      { month: 'Mrt', voor: 24, met: 7 }, { month: 'Apr', voor: 21, met: 5 },
      { month: 'Mei', voor: 23, met: 4 }, { month: 'Jun', voor: 25, met: 4 },
    ],
    whatsappConversations: [
      {
        id: 'conv1', name: 'Sophie Janssen', avatar: 'SJ',
        messages: [
          { id: 1, sender: 'user', text: 'Goedemiddag, is de woning aan de Stationsstraat 14 nog beschikbaar voor bezichtiging?', time: '10:24' },
          { id: 2, sender: 'ai',   text: 'Goedemiddag Sophie! 👋 Ja, de woning is nog beschikbaar. Ik kan direct een bezichtiging inplannen. Beschikbare momenten:\n\n📅 Dinsdag 11 juni — 10:00\n📅 Woensdag 12 juni — 14:00\n📅 Vrijdag 14 juni — 11:00\n\nWelk tijdstip past u?', time: '10:24' },
          { id: 3, sender: 'user', text: 'Woensdag 14u komt mij perfect uit!', time: '10:26' },
          { id: 4, sender: 'ai',   text: '✅ Uw bezichtiging is bevestigd!\n\n📍 Stationsstraat 14, 3000 Leuven\n📅 Woensdag 12 juni om 14:00\n🅿️ Parking: Stationsplein (100m, gratis 2u)\n\nU ontvangt morgen een herinnering. Tot dan!', time: '10:26' },
        ],
      },
      {
        id: 'conv2', name: 'Thomas De Smet', avatar: 'TD',
        messages: [
          { id: 1, sender: 'ai',   text: 'Goedemorgen Thomas! Welkom bij ons kantoor. We zagen dat u interesse toonde via Immoweb. 🏠\n\nOm u beter te helpen:\n💰 Wat is uw budget?\n📍 Welke regio?\n🏡 Type woning?', time: '09:15' },
          { id: 2, sender: 'user', text: 'Budget €350.000, regio Leuven/Tienen, halfopen bebouwing graag', time: '09:18' },
          { id: 3, sender: 'ai',   text: 'Uitstekend! Uw voorkeuren zijn genoteerd. U ontvangt binnen 24u een persoonlijke selectie van ons. Tot snel! 😊', time: '09:18' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, day: 0, time: '09:00', title: 'Bezichtiging — Stationsstraat 14', sub: 'Sophie Janssen', color: '#2563EB' },
      { id: 2, day: 0, time: '11:00', title: 'Bezichtiging — Kerkstraat 7',      sub: 'Jan De Vries',   color: '#3B82F6' },
      { id: 3, day: 1, time: '10:00', title: 'Bezichtiging — Lipsiusstraat 20',  sub: 'An Peeters',     color: '#2563EB' },
      { id: 4, day: 1, time: '14:00', title: 'Notarisafspraak — Verkoop',        sub: 'Fam. Janssen',   color: '#1D4ED8' },
      { id: 5, day: 2, time: '09:00', title: 'Bezichtiging + rondleiding Villa', sub: 'Thomas De Smet', color: '#2563EB' },
      { id: 6, day: 3, time: '11:00', title: 'Bezichtiging — Bergstraat 3',      sub: 'Marie Claes',    color: '#3B82F6' },
      { id: 7, day: 4, time: '10:00', title: 'Bezichtiging — Nieuw pand',        sub: 'Pieter Lemmens', color: '#2563EB' },
    ],
    adminItems: [
      { id: 1, datum: '10 jun', omschrijving: 'Verkoopcommissie — Stationsstraat 14', bedrag: '€4.200', status: 'Verwerkt' },
      { id: 2, datum: '08 jun', omschrijving: 'Verhuurcommissie — Bergstraat 3',       bedrag: '€850',   status: 'Verwerkt' },
      { id: 3, datum: '05 jun', omschrijving: 'Verkoopcommissie — Lipsiusstraat 20',   bedrag: '€5.600', status: 'Klaar voor boekhouder' },
      { id: 4, datum: '03 jun', omschrijving: 'Professionele fotografie pand',          bedrag: '€280',   status: 'Verwerkt' },
      { id: 5, datum: '01 jun', omschrijving: 'Verhuurcommissie — Kerkstraat 7',        bedrag: '€720',   status: 'Klaar voor boekhouder' },
    ],
  },

  tandarts: {
    metrics: { berichten: 156, tijdBespaard: '6 uur', afspraken: 48, omzet: '€8.230' },
    chartData: [
      { month: 'Jan', voor: 14, met: 5 }, { month: 'Feb', voor: 15, met: 5 },
      { month: 'Mrt', voor: 16, met: 4 }, { month: 'Apr', voor: 14, met: 4 },
      { month: 'Mei', voor: 17, met: 5 }, { month: 'Jun', voor: 16, met: 4 },
    ],
    whatsappConversations: [
      {
        id: 'conv1', name: 'Marie Claes', avatar: 'MC',
        messages: [
          { id: 1, sender: 'user', text: 'Goedemorgen, ik heb morgen om 14:00 een afspraak maar kan niet komen. Is het mogelijk te verzetten?', time: '09:02' },
          { id: 2, sender: 'ai',   text: 'Goedemorgen Marie! Geen probleem, ik pas dit meteen aan. Beschikbare momenten:\n\n📅 Donderdag 13 juni — 10:30\n📅 Donderdag 13 juni — 15:00\n📅 Vrijdag 14 juni — 09:00\n\nWelk tijdstip past u?', time: '09:02' },
          { id: 3, sender: 'user', text: 'Vrijdag om 9u is perfect', time: '09:04' },
          { id: 4, sender: 'ai',   text: '✅ Uw afspraak is verplaatst naar vrijdag 14 juni om 09:00. U ontvangt donderdag een herinnering. Fijne dag! 😊', time: '09:04' },
        ],
      },
      {
        id: 'conv2', name: 'Pieter Lemmens', avatar: 'PL',
        messages: [
          { id: 1, sender: 'ai',   text: '📌 Herinnering: Morgen hebt u een afspraak bij Tandartspraktijk De Smile.\n\n🕐 11:00\n📍 Kerkstraat 22, 2000 Antwerpen\n👨‍⚕️ Dr. Vandenberghe\n\n✅ Bevestigen  |  🔄 Verzetten', time: '08:00' },
          { id: 2, sender: 'user', text: 'Bevestigd, tot morgen!', time: '08:12' },
          { id: 3, sender: 'ai',   text: 'Super! Tot morgen om 11:00. 🦷', time: '08:12' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, day: 0, time: '09:00', title: 'Controle + reiniging',   sub: 'Marie Claes',   color: '#10B981' },
      { id: 2, day: 0, time: '10:00', title: 'Vulling tand 36',        sub: 'P. Lemmens',    color: '#059669' },
      { id: 3, day: 0, time: '14:00', title: 'Kroonplaatsing',         sub: 'An Wouters',    color: '#047857' },
      { id: 4, day: 1, time: '09:00', title: 'Controle',               sub: 'Frank Bogaert', color: '#10B981' },
      { id: 5, day: 1, time: '11:00', title: 'Tandextractie',          sub: 'Lien Martens',  color: '#DC2626' },
      { id: 6, day: 2, time: '10:00', title: 'Intakebezoek',           sub: 'Tom Van Dyck',  color: '#6EE7B7' },
      { id: 7, day: 3, time: '09:00', title: 'Bleeking behandeling',   sub: 'Sara Claes',    color: '#059669' },
    ],
    adminItems: [
      { id: 1, datum: '10 jun', omschrijving: 'Kroonplaatsing tand 16',  bedrag: '€680', status: 'Verwerkt' },
      { id: 2, datum: '09 jun', omschrijving: 'Controle + reiniging',     bedrag: '€65',  status: 'Verwerkt' },
      { id: 3, datum: '09 jun', omschrijving: 'Vulling tand 36',          bedrag: '€120', status: 'In behandeling' },
      { id: 4, datum: '07 jun', omschrijving: 'Tandextractie',            bedrag: '€185', status: 'Verwerkt' },
      { id: 5, datum: '06 jun', omschrijving: 'Bleeking behandeling',     bedrag: '€280', status: 'Klaar voor boekhouder' },
    ],
  },

  kinesist: {
    metrics: { berichten: 89, tijdBespaard: '7 uur', afspraken: 34, omzet: '€4.780' },
    chartData: [
      { month: 'Jan', voor: 15, met: 5 }, { month: 'Feb', voor: 16, met: 5 },
      { month: 'Mrt', voor: 17, met: 5 }, { month: 'Apr', voor: 15, met: 4 },
      { month: 'Mei', voor: 18, met: 5 }, { month: 'Jun', voor: 17, met: 5 },
    ],
    whatsappConversations: [
      {
        id: 'conv1', name: 'Jana Wouters', avatar: 'JW',
        messages: [
          { id: 1, sender: 'ai',   text: '🌅 Goedemorgen Jana! Tijd voor uw dagelijkse oefeningen.\n\n📋 Vandaag: Oefening 3 & 4 uit uw revalidatieprogramma\n🎥 [Video-instructie bekijken]\n⏱ Slechts 10 minuten — u kunt het! 💪', time: '07:30' },
          { id: 2, sender: 'user', text: 'Gedaan! Maar ik heb nog steeds wat pijn aan mijn linkerzijde bij oefening 4', time: '08:45' },
          { id: 3, sender: 'ai',   text: '⚠️ Bedankt dat u dit meldt. Ik noteer dit als urgente melding in uw dossier en stuur een signaal naar Kinesist Baert. U wordt zo snel mogelijk gecontacteerd. 🙏', time: '08:45' },
        ],
      },
      {
        id: 'conv2', name: 'Mark Hermans', avatar: 'MH',
        messages: [
          { id: 1, sender: 'user', text: 'Hallo, ik wil graag mijn volgende sessie inplannen. Wanneer is er plek?', time: '11:15' },
          { id: 2, sender: 'ai',   text: 'Hallo Mark! Vrije momenten:\n\n📅 Maandag 17 juni — 09:00\n📅 Dinsdag 18 juni — 10:30\n📅 Donderdag 20 juni — 14:00', time: '11:15' },
          { id: 3, sender: 'user', text: 'Dinsdag 10:30 graag', time: '11:17' },
          { id: 4, sender: 'ai',   text: '✅ Sessie ingepland: di 18 juni om 10:30. Thuisoefeningen worden als PDF bijgevoegd. Tot dan! 🏃', time: '11:17' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, day: 0, time: '09:00', title: 'Rugklachten — sessie 4/10',     sub: 'Jana Wouters',     color: '#F59E0B' },
      { id: 2, day: 0, time: '10:00', title: 'Knierevalidatie — sessie 2/8',  sub: 'Mark Hermans',     color: '#D97706' },
      { id: 3, day: 0, time: '14:00', title: 'Schouder — sessie 6/10',        sub: 'Raf Mertens',      color: '#F59E0B' },
      { id: 4, day: 1, time: '09:00', title: 'Sportrevalidatie — sessie 1/6', sub: 'N. Bogaert',       color: '#FBBF24' },
      { id: 5, day: 2, time: '10:00', title: 'Rugklachten — sessie 5/10',     sub: 'Jana Wouters',     color: '#F59E0B' },
      { id: 6, day: 3, time: '11:00', title: 'Knierevalidatie — sessie 3/8',  sub: 'Mark Hermans',     color: '#D97706' },
    ],
    adminItems: [
      { id: 1, datum: '10 jun', omschrijving: 'Sessiereeks rugklachten (10x)',  bedrag: '€420', status: 'Verwerkt' },
      { id: 2, datum: '08 jun', omschrijving: 'Individuele sessie knie',         bedrag: '€45',  status: 'Verwerkt' },
      { id: 3, datum: '07 jun', omschrijving: 'Sessiereeks schouder (8x)',       bedrag: '€336', status: 'In behandeling' },
      { id: 4, datum: '05 jun', omschrijving: 'Sportrevalidatie (6x)',           bedrag: '€252', status: 'Klaar voor boekhouder' },
    ],
  },

  accountant: {
    metrics: { facturen: 234, tijdBespaard: '12 uur', deadlines: 0, volume: '€156.400' },
    chartData: [
      { month: 'Jan', voor: 22, met: 4 }, { month: 'Feb', voor: 24, met: 5 },
      { month: 'Mrt', voor: 28, met: 5 }, { month: 'Apr', voor: 25, met: 4 },
      { month: 'Mei', voor: 26, met: 5 }, { month: 'Jun', voor: 30, met: 5 },
    ],
    whatsappConversations: [],
    documentItems: [
      { id: 1, datum: '10 jun', leverancier: 'Proximus NV',           bedrag: '€234,50',   type: 'Telecom',         ocrStatus: 'Verwerkt',       gematcht: true  },
      { id: 2, datum: '10 jun', leverancier: 'Bpost',                  bedrag: '€48,20',    type: 'Verzending',      ocrStatus: 'Verwerkt',       gematcht: true  },
      { id: 3, datum: '09 jun', leverancier: 'Office Depot',           bedrag: '€156,80',   type: 'Kantoor',         ocrStatus: 'Verwerkt',       gematcht: false },
      { id: 4, datum: '09 jun', leverancier: 'Esso Tankstation',       bedrag: '€89,40',    type: 'Transport',       ocrStatus: 'Verwerkt',       gematcht: true  },
      { id: 5, datum: '08 jun', leverancier: 'Sodexo',                 bedrag: '€1.240,00', type: 'Maaltijdcheques', ocrStatus: 'In behandeling', gematcht: false },
      { id: 6, datum: '08 jun', leverancier: 'NMBS Jaarabonnement',    bedrag: '€1.890,00', type: 'Transport',       ocrStatus: 'Verwerkt',       gematcht: true  },
      { id: 7, datum: '07 jun', leverancier: 'Carglass',               bedrag: '€340,00',   type: 'Voertuig',        ocrStatus: 'Verwerkt',       gematcht: true  },
      { id: 8, datum: '07 jun', leverancier: 'Adobe Creative Cloud',   bedrag: '€59,99',    type: 'Software',        ocrStatus: 'Verwerkt',       gematcht: true  },
    ],
    agendaItems: [
      { id: 1, day: 0, time: '10:00', title: 'BTW-aangifte Q2 — Bakkerij Lemmens', sub: 'Deadline 20 jun', color: '#8B5CF6' },
      { id: 2, day: 1, time: '09:00', title: 'Jaarrekening — NV Peeters',          sub: '31/12 deadline',  color: '#7C3AED' },
      { id: 3, day: 2, time: '14:00', title: 'Klantgesprek — BVBA Hermans',        sub: 'Kwartaalbespreking', color: '#8B5CF6' },
      { id: 4, day: 3, time: '10:00', title: 'BTW-aangifte Q2 — BVBA Claes',       sub: 'Deadline 20 jun', color: '#6D28D9' },
    ],
    adminItems: [
      { id: 1, datum: '10 jun', omschrijving: 'Factuurverwerking mei — Bakkerij Lemmens',  bedrag: '€12.450',  status: 'Verwerkt' },
      { id: 2, datum: '09 jun', omschrijving: 'BTW-voorbereiding Q1 — NV Peeters',         bedrag: '€34.200',  status: 'Klaar voor boekhouder' },
      { id: 3, datum: '08 jun', omschrijving: 'Factuurverwerking mei — BVBA Hermans',      bedrag: '€8.760',   status: 'Verwerkt' },
      { id: 4, datum: '07 jun', omschrijving: 'Jaarrekening voorbereiding — BVBA Claes',   bedrag: '€56.800',  status: 'In behandeling' },
      { id: 5, datum: '05 jun', omschrijving: 'Factuurverwerking mei — Garage Van Dyck',   bedrag: '€18.340',  status: 'Verwerkt' },
    ],
  },

  architect: {
    metrics: { berichten: 31, tijdBespaard: '5 uur', afspraken: 8, omzet: '€24.600' },
    chartData: [
      { month: 'Jan', voor: 14, met: 6 }, { month: 'Feb', voor: 15, met: 6 },
      { month: 'Mrt', voor: 16, met: 5 }, { month: 'Apr', voor: 14, met: 5 },
      { month: 'Mei', voor: 17, met: 6 }, { month: 'Jun', voor: 15, met: 5 },
    ],
    whatsappConversations: [
      {
        id: 'conv1', name: 'Lien Vandeputte', avatar: 'LV',
        messages: [
          { id: 1, sender: 'user', text: 'Dag, kunt u mij een update geven over het project Molenstraat in Gent?', time: '14:22' },
          { id: 2, sender: 'ai',   text: '🏗 Project update — Woning Molenstraat, Gent:\n\n✅ Vergunning ontvangen op 28 mei\n📍 Huidige fase: Uitvoeringstekeningen\n📅 Volgende stap: Aanbesteding aannemer — 20 juni\n📋 Oplevering: Verwacht Q4 2025', time: '14:22' },
          { id: 3, sender: 'user', text: 'Perfect, dank u!', time: '14:24' },
        ],
      },
      {
        id: 'conv2', name: 'Systeem', avatar: '⚡',
        messages: [
          { id: 1, sender: 'ai',   text: '⚠️ Deadline-herinnering\n\n📋 Project: Villa De Backer, Knokke\n🗓 Vergunningsaanvraag deadline: 15 juni\n⏰ Nog 5 dagen!\n\nChecklist beschikbaar. Alles klaar?', time: '09:00' },
          { id: 2, sender: 'user', text: 'Nog niet helemaal, kan je de checklist sturen?', time: '09:15' },
          { id: 3, sender: 'ai',   text: "📋 Checklist vergunning:\n✅ Plannen gelijkvloers\n✅ Plannen verdieping\n✅ Geveltekeningen\n❌ Energieprestatierapport (ontbreekt)\n❌ Stabiliteitsstudie (in behandeling)\n\nIk stuur herinneringen naar de studiebureau's.", time: '09:15' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, day: 0, time: '09:00', title: 'Ontwerpvergadering — Woning Gent',    sub: 'Fam. Vandeputte', color: '#EF4444' },
      { id: 2, day: 0, time: '14:00', title: 'Werfbezoek — Verbouwing Knokke',      sub: 'De Backer',       color: '#DC2626' },
      { id: 3, day: 1, time: '10:00', title: 'Vergunning indienen — Villa Heist',   sub: 'Fam. Bogaert',    color: '#EF4444' },
      { id: 4, day: 2, time: '09:00', title: 'Stuurgroepvergadering Appartementen', sub: 'Promotor NBM',    color: '#B91C1C' },
      { id: 5, day: 3, time: '14:00', title: 'Klantpresentatie nieuw ontwerp',      sub: 'Fam. Lemmens',    color: '#EF4444' },
    ],
    adminItems: [
      { id: 1, datum: '10 jun', omschrijving: 'Ontwerpfase — Woning Molenstraat Gent', bedrag: '€4.800',  status: 'Verwerkt' },
      { id: 2, datum: '08 jun', omschrijving: 'Vergunningsfase — Villa De Backer',      bedrag: '€2.400',  status: 'Klaar voor boekhouder' },
      { id: 3, datum: '05 jun', omschrijving: 'Offerte — Verbouwing Lemmens',           bedrag: '€12.600', status: 'Verwerkt' },
      { id: 4, datum: '03 jun', omschrijving: 'Uitvoeringsfase 2 — Appartementen',      bedrag: '€8.200',  status: 'In behandeling' },
    ],
  },

  garage: {
    metrics: { berichten: 62, tijdBespaard: '5 uur', herstellingen: 41, omzet: '€18.940' },
    chartData: [
      { month: 'Jan', voor: 13, met: 5 }, { month: 'Feb', voor: 14, met: 5 },
      { month: 'Mrt', voor: 15, met: 5 }, { month: 'Apr', voor: 13, met: 4 },
      { month: 'Mei', voor: 16, met: 5 }, { month: 'Jun', voor: 14, met: 4 },
    ],
    whatsappConversations: [
      {
        id: 'conv1', name: 'Raf Mertens', avatar: 'RM',
        messages: [
          { id: 1, sender: 'ai',   text: '✅ Goedemorgen Raf! Uw VW Golf (1-ABC-234) is zojuist binnengebracht.\n🔧 Gemeld: Motorstoring + oliewissel\n📋 Verwacht klaar: Vandaag 16:00', time: '08:30' },
          { id: 2, sender: 'user', text: 'Super, bedankt!', time: '08:31' },
          { id: 3, sender: 'ai',   text: '🔧 Update 13:47: Diagnose afgerond. Oorzaak: Ontstekingsspoel defect. Reparatie loopt. Klaar om 15:30.', time: '13:47' },
          { id: 4, sender: 'ai',   text: '✅ Uw wagen is klaar! Alles rijdt perfect.\n\n💶 Factuur: €245,00\n💳 [Betalen via beveiligde link]\n🅿️ Ophalen tot 18:00', time: '15:28' },
        ],
      },
      {
        id: 'conv2', name: 'Els Desmet', avatar: 'ED',
        messages: [
          { id: 1, sender: 'ai',   text: '🔔 Beste Els,\n\nHet is bijna tijd voor de jaarlijkse onderhoudsbeurt van uw Peugeot 208.\n\nLaatste beurt: 8 jun 2023 — 87.420 km\nHuidig: ~97.500 km\n\nAfspraak inplannen?', time: 'Gisteren' },
          { id: 2, sender: 'user', text: 'Ja graag!', time: 'Gisteren' },
          { id: 3, sender: 'ai',   text: '📅 Beschikbare momenten:\nVr 14 jun — 09:00\nMa 17 jun — 10:30\nDi 18 jun — 14:00', time: 'Gisteren' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, day: 0, time: '08:00', title: 'Grote onderhoudsbeurt — VW Golf',    sub: 'Raf Mertens',    color: '#06B6D4' },
      { id: 2, day: 0, time: '10:00', title: 'Bandenwissel — BMW 3-reeks',         sub: 'Marie Claes',    color: '#0891B2' },
      { id: 3, day: 0, time: '14:00', title: 'Carrosserieherstelling',              sub: 'Frank Bogaert',  color: '#0E7490' },
      { id: 4, day: 1, time: '09:00', title: 'APK-keuring — Peugeot 208',          sub: 'Els Desmet',     color: '#06B6D4' },
      { id: 5, day: 2, time: '08:00', title: 'Motordiagnose + herstelling',         sub: 'P. Van Dyck',   color: '#0891B2' },
      { id: 6, day: 3, time: '10:00', title: 'Kleine onderhoudsbeurt',              sub: 'An Peeters',     color: '#06B6D4' },
    ],
    adminItems: [
      { id: 1, datum: '10 jun', omschrijving: 'Onderhoudsbeurt + ontstekingsspoel — VW Golf', bedrag: '€245',   status: 'Verwerkt' },
      { id: 2, datum: '09 jun', omschrijving: 'Bandenwissel 4x winterbanden',                  bedrag: '€180',   status: 'Verwerkt' },
      { id: 3, datum: '08 jun', omschrijving: 'Carrosserieherstelling — BMW',                   bedrag: '€1.240', status: 'In behandeling' },
      { id: 4, datum: '07 jun', omschrijving: 'APK-keuring + kleine herstellingen',             bedrag: '€95',    status: 'Verwerkt' },
      { id: 5, datum: '06 jun', omschrijving: 'Motordiagnose + reparatie',                      bedrag: '€420',   status: 'Klaar voor boekhouder' },
    ],
  },

  horeca: {
    metrics: { reserveringen: 187, tijdBespaard: '4 uur', tafels: 187, omzet: '€43.200' },
    chartData: [
      { month: 'Jan', voor: 12, met: 5 }, { month: 'Feb', voor: 13, met: 5 },
      { month: 'Mrt', voor: 14, met: 5 }, { month: 'Apr', voor: 12, met: 4 },
      { month: 'Mei', voor: 15, met: 5 }, { month: 'Jun', voor: 13, met: 4 },
    ],
    whatsappConversations: [
      {
        id: 'conv1', name: 'Frank Peeters', avatar: 'FP',
        messages: [
          { id: 1, sender: 'user', text: 'Goedemiddag, hebben jullie nog een tafel vrij voor 4 personen op vrijdag 14 juni om 20:00?', time: '11:30' },
          { id: 2, sender: 'ai',   text: '✅ Ja, wij hebben een mooie tafel beschikbaar! Hebben de gasten speciale dieetwensen of allergieën?', time: '11:30' },
          { id: 3, sender: 'user', text: 'Mijn vrouw is lactose-intolerant', time: '11:31' },
          { id: 4, sender: 'ai',   text: '✅ Genoteerd en chef geïnformeerd!\n\n📅 Vrijdag 14 juni — 20:00\n👥 4 personen\n⚠️ Lactose-intolerantie (1 gast)\n\nU ontvangt morgen een herinnering. Tot vrijdag! 🍽', time: '11:31' },
        ],
      },
      {
        id: 'conv2', name: 'Nathalie Bogaert', avatar: 'NB',
        messages: [
          { id: 1, sender: 'ai',   text: '🎂 Gelukkige verjaardag Nathalie!\n\nAls trouwe gast verrassen we u met 20% korting op uw volgende diner — geldig deze maand. 🥂\n\nReserveer hier of antwoord op dit bericht.', time: '10:00' },
          { id: 2, sender: 'user', text: 'Wat lief! We komen zeker langs!', time: '10:18' },
          { id: 3, sender: 'ai',   text: 'Fantastisch! We kijken er naar uit. Tot snel! 🍾', time: '10:18' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, day: 3, time: '12:00', title: 'Lunch — 18 couverts',          sub: '5 tafels',  color: '#F97316' },
      { id: 2, day: 3, time: '19:00', title: 'Diner — 32 couverts',          sub: '8 tafels',  color: '#EA580C' },
      { id: 3, day: 4, time: '12:00', title: 'Lunch — 24 couverts',          sub: '6 tafels',  color: '#F97316' },
      { id: 4, day: 4, time: '19:00', title: 'Diner — 48 couverts',          sub: '12 tafels', color: '#EA580C' },
    ],
    adminItems: [
      { id: 1, datum: '10 jun', omschrijving: 'Dagomzet — Ma 10 juni',             bedrag: '€1.840', status: 'Verwerkt' },
      { id: 2, datum: '09 jun', omschrijving: 'Dagomzet — Zo 9 juni',              bedrag: '€2.460', status: 'Verwerkt' },
      { id: 3, datum: '08 jun', omschrijving: 'Dagomzet — Za 8 juni',              bedrag: '€3.120', status: 'Klaar voor boekhouder' },
      { id: 4, datum: '07 jun', omschrijving: 'Leveranciersfactuur — Groenten',    bedrag: '€340',   status: 'Verwerkt' },
      { id: 5, datum: '06 jun', omschrijving: 'Leveranciersfactuur — Vlees',       bedrag: '€820',   status: 'Verwerkt' },
    ],
  },
};
