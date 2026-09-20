// Random Clarkson / Top Gear quip generator tailored to coolness score and category

export function generateClarksonQuip(category: string, score: number, subjectName: string = 'this'): string {
  const name = subjectName.trim() || 'this';

  const seriouslyUncoolQuotes = [
    `Dreadful. ${name} is driven exclusively by dental hygienists and people who pronounce it 'espresso' with an X.`,
    `I would rather walk through a Birmingham thunderstorm clad in tinfoil than be caught inside ${name}.`,
    `It has the structural rigidity of a damp digestive biscuit and the visual appeal of an unwashed turnip.`,
    `If you turn up to a date with ${name}, they will flee out of the bathroom window within four minutes.`,
    `Rendered on a 1996 PlayStation 1 polygon budget. Straight into the municipal incinerator.`,
    `Looking at ${name} causes a sharp, localized migraine behind the left eyeball. Total bin material.`,
    `The sort of catastrophe that makes you question whether human civilization was actually a good idea.`
  ];

  const uncoolQuotes = [
    `If someone at a dinner party asks about ${name}, the entire room falls dead silent and everyone checks their watch.`,
    `${name} is the technological equivalent of plain white toast without butter. Utterly beige.`,
    `Driven by chartered accountants who tuck their short-sleeve polo shirts into their khaki shorts.`,
    `Boring. It has all the passion, charisma, and soul of a domestic washing machine on delicate cycle.`,
    `It tries so desperately hard to look cool that it has looped right back around into tragic mediocrity.`
  ];

  const coolQuotes = [
    `The ultimate classless masterpiece. Park ${name} outside the opera or outside a kebab shop; everyone nods in quiet approval.`,
    `You can arrive anywhere with ${name} and look like you have your finances and life completely sorted out.`,
    `Effortlessly stylish. ${name} doesn't shout; it whispers authority like a tailored Italian suit.`,
    `Sensational. The sound alone will make your spine tingle and your neighbor question their life choices.`,
    `Genuinely brilliant. Even James May would admit this has proper character without consulting a spreadsheet.`
  ];

  const subZeroQuotes = [
    `It doesn't just bend corners; ${name} bends space-time and laughs directly in the face of physics.`,
    `So effortlessly cool that even Richard Hammond wearing tinted aviators cannot ruin it.`,
    `Colder than an iceberg drifting off Svalbard. It doesn't obey regulations; regulations yield to it.`,
    `An absolute triumph of human audacity. Sticking this on the wall is an honor for the wall.`,
    `Pure, unfiltered adrenaline. If you don't find ${name} cool, you need to check your pulse.`
  ];

  const fridgeQuotes = [
    `Too breathtaking for normal wall physics. ${name} belongs strictly in the cryogenic DB9 fridge with the chilled champagne.`,
    `Untouchable royalty. Merely looking directly at ${name} may cause spontaneous standing ovations across the studio.`,
    `Ascended beyond mortal coolness. We have to seal this in liquid nitrogen to prevent the rest of the board from melting.`
  ];

  let list = coolQuotes;
  if (category === 'fridge') list = fridgeQuotes;
  else if (category === 'subzero' || score >= 90) list = subZeroQuotes;
  else if (category === 'cool' || score >= 65) list = coolQuotes;
  else if (category === 'uncool' || score >= 35) list = uncoolQuotes;
  else list = seriouslyUncoolQuotes;

  return list[Math.floor(Math.random() * list.length)];
}
