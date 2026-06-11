export const sectorData = {
  vastgoed: {
    metrics: { berichten: 47, tijdBespaard: 8, afspraken: 23, omzet: '€12.400' },
    chartData: [
      { month: 'Jan', voor: 22, met: 6 },
      { month: 'Feb', voor: 20, met: 5 },
      { month: 'Mar', voor: 24, met: 7 },
      { month: 'Apr', voor: 21, met: 5 },
      { month: 'May', voor: 23, met: 4 },
      { month: 'Jun', voor: 25, met: 4 },
    ],
    whatsappConversations: [
      {
        id: 'conv1',
        name: 'Sophie Janssen',
        avatar: 'SJ',
        messages: [
          { id: 1, sender: 'user', text: 'Goedemiddag, ik ben geïnteresseerd in het appartement aan de Stationsstraat 14. Is het mogelijk om een bezichtiging in te plannen?', time: '14:02' },
          { id: 2, sender: 'ai', text: 'Goedemiddag Sophie! Fijn dat u interesse heeft in Stationsstraat 14. Ik kan de volgende bezichtigingstijden aanbieden:\n\n📅 Donderdag 14:00\n📅 Vrijdag 10:00\n📅 Zaterdag 11:00\n\nWelk tijdstip komt u het beste uit?', time: '14:02' },
          { id: 3, sender: 'user', text: 'Donderdag 14:00 is perfect!', time: '14:05' },
          { id: 4, sender: 'ai', text: '✅ Bevestigd! Uw bezichtiging is ingepland voor:\n\n📍 Stationsstraat 14, 2000 Antwerpen\n🕐 Donderdag 14:00\n🅿️ Gratis parking achter het gebouw\n\nU ontvangt een herinnering 24 uur van tevoren. Tot dan!', time: '14:05' },
        ],
      },
      {
        id: 'conv2',
        name: 'Thomas De Smet',
        avatar: 'TD',
        messages: [
          { id: 1, sender: 'ai', text: 'Welkom bij ons kantoor, Thomas! 🏡 U heeft via Immoweb interesse getoond. Waarvoor zoekt u precies? (koop/huur, aantal kamers, budget?)', time: '09:15' },
          { id: 2, sender: 'user', text: 'Ik zoek iets te huur, 2 slaapkamers, max €1200/maand', time: '09:22' },
          { id: 3, sender: 'ai', text: 'Top! We hebben momenteel 3 panden die perfect bij uw wensen passen. Ik stuur u vandaag de details. Mag ik ook uw e-mailadres voor de uitgebreide fiches?', time: '09:22' },
        ],
      },
      {
        id: 'conv3',
        name: 'Marie Pieters',
        avatar: 'MP',
        messages: [
          { id: 1, sender: 'user', text: 'Hoe verloopt de verkoop van mijn huis? Zijn er al bezichtigingen geweest?', time: '11:30' },
          { id: 2, sender: 'ai', text: 'Goedemorgen Marie! 📊 Update van deze week:\n\n✅ 4 bezichtigingen ingepland\n👁️ 127 views op Immoweb\n💬 3 serieuze kandidaten\n\nUw makelaar neemt morgen contact met u op voor een uitgebreid overzicht.', time: '11:30' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, title: 'Bezichtiging - Stationsstraat 14', time: '09:00', duration: 60, day: 0, color: '#2563EB' },
      { id: 2, title: 'Bezichtiging - Kerkstraat 5', time: '11:00', duration: 60, day: 0, color: '#2563EB' },
      { id: 3, title: 'Notaris - Akte ondertekening', time: '14:00', duration: 90, day: 1, color: '#8B5CF6' },
      { id: 4, title: 'Bezichtiging - Lindelei 23', time: '10:00', duration: 60, day: 2, color: '#2563EB' },
      { id: 5, title: 'Fotosessie nieuw pand', time: '13:00', duration: 120, day: 2, color: '#F59E0B' },
      { id: 6, title: 'Bezichtiging - Molenweg 8', time: '09:30', duration: 60, day: 3, color: '#2563EB' },
      { id: 7, title: 'Prijsbepaling vergadering', time: '15:00', duration: 60, day: 3, color: '#EF4444' },
      { id: 8, title: 'Bezichtiging - Groenplaats 1', time: '11:00', duration: 60, day: 4, color: '#2563EB' },
    ],
    adminItems: [
      { id: 1, datum: '2024-06-10', omschrijving: 'Commissie - Verkoop Stationsstraat 14', bedrag: '€4.200', status: 'Klaar voor boekhouder' },
      { id: 2, datum: '2024-06-08', omschrijving: 'Advertentiekosten Immoweb - juni', bedrag: '€349', status: 'Verwerkt' },
      { id: 3, datum: '2024-06-05', omschrijving: 'Commissie - Verhuur Kerkstraat 5', bedrag: '€1.100', status: 'Klaar voor boekhouder' },
      { id: 4, datum: '2024-06-01', omschrijving: 'Kantoorkosten mei', bedrag: '€520', status: 'Verwerkt' },
      { id: 5, datum: '2024-05-28', omschrijving: 'Fotosessie pand Lindelei', bedrag: '€180', status: 'In behandeling' },
    ],
  },

  tandarts: {
    metrics: { berichten: 156, tijdBespaard: 6, afspraken: 48, omzet: '€8.230' },
    chartData: [
      { month: 'Jan', voor: 18, met: 5 },
      { month: 'Feb', voor: 17, met: 4 },
      { month: 'Mar', voor: 19, met: 5 },
      { month: 'Apr', voor: 20, met: 4 },
      { month: 'May', voor: 18, met: 3 },
      { month: 'Jun', voor: 21, met: 4 },
    ],
    whatsappConversations: [
      {
        id: 'conv1',
        name: 'Jan Vermeersch',
        avatar: 'JV',
        messages: [
          { id: 1, sender: 'user', text: 'Ik moet mijn afspraak van vrijdag verzetten, ik kan helaas niet komen.', time: '10:15' },
          { id: 2, sender: 'ai', text: 'Geen probleem Jan! 😊 Ik kan u de volgende beschikbare tijden aanbieden:\n\n📅 Maandag 9:00\n📅 Maandag 16:30\n📅 Woensdag 11:00\n\nWelk tijdstip past u?', time: '10:15' },
          { id: 3, sender: 'user', text: 'Maandag 9:00 graag', time: '10:18' },
          { id: 4, sender: 'ai', text: '✅ Afspraak verplaatst naar maandag 9:00!\n\nU ontvangt morgen een herinnering. Vergeet niet nuchter te komen als u een vulling heeft gepland. Tot maandag! 🦷', time: '10:18' },
        ],
      },
      {
        id: 'conv2',
        name: 'Lisa Goossens',
        avatar: 'LG',
        messages: [
          { id: 1, sender: 'ai', text: '⏰ Herinnering: Morgen heeft u een afspraak bij ons om 14:30.\n\nAdres: Dokterslaan 12, Gent\n\nReply JA om te bevestigen of BEL als u wilt verzetten.', time: '16:00' },
          { id: 2, sender: 'user', text: 'JA', time: '16:45' },
          { id: 3, sender: 'ai', text: '👍 Bevestigd! We verwachten u morgen om 14:30. Tot dan!', time: '16:45' },
        ],
      },
      {
        id: 'conv3',
        name: 'Peter Claes',
        avatar: 'PC',
        messages: [
          { id: 1, sender: 'ai', text: 'Beste Peter, uw halfjaarlijkse controle staat gepland. Wilt u een afspraak inplannen voor een tandencontrole? We hebben volgende week nog plaatsen vrij.', time: '09:00' },
          { id: 2, sender: 'user', text: 'Ja graag, wanneer heeft u nog iets vrij op dinsdag?', time: '09:30' },
          { id: 3, sender: 'ai', text: 'Op dinsdag heb ik nog:\n\n📅 Dinsdag 13:00\n📅 Dinsdag 15:30\n\nWelk tijdstip verkiest u?', time: '09:30' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, title: 'Controle - Jan Vermeersch', time: '09:00', duration: 30, day: 0, color: '#10B981' },
      { id: 2, title: 'Vulling - Sarah Leclercq', time: '10:00', duration: 60, day: 0, color: '#F59E0B' },
      { id: 3, title: 'Extractie - Marc Dumont', time: '14:00', duration: 45, day: 1, color: '#EF4444' },
      { id: 4, title: 'Controle - Lisa Goossens', time: '14:30', duration: 30, day: 1, color: '#10B981' },
      { id: 5, title: 'Kroon plaatsing - Bert Claes', time: '09:30', duration: 90, day: 2, color: '#8B5CF6' },
      { id: 6, title: 'Controle - Familie Peters', time: '11:00', duration: 60, day: 3, color: '#10B981' },
      { id: 7, title: 'Bleekbehandeling - An Willems', time: '14:00', duration: 60, day: 4, color: '#06B6D4' },
    ],
    adminItems: [
      { id: 1, datum: '2024-06-10', omschrijving: 'Facturatie - controles week 23', bedrag: '€1.240', status: 'Klaar voor boekhouder' },
      { id: 2, datum: '2024-06-08', omschrijving: 'Verbruiksmateriaal - aanvulling', bedrag: '€380', status: 'Verwerkt' },
      { id: 3, datum: '2024-06-05', omschrijving: 'Tandheelkundig toestel - onderhoud', bedrag: '€750', status: 'Verwerkt' },
      { id: 4, datum: '2024-06-01', omschrijving: 'Facturatie - behandelingen mei', bedrag: '€4.320', status: 'Klaar voor boekhouder' },
      { id: 5, datum: '2024-05-30', omschrijving: 'Sterilisatie materiaal', bedrag: '€120', status: 'In behandeling' },
    ],
  },

  kinesist: {
    metrics: { berichten: 89, tijdBespaard: 7, afspraken: 34, omzet: '€4.780' },
    chartData: [
      { month: 'Jan', voor: 15, met: 4 },
      { month: 'Feb', voor: 16, met: 4 },
      { month: 'Mar', voor: 18, met: 5 },
      { month: 'Apr', voor: 17, met: 4 },
      { month: 'May', voor: 19, met: 5 },
      { month: 'Jun', voor: 20, met: 5 },
    ],
    whatsappConversations: [
      {
        id: 'conv1',
        name: 'Ahmed Bouazza',
        avatar: 'AB',
        messages: [
          { id: 1, sender: 'ai', text: '🏋️ Goedemorgen Ahmed! Vergeet uw oefeningen van vandaag niet:\n\n1️⃣ Heupflexie 3x15 reps\n2️⃣ Glutebrug 3x12\n3️⃣ Kniestrekking 2x20\n\nKlaar binnen 20 minuten. Succes! 💪', time: '08:00' },
          { id: 2, sender: 'user', text: 'Gedaan! Maar ik voel wat pijn bij oefening 2. Is dat normaal?', time: '09:30' },
          { id: 3, sender: 'ai', text: 'Goed dat u dit meldt! Lichte spierpijn na de glutebrug is normaal. Als het scherpe pijn is in het gewricht, stop dan en meld dit bij uw volgende sessie. Uw kinesist wordt op de hoogte gesteld. 🩺', time: '09:30' },
        ],
      },
      {
        id: 'conv2',
        name: 'Els Martens',
        avatar: 'EM',
        messages: [
          { id: 1, sender: 'ai', text: 'Beste Els, hoe verloopt uw herstel deze week? Heeft u de oefeningen kunnen doen?', time: '10:00' },
          { id: 2, sender: 'user', text: 'Het gaat beter! Ik heb 4 van de 5 dagen geoefend. Schouder doet minder pijn.', time: '10:15' },
          { id: 3, sender: 'ai', text: '🌟 Geweldig nieuws! 4/5 is uitstekend. Ik noteer uw voortgang. Uw kinesist ziet u morgen om 10:00 en zal de intensiteit aanpassen op basis van uw feedback.', time: '10:15' },
        ],
      },
      {
        id: 'conv3',
        name: 'Frank Dubois',
        avatar: 'FD',
        messages: [
          { id: 1, sender: 'ai', text: '⏰ Herinnering: Morgen sessie om 15:00 bij Kinesist De Groote.\n\nAdres: Sportlaan 7\n\nMeenemen: sportkleding en handdoek 🏃', time: '14:00' },
          { id: 2, sender: 'user', text: 'Bedankt voor de herinnering! Tot morgen', time: '14:30' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, title: 'Sessie - Ahmed Bouazza (rug)', time: '08:30', duration: 60, day: 0, color: '#F59E0B' },
      { id: 2, title: 'Sessie - Els Martens (schouder)', time: '10:00', duration: 60, day: 0, color: '#F59E0B' },
      { id: 3, title: 'Evaluatie - nieuwe patiënt', time: '13:00', duration: 90, day: 1, color: '#8B5CF6' },
      { id: 4, title: 'Sessie - Frank Dubois (knie)', time: '15:00', duration: 60, day: 1, color: '#F59E0B' },
      { id: 5, title: 'Sessie - Kim Verstappen', time: '09:00', duration: 60, day: 2, color: '#F59E0B' },
      { id: 6, title: 'Sportrevalidatie - groep', time: '11:00', duration: 90, day: 3, color: '#10B981' },
      { id: 7, title: 'Sessie - Lotte Baert', time: '14:30', duration: 60, day: 4, color: '#F59E0B' },
    ],
    adminItems: [
      { id: 1, datum: '2024-06-10', omschrijving: 'Facturatie - sessies week 23', bedrag: '€960', status: 'Klaar voor boekhouder' },
      { id: 2, datum: '2024-06-08', omschrijving: 'Mutualiteitsaanvraag - Ahmed B.', bedrag: '€240', status: 'In behandeling' },
      { id: 3, datum: '2024-06-05', omschrijving: 'Materiaalonderhoud apparatuur', bedrag: '€180', status: 'Verwerkt' },
      { id: 4, datum: '2024-06-01', omschrijving: 'Facturatie - mei behandelingen', bedrag: '€3.840', status: 'Klaar voor boekhouder' },
    ],
  },

  accountant: {
    metrics: { berichten: 234, tijdBespaard: 12, afspraken: 0, omzet: '€156.400' },
    chartData: [
      { month: 'Jan', voor: 25, met: 7 },
      { month: 'Feb', voor: 24, met: 6 },
      { month: 'Mar', voor: 28, met: 7 },
      { month: 'Apr', voor: 26, met: 6 },
      { month: 'May', voor: 27, met: 7 },
      { month: 'Jun', voor: 30, met: 6 },
    ],
    whatsappConversations: [
      {
        id: 'conv1',
        name: 'Systeem notificatie',
        avatar: 'SY',
        messages: [
          { id: 1, sender: 'ai', text: '📄 23 nieuwe facturen automatisch verwerkt via OCR. 2 facturen vereisen handmatige controle. Overzicht beschikbaar in het dashboard.', time: '07:00' },
          { id: 2, sender: 'ai', text: '⚠️ Herinnering: BTW-aangifte kwartaal 2 is over 5 dagen verschuldigd. 47 transacties klaargemaakt voor controle.', time: '08:00' },
        ],
      },
    ],
    documentItems: [
      { id: 1, datum: '2024-06-10', leverancier: 'Telenet Pro', bedrag: '€289,00', type: 'Aankoopfactuur', ocrStatus: 'Verwerkt' },
      { id: 2, datum: '2024-06-10', leverancier: 'Proximus', bedrag: '€124,50', type: 'Aankoopfactuur', ocrStatus: 'Verwerkt' },
      { id: 3, datum: '2024-06-09', leverancier: 'Bpost Business', bedrag: '€67,20', type: 'Aankoopfactuur', ocrStatus: 'Verwerkt' },
      { id: 4, datum: '2024-06-09', leverancier: 'Onleesbare scan', bedrag: '—', type: 'Aankoopfactuur', ocrStatus: 'Fout' },
      { id: 5, datum: '2024-06-08', leverancier: 'Amazon Business', bedrag: '€341,80', type: 'Aankoopfactuur', ocrStatus: 'Verwerkt' },
      { id: 6, datum: '2024-06-08', leverancier: 'Lidl Professional', bedrag: '€89,40', type: 'Kassabon', ocrStatus: 'In behandeling' },
      { id: 7, datum: '2024-06-07', leverancier: 'Carglass', bedrag: '€456,00', type: 'Aankoopfactuur', ocrStatus: 'Verwerkt' },
      { id: 8, datum: '2024-06-07', leverancier: 'Office Depot', bedrag: '€213,60', type: 'Aankoopfactuur', ocrStatus: 'Verwerkt' },
    ],
    agendaItems: [
      { id: 1, title: 'BTW-aangifte Q2 - De Smet NV', time: '09:00', duration: 60, day: 0, color: '#8B5CF6' },
      { id: 2, title: 'Jaarrekening - Bakkerij Leclercq', time: '11:00', duration: 120, day: 1, color: '#8B5CF6' },
      { id: 3, title: 'Adviesgesprek - StartUp Tech', time: '14:00', duration: 90, day: 2, color: '#2563EB' },
      { id: 4, title: 'Loonadministratie - mei', time: '09:00', duration: 180, day: 3, color: '#F59E0B' },
      { id: 5, title: 'Deadline aangifte personenbelasting', time: '17:00', duration: 60, day: 4, color: '#EF4444' },
    ],
    adminItems: [
      { id: 1, datum: '2024-06-10', omschrijving: 'Honorarium - De Smet NV Q2', bedrag: '€1.800', status: 'Klaar voor boekhouder' },
      { id: 2, datum: '2024-06-08', omschrijving: 'Abonnement software - Exact', bedrag: '€299', status: 'Verwerkt' },
      { id: 3, datum: '2024-06-05', omschrijving: 'Honorarium - Bakkerij Leclercq', bedrag: '€2.400', status: 'Klaar voor boekhouder' },
      { id: 4, datum: '2024-06-01', omschrijving: 'Kantoorkosten mei', bedrag: '€680', status: 'Verwerkt' },
      { id: 5, datum: '2024-05-28', omschrijving: 'Opleiding - fiscaal recht', bedrag: '€450', status: 'In behandeling' },
    ],
  },

  architect: {
    metrics: { berichten: 31, tijdBespaard: 5, afspraken: 8, omzet: '€24.600' },
    chartData: [
      { month: 'Jan', voor: 20, met: 5 },
      { month: 'Feb', voor: 22, met: 6 },
      { month: 'Mar', voor: 21, met: 5 },
      { month: 'Apr', voor: 24, met: 6 },
      { month: 'May', voor: 23, met: 5 },
      { month: 'Jun', voor: 25, met: 6 },
    ],
    whatsappConversations: [
      {
        id: 'conv1',
        name: 'Wim Bogaert',
        avatar: 'WB',
        messages: [
          { id: 1, sender: 'user', text: 'Hoe staat het met het project Bogaert? Wanneer komen de plannen klaar?', time: '09:00' },
          { id: 2, sender: 'ai', text: '🏗️ Projectupdate Bogaert Woning:\n\n✅ Voorontwerp: afgerond\n🔄 Bouwaanvraag: in behandeling (gemeentelijke dienst)\n⏳ Verwachte vergunning: 15 juli\n📐 Uitvoeringsplannen: gepland na vergunning\n\nU ontvangt een melding zodra de vergunning binnenkomt.', time: '09:00' },
        ],
      },
      {
        id: 'conv2',
        name: 'An Steyaert',
        avatar: 'AS',
        messages: [
          { id: 1, sender: 'ai', text: '⏰ Deadline herinnering: De indiening voor project Steyaert Renovatie is over 3 dagen. Documenten nog te valideren:\n\n☐ Energieprestatieverslag\n☐ Stabiliteitsstudie\n\nWilt u een afspraak om dit te bespreken?', time: '08:30' },
          { id: 2, sender: 'user', text: 'Ja, morgen om 10u zou perfect zijn', time: '09:00' },
          { id: 3, sender: 'ai', text: '✅ Afspraak bevestigd voor morgen 10:00. Ik zet het in de agenda en stuur een Google Meet link.', time: '09:00' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, title: 'Klantgesprek - Bogaert woning', time: '09:00', duration: 90, day: 0, color: '#EF4444' },
      { id: 2, title: 'Terreinbezoek - Nieuwbouw Leuven', time: '13:00', duration: 120, day: 1, color: '#F59E0B' },
      { id: 3, title: 'Overleg ingenieur - Steyaert', time: '10:00', duration: 60, day: 2, color: '#8B5CF6' },
      { id: 4, title: 'Indienen bouwaanvraag', time: '09:00', duration: 60, day: 3, color: '#EF4444' },
      { id: 5, title: 'Klantpresentatie - Verbouwing', time: '14:00', duration: 90, day: 4, color: '#2563EB' },
    ],
    adminItems: [
      { id: 1, datum: '2024-06-10', omschrijving: 'Honorarium ontwerp - Bogaert', bedrag: '€8.400', status: 'Klaar voor boekhouder' },
      { id: 2, datum: '2024-06-08', omschrijving: 'Software licentie ArchiCAD', bedrag: '€1.200', status: 'Verwerkt' },
      { id: 3, datum: '2024-06-05', omschrijving: 'Druk- en plotkosten plannen', bedrag: '€240', status: 'Verwerkt' },
      { id: 4, datum: '2024-06-01', omschrijving: 'Honorarium opvolging - Steyaert', bedrag: '€3.600', status: 'In behandeling' },
    ],
  },

  garage: {
    metrics: { berichten: 62, tijdBespaard: 5, afspraken: 41, omzet: '€18.940' },
    chartData: [
      { month: 'Jan', voor: 16, met: 4 },
      { month: 'Feb', voor: 17, met: 5 },
      { month: 'Mar', voor: 18, met: 4 },
      { month: 'Apr', voor: 19, met: 5 },
      { month: 'May', voor: 17, met: 4 },
      { month: 'Jun', voor: 20, met: 5 },
    ],
    whatsappConversations: [
      {
        id: 'conv1',
        name: 'Karel Hermans',
        avatar: 'KH',
        messages: [
          { id: 1, sender: 'ai', text: '🔧 Goedemorgen Karel! Uw voertuig (VW Golf - 1-ABC-234) is ontvangen en staat klaar voor onderhoud. We verwachten dit vandaag voor 17:00 af te ronden. U ontvangt een berichtje zodra het klaar is!', time: '08:15' },
          { id: 2, sender: 'user', text: 'Super, dank je! Kan ik ook vragen de banden te controleren?', time: '08:30' },
          { id: 3, sender: 'ai', text: '✅ Notatie gedaan! Bandencontrole wordt ook uitgevoerd. We houden u op de hoogte 🚗', time: '08:30' },
        ],
      },
      {
        id: 'conv2',
        name: 'Nathalie Peeters',
        avatar: 'NP',
        messages: [
          { id: 1, sender: 'ai', text: '✅ Goed nieuws Nathalie! Uw Ford Focus is klaar. Uitgevoerd:\n\n• Grote beurt gedaan\n• Remvloeistof vervangen\n• Banden gecontroleerd (OK)\n\nTotaalprijs: €384\n\n💳 Betaal gemakkelijk via: pay.garagematch.be/NP2024\n\nOpeningsuren: ma-vr 8-18u', time: '16:30' },
          { id: 2, sender: 'user', text: 'Betaald! Ik kom morgen ophalen', time: '16:45' },
        ],
      },
      {
        id: 'conv3',
        name: 'Bruno Claes',
        avatar: 'BC',
        messages: [
          { id: 1, sender: 'ai', text: '🔔 Herinnering: Uw Peugeot 308 (2-XYZ-789) is toe aan een onderhoudsbeurt.\n\nLaste beurt: november 2023\nKilometerstand: ~98.000 km\n\nWil u een afspraak inplannen? Reply met uw gewenste week!', time: '09:00' },
          { id: 2, sender: 'user', text: 'Week van 17 juni graag', time: '11:00' },
          { id: 3, sender: 'ai', text: '📅 Beschikbare tijden week 17 juni:\n\n• Maandag 17/6 om 9:00\n• Woensdag 19/6 om 14:00\n• Vrijdag 21/6 om 8:30\n\nWelk tijdstip past?', time: '11:00' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, title: 'Grote beurt - VW Golf (Hermans)', time: '08:00', duration: 120, day: 0, color: '#06B6D4' },
      { id: 2, title: 'APK-keuring - Toyota Yaris', time: '10:00', duration: 60, day: 0, color: '#F59E0B' },
      { id: 3, title: 'Remmen vervangen - BMW 3-serie', time: '09:00', duration: 180, day: 1, color: '#EF4444' },
      { id: 4, title: 'Bandenwisseling - Ford Focus', time: '14:00', duration: 60, day: 2, color: '#06B6D4' },
      { id: 5, title: 'Diagnose elektra - Mercedes', time: '10:00', duration: 90, day: 3, color: '#8B5CF6' },
      { id: 6, title: 'Kleine beurt - Opel Astra', time: '09:00', duration: 90, day: 4, color: '#06B6D4' },
    ],
    adminItems: [
      { id: 1, datum: '2024-06-10', omschrijving: 'Werkorder #2024-156 - Hermans', bedrag: '€284', status: 'Klaar voor boekhouder' },
      { id: 2, datum: '2024-06-09', omschrijving: 'Onderdelen inkoop - remmen BMW', bedrag: '€347', status: 'Verwerkt' },
      { id: 3, datum: '2024-06-08', omschrijving: 'Werkorder #2024-154 - Peeters', bedrag: '€384', status: 'Verwerkt' },
      { id: 4, datum: '2024-06-07', omschrijving: 'Bandenstock aanvulling', bedrag: '€1.240', status: 'In behandeling' },
      { id: 5, datum: '2024-06-05', omschrijving: 'Werkorders week 23', bedrag: '€2.180', status: 'Klaar voor boekhouder' },
    ],
  },

  horeca: {
    metrics: { berichten: 187, tijdBespaard: 4, afspraken: 187, omzet: '€43.200' },
    chartData: [
      { month: 'Jan', voor: 20, met: 5 },
      { month: 'Feb', voor: 22, met: 6 },
      { month: 'Mar', voor: 21, met: 5 },
      { month: 'Apr', voor: 25, met: 6 },
      { month: 'May', voor: 23, met: 5 },
      { month: 'Jun', voor: 27, met: 6 },
    ],
    whatsappConversations: [
      {
        id: 'conv1',
        name: 'Familie Janssen',
        avatar: 'FJ',
        messages: [
          { id: 1, sender: 'user', text: 'Goedemiddag, kunnen we vrijdagavond reserveren voor 4 personen om 20:00?', time: '14:30' },
          { id: 2, sender: 'ai', text: '🍽️ Zeker! Vrijdag 20:00, tafel voor 4 personen - ik reserveer dit voor u.\n\nHebben we rekening te houden met allergieën of dieetwensen?', time: '14:30' },
          { id: 3, sender: 'user', text: 'Ja, één persoon is glutenintolerant', time: '14:33' },
          { id: 4, sender: 'ai', text: '✅ Genoteerd! Reservering bevestigd:\n\n📅 Vrijdag 20:00\n👥 4 personen\n⚠️ 1x glutenintolerant (keuken op de hoogte gesteld)\n\nBevestigingsmail verstuurd. Tot vrijdag! 🥂', time: '14:33' },
        ],
      },
      {
        id: 'conv2',
        name: 'Dirk Verhoeven',
        avatar: 'DV',
        messages: [
          { id: 1, sender: 'ai', text: '🎂 Hallo Dirk! We zien dat u volgende week jarig bent. Als vaste gast willen we u graag trakteren op een gratis dessert bij uw volgende bezoek. Geniet ervan! 🎉', time: '10:00' },
          { id: 2, sender: 'user', text: 'Wauw, wat een leuke verrassing! Bedankt!', time: '10:15' },
          { id: 3, sender: 'ai', text: '🙌 Graag gedaan Dirk! We zien u graag binnenkort terug. Tot dan!', time: '10:15' },
        ],
      },
      {
        id: 'conv3',
        name: 'Emma De Backer',
        avatar: 'ED',
        messages: [
          { id: 1, sender: 'ai', text: '⭐ Beste Emma, bedankt voor uw bezoek gisteren! Heeft u genoten? We horen graag uw mening.\n\nLaat een review achter op Google en ontvang 10% korting bij uw volgende bezoek! 🙏', time: '12:00' },
          { id: 2, sender: 'user', text: 'Heerlijk gegeten! Review is geplaatst 😊', time: '13:00' },
        ],
      },
    ],
    agendaItems: [
      { id: 1, title: 'Reservering - 4 pers (Janssen)', time: '12:00', duration: 90, day: 0, color: '#F97316' },
      { id: 2, title: 'Zakenlunch - 8 pers', time: '12:30', duration: 120, day: 1, color: '#F97316' },
      { id: 3, title: 'Verjaardagsdiner - 12 pers', time: '19:00', duration: 180, day: 2, color: '#EF4444' },
      { id: 4, title: 'Groepsreservering - 20 pers', time: '19:30', duration: 180, day: 3, color: '#8B5CF6' },
      { id: 5, title: 'Reservering avond - 6 pers', time: '20:00', duration: 120, day: 4, color: '#F97316' },
    ],
    adminItems: [
      { id: 1, datum: '2024-06-10', omschrijving: 'Dagomzet maandag', bedrag: '€2.840', status: 'Klaar voor boekhouder' },
      { id: 2, datum: '2024-06-09', omschrijving: 'Drank- en voedingsleverancier', bedrag: '€1.680', status: 'Verwerkt' },
      { id: 3, datum: '2024-06-08', omschrijving: 'Dagomzet weekend', bedrag: '€7.240', status: 'Klaar voor boekhouder' },
      { id: 4, datum: '2024-06-07', omschrijving: 'Personeelskosten week 23', bedrag: '€3.420', status: 'Verwerkt' },
      { id: 5, datum: '2024-06-05', omschrijving: 'Onderhoud keukenapparatuur', bedrag: '€480', status: 'In behandeling' },
    ],
  },
}
