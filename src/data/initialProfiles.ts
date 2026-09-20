import { Profile } from '../types';

export const INITIAL_PROFILES: Profile[] = [
  // ================= TOP GEAR CARS =================
  {
    id: 'tg-aston-db9',
    name: 'Aston Martin DB9',
    subtitle: '6.0L V12 Grand Tourer • British Racing Heritage',
    themeId: 'topgear',
    category: 'fridge',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "It is so cool that it doesn't belong on this wall. It goes into the dedicated Aston Martin fridge. Absolutely untouchable.",
    coolScore: 99,
    tags: ['V12', 'James Bond', 'Aston Martin Fridge', 'Sub-Zero Royalty'],
    stats: [
      { label: 'Horsepower', value: '450 bhp' },
      { label: 'Top Speed', value: '186 mph' },
      { label: '0-60 mph', value: '4.7 s' },
      { label: 'Banter Rating', value: '10/10' }
    ],
    pros: ['The prettiest silhouette ever shaped by human hands', 'Exhaust note sounds like the brass section of the Royal Philharmonic', 'Instant gentleman status'],
    cons: ['Fuel economy measured in gallons per smile', 'Sat-nav designed by medieval monks'],
    isOutOfReach: false,
    createdAt: Date.now() - 100000
  },
  {
    id: 'tg-porsche-911-gt3',
    name: 'Porsche 911 GT3 RS',
    subtitle: '4.0L Flat-6 Naturally Aspirated • Track Weapon',
    themeId: 'topgear',
    category: 'subzero',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "A rear wing large enough to serve a four-course dinner on. It doesn't follow road regulations; road regulations follow it.",
    coolScore: 94,
    tags: ['9000 RPM', 'Nürburgring King', 'Aero God', 'Sub-Zero'],
    stats: [
      { label: 'Horsepower', value: '518 bhp' },
      { label: 'Top Speed', value: '184 mph' },
      { label: '0-60 mph', value: '3.0 s' },
      { label: 'Banter Rating', value: '9.5/10' }
    ],
    pros: ['Screams to 9,000 RPM like a startled banshee', 'Active DRS rear wing generates downward gravity', 'Cures depression in 2nd gear'],
    cons: ['Ride so stiff your dentist will need to re-glue your fillings', 'Richard Hammond owns three'],
    isOutOfReach: true, // Placed high up!
    createdAt: Date.now() - 90000
  },
  {
    id: 'tg-ford-gt',
    name: 'Ford GT (2005)',
    subtitle: '5.4L Supercharged Modular V8 • Le Mans Tribute',
    themeId: 'topgear',
    category: 'subzero',
    imageUrl: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Jeremy bought one and the alarm went off continuously at 3 AM. He still loved it because look at it! It's Le Mans in your driveway.",
    coolScore: 92,
    tags: ['Supercharged V8', 'Le Mans Legend', 'Clarkson Owned'],
    stats: [
      { label: 'Horsepower', value: '550 bhp' },
      { label: 'Top Speed', value: '205 mph' },
      { label: '0-60 mph', value: '3.5 s' },
      { label: 'Banter Rating', value: '9/10' }
    ],
    pros: ['Wider than a football pitch', 'Pure mechanical supercharger whine', 'Slaps Ferrari right across the face'],
    cons: ['Doors incorporate the roof so you scalp yourself getting in', 'Immobiliser possesses demonic tendencies'],
    isOutOfReach: false,
    createdAt: Date.now() - 80000
  },
  {
    id: 'tg-golf-gti',
    name: 'VW Golf GTI Mk1',
    subtitle: '1.6L Inline-4 • The Original Hot Hatch',
    themeId: 'topgear',
    category: 'cool',
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "The ultimate classless car. Park it outside the opera or outside a chip shop; nobody thinks you are showing off or broke. Perfection.",
    coolScore: 82,
    tags: ['Hot Hatch', 'Tartan Seats', 'Classless Icon'],
    stats: [
      { label: 'Horsepower', value: '110 bhp' },
      { label: 'Top Speed', value: '113 mph' },
      { label: '0-60 mph', value: '8.9 s' },
      { label: 'Banter Rating', value: '8/10' }
    ],
    pros: ['Weighs less than an empty cardboard box', 'Golf ball gear knob', 'Supreme street cred everywhere on earth'],
    cons: ['Rusts if you mention the word "rain"', 'Zero air conditioning'],
    isOutOfReach: false,
    createdAt: Date.now() - 70000
  },
  {
    id: 'tg-peel-p50',
    name: 'Peel P50',
    subtitle: '49cc Single Cylinder • Smallest Production Car',
    themeId: 'topgear',
    category: 'cool',
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "I drove it through BBC Television Centre, into the lift, and right past the newsroom. You cannot be uncool in something you can lift by hand.",
    coolScore: 78,
    tags: ['Three Wheels', 'BBC Hall of Fame', 'Pocket Size'],
    stats: [
      { label: 'Horsepower', value: '4.2 bhp' },
      { label: 'Top Speed', value: '38 mph' },
      { label: '0-60 mph', value: 'Never' },
      { label: 'Banter Rating', value: '10/10' }
    ],
    pros: ['Can park inside your apartment hallway', 'Fits in an office elevator', 'Reverse gear is just a handle you pull'],
    cons: ['Getting overtaken by an angry swan', 'Crumple zone is your shins'],
    isOutOfReach: false,
    createdAt: Date.now() - 60000
  },
  {
    id: 'tg-bmw-x6',
    name: 'BMW X6 M-Sport',
    subtitle: 'Twin-Turbo V8 Coupe SUV • The Chelsea Tractor',
    themeId: 'topgear',
    category: 'uncool',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "It's an off-roader with low-profile tires that can't go off-road, shaped like a coupe with no headroom in the back. What on earth is it for?",
    coolScore: 32,
    tags: ['Coupe SUV', 'Aggressive Grille', 'Tailgater Spec'],
    stats: [
      { label: 'Horsepower', value: '617 bhp' },
      { label: 'Top Speed', value: '155 mph' },
      { label: '0-60 mph', value: '3.7 s' },
      { label: 'Banter Rating', value: '2/10' }
    ],
    pros: ['Fast in a straight line', 'Sceno-blocker in supermarket parking lots'],
    cons: ['Driven with 3 inches of clearance behind your rear bumper', 'Looks like a startled frog in high heels'],
    isOutOfReach: false,
    createdAt: Date.now() - 50000
  },
  {
    id: 'tg-cybertruck',
    name: 'Tesla Cybertruck',
    subtitle: 'Tri-Motor AWD • Stainless Steel Origami',
    themeId: 'topgear',
    category: 'seriously-uncool',
    imageUrl: 'https://images.unsplash.com/photo-1698292813133-72535d259cbb?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Dreadful. Rendered on a 1996 PlayStation 1 polygon budget. You look like you're roleplaying an extra in a low-budget sci-fi reboot.",
    coolScore: 12,
    tags: ['Unpolished Steel', 'Fingerprint Magnet', 'Broken Armor Glass'],
    stats: [
      { label: 'Horsepower', value: '845 bhp' },
      { label: 'Top Speed', value: '130 mph' },
      { label: '0-60 mph', value: '2.6 s' },
      { label: 'Banter Rating', value: '1/10' }
    ],
    pros: ['Bulletproof against low-velocity steel spheres (most of the time)', 'Can cut bread on the panel gaps'],
    cons: ['Panel gaps you can slide an encyclopedia through', 'Rust spots appear if you look at a lemon'],
    isOutOfReach: false,
    createdAt: Date.now() - 40000
  },
  {
    id: 'tg-multipla',
    name: 'Fiat Multipla',
    subtitle: '1.6L 16V • Three-Abreast Muffin Top MPV',
    themeId: 'topgear',
    category: 'seriously-uncool',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "It has two spare tires beneath the windscreen and a face that could sour milk at twenty paces. Straight into the incinerator.",
    coolScore: 4,
    tags: ['Blobfish Aesthetics', 'Three Front Seats', 'Visual Hazard'],
    stats: [
      { label: 'Horsepower', value: '102 bhp' },
      { label: 'Top Speed', value: '106 mph' },
      { label: '0-60 mph', value: '12.6 s' },
      { label: 'Banter Rating', value: '0/10' }
    ],
    pros: ['You can sit three wide in the front', 'Huge panoramic greenhouse visibility'],
    cons: ['People cross the street to avoid catching glimpses of it', 'Decreases property values when parked'],
    isOutOfReach: false,
    createdAt: Date.now() - 30000
  },

  // ================= BILLIONAIRE & MOGULS =================
  {
    id: 'bil-jensen',
    name: 'Jensen Huang',
    subtitle: 'CEO Nvidia • The $3.5 Trillion Leather Jacket',
    themeId: 'billionaire',
    category: 'subzero',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Never takes off the motorcycle leather jacket, casually signed a woman's shirt at Computex, and owns every single AI compute cluster on earth. Sub-Zero.",
    coolScore: 98,
    tags: ['Leather Jacket', 'H100 Monopolist', 'Trillionaire', 'Apex Giga'],
    stats: [
      { label: 'Net Worth', value: '$130 Billion' },
      { label: 'Yacht Length', value: 'No time, busy shipping chips' },
      { label: 'Private Jets', value: 'Gulfstream G650' },
      { label: 'Ego Index', value: '100% Raw Compute' }
    ],
    pros: ['Every tech titan has to beg him for GPU allocation', 'Single-handedly powered the AI boom', 'Iconic Tom Ford wardrobe'],
    cons: ['If you drop an H100 board, you owe him your firstborn', 'Cooks in a luxury commercial kitchen during keynotes'],
    isOutOfReach: true,
    createdAt: Date.now() - 100000
  },
  {
    id: 'bil-superyacht',
    name: '500-Foot Explorer Superyacht',
    subtitle: 'With Dual Helipads, Submarine Bay & Missile Defense',
    themeId: 'billionaire',
    category: 'fridge',
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Registered under a Cayman holding company, staffed by former Gurkha special forces, and equipped with a 30-person cinema. Swiss vault material.",
    coolScore: 96,
    tags: ['Mega Yacht', 'Helipad', 'Triton Sub', 'Offshore Sanctuary'],
    stats: [
      { label: 'Net Worth', value: '$450 Million' },
      { label: 'Yacht Length', value: '152 meters' },
      { label: 'Private Jets', value: 'Contains hangar for 2 choppers' },
      { label: 'Ego Index', value: 'Off the charts' }
    ],
    pros: ['Has its own onboard hospital and sommelier', 'Can outrun regional navies', 'Never pays territorial taxes'],
    cons: ['Fuel refill requires a small national GDP loan', 'Crew knows all your deepest secrets'],
    isOutOfReach: false,
    createdAt: Date.now() - 90000
  },
  {
    id: 'bil-elon',
    name: 'Elon Musk',
    subtitle: 'Technoking of Tesla • Chief Engineer SpaceX • xAI',
    themeId: 'billionaire',
    category: 'cool',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "One moment he's catching a 250-foot rocket booster with giant metal chopsticks, the next he's posting terrible memes at 3:15 AM. Baffling yet undeniable.",
    coolScore: 84,
    tags: ['SpaceX', 'Tesla', 'Meme Lord', 'Chopsticks Catch'],
    stats: [
      { label: 'Net Worth', value: '$260 Billion' },
      { label: 'Yacht Length', value: 'Prefers sleeping in Starbase trailer' },
      { label: 'Private Jets', value: 'Gulfstream G700' },
      { label: 'Ego Index', value: '11/10' }
    ],
    pros: ['Actually landed and caught orbital rocket boosters', 'Made electric cars fast and desirable', 'Runs 6 companies simultaneously'],
    cons: ['Spends 4 hours a day arguing with anonymous anime avatars on X', 'Unpredictable bedtime tweets move stock markets'],
    isOutOfReach: false,
    createdAt: Date.now() - 80000
  },
  {
    id: 'bil-zuck-foilsurf',
    name: 'Mark Zuckerberg (Hydrofoil Era)',
    subtitle: 'Meta Founder • Gold Chains • BJJ Blue Belt',
    themeId: 'billionaire',
    category: 'cool',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "He went from robotic sunscreen meme to choking out black belts in jiujitsu and foil-surfing in Hawaii with a gold chain. The PR glow-up of the century.",
    coolScore: 80,
    tags: ['Hydrofoil', 'BJJ', 'Gold Chain', 'Open Weights Hero'],
    stats: [
      { label: 'Net Worth', value: '$200 Billion' },
      { label: 'Yacht Length', value: '118 meters Launchpad' },
      { label: 'Private Jets', value: 'Boeing 737 VIP' },
      { label: 'Ego Index', value: '8.5/10' }
    ],
    pros: ['Open-sourced LLaMA 3.1 405B for free', 'Can choke you out in 45 seconds', 'Owns Kauai cattle ranch with wagyu macadamia diets'],
    cons: ['Still made you look at low-poly legless metaverse avatars for 2 years', 'Sunscreen face will haunt historians forever'],
    isOutOfReach: false,
    createdAt: Date.now() - 70000
  },
  {
    id: 'bil-bezos-cowboy',
    name: 'Jeff Bezos (Cowboy Era)',
    subtitle: 'Amazon Founder • Koru Sailing Yacht • Swole Pivot',
    themeId: 'billionaire',
    category: 'uncool',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Got jacked at 55, put on an oversized Stetson cowboy hat, and dismantled a historic bridge in Rotterdam just to get his sailing yacht out to sea.",
    coolScore: 48,
    tags: ['Cowboy Hat', 'Blue Origin', 'Mega Yacht Koru', 'Midlife Flex'],
    stats: [
      { label: 'Net Worth', value: '$210 Billion' },
      { label: 'Yacht Length', value: '127 meters (Triple-masted)' },
      { label: 'Private Jets', value: 'Gulfstream G650ER' },
      { label: 'Ego Index', value: '9/10' }
    ],
    pros: ['Built Amazon from garage books to modern logistics backbone', 'Built a 10,000-year mechanical clock inside a Texas mountain'],
    cons: ['Wore a ten-gallon hat to touch the edge of space for 3 minutes', 'Laugh sounds like a startled mechanical pelican'],
    isOutOfReach: false,
    createdAt: Date.now() - 60000
  },
  {
    id: 'bil-gold-steak',
    name: 'Gold Leaf Tomahawk Steak',
    subtitle: '$2,000 Salt Bae Edible Gold Ribeye',
    themeId: 'billionaire',
    category: 'seriously-uncool',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Edible 24k foil wrapped around mediocre beef, sliced by a man wearing sunglasses indoors. The international symbol of having more money than brain cells.",
    coolScore: 5,
    tags: ['Tacky', 'Salt Bae', 'Financial Regret', 'Dubai Flex'],
    stats: [
      { label: 'Net Worth', value: '-$2,000 per plate' },
      { label: 'Yacht Length', value: 'Zero' },
      { label: 'Private Jets', value: 'Spirit Airlines budget' },
      { label: 'Ego Index', value: 'Fake 10/10' }
    ],
    pros: ['Looks shiny on an Instagram story for 12 seconds', 'Taste identical to standard aluminum foil'],
    cons: ['You paid 40x markup to watch salt bounce off an elbow', 'Guaranteed mockery from anyone with actual wealth'],
    isOutOfReach: false,
    createdAt: Date.now() - 50000
  },

  // ================= SPACEX & AEROSPACE =================
  {
    id: 'spx-mechazilla-catch',
    name: 'Mechazilla Chopsticks Catch',
    subtitle: 'Starship Flight 5 Super Heavy Mid-Air Booster Capture',
    themeId: 'spacex',
    category: 'subzero',
    imageUrl: 'https://images.unsplash.com/photo-1517976487588-b4b1a41a4a58?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "A 230-foot rocket descending from the heavens at supersonic speed, hovering in mid-air, caught between two giant mechanical chopstick arms. Unbelievable.",
    coolScore: 100,
    tags: ['Chopsticks', 'Flight 5', 'Starbase', 'Pure Sci-Fi', 'Sub-Zero King'],
    stats: [
      { label: 'Thrust (kN)', value: '74,000 kN (33 Raptors)' },
      { label: 'Payload to LEO', value: '150+ metric tons' },
      { label: 'Reusability', value: '100% Full & Rapid' },
      { label: 'Delta-V', value: 'Mars-capable' }
    ],
    pros: ['Proved full orbital rocket stage reusability without landing legs', 'Looks like CGI but happened in real life in front of live cameras', 'Engineers went completely wild in the control room'],
    cons: ['Raptor sonic booms will shake your teacup in Houston', 'FAA will spend 6 months reviewing your paperwork'],
    isOutOfReach: true,
    createdAt: Date.now() - 100000
  },
  {
    id: 'spx-falcon-heavy-dual',
    name: 'Falcon Heavy Dual Side Booster Landing',
    subtitle: 'Simultaneous Side-by-Side LZ-1 & LZ-2 Touchdown',
    themeId: 'spacex',
    category: 'subzero',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Two orbital booster rockets returning from edge of space, executing synchronized sonic booms, landing upright side-by-side. Peak human engineering spectacle.",
    coolScore: 97,
    tags: ['Falcon Heavy', 'Synchronized', 'Dual Sonic Booms'],
    stats: [
      { label: 'Thrust (kN)', value: '22,819 kN' },
      { label: 'Payload to LEO', value: '63.8 tons' },
      { label: 'Reusability', value: 'Triple Booster Core' },
      { label: 'Delta-V', value: 'Heliocentric Orbit' }
    ],
    pros: ['The single most cinematic aerospace visual in recorded history', 'Cost 1/10th of traditional expendable heavy launchers'],
    cons: ['Center booster occasionally misses the drone ship into the Atlantic', 'Makes normal fireworks look profoundly depressing'],
    isOutOfReach: false,
    createdAt: Date.now() - 90000
  },
  {
    id: 'spx-crew-dragon',
    name: 'Crew Dragon Resilience',
    subtitle: 'Autonomous Human Spaceflight • Touchscreen Cockpit',
    themeId: 'spacex',
    category: 'cool',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "No clunky Apollo dials or Soviet toggle switches. Astronauts wearing tailored black-and-white flight suits tapping sleek touchscreens. Very slick.",
    coolScore: 88,
    tags: ['Human Spaceflight', 'ISS Ferry', 'Touchscreens', 'Nominal'],
    stats: [
      { label: 'Thrust (kN)', value: 'SuperDraco 68 kN' },
      { label: 'Payload to LEO', value: '7 Astronauts / Cargo' },
      { label: 'Reusability', value: 'Flown 5+ times per capsule' },
      { label: 'Delta-V', value: 'LEO Rendezvous' }
    ],
    pros: ['SuperDraco launch abort system can save crew from the pad', 'Autonomous docking with ISS without manual piloting', 'Clean white interior design'],
    cons: ['Touchscreen gloves feel a bit like an iPhone on a spacewalk', 'Space toilet requires specialized orientation briefing'],
    isOutOfReach: false,
    createdAt: Date.now() - 80000
  },
  {
    id: 'spx-voyager-probe',
    name: 'Voyager 1 Deep Space Probe',
    subtitle: 'Interstellar Messenger • Nuclear RTG • Golden Record',
    themeId: 'spacex',
    category: 'fridge',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Launched in 1977, currently 15 billion miles away in the icy interstellar void, carrying Bach, Chuck Berry, and greetings in 55 languages. Deep Space cryo status.",
    coolScore: 99,
    tags: ['Interstellar', 'Golden Record', '1977 Tech', 'Deep Space Cryo'],
    stats: [
      { label: 'Thrust (kN)', value: 'Hydrazine thrusters' },
      { label: 'Payload to LEO', value: '722 kg' },
      { label: 'Reusability', value: 'One-way voyage to eternity' },
      { label: 'Delta-V', value: '38,000 mph interstellar exit' }
    ],
    pros: ['Has survived in deep radiation for nearly half a century', 'Engineers fix it via 22-hour light delay from Earth', 'Transcends humanity itself'],
    cons: ['Runs on 69.63 kilobytes of computer memory', 'Plutonium battery slowly fading to black'],
    isOutOfReach: false,
    createdAt: Date.now() - 70000
  },
  {
    id: 'spx-blue-origin-new-shepard',
    name: 'Blue Origin New Shepard',
    subtitle: 'Suborbital Tourism Booster • 11-Minute Karman Ride',
    themeId: 'spacex',
    category: 'uncool',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Looks uncomfortably like an Austin Powers prop rocket. You float for 3 minutes, do a somersault, and then parachute back to Texas.",
    coolScore: 45,
    tags: ['Suborbital', 'Tourism', 'Karman Line', 'Bezos Rocket'],
    stats: [
      { label: 'Thrust (kN)', value: '490 kN (BE-3)' },
      { label: 'Payload to LEO', value: '0 kg (Suborbital only)' },
      { label: 'Reusability', value: 'Capsule & Booster' },
      { label: 'Delta-V', value: 'Max Alt 107 km' }
    ],
    pros: ['Huge observation windows for the champagne toast', 'Clean hydrogen-oxygen water vapor exhaust'],
    cons: ['Zero orbital velocity; you fall straight back down', 'Costs hundreds of thousands of dollars for 180 seconds of weightlessness'],
    isOutOfReach: false,
    createdAt: Date.now() - 60000
  },
  {
    id: 'spx-boeing-starliner',
    name: 'Boeing Starliner Calypso',
    subtitle: 'Commercial Crew Capsule • Thruster Leaks • Stranded ISS',
    themeId: 'spacex',
    category: 'seriously-uncool',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Spent double the budget of SpaceX, had thrusters overheat on approach, and left two NASA astronauts stranded on the space station for 8 months. Complete bin material.",
    coolScore: 8,
    tags: ['Stranded Astronauts', 'Cost-Plus Contract', 'Helium Leaks', 'R.U.D.'],
    stats: [
      { label: 'Thrust (kN)', value: 'Overheating RCS thrusters' },
      { label: 'Payload to LEO', value: 'Returned empty to New Mexico' },
      { label: 'Reusability', value: 'Theoretical' },
      { label: 'Delta-V', value: 'Emergency Standoff' }
    ],
    pros: ['Landed safely in White Sands without killing anyone on the return'],
    cons: ['NASA literally refused to let humans ride it back home', 'Helium leaking out of every valve', '$1.5 Billion cost overruns'],
    isOutOfReach: false,
    createdAt: Date.now() - 50000
  },

  // ================= TECH & AI =================
  {
    id: 'tech-claude-arena',
    name: 'Claude 3.5 Sonnet / Arena AI',
    subtitle: 'Frontier AI Model • Coding Prodigy • System Architect',
    themeId: 'tech',
    category: 'subzero',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "It doesn't just write code; it refactors your entire architecture, designs a gorgeous UI, and makes senior engineers wonder if they should take up pottery.",
    coolScore: 99,
    tags: ['Frontier Model', 'Coding Beast', 'Artifacts', 'Singularity'],
    stats: [
      { label: 'ARR / Valuation', value: '$40B+ Anthropic' },
      { label: 'Runway (mo)', value: 'Backed by Amazon & Google' },
      { label: 'Hype Factor', value: '10/10 Substance' },
      { label: 'Compute (Flops)', value: 'Exaflop Cluster' }
    ],
    pros: ['One-shot full stack apps without hallucinations', 'Artifacts preview feels like magic', 'Nuanced prose with zero robotic clichés'],
    cons: ['Occasionally hits rate limits when you are in the coding zone', 'Too polite when correcting your catastrophic bugs'],
    isOutOfReach: true,
    createdAt: Date.now() - 100000
  },
  {
    id: 'tech-linear',
    name: 'Linear App',
    subtitle: 'Issue Tracking Engineered for High-Performance Teams',
    themeId: 'tech',
    category: 'cool',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Opening Jira feels like waiting for a coal-fired locomotive to start. Opening Linear feels like piloting a carbon-fiber fighter jet. Crisp perfection.",
    coolScore: 89,
    tags: ['Keyboard Shortcuts', 'Design Standard', 'Speed Demon'],
    stats: [
      { label: 'ARR / Valuation', value: '$400M+ Private' },
      { label: 'Runway (mo)', value: 'Profitable & Lean' },
      { label: 'Hype Factor', value: 'Cult Favorite' },
      { label: 'Compute (Flops)', value: 'Sub-50ms Latency' }
    ],
    pros: ['Every single action has a instant keyboard shortcut (Cmd+K)', 'Dark mode aesthetic copied by every tech startup in SF', 'Zero loading spinners'],
    cons: ['Makes product managers assign 400 tickets before lunch', 'Engineers spend more time customizing workflows than writing code'],
    isOutOfReach: false,
    createdAt: Date.now() - 90000
  },
  {
    id: 'tech-vision-pro',
    name: 'Apple Vision Pro',
    subtitle: 'Spatial Computer • Micro-OLED • External Eye Display',
    themeId: 'tech',
    category: 'uncool',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "A $3,500 aluminum ski goggle with an external OLED screen displaying creepy ghostly virtual eyes to horrified passersby in Starbucks.",
    coolScore: 42,
    tags: ['Spatial Computing', 'EyeSight', 'Battery Tether', 'Ski Goggles'],
    stats: [
      { label: 'ARR / Valuation', value: '$3,500 MSRP' },
      { label: 'Runway (mo)', value: 'Unlimited Apple War Chest' },
      { label: 'Hype Factor', value: '4/10 Post-Launch Slump' },
      { label: 'Compute (Flops)', value: 'Dual M2 + R1' }
    ],
    pros: ['The clearest micro-OLED displays ever manufactured', 'Hand tracking and eye selection feel genuinely telepathic'],
    cons: ['Weighs as much as a bowling ball on your cheekbones', 'Tethered battery pack you have to stuff into your sweatpants', 'Zero killer apps beyond watching 3D Avatar'],
    isOutOfReach: false,
    createdAt: Date.now() - 80000
  },
  {
    id: 'tech-juicero',
    name: 'Juicero Wi-Fi Cold Press',
    subtitle: '$700 Wi-Fi Connected Hand-Squeezed Juice Bag Machine',
    themeId: 'tech',
    category: 'seriously-uncool',
    imageUrl: 'https://images.unsplash.com/photo-1622484214149-a2dd4609121a?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "A $700 mechanical press that refused to squeeze juice if its Wi-Fi was disconnected, until Bloomberg reporters demonstrated you could just squeeze the bag with your bare hands.",
    coolScore: 2,
    tags: ['Wi-Fi Juice', 'Vaporware', 'Silicon Valley Folly', 'Dead 404'],
    stats: [
      { label: 'ARR / Valuation', value: '$120M Burned' },
      { label: 'Runway (mo)', value: '0 (Bankruptcy)' },
      { label: 'Hype Factor', value: '0/10 Catastrophic' },
      { label: 'Compute (Flops)', value: 'DRM QR Code Scanner' }
    ],
    pros: ['Built like an airplane landing gear gear mechanism inside', 'Became the greatest meme in Silicon Valley venture capital history'],
    cons: ['Refused to squeeze expired bags', 'Cheaper and faster to just use your own thumbs'],
    isOutOfReach: false,
    createdAt: Date.now() - 70000
  },

  // ================= CYBERPUNK 2077 =================
  {
    id: 'cp-johnny-porsche',
    name: "Johnny Silverhand's 1977 Porsche 911",
    subtitle: 'Vintage Air-Cooled Turbo • Custom SamurAI Green Paint',
    themeId: 'cyberpunk',
    category: 'subzero',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "A genuine century-old combustion engine Porsche preserved in a world of electric synth-taxis. Johnny parked it outside Arasaka before blowing up the tower.",
    coolScore: 98,
    tags: ['Samurai', 'Vintage 911', 'Night City Legend', 'Chrome Sub-Zero'],
    stats: [
      { label: 'Street Cred', value: '50 (Maxed)' },
      { label: 'Cyberware Tier', value: 'Silver Rockerarm' },
      { label: 'Bounty (€$)', value: 'Wanted Dead or Alive' },
      { label: 'Cool Factor', value: '10/10' }
    ],
    pros: ['Manual five-speed transmission when everyone else uses neural autonav', 'Samurai logo on the ducktail spoiler', 'Sounds like thunder in the Watson district'],
    cons: ['Zero bulletproof plating against heavy Militech borgs', 'Requires refined petroleum fuel in 2077'],
    isOutOfReach: true,
    createdAt: Date.now() - 100000
  },
  {
    id: 'cp-sandevistan',
    name: 'Military Sandevistan Spine OS',
    subtitle: 'Temporal Neural Dilation • 90% Time Slowdown Cyberware',
    themeId: 'cyberpunk',
    category: 'cool',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Installed straight onto your vertebrae. You press a button, everyone else freezes in place like statues, and you stroll past them with a cup of coffee.",
    coolScore: 91,
    tags: ['Cyberware', 'Time Slow', 'Edgerunner', 'Sandevistan'],
    stats: [
      { label: 'Street Cred', value: '45' },
      { label: 'Cyberware Tier', value: 'Tier 5++ Iconic' },
      { label: 'Bounty (€$)', value: '120,000 ED' },
      { label: 'Cool Factor', value: '9.5/10' }
    ],
    pros: ['Dodge sniper bullets in mid-air', 'Look like a green blur on enemy optical sensors'],
    cons: ['Severe cyberpsychosis risk if used more than 4 times per afternoon', 'Ripperdoc installation requires a spinal tap without anaesthetic'],
    isOutOfReach: false,
    createdAt: Date.now() - 90000
  },
  {
    id: 'cp-corpo-suit',
    name: 'Arasaka Middle Manager Drone',
    subtitle: 'Junior VP of Sub-Level Counter-Intelligence',
    themeId: 'cyberpunk',
    category: 'seriously-uncool',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    clarksonVerdict: "Wears a synth-silk suit, monitors his cubicle subordinates' heart rates, and gets his cyberware remotely turned off by HR the second he turns 35.",
    coolScore: 7,
    tags: ['Corpo Trash', 'Sycophant', 'Arasaka Drone'],
    stats: [
      { label: 'Street Cred', value: '1' },
      { label: 'Cyberware Tier', value: 'Corporate Monitored' },
      { label: 'Bounty (€$)', value: '15 ED' },
      { label: 'Cool Factor', value: '0/10' }
    ],
    pros: ['Has health insurance until the next quarterly restructuring'],
    cons: ['Zero street cred at the Afterlife bar', 'Life expectancy shorter than an open battery in a swimming pool'],
    isOutOfReach: false,
    createdAt: Date.now() - 80000
  }
];
