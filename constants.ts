
import { Project, BlogPost, ChannelPostData } from './types';

const originalProjects: Project[] = [
  {
    title: "Decoding Imagined Handwriting from EEG",
    githubUrl: "https://github.com/dearabhin/Decoding-Handwriting-From-EEG",
    date: "Aug 2025 - Present",
    description: "A machine learning project focused on classifying high-dimensional, noisy EEG time-series data to decode imagined handwriting for BCI applications. This involves preprocessing 32-channel EEG signals and implementing EEGNet, a compact CNN, to perform a four-way classification of imagined letters ('L', 'V', 'O', 'W').",
    tags: ['BCI', 'EEG', 'Machine Learning', 'CNN', 'Signal Processing']
  },
  {
    title: "Real-Time Object Detection for Edge Devices using TinyML",
    githubUrl: "https://github.com/dearabhin/TinyML-Object-Detector",
    date: "Aug 2025 - Present",
    description: "Developed a real-time, multi-label object detection and classification system on a resource-constrained microcontroller (Seeed Studio XIAO ESP32S3 Sense). The system identifies and differentiates between \"Cats\" and \"Dogs\" at ~7 FPS with 143 ms latency, demonstrating a complete TinyML workflow from data collection to firmware deployment.",
    tags: ['TinyML', 'Edge AI', 'Computer Vision', 'Object Detection', 'ESP32', 'Arduino', 'C++']
  },
  {
    title: "Bitchat CLI: A Decentralized Python P2P Messenger",
    githubUrl: "https://github.com/dearabhin/bitchat-cli",
    date: "Jul 2025 - Present",
    description: "Engineered a Python-based CLI for a secure, decentralized P2P messenger running over a Bluetooth LE mesh network. Inspired by Jack Dorsey's original project, it brings a serverless chat experience to the command line with end-to-end encrypted messaging and public channels.",
    tags: ['Python', 'Bluetooth Low Energy (BLE)', 'P2P Networking', 'Cryptography']
  },
  {
    title: "LipiPala: Preserving India's Linguistic Heritage",
    githubUrl: "https://github.com/dearabhin/lipipala",
    date: "Feb 2025 - Present",
    description: "An open-source initiative to preserve, document, and revitalize endangered Indian languages using AI. The project combines advanced NLP, speech recognition, and community collaboration to create accessible tools for indigenous communities.",
    tags: ['NLP', 'LLM', 'Speech Recognition', 'Open Source']
  },
  {
    title: "Multimodal AI Medical Agent",
    githubUrl: "https://github.com/dearabhin/multimodal-medical-agent",
    date: "Jan 2025 - Apr 2025",
    description: "Developed a multimodal AI medical agent utilizing the capabilities of the Gemini 2.0 model to process and interpret various data types for medical applications.",
    tags: ['Python', 'Generative AI', 'Multimodal AI']
  },
  {
    title: "EMG based Smart Home Automation",
    githubUrl: "https://github.com/dearabhin/emg-smart-home",
    date: "Dec 2024 - Feb 2025",
    description: "A research-oriented project focused on using Electromyography (EMG) signals for smart home automation. The project involved machine learning for signal classification, electronics for hardware interfacing, and overall project management.",
    tags: ['EMG', 'Machine Learning', 'Electronics', 'IoT']
  },
  {
    title: "Web Screenshot Bot - Telegram Mini App",
    githubUrl: "https://github.com/dearabhin/web-screenshot-bot",
    date: "Jul 2022 - Dec 2024",
    description: "Created a Telegram mini-app to safely take screenshots of webpages from URLs without opening potentially risky links directly on a device, enhancing user security.",
    tags: ['JavaScript', 'Python', 'Telegram API', 'Web Scraping']
  }
];

const originalBlogPosts: BlogPost[] = [
    {
        title: "A guide to AI and ML",
        excerpt: "Artificial intelligence (AI) and machine learning (ML) are changing the future of work.",
        url: "https://www.abhinkrishna.com/2025/02/a-guide-to-ai-and-ml.html"
    },
    {
        title: "Sympy Guide",
        excerpt: "SymPy is a Python library for symbolic mathematics, allowing manipulation of mathematical expressions programmatically.",
        url: "https://www.abhinkrishna.com/2024/12/sympy-guide.html"
    }
];

const originalSkills: string[] = [
    'Web Development', 'API', 'Machine Learning', 'Deep Learning',
    'Computer Vision', 'Object Detection', 'Natural Language Processing (NLP)',
    'Large Language Models (LLM)', 'TinyML', 'Research', 'CAD',
    'Data Analysis & Visualization', 'Brain-Computer Interfaces (BCI)',
    'EEG/EMG Signal Processing', 'MATLAB', 'Python', 'R', 'C', 'C++',
    'HTML & CSS', 'JavaScript', 'Arduino', 'ESP32', 'Firmware Development',
    'Bluetooth Low Energy (BLE)', 'Git & GitHub', 'Linux', 'Microsoft Office',
    'DNS', 'Cloud Services (AWS, GCP)'
];

const originalResearchInterests: string[] = [
    "Brain-Computer Interfaces: EEG/EMG for assistive technologies and neural decoding.",
    "AI in Healthcare: Generative AI (e.g., Imagen) and Deep Learning for diagnostics and personalized medicine.",
    "Machine Learning: Efficient Deep Learning (TinyML), Reinforcement Learning, and NLP.",
    "Neurotechnology: Developing novel hardware and software for interfacing with the nervous system."
];

export const channelPosts: ChannelPostData[] = [
    {
        id: 1,
        forwardedFrom: 'Perplexity',
        author: 'Abhin Krishna',
        content: {
            type: 'about',
            text: `I am an Electronics and Biomedical Engineering student at Model Engineering College, Kochi, with a deep-seated interest in the convergence of Artificial Intelligence, Deep Learning, and Neuroscience. My work focuses on Brain-Computer Interfaces (BCI) and Neurotechnology, where I apply my skills to develop assistive technologies and enhance medical diagnostics. I am continuously strengthening my foundation in engineering mathematics and AI research methodologies while actively exploring EEG-based BCI systems for decoding neural signals. As an active member of technical communities, I thrive on collaboration and am dedicated to contributing to impactful applications in healthcare and human-machine interaction. 🧠`
        },
        timestamp: '05:53 PM'
    },
    {
        id: 2,
        forwardedFrom: 'Microsoft Copilot',
        author: 'Abhin Krishna',
        content: {
            type: 'education',
            degree: 'Bachelor of Technology - B.Tech, Electronics and Biomedical Engineering',
            college: 'Model Engineering College, Thrikkakara (KTU)',
            duration: 'September 2024 – Present'
        },
        timestamp: '05:54 PM'
    },
    {
        id: 3,
        forwardedFrom: 'LinkedIn',
        author: 'Abhin Krishna',
        content: {
            type: 'skills',
            skills: originalSkills
        },
        timestamp: '05:55 PM'
    },
    {
        id: 4,
        forwardedFrom: 'GitHub',
        author: 'Abhin Krishna',
        content: {
            type: 'projects',
            projects: originalProjects
        },
        timestamp: '05:58 PM'
    },
     {
        id: 5,
        forwardedFrom: 'Google Scholar',
        author: 'Abhin Krishna',
        content: {
            type: 'interests',
            interests: originalResearchInterests
        },
        timestamp: '06:01 PM'
    },
    {
        id: 6,
        forwardedFrom: 'Personal Blog',
        author: 'Abhin Krishna',
        content: {
            type: 'blog',
            posts: originalBlogPosts,
        },
        timestamp: '06:05 PM'
    }
];
