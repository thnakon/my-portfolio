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
                bucketList: {
                    title: "Bucket List",
                    desc: "Things to do at least once in my life"
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
            description: "I'm Thanakon, building high-performance digital products.",
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
            collaboration: {
                tag: "COLLABORATION",
                title: "Turning ideas into elegant web solutions",
            },
            techStack: {
                title: "Building with powerful",
                titleAccent: "frameworks",
            },
            remote: {
                tag: "REMOTE",
                location: "THAILAND",
                title: "Seamless collaboration across all time zones.",
            },
            cta: {
                title: "Ready to start your next",
                titleAccent: "digital journey?",
                subtitle: "Let's build something extraordinary.",
                email: "thnakon.d@gmail.com",
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
                    company: "Freelance",
                    duration: "2023 - Present",
                    description: "Developing scalable web applications and AI-integrated solutions for various clients.",
                    achievements: ["Architected Oboun ERP", "Developed Babybib Tool", "AI Agent Implementation"]
                },
                {
                    role: "Web Developer",
                    company: "Local Tech Firm",
                    duration: "2021 - 2023",
                    description: "Focused on frontend development and modernizing legacy web systems.",
                    achievements: ["Improved performance by 40%", "Migrated to Next.js", "Lead UI Redesign"]
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
            toolsTitle: "Handpicked for Professional Craftsmanship",
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
                bucketList: {
                    title: "รายการสิ่งที่อยากทำ",
                    desc: "สิ่งที่อยากทำให้ได้สักครั้งในชีวิต"
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
            description: "ผมธนากร ผู้สร้างสรรค์ผลิตภัณฑ์ดิจิทัลประสิทธิภาพสูง",
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
            collaboration: {
                tag: "การทำงานร่วมกัน",
                title: "เปลี่ยนไอเดียให้กลายเป็นเว็บที่สวยงาม",
            },
            techStack: {
                title: "สร้างสรรค์ด้วย",
                titleAccent: "เครื่องมือที่ทรงพลัง",
            },
            remote: {
                tag: "รีโมท",
                location: "ประเทศไทย",
                title: "ทำงานร่วมกันได้อย่างราบรื่นไร้พรมแดน",
            },
            cta: {
                title: "พร้อมเริ่ม",
                titleAccent: "การผจญภัยดิจิทัลหรือยัง?",
                subtitle: "มาสร้างสิ่งที่พิเศษกว่าใครไปพร้อมกัน",
                email: "thnakon.d@gmail.com",
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
            title: "ประสบการณ์",
            titleAccent: "ทำงาน",
            items: [
                {
                    role: "Full Stack Developer",
                    company: "Freelance",
                    duration: "2023 - ปัจจุบัน",
                    description: "พัฒนาเว็บแอปพลิเคชันที่รองรับการขยายตัวและโซลูชันที่รวม AI สำหรับลูกค้าที่หลากหลาย",
                    achievements: ["ออกแบบโครงสร้าง Oboun ERP", "พัฒนาเครื่องมือ Babybib", "การนำ AI Agent มาใช้งาน"]
                },
                {
                    role: "Web Developer",
                    company: "บริษัทเทคโนโลยีท้องถิ่น",
                    duration: "2021 - 2023",
                    description: "มุ่งเน้นการพัฒนา Frontend และการปรับปรุงระบบเว็บรุ่นเก่าให้ทันสมัย",
                    achievements: ["ปรับปรุงประสิทธิภาพขึ้น 40%", "ย้ายระบบไปยัง Next.js", "หัวหน้าทีมออกแบบ UI ใหม่"]
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
            toolsTitle: "คัดสรรเพื่อความประณีตระดับมืออาชีพ",
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
