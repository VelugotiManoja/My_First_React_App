/* eslint-disable max-len*/
const S1 = 'test';
const S2 = 'Work on The Elder Scrolls II: Daggerfall began immediately after Arena\'s release in March 1994. Ted Peterson was assigned the role of Lead Game Designer. Daggerfall\'s plot was less clichéd than Arena\'s and involved a "complex series of adventures leading to multiple resolutions." With Daggerfall, Arena\'s experience-point-based system was replaced with one rewarding the player for actually role-playing their character. Daggerfall came equipped with an improved character generation engine, one that included a GURPS-influenced class creation system, offering players the chance to create their own classes, and assign their own skills. Daggerfall was developed with an XnGine engine, one of the first truly 3D engines. Daggerfall realized a game world the size of Great Britain, filled with 15,000 towns and a population of 750,000. It was influenced by analog games and literature that Julian LeFay or Ted Peterson happened to be playing or reading at the time, such as Dumas\'s The Man in the Iron Mask and Vampire: The Masquerade. It was released on August 31, 1996. Like Arena, Daggerfall\'s initial release suffered from some bugs, leaving consumers disgruntled. These early anomalies were fixed in later versions. This experience led to a more prudent release schedule for future games.';
const S3 = 'The third title in The Elder Scrolls series was first conceived during the development of Daggerfall. Initially designed to encompass the whole province of Morrowind and allow the player to join all five Dunmer Great Houses, it was decided that the scope of the game was too much for the technology available at the time. At publication, it covered just the isle of Vvardenfell and allowed the player to only join three of the Great Houses. The XnGine was scrapped and replaced with Numerical Design Limited\'s Gamebryo, a Direct3D powered engine, with T&L capacity, 32-bit textures and skeletal animation. It was decided that the game world would be populated using the methods the team had developed in Redguard; with the game objects crafted by hand, rather than generated using the random algorithmic methods.\nThe project took "close to 100 man-years to create." Bethesda tripled their staff and spent the first year developing The Elder Scrolls Construction Set. This allowed the game staff to easily balance the game and to modify it in small increments rather than large. Ted Peterson, who had left following the release of Daggerfall, returned to work as an author of in-game material, and as a general consultant on the lore-based aspects of the work. The PC version of Morrowind had gone gold by April 23, 2002, and was released on May 1 in North America, with the Xbox release set at June 7. On January 3, Bethesda announced that game publisher Ubisoft would take control of Morrowind\'s European distribution, in addition to those of eight other Bethesda games.\nThe Elder Scrolls III: Tribunal expansion pack went gold on November 1 and was released, with little fanfare, on November 6. Tribunal puts the player in the self-contained, walled city of Mournhold, which can be teleported to from Morrowind\'s land mass. Development on the expansion began immediately after Morrowind shipped, giving the developers a mere five-month development cycle to release the game. The prior existence of the Construction Set, however, meant that the team "already had the tools in place to add content and features very quickly." Interface improvements, and specifically an overhaul of Morrowind\'s journal system, were among the key goals. Morrowind\'s second expansion, The Elder Scrolls III: Bloodmoon, went gold by May 23, and was released on June 6. It had been worked on since the release of Tribunal. In the expansion, the player travels to the frozen island of Solstheim and is asked to investigate the uneasiness of the soldiers stationed there.';
const S4 = 'Work on The Elder Scrolls IV: Oblivion began in 2002, immediately after Morrowind\'s publication. Oblivion was developed by Bethesda Softworks, and the initial Xbox 360 and Personal computer (PC) releases were co-published by Bethesda and Take-Two Interactive subsidiary 2K Games. Oblivion was released on March 21, 2006. The game centers around an event later referred to as "The Oblivion Crisis", where portals to the planes of Oblivion open and release hordes of Daedra upon Tamriel. Developers working on Oblivion focused on providing a tighter storyline, more developed characters, and to make information in the game world more accessible to players. Oblivion features improved AI, improved physics, and improved graphics. Bethesda developed and implemented procedural content creation tools in the creation of Oblivion\'s terrain, leading to landscapes that are more complex and realistic than those of past titles, but had less of a drain on Bethesda\'s staff. Two downloadable expansion packs, Knights of the Nine and The Shivering Isles were released in 2006 and 2007, respectively. Knights of the Nine added a questline surrounding the search for a set of Crusader relics, while The Shivering Isles added the eponymous plane of Oblivion to the game.';
const S5 = 'In August 2010, Todd Howard revealed Bethesda were currently working on a game that had been in development since the release of Oblivion, and that progress was very far along. While the game was conceptualized after Oblivion\'s release, main development was restricted until after Fallout 3 was released. In November, a journalist from Eurogamer Denmark reported overhearing a developer on a plane talking about the project; a new The Elder Scrolls game, although Bethesda did not comment on the report. At the Spike Video Game Awards in December, Todd Howard appeared on stage to unveil a teaser trailer and announce the title of the game. The Elder Scrolls V: Skyrim was released on November 11, 2011 to widespread critical acclaim. It was awarded \'Game of the Year\' by IGN, Spike and others. The game is set after the events of Oblivion, when the great dragon Alduin the World Eater returns to Skyrim; a beast whose existence threatens all life in Tamriel. Three pieces of DLC were released on PC and Xbox 360 in 2012- Dawnguard, Hearthfire and Dragonborn, with a PlayStation 3 release in February 2013. Dawnguard added two joinable factions and an associated questline revolving around Vampires, while Hearthfire added more home customisation options. Dragonborn added the island of Solstheim to the northeast.';
/* eslint-enable max-len*/

module.exports = [
  {
    date: '01/01/1994',
    avatarURL: 'https://upload.wikimedia.org/wikipedia/en/8/89/Elder_Scrolls_Arena_Cover.jpg',
    photo: './the_elder_scrolls_1_arena_wallpaper_by_thejackmoriarty-d8mlpzc.png',
    title: 'HTML',
    subtitle: 'Roju vamshi',
    content: S1
  },
  {
    date: '08/31/1996',
    avatarURL: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Daggerfall_Cover_art.gif',
    photo: 'https://images6.alphacoders.com/599/599052.jpg',
    title: 'The Elder Scrolls: 2',
    subtitle: 'Daggerfall',
    content: S2
  },
  {
    date: '05/02/2002',
    avatarURL: 'https://upload.wikimedia.org/wikipedia/en/5/53/MorrowindCOVER.jpg',
    photo: 'http://elder-scrolls.com/uploads/posts/2013-11/1384956239_m43.jpg',
    title: 'The Elder Scrolls: 3',
    subtitle: 'Morrowind',
    content: S3
  },
  {
    date: '03/20/2006',
    avatarURL: 'https://upload.wikimedia.org/wikipedia/en/4/4b/The_Elder_Scrolls_IV_Oblivion_cover.png',
    photo: 'https://images8.alphacoders.com/410/410161.jpg',
    title: 'The Elder Scrolls: 4',
    subtitle: 'Oblivion',
    content: S4
  },
  {
    date: '11/11/2011',
    avatarURL: 'https://upload.wikimedia.org/wikipedia/en/1/15/The_Elder_Scrolls_V_Skyrim_cover.png',
    photo: 'http://wallpapercave.com/wp/GMifnUB.jpg',
    title: 'The Elder Scrolls: 5',
    subtitle: 'Skyrim',
    content: S5
  }
];
