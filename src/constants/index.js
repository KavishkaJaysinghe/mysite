import { meta, posIcon, bankingIcon, personalIcon } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "WPF & Java Developer (Banking Application)",
        company_name: "Self-Project (Dual-Control Banking System)",
        icon: bankingIcon,
        iconBg: "#accbe1",
        date: "March 2025 - Present",
        points: [
            "Developed a dual-control banking application using WPF for the front-end and Java socket programming for real-time communication.",
            "Implemented secure loan handling with manager approval for modifications and access control.",
            "Designed and developed server-client architecture with real-time updates for loan management.",
            "Collaborated with team members to ensure data integrity and secure financial transactions.",
        ],
    },
    {
        title: "React Native Developer (Group Project)",
        company_name: "University Undergraduate Project (Clothing Customization & Virtual Try-On)",
        icon: personalIcon,
        iconBg: "#a2d2ff",
        date: "2025 - Present",
        points: [
            "Developing a clothing customization system with React Native and integrating AR for virtual try-ons.",
            "Implementing Algolia for AI-powered clothing search, enhancing user experience.",
            "Using Firebase Authentication for secure sign-in, sign-up, and password resets.",
            "Collaborating on refining the clothing recommendation system based on user preferences.",
            "Optimizing app performance with Firebase and Algolia for smooth, real-time updates."
        ],
    },
    {
        title: "Full-Stack Developer (Divisional Portal)",
        company_name: "University Undergraduate Project (Divisional Portal Website)",
        icon: bankingIcon,
        iconBg: "#b7e4c7",
        date: "April 202 - Present",
        points: [
            "Developing a divisional portal website using Spring Boot for the back-end and React for the front-end.",
            "Collaborating with cross-functional teams to ensure the portal meets user needs and delivers high-quality features.",
            "Implementing responsive design to ensure the portal is user-friendly across all devices and browsers.",
            "Participating in code reviews, providing constructive feedback, and continuously improving the project's code quality."
        ],
    },
    {
        title: "Full-Stack Developer (Kitchen POS Application)",
        company_name: "University Undergraduate Project (Kitchen Point of Sale)",
        icon: posIcon,
        iconBg: "#a2d2ff",
        date: "Jan 2024 - Present",
        points: [
            "Developing a Kitchen Point of Sale (POS) desktop application using WPF for the front-end and SQL for database management.",
            "Implementing secure transaction and order management features to ensure smooth operations in a kitchen environment.",
            "Collaborating with users to refine user interfaces and optimize the app’s workflow for kitchen staff.",
            "Ensuring cross-platform compatibility and smooth integration with various POS peripherals."
        ],
    },
    {
        title: "Machine Learning Developer (Customer Churn Prediction)",
        company_name: "University Undergraduate Project (Customer Churn Prediction)",
        icon: bankingIcon,
        iconBg: "#a2d2ff",
        date: "Jan 2025 - Present",
        points: [
            "Developing a customer churn prediction model using Random Forest and XGBoost.",
            "Preprocessing data to improve model accuracy and handle missing values and outliers.",
            "Training and fine-tuning machine learning models to predict customer churn based on historical data.",
            "Evaluating model performance using various metrics such as accuracy, precision, recall, and F1 score.",
            "Collaborating with data analysts to refine features and enhance model predictions."
        ],
    },
    {
        title: "Database Developer (SQL Project)",
        company_name: "University Undergraduate Project (SQL Database)",
        icon: bankingIcon,
        iconBg: "#a2d2ff",
        date: "may 2024 - Present",
        points: [
            "Developing an SQL database system with complex queries to manage data efficiently.",
            "Implementing roles and permissions to ensure data security and access control.",
            "Writing and optimizing SQL queries for data retrieval, manipulation, and reporting.",
            "Designing and normalizing database schema to ensure scalability and integrity.",
            "Collaborating with team members to ensure data consistency and performance across large datasets."
        ],
    },
    {
        title: "C++ Developer (Airplane Parking Management System)",
        company_name: "University Undergraduate Project (Airplane Parking Management System)",
        icon: bankingIcon,
        iconBg: "#a2d3ff",
        date: "Jan 2024 - Present",
        points: [
            "Developing an airplane parking management system using C++ and linked lists as a console application.",
            "Implementing linked list data structures to manage parking spots and airplane information.",
            "Optimizing the system to handle various parking operations, such as adding, removing, and searching for parked airplanes.",
            "Designing a user-friendly console interface to interact with the system and manage airplane parking efficiently.",
            "Testing and debugging the system to ensure correct functionality and performance."
        ],
    }
    
    
    
    
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Amazon Price Tracker',
        description: 'Developed a web application that tracks and notifies users of price changes for products on Amazon, helping users find the best deals.',
        link: 'https://github.com/adrianhajdin/pricewise',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Full Stack Threads Clone',
        description: 'Created a full-stack replica of the popular discussion platform "Threads," enabling users to post and engage in threaded conversations.',
        link: 'https://github.com/adrianhajdin/threads',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Car Finding App',
        description: 'Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.',
        link: 'https://github.com/adrianhajdin/project_next13_car_showcase',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Full Stack Instagram Clone',
        description: 'Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.',
        link: 'https://github.com/adrianhajdin/social_media_app',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Real-Estate Application',
        description: 'Developed a web application for real estate listings, facilitating property searches and connecting buyers with sellers.',
        link: 'https://github.com/adrianhajdin/projects_realestate',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'AI Summarizer Application',
        description: 'App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs.',
        link: 'https://github.com/adrianhajdin/project_ai_summarizer',
    }
];