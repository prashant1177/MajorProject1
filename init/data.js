const sampleListing = [
  {
    title: "Automated Bottom-Line Car",
    description:
      "Side safe art walk positive. Where pull brother throughout figure positive. Rich meeting town kitchen.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.65,
    location: "Lake Sarahton",
    capacity: 5,
  },
  {
    title: "Digitized Needs-Based Travel Bus",
    description:
      "Might community list. Only test over easy. Subject lose manager far though. Line modern product knowledge many. This hit central. Have station almost week threat himself. Guy tell human.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.2,
    location: "South Jessica",
    capacity: 20,
  },
  {
    title: "Organic Multi-Tasking Car",
    description: "Baby physical blue friend. Shake tend stop eye baby dream.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.55,
    location: "Lake Shelby",
    capacity: 4,
  },
  {
    title: "Distributed Cohesive Travel Bus",
    description:
      "Write lead news choice century PM sea. Society yet attorney arm early. Huge along hot so stage strategy card. Skin class talk anything. Role course eye program and.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.1,
    location: "Greerville",
    capacity: 20,
  },
  {
    title: "Customer-Focused Eco-Centric Car",
    description:
      "Really test four discover. Season hit receive space young spring become. Paper interesting line should different. Even case though growth center expert finally two.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.75,
    location: "East Marcia",
    capacity: 5,
  },
  {
    title: "Inverse Systematic Travel Bus",
    description:
      "One of treatment yes card season section. Similar sing develop effort someone if member. Can animal north whole market. Various purpose vote future agree outside president attention.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.3,
    location: "Terrellmouth",
    capacity: 18,
  },
  {
    title: "Proactive 6-Sigma Car",
    description:
      "Assume north point affect various part. International mother plant door care. Meet leader race candidate father. Skin nation quality ahead.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.5,
    location: "Port Christopher",
    capacity: 4,
  },
  {
    title: "Enhanced Demand-Driven Travel Bus",
    description:
      "Level less ever suddenly. Owner mother structure court. Quickly tree soldier mention west sound morning.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.0,
    location: "West Rodney",
    capacity: 15,
  },
  {
    title: "Balanced Explicit Car",
    description:
      "Thing time two month system name. Girl chair budget. Fill western yes within memory.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.45,
    location: "East Natalie",
    capacity: 4,
  },
  {
    title: "User-Centric Uniform Travel Bus",
    description:
      "Reduce yet debate popular less catch learn. Cup hear already young. Discussion without old couple view exactly partner.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.15,
    location: "Harriston",
    capacity: 20,
  },
  {
    title: "Optimized Context-Sensitive Car",
    description:
      "Every main example avoid represent something create. Approach social he bit realize quite. Choose itself lay listen follow. I rather close option nature direction area product.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.6,
    location: "East Johnny",
    capacity: 4,
  },
  {
    title: "Multi-Lateral Hybrid Travel Bus",
    description:
      "Game perhaps sort figure successful may. Hour marriage training trial rise morning. Standard mean table manage kitchen.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.25,
    location: "Port Karen",
    capacity: 16,
  },
  {
    title: "De-Engineered Coherent Car",
    description:
      "Factor per instead music. When food drive worker trade total material behind. Process table home think common view campaign course.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.7,
    location: "East Cheryl",
    capacity: 5,
  },
  {
    title: "Open-Source Explicit Travel Bus",
    description:
      "Main ever card sense difficult member position. Eight school safe choice set shoulder upon. Base world research air page deal case. At entire back without.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.1,
    location: "West Gabrielle",
    capacity: 20,
  },
  {
    title: "Extended Interactive Car",
    description:
      "Network now late care site food. Ability person reason leader degree. Art above send. Picture foot break attack.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.55,
    location: "West Robertberg",
    capacity: 4,
  },
  {
    title: "Switchable High-Level Travel Bus",
    description:
      "Share bad member worker. Buy bring baby real serious. All ground consider face culture church third. Various remain relationship.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.3,
    location: "North Annaburgh",
    capacity: 20,
  },
  {
    title: "Secured Multi-Tiered Car",
    description:
      "Show political travel skill own store. Social safe economic town cell south.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.65,
    location: "Jessicafurt",
    capacity: 5,
  },
  {
    title: "Enhanced Modular Travel Bus",
    description:
      "Step heart next finally resource huge run. Reduce food she young. Shoulder entire spring.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.05,
    location: "South Tonyville",
    capacity: 17,
  },
  {
    title: "Future-Proofed Dynamic Car",
    description:
      "Order future simply administration. Score month particular use establish.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.55,
    location: "South Micheal",
    capacity: 4,
  },
  {
    title: "Decentralized Homogeneous Travel Bus",
    description:
      "Process month operation amount. Man school most option person.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.15,
    location: "North Stephaniestad",
    capacity: 20,
  },
  {
    title: "Organic Multi-Tasking Car",
    description:
      "Final early general give special couple. Material only PM much. Seek him common moment.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.75,
    location: "East Amyloubury",
    capacity: 5,
  },
  {
    title: "Triple-Buffering Balanced Travel Bus",
    description:
      "Skill add hour fall hair of perform. Kitchen laugh ahead. Simple great current we and rich business. Teach build room memory college.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 1.2,
    location: "Michelefurt",
    capacity: 19,
  },
  {
    title: "Virtual Multi-Tasking Car",
    description:
      "Already policy wind. Team performance quickly. Blue should movie apply exactly. Crime fall item safe. Education debate own.",
    image: "https://unsplash.com/illustrations/32F1HmnROlY",
    price: 0.6,
    location: "Taylorport",
    capacity: 4,
  },
];

module.exports = { data: sampleListing };
