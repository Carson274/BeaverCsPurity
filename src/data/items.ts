export const items: string[] = [
  // --- THE BASICS & CLASSROOM ANTICS ---
  "Survived CS 162",
  "Considered switching majors",
  "Used Latex or Markdown for class notes",
  "Submitted the wrong assignment document",
  "Used Jake's Resume template (or Peter's <a href='https://formacv.org/' target='_blank' rel='noopener noreferrer' class='text-link'>resume builder</a>)",
  "Stuttered while talking to someone",
  "Sat in the front row of a class",
  "Raised your hand in class",
  "Fell asleep in class",
  "Ate a whole meal in class",
  "Had the dawgs out in class",
  "Used a personal mouse in class",
  "Moved seats because of someone's B.O.",
  "Skipped every lecture for a class after week 1",
  "Delayed taking a course to take it with a specific professor",
  "Emailed a professor for an extension",
  "Added a review on RateMyProfessor",
  "Been on a first name basis with a professor",
  "Used an LLM on an assignment",
  "Cried over an assignment/exam",

  // --- LIFESTYLE & LATE NIGHTS ---
  "Drank 400+ mg of caffeine in one day",
  "Bought a Subway sandwich after 2am",
  "Went 2 days in a row without showering",
  "Went 3+ days in a row without showering",
  "Grew a beard",
  "Had to get glasses mid-degree",
  "Owned an RGB keyboard",
  "Built a PC",
  "Made a computer science reference IRL",
  "Coded outside",
  "Coded at Dixon",
  "Coded on your phone",
  "Coded in high school",
  "Coded on a Friday night",
  "Coded inebriated",
  "Pulled an all-nighter",
  "Pulled 2+ all-nighters in a row",
  "Left the library at 12am",
  "Studied on the library 6th floor",
  "Spent the night in Kelley",

  // --- CLUBS & HACKATHONS ---
  "Attended a club meeting only for the food",
  "Attended an <a href='https://acm.oregonstate.edu' target='_blank' rel='noopener noreferrer' class='text-link'>ACM</a> club meeting (shameless plug)",
  "Attended a <a href='https://beaverhacks.org/' target='_blank' rel='noopener noreferrer' class='text-link'>BeaverHacks</a> hackathon",
  "Attended a hackathon outside of Oregon",
  "Placed in a hackathon",
  "Joined a club officer board",
  "Built a personal website",
  "Built a Chrome Extension",
  "Built a ChatGPT wrapper",
  "Spent money on an LLM",

  // --- CODING MISHAPS & PROJECTS ---
  "Forgot how to exit Vim or Nano",
  "Lost hours of work because you forgot to push",
  "Pushed code with '--force'",
  "Caused a massive merge conflict",
  "Pushed an API key to GitHub",
  "'sudo rm -rf'd something you weren't supposed to",
  "Fork bombed the OS1 or flip server",
  "Used an API without rate limiting and <i>literally</i> paid the price",
  "Made or commented on a CS-related Reddit post",
  "Had an app idea you thought was unique but already existed",
  "Overengineered a project",
  "Put 'REST' or 'RESTful API' on your resume",
  "Contributed to an open source project",
  "Had a GitHub commit streak of 100+ days",
  "Completed Advent of Code",

  // --- LEETCODE & LINKEDIN GRIND ---
  "Made a LinkedIn post",
  "Commented on a LinkedIn post",
  "Made 500+ connections on LinkedIn",
  "Completed LeetCode's 'Two Sum'",
  "Bought LeetCode Premium",
  "Completed a LeetCode hard (without looking at the solution)",
  "Completed 500+ LeetCode problems",
  "Solved a LeetCode problem in class",
  "Been mock interviewed",
  "Mock interviewed someone",

  // --- THE CAREER SEARCH ---
  "Got an interview from a career fair",
  "Applied to 100+ positions",
  "Applied to 1000+ positions",
  "Did an unpaid internship 🥲",
  "Got a 100% of test cases on an OA",
  "Corrected the interviewer during a technical interview",
  "Got an internship",
  "Got a j*b offer",
  "Reneged an internship or j*b offer",
  "Landed a <i>FAANG</i> internship or j*b",

  // --- ABSOLUTE TRYHARD / END-GAME DEGENERACY ---
  "Never attended a party",
  "Never went on a date",
  "Took 18+ credits in one term",
  "Sacrificed one course's exam to study for another's",
  "Took Operating Systems II",
  "Became a ULA or GTA",
  "Worked in a research lab",
  "Authored a research paper",
  "Joined and didn't drop out of the Honors College",
  "Did a Master's to delay unemployment",
  "Got 100% on an exam",
  "Finished a course with over 100%",
  "Maintained a 4.0",
  "Inducted into the Hess Hall of Fame",
  "Graduated 🥳",
];

export type Section = {
  title: string;
  shortTitle: string;
  startId: number;
  endId: number;
  anchorId: string;
};

export const sections: Section[] = [
  { title: 'The Basics & Classroom Antics', shortTitle: 'Basics', startId: 0, endId: 19, anchorId: 'section-basics' },
  { title: 'The "Critter" Lifestyle & Late Nights', shortTitle: 'Lifestyle', startId: 20, endId: 39, anchorId: 'section-lifestyle' },
  { title: 'Clubs & Hackathons', shortTitle: 'Clubs', startId: 40, endId: 49, anchorId: 'section-clubs' },
  { title: 'Coding Mishaps & Projects', shortTitle: 'Mishaps', startId: 50, endId: 64, anchorId: 'section-mishaps' },
  { title: 'The LeetCode & LinkedIn Grind', shortTitle: 'Grind', startId: 65, endId: 74, anchorId: 'section-grind' },
  { title: 'The Career Search', shortTitle: 'Career', startId: 75, endId: 84, anchorId: 'section-career' },
  { title: 'Absolute Tryhard / End-Game Degeneracy', shortTitle: 'Tryhard', startId: 85, endId: 99, anchorId: 'section-tryhard' },
];