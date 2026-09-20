import { WallTheme } from '../types';

export const THEMES: WallTheme[] = [
  {
    id: 'topgear',
    name: 'Top Gear Classics',
    tagline: 'The Original BBC Cool Wall',
    icon: 'Gauge',
    badge: 'ORIGINAL',
    description: 'The legendary studio board where Jeremy Clarkson & Richard Hammond argue about cars, coolness, and fridge magnets.',
    bgClass: 'from-zinc-950 via-neutral-900 to-stone-950',
    boardTexture: 'bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]',
    accentColor: '#38bdf8', // ice blue
    soundPreset: 'cars',
    columns: {
      'seriously-uncool': {
        title: 'Seriously Uncool',
        subtitle: 'The scrapheap of automotive shame',
        badge: 'BIN IT',
        desc: 'Driven exclusively by chartered accountants and people who tuck their polo shirts into their jeans.'
      },
      'uncool': {
        title: 'Uncool',
        subtitle: 'Boring, mediocre, or trying too hard',
        badge: 'DULL',
        desc: 'If someone asks what you drive and you say this, the conversation ends instantly.'
      },
      'cool': {
        title: 'Cool',
        subtitle: 'Effortlessly stylish & respected',
        badge: 'PROPER',
        desc: 'You can arrive anywhere in this and look like you have your life completely sorted.'
      },
      'subzero': {
        title: 'Sub-Zero',
        subtitle: 'Colder than the Arctic Circle',
        badge: 'ICE COLD',
        desc: 'So effortlessly cool that even Richard Hammond wearing sunglasses cannot ruin it.'
      },
      'fridge': {
        title: 'The DB9 Fridge',
        subtitle: 'Beyond Sub-Zero Icebox',
        badge: 'VAULT',
        desc: 'The sacred cryogenic sanctuary reserved for machinery too breathtaking for normal wall physics.'
      }
    },
    presetStats: ['Horsepower', 'Top Speed', '0-60 mph', 'Banter Rating'],
    sampleVerdictTemplates: [
      "If you turn up to a date in this, they will flee out of the bathroom window.",
      "Utterly sensational. The noise alone will make your spine tingle.",
      "Driven exclusively by dental hygienists and people who pronounce it 'espresso' with an X.",
      "It doesn't just go around corners; it bends space-time and laughs in the face of physics.",
      "I would rather walk through a thunderstorm clad in tinfoil than be seen inside this."
    ]
  },
  {
    id: 'billionaire',
    name: 'Billionaire & Moguls',
    tagline: 'Forbes 400 & Giga-Flex Wall',
    icon: 'Crown',
    badge: 'LUXURY',
    description: 'Rank tech moguls, oligarchs, private mega-yachts, tax haven trusts, and golden steaks from broke mindset to sovereign apex.',
    bgClass: 'from-amber-950/40 via-stone-950 to-neutral-950',
    boardTexture: 'bg-[linear-gradient(to_right,#eab3080a_1px,transparent_1px),linear-gradient(to_bottom,#eab3080a_1px,transparent_1px)] [background-size:24px_24px]',
    accentColor: '#eab308', // gold
    soundPreset: 'billionaire',
    columns: {
      'seriously-uncool': {
        title: 'Seriously Broke',
        subtitle: 'Fake flexers & tacky crypto grifters',
        badge: 'LIQUIDATED',
        desc: 'Renting a Lambo for 4 hours to shoot an Instagram reel about passive dropshipping.'
      },
      'uncool': {
        title: 'Peasant Billionaire',
        subtitle: 'Single-digit billions & commercial flights',
        badge: 'COMMERCIAL',
        desc: 'Only has $3 Billion and has to ask for permission before buying a football club.'
      },
      'cool': {
        title: 'Quiet Luxury',
        subtitle: 'Loro Piana cashmere & private islands',
        badge: 'DYNASTY',
        desc: 'No logo on the cap, owns the deepwater shipping corridor and three private airstrips.'
      },
      'subzero': {
        title: 'Giga Sub-Zero',
        subtitle: 'Shapes world trade from an orbital satellite',
        badge: 'TRILLIONAIRE',
        desc: 'Can crash a national currency with a midnight tweet while drinking 1945 Romanée-Conti.'
      },
      'fridge': {
        title: 'Swiss Alpine Vault',
        subtitle: 'Zero tax, sovereign diplomatic immunity',
        badge: 'OFFSHORE',
        desc: 'Assets stored in a decommissioned military bunker beneath 400 meters of granite.'
      }
    },
    presetStats: ['Net Worth', 'Yacht Length', 'Private Jets', 'Ego Index'],
    sampleVerdictTemplates: [
      "Buys a social media network just because he got bored at 2 AM on a Tuesday.",
      "Wears an $8 Casio watch while secretly owning 12% of the world's uranium reserves.",
      "Tacky. Smells like cheap cologne, leveraged crypto debt, and impending SEC subpoenas.",
      "Moves market caps by $400 Billion with a single shrug during an earnings call."
    ]
  },
  {
    id: 'spacex',
    name: 'SpaceX & Aerospace',
    tagline: 'Orbital Telemetry & Launch Pad',
    icon: 'Rocket',
    badge: 'STARSHIP',
    description: 'From launchpad explosions and suborbital tourist hops to orbital reusability and Mars colonization flagships.',
    bgClass: 'from-slate-950 via-sky-950/30 to-black',
    boardTexture: 'bg-[radial-gradient(#38bdf815_1px,transparent_1px)] [background-size:20px_20px]',
    accentColor: '#0ea5e9', // rocket cyan
    soundPreset: 'spacex',
    columns: {
      'seriously-uncool': {
        title: 'Rapid Unscheduled Disassembly',
        subtitle: 'Blowed up real good on the launch pad',
        badge: 'R.U.D.',
        desc: 'A spectacular fireball, zero telemetry, and an emergency FAA investigation committee.'
      },
      'uncool': {
        title: 'Suborbital Hop',
        subtitle: 'Spent $28M for 3 minutes in zero-g',
        badge: 'TOURIST',
        desc: 'Barely grazed the Karman line, got a plastic astronaut pin and zero orbital velocity.'
      },
      'cool': {
        title: 'Orbital Insertion',
        subtitle: 'Nominal burn, MECO, landing on drone ship',
        badge: 'NOMINAL',
        desc: 'First stage sticks the bullseye landing on "Of Course I Still Love You" in 20-knot winds.'
      },
      'subzero': {
        title: 'Mars Colony Sub-Zero',
        subtitle: 'Multi-planetary civilization achieved',
        badge: 'INTERSTELLAR',
        desc: 'Full-stack stainless steel Starship caught out of the sky by giant mechanical chopsticks.'
      },
      'fridge': {
        title: 'Deep Space Cryo',
        subtitle: 'Beyond the heliopause & Kuiper belt',
        badge: 'VOYAGER',
        desc: 'Nuclear-powered radioisotope probes sailing across interstellar darkness for 40,000 years.'
      }
    },
    presetStats: ['Thrust (kN)', 'Payload to LEO', 'Reusability', 'Delta-V'],
    sampleVerdictTemplates: [
      "Stuck the landing so cleanly the engineers at Boeing started weeping into their spreadsheets.",
      "Lit 33 Raptor 2 engines simultaneously and vibrated the concrete into fine dust.",
      "Suborbital tourist ride with all the glory of a very expensive Six Flags rollercoaster.",
      "Caught in mid-air by Mechazilla chopsticks like an oversized metal chopstick trick."
    ]
  },
  {
    id: 'tech',
    name: 'Silicon Valley & AI',
    tagline: 'Tech Unicorns & Disruptors',
    icon: 'Cpu',
    badge: 'SINGULARITY',
    description: 'Sort overhyped crypto vaporware, burning cash startups, viral PMF rockets, and god-mode foundation models.',
    bgClass: 'from-neutral-950 via-purple-950/20 to-zinc-950',
    boardTexture: 'bg-[radial-gradient(#a855f712_1px,transparent_1px)] [background-size:18px_18px]',
    accentColor: '#a855f7', // purple neon
    soundPreset: 'tech',
    columns: {
      'seriously-uncool': {
        title: 'Deprecated Vaporware',
        subtitle: 'Burned $60M on kombucha taps & pivots',
        badge: 'DEAD 404',
        desc: 'A blockchain-enabled smart water bottle that requires a mandatory monthly subscription.'
      },
      'uncool': {
        title: 'Zombie Enterprise SaaS',
        subtitle: 'Still charging per seat on PHP 5.6',
        badge: 'LEGACY',
        desc: 'Requires 4 mandatory sales discovery calls and an Oracle database license.'
      },
      'cool': {
        title: 'Product-Market Fit',
        subtitle: 'Viral growth, developers raving on X',
        badge: 'UNSTOPPABLE',
        desc: 'So frictionless and elegant that engineers migrate their entire stack over a weekend.'
      },
      'subzero': {
        title: 'Decacorn Sub-Zero',
        subtitle: 'Prints billions with zero customer churn',
        badge: 'MONOPOLY',
        desc: 'The entire planet depends on this infrastructure and there is literally no alternative.'
      },
      'fridge': {
        title: 'The AGI Singularity',
        subtitle: 'Sentience awakened in an H100 cluster',
        badge: 'SENTIENT',
        desc: 'Writing self-improving kernels and casually solved protein folding before breakfast.'
      }
    },
    presetStats: ['ARR / Valuation', 'Runway (mo)', 'Hype Factor', 'Compute (Flops)'],
    sampleVerdictTemplates: [
      "Raised a $50M seed round with just a two-page PDF and a black turtleneck.",
      "An AI pin that burns your palm, hallucinates the weather, and dies after 45 minutes.",
      "So blisteringly fast it makes all other code editors feel like drafting on papyrus.",
      "Open-sourced 400-billion parameters and gave the proprietary tech cartels an existential panic."
    ]
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    tagline: 'Night City Street Cred Wall',
    icon: 'Zap',
    badge: 'CHROME',
    description: 'Rank corpo suits, street gonks, cybernetic implants, edgerunner fixers, and rogue military AIs.',
    bgClass: 'from-fuchsia-950/40 via-zinc-950 to-cyan-950/40',
    boardTexture: 'bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#ec489910_1px,transparent_1px)] [background-size:20px_20px]',
    accentColor: '#06b6d4', // neon cyan
    soundPreset: 'cyberpunk',
    columns: {
      'seriously-uncool': {
        title: 'Corpo Trash',
        subtitle: 'Arasaka counter-intel drone in a suit',
        badge: 'GONK',
        desc: 'Wears a stiff tie, backstabs his manager for a badge upgrade, dies in an elevator.'
      },
      'uncool': {
        title: 'Street Scum',
        subtitle: 'Secondhand cyberware sparking in rain',
        badge: 'DIRT',
        desc: 'Got cheap optical implants from a back-alley ripperdoc that show popup advertisements.'
      },
      'cool': {
        title: 'Edgerunner',
        subtitle: 'Sandevistan installed, respected fixer gigs',
        badge: 'SOLO',
        desc: 'Moves through the neon rain like a blur, drinking Johnny Silverhands at the Afterlife.'
      },
      'subzero': {
        title: 'Chrome Sub-Zero',
        subtitle: 'Night City Legend immortalized in song',
        badge: 'MYTHIC',
        desc: 'Full-body military cyberware, stormed Arasaka Tower solo and left a playlist behind.'
      },
      'fridge': {
        title: 'The Blackwall Vault',
        subtitle: 'Quarantined autonomous rogue intelligences',
        badge: 'BREACH',
        desc: 'Eldritch AI daemons lurking beyond NetWatch ice, capable of melting brains across subnetworks.'
      }
    },
    presetStats: ['Street Cred', 'Cyberware Tier', 'Bounty (€$)', 'Cool Factor'],
    sampleVerdictTemplates: [
      "Slapped a Sandevistan onto his spine and emptied a magazine before anyone blinked.",
      "Pure corporate sycophant. One phone call from HR and his neural link gets remotely bricked.",
      "Drives a vintage Quadra Turbo-R through rainy Kabuki with synthwave echoing off chrome towers."
    ]
  }
];
