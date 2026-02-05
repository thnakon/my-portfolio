import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

// Blog posts data
const blogPosts = {
    'my-2025-stack-as-a-frontend-developer': {
        date: 'FEB 05, 2026',
        readTime: 5,
        image: '/images/blog/stack-2026.png',
        title: {
            en: 'My 2026 Stack as a Frontend Developer',
            th: 'Stack ที่ฉันใช้ในฐานะ Frontend Developer ปี 2026'
        },
        tags: ['next.js', 'react', 'tools', 'productivity'],
        content: {
            en: `
## Introduction

As a Frontend Developer in 2026, I've spent countless hours refining my development environment. The right tools don't just make you faster—they transform how you think about code. Here's my current stack that keeps me productive and happy.

## Editor & Terminal

### VS Code + Cursor AI

I've been using **VS Code** for years, but recently switched to **Cursor** — an AI-powered fork that's changed my workflow completely. The inline AI suggestions are incredibly accurate, and the ability to chat with your codebase is a game-changer.

**Essential Extensions:**
- \`ESLint\` - Code quality enforcement
- \`Prettier\` - Consistent formatting
- \`GitLens\` - Git superpowers
- \`Error Lens\` - Inline error display
- \`Thunder Client\` - API testing

### Terminal: Warp

After years with iTerm2, I switched to **Warp**. The AI command suggestions, blocks-based history, and modern UI make terminal work much more pleasant.

## Framework & Libraries

### Next.js 15

Next.js remains my go-to framework. The App Router is now mature, Server Components are powerful, and the developer experience is unmatched.

\`\`\`jsx
// app/page.tsx - Clean and simple
export default async function Home() {
  const data = await fetchData();
  return <Dashboard data={data} />;
}
\`\`\`

### Styling: Tailwind CSS + CSS Variables

I use **Tailwind CSS** with a custom theme system based on CSS variables. This gives me the flexibility to implement dark mode and theme switching effortlessly.

### State Management: Zustand

For client-side state, **Zustand** is my choice. It's minimal, TypeScript-friendly, and doesn't require complex boilerplate.

## Development Workflow

### Package Manager: pnpm

**pnpm** is faster and more disk-efficient than npm or yarn. The strict node_modules structure also catches dependency issues early.

### Version Control: Git + GitHub

I use **conventional commits** with clear prefixes:
- \`feat:\` New features
- \`fix:\` Bug fixes
- \`refactor:\` Code improvements
- \`docs:\` Documentation

## Conclusion

Your stack should serve you, not the other way around. These tools have evolved with me over years of iteration. The key is finding what makes *you* productive and sticking with it long enough to build mastery.

What's your stack look like? Let me know on Twitter!
            `,
            th: `
## บทนำ

ในฐานะ Frontend Developer ในปี 2026 ผมใช้เวลานับไม่ถ้วนในการปรับแต่งสภาพแวดล้อมการพัฒนา เครื่องมือที่ถูกต้องไม่เพียงแค่ทำให้คุณเร็วขึ้น—มันเปลี่ยนวิธีที่คุณคิดเกี่ยวกับโค้ด นี่คือ Stack ปัจจุบันของผมที่ทำให้ผมทำงานได้อย่างมีประสิทธิภาพและมีความสุข

## Editor & Terminal

### VS Code + Cursor AI

ผมใช้ **VS Code** มาหลายปี แต่เพิ่งเปลี่ยนมาใช้ **Cursor** — fork ที่ขับเคลื่อนด้วย AI ที่เปลี่ยน workflow ของผมไปอย่างสิ้นเชิง ข้อแนะนำ AI แบบ inline นั้นแม่นยำมาก และความสามารถในการ chat กับ codebase นั้นเป็นตัวเปลี่ยนเกม

**Extension ที่จำเป็น:**
- \`ESLint\` - บังคับใช้คุณภาพโค้ด
- \`Prettier\` - การจัดรูปแบบที่สม่ำเสมอ
- \`GitLens\` - พลังพิเศษของ Git
- \`Error Lens\` - แสดงข้อผิดพลาดแบบ inline
- \`Thunder Client\` - ทดสอบ API

### Terminal: Warp

หลังจากใช้ iTerm2 มาหลายปี ผมเปลี่ยนมาใช้ **Warp** คำแนะนำคำสั่ง AI, ประวัติแบบ blocks และ UI สมัยใหม่ทำให้การทำงานใน terminal สนุกขึ้นมาก

## Framework & Libraries

### Next.js 15

Next.js ยังคงเป็น framework ที่ผมเลือกใช้ App Router ตอนนี้สมบูรณ์แล้ว, Server Components ทรงพลัง และประสบการณ์ developer ไม่มีใครเทียบได้

\`\`\`jsx
// app/page.tsx - สะอาดและเรียบง่าย
export default async function Home() {
  const data = await fetchData();
  return <Dashboard data={data} />;
}
\`\`\`

### Styling: Tailwind CSS + CSS Variables

ผมใช้ **Tailwind CSS** ร่วมกับระบบ theme ที่กำหนดเองโดยใช้ CSS variables ซึ่งให้ความยืดหยุ่นในการใช้งาน dark mode และการสลับ theme ได้อย่างง่ายดาย

### State Management: Zustand

สำหรับ client-side state ผมเลือก **Zustand** มันเรียบง่าย, เป็นมิตรกับ TypeScript และไม่ต้องการ boilerplate ที่ซับซ้อน

## Development Workflow

### Package Manager: pnpm

**pnpm** เร็วกว่าและใช้พื้นที่ดิสก์มีประสิทธิภาพกว่า npm หรือ yarn โครงสร้าง node_modules ที่เข้มงวดยังช่วยจับปัญหา dependency ได้เร็ว

### Version Control: Git + GitHub

ผมใช้ **conventional commits** ที่มี prefix ชัดเจน:
- \`feat:\` ฟีเจอร์ใหม่
- \`fix:\` แก้ไขบัก
- \`refactor:\` ปรับปรุงโค้ด
- \`docs:\` เอกสาร

## สรุป

Stack ของคุณควรให้บริการคุณ ไม่ใช่ตรงกันข้าม เครื่องมือเหล่านี้วิวัฒนาการมาพร้อมกับผมผ่านหลายปีของการปรับปรุง กุญแจสำคัญคือการหาสิ่งที่ทำให้*คุณ*มีประสิทธิภาพและยึดติดกับมันนานพอที่จะสร้างความเชี่ยวชาญ

Stack ของคุณเป็นอย่างไร? บอกผมได้ที่ Twitter!
            `
        }
    },
    'how-to-build-a-blog-with-nextjs-and-mdx': {
        date: 'JAN 28, 2026',
        readTime: 14,
        image: '/images/blog/nextjs-mdx.png',
        title: {
            en: 'How to Build a Blog with Next.js and MDX',
            th: 'วิธีสร้างบล็อกด้วย Next.js และ MDX'
        },
        tags: ['next.js', 'react', 'typescript', 'setup'],
        content: {
            en: `
## Introduction

Building a modern blog doesn't have to be complicated. With Next.js and MDX, you get the best of both worlds: the power of React components within your markdown content, and the incredible performance of Next.js.

In this guide, I'll walk you through creating a blog from scratch.

## Why Next.js + MDX?

**Next.js** provides:
- Server-side rendering for SEO
- Static generation for speed
- File-based routing
- Image optimization

**MDX** adds:
- Use React components in markdown
- Interactive code examples
- Custom styling per post
- Reusable content blocks

## Project Setup

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-blog --typescript --tailwind --app
cd my-blog
\`\`\`

Install MDX dependencies:

\`\`\`bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
\`\`\`

## Configure MDX

Update your \`next.config.js\`:

\`\`\`javascript
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
\`\`\`

## Creating Blog Posts

Create a \`content/posts\` directory and add your first post:

\`\`\`mdx
---
title: My First Post
date: 2026-01-28
---

# Hello World

This is my first blog post using **MDX**!

<CustomComponent prop="value" />
\`\`\`

## Building the Blog List

Create a utility to fetch all posts:

\`\`\`typescript
// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug: filename.replace('.mdx', ''),
      ...data
    };
  });
}
\`\`\`

## Styling Your Blog

Use Tailwind's typography plugin for beautiful prose:

\`\`\`bash
npm install @tailwindcss/typography
\`\`\`

Add it to your tailwind config and wrap your MDX content:

\`\`\`jsx
<article className="prose prose-lg dark:prose-invert">
  <MDXContent />
</article>
\`\`\`

## Deployment

Deploy to Vercel with a single command:

\`\`\`bash
npx vercel
\`\`\`

## Conclusion

You now have a fully functional blog with:
- ✅ MDX support for rich content
- ✅ TypeScript for type safety
- ✅ Tailwind for styling
- ✅ SEO-friendly structure

The full source code is available on my GitHub. Happy blogging!
            `,
            th: `
## บทนำ

การสร้างบล็อกสมัยใหม่ไม่จำเป็นต้องยุ่งยาก ด้วย Next.js และ MDX คุณจะได้สิ่งที่ดีที่สุดของทั้งสองโลก: พลังของ React components ภายในเนื้อหา markdown และประสิทธิภาพที่น่าทึ่งของ Next.js

ในคู่มือนี้ ผมจะพาคุณสร้างบล็อกตั้งแต่เริ่มต้น

## ทำไมต้อง Next.js + MDX?

**Next.js** มอบให้:
- Server-side rendering สำหรับ SEO
- Static generation สำหรับความเร็ว
- File-based routing
- Image optimization

**MDX** เพิ่มเติม:
- ใช้ React components ใน markdown
- ตัวอย่างโค้ดแบบ interactive
- การ styling แบบกำหนดเองต่อโพสต์
- Content blocks ที่นำกลับมาใช้ได้

## การตั้งค่าโปรเจกต์

ก่อนอื่น สร้างโปรเจกต์ Next.js ใหม่:

\`\`\`bash
npx create-next-app@latest my-blog --typescript --tailwind --app
cd my-blog
\`\`\`

ติดตั้ง MDX dependencies:

\`\`\`bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
\`\`\`

## กำหนดค่า MDX

อัปเดต \`next.config.js\` ของคุณ:

\`\`\`javascript
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
\`\`\`

## การสร้างโพสต์บล็อก

สร้างไดเร็กทอรี \`content/posts\` และเพิ่มโพสต์แรกของคุณ:

\`\`\`mdx
---
title: โพสต์แรกของฉัน
date: 2026-01-28
---

# สวัสดีโลก

นี่คือโพสต์บล็อกแรกของฉันที่ใช้ **MDX**!

<CustomComponent prop="value" />
\`\`\`

## สร้างรายการบล็อก

สร้าง utility เพื่อ fetch โพสต์ทั้งหมด:

\`\`\`typescript
// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug: filename.replace('.mdx', ''),
      ...data
    };
  });
}
\`\`\`

## การ Style บล็อกของคุณ

ใช้ typography plugin ของ Tailwind สำหรับ prose ที่สวยงาม:

\`\`\`bash
npm install @tailwindcss/typography
\`\`\`

เพิ่มใน tailwind config และ wrap เนื้อหา MDX ของคุณ:

\`\`\`jsx
<article className="prose prose-lg dark:prose-invert">
  <MDXContent />
</article>
\`\`\`

## การ Deploy

Deploy ไปยัง Vercel ด้วยคำสั่งเดียว:

\`\`\`bash
npx vercel
\`\`\`

## สรุป

ตอนนี้คุณมีบล็อกที่ทำงานได้เต็มรูปแบบพร้อม:
- ✅ รองรับ MDX สำหรับเนื้อหาที่หลากหลาย
- ✅ TypeScript สำหรับความปลอดภัยของ type
- ✅ Tailwind สำหรับ styling
- ✅ โครงสร้างที่เป็นมิตรกับ SEO

ซอร์สโค้ดทั้งหมดมีอยู่ใน GitHub ของผม สนุกกับการเขียนบล็อกนะครับ!
            `
        }
    },
    'learning-programming-easy-to-start-hard-to-master': {
        date: 'JAN 15, 2026',
        readTime: 8,
        image: '/images/blog/learning-programming.png',
        title: {
            en: 'Learning Programming – Easy to Start, Hard to Master',
            th: 'การเรียนเขียนโปรแกรม – เริ่มง่าย แต่ยากที่จะเชี่ยวชาญ'
        },
        tags: ['tips', 'core-concept', 'productivity'],
        content: {
            en: `
## The Illusion of "Easy"

Every year, thousands of articles promise you can "Learn to Code in 30 Days" or become a "Full-Stack Developer in 3 Months." While the intention is good, these titles create unrealistic expectations.

The truth? Getting started with programming has never been easier. Free resources are everywhere. But becoming genuinely skilled? That's a different story.

## My Journey

I started coding in university with C programming. The first month was exciting—I made a calculator! The second month was frustrating—why won't this linked list work? By the sixth month, I questioned everything.

But I kept going. And somewhere along the way, things started clicking.

## The 4 Stages of Learning

### Stage 1: Unconscious Incompetence
You don't know what you don't know. Everything seems simple because you haven't encountered the complexity yet.

### Stage 2: Conscious Incompetence
You realize how much you don't know. This is where most people quit. The mountain looks impossibly tall.

### Stage 3: Conscious Competence
You can do things, but it requires effort and concentration. You're constantly looking things up, and that's okay.

### Stage 4: Unconscious Competence
Things become second nature. You solve problems without thinking about syntax. You see patterns everywhere.

## What I Wish I Knew

### 1. Tutorial Hell is Real
Stop watching tutorials. Start building. You'll learn more from one failed project than 100 hours of videos.

### 2. Reading Code > Writing Code
Spend time reading other people's code. Open source projects, Stack Overflow answers, library source code. This is where the real learning happens.

### 3. Fundamentals Matter
Algorithms, data structures, design patterns—these aren't academic exercises. They're the vocabulary of our craft.

### 4. Take Breaks
Your brain needs time to process. Some of my best debugging happens in the shower, not at the keyboard.

### 5. Find Your Community
Twitter, Discord, local meetups—find people who are on the same journey. Learning together is faster.

## The Hard Parts

Let's be honest about what makes programming difficult:

- **Debugging** - 80% of your time, easily
- **Requirements that change** - Welcome to real projects
- **Keeping up** - The ecosystem evolves constantly
- **Impostor syndrome** - Everyone has it, even seniors

## The Payoff

Despite all this, programming is one of the most rewarding skills you can develop:

- Create things from nothing
- Solve real problems
- Work from anywhere
- Continuous learning built-in
- High demand, good compensation

## Conclusion

Programming is a journey, not a destination. The "hard to master" part isn't a bug—it's a feature. It means there's always more to learn, more to build, more to explore.

Five years from now, you'll look back at your current code and cringe. That's growth.

Keep building. Keep learning. And remember: every expert was once a beginner who didn't quit.

📚 Happy coding!
            `,
            th: `
## ภาพลวงตาของ "ง่าย"

ทุกปี บทความนับพันบทความสัญญาว่าคุณสามารถ "เรียนเขียนโค้ดใน 30 วัน" หรือกลายเป็น "Full-Stack Developer ใน 3 เดือน" แม้ว่าเจตนาจะดี แต่หัวข้อเหล่านี้สร้างความคาดหวังที่ไม่สมจริง

ความจริงคืออะไร? การเริ่มต้นเขียนโปรแกรมไม่เคยง่ายขนาดนี้มาก่อน แหล่งข้อมูลฟรีมีอยู่ทุกที่ แต่การเป็นคนที่มีทักษะจริงๆ? นั่นเป็นอีกเรื่องหนึ่ง

## เส้นทางของผม

ผมเริ่มเขียนโค้ดในมหาวิทยาลัยด้วยภาษา C เดือนแรกน่าตื่นเต้น—ผมสร้างเครื่องคิดเลขได้! เดือนที่สองน่าหงุดหงิด—ทำไม linked list นี้ถึงไม่ทำงาน? พอเดือนที่หก ผมตั้งคำถามกับทุกอย่าง

แต่ผมก็เดินหน้าต่อไป และที่ไหนสักแห่งระหว่างทาง สิ่งต่างๆ เริ่มลงตัว

## 4 ขั้นตอนของการเรียนรู้

### ขั้นที่ 1: Unconscious Incompetence
คุณไม่รู้ว่าคุณไม่รู้อะไร ทุกอย่างดูเรียบง่ายเพราะคุณยังไม่เจอความซับซ้อน

### ขั้นที่ 2: Conscious Incompetence
คุณตระหนักว่าคุณไม่รู้มากแค่ไหน นี่คือจุดที่คนส่วนใหญ่ยอมแพ้ ภูเขาดูสูงจนเป็นไปไม่ได้

### ขั้นที่ 3: Conscious Competence
คุณสามารถทำสิ่งต่างๆ ได้ แต่ต้องใช้ความพยายามและสมาธิ คุณค้นหาสิ่งต่างๆ อยู่ตลอดเวลา และนั่นก็โอเค

### ขั้นที่ 4: Unconscious Competence
สิ่งต่างๆ กลายเป็นธรรมชาติที่สอง คุณแก้ปัญหาโดยไม่ต้องคิดเรื่อง syntax คุณเห็น patterns ทุกที่

## สิ่งที่ผมอยากจะรู้ตอนนั้น

### 1. Tutorial Hell มีจริง
หยุดดู tutorials เริ่มสร้าง คุณจะเรียนรู้มากขึ้นจากโปรเจกต์หนึ่งที่ล้มเหลวมากกว่า 100 ชั่วโมงของวิดีโอ

### 2. การอ่านโค้ด > การเขียนโค้ด
ใช้เวลาอ่านโค้ดของคนอื่น โปรเจกต์ open source, คำตอบ Stack Overflow, ซอร์สโค้ดของ library นี่คือที่ที่การเรียนรู้จริงเกิดขึ้น

### 3. พื้นฐานสำคัญ
Algorithms, data structures, design patterns—สิ่งเหล่านี้ไม่ใช่แบบฝึกหัดทางวิชาการ มันคือคำศัพท์ของงานฝีมือของเรา

### 4. พักผ่อนบ้าง
สมองของคุณต้องการเวลาในการประมวลผล การ debug ที่ดีที่สุดบางครั้งเกิดขึ้นในห้องน้ำ ไม่ใช่ที่คีย์บอร์ด

### 5. ค้นหาชุมชนของคุณ
Twitter, Discord, local meetups—ค้นหาคนที่อยู่ในเส้นทางเดียวกัน การเรียนรู้ด้วยกันเร็วกว่า

## ส่วนที่ยาก

มาพูดตรงๆ เกี่ยวกับสิ่งที่ทำให้การเขียนโปรแกรมยาก:

- **การ Debugging** - 80% ของเวลาคุณ อย่างน้อย
- **Requirements ที่เปลี่ยนแปลง** - ยินดีต้อนรับสู่โปรเจกต์จริง
- **การตามให้ทัน** - Ecosystem วิวัฒนาการอยู่ตลอดเวลา
- **Impostor syndrome** - ทุกคนมี แม้แต่ senior

## ผลตอบแทน

แม้จะมีทั้งหมดนี้ การเขียนโปรแกรมเป็นหนึ่งในทักษะที่คุ้มค่าที่สุดที่คุณสามารถพัฒนาได้:

- สร้างสิ่งต่างๆ จากไม่มีอะไร
- แก้ปัญหาจริง
- ทำงานจากที่ไหนก็ได้
- การเรียนรู้อย่างต่อเนื่องในตัว
- ความต้องการสูง ค่าตอบแทนดี

## สรุป

การเขียนโปรแกรมคือการเดินทาง ไม่ใช่จุดหมายปลายทาง ส่วน "ยากที่จะเชี่ยวชาญ" ไม่ใช่บัก—มันคือฟีเจอร์ มันหมายความว่ามีสิ่งให้เรียนรู้เพิ่มเติมเสมอ สิ่งให้สร้างเพิ่มเติม สิ่งให้สำรวจเพิ่มเติม

ห้าปีจากนี้ คุณจะมองย้อนกลับไปที่โค้ดปัจจุบันของคุณและรู้สึกอาย นั่นคือการเติบโต

สร้างต่อไป เรียนรู้ต่อไป และจำไว้: ผู้เชี่ยวชาญทุกคนเคยเป็นมือใหม่ที่ไม่ยอมแพ้

📚 สนุกกับการเขียนโค้ดนะครับ!
            `
        }
    }
};

