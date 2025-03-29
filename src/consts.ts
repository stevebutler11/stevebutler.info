import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Steve Butler",
  EMAIL: "contact@stevebutler.info",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "The personal site of Steve Butler. Welcome!",
};

export const POSTS: Metadata = {
  TITLE: "Posts",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const ABOUT: Metadata = {
  TITLE: "About",
  DESCRIPTION: "A little bit about myself.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/stevebutler11"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/steven-butler-3749a6a4/",
  }
];
