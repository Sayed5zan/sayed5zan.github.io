export interface Project {
    id: number;
    title: string;
    role: string;
    image: string;
    github: string;
    date?: string;
    category?: string;
    description?: string;
    mission?: string;
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Project Nimbus',
        role: 'Lead Frontend Designer',
        image: 'assets/nimbusThumbnail.jpg',
        github: 'https://github.com/Sayed5zan/Nimbus',
        date: 'Feb 2023',
        category: 'Web Application',
        description: 'Project Nimbus is a comprehensive weather application designed to provide users with accurate and real-time weather data. As the Lead Frontend Designer, I focused on creating an intuitive and visually appealing interface that makes weather tracking effortless.',
        mission: 'To create a weather app that is not only functional but also a joy to use, with a focus on user experience and accessibility.'
    },
    {
        id: 2,
        title: 'Conestoga Virtual Game Store',
        role: 'Full Stack Developer',
        image: 'assets/virtual.jpg',
        github: 'https://github.com/fsThere/GamesClub_TeamBlankSpace',
        date: 'Nov 2023',
        category: 'E-Commerce',
        description: 'A full-stack virtual game store built for Conestoga College. This project involved creating a robust backend to handle user authentication, game inventory, and transactions, paired with a dynamic frontend for browsing and purchasing games.',
        mission: 'To build a secure and scalable e-commerce platform that simulates a real-world digital game store environment.'
    },
    {
        id: 3,
        title: 'My GitHub',
        role: 'Open Source Contributor',
        image: 'assets/github.png',
        github: 'https://github.com/Sayed5zan',
        date: 'Ongoing',
        category: 'Portfolio',
        description: 'My GitHub profile hosts a variety of projects ranging from small utility scripts to larger web applications. It serves as a central hub for my coding journey and open-source contributions.',
        mission: 'To continuously learn, experiment, and share code with the developer community.'
    }
];
