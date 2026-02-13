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
      "name": "Darcy FOGARTY",
      "number": 32,
      "image": "/players/ADE_darcyfogarty_32.png"
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
      "name": "Keidean COLEMAN",
      "number": 18,
      "image": "/players/BRI_keideancoleman_18.png"
    },
    {
      "name": "Charlie CAMERON",
      "number": 23,
      "image": "/players/BRI_charliecameron_23.png"
    },
    {
      "name": "Darcy GARDINER",
      "number": 27,
      "image": "/players/BRI_darcygardiner_27.png"
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
    }
  ],
  "CAR": [
    {
      "name": "Jesse MOTLOP",
      "number": 3,
      "image": "/players/CAR_jessemotlop_3.png"
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
      "name": "Sam WALSH",
      "number": 18,
      "image": "/players/CAR_samwalsh_18.png"
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
      "name": "George HEWETT",
      "number": 29,
      "image": "/players/CAR_georgehewett_29.png"
    },
    {
      "name": "Adam SAAD",
      "number": 42,
      "image": "/players/CAR_adamsaad_42.png"
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
      "name": "Tom MITCHELL",
      "number": 6,
      "image": "/players/COL_tommitchell_6.png"
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
      "name": "Darcy CAMERON",
      "number": 14,
      "image": "/players/COL_darcycameron_14.png"
    },
    {
      "name": "Billy FRAMPTON",
      "number": 17,
      "image": "/players/COL_billyframpton_17.png"
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
      "name": "Tim MEMBREY",
      "number": 28,
      "image": "/players/COL_timmembrey_28.png"
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
      "name": "Nick DAICOS",
      "number": 35,
      "image": "/players/COL_nickdaicos_35.png"
    },
    {
      "name": "Jeremy HOWE",
      "number": 38,
      "image": "/players/COL_jeremyhowe_38.png"
    }
    ],
  "ESS": [
    {
      "name": "Andrew MCGRATH",
      "number": 1,
      "image": "/players/ESS_andrewmcgrath_1.png"
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
      "name": "Archie PERKINS",
      "number": 16,
      "image": "/players/ESS_archieperkins_16.png"
    },
    {
      "name": "Peter WRIGHT",
      "number": 20,
      "image": "/players/ESS_peterwright_20.png"
    },
    {
      "name": "Sam DURHAM",
      "number": 22,
      "image": "/players/ESS_samdurham_22.png"
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
      "name": "Nate CADDY",
      "number": 30,
      "image": "/players/ESS_natecaddy_30.png"
    },
    {
      "name": "Ben MCKAY",
      "number": 32,
      "image": "/players/ESS_benmckay_32.png"
    },
    {
      "name": "Matt GUELFI",
      "number": 35,
      "image": "/players/ESS_mattguelfi_35.png"
    },
    {
      "name": "Nic MARTIN",
      "number": 37,
      "image": "/players/ESS_nicmartin_37.png"
    },
    {
      "name": "Archer DAY-WICKS",
      "number": 44,
      "image": "/players/ESS_archerday-wicks_44.png"
    }
  ],
  "FRE": [
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
      "name": "Oscar MCDONALD",
      "number": 21,
      "image": "/players/FRE_oscarmcdonald_21.png"
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
      "name": "Brandon WALKER",
      "number": 31,
      "image": "/players/FRE_brandonwalker_31.png"
    },
     {
      "name": "Josh TREACY",
      "number": 35,
      "image": "/players/FRE_joshtreacy_35.png"
    }
    ],
  "GEE": [
    {
      "name": "Rhys STANLEY",
      "number": 1,
      "image": "/players/GEE_rhysstanley_1.png"
    },
    {
      "name": "Bailey SMITH",
      "number": 3,
      "image": "/players/GEE_baileysmith_3.png"
    },
    {
      "name": "Jeremy CAMERON",
      "number": 5,
      "image": "/players/GEE_jeremycameron_5.png"
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
      "name": "Jack BOWES",
      "number": 12,
      "image": "/players/GEE_jackbowes_12.png"
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
      "name": "Oliver WILTSHIRE",
      "number": 21,
      "image": "/players/GEE_oliverwiltshire_21.png"
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
      "name": "Jarrod WITTS",
      "number": 28,
      "image": "/players/GCS_jarrodwitts_28.png"
    },
    {
      "name": "Zeke UWLAND",
      "number": 32,
      "image": "/players/GCS_zekeuwland_32.png"
    },
    {
      "name": "Ben KING",
      "number": 34,
      "image": "/players/GCS_benking_34.png"
    }
    ],
  "GWS": [
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
      "name": "Clayton OLIVER",
      "number": 10,
      "image": "/players/GWS_claytonoliver_10.png"
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
      "name": "Finn CALLAGHAN",
      "number": 17,
      "image": "/players/GWS_finncallaghan_17.png"
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
      "name": "Jake RICCARDI",
      "number": 26,
      "image": "/players/GWS_jakericcardi_26.png"
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
      "name": "Sam BUTLER",
      "number": 30,
      "image": "/players/HAW_sambutler_30.png"
    },
    {
      "name": "Jack GINNIVAN",
      "number": 33,
      "image": "/players/HAW_jackginnivan_33.png"
    },
    {
      "name": "Tom BARRASS",
      "number": 37,
      "image": "/players/HAW_tombarrass_37.png"
    },
    {
      "name": "Matt HILL",
      "number": 41,
      "image": "/players/HAW_matthill_41.png"
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
      "name": "Tom MCDONALD",
      "number": 25,
      "image": "/players/MEL_tommcdonald_25.png"
    },
    {
      "name": "Brody MIHOCEK",
      "number": 28,
      "image": "/players/MEL_brodymihocek_28.png"
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
    }
  ],
  "NM": [
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
      "name": "Zac FISHER",
      "number": 16,
      "image": "/players/NM_zacfisher_16.png"
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
      "name": "Toby PINK",
      "number": 32,
      "image": "/players/NM_tobypink_32.png"
    },
     {
      "name": "Matt WHITLOCK",
      "number": 35,
      "image": "/players/NM_mattwhitlock_35.png"
    },
    {
      "name": "Tristan XERRI",
      "number": 38,
      "image": "/players/NM_tristanxerri_38.png"
    },
    {
      "name": "Cameron ZURHAAR",
      "number": 44,
      "image": "/players/NM_cameronzurhaar_44.png"
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
      "name": "Ollie WINES",
      "number": 16,
      "image": "/players/PA_olliewines_16.png"
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
      "name": "Esava RATUGOLEA",
      "number": 27,
      "image": "/players/PA_esavaratugolea_27.png"
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
      "name": "Judson CLARKE",
      "number": 23,
      "image": "/players/RIC_judsonclarke_23.png"
    },
    {
      "name": "Toby NANKERVIS",
      "number": 25,
      "image": "/players/RIC_tobynankervis_25.png"
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
      "name": "Tyler SONSIE",
      "number": 40,
      "image": "/players/RIC_tylersonsie_40.png"
    },
    {
      "name": "Mykelti LEFAU",
      "number": 42,
      "image": "/players/RIC_mykeltilefau_42.png"
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
      "name": "Dan BUTLER",
      "number": 16,
      "image": "/players/STK_danbutler_16.png"
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
      "name": "Jack SINCLAIR",
      "number": 35,
      "image": "/players/STK_jacksinclair_35.png"
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
      "name": "Tom MCCARTIN",
      "number": 30,
      "image": "/players/SYD_tommccartin_30.png"
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
      "name": "Jake LLOYD",
      "number": 44,
      "image": "/players/SYD_jakelloyd_44.png"
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
      "name": "Jack WILLIAMS",
      "number": 34,
      "image": "/players/WCE_jackwilliams_34.png"
    },
    {
      "name": "Harry EDWARDS",
      "number": 42,
      "image": "/players/WCE_harryedwards_42.png"
    },
    {
      "name": "Finlay MACRAE",
      "number": 45,
      "image": "/players/WCE_finlaymacrae_45.png"
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
      "name": "Rhylee WEST",
      "number": 14,
      "image": "/players/WB_rhyleewest_14.png"
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
      "name": "Luke CLEARY",
      "number": 36,
      "image": "/players/WB_lukecleary_36.png"
    },
    {
      "name": "Riley GARCIA",
      "number": 38,
      "image": "/players/WB_rileygarcia_38.png"
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

