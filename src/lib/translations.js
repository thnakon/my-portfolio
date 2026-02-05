// Translations for EN/TH bilingual support
const translations = {
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            work: "Work",
            blog: "Blog",
            more: "More",
            bookCall: "Book a Call",
            greetings: {
                morning: "Good Morning...",
                afternoon: "Good Afternoon...",
                evening: "Good Evening...",
                night: "Good Night...",
            },
            moreDropdown: {
                guestbook: {
                    title: "Guestbook",
                    desc: "Let me know you were here"
                },
                aiToolkit: {
                    title: "AI Toolkit",
                    desc: "Mastering the neural frontier"
                },
                links: {
                    title: "Links",
                    desc: "All my links are here"
                },
                uses: {
                    title: "Uses",
                    desc: "A peek into my digital..."
                },
                attribution: {
                    title: "Attribution",
                    desc: "Journey to create this site"
                }
            }
        },

        // Hero Section
        hero: {
            announcement: {
                tag: "Upcoming",
                message: "A new project is launching soon!"
            },
            headline: "Building innovative and",
            headlineAccent: "clean digital products",
            description: "I'm Thanakon, a developer building high-performance digital products.",
            cta: "Get in Touch",
            scrollDown: "Scroll Down",
        },

        // Overview Section
        overview: {
            tag: "OVERVIEW",
            title: "At a",
            titleAccent: "glance",
            description: "A brief overview of who I am, what I do, and the value I bring to every project.",
        },

        // Bento Grid
        bento: {
            intro: {
                title: "Digital Craftsmanship",
                desc: "Blending aesthetic precision with robust engineering to build the next generation of digital products.",
                expLabel: "Experience",
                projectLabel: "Projects",
                cta: "Get in Touch"
            },
            ai: {
                tag: "Neural Suite",
                title: "Modular Intelligence",
                desc: "Commanding and orchestrating advanced AI for rapid engineering.",
                units: {
                    logic: "Logic & Reasoning",
                    vision: "Multi-modal Vision",
                    creative: "Creative Context",
                    system: "System Control"
                }
            },
            collaboration: {
                tag: "COLLABORATION",
                title: "Turning ideas into elegant web solutions",
            },
            techStack: {
                title: "Specialized Tech Stack",
                titleAccent: "frameworks",
            },
            remote: {
                tag: "BASED IN",
                location: "THAILAND",
                title: "Flexible with all time zones",
            },
            cta: {
                title: "Let's work together",
                titleAccent: "digital journey?",
                subtitle: "Open for new projects.",
                email: "thnakon.d@gmail.com",
                copyLabel: "Click to copy contact"
            },
            performance: {
                title: "Engineered for Speed.",
                subtitle: "High-performance web architecture.",
            },
            currentWork: {
                tag: "THE INSIDE SCOOP",
                title: "Currently building a SaaS Application",
            },
        },

        // About Section
        about: {
            tag: "KNOW ABOUT ME",
            title: "About Me",
            subtitle: "Behind the code and complexity",
            highlight: "Crafting scalable architecture with a focus on user-centric experiences.",
            bio: "Hello, I'm Thanakon Dungkumwattanasiri, a Full Stack Web Developer based in Chiang Mai. I architect scalable systems using Laravel and Next.js to solve complex, real-world problems.\n\nI specialize in AI Integration and AI Agent orchestration. By professionally commanding advanced AI engines, I automate complex workflows and build intelligent digital experiences that go beyond traditional development.\n\nI empower businesses to grow and scale through cutting-edge technology and seamless user experiences.",
            age: "Age",
            location: "Location",
            email: "Email",
            experience: "Experience",
            availableFor: "Available For",
            availableStatus: "Professional Projects",
            hireMe: "Hire Me",
            workExperience: "Work Experience",
            chiangMai: "Chiang Mai, Thailand",
            years: "years old",
        },

        // Experience Section
        experience: {
            tag: "MY JOURNEY",
            title: "Career",
            titleAccent: "Path",
            items: [
                {
                    role: "Full Stack Developer",
                    company: "Chiang Mai University",
                    location: "Chiang Mai, Thailand",
                    workType: "Hybrid",
                    logo: "/images/logos/cmu-logo.png",
                    duration: "Oct 2025 - PRESENT",
                    description: "Leading complex end-to-end development projects and mastering advanced tech stacks. Focus on scalable architecture and automation.",
                    achievements: [
                        "<b>Oboun ERP</b>: Developed a full-scale Pharmacy Management System using <b>Docker</b>, <b>Laravel</b>, <b>Vue.js</b>, and <b>MySQL</b>.",
                        "<b>Babybib</b>: Built an automatic APA 7th bibliography generator with .docx export capabilities.",
                        "<b>ScribeHub</b>: Upgraded research tools into a comprehensive platform for academic research.",
                        "<b>Future Stack</b>: Mastering <b>Next.js</b>, <b>TypeScript</b>, and <b>Bun</b> for modern web applications.",
                        "<b>Mai-lon Vision</b>: Creating a platform for student success and career life balance."
                    ],
                    technologies: [
                        { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
                        { name: "Laravel", icon: "https://skillicons.dev/icons?i=laravel" },
                        { name: "Vue.js", icon: "https://skillicons.dev/icons?i=vue" },
                        { name: "Mysql", icon: "https://skillicons.dev/icons?i=mysql" },
                        { name: "React", icon: "https://skillicons.dev/icons?i=react" },
                        { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
                        { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
                        { name: "Supabase", icon: "https://skillicons.dev/icons?i=supabase" }
                    ]
                },
                {
                    role: "Full Stack Developer (Internship)",
                    company: "Merge Digital Agency",
                    location: "Ladprao, Bangkok",
                    workType: "On-site",
                    logo: "/images/logos/merge-logo.png",
                    duration: "April 2025 - Oct 2025",
                    description: "Full-service digital agency work spanning Web Production, Mobile Apps, and AI integration. Contributed to enterprise-level projects like <a href='https://singha.com/' target='_blank' rel='noopener noreferrer' class='text-[var(--text-primary)] font-bold border-b border-[var(--text-primary)]/20 hover:border-[var(--text-primary)] transition-all decoration-transparent'>singha.com</a>.",
                    achievements: [
                        "<b>Tech Stack</b>: Mastered <b>Laravel</b>, <b>Vue.js</b>, and <b>Tailwind CSS</b> for high-performance agency projects.",
                        "<b>Automated Testing</b>: Integrated <b>Cypress</b> for E2E testing to ensure zero-defect deployments.",
                        "<b>Dental CMS</b>: Developed a full-cycle clinic management system with customized CMS controls.",
                        "<b>AI Vision</b>: Implemented <b>Python YOLO</b> for automated product receipt information extraction.",
                        "<b>Enterprise Support</b>: Actively improved and maintained <a href='https://singha.com/' target='_blank' rel='noopener noreferrer' class='text-[var(--text-primary)] font-bold hover:underline'>singha.com</a> as part of the core dev team."
                    ],
                    technologies: [
                        { name: "Laravel", icon: "https://skillicons.dev/icons?i=laravel" },
                        { name: "Vue.js", icon: "https://skillicons.dev/icons?i=vue" },
                        { name: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
                        { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
                        { name: "GitLab", icon: "https://skillicons.dev/icons?i=gitlab" },
                        { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
                        { name: "Mysql", icon: "https://skillicons.dev/icons?i=mysql" }
                    ]
                },
                {
                    role: "Open Source Contributor",
                    company: "Github",
                    location: "Global",
                    workType: "Remote",
                    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
                    duration: "Apr 2024 - Mar 2025",
                    description: "Began the engineering journey by contributing to open-source projects and mastering core web foundations.",
                    achievements: [
                        "Foundation: Mastered HTML5, CSS3, and JavaScript fundamentals.",
                        "PHP & Python: Started exploring backend logic and automation scripts.",
                        "Collaboration: Engaged with developer communities on innovative solutions.",
                        "Quality Focus: Improved code quality and documentation for community projects."
                    ],
                    technologies: [
                        { name: "PHP", icon: "https://skillicons.dev/icons?i=php" },
                        { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
                        { name: "HTML5", icon: "https://skillicons.dev/icons?i=html" },
                        { name: "CSS3", icon: "https://skillicons.dev/icons?i=css" },
                        { name: "JS", icon: "https://skillicons.dev/icons?i=js" },
                        { name: "Bootstrap", icon: "https://skillicons.dev/icons?i=bootstrap" }
                    ]
                }
            ]
        },

        // Open Source Section
        openSource: {
            tag: "CONTRIBUTIONS",
            title: "Code &",
            titleAccent: "Open Source",
            viewProfile: "VIEW PROFILE",
            timeline: "Developer activity timeline",
            followers: "Followers",
            followersSubtitle: "Active Developers",
            repos: "Public Repos",
            reposSubtitle: "Open Source Repos",
            stars: "Total Stars",
            starsSubtitle: "Community Appreciation",
            less: "Less",
            more: "More",
            contributionTitle: "GitHub Contributions",
            items: [
                {
                    name: "thnakon",
                    project: "GitHub",
                }
            ]
        },

        // My Site Section
        mySite: {
            tag: "INSIDE THE BOX",
            title: "My Site",
            subtitle: "Curated with high-performance technologies for an optimal experience.",
            description: "Built with the latest cutting-edge technologies for maximum performance, SEO, and seamless user experience.",
            toolsTag: "WORKING TOOLS",
            toolsTitle: "Modern Tech-Stack for Seamless Experience",
            guestbookTag: "GUESTBOOK",
            guestbookTitle: "Leave a message for posterity",
            musicTag: "PLAYING NOW",
            musicTitle: "FaSHioN",
            musicArtist: "CORTIS",
            tech: [
                { name: "Next.js 15", icon: "nextjs" },
                { name: "React 19", icon: "react" },
                { name: "Tailwind v4", icon: "tailwindcss" },
                { name: "Laravel 11", icon: "laravel" },
                { name: "IDEs (AI Agents)", icon: "vscode" }
            ]
        },

        // Skills Section
        skills: {
            title: "My Skills",
            subtitle: "The Secret Sauce",
            frontend: "Frontend",
            backend: "Backend",
            database: "Database",
            tools: "Tools & Others",
        },

        // Portfolio Section Header
        portfolio: {
            sectionTitlePrefix: "Our",
            sectionTitleAccent: "Work",
            sectionSubtitle: "Explore projects crafted with intention and attention to every detail.",
        },

        // Projects Section
        projects: {
            title: "Featured Projects",
            subtitle: "Some of my recent work",
            viewProject: "View Project",
            viewCode: "View Code",
            comingSoon: "Coming Soon",
            projectDesc: "Project details will be added soon.",
            obounERP: {
                title: "Oboun ERP",
                period: "2025",
                description: "A comprehensive Enterprise Resource Planning system designed for SMEs. Streamlining operations across sales, inventory, and finance through high-performance automation.",
                type: "Enterprise ERP",
                features: [
                    "Developed with Laravel 11 and Vue.js 3, ensuring long-term maintainability.",
                    "Implemented complex logic for real-time multi-warehouse inventory sync.",
                    "Designed automated financial reporting with precise tax and ledger management.",
                    "Optimized MySQL database with advanced indexing for high-scale performance.",
                    "Integrated Role-Based Access Control (RBAC) for secure organizational data.",
                    "Engineered with a focus on high-performance automation and sleek UI."
                ]
            },
            babybib: {
                title: "Babybib",
                period: "2025",
                description: "Babybib is an advanced, automated bibliography generation system designed to streamline the academic citation process. Built around the APA 7th Edition standard, it empowers students and researchers to create accurate references.",
                type: "Academic Tool",
                features: [
                    "Architected a robust engine for automated APA 7th Edition citation standards.",
                    "Supports diverse sources including journals, books, and digital media.",
                    "Built with a responsive UI that prioritizes user productivity and rapid work.",
                    "Features real-time bibliography previews and instant validation logic.",
                    "Developed custom export modules for Word, PDF, and BibTeX formats.",
                    "Designed for seamless integration into the academic research lifecycle."
                ]
            },
            scribehub: {
                title: "ScribeHub",
                period: "2026",
                description: "ScribeHub is a premium, all-in-one platform for modern researchers. It seamlessly integrates reference management, collaborative tools, and advanced AI intelligence to streamline the entire research lifecycle.",
                type: "Research Ecosystem",
                features: [
                    "Leveraged OpenAI's GPT-4 to create an intelligent research paper assistant.",
                    "Engineered a collaborative environment with real-time updates for research teams.",
                    "Integrated a reference management system with automatic metadata extraction.",
                    "Developed an interactive knowledge graph for visual data discovery.",
                    "Focused on a premium user experience for seamless research interactions.",
                    "Built with Next.js and Supabase for real-time scalability and secure data."
                ]
            },
            mailon: {
                title: "Mai-lon",
                period: "2026",
                description: "A single platform that helps students \"study hard, succeed in their careers, and live a good life.\" Designed to empower student journeys from academic excellence to professional success.",
                type: "Education Platform",
                features: [
                    "Built with Next.js 14 App Router for optimal performance and SEO.",
                    "Integrated Supabase for secure authentication and real-time database.",
                    "Designed with shadcn/ui and Tailwind CSS for a premium user experience.",
                    "Implemented automated student support workflows and career tracking.",
                    "Scalable architecture designed for high-volume student engagement.",
                    "Features dedicated storage for academic resources and portfolio assets."
                ]
            },
            klin: {
                title: "Klin Dental Clinic",
                period: "2025",
                description: "A comprehensive dental clinic management and booking platform. Developed during an internship to streamline patient scheduling and clinic operations.",
                type: "Medical Platform (Internship)",
                features: [
                    "Engineered a seamless appointment booking system for patients and clinic staff.",
                    "Implemented a secure patient record management system using MySQL.",
                    "Designed a responsive and modern UI using Bootstrap and custom JavaScript.",
                    "Streamlined clinic workflows including service selection and schedule management.",
                    "Developed high-performance backend logic using the Laravel framework.",
                    "Integrated automated notification systems for booking confirmations."
                ]
            },
            singha: {
                title: "Singha.com",
                period: "2024",
                description: "Contribution to the development of the official Singha website during an internship. Focused on enhancing web performance and implementing new features.",
                type: "Enterprise Web (Internship)",
                features: [
                    "Collaborated in a professional development environment using Git and Sourcetree for version control.",
                    "Developed and maintained corporate web features using the Laravel framework.",
                    "Assisted in optimizing frontend assets and ensuring cross-browser compatibility.",
                    "Participated in professional code reviews and enterprise-level deployment workflows.",
                    "Contributed to the scalability and internationalization support of the platform.",
                    "Worked closely with a multidisciplinary team to deliver high-quality web solutions."
                ]
            },
            myPortfolio: {
                title: "My Portfolio",
                period: "2026",
                description: "A high-performance personal portfolio website built with a focus on premium aesthetics, narrative storytelling, and cutting-edge web technologies.",
                type: "Personal Portfolio",
                features: [
                    "Engineered with Next.js 14 and React for lightning-fast performance.",
                    "Implemented a custom narrative storytelling experience with smooth animations.",
                    "Designed a premium, responsive UI with multi-language support (EN/TH).",
                    "Optimized for SEO with semantic HTML and modern web standards.",
                    "Features a dynamic project timeline and interactive tool showcase.",
                    "Built with a focus on visual excellence and seamless user interactions."
                ]
            },
            seeMoreWork: "See more work"
        },

        // Contact Section
        contact: {
            tag: "FINAL CHAPTER",
            title: "Beyond the Code",
            subtitle: "Thank you for exploring my journey. I'm ready to bring this same passion and precision to our next collaboration. Let's build something extraordinary together.",
            nameLabel: "Your Name",
            namePlaceholder: "John Doe",
            emailLabel: "Your Email",
            emailPlaceholder: "john@example.com",
            subjectLabel: "Subject",
            subjectPlaceholder: "Project Inquiry",
            messageLabel: "Message",
            messagePlaceholder: "Tell me about your project...",
            send: "Send Message",
            sending: "Sending...",
            success: "Message sent successfully! I'll get back to you soon.",
            error: "Something went wrong. Please try again.",
            orReachMe: "Or reach me directly",
        },

        // Booking Modal
        booking: {
            title: "Book a Call",
            subtitle: "Schedule a free consultation",
            dateLabel: "Preferred Date",
            timeLabel: "Preferred Time",
            book: "Book Now",
            booking: "Booking...",
            success: "Booking confirmed! I'll send you a confirmation email.",
        },
        contactModal: {
            title: "Get in touch",
            book: {
                title: "Book a Call",
                desc: "Schedule a 30-min chat"
            },
            email: {
                title: "Email Me",
                desc: "thnakon.d@gmail.com"
            },
            message: {
                title: "Or write me a message here",
                action: "Tap to open"
            },
            socials: "CONNECT ON SOCIALS",
            form: {
                title: "Send a message",
                back: "Back to options",
                name: "Name",
                namePlaceholder: "Jane Doe",
                email: "Email",
                emailPlaceholder: "jane@example.com",
                message: "Message",
                messagePlaceholder: "How can I help you?",
                submit: "Send Message",
                sending: "Sending...",
                success: "Message sent successfully!",
                error: "Failed to send. Please try again.",
                thankYouTitle: "Thank you!",
                thankYouMessage: "Your message has been sent. I'll reply to your email soon."
            }
        },

        // Footer
        footer: {
            tagline: "Building scalable systems and intelligent digital experiences with passion and precision.",
            copyright: "© 2026 Thanakon D. All rights reserved.",
            madeWith: "Made with",
            inThailand: "in Thailand",
            linksTitle: "Links",
            legalTitle: "Legal",
            socialTitle: "Social",
            privacy: "Privacy Policy",
            terms: "Terms of Service"
        },
    },

    th: {
        // Navigation
        nav: {
            home: "หน้าแรก",
            about: "เกี่ยวกับ",
            work: "ผลงาน",
            blog: "บล็อก",
            more: "เพิ่มเติม",
            bookCall: "นัดคุย",
            greetings: {
                morning: "สวัสดีตอนเช้า...",
                afternoon: "สวัสดีตอนบ่าย...",
                evening: "สวัสดีตอนเย็น...",
                night: "ราตรีสวัสดิ์...",
            },
            moreDropdown: {
                guestbook: {
                    title: "สมุดเยี่ยม",
                    desc: "เขียนข้อความทักทายกันได้ที่นี่"
                },
                aiToolkit: {
                    title: "AI Toolkit",
                    desc: "ทักษะการใช้ Ai ต่างๆ"
                },
                links: {
                    title: "ลิงก์ต่างๆ",
                    desc: "รวมลิงก์ทั้งหมดของผม"
                },
                uses: {
                    title: "อุปกรณ์ที่ใช้",
                    desc: "แอบดูเครื่องมือและซอฟต์แวร์ที่ผมใช้"
                },
                attribution: {
                    title: "ที่มา",
                    desc: "บันทึกการสร้างเว็บไซต์นี้"
                }
            }
        },

        // Hero Section
        hero: {
            announcement: {
                tag: "เร็วๆ นี้",
                message: "โปรเจกต์ใหม่กำลังจะเปิดตัว!"
            },
            headline: "สร้างสรรค์ผลิตภัณฑ์ดิจิทัล",
            headlineAccent: "ที่ทันสมัยและเรียบง่าย",
            description: "ผมธนากร นักพัฒนาผู้สร้างสรรค์ผลิตภัณฑ์ดิจิทัลประสิทธิภาพสูง",
            cta: "ติดต่อผม",
            scrollDown: "เลื่อนลง",
        },

        // Overview Section
        overview: {
            tag: "ภาพรวม",
            title: "ทำความรู้จัก",
            titleAccent: "ผมสักหน่อย",
            description: "ภาพรวมสั้นๆ เกี่ยวกับตัวผม สิ่งที่ผมทำ และคุณค่าที่ผมมอบให้กับทุกโปรเจกต์",
        },

        // Bento Grid
        bento: {
            intro: {
                title: "ความประณีตทางดิจิทัล",
                desc: "ผสมผสานความแม่นยำด้านสุนทรียวิทยากับวิศวกรรมที่แข็งแกร่ง เพื่อสร้างผลิตภัณฑ์ดิจิทัลยุคใหม่",
                expLabel: "ประสบการณ์",
                projectLabel: "โปรเจกต์",
                cta: "พูดคุยกับผม"
            },
            ai: {
                tag: "ห้องประมวลผล",
                title: "ปัญญาประดิษฐ์อัจฉริยะ",
                desc: "การสั่งการและจัดการ AI ขั้นสูง เพื่อการพัฒนาซอฟต์แวร์ที่รวดเร็ว",
                units: {
                    logic: "ตรรกะและเหตุผล",
                    vision: "การประมวลผลภาพ",
                    creative: "ความคิดสร้างสรรค์",
                    system: "การควบคุมระบบ"
                }
            },
            collaboration: {
                tag: "การทำงานร่วมกัน",
                title: "เปลี่ยนไอเดียให้กลายเป็นเว็บที่สวยงาม",
            },
            techStack: {
                title: "เทคโนโลยีที่เชี่ยวชาญ",
                titleAccent: "เครื่องมือที่ทรงพลัง",
            },
            remote: {
                tag: "ที่อยู่ปัจจุบัน",
                location: "ประเทศไทย",
                title: "พร้อมทำงานในทุกเขตเวลา",
            },
            cta: {
                title: "มาทำงานร่วมกัน",
                titleAccent: "การผจญภัยดิจิทัลหรือยัง?",
                subtitle: "เปิดรับสำหรับโปรเจกต์ใหม่ๆ",
                email: "thnakon.d@gmail.com",
                copyLabel: "คลิกเพื่อคัดลอกรายชื่อติดต่อ"
            },
            performance: {
                title: "วิศวกรรมเพื่อความเร็ว",
                subtitle: "สถาปัตยกรรมเว็บประสิทธิภาพสูง",
            },
            currentWork: {
                tag: "กำลังทำอยู่",
                title: "กำลังสร้าง SaaS Application อยู่ครับ",
            },
        },

        // About Section
        about: {
            tag: "KNOW ABOUT ME",
            title: "เกี่ยวกับผม",
            subtitle: "เบื้องหลังความทุ่มเทและการแก้ปัญหา",
            highlight: "สร้างสรรค์โครงสร้างระบบที่ขยายตัวได้ โดยมุ่งเน้นประสบการณ์ของผู้ใช้เป็นสำคัญ",
            bio: "สวัสดีครับ ผมธนากร ดวงคำวัฒนสิริ Full Stack Web Developer ที่เชียงใหม่ ผมออกแบบระบบที่เน้นความเชื่อถือได้และการขยายตัว (Scalability) ผ่านเทคโนโลยีอย่าง Laravel และ Next.js เพื่อแก้ปัญหาจริงในโลกธุรกิจ\n\nผมเชี่ยวชาญด้าน AI Integration และการสั่งการ AI Agents ระดับมืออาชีพ เพื่อเพิ่มประสิทธิภาพการพัฒนาระบบ และสร้างฟีเจอร์อัจฉริยะที่ช่วยยกระดับประสบการณ์ผู้ใช้งานให้ก้าวล้ำไปอีกขั้น\n\nผมพร้อมช่วยให้คุณเติบโตอย่างมั่นคงด้วยเทคโนโลยีที่ทันสมัยที่สุดครับ",
            age: "อายุ",
            location: "ที่อยู่",
            email: "อีเมล",
            experience: "ประสบการณ์",
            availableFor: "พร้อมสำหรับ",
            availableStatus: "โปรเจกต์ระดับมืออาชีพ",
            hireMe: "จ้างงานผม",
            workExperience: "ประสบการณ์ทำงาน",
            chiangMai: "เชียงใหม่, ประเทศไทย",
            years: "ปี",
        },

        // Experience Section
        experience: {
            tag: "เส้นทางของผม",
            title: "Career",
            titleAccent: "Path",
            items: [
                {
                    role: "Full Stack Developer",
                    company: "มหาวิทยาลัยเชียงใหม่",
                    location: "เชียงใหม่, ประเทศไทย",
                    workType: "Hybrid",
                    logo: "/images/logos/cmu-logo.png",
                    duration: "ต.ค. 2025 - ปัจจุบัน",
                    description: "เน้นการพัฒนาโปรเจกต์ขนาดใหญ่ที่ซับซ้อนและฝึกฝน Techstack สมัยใหม่เพื่อประสิทธิภาพสูงสุด",
                    achievements: [
                        "<b>Oboun ERP</b>: โปรแกรมจัดการร้านยาครบวงจรด้วย <b>Docker</b>, <b>Laravel</b>, <b>Vue.js</b> และ <b>MySQL</b>",
                        "<b>Babybib</b>: ระบบสร้างบรรณานุกรมอัตโนมัติ APA 7th พร้อมส่งออกเป็นไฟล์ .docx",
                        "<b>ScribeHub</b>: อัปเกรดเครื่องมือวิจัยให้เป็นแพลตฟอร์มที่ครบวงจรที่สุด",
                        "<b>Future Stack</b>: เชี่ยวชาญ <b>Next.js</b>, <b>TypeScript</b> และ <b>Bun</b> สำหรับเว็บแอปพลิเคชันรุ่นใหม่",
                        "<b>Mai-lon Vision</b>: แพลตฟอร์มเพื่อช่วยให้นักศึกษาประสบความสำเร็จในอาชีพและชีวิต"
                    ],
                    technologies: [
                        { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
                        { name: "Laravel", icon: "https://skillicons.dev/icons?i=laravel" },
                        { name: "Vue.js", icon: "https://skillicons.dev/icons?i=vue" },
                        { name: "Mysql", icon: "https://skillicons.dev/icons?i=mysql" },
                        { name: "React", icon: "https://skillicons.dev/icons?i=react" },
                        { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
                        { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
                        { name: "Supabase", icon: "https://skillicons.dev/icons?i=supabase" }
                    ]
                },
                {
                    role: "Full Stack Developer (ฝึกงาน)",
                    company: "Merge Digital Agency",
                    location: "ลาดพร้าว, กรุงเทพฯ",
                    workType: "On-site",
                    logo: "/images/logos/merge-logo.png",
                    duration: "เม.ย. 2025 - ต.ค. 2025",
                    description: "บริษัท Digital Agency ชั้นนำที่ให้บริการพัฒนาสื่อดิจิทัลครบวงจร ทั้ง Web Production, Mobile Apps และงาน AI Programming ร่วมเป็นส่วนหนึ่งในการพัฒนา <a href='https://singha.com/' target='_blank' rel='noopener noreferrer' class='text-[var(--text-primary)] font-bold border-b border-[var(--text-primary)]/20 hover:border-[var(--text-primary)] transition-all'>singha.com</a>",
                    achievements: [
                        "<b>Laravel & Tools</b>: เชี่ยวชาญ <b>Laravel</b> ที่เป็นแกนหลัก พร้อม <b>Cypress</b> สำหรับการทดสอบอัตโนมัติ",
                        "<b>Dental CMS</b>: พัฒนาระบบเว็บคลินิกทำฟันและ CMS ควบคุมระบบหลังบ้านทั้งหมด",
                        "<b>AI Vision</b>: พัฒนาระบบตรวจจับใบเสร็จสินค้าอัตโนมัติด้วย <b>Python YOLO</b>",
                        "<b>Real Experience</b>: ร่วมเป็นหนึ่งในทีมพัฒนาและปรับปรุงเว็บไซต์ <a href='https://singha.com/' target='_blank' rel='noopener noreferrer' class='text-[var(--text-primary)] font-bold hover:underline'>singha.com</a>",
                        "<b>Soft Skills</b>: เติบโตจากการทำงานทีมแบบ Agile และการแก้ปัญหาที่ซับซ้อน"
                    ],
                    technologies: [
                        { name: "Laravel", icon: "https://skillicons.dev/icons?i=laravel" },
                        { name: "Vue.js", icon: "https://skillicons.dev/icons?i=vue" },
                        { name: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
                        { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
                        { name: "GitLab", icon: "https://skillicons.dev/icons?i=gitlab" },
                        { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
                        { name: "Mysql", icon: "https://skillicons.dev/icons?i=mysql" }
                    ]
                },
                {
                    role: "Open Source Contributor",
                    company: "Github",
                    location: "Global",
                    workType: "Remote",
                    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
                    duration: "เม.ย. 2024 - มี.ค. 2025",
                    description: "เริ่มต้นเส้นทางสายวิศวกรรมซอฟต์แวร์ด้วยการร่วมพัฒนาโปรเจกต์โอเพนซอร์สและการวางรากฐานเว็บที่แข็งแกร่ง",
                    achievements: [
                        "Core Foundation: พัฒนาพื้นฐาน HTML5, CSS3 และ JavaScript",
                        "PHP & Python: เริ่มต้นการเขียน PHP และ Python สำหรับงาน Backend",
                        "Community Engagement: ร่วมมือกับทีมนักพัฒนาในการแก้ไขปัญหาและสร้างสรรค์ฟีเจอร์ใหม่",
                        "Quality Focus: ปรับปรุงคุณภาพโค้ดและเอกสารให้มีความเป็นสากล"
                    ],
                    technologies: [
                        { name: "PHP", icon: "https://skillicons.dev/icons?i=php" },
                        { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
                        { name: "HTML5", icon: "https://skillicons.dev/icons?i=html" },
                        { name: "CSS3", icon: "https://skillicons.dev/icons?i=css" },
                        { name: "JS", icon: "https://skillicons.dev/icons?i=js" },
                        { name: "Bootstrap", icon: "https://skillicons.dev/icons?i=bootstrap" }
                    ]
                }
            ]
        },

        // Open Source Section
        openSource: {
            tag: "CONTRIBUTIONS",
            title: "โค้ดและ",
            titleAccent: "โอเพนซอร์ส",
            viewProfile: "ดูโปรไฟล์",
            timeline: "ไทม์ไลน์กิจกรรมการเขียนโค้ด",
            followers: "ผู้ติดตาม",
            followersSubtitle: "นักพัฒนาที่ติดตาม",
            repos: "โปรเจกต์สาธารณะ",
            reposSubtitle: "Repository โอเพนซอร์ส",
            stars: "ดาวทั้งหมด",
            starsSubtitle: "การยอมรับจากชุมชน",
            less: "น้อย",
            more: "มาก",
            contributionTitle: "กิจกรรมบน GitHub",
            items: [
                {
                    name: "thnakon",
                    project: "GitHub",
                }
            ]
        },

        // Skills Section
        skills: {
            title: "ทักษะของผม",
            subtitle: "The Secret Sauce",
            frontend: "Frontend",
            backend: "Backend",
            database: "ฐานข้อมูล",
            tools: "เครื่องมือ",
        },

        // Portfolio Section Header
        portfolio: {
            sectionTitlePrefix: "ผลงาน",
            sectionTitleAccent: "ของเรา",
            sectionSubtitle: "สำรวจโปรเจกต์ที่สร้างสรรค์ด้วยความตั้งใจและความใส่ใจในทุกรายละเอียด",
        },

        // Projects Section
        projects: {
            title: "ผลงานที่น่าสนใจ",
            subtitle: "ผลงานล่าสุดบางส่วนของผม",
            viewProject: "ดูผลงาน",
            viewCode: "ดูโค้ด",
            comingSoon: "เร็วๆ นี้",
            obounERP: {
                title: "Oboun ERP",
                period: "2568",
                description: "ระบบวางแผนทรัพยากรองค์กรที่ครอบคลุมสำหรับ SME ปรับปรุงการดำเนินงานในด้านการขาย สินค้าคงคลัง และการเงิน ผ่านการทำงานอัตโนมัติที่มีประสิทธิภาพสูง",
                type: "ระดับเอ็นเตอร์ไพรส์",
                features: [
                    "พัฒนาด้วย Laravel 11 และ Vue.js 3 เพื่อความเสถียรและการบำรุงรักษาระยะยาว",
                    "พัฒนาระบบซิงค์สต็อกสินค้าข้ามคลังแบบเรียลไทม์ด้วยตรรกะที่ซับซ้อน",
                    "ออกแบบรายงานทางการเงินอัตโนมัติพร้อมระบบจัดการภาษีและบัญชีแยกประเภท",
                    "เพิ่มประสิทธิภาพฐานข้อมูล MySQL ด้วยการทำ Indexing ขั้นสูงเพื่อรองรับงานขนาดใหญ่",
                    "รวมระบบควบคุมการเข้าถึงตามบทบาท (RBAC) เพื่อความปลอดภัยของข้อมูลองค์กร",
                    "ออกแบบโดยเน้นความเป็นอัตโนมัติประสิทธิภาพสูงและส่วนติดต่อผู้ใช้ที่ทันสมัย"
                ]
            },
            babybib: {
                title: "Babybib",
                period: "2568",
                description: "ระบบสร้างบรรณานุกรมอัตโนมัติขั้นสูงที่ช่วยลดความยุ่งยากในงานวิชาการ พัฒนาขึ้นตามมาตรฐาน APA ฉบับที่ 7 เพื่อช่วยให้นักศึกษาและนักวิจัยสร้างการอ้างอิงที่ถูกต้องแม่นยำ",
                type: "เครื่องมือวิชาการ",
                features: [
                    "วางโครงสร้างระบบที่มีความยืดหยุ่นสูงสำหรับมาตรฐานการอ้างอิง APA ฉบับที่ 7",
                    "รองรับแหล่งข้อมูลที่หลากหลายทั้งวารสาร หนังสือ และสื่อดิจิทัลต่างๆ",
                    "สร้างด้วย UI ที่รองรับการแสดงผลทุกหน้าจอและเน้นความรวดเร็วในการทำงาน",
                    "มีระบบแสดงตัวอย่างบรรณานุกรมแบบเรียลไทม์และการตรวจสอบความถูกต้องทันที",
                    "พัฒนาโมดูลส่งออกข้อมูลที่กำหนดเองได้ทั้งรูปแบบ Word, PDF และ BibTeX",
                    "ออกแบบมาเพื่อผสานเข้ากับวงจรการวิจัยทางวิชาการได้อย่างไร้รอยต่อ"
                ]
            },
            scribehub: {
                title: "ScribeHub",
                period: "2569",
                description: "แพลตฟอร์มวิจัยระดับพรีเมียมแบบครบวงจรที่รวบรวมการจัดการอ้างอิง เครื่องมือทำงานร่วมกัน และ AI ขั้นสูง เพื่อช่วยให้นักวิจัยทำงานได้อย่างเป็นระบบ",
                type: "ระบบนิเวศงานวิจัย",
                features: [
                    "ใช้ GPT-4 ของ OpenAI เพื่อสร้างผู้ช่วยวิจัยอัจฉริยะสำหรับการวิเคราะห์บทความ",
                    "วางระบบพื้นที่ทำงานร่วมกันพร้อมการอัปเดตแบบเรียลไทม์สำหรับทีมวิจัย",
                    "รวมระบบจัดการการอ้างอิงพร้อมการดึงข้อมูลเมตาจากบทความโดยอัตโนมัติ",
                    "พัฒนากราฟความรู้เชิงโต้ตอบเพื่อการค้นพบข้อมูลและความเกี่ยวโยงในเชิงภาพ",
                    "เน้นประสบการณ์ผู้ใช้ระดับพรีเมียมเพื่อการตอบโต้ในงานวิจัยที่ราบรื่น",
                    "พัฒนาด้วย Next.js และ Supabase เพื่อการขยายตัวและระบบข้อมูลที่รัดกุม"
                ]
            },
            mailon: {
                title: "Mai-lon",
                period: "2569",
                description: "แพลตฟอร์มที่ช่วยให้นักศึกษา \"เรียนให้เต็มที่ ประสบความสำเร็จในอาชีพ และมีชีวิตที่ดี\" ออกแบบมาเพื่อส่งเสริมนักศึกษาตั้งแต่การเรียนจนถึงความสำเร็จในอาชีพการงาน",
                type: "แพลตฟอร์มการศึกษา",
                features: [
                    "พัฒนาด้วย Next.js 14 App Router เพื่อประสิทธิภาพสูงสุดและการทำ SEO",
                    "ใช้งาน Supabase สำหรับระบบสมาชิกและความปลอดภัยของข้อมูลแบบเรียลไทม์",
                    "ออกแบบด้วย shadcn/ui และ Tailwind CSS เพื่อประสบการณ์ใช้งานที่พรีเมียม",
                    "ระบบสนับสนุนนักศึกษาและการติดตามความก้าวหน้าในอาชีพแบบอัตโนมัติ",
                    "โครงสร้างระบบที่รองรับการใช้งานจำนวนมากได้อย่างเสถียร",
                    "จัดการทรัพยากรการเรียนและพอร์ตโฟลิโอผ่านระบบจัดการไฟล์อัจฉริยะ"
                ]
            },
            klin: {
                title: "Klin Dental Clinic",
                period: "2568",
                description: "แพลตฟอร์มจัดการและจองคิวออนไลน์สำหรับคลินิกทันตกรรม พัฒนาขึ้นในช่วงการฝึกงานเพื่อช่วยให้กระบวนการนัดหมายและการดำเนินงานในคลินิกเป็นไปอย่างราบรื่น",
                type: "แพลตฟอร์มการแพทย์ (ฝึกงาน)",
                features: [
                    "ออกแบบและพัฒนาระบบการจองนัดหมายที่ใช้งานง่ายสำหรับคนไข้และเจ้าหน้าที่",
                    "พัฒนาระบบจัดการทะเบียนประวัติคนไข้ที่ปลอดภัยด้วย MySQL",
                    "สร้างหน้าจอผู้ใช้งานที่ทันสมัยและรองรับทุกอุปกรณ์ด้วย Bootstrap และ JavaScript",
                    "ปรับปรุงเวิร์กโฟลว์ของคลินิกให้มีประสิทธิภาพ ทั้งการเลือกบริการและจัดการตารางเวลา",
                    "เขียนระบบหลังบ้านที่มีประสิทธิภาพสูงด้วยเฟรมเวิร์ก Laravel",
                    "ผสานระบบแจ้งเตือนอัตโนมัติสำหรับการยืนยันการจอง"
                ]
            },
            singha: {
                title: "Singha.com",
                period: "2567",
                description: "มีส่วนร่วมในการพัฒนาเว็บไซต์อย่างเป็นทางการของ Singha ในช่วงการฝึกงาน โดยมุ่งเน้นที่การเพิ่มประสิทธิภาพของเว็บและการพัฒนาฟีเจอร์ใหม่ๆ",
                type: "เว็บไซต์องค์กร (ฝึกงาน)",
                features: [
                    "ทำงานร่วมกันในสภาพแวดล้อมการพัฒนาระดับมืออาชีพโดยใช้ Git และ Sourcetree",
                    "พัฒนาและดูแลฟีเจอร์ต่างๆ ของเว็บไซต์องค์กรด้วย Laravel",
                    "มีส่วนช่วยในการปรับปรุงประสิทธิภาพส่วนหน้า (Frontend Optimization)",
                    "เข้าร่วมการตรวจสอบโค้ด (Code Review) และขั้นตอนการปรับใช้ระบบระดับองค์กร",
                    "ช่วยในการขยายขีดความสามารถและระบบรองรับหลายภาษาของแพลตฟอร์ม",
                    "ทำงานร่วมกับทีมผู้เชี่ยวชาญจากหลายสายงานเพื่อส่งมอบคุณภาพระดับพรีเมียม"
                ]
            },
            myPortfolio: {
                title: "My Portfolio",
                period: "2569",
                description: "เว็บไซต์พอร์ตโฟลิโอส่วนตัวประสิทธิภาพสูง ที่สร้างขึ้นโดยเน้นสุนทรียภาพระดับพรีเมียม การเล่าเรื่องราวผ่านดีไซน์ และเทคโนโลยีเว็บที่ทันสมัยที่สุด",
                type: "พอร์ตโฟลิโอส่วนตัว",
                features: [
                    "ออกแบบด้วย Next.js 14 และ React เพื่อประสิทธิภาพที่รวดเร็วที่สุด",
                    "ระบบเล่าเรื่องแบบ Narrative Storytelling พร้อมอนิเมชั่นที่นุ่มนวล",
                    "ดีไซน์อินเทอร์เฟซระดับพรีเมียม รองรับทั้งภาษาไทยและอังกฤษ",
                    "ปรับแต่ง SEO ให้ติดอันดับการค้นหาด้วยมาตรฐานเว็บสมัยใหม่",
                    "รวบรวมผลงานในรูปแบบ Timeline และคลังเครื่องมือที่ชัดเจน",
                    "เน้นความสวยงามทางสายตาและการโต้ตอบที่ลื่นไหลไร้รอยต่อ"
                ]
            },
            projectDesc: "รายละเอียดโปรเจคจะเพิ่มเร็วๆ นี้",
            seeMoreWork: "ดูผลงานเพิ่มเติม"
        },

        // My Site Section
        mySite: {
            tag: "เทคโนโลยีที่คุณเห็นอยู่",
            title: "เว็บไซต์นี้",
            subtitle: "คัดสรรเทคโนโลยีสมรรถนะสูง เพื่อประสบการณ์ใช้งานที่ยอดเยี่ยมที่สุด",
            description: "สร้างด้วยเทคโนโลยีล่าสุดที่เป็นระดับ Cutting-edge เพื่อประสิทธิภาพสูงสุด, SEO ที่ยอดเยี่ยม และประสบการณ์การใช้งานที่ราบรื่น",
            toolsTag: "เครื่องมือที่ใช้",
            toolsTitle: "เทคโนโลยีที่ทันสมัย เพื่อประสบการณ์ที่ราบรื่น",
            guestbookTag: "สมุดเยี่ยม",
            guestbookTitle: "เขียนข้อความทิ้งไว้เป็นที่ระลึกได้นะครับ",
            musicTag: "กำลังเล่น",
            musicTitle: "FaSHioN",
            musicArtist: "CORTIS",
            tech: [
                { name: "Next.js 15", icon: "nextjs" },
                { name: "React 19", icon: "react" },
                { name: "Tailwind v4", icon: "tailwindcss" },
                { name: "Laravel 11", icon: "laravel" },
                { name: "IDEs (AI Agents)", icon: "vscode" }
            ]
        },

        // Contact Section
        contact: {
            tag: "บทส่งท้าย",
            title: "เบื้องหลังความสำเร็จ",
            subtitle: "ขอบคุณที่ร่วมเดินทางมาถึงจุดนี้ ผมพร้อมแล้วที่จะนำความมุ่งมั่นและความแม่นยำเหล่านี้ ไปสร้างสรรค์ผลงานที่ยอดเยี่ยมร่วมกับคุณ มาสร้างสิ่งที่พิเศษด้วยกันนะครับ",
            nameLabel: "ชื่อของคุณ",
            namePlaceholder: "สมชาย ใจดี",
            emailLabel: "อีเมลของคุณ",
            emailPlaceholder: "somchai@example.com",
            subjectLabel: "หัวข้อ",
            subjectPlaceholder: "สอบถามเรื่องโปรเจค",
            messageLabel: "ข้อความ",
            messagePlaceholder: "เล่าให้ผมฟังเกี่ยวกับโปรเจคของคุณ...",
            send: "ส่งข้อความ",
            sending: "กำลังส่ง...",
            success: "ส่งข้อความสำเร็จ! ผมจะติดต่อกลับเร็วๆ นี้ครับ",
            error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
            orReachMe: "หรือติดต่อผมโดยตรง",
        },

        // Booking Modal
        booking: {
            title: "นัดคุย",
            subtitle: "นัดหมายเพื่อปรึกษาฟรี",
            dateLabel: "วันที่ต้องการ",
            timeLabel: "เวลาที่ต้องการ",
            book: "จองเลย",
            booking: "กำลังจอง...",
            success: "จองสำเร็จ! ผมจะส่งอีเมลยืนยันให้ครับ",
        },
        contactModal: {
            title: "ติดต่อสอบถาม",
            book: {
                title: "นัดคุยย่อย",
                desc: "นัดหมายล่วงหน้า 30 นาที"
            },
            email: {
                title: "ส่งอีเมล",
                desc: "thnakon.d@gmail.com"
            },
            message: {
                title: "หรือส่งข้อความถึงผมที่นี่",
                action: "คลิกเพื่อเปิด"
            },
            socials: "ช่องทางโซเชียล",
            form: {
                title: "ส่งข้อความ",
                back: "กลับไปหน้าตัวเลือก",
                name: "ชื่อ",
                namePlaceholder: "สมชาย ใจดี",
                email: "อีเมล",
                emailPlaceholder: "somchai@example.com",
                message: "ข้อความ",
                messagePlaceholder: "มีอะไรให้ช่วยครับ?",
                submit: "ส่งข้อความ",
                sending: "กำลังส่ง...",
                success: "ส่งข้อความสำเร็จ!",
                error: "ส่งไม่สำเร็จ กรุณาลองใหม่",
                thankYouTitle: "ขอบคุณครับ!",
                thankYouMessage: "ข้อความของคุณถูกส่งเรียบร้อยแล้ว ผมจะตอบกลับทางอีเมลโดยเร็วครับ"
            }
        },

        // Footer
        footer: {
            tagline: "สร้างสรรค์ระบบที่รองรับการเติบโต และประสบการณ์ดิจิทัลที่ชาญฉลาด ด้วยความมุ่งมั่นและความประณีต",
            copyright: "© 2026 Thanakon D. สงวนลิขสิทธิ์ทั้งหมด",
            madeWith: "สร้างด้วย",
            inThailand: "ในเชียงใหม่, ประเทศไทย",
            linksTitle: "ลิงก์หลัก",
            legalTitle: "กฎหมาย",
            socialTitle: "โซเชียล",
            privacy: "นโยบายความเป็นส่วนตัว",
            terms: "ข้อกำหนดการใช้งาน"
        },
    },
};

export default translations;
