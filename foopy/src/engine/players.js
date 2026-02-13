import { invalidPlayers } from "./invalidPlayers.js";

function filterValidPlayers(players) {
  return players.filter(p => !invalidPlayers.includes(p.name));
}

const teams = {
  "ADE": [
    {
      "name": "Chayce JONES",
      "number": 1,
      "image": "/players/ADE_chaycejones_1.png"
    },
    {
      "name": "Ben KEAYS",
      "number": 2,
      "image": "/players/ADE_benkeays_2.png"
    },
    {
      "name": "Sam BERRY",
      "number": 3,
      "image": "/players/ADE_samberry_3.png"
    },
    {
      "name": "Callum AH CHEE",
      "number": 4,
      "image": "/players/ADE_callumahchee_4.png"
    },
    {
      "name": "Sid DRAPER",
      "number": 5,
      "image": "/players/ADE_siddraper_5.png"
    },
    {
      "name": "Daniel CURTIN",
      "number": 6,
      "image": "/players/ADE_danielcurtin_6.png"
    },
    {
      "name": "Riley THILTHORPE",
      "number": 7,
      "image": "/players/ADE_rileythilthorpe_7.png"
    },
    {
      "name": "Josh RACHELE",
      "number": 8,
      "image": "/players/ADE_joshrachele_8.png"
    },
    {
      "name": "Nick MURRAY",
      "number": 9,
      "image": "/players/ADE_nickmurray_9.png"
    },
    {
      "name": "Luke PEDLAR",
      "number": 10,
      "image": "/players/ADE_lukepedlar_10.png"
    },
    {
      "name": "Charlie EDWARDS",
      "number": 11,
      "image": "/players/ADE_charlieedwards_11.png"
    },
    {
      "name": "Jordan DAWSON",
      "number": 12,
      "image": "/players/ADE_jordandawson_12.png"
    },
    {
      "name": "Taylor WALKER",
      "number": 13,
      "image": "/players/ADE_taylorwalker_13.png"
    },
    {
      "name": "Jake SOLIGO",
      "number": 14,
      "image": "/players/ADE_jakesoligo_14.png"
    },
    {
      "name": "Brayden COOK",
      "number": 15,
      "image": "/players/ADE_braydencook_15.png"
    },
    {
      "name": "Max MICHALANNEY",
      "number": 16,
      "image": "/players/ADE_maxmichalanney_16.png"
    },
    {
      "name": "Tyler WELSH",
      "number": 17,
      "image": "/players/ADE_tylerwelsh_17.png"
    },
    {
      "name": "Zac TAYLOR",
      "number": 19,
      "image": "/players/ADE_zactaylor_19.png"
    },
    {
      "name": "Mitchell HINGE",
      "number": 20,
      "image": "/players/ADE_mitchellhinge_20.png"
    },
    {
      "name": "Hugh BOND",
      "number": 21,
      "image": "/players/ADE_hughbond_21.png"
    },
    {
      "name": "Oscar RYAN",
      "number": 22,
      "image": "/players/ADE_oscarryan_22.png"
    },
    {
      "name": "Izak RANKINE",
      "number": 23,
      "image": "/players/ADE_izakrankine_23.png"
    },
    {
      "name": "Josh WORRELL",
      "number": 24,
      "image": "/players/ADE_joshworrell_24.png"
    },
    {
      "name": "James PEATLING",
      "number": 25,
      "image": "/players/ADE_jamespeatling_25.png"
    },
    {
      "name": "Mitchell MARSH",
      "number": 26,
      "image": "/players/ADE_mitchellmarsh_26.png"
    },
    {
      "name": "Luke NANKERVIS",
      "number": 27,
      "image": "/players/ADE_lukenankervis_27.png"
    },
    {
      "name": "Alex NEAL-BULLEN",
      "number": 28,
      "image": "/players/ADE_alexneal-bullen_28.png"
    },
    {
      "name": "Rory LAIRD",
      "number": 29,
      "image": "/players/ADE_rorylaird_29.png"
    },
    {
      "name": "Wayne MILERA",
      "number": 30,
      "image": "/players/ADE_waynemilera_30.png"
    },
    {
      "name": "Billy DOWLING",
      "number": 31,
      "image": "/players/ADE_billydowling_31.png"
    },
    {
      "name": "Darcy FOGARTY",
      "number": 32,
      "image": "/players/ADE_darcyfogarty_32.png"
    },
    {
      "name": "Indy COTTON",
      "number": 33,
      "image": "/players/ADE_indycotton_33.png"
    },
    {
      "name": "Archie LUDOWYKE",
      "number": 34,
      "image": "/players/ADE_archieludowyke_34.png"
    },
    {
      "name": "James BORLASE",
      "number": 35,
      "image": "/players/ADE_jamesborlase_35.png"
    },
    {
      "name": "Finnbar MALEY",
      "number": 36,
      "image": "/players/ADE_finnbarmaley_36.png"
    },
    {
      "name": "Lachlan SHOLL",
      "number": 38,
      "image": "/players/ADE_lachlansholl_38.png"
    },
    {
      "name": "Toby MURRAY",
      "number": 39,
      "image": "/players/ADE_tobymurray_39.png"
    },
    {
      "name": "Jordon BUTTS",
      "number": 41,
      "image": "/players/ADE_jordonbutts_41.png"
    },
    {
      "name": "Lachlan MCANDREW",
      "number": 42,
      "image": "/players/ADE_lachlanmcandrew_42.png"
    },
    {
      "name": "Reilly O'BRIEN",
      "number": 43,
      "image": "/players/ADE_reillyobrien_43.png"
    },
    {
      "name": "Isaac CUMMING",
      "number": 44,
      "image": "/players/ADE_isaaccumming_44.png"
    },
    {
      "name": "Mark KEANE",
      "number": 48,
      "image": "/players/ADE_markkeane_48.png"
    }
  ],
  "BRI": [
    {
      "name": "Kai LOHMANN",
      "number": 1,
      "image": "/players/BRI_kailohmann_1.png"
    },
    {
      "name": "Sam DRAPER",
      "number": 2,
      "image": "/players/BRI_samdraper_2.png"
    },
    {
      "name": "Jaspa FLETCHER",
      "number": 3,
      "image": "/players/BRI_jaspafletcher_3.png"
    },
    {
      "name": "Oscar ALLEN",
      "number": 4,
      "image": "/players/BRI_oscarallen_4.png"
    },
    {
      "name": "Josh DUNKLEY",
      "number": 5,
      "image": "/players/BRI_joshdunkley_5.png"
    },
    {
      "name": "Hugh MCCLUGGAGE",
      "number": 6,
      "image": "/players/BRI_hughmccluggage_6.png"
    },
    {
      "name": "Jarrod BERRY",
      "number": 7,
      "image": "/players/BRI_jarrodberry_7.png"
    },
    {
      "name": "Will ASHCROFT",
      "number": 8,
      "image": "/players/BRI_willashcroft_8.png"
    },
    {
      "name": "Lachie NEALE",
      "number": 9,
      "image": "/players/BRI_lachieneale_9.png"
    },
    {
      "name": "Levi ASHCROFT",
      "number": 10,
      "image": "/players/BRI_leviashcroft_10.png"
    },
    {
      "name": "Lincoln MCCARTHY",
      "number": 11,
      "image": "/players/BRI_lincolnmccarthy_11.png"
    },
    {
      "name": "Tom DOEDEE",
      "number": 12,
      "image": "/players/BRI_tomdoedee_12.png"
    },
    {
      "name": "Logan MORRIS",
      "number": 13,
      "image": "/players/BRI_loganmorris_13.png"
    },
    {
      "name": "Daniel ANNABLE",
      "number": 14,
      "image": "/players/BRI_danielannable_14.png"
    },
    {
      "name": "Dayne ZORKO",
      "number": 15,
      "image": "/players/BRI_daynezorko_15.png"
    },
    {
      "name": "Cam RAYNER",
      "number": 16,
      "image": "/players/BRI_camrayner_16.png"
    },
    {
      "name": "Luke BEECKEN",
      "number": 17,
      "image": "/players/BRI_lukebeecken_17.png"
    },
    {
      "name": "Keidean COLEMAN",
      "number": 18,
      "image": "/players/BRI_keideancoleman_18.png"
    },
    {
      "name": "Luke LLOYD",
      "number": 19,
      "image": "/players/BRI_lukelloyd_19.png"
    },
    {
      "name": "Sam MARSHALL",
      "number": 20,
      "image": "/players/BRI_sammarshall_20.png"
    },
    {
      "name": "Zane ZAKOSTELSKY",
      "number": 21,
      "image": "/players/BRI_zanezakostelsky_21.png"
    },
    {
      "name": "Ty GALLOP",
      "number": 22,
      "image": "/players/BRI_tygallop_22.png"
    },
    {
      "name": "Charlie CAMERON",
      "number": 23,
      "image": "/players/BRI_charliecameron_23.png"
    },
    {
      "name": "Koby EVANS",
      "number": 24,
      "image": "/players/BRI_kobyevans_24.png"
    },
    {
      "name": "Henry SMITH",
      "number": 25,
      "image": "/players/BRI_henrysmith_25.png"
    },
    {
      "name": "Conor MCKENNA",
      "number": 26,
      "image": "/players/BRI_conormckenna_26.png"
    },
    {
      "name": "Darcy GARDINER",
      "number": 27,
      "image": "/players/BRI_darcygardiner_27.png"
    },
    {
      "name": "Will MCLACHLAN",
      "number": 28,
      "image": "/players/BRI_willmclachlan_28.png"
    },
    {
      "name": "James TUNSTILL",
      "number": 29,
      "image": "/players/BRI_jamestunstill_29.png"
    },
    {
      "name": "Eric HIPWOOD",
      "number": 30,
      "image": "/players/BRI_erichipwood_30.png"
    },
    {
      "name": "Harris ANDREWS",
      "number": 31,
      "image": "/players/BRI_harrisandrews_31.png"
    },
    {
      "name": "Darcy FORT",
      "number": 32,
      "image": "/players/BRI_darcyfort_32.png"
    },
    {
      "name": "Zac BAILEY",
      "number": 33,
      "image": "/players/BRI_zacbailey_33.png"
    },
    {
      "name": "Shadeau BRAIN",
      "number": 34,
      "image": "/players/BRI_shadeaubrain_34.png"
    },
    {
      "name": "Ryan LESTER",
      "number": 35,
      "image": "/players/BRI_ryanlester_35.png"
    },
    {
      "name": "Reece TORRENT",
      "number": 36,
      "image": "/players/BRI_reecetorrent_36.png"
    },
    {
      "name": "Cody CURTIN",
      "number": 37,
      "image": "/players/BRI_codycurtin_37.png"
    },
    {
      "name": "Bruce REVILLE",
      "number": 38,
      "image": "/players/BRI_brucereville_38.png"
    },
    {
      "name": "Ben MURPHY",
      "number": 39,
      "image": "/players/BRI_benmurphy_39.png"
    },
    {
      "name": "Jack PAYNE",
      "number": 40,
      "image": "/players/BRI_jackpayne_40.png"
    },
    {
      "name": "Darragh JOYCE",
      "number": 41,
      "image": "/players/BRI_darraghjoyce_41.png"
    },
    {
      "name": "Tai HAYES",
      "number": 42,
      "image": "/players/BRI_taihayes_42.png"
    },
    {
      "name": "Noah ANSWERTH",
      "number": 43,
      "image": "/players/BRI_noahanswerth_43.png"
    },
    {
      "name": "Darcy WILMOT",
      "number": 44,
      "image": "/players/BRI_darcywilmot_44.png"
    }
  ],
  "CAR": [
    {
      "name": "Lachlan COWAN",
      "number": 2,
      "image": "/players/CAR_lachlancowan_2.png"
    },
    {
      "name": "Jesse MOTLOP",
      "number": 3,
      "image": "/players/CAR_jessemotlop_3.png"
    },
    {
      "name": "Oliver HOLLANDS",
      "number": 4,
      "image": "/players/CAR_oliverhollands_4.png"
    },
    {
      "name": "Adam CERRA",
      "number": 5,
      "image": "/players/CAR_adamcerra_5.png"
    },
    {
      "name": "Zac WILLIAMS",
      "number": 6,
      "image": "/players/CAR_zacwilliams_6.png"
    },
    {
      "name": "Jagga SMITH",
      "number": 7,
      "image": "/players/CAR_jaggasmith_7.png"
    },
    {
      "name": "Lachie FOGARTY",
      "number": 8,
      "image": "/players/CAR_lachiefogarty_8.png"
    },
    {
      "name": "Patrick CRIPPS",
      "number": 9,
      "image": "/players/CAR_patrickcripps_9.png"
    },
    {
      "name": "Harry MCKAY",
      "number": 10,
      "image": "/players/CAR_harrymckay_10.png"
    },
    {
      "name": "Mitch MCGOVERN",
      "number": 11,
      "image": "/players/CAR_mitchmcgovern_11.png"
    },
    {
      "name": "Ben AINSWORTH",
      "number": 12,
      "image": "/players/CAR_benainsworth_12.png"
    },
    {
      "name": "Blake ACRES",
      "number": 13,
      "image": "/players/CAR_blakeacres_13.png"
    },
    {
      "name": "Oliver FLORENT",
      "number": 14,
      "image": "/players/CAR_oliverflorent_14.png"
    },
    {
      "name": "Billy WILSON",
      "number": 15,
      "image": "/players/CAR_billywilson_15.png"
    },
    {
      "name": "Ben CAMPOREALE",
      "number": 16,
      "image": "/players/CAR_bencamporeale_16.png"
    },
    {
      "name": "Brodie KEMP",
      "number": 17,
      "image": "/players/CAR_brodiekemp_17.png"
    },
    {
      "name": "Sam WALSH",
      "number": 18,
      "image": "/players/CAR_samwalsh_18.png"
    },
    {
      "name": "Will HAYWARD",
      "number": 19,
      "image": "/players/CAR_willhayward_19.png"
    },
    {
      "name": "Lucas CAMPOREALE",
      "number": 21,
      "image": "/players/CAR_lucascamporeale_21.png"
    },
    {
      "name": "Harry O'FARRELL",
      "number": 22,
      "image": "/players/CAR_harryofarrell_22.png"
    },
    {
      "name": "Jacob WEITERING",
      "number": 23,
      "image": "/players/CAR_jacobweitering_23.png"
    },
    {
      "name": "Nic NEWMAN",
      "number": 24,
      "image": "/players/CAR_nicnewman_24.png"
    },
    {
      "name": "Liam REIDY",
      "number": 25,
      "image": "/players/CAR_liamreidy_25.png"
    },
    {
      "name": "Nick HAYNES",
      "number": 26,
      "image": "/players/CAR_nickhaynes_26.png"
    },
    {
      "name": "Marc PITTONET",
      "number": 27,
      "image": "/players/CAR_marcpittonet_27.png"
    },
    {
      "name": "Harry CHARLESON",
      "number": 28,
      "image": "/players/CAR_harrycharleson_28.png"
    },
    {
      "name": "George HEWETT",
      "number": 29,
      "image": "/players/CAR_georgehewett_29.png"
    },
    {
      "name": "Jack ISON",
      "number": 30,
      "image": "/players/CAR_jackison_30.png"
    },
    {
      "name": "Campbell CHESSER",
      "number": 31,
      "image": "/players/CAR_campbellchesser_31.png"
    },
    {
      "name": "Matthew CARROLL",
      "number": 32,
      "image": "/players/CAR_matthewcarroll_32.png"
    },
    {
      "name": "Lewis YOUNG",
      "number": 33,
      "image": "/players/CAR_lewisyoung_33.png"
    },
    {
      "name": "Rob MONAHAN",
      "number": 34,
      "image": "/players/CAR_robmonahan_34.png"
    },
    {
      "name": "Harry DEAN",
      "number": 35,
      "image": "/players/CAR_harrydean_35.png"
    },
    {
      "name": "Cooper LORD",
      "number": 36,
      "image": "/players/CAR_cooperlord_36.png"
    },
    {
      "name": "Jordan BOYD",
      "number": 37,
      "image": "/players/CAR_jordanboyd_37.png"
    },
    {
      "name": "Talor BYRNE",
      "number": 39,
      "image": "/players/CAR_talorbyrne_39.png"
    },
    {
      "name": "Hudson O'KEEFFE",
      "number": 40,
      "image": "/players/CAR_hudsonokeeffe_40.png"
    },
    {
      "name": "Matt DUFFY",
      "number": 41,
      "image": "/players/CAR_mattduffy_41.png"
    },
    {
      "name": "Adam SAAD",
      "number": 42,
      "image": "/players/CAR_adamsaad_42.png"
    },
    {
      "name": "Ashton MOIR",
      "number": 43,
      "image": "/players/CAR_ashtonmoir_43.png"
    },
    {
      "name": "Francis EVANS",
      "number": 44,
      "image": "/players/CAR_francisevans_44.png"
    },
    {
      "name": "Flynn YOUNG",
      "number": 45,
      "image": "/players/CAR_flynnyoung_45.png"
    },
    {
      "name": "Matthew COTTRELL",
      "number": 46,
      "image": "/players/CAR_matthewcottrell_46.png"
    }
  ],
  "COL": [
    {
      "name": "Patrick LIPINSKI",
      "number": 1,
      "image": "/players/COL_patricklipinski_1.png"
    },
    {
      "name": "Jordan DE GOEY",
      "number": 2,
      "image": "/players/COL_jordandegoey_2.png"
    },
    {
      "name": "Isaac QUAYNOR",
      "number": 3,
      "image": "/players/COL_isaacquaynor_3.png"
    },
    {
      "name": "Brayden MAYNARD",
      "number": 4,
      "image": "/players/COL_braydenmaynard_4.png"
    },
    {
      "name": "Jamie ELLIOTT",
      "number": 5,
      "image": "/players/COL_jamieelliott_5.png"
    },
    {
      "name": "Josh DAICOS",
      "number": 7,
      "image": "/players/COL_joshdaicos_7.png"
    },
    {
      "name": "Lachie SCHULTZ",
      "number": 8,
      "image": "/players/COL_lachieschultz_8.png"
    },
    {
      "name": "Dan HOUSTON",
      "number": 9,
      "image": "/players/COL_danhouston_9.png"
    },
    {
      "name": "Scott PENDLEBURY",
      "number": 10,
      "image": "/players/COL_scottpendlebury_10.png"
    },
    {
      "name": "Daniel MCSTAY",
      "number": 11,
      "image": "/players/COL_danielmcstay_11.png"
    },
    {
      "name": "Harry PERRYMAN",
      "number": 12,
      "image": "/players/COL_harryperryman_12.png"
    },
    {
      "name": "Harry DEMATTIA",
      "number": 13,
      "image": "/players/COL_harrydemattia_13.png"
    },
    {
      "name": "Darcy CAMERON",
      "number": 14,
      "image": "/players/COL_darcycameron_14.png"
    },
    {
      "name": "Wil PARKER",
      "number": 15,
      "image": "/players/COL_wilparker_15.png"
    },
    {
      "name": "Edward ALLAN",
      "number": 16,
      "image": "/players/COL_edwardallan_16.png"
    },
    {
      "name": "Billy FRAMPTON",
      "number": 17,
      "image": "/players/COL_billyframpton_17.png"
    },
    {
      "name": "Tyan PRINDABLE",
      "number": 18,
      "image": "/players/COL_tyanprindable_18.png"
    },
    {
      "name": "Tew JIATH",
      "number": 19,
      "image": "/players/COL_tewjiath_19.png"
    },
    {
      "name": "Iliro SMIT",
      "number": 20,
      "image": "/players/COL_ilirosmit_20.png"
    },
    {
      "name": "Oscar STEENE",
      "number": 21,
      "image": "/players/COL_oscarsteene_21.png"
    },
    {
      "name": "Steele SIDEBOTTOM",
      "number": 22,
      "image": "/players/COL_steelesidebottom_22.png"
    },
    {
      "name": "Bobby HILL",
      "number": 23,
      "image": "/players/COL_bobbyhill_23.png"
    },
    {
      "name": "Jakob RYAN",
      "number": 24,
      "image": "/players/COL_jakobryan_24.png"
    },
    {
      "name": "Jack CRISP",
      "number": 25,
      "image": "/players/COL_jackcrisp_25.png"
    },
    {
      "name": "Reef MCINNES",
      "number": 26,
      "image": "/players/COL_reefmcinnes_26.png"
    },
    {
      "name": "Joel COCHRAN",
      "number": 27,
      "image": "/players/COL_joelcochran_27.png"
    },
    {
      "name": "Tim MEMBREY",
      "number": 28,
      "image": "/players/COL_timmembrey_28.png"
    },
    {
      "name": "Charlie WEST",
      "number": 29,
      "image": "/players/COL_charliewest_29.png"
    },
    {
      "name": "Darcy MOORE",
      "number": 30,
      "image": "/players/COL_darcymoore_30.png"
    },
    {
      "name": "Beau MCCREERY",
      "number": 31,
      "image": "/players/COL_beaumccreery_31.png"
    },
    {
      "name": "Sam SWADLING",
      "number": 32,
      "image": "/players/COL_samswadling_32.png"
    },
    {
      "name": "Lachlan SULLIVAN",
      "number": 33,
      "image": "/players/COL_lachlansullivan_33.png"
    },
    {
      "name": "Jack BULLER",
      "number": 34,
      "image": "/players/COL_jackbuller_34.png"
    },
    {
      "name": "Nick DAICOS",
      "number": 35,
      "image": "/players/COL_nickdaicos_35.png"
    },
    {
      "name": "Harvey HARRISON",
      "number": 36,
      "image": "/players/COL_harveyharrison_36.png"
    },
    {
      "name": "Jeremy HOWE",
      "number": 38,
      "image": "/players/COL_jeremyhowe_38.png"
    },
    {
      "name": "William HAYES",
      "number": 39,
      "image": "/players/COL_williamhayes_39.png"
    },
    {
      "name": "Noah HOWES",
      "number": 40,
      "image": "/players/COL_noahhowes_40.png"
    },
    {
      "name": "Ned LONG",
      "number": 44,
      "image": "/players/COL_nedlong_44.png"
    },
    {
      "name": "Roan STEELE",
      "number": 45,
      "image": "/players/COL_roansteele_45.png"
    }
  ],
  "ESS": [
    {
      "name": "Andrew MCGRATH",
      "number": 1,
      "image": "/players/ESS_andrewmcgrath_1.png"
    },
    {
      "name": "Jacob FARROW",
      "number": 2,
      "image": "/players/ESS_jacobfarrow_2.png"
    },
    {
      "name": "Darcy PARISH",
      "number": 3,
      "image": "/players/ESS_darcyparish_3.png"
    },
    {
      "name": "Kyle LANGFORD",
      "number": 4,
      "image": "/players/ESS_kylelangford_4.png"
    },
    {
      "name": "Elijah TSATAS",
      "number": 5,
      "image": "/players/ESS_elijahtsatas_5.png"
    },
    {
      "name": "Jye CALDWELL",
      "number": 6,
      "image": "/players/ESS_jyecaldwell_6.png"
    },
    {
      "name": "Zach MERRETT",
      "number": 7,
      "image": "/players/ESS_zachmerrett_7.png"
    },
    {
      "name": "Brayden FIORINI",
      "number": 8,
      "image": "/players/ESS_braydenfiorini_8.png"
    },
    {
      "name": "Sullivan ROBEY",
      "number": 9,
      "image": "/players/ESS_sullivanrobey_9.png"
    },
    {
      "name": "Isaac KAKO",
      "number": 10,
      "image": "/players/ESS_isaackako_10.png"
    },
    {
      "name": "Jade GRESHAM",
      "number": 11,
      "image": "/players/ESS_jadegresham_11.png"
    },
    {
      "name": "Will SETTERFIELD",
      "number": 12,
      "image": "/players/ESS_willsetterfield_12.png"
    },
    {
      "name": "Nik COX",
      "number": 13,
      "image": "/players/ESS_nikcox_13.png"
    },
    {
      "name": "Jordan RIDLEY",
      "number": 14,
      "image": "/players/ESS_jordanridley_14.png"
    },
    {
      "name": "Dyson SHARP",
      "number": 15,
      "image": "/players/ESS_dysonsharp_15.png"
    },
    {
      "name": "Archie PERKINS",
      "number": 16,
      "image": "/players/ESS_archieperkins_16.png"
    },
    {
      "name": "Vigo VISENTINI",
      "number": 17,
      "image": "/players/ESS_vigovisentini_17.png"
    },
    {
      "name": "Lewis HAYES",
      "number": 18,
      "image": "/players/ESS_lewishayes_18.png"
    },
    {
      "name": "Kayle GERREYN",
      "number": 19,
      "image": "/players/ESS_kaylegerreyn_19.png"
    },
    {
      "name": "Peter WRIGHT",
      "number": 20,
      "image": "/players/ESS_peterwright_20.png"
    },
    {
      "name": "Archie ROBERTS",
      "number": 21,
      "image": "/players/ESS_archieroberts_21.png"
    },
    {
      "name": "Sam DURHAM",
      "number": 22,
      "image": "/players/ESS_samdurham_22.png"
    },
    {
      "name": "Harrison JONES",
      "number": 23,
      "image": "/players/ESS_harrisonjones_23.png"
    },
    {
      "name": "Nick BRYAN",
      "number": 24,
      "image": "/players/ESS_nickbryan_24.png"
    },
    {
      "name": "Jaxon PRIOR",
      "number": 25,
      "image": "/players/ESS_jaxonprior_25.png"
    },
    {
      "name": "Archer MAY",
      "number": 26,
      "image": "/players/ESS_archermay_26.png"
    },
    {
      "name": "Mason REDMAN",
      "number": 27,
      "image": "/players/ESS_masonredman_27.png"
    },
    {
      "name": "Xavier DUURSMA",
      "number": 28,
      "image": "/players/ESS_xavierduursma_28.png"
    },
    {
      "name": "Max KONDOGIANNIS",
      "number": 29,
      "image": "/players/ESS_maxkondogiannis_29.png"
    },
    {
      "name": "Nate CADDY",
      "number": 30,
      "image": "/players/ESS_natecaddy_30.png"
    },
    {
      "name": "Zach REID",
      "number": 31,
      "image": "/players/ESS_zachreid_31.png"
    },
    {
      "name": "Ben MCKAY",
      "number": 32,
      "image": "/players/ESS_benmckay_32.png"
    },
    {
      "name": "Hussien EL ACHKAR",
      "number": 33,
      "image": "/players/ESS_hussienelachkar_33.png"
    },
    {
      "name": "Matt GUELFI",
      "number": 35,
      "image": "/players/ESS_mattguelfi_35.png"
    },
    {
      "name": "Angus CLARKE",
      "number": 36,
      "image": "/players/ESS_angusclarke_36.png"
    },
    {
      "name": "Nic MARTIN",
      "number": 37,
      "image": "/players/ESS_nicmartin_37.png"
    },
    {
      "name": "Rhys UNWIN",
      "number": 38,
      "image": "/players/ESS_rhysunwin_38.png"
    },
    {
      "name": "Zak JOHNSON",
      "number": 40,
      "image": "/players/ESS_zakjohnson_40.png"
    },
    {
      "name": "Saad EL-HAWLI",
      "number": 41,
      "image": "/players/ESS_saadel-hawli_41.png"
    },
    {
      "name": "Jayden NGUYEN",
      "number": 42,
      "image": "/players/ESS_jaydennguyen_42.png"
    },
    {
      "name": "Archer DAY-WICKS",
      "number": 44,
      "image": "/players/ESS_archerday-wicks_44.png"
    },
    {
      "name": "Thomas EDWARDS",
      "number": 45,
      "image": "/players/ESS_thomasedwards_45.png"
    },
    {
      "name": "Lachlan BLAKISTON",
      "number": 46,
      "image": "/players/ESS_lachlanblakiston_46.png"
    },
    {
      "name": "Liam MCMAHON",
      "number": 48,
      "image": "/players/ESS_liammcmahon_48.png"
    }
  ],
  "FRE": [
    {
      "name": "Sam STURT",
      "number": 1,
      "image": "/players/FRE_samsturt_1.png"
    },
    {
      "name": "Jaeger O'MEARA",
      "number": 2,
      "image": "/players/FRE_jaegeromeara_2.png"
    },
    {
      "name": "Caleb SERONG",
      "number": 3,
      "image": "/players/FRE_calebserong_3.png"
    },
    {
      "name": "Sean DARCY",
      "number": 4,
      "image": "/players/FRE_seandarcy_4.png"
    },
    {
      "name": "Heath CHAPMAN",
      "number": 5,
      "image": "/players/FRE_heathchapman_5.png"
    },
    {
      "name": "Jordan CLARK",
      "number": 6,
      "image": "/players/FRE_jordanclark_6.png"
    },
    {
      "name": "Andrew BRAYSHAW",
      "number": 8,
      "image": "/players/FRE_andrewbrayshaw_8.png"
    },
    {
      "name": "Luke JACKSON",
      "number": 9,
      "image": "/players/FRE_lukejackson_9.png"
    },
    {
      "name": "Shai BOLTON",
      "number": 10,
      "image": "/players/FRE_shaibolton_10.png"
    },
    {
      "name": "Tobyn MURRAY",
      "number": 11,
      "image": "/players/FRE_tobynmurray_11.png"
    },
    {
      "name": "Hugh DAVIES",
      "number": 12,
      "image": "/players/FRE_hughdavies_12.png"
    },
    {
      "name": "Luke RYAN",
      "number": 13,
      "image": "/players/FRE_lukeryan_13.png"
    },
    {
      "name": "Jeremy SHARP",
      "number": 14,
      "image": "/players/FRE_jeremysharp_14.png"
    },
    {
      "name": "Adam SWEID",
      "number": 15,
      "image": "/players/FRE_adamsweid_15.png"
    },
    {
      "name": "Murphy REID",
      "number": 16,
      "image": "/players/FRE_murphyreid_16.png"
    },
    {
      "name": "Judd MCVEE",
      "number": 17,
      "image": "/players/FRE_juddmcvee_17.png"
    },
    {
      "name": "Mason COX",
      "number": 18,
      "image": "/players/FRE_masoncox_18.png"
    },
    {
      "name": "Leon KICKETT",
      "number": 19,
      "image": "/players/FRE_leonkickett_19.png"
    },
    {
      "name": "Patrick VOSS",
      "number": 20,
      "image": "/players/FRE_patrickvoss_20.png"
    },
    {
      "name": "Oscar MCDONALD",
      "number": 21,
      "image": "/players/FRE_oscarmcdonald_21.png"
    },
    {
      "name": "Charlie NICHOLLS",
      "number": 22,
      "image": "/players/FRE_charlienicholls_22.png"
    },
    {
      "name": "Karl WORNER",
      "number": 23,
      "image": "/players/FRE_karlworner_23.png"
    },
    {
      "name": "Jye AMISS",
      "number": 24,
      "image": "/players/FRE_jyeamiss_24.png"
    },
    {
      "name": "Alex PEARCE",
      "number": 25,
      "image": "/players/FRE_alexpearce_25.png"
    },
    {
      "name": "Hayden YOUNG",
      "number": 26,
      "image": "/players/FRE_haydenyoung_26.png"
    },
    {
      "name": "Toby WHAN",
      "number": 27,
      "image": "/players/FRE_tobywhan_27.png"
    },
    {
      "name": "Neil ERASMUS",
      "number": 28,
      "image": "/players/FRE_neilerasmus_28.png"
    },
    {
      "name": "Cooper SIMPSON",
      "number": 29,
      "image": "/players/FRE_coopersimpson_29.png"
    },
    {
      "name": "Nathan O'DRISCOLL",
      "number": 30,
      "image": "/players/FRE_nathanodriscoll_30.png"
    },
    {
      "name": "Brandon WALKER",
      "number": 31,
      "image": "/players/FRE_brandonwalker_31.png"
    },
    {
      "name": "Michael FREDERICK",
      "number": 32,
      "image": "/players/FRE_michaelfrederick_32.png"
    },
    {
      "name": "Ollie MURPHY",
      "number": 33,
      "image": "/players/FRE_olliemurphy_33.png"
    },
    {
      "name": "Corey WAGNER",
      "number": 34,
      "image": "/players/FRE_coreywagner_34.png"
    },
    {
      "name": "Josh TREACY",
      "number": 35,
      "image": "/players/FRE_joshtreacy_35.png"
    },
    {
      "name": "Brennan COX",
      "number": 36,
      "image": "/players/FRE_brennancox_36.png"
    },
    {
      "name": "Joshua DRAPER",
      "number": 37,
      "image": "/players/FRE_joshuadraper_37.png"
    },
    {
      "name": "Jaren CARR",
      "number": 38,
      "image": "/players/FRE_jarencarr_38.png"
    },
    {
      "name": "Sam SWITKOWSKI",
      "number": 39,
      "image": "/players/FRE_samswitkowski_39.png"
    },
    {
      "name": "Ryda LUKE",
      "number": 40,
      "image": "/players/FRE_rydaluke_40.png"
    },
    {
      "name": "Bailey BANFIELD",
      "number": 41,
      "image": "/players/FRE_baileybanfield_41.png"
    },
    {
      "name": "Aiden RIDDLE",
      "number": 42,
      "image": "/players/FRE_aidenriddle_42.png"
    },
    {
      "name": "Isaiah DUDLEY",
      "number": 43,
      "image": "/players/FRE_isaiahdudley_43.png"
    },
    {
      "name": "Matthew JOHNSON",
      "number": 44,
      "image": "/players/FRE_matthewjohnson_44.png"
    }
  ],
  "GEE": [
    {
      "name": "Rhys STANLEY",
      "number": 1,
      "image": "/players/GEE_rhysstanley_1.png"
    },
    {
      "name": "Jay POLKINGHORNE",
      "number": 2,
      "image": "/players/GEE_jaypolkinghorne_2.png"
    },
    {
      "name": "Bailey SMITH",
      "number": 3,
      "image": "/players/GEE_baileysmith_3.png"
    },
    {
      "name": "Tanner BRUHN",
      "number": 4,
      "image": "/players/GEE_tannerbruhn_4.png"
    },
    {
      "name": "Jeremy CAMERON",
      "number": 5,
      "image": "/players/GEE_jeremycameron_5.png"
    },
    {
      "name": "Toby CONWAY",
      "number": 6,
      "image": "/players/GEE_tobyconway_6.png"
    },
    {
      "name": "Shaun MANNAGH",
      "number": 7,
      "image": "/players/GEE_shaunmannagh_7.png"
    },
    {
      "name": "Jake KOLODJASHNIJ",
      "number": 8,
      "image": "/players/GEE_jakekolodjashnij_8.png"
    },
    {
      "name": "Max HOLMES",
      "number": 9,
      "image": "/players/GEE_maxholmes_9.png"
    },
    {
      "name": "Mitch KNEVITT",
      "number": 10,
      "image": "/players/GEE_mitchknevitt_10.png"
    },
    {
      "name": "Mitchell EDWARDS",
      "number": 11,
      "image": "/players/GEE_mitchelledwards_11.png"
    },
    {
      "name": "Jack BOWES",
      "number": 12,
      "image": "/players/GEE_jackbowes_12.png"
    },
    {
      "name": "Jhye CLARK",
      "number": 13,
      "image": "/players/GEE_jhyeclark_13.png"
    },
    {
      "name": "Connor O'SULLIVAN",
      "number": 14,
      "image": "/players/GEE_connorosullivan_14.png"
    },
    {
      "name": "George STEVENS",
      "number": 15,
      "image": "/players/GEE_georgestevens_15.png"
    },
    {
      "name": "Sam DE KONING",
      "number": 16,
      "image": "/players/GEE_samdekoning_16.png"
    },
    {
      "name": "Lawson HUMPHRIES",
      "number": 17,
      "image": "/players/GEE_lawsonhumphries_17.png"
    },
    {
      "name": "Tyson STENGLE",
      "number": 18,
      "image": "/players/GEE_tysonstengle_18.png"
    },
    {
      "name": "Jack MARTIN",
      "number": 19,
      "image": "/players/GEE_jackmartin_19.png"
    },
    {
      "name": "Jacob MOLIER",
      "number": 20,
      "image": "/players/GEE_jacobmolier_20.png"
    },
    {
      "name": "Oliver WILTSHIRE",
      "number": 21,
      "image": "/players/GEE_oliverwiltshire_21.png"
    },
    {
      "name": "Hunter HOLMES",
      "number": 22,
      "image": "/players/GEE_hunterholmes_22.png"
    },
    {
      "name": "Lennox HOFMANN",
      "number": 23,
      "image": "/players/GEE_lennoxhofmann_23.png"
    },
    {
      "name": "Jed BEWS",
      "number": 24,
      "image": "/players/GEE_jedbews_24.png"
    },
    {
      "name": "Jesse MELLOR",
      "number": 25,
      "image": "/players/GEE_jessemellor_25.png"
    },
    {
      "name": "Harley BARKER",
      "number": 26,
      "image": "/players/GEE_harleybarker_26.png"
    },
    {
      "name": "Nicholas DRISCOLL",
      "number": 27,
      "image": "/players/GEE_nicholasdriscoll_27.png"
    },
    {
      "name": "Oliver DEMPSEY",
      "number": 28,
      "image": "/players/GEE_oliverdempsey_28.png"
    },
    {
      "name": "James WORPEL",
      "number": 29,
      "image": "/players/GEE_jamesworpel_29.png"
    },
    {
      "name": "Tom ATKINS",
      "number": 30,
      "image": "/players/GEE_tomatkins_30.png"
    },
    {
      "name": "Keighton MATOFAI-FORBES",
      "number": 31,
      "image": "/players/GEE_keightonmatofai-forbes_31.png"
    },
    {
      "name": "Gryan MIERS",
      "number": 32,
      "image": "/players/GEE_gryanmiers_32.png"
    },
    {
      "name": "Shannon NEALE",
      "number": 33,
      "image": "/players/GEE_shannonneale_33.png"
    },
    {
      "name": "Oisin MULLIN",
      "number": 34,
      "image": "/players/GEE_oisinmullin_34.png"
    },
    {
      "name": "Patrick DANGERFIELD",
      "number": 35,
      "image": "/players/GEE_patrickdangerfield_35.png"
    },
    {
      "name": "Oliver HENRY",
      "number": 36,
      "image": "/players/GEE_oliverhenry_36.png"
    },
    {
      "name": "Joe PIKE",
      "number": 37,
      "image": "/players/GEE_joepike_37.png"
    },
    {
      "name": "Jack HENRY",
      "number": 38,
      "image": "/players/GEE_jackhenry_38.png"
    },
    {
      "name": "Zach GUTHRIE",
      "number": 39,
      "image": "/players/GEE_zachguthrie_39.png"
    },
    {
      "name": "Cillian BURKE",
      "number": 41,
      "image": "/players/GEE_cillianburke_41.png"
    },
    {
      "name": "Mark O'CONNOR",
      "number": 42,
      "image": "/players/GEE_markoconnor_42.png"
    },
    {
      "name": "Tom STEWART",
      "number": 44,
      "image": "/players/GEE_tomstewart_44.png"
    },
    {
      "name": "Brad CLOSE",
      "number": 45,
      "image": "/players/GEE_bradclose_45.png"
    },
    {
      "name": "Mark BLICAVS",
      "number": 46,
      "image": "/players/GEE_markblicavs_46.png"
    }
  ],
  "GCS": [
    {
      "name": "Mac ANDREW",
      "number": 1,
      "image": "/players/GCS_macandrew_1.png"
    },
    {
      "name": "John NOBLE",
      "number": 2,
      "image": "/players/GCS_johnnoble_2.png"
    },
    {
      "name": "Christian PETRACCA",
      "number": 3,
      "image": "/players/GCS_christianpetracca_3.png"
    },
    {
      "name": "Jed WALTER",
      "number": 4,
      "image": "/players/GCS_jedwalter_4.png"
    },
    {
      "name": "Alex DAVIES",
      "number": 5,
      "image": "/players/GCS_alexdavies_5.png"
    },
    {
      "name": "Bodhi UWLAND",
      "number": 6,
      "image": "/players/GCS_bodhiuwland_6.png"
    },
    {
      "name": "Nick HOLMAN",
      "number": 7,
      "image": "/players/GCS_nickholman_7.png"
    },
    {
      "name": "Leonardo LOMBARD",
      "number": 8,
      "image": "/players/GCS_leonardolombard_8.png"
    },
    {
      "name": "Jamarra UGLE-HAGAN",
      "number": 9,
      "image": "/players/GCS_jamarraugle-hagan_9.png"
    },
    {
      "name": "Charlie BALLARD",
      "number": 10,
      "image": "/players/GCS_charlieballard_10.png"
    },
    {
      "name": "Touk MILLER",
      "number": 11,
      "image": "/players/GCS_toukmiller_11.png"
    },
    {
      "name": "Elliott HIMMELBERG",
      "number": 12,
      "image": "/players/GCS_elliotthimmelberg_12.png"
    },
    {
      "name": "Lachie WELLER",
      "number": 14,
      "image": "/players/GCS_lachieweller_14.png"
    },
    {
      "name": "Noah ANDERSON",
      "number": 15,
      "image": "/players/GCS_noahanderson_15.png"
    },
    {
      "name": "Daniel RIOLI",
      "number": 17,
      "image": "/players/GCS_danielrioli_17.png"
    },
    {
      "name": "Matt ROWELL",
      "number": 18,
      "image": "/players/GCS_mattrowell_18.png"
    },
    {
      "name": "Bailey HUMPHREY",
      "number": 19,
      "image": "/players/GCS_baileyhumphrey_19.png"
    },
    {
      "name": "Ethan READ",
      "number": 20,
      "image": "/players/GCS_ethanread_20.png"
    },
    {
      "name": "Ben LONG",
      "number": 22,
      "image": "/players/GCS_benlong_22.png"
    },
    {
      "name": "Ned MOYLE",
      "number": 23,
      "image": "/players/GCS_nedmoyle_23.png"
    },
    {
      "name": "Sam COLLINS",
      "number": 25,
      "image": "/players/GCS_samcollins_25.png"
    },
    {
      "name": "Will GRAHAM",
      "number": 26,
      "image": "/players/GCS_willgraham_26.png"
    },
    {
      "name": "Wil POWELL",
      "number": 27,
      "image": "/players/GCS_wilpowell_27.png"
    },
    {
      "name": "Jarrod WITTS",
      "number": 28,
      "image": "/players/GCS_jarrodwitts_28.png"
    },
    {
      "name": "Jake ROGERS",
      "number": 29,
      "image": "/players/GCS_jakerogers_29.png"
    },
    {
      "name": "Dylan PATTERSON",
      "number": 30,
      "image": "/players/GCS_dylanpatterson_30.png"
    },
    {
      "name": "Cooper BELL",
      "number": 31,
      "image": "/players/GCS_cooperbell_31.png"
    },
    {
      "name": "Zeke UWLAND",
      "number": 32,
      "image": "/players/GCS_zekeuwland_32.png"
    },
    {
      "name": "Sam CLOHESY",
      "number": 33,
      "image": "/players/GCS_samclohesy_33.png"
    },
    {
      "name": "Ben KING",
      "number": 34,
      "image": "/players/GCS_benking_34.png"
    },
    {
      "name": "Jai MURRAY",
      "number": 35,
      "image": "/players/GCS_jaimurray_35.png"
    },
    {
      "name": "Zak EVANS",
      "number": 36,
      "image": "/players/GCS_zakevans_36.png"
    },
    {
      "name": "Max KNOBEL",
      "number": 37,
      "image": "/players/GCS_maxknobel_37.png"
    },
    {
      "name": "Beau ADDINSALL",
      "number": 38,
      "image": "/players/GCS_beauaddinsall_38.png"
    },
    {
      "name": "Lachlan GULBIN",
      "number": 39,
      "image": "/players/GCS_lachlangulbin_39.png"
    },
    {
      "name": "Joel JEFFREY",
      "number": 40,
      "image": "/players/GCS_joeljeffrey_40.png"
    },
    {
      "name": "Avery THOMAS",
      "number": 41,
      "image": "/players/GCS_averythomas_41.png"
    },
    {
      "name": "Asher EASTHAM",
      "number": 42,
      "image": "/players/GCS_ashereastham_42.png"
    },
    {
      "name": "Koby COULSON",
      "number": 43,
      "image": "/players/GCS_kobycoulson_43.png"
    },
    {
      "name": "Ben JEPSON",
      "number": 44,
      "image": "/players/GCS_benjepson_44.png"
    },
    {
      "name": "Caleb LEWIS",
      "number": 45,
      "image": "/players/GCS_caleblewis_45.png"
    },
    {
      "name": "Caleb GRAHAM",
      "number": 46,
      "image": "/players/GCS_calebgraham_46.png"
    },
    {
      "name": "Oscar ADAMS",
      "number": 48,
      "image": "/players/GCS_oscaradams_48.png"
    },
    {
      "name": "Jy FARRAR",
      "number": 50,
      "image": "/players/GCS_jyfarrar_50.png"
    }
  ],
  "GWS": [
    {
      "name": "Harvey THOMAS",
      "number": 1,
      "image": "/players/GWS_harveythomas_1.png"
    },
    {
      "name": "Darcy JONES",
      "number": 2,
      "image": "/players/GWS_darcyjones_2.png"
    },
    {
      "name": "Stephen CONIGLIO",
      "number": 3,
      "image": "/players/GWS_stephenconiglio_3.png"
    },
    {
      "name": "Toby GREENE",
      "number": 4,
      "image": "/players/GWS_tobygreene_4.png"
    },
    {
      "name": "Aaron CADMAN",
      "number": 5,
      "image": "/players/GWS_aaroncadman_5.png"
    },
    {
      "name": "Lachie WHITFIELD",
      "number": 6,
      "image": "/players/GWS_lachiewhitfield_6.png"
    },
    {
      "name": "Lachie ASH",
      "number": 7,
      "image": "/players/GWS_lachieash_7.png"
    },
    {
      "name": "Ryan ANGWIN",
      "number": 9,
      "image": "/players/GWS_ryanangwin_9.png"
    },
    {
      "name": "Clayton OLIVER",
      "number": 10,
      "image": "/players/GWS_claytonoliver_10.png"
    },
    {
      "name": "Phoenix GOTHARD",
      "number": 11,
      "image": "/players/GWS_phoenixgothard_11.png"
    },
    {
      "name": "Tom GREEN",
      "number": 12,
      "image": "/players/GWS_tomgreen_12.png"
    },
    {
      "name": "Oliver HANNAFORD",
      "number": 13,
      "image": "/players/GWS_oliverhannaford_13.png"
    },
    {
      "name": "Toby BEDFORD",
      "number": 14,
      "image": "/players/GWS_tobybedford_14.png"
    },
    {
      "name": "Sam TAYLOR",
      "number": 15,
      "image": "/players/GWS_samtaylor_15.png"
    },
    {
      "name": "Brent DANIELS",
      "number": 16,
      "image": "/players/GWS_brentdaniels_16.png"
    },
    {
      "name": "Finn CALLAGHAN",
      "number": 17,
      "image": "/players/GWS_finncallaghan_17.png"
    },
    {
      "name": "Conor STONE",
      "number": 18,
      "image": "/players/GWS_conorstone_18.png"
    },
    {
      "name": "Harrison OLIVER",
      "number": 19,
      "image": "/players/GWS_harrisonoliver_19.png"
    },
    {
      "name": "Jake STRINGER",
      "number": 20,
      "image": "/players/GWS_jakestringer_20.png"
    },
    {
      "name": "Leek ALEER",
      "number": 21,
      "image": "/players/GWS_leekaleer_21.png"
    },
    {
      "name": "Josh KELLY",
      "number": 22,
      "image": "/players/GWS_joshkelly_22.png"
    },
    {
      "name": "Jesse HOGAN",
      "number": 23,
      "image": "/players/GWS_jessehogan_23.png"
    },
    {
      "name": "Harry ROWSTON",
      "number": 24,
      "image": "/players/GWS_harryrowston_24.png"
    },
    {
      "name": "Jayden LAVERDE",
      "number": 25,
      "image": "/players/GWS_jaydenlaverde_25.png"
    },
    {
      "name": "Jake RICCARDI",
      "number": 26,
      "image": "/players/GWS_jakericcardi_26.png"
    },
    {
      "name": "Harry HIMMELBERG",
      "number": 27,
      "image": "/players/GWS_harryhimmelberg_27.png"
    },
    {
      "name": "Jack OUGH",
      "number": 28,
      "image": "/players/GWS_jackough_28.png"
    },
    {
      "name": "Cody ANGOVE",
      "number": 29,
      "image": "/players/GWS_codyangove_29.png"
    },
    {
      "name": "James LEAKE",
      "number": 30,
      "image": "/players/GWS_jamesleake_30.png"
    },
    {
      "name": "Toby MCMULLIN",
      "number": 31,
      "image": "/players/GWS_tobymcmullin_31.png"
    },
    {
      "name": "Kieren BRIGGS",
      "number": 32,
      "image": "/players/GWS_kierenbriggs_32.png"
    },
    {
      "name": "Xavier O'HALLORAN",
      "number": 33,
      "image": "/players/GWS_xavierohalloran_33.png"
    },
    {
      "name": "Oskar TAYLOR",
      "number": 34,
      "image": "/players/GWS_oskartaylor_34.png"
    },
    {
      "name": "Max GRUZEWSKI",
      "number": 35,
      "image": "/players/GWS_maxgruzewski_35.png"
    },
    {
      "name": "Logan SMITH",
      "number": 36,
      "image": "/players/GWS_logansmith_36.png"
    },
    {
      "name": "Joe FONTI",
      "number": 37,
      "image": "/players/GWS_joefonti_37.png"
    },
    {
      "name": "Josaia DELANA",
      "number": 38,
      "image": "/players/GWS_josaiadelana_38.png"
    },
    {
      "name": "Connor IDUN",
      "number": 39,
      "image": "/players/GWS_connoridun_39.png"
    },
    {
      "name": "Nicholas MADDEN",
      "number": 41,
      "image": "/players/GWS_nicholasmadden_41.png"
    },
    {
      "name": "Nathan WARDIUS",
      "number": 42,
      "image": "/players/GWS_nathanwardius_42.png"
    },
    {
      "name": "Riley HAMILTON",
      "number": 43,
      "image": "/players/GWS_rileyhamilton_43.png"
    },
    {
      "name": "Jack BUCKLEY",
      "number": 44,
      "image": "/players/GWS_jackbuckley_44.png"
    },
    {
      "name": "Finnegan DAVIS",
      "number": 45,
      "image": "/players/GWS_finnegandavis_45.png"
    },
    {
      "name": "Callum BROWN",
      "number": 46,
      "image": "/players/GWS_callumbrown_46.png"
    }
  ],
  "HAW": [
    {
      "name": "Harry MORRISON",
      "number": 1,
      "image": "/players/HAW_harrymorrison_1.png"
    },
    {
      "name": "Mitch LEWIS",
      "number": 2,
      "image": "/players/HAW_mitchlewis_2.png"
    },
    {
      "name": "Jai NEWCOMBE",
      "number": 3,
      "image": "/players/HAW_jainewcombe_3.png"
    },
    {
      "name": "Jarman IMPEY",
      "number": 4,
      "image": "/players/HAW_jarmanimpey_4.png"
    },
    {
      "name": "Nick WATSON",
      "number": 5,
      "image": "/players/HAW_nickwatson_5.png"
    },
    {
      "name": "James SICILY",
      "number": 6,
      "image": "/players/HAW_jamessicily_6.png"
    },
    {
      "name": "Ned REEVES",
      "number": 7,
      "image": "/players/HAW_nedreeves_7.png"
    },
    {
      "name": "Dylan MOORE",
      "number": 8,
      "image": "/players/HAW_dylanmoore_8.png"
    },
    {
      "name": "Connor MACDONALD",
      "number": 9,
      "image": "/players/HAW_connormacdonald_9.png"
    },
    {
      "name": "Karl AMON",
      "number": 10,
      "image": "/players/HAW_karlamon_10.png"
    },
    {
      "name": "Conor NASH",
      "number": 11,
      "image": "/players/HAW_conornash_11.png"
    },
    {
      "name": "Will DAY",
      "number": 12,
      "image": "/players/HAW_willday_12.png"
    },
    {
      "name": "Calsher DEAR",
      "number": 13,
      "image": "/players/HAW_calsherdear_13.png"
    },
    {
      "name": "Jack SCRIMSHAW",
      "number": 14,
      "image": "/players/HAW_jackscrimshaw_14.png"
    },
    {
      "name": "Blake HARDWICK",
      "number": 15,
      "image": "/players/HAW_blakehardwick_15.png"
    },
    {
      "name": "Massimo D'AMBROSIO",
      "number": 16,
      "image": "/players/HAW_massimodambrosio_16.png"
    },
    {
      "name": "Lloyd MEEK",
      "number": 17,
      "image": "/players/HAW_lloydmeek_17.png"
    },
    {
      "name": "Mabior CHOL",
      "number": 18,
      "image": "/players/HAW_mabiorchol_18.png"
    },
    {
      "name": "Jack GUNSTON",
      "number": 19,
      "image": "/players/HAW_jackgunston_19.png"
    },
    {
      "name": "Finn MAGINNESS",
      "number": 20,
      "image": "/players/HAW_finnmaginness_20.png"
    },
    {
      "name": "Noah MRAZ",
      "number": 21,
      "image": "/players/HAW_noahmraz_21.png"
    },
    {
      "name": "Cameron NAIRN",
      "number": 22,
      "image": "/players/HAW_cameronnairn_22.png"
    },
    {
      "name": "Josh WEDDLE",
      "number": 23,
      "image": "/players/HAW_joshweddle_23.png"
    },
    {
      "name": "Josh BATTLE",
      "number": 24,
      "image": "/players/HAW_joshbattle_24.png"
    },
    {
      "name": "Josh WARD",
      "number": 25,
      "image": "/players/HAW_joshward_25.png"
    },
    {
      "name": "Bodie RYAN",
      "number": 26,
      "image": "/players/HAW_bodieryan_26.png"
    },
    {
      "name": "William MCCABE",
      "number": 27,
      "image": "/players/HAW_williammccabe_27.png"
    },
    {
      "name": "Cam MACKENZIE",
      "number": 28,
      "image": "/players/HAW_cammackenzie_28.png"
    },
    {
      "name": "Aidan SCHUBERT",
      "number": 29,
      "image": "/players/HAW_aidanschubert_29.png"
    },
    {
      "name": "Sam BUTLER",
      "number": 30,
      "image": "/players/HAW_sambutler_30.png"
    },
    {
      "name": "Matthew LERAY",
      "number": 31,
      "image": "/players/HAW_matthewleray_31.png"
    },
    {
      "name": "Cody ANDERSON",
      "number": 32,
      "image": "/players/HAW_codyanderson_32.png"
    },
    {
      "name": "Jack GINNIVAN",
      "number": 33,
      "image": "/players/HAW_jackginnivan_33.png"
    },
    {
      "name": "Jack DALTON",
      "number": 34,
      "image": "/players/HAW_jackdalton_34.png"
    },
    {
      "name": "Oliver GREEVES",
      "number": 35,
      "image": "/players/HAW_olivergreeves_35.png"
    },
    {
      "name": "James BLANCK",
      "number": 36,
      "image": "/players/HAW_jamesblanck_36.png"
    },
    {
      "name": "Tom BARRASS",
      "number": 37,
      "image": "/players/HAW_tombarrass_37.png"
    },
    {
      "name": "Max RAMSDEN",
      "number": 38,
      "image": "/players/HAW_maxramsden_38.png"
    },
    {
      "name": "Matt HILL",
      "number": 41,
      "image": "/players/HAW_matthill_41.png"
    },
    {
      "name": "Bailey MACDONALD",
      "number": 42,
      "image": "/players/HAW_baileymacdonald_42.png"
    },
    {
      "name": "Jaime UHR-HENRY",
      "number": 43,
      "image": "/players/HAW_jaimeuhr-henry_43.png"
    },
    {
      "name": "Henry HUSTWAITE",
      "number": 44,
      "image": "/players/HAW_henryhustwaite_44.png"
    }
  ],
  "MEL": [
    {
      "name": "Steven MAY",
      "number": 1,
      "image": "/players/MEL_stevenmay_1.png"
    },
    {
      "name": "Jacob VAN ROOYEN",
      "number": 2,
      "image": "/players/MEL_jacobvanrooyen_2.png"
    },
    {
      "name": "Christian SALEM",
      "number": 3,
      "image": "/players/MEL_christiansalem_3.png"
    },
    {
      "name": "Harvey LANGFORD",
      "number": 4,
      "image": "/players/MEL_harveylangford_4.png"
    },
    {
      "name": "Xavier LINDSAY",
      "number": 5,
      "image": "/players/MEL_xavierlindsay_5.png"
    },
    {
      "name": "Caleb WINDSOR",
      "number": 6,
      "image": "/players/MEL_calebwindsor_6.png"
    },
    {
      "name": "Jack VINEY",
      "number": 7,
      "image": "/players/MEL_jackviney_7.png"
    },
    {
      "name": "Jake LEVER",
      "number": 8,
      "image": "/players/MEL_jakelever_8.png"
    },
    {
      "name": "Jack STEELE",
      "number": 9,
      "image": "/players/MEL_jacksteele_9.png"
    },
    {
      "name": "Daniel TURNER",
      "number": 10,
      "image": "/players/MEL_danielturner_10.png"
    },
    {
      "name": "Max GAWN",
      "number": 11,
      "image": "/players/MEL_maxgawn_11.png"
    },
    {
      "name": "Koltyn THOLSTRUP",
      "number": 12,
      "image": "/players/MEL_koltyntholstrup_12.png"
    },
    {
      "name": "Jai CULLEY",
      "number": 13,
      "image": "/players/MEL_jaiculley_13.png"
    },
    {
      "name": "Changkuoth JIATH",
      "number": 14,
      "image": "/players/MEL_changkuothjiath_14.png"
    },
    {
      "name": "Ed LANGDON",
      "number": 15,
      "image": "/players/MEL_edlangdon_15.png"
    },
    {
      "name": "Bailey LAURIE",
      "number": 16,
      "image": "/players/MEL_baileylaurie_16.png"
    },
    {
      "name": "Jake BOWEY",
      "number": 17,
      "image": "/players/MEL_jakebowey_17.png"
    },
    {
      "name": "Jake MELKSHAM",
      "number": 18,
      "image": "/players/MEL_jakemelksham_18.png"
    },
    {
      "name": "Xavier TAYLOR",
      "number": 19,
      "image": "/players/MEL_xaviertaylor_19.png"
    },
    {
      "name": "Thomas MATTHEWS",
      "number": 20,
      "image": "/players/MEL_thomasmatthews_20.png"
    },
    {
      "name": "Matthew JEFFERSON",
      "number": 21,
      "image": "/players/MEL_matthewjefferson_21.png"
    },
    {
      "name": "Blake HOWES",
      "number": 22,
      "image": "/players/MEL_blakehowes_22.png"
    },
    {
      "name": "Shane MCADAM",
      "number": 23,
      "image": "/players/MEL_shanemcadam_23.png"
    },
    {
      "name": "Trent RIVERS",
      "number": 24,
      "image": "/players/MEL_trentrivers_24.png"
    },
    {
      "name": "Tom MCDONALD",
      "number": 25,
      "image": "/players/MEL_tommcdonald_25.png"
    },
    {
      "name": "Jed ADAMS",
      "number": 26,
      "image": "/players/MEL_jedadams_26.png"
    },
    {
      "name": "Max HEATH",
      "number": 27,
      "image": "/players/MEL_maxheath_27.png"
    },
    {
      "name": "Brody MIHOCEK",
      "number": 28,
      "image": "/players/MEL_brodymihocek_28.png"
    },
    {
      "name": "Tom CAMPBELL",
      "number": 29,
      "image": "/players/MEL_tomcampbell_29.png"
    },
    {
      "name": "Harry SHARP",
      "number": 30,
      "image": "/players/MEL_harrysharp_30.png"
    },
    {
      "name": "Bayley FRITSCH",
      "number": 31,
      "image": "/players/MEL_bayleyfritsch_31.png"
    },
    {
      "name": "Tom SPARROW",
      "number": 32,
      "image": "/players/MEL_tomsparrow_32.png"
    },
    {
      "name": "Latrelle PICKETT",
      "number": 33,
      "image": "/players/MEL_latrellepickett_33.png"
    },
    {
      "name": "Kalani WHITE",
      "number": 34,
      "image": "/players/MEL_kalaniwhite_34.png"
    },
    {
      "name": "Harrison PETTY",
      "number": 35,
      "image": "/players/MEL_harrisonpetty_35.png"
    },
    {
      "name": "Kysaiah PICKETT",
      "number": 36,
      "image": "/players/MEL_kysaiahpickett_36.png"
    },
    {
      "name": "Kade CHANDLER",
      "number": 37,
      "image": "/players/MEL_kadechandler_37.png"
    },
    {
      "name": "Oscar BERRY",
      "number": 38,
      "image": "/players/MEL_oscarberry_38.png"
    },
    {
      "name": "Ricky MENTHA",
      "number": 39,
      "image": "/players/MEL_rickymentha_39.png"
    },
    {
      "name": "Riley ONLEY",
      "number": 40,
      "image": "/players/MEL_rileyonley_40.png"
    },
    {
      "name": "Aidan JOHNSON",
      "number": 42,
      "image": "/players/MEL_aidanjohnson_42.png"
    },
    {
      "name": "Jack HENDERSON",
      "number": 43,
      "image": "/players/MEL_jackhenderson_43.png"
    },
    {
      "name": "Luker KENTFIELD",
      "number": 44,
      "image": "/players/MEL_lukerkentfield_44.png"
    },
    {
      "name": "Andy MONIZ-WAKEFIELD",
      "number": 45,
      "image": "/players/MEL_andymoniz-wakefield_45.png"
    }
  ],
  "NM": [
    {
      "name": "Lachy DOVASTON",
      "number": 1,
      "image": "/players/NM_lachydovaston_1.png"
    },
    {
      "name": "Finn O'SULLIVAN",
      "number": 2,
      "image": "/players/NM_finnosullivan_2.png"
    },
    {
      "name": "Harry SHEEZEL",
      "number": 3,
      "image": "/players/NM_harrysheezel_3.png"
    },
    {
      "name": "Aidan CORR",
      "number": 4,
      "image": "/players/NM_aidancorr_4.png"
    },
    {
      "name": "Caleb DANIEL",
      "number": 5,
      "image": "/players/NM_calebdaniel_5.png"
    },
    {
      "name": "George WARDLAW",
      "number": 6,
      "image": "/players/NM_georgewardlaw_6.png"
    },
    {
      "name": "Zane DUURSMA",
      "number": 7,
      "image": "/players/NM_zaneduursma_7.png"
    },
    {
      "name": "Bailey SCOTT",
      "number": 8,
      "image": "/players/NM_baileyscott_8.png"
    },
    {
      "name": "Luke DAVIES-UNIACKE",
      "number": 9,
      "image": "/players/NM_lukedavies-uniacke_9.png"
    },
    {
      "name": "Colby MCKERCHER",
      "number": 10,
      "image": "/players/NM_colbymckercher_10.png"
    },
    {
      "name": "Luke MCDONALD",
      "number": 11,
      "image": "/players/NM_lukemcdonald_11.png"
    },
    {
      "name": "Jy SIMPKIN",
      "number": 12,
      "image": "/players/NM_jysimpkin_12.png"
    },
    {
      "name": "Charlie SPARGO",
      "number": 13,
      "image": "/players/NM_charliespargo_13.png"
    },
    {
      "name": "Luke URQUHART",
      "number": 14,
      "image": "/players/NM_lukeurquhart_14.png"
    },
    {
      "name": "Dylan STEPHENS",
      "number": 15,
      "image": "/players/NM_dylanstephens_15.png"
    },
    {
      "name": "Zac FISHER",
      "number": 16,
      "image": "/players/NM_zacfisher_16.png"
    },
    {
      "name": "Riley HARDEMAN",
      "number": 17,
      "image": "/players/NM_rileyhardeman_17.png"
    },
    {
      "name": "Wil DAWSON",
      "number": 18,
      "image": "/players/NM_wildawson_18.png"
    },
    {
      "name": "Griffin LOGUE",
      "number": 19,
      "image": "/players/NM_griffinlogue_19.png"
    },
    {
      "name": "Nick LARKEY",
      "number": 20,
      "image": "/players/NM_nicklarkey_20.png"
    },
    {
      "name": "Callum COLEMAN-JONES",
      "number": 21,
      "image": "/players/NM_callumcoleman-jones_21.png"
    },
    {
      "name": "Taylor GOAD",
      "number": 22,
      "image": "/players/NM_taylorgoad_22.png"
    },
    {
      "name": "Blake THREDGOLD",
      "number": 23,
      "image": "/players/NM_blakethredgold_23.png"
    },
    {
      "name": "Tom POWELL",
      "number": 24,
      "image": "/players/NM_tompowell_24.png"
    },
    {
      "name": "Paul CURTIS",
      "number": 25,
      "image": "/players/NM_paulcurtis_25.png"
    },
    {
      "name": "Luke PARKER",
      "number": 26,
      "image": "/players/NM_lukeparker_26.png"
    },
    {
      "name": "Jack DARLING",
      "number": 27,
      "image": "/players/NM_jackdarling_27.png"
    },
    {
      "name": "Hugo MIKUNDA",
      "number": 28,
      "image": "/players/NM_hugomikunda_28.png"
    },
    {
      "name": "Charlie COMBEN",
      "number": 30,
      "image": "/players/NM_charliecomben_30.png"
    },
    {
      "name": "Josh GOATER",
      "number": 31,
      "image": "/players/NM_joshgoater_31.png"
    },
    {
      "name": "Toby PINK",
      "number": 32,
      "image": "/players/NM_tobypink_32.png"
    },
    {
      "name": "Brayden GEORGE",
      "number": 33,
      "image": "/players/NM_braydengeorge_33.png"
    },
    {
      "name": "Jackson ARCHER",
      "number": 34,
      "image": "/players/NM_jacksonarcher_34.png"
    },
    {
      "name": "Matt WHITLOCK",
      "number": 35,
      "image": "/players/NM_mattwhitlock_35.png"
    },
    {
      "name": "River STEVENS",
      "number": 36,
      "image": "/players/NM_riverstevens_36.png"
    },
    {
      "name": "Cooper HARVEY",
      "number": 37,
      "image": "/players/NM_cooperharvey_37.png"
    },
    {
      "name": "Tristan XERRI",
      "number": 38,
      "image": "/players/NM_tristanxerri_38.png"
    },
    {
      "name": "Jacob KONSTANTY",
      "number": 41,
      "image": "/players/NM_jacobkonstanty_41.png"
    },
    {
      "name": "Cameron ZURHAAR",
      "number": 44,
      "image": "/players/NM_cameronzurhaar_44.png"
    },
    {
      "name": "Zac BANCH",
      "number": 45,
      "image": "/players/NM_zacbanch_45.png"
    },
    {
      "name": "Robert HANSEN JR",
      "number": 46,
      "image": "/players/NM_roberthansenjr_46.png"
    },
    {
      "name": "Cooper TREMBATH",
      "number": 47,
      "image": "/players/NM_coopertrembath_47.png"
    }
  ],
  "PA": [
    {
      "name": "Connor ROZEE",
      "number": 1,
      "image": "/players/PA_connorrozee_1.png"
    },
    {
      "name": "Sam POWELL-PEPPER",
      "number": 2,
      "image": "/players/PA_sampowell-pepper_2.png"
    },
    {
      "name": "Jackson MEAD",
      "number": 3,
      "image": "/players/PA_jacksonmead_3.png"
    },
    {
      "name": "Todd MARSHALL",
      "number": 4,
      "image": "/players/PA_toddmarshall_4.png"
    },
    {
      "name": "Joe BERRY",
      "number": 5,
      "image": "/players/PA_joeberry_5.png"
    },
    {
      "name": "Kane FARRELL",
      "number": 6,
      "image": "/players/PA_kanefarrell_6.png"
    },
    {
      "name": "Jase BURGOYNE",
      "number": 7,
      "image": "/players/PA_jaseburgoyne_7.png"
    },
    {
      "name": "Josh SINN",
      "number": 8,
      "image": "/players/PA_joshsinn_8.png"
    },
    {
      "name": "Zak BUTTERS",
      "number": 9,
      "image": "/players/PA_zakbutters_9.png"
    },
    {
      "name": "Christian MORAES",
      "number": 11,
      "image": "/players/PA_christianmoraes_11.png"
    },
    {
      "name": "Jack LUKOSIUS",
      "number": 12,
      "image": "/players/PA_jacklukosius_12.png"
    },
    {
      "name": "Ivan SOLDO",
      "number": 13,
      "image": "/players/PA_ivansoldo_13.png"
    },
    {
      "name": "Miles BERGMAN",
      "number": 14,
      "image": "/players/PA_milesbergman_14.png"
    },
    {
      "name": "Jacob WEHR",
      "number": 15,
      "image": "/players/PA_jacobwehr_15.png"
    },
    {
      "name": "Ollie WINES",
      "number": 16,
      "image": "/players/PA_olliewines_16.png"
    },
    {
      "name": "Jack WHITLOCK",
      "number": 17,
      "image": "/players/PA_jackwhitlock_17.png"
    },
    {
      "name": "Jason HORNE-FRANCIS",
      "number": 18,
      "image": "/players/PA_jasonhorne-francis_18.png"
    },
    {
      "name": "Mitch GEORGIADES",
      "number": 19,
      "image": "/players/PA_mitchgeorgiades_19.png"
    },
    {
      "name": "Aliir ALIIR",
      "number": 21,
      "image": "/players/PA_aliiraliir_21.png"
    },
    {
      "name": "Logan EVANS",
      "number": 22,
      "image": "/players/PA_loganevans_22.png"
    },
    {
      "name": "Will BRODIE",
      "number": 23,
      "image": "/players/PA_willbrodie_23.png"
    },
    {
      "name": "Jordon SWEET",
      "number": 24,
      "image": "/players/PA_jordonsweet_24.png"
    },
    {
      "name": "Brandon ZERK-THATCHER",
      "number": 25,
      "image": "/players/PA_brandonzerk-thatcher_25.png"
    },
    {
      "name": "Tom COCHRANE",
      "number": 26,
      "image": "/players/PA_tomcochrane_26.png"
    },
    {
      "name": "Esava RATUGOLEA",
      "number": 27,
      "image": "/players/PA_esavaratugolea_27.png"
    },
    {
      "name": "Willem DREW",
      "number": 28,
      "image": "/players/PA_willemdrew_28.png"
    },
    {
      "name": "Tom ANASTASOPOULOS",
      "number": 29,
      "image": "/players/PA_tomanastasopoulos_29.png"
    },
    {
      "name": "Ollie LORD",
      "number": 30,
      "image": "/players/PA_ollielord_30.png"
    },
    {
      "name": "Ewan MACKINLAY",
      "number": 31,
      "image": "/players/PA_ewanmackinlay_31.png"
    },
    {
      "name": "Harrison RAMM",
      "number": 32,
      "image": "/players/PA_harrisonramm_32.png"
    },
    {
      "name": "Darcy BYRNE-JONES",
      "number": 33,
      "image": "/players/PA_darcybyrne-jones_33.png"
    },
    {
      "name": "Lachie JONES",
      "number": 34,
      "image": "/players/PA_lachiejones_34.png"
    },
    {
      "name": "Joe RICHARDS",
      "number": 35,
      "image": "/players/PA_joerichards_35.png"
    },
    {
      "name": "Will LORENZ",
      "number": 36,
      "image": "/players/PA_willlorenz_36.png"
    },
    {
      "name": "Jack WATKINS",
      "number": 37,
      "image": "/players/PA_jackwatkins_37.png"
    },
    {
      "name": "Dante VISENTINI",
      "number": 38,
      "image": "/players/PA_dantevisentini_38.png"
    },
    {
      "name": "Benny BARRETT",
      "number": 40,
      "image": "/players/PA_bennybarrett_40.png"
    },
    {
      "name": "Jacob MOSS",
      "number": 42,
      "image": "/players/PA_jacobmoss_42.png"
    },
    {
      "name": "Josh LAI",
      "number": 43,
      "image": "/players/PA_joshlai_43.png"
    },
    {
      "name": "Corey DURDIN",
      "number": 44,
      "image": "/players/PA_coreydurdin_44.png"
    },
    {
      "name": "Xavier WALSH",
      "number": 45,
      "image": "/players/PA_xavierwalsh_45.png"
    },
    {
      "name": "Mani LIDDY",
      "number": 50,
      "image": "/players/PA_maniliddy_50.png"
    }
  ],
  "RIC": [
    {
      "name": "Nick VLASTUIN",
      "number": 1,
      "image": "/players/RIC_nickvlastuin_1.png"
    },
    {
      "name": "Jacob HOPPER",
      "number": 2,
      "image": "/players/RIC_jacobhopper_2.png"
    },
    {
      "name": "Dion PRESTIA",
      "number": 3,
      "image": "/players/RIC_dionprestia_3.png"
    },
    {
      "name": "Sam LALOR",
      "number": 4,
      "image": "/players/RIC_samlalor_4.png"
    },
    {
      "name": "Jack ROSS",
      "number": 5,
      "image": "/players/RIC_jackross_5.png"
    },
    {
      "name": "Sam BANKS",
      "number": 6,
      "image": "/players/RIC_sambanks_6.png"
    },
    {
      "name": "Rhyan MANSELL",
      "number": 7,
      "image": "/players/RIC_rhyanmansell_7.png"
    },
    {
      "name": "Jonty FAULL",
      "number": 8,
      "image": "/players/RIC_jontyfaull_8.png"
    },
    {
      "name": "Taj HOTTON",
      "number": 10,
      "image": "/players/RIC_tajhotton_10.png"
    },
    {
      "name": "Luke TRAINOR",
      "number": 11,
      "image": "/players/RIC_luketrainor_11.png"
    },
    {
      "name": "Ben MILLER",
      "number": 12,
      "image": "/players/RIC_benmiller_12.png"
    },
    {
      "name": "Hugo RALPHSMITH",
      "number": 13,
      "image": "/players/RIC_hugoralphsmith_13.png"
    },
    {
      "name": "Tim TARANTO",
      "number": 14,
      "image": "/players/RIC_timtaranto_14.png"
    },
    {
      "name": "Jayden SHORT",
      "number": 15,
      "image": "/players/RIC_jaydenshort_15.png"
    },
    {
      "name": "Josh SMILLIE",
      "number": 16,
      "image": "/players/RIC_joshsmillie_16.png"
    },
    {
      "name": "Maurice RIOLI",
      "number": 17,
      "image": "/players/RIC_mauricerioli_17.png"
    },
    {
      "name": "Josh GIBCUS",
      "number": 18,
      "image": "/players/RIC_joshgibcus_18.png"
    },
    {
      "name": "Tom LYNCH",
      "number": 19,
      "image": "/players/RIC_tomlynch_19.png"
    },
    {
      "name": "Noah BALTA",
      "number": 21,
      "image": "/players/RIC_noahbalta_21.png"
    },
    {
      "name": "Sam CUMMING",
      "number": 22,
      "image": "/players/RIC_samcumming_22.png"
    },
    {
      "name": "Judson CLARKE",
      "number": 23,
      "image": "/players/RIC_judsonclarke_23.png"
    },
    {
      "name": "Sam GRLJ",
      "number": 24,
      "image": "/players/RIC_samgrlj_24.png"
    },
    {
      "name": "Toby NANKERVIS",
      "number": 25,
      "image": "/players/RIC_tobynankervis_25.png"
    },
    {
      "name": "Zane PEUCKER",
      "number": 26,
      "image": "/players/RIC_zanepeucker_26.png"
    },
    {
      "name": "Noah ROBERTS-THOMSON",
      "number": 27,
      "image": "/players/RIC_noahroberts-thomson_27.png"
    },
    {
      "name": "Kane MCAULIFFE",
      "number": 28,
      "image": "/players/RIC_kanemcauliffe_28.png"
    },
    {
      "name": "Jasper ALGER",
      "number": 29,
      "image": "/players/RIC_jasperalger_29.png"
    },
    {
      "name": "Tom BROWN",
      "number": 30,
      "image": "/players/RIC_tombrown_30.png"
    },
    {
      "name": "Samson RYAN",
      "number": 32,
      "image": "/players/RIC_samsonryan_32.png"
    },
    {
      "name": "Patrick RETSCHKO",
      "number": 33,
      "image": "/players/RIC_patrickretschko_33.png"
    },
    {
      "name": "Harry ARMSTRONG",
      "number": 34,
      "image": "/players/RIC_harryarmstrong_34.png"
    },
    {
      "name": "Nathan BROAD",
      "number": 35,
      "image": "/players/RIC_nathanbroad_35.png"
    },
    {
      "name": "James TREZISE",
      "number": 36,
      "image": "/players/RIC_jamestrezise_36.png"
    },
    {
      "name": "Tom SIMS",
      "number": 38,
      "image": "/players/RIC_tomsims_38.png"
    },
    {
      "name": "Tyler SONSIE",
      "number": 40,
      "image": "/players/RIC_tylersonsie_40.png"
    },
    {
      "name": "Mykelti LEFAU",
      "number": 42,
      "image": "/players/RIC_mykeltilefau_42.png"
    },
    {
      "name": "Liam FAWCETT",
      "number": 43,
      "image": "/players/RIC_liamfawcett_43.png"
    },
    {
      "name": "Seth CAMPBELL",
      "number": 44,
      "image": "/players/RIC_sethcampbell_44.png"
    },
    {
      "name": "Oliver HAYES-BROWN",
      "number": 47,
      "image": "/players/RIC_oliverhayes-brown_47.png"
    },
    {
      "name": "Steely GREEN",
      "number": 48,
      "image": "/players/RIC_steelygreen_48.png"
    },
    {
      "name": "Kaleb SMITH",
      "number": 49,
      "image": "/players/RIC_kalebsmith_49.png"
    },
    {
      "name": "Campbell GRAY",
      "number": 50,
      "image": "/players/RIC_campbellgray_50.png"
    }
  ],
  "STK": [
    {
      "name": "Jack HIGGINS",
      "number": 1,
      "image": "/players/STK_jackhiggins_1.png"
    },
    {
      "name": "Marcus WINDHAGER",
      "number": 2,
      "image": "/players/STK_marcuswindhager_2.png"
    },
    {
      "name": "Jack SILVAGNI",
      "number": 3,
      "image": "/players/STK_jacksilvagni_3.png"
    },
    {
      "name": "Lance COLLARD",
      "number": 4,
      "image": "/players/STK_lancecollard_4.png"
    },
    {
      "name": "Tobie TRAVAGLIA",
      "number": 5,
      "image": "/players/STK_tobietravaglia_5.png"
    },
    {
      "name": "Jack MACRAE",
      "number": 6,
      "image": "/players/STK_jackmacrae_6.png"
    },
    {
      "name": "Nasiah WANGANEEN-MILERA",
      "number": 7,
      "image": "/players/STK_nasiahwanganeen-milera_7.png"
    },
    {
      "name": "Bradley HILL",
      "number": 8,
      "image": "/players/STK_bradleyhill_8.png"
    },
    {
      "name": "Sam FLANDERS",
      "number": 9,
      "image": "/players/STK_samflanders_9.png"
    },
    {
      "name": "Mitch OWENS",
      "number": 10,
      "image": "/players/STK_mitchowens_10.png"
    },
    {
      "name": "Hunter CLARK",
      "number": 11,
      "image": "/players/STK_hunterclark_11.png"
    },
    {
      "name": "Max KING",
      "number": 12,
      "image": "/players/STK_maxking_12.png"
    },
    {
      "name": "Ryan BYRNES",
      "number": 13,
      "image": "/players/STK_ryanbyrnes_13.png"
    },
    {
      "name": "Liam STOCKER",
      "number": 14,
      "image": "/players/STK_liamstocker_14.png"
    },
    {
      "name": "Paddy DOW",
      "number": 15,
      "image": "/players/STK_paddydow_15.png"
    },
    {
      "name": "Dan BUTLER",
      "number": 16,
      "image": "/players/STK_danbutler_16.png"
    },
    {
      "name": "Isaac KEELER",
      "number": 17,
      "image": "/players/STK_isaackeeler_17.png"
    },
    {
      "name": "Jack CARROLL",
      "number": 18,
      "image": "/players/STK_jackcarroll_18.png"
    },
    {
      "name": "Rowan MARSHALL",
      "number": 19,
      "image": "/players/STK_rowanmarshall_19.png"
    },
    {
      "name": "Dougal HOWARD",
      "number": 20,
      "image": "/players/STK_dougalhoward_20.png"
    },
    {
      "name": "Tom DE KONING",
      "number": 21,
      "image": "/players/STK_tomdekoning_21.png"
    },
    {
      "name": "Darcy WILSON",
      "number": 22,
      "image": "/players/STK_darcywilson_22.png"
    },
    {
      "name": "Liam HENRY",
      "number": 23,
      "image": "/players/STK_liamhenry_23.png"
    },
    {
      "name": "Angus HASTIE",
      "number": 24,
      "image": "/players/STK_angushastie_24.png"
    },
    {
      "name": "Mattaes PHILLIPOU",
      "number": 25,
      "image": "/players/STK_mattaesphillipou_25.png"
    },
    {
      "name": "Alixzander TAURU",
      "number": 26,
      "image": "/players/STK_alixzandertauru_26.png"
    },
    {
      "name": "James BARRAT",
      "number": 28,
      "image": "/players/STK_jamesbarrat_28.png"
    },
    {
      "name": "Alex DODSON",
      "number": 30,
      "image": "/players/STK_alexdodson_30.png"
    },
    {
      "name": "Liam RYAN",
      "number": 31,
      "image": "/players/STK_liamryan_31.png"
    },
    {
      "name": "Mason WOOD",
      "number": 32,
      "image": "/players/STK_masonwood_32.png"
    },
    {
      "name": "Patrick SAID",
      "number": 33,
      "image": "/players/STK_patricksaid_33.png"
    },
    {
      "name": "Hugo GARCIA",
      "number": 34,
      "image": "/players/STK_hugogarcia_34.png"
    },
    {
      "name": "Jack SINCLAIR",
      "number": 35,
      "image": "/players/STK_jacksinclair_35.png"
    },
    {
      "name": "Charlie BANFIELD",
      "number": 36,
      "image": "/players/STK_charliebanfield_36.png"
    },
    {
      "name": "Kye FINCHER",
      "number": 37,
      "image": "/players/STK_kyefincher_37.png"
    },
    {
      "name": "Hugh BOXSHALL",
      "number": 38,
      "image": "/players/STK_hughboxshall_38.png"
    },
    {
      "name": "Max HALL",
      "number": 40,
      "image": "/players/STK_maxhall_40.png"
    },
    {
      "name": "Cooper SHARMAN",
      "number": 43,
      "image": "/players/STK_coopersharman_43.png"
    },
    {
      "name": "Callum WILKIE",
      "number": 44,
      "image": "/players/STK_callumwilkie_44.png"
    },
    {
      "name": "Liam O'CONNELL",
      "number": 45,
      "image": "/players/STK_liamoconnell_45.png"
    },
    {
      "name": "Eamonn ARMSTRONG",
      "number": 46,
      "image": "/players/STK_eamonnarmstrong_46.png"
    },
    {
      "name": "Anthony CAMINITI",
      "number": 47,
      "image": "/players/STK_anthonycaminiti_47.png"
    }
  ],  
"SYD": [
    {
      "name": "Chad WARNER",
      "number": 1,
      "image": "/players/SYD_chadwarner_1.png"
    },
    {
      "name": "Hayden MCLEAN",
      "number": 2,
      "image": "/players/SYD_haydenmclean_2.png"
    },
    {
      "name": "Taylor ADAMS",
      "number": 3,
      "image": "/players/SYD_tayloradams_3.png"
    },
    {
      "name": "Brodie GRUNDY",
      "number": 4,
      "image": "/players/SYD_brodiegrundy_4.png"
    },
    {
      "name": "Isaac HEENEY",
      "number": 5,
      "image": "/players/SYD_isaacheeney_5.png"
    },
    {
      "name": "Logan MCDONALD",
      "number": 6,
      "image": "/players/SYD_loganmcdonald_6.png"
    },
    {
      "name": "Harry CUNNINGHAM",
      "number": 7,
      "image": "/players/SYD_harrycunningham_7.png"
    },
    {
      "name": "James ROWBOTTOM",
      "number": 8,
      "image": "/players/SYD_jamesrowbottom_8.png"
    },
    {
      "name": "Jesse DATTOLI",
      "number": 9,
      "image": "/players/SYD_jessedattoli_9.png"
    },
    {
      "name": "Malcolm ROSAS",
      "number": 10,
      "image": "/players/SYD_malcolmrosas_10.png"
    },
    {
      "name": "Tom PAPLEY",
      "number": 11,
      "image": "/players/SYD_tompapley_11.png"
    },
    {
      "name": "Angus SHELDRICK",
      "number": 12,
      "image": "/players/SYD_angussheldrick_12.png"
    },
    {
      "name": "Jai SERONG",
      "number": 13,
      "image": "/players/SYD_jaiserong_13.png"
    },
    {
      "name": "Callum MILLS",
      "number": 14,
      "image": "/players/SYD_callummills_14.png"
    },
    {
      "name": "Sam WICKS",
      "number": 15,
      "image": "/players/SYD_samwicks_15.png"
    },
    {
      "name": "Braeden CAMPBELL",
      "number": 16,
      "image": "/players/SYD_braedencampbell_16.png"
    },
    {
      "name": "James JORDON",
      "number": 17,
      "image": "/players/SYD_jamesjordon_17.png"
    },
    {
      "name": "Jevan PHILLIPOU",
      "number": 18,
      "image": "/players/SYD_jevanphillipou_18.png"
    },
    {
      "name": "Peter LADHAMS",
      "number": 19,
      "image": "/players/SYD_peterladhams_19.png"
    },
    {
      "name": "Riak ANDREW",
      "number": 20,
      "image": "/players/SYD_riakandrew_20.png"
    },
    {
      "name": "Errol GULDEN",
      "number": 21,
      "image": "/players/SYD_errolgulden_21.png"
    },
    {
      "name": "Nick BLAKEY",
      "number": 22,
      "image": "/players/SYD_nickblakey_22.png"
    },
    {
      "name": "Ned BOWMAN",
      "number": 23,
      "image": "/players/SYD_nedbowman_23.png"
    },
    {
      "name": "Dane RAMPE",
      "number": 24,
      "image": "/players/SYD_danerampe_24.png"
    },
    {
      "name": "Billy COOTEE",
      "number": 25,
      "image": "/players/SYD_billycootee_25.png"
    },
    {
      "name": "Riley BICE",
      "number": 26,
      "image": "/players/SYD_rileybice_26.png"
    },
    {
      "name": "Justin MCINERNEY",
      "number": 27,
      "image": "/players/SYD_justinmcinerney_27.png"
    },
    {
      "name": "William EDWARDS",
      "number": 28,
      "image": "/players/SYD_williamedwards_28.png"
    },
    {
      "name": "Joel HAMLING",
      "number": 29,
      "image": "/players/SYD_joelhamling_29.png"
    },
    {
      "name": "Tom MCCARTIN",
      "number": 30,
      "image": "/players/SYD_tommccartin_30.png"
    },
    {
      "name": "Max KING 2",
      "number": 31,
      "image": "/players/SYD_maxking_31.png"
    },
    {
      "name": "Harry KYLE",
      "number": 32,
      "image": "/players/SYD_harrykyle_32.png"
    },
    {
      "name": "Caiden CLEARY",
      "number": 33,
      "image": "/players/SYD_caidencleary_33.png"
    },
    {
      "name": "Matt ROBERTS",
      "number": 34,
      "image": "/players/SYD_mattroberts_34.png"
    },
    {
      "name": "Charlie CURNOW",
      "number": 35,
      "image": "/players/SYD_charliecurnow_35.png"
    },
    {
      "name": "Joel AMARTEY",
      "number": 36,
      "image": "/players/SYD_joelamartey_36.png"
    },
    {
      "name": "Corey WARNER",
      "number": 37,
      "image": "/players/SYD_coreywarner_37.png"
    },
    {
      "name": "Liam HETHERTON",
      "number": 39,
      "image": "/players/SYD_liamhetherton_39.png"
    },
    {
      "name": "Tom HANILY",
      "number": 40,
      "image": "/players/SYD_tomhanily_40.png"
    },
    {
      "name": "Patrick SNELL",
      "number": 41,
      "image": "/players/SYD_patricksnell_41.png"
    },
    {
      "name": "Noah CHAMBERLAIN",
      "number": 42,
      "image": "/players/SYD_noahchamberlain_42.png"
    },
    {
      "name": "Lewis MELICAN",
      "number": 43,
      "image": "/players/SYD_lewismelican_43.png"
    },
    {
      "name": "Jake LLOYD",
      "number": 44,
      "image": "/players/SYD_jakelloyd_44.png"
    },
    {
      "name": "William GREEN",
      "number": 45,
      "image": "/players/SYD_williamgreen_45.png"
    }
  ],
  "WCE": [
    {
      "name": "Willem DUURSMA",
      "number": 1,
      "image": "/players/WCE_willemduursma_1.png"
    },
    {
      "name": "Jake WATERMAN",
      "number": 2,
      "image": "/players/WCE_jakewaterman_2.png"
    },
    {
      "name": "Liam BAKER",
      "number": 3,
      "image": "/players/WCE_liambaker_3.png"
    },
    {
      "name": "Brandon STARCEVICH",
      "number": 4,
      "image": "/players/WCE_brandonstarcevich_4.png"
    },
    {
      "name": "Josh LINDSAY",
      "number": 5,
      "image": "/players/WCE_joshlindsay_5.png"
    },
    {
      "name": "Elliot YEO",
      "number": 6,
      "image": "/players/WCE_elliotyeo_6.png"
    },
    {
      "name": "Reuben GINBEY",
      "number": 7,
      "image": "/players/WCE_reubenginbey_7.png"
    },
    {
      "name": "Elijah HEWETT",
      "number": 8,
      "image": "/players/WCE_elijahhewett_8.png"
    },
    {
      "name": "Harley REID",
      "number": 9,
      "image": "/players/WCE_harleyreid_9.png"
    },
    {
      "name": "Tyler BROCKMAN",
      "number": 10,
      "image": "/players/WCE_tylerbrockman_10.png"
    },
    {
      "name": "Tim KELLY",
      "number": 11,
      "image": "/players/WCE_timkelly_11.png"
    },
    {
      "name": "Sam ALLEN",
      "number": 12,
      "image": "/players/WCE_samallen_12.png"
    },
    {
      "name": "Noah LONG",
      "number": 13,
      "image": "/players/WCE_noahlong_13.png"
    },
    {
      "name": "Liam DUGGAN",
      "number": 14,
      "image": "/players/WCE_liamduggan_14.png"
    },
    {
      "name": "Jamie CRIPPS",
      "number": 15,
      "image": "/players/WCE_jamiecripps_15.png"
    },
    {
      "name": "Matthew OWIES",
      "number": 16,
      "image": "/players/WCE_matthewowies_16.png"
    },
    {
      "name": "Jack GRAHAM",
      "number": 17,
      "image": "/players/WCE_jackgraham_17.png"
    },
    {
      "name": "Tom MCCARTHY",
      "number": 18,
      "image": "/players/WCE_tommccarthy_18.png"
    },
    {
      "name": "Brady HOUGH",
      "number": 19,
      "image": "/players/WCE_bradyhough_19.png"
    },
    {
      "name": "Tylar YOUNG",
      "number": 20,
      "image": "/players/WCE_tylaryoung_20.png"
    },
    {
      "name": "Cooper DUFF-TYTLER",
      "number": 21,
      "image": "/players/WCE_cooperduff-tytler_21.png"
    },
    {
      "name": "Archer REID",
      "number": 22,
      "image": "/players/WCE_archerreid_22.png"
    },
    {
      "name": "Ryan MARIC",
      "number": 23,
      "image": "/players/WCE_ryanmaric_23.png"
    },
    {
      "name": "Harvey JOHNSTON",
      "number": 24,
      "image": "/players/WCE_harveyjohnston_24.png"
    },
    {
      "name": "Matt FLYNN",
      "number": 25,
      "image": "/players/WCE_mattflynn_25.png"
    },
    {
      "name": "Bo ALLAN",
      "number": 26,
      "image": "/players/WCE_boallan_26.png"
    },
    {
      "name": "Tom GROSS",
      "number": 27,
      "image": "/players/WCE_tomgross_27.png"
    },
    {
      "name": "Tom COLE",
      "number": 28,
      "image": "/players/WCE_tomcole_28.png"
    },
    {
      "name": "Clay HALL",
      "number": 29,
      "image": "/players/WCE_clayhall_29.png"
    },
    {
      "name": "Harry BARNETT",
      "number": 30,
      "image": "/players/WCE_harrybarnett_30.png"
    },
    {
      "name": "Lucca GREGO",
      "number": 31,
      "image": "/players/WCE_luccagrego_31.png"
    },
    {
      "name": "Bailey J. WILLIAMS",
      "number": 32,
      "image": "/players/WCE_baileyj.williams_32.png"
    },
    {
      "name": "Rhett BAZZO",
      "number": 33,
      "image": "/players/WCE_rhettbazzo_33.png"
    },
    {
      "name": "Jack WILLIAMS",
      "number": 34,
      "image": "/players/WCE_jackwilliams_34.png"
    },
    {
      "name": "Jobe SHANAHAN",
      "number": 35,
      "image": "/players/WCE_jobeshanahan_35.png"
    },
    {
      "name": "Tylah WILLIAMS",
      "number": 36,
      "image": "/players/WCE_tylahwilliams_36.png"
    },
    {
      "name": "Malakai CHAMPION",
      "number": 37,
      "image": "/players/WCE_malakaichampion_37.png"
    },
    {
      "name": "Hamish DAVIS",
      "number": 38,
      "image": "/players/WCE_hamishdavis_38.png"
    },
    {
      "name": "Fred RODRIGUEZ",
      "number": 39,
      "image": "/players/WCE_fredrodriguez_39.png"
    },
    {
      "name": "Deven ROBERTSON",
      "number": 40,
      "image": "/players/WCE_devenrobertson_40.png"
    },
    {
      "name": "Sandy BROCK",
      "number": 41,
      "image": "/players/WCE_sandybrock_41.png"
    },
    {
      "name": "Harry EDWARDS",
      "number": 42,
      "image": "/players/WCE_harryedwards_42.png"
    },
    {
      "name": "Tyrell DEWAR",
      "number": 43,
      "image": "/players/WCE_tyrelldewar_43.png"
    },
    {
      "name": "Jack HUTCHINSON",
      "number": 44,
      "image": "/players/WCE_jackhutchinson_44.png"
    },
    {
      "name": "Finlay MACRAE",
      "number": 45,
      "image": "/players/WCE_finlaymacrae_45.png"
    },
    {
      "name": "Jacob NEWTON",
      "number": 46,
      "image": "/players/WCE_jacobnewton_46.png"
    },
    {
      "name": "Harry SCHOENBERG",
      "number": 48,
      "image": "/players/WCE_harryschoenberg_48.png"
    }
  ],
  "WB": [
    {
      "name": "Adam TRELOAR",
      "number": 1,
      "image": "/players/WB_adamtreloar_1.png"
    },
    {
      "name": "Lachlan CARMICHAEL",
      "number": 2,
      "image": "/players/WB_lachlancarmichael_2.png"
    },
    {
      "name": "Cody WEIGHTMAN",
      "number": 3,
      "image": "/players/WB_codyweightman_3.png"
    },
    {
      "name": "Marcus BONTEMPELLI",
      "number": 4,
      "image": "/players/WB_marcusbontempelli_4.png"
    },
    {
      "name": "Jedd BUSSLINGER",
      "number": 5,
      "image": "/players/WB_jeddbusslinger_5.png"
    },
    {
      "name": "Cooper HYNES",
      "number": 6,
      "image": "/players/WB_cooperhynes_6.png"
    },
    {
      "name": "Rory LOBB",
      "number": 7,
      "image": "/players/WB_rorylobb_7.png"
    },
    {
      "name": "Matthew KENNEDY",
      "number": 8,
      "image": "/players/WB_matthewkennedy_8.png"
    },
    {
      "name": "Ryley SANDERS",
      "number": 9,
      "image": "/players/WB_ryleysanders_9.png"
    },
    {
      "name": "Sam DARCY",
      "number": 10,
      "image": "/players/WB_samdarcy_10.png"
    },
    {
      "name": "Lachie JAQUES",
      "number": 11,
      "image": "/players/WB_lachiejaques_11.png"
    },
    {
      "name": "Harvey GALLAGHER",
      "number": 12,
      "image": "/players/WB_harveygallagher_12.png"
    },
    {
      "name": "Oskar BAKER",
      "number": 13,
      "image": "/players/WB_oskarbaker_13.png"
    },
    {
      "name": "Rhylee WEST",
      "number": 14,
      "image": "/players/WB_rhyleewest_14.png"
    },
    {
      "name": "Will DARCY",
      "number": 15,
      "image": "/players/WB_willdarcy_15.png"
    },
    {
      "name": "Jordan CROFT",
      "number": 16,
      "image": "/players/WB_jordancroft_16.png"
    },
    {
      "name": "Nick COFFIELD",
      "number": 17,
      "image": "/players/WB_nickcoffield_17.png"
    },
    {
      "name": "James O'DONNELL",
      "number": 18,
      "image": "/players/WB_jamesodonnell_18.png"
    },
    {
      "name": "Connor BUDARICK",
      "number": 19,
      "image": "/players/WB_connorbudarick_19.png"
    },
    {
      "name": "Ed RICHARDS",
      "number": 20,
      "image": "/players/WB_edrichards_20.png"
    },
    {
      "name": "Tom LIBERATORE",
      "number": 21,
      "image": "/players/WB_tomliberatore_21.png"
    },
    {
      "name": "James HARMES",
      "number": 22,
      "image": "/players/WB_jamesharmes_22.png"
    },
    {
      "name": "Laitham VANDERMEER",
      "number": 23,
      "image": "/players/WB_laithamvandermeer_23.png"
    },
    {
      "name": "Buku KHAMIS",
      "number": 24,
      "image": "/players/WB_bukukhamis_24.png"
    },
    {
      "name": "Louis EMMETT",
      "number": 25,
      "image": "/players/WB_louisemmett_25.png"
    },
    {
      "name": "Josh DOLAN",
      "number": 26,
      "image": "/players/WB_joshdolan_26.png"
    },
    {
      "name": "Joel FREIJAH",
      "number": 27,
      "image": "/players/WB_joelfreijah_27.png"
    },
    {
      "name": "Lachlan BRAMBLE",
      "number": 29,
      "image": "/players/WB_lachlanbramble_29.png"
    },
    {
      "name": "Lachlan MCNEIL",
      "number": 30,
      "image": "/players/WB_lachlanmcneil_30.png"
    },
    {
      "name": "Bailey DALE",
      "number": 31,
      "image": "/players/WB_baileydale_31.png"
    },
    {
      "name": "Arthur JONES",
      "number": 32,
      "image": "/players/WB_arthurjones_32.png"
    },
    {
      "name": "Aaron NAUGHTON",
      "number": 33,
      "image": "/players/WB_aaronnaughton_33.png"
    },
    {
      "name": "Bailey WILLIAMS",
      "number": 34,
      "image": "/players/WB_baileywilliams_34.png"
    },
    {
      "name": "Luke KENNEDY",
      "number": 35,
      "image": "/players/WB_lukekennedy_35.png"
    },
    {
      "name": "Luke CLEARY",
      "number": 36,
      "image": "/players/WB_lukecleary_36.png"
    },
    {
      "name": "Michael SELLWOOD",
      "number": 37,
      "image": "/players/WB_michaelsellwood_37.png"
    },
    {
      "name": "Riley GARCIA",
      "number": 38,
      "image": "/players/WB_rileygarcia_38.png"
    },
    {
      "name": "Lachlan SMITH",
      "number": 40,
      "image": "/players/WB_lachlansmith_40.png"
    },
    {
      "name": "Zac WALKER",
      "number": 41,
      "image": "/players/WB_zacwalker_41.png"
    },
    {
      "name": "Sam DAVIDSON",
      "number": 42,
      "image": "/players/WB_samdavidson_42.png"
    },
    {
      "name": "Ryan GARDNER",
      "number": 43,
      "image": "/players/WB_ryangardner_43.png"
    },
    {
      "name": "Tim ENGLISH",
      "number": 44,
      "image": "/players/WB_timenglish_44.png"
    }
  ]
};

const filteredTeams = Object.fromEntries(
  Object.entries(teams).map(([teamCode, players]) => [
    teamCode,
    filterValidPlayers(players)
  ])
);

export default filteredTeams;