export default function BlogPostPage({ theme, setTheme, lang, setLang }) {
    const router = useRouter();
    const { slug } = router.query;
    const [bookingOpen, setBookingOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const t = translations[lang] || translations.en;

    const post = slug ? blogPosts[slug] : null;

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!post && slug) {
        return (
            <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
                <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />
                <div className="pt-32 pb-24 max-w-3xl mx-auto px-6 text-center">
                    <h1 className="text-3xl font-heading mb-4">{lang === 'en' ? 'Post not found' : 'ไม่พบบทความ'}</h1>
                    <Link href="/blog" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        ← {lang === 'en' ? 'Back to blog' : 'กลับไปหน้าบล็อก'}
                    </Link>
                </div>
                <Footer t={t} />
            </main>
        );
    }

    if (!post) {
        return (
            <main className="min-h-screen transition-theme bg-[var(--bg-primary)] flex items-center justify-center">
                <div className="text-[var(--text-muted)]">Loading...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />

            <article className="pt-32 pb-24 max-w-3xl mx-auto px-6">
                {/* Back Link */}
                <Link
                    href="/blog"
                    className={`inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all mb-12 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    {lang === 'en' ? 'Back to blog' : 'กลับไปหน้าบล็อก'}
                </Link>

                {/* Hero Image */}
                <div className={`aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-[var(--border-color)] transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <img src={post.image} alt={lang === 'en' ? post.title.en : post.title.th} className="w-full h-full object-cover" />
                </div>

                {/* Header */}
                <header className={`mb-12 transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                            {post.date}
                        </span>
                        <span className="text-[var(--text-muted)]">•</span>
                        <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTime} min read
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)] leading-tight mb-6">
                        {lang === 'en' ? post.title.en : post.title.th}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full text-xs bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)]">
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Content */}
                <div className={`prose prose-lg dark:prose-invert max-w-none transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div
                        className="text-[var(--text-secondary)] leading-relaxed [&>h2]:text-2xl [&>h2]:font-heading [&>h2]:font-bold [&>h2]:text-[var(--text-primary)] [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-heading [&>h3]:font-semibold [&>h3]:text-[var(--text-primary)] [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-6 [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2 [&>pre]:bg-[var(--bg-secondary)] [&>pre]:border [&>pre]:border-[var(--border-color)] [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>code]:text-sm [&>code]:font-mono [&>p>code]:bg-[var(--bg-secondary)] [&>p>code]:px-1.5 [&>p>code]:py-0.5 [&>p>code]:rounded [&>strong]:text-[var(--text-primary)] [&>p>strong]:font-semibold"
                        dangerouslySetInnerHTML={{
                            __html: (lang === 'en' ? post.content.en : post.content.th)
                                .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                                .replace(/`([^`]+)`/g, '<code>$1</code>')
                                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                .replace(/\n\n/g, '</p><p>')
                                .replace(/^## (.+)$/gm, '</p><h2>$1</h2><p>')
                                .replace(/^### (.+)$/gm, '</p><h3>$1</h3><p>')
                                .replace(/^- (.+)$/gm, '<li>$1</li>')
                                .replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>')
                        }}
                    />
                </div>

                {/* Share */}
                <div className={`mt-16 pt-8 border-t border-[var(--border-color)] transition-all duration-1000 delay-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-sm text-[var(--text-muted)] mb-4">
                        {lang === 'en' ? 'Enjoyed this article? Share it!' : 'ชอบบทความนี้ไหม? แชร์ได้เลย!'}
                    </p>
                    <div className="flex gap-3">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(lang === 'en' ? post.title.en : post.title.th)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </article>

            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
