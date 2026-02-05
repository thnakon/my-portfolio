import { useState, useEffect } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { motion } from 'framer-motion';

// SVG Icons
const Icons = {
    Target: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Context: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
    ),
    Role: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    Format: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    Chain: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    Iterate: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    Edit: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    ),
    Settings: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Constraint: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    ),
    Structure: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
    ),
    Code: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
    Bug: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8l-1 1v4l1 1h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
    ),
    Arch: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    Book: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    Lightbulb: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.674a1 1 0 01.992.883l.194 1.458A1 1 0 0114.532 21h-5.064a1 1 0 01-.991-1.127l.194-1.458A1 1 0 019.663 17z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c-3.313 0-6 2.687-6 6 0 2.308 1.309 4.308 3.239 5.308l.194 1.458c.287 2.152 2.134 3.234 3.567 3.234s3.28-1.082 3.567-3.234l.194-1.458C16.691 13.308 18 11.308 18 9c0-3.313-2.687-6-6-6z" />
        </svg>
    ),
    X: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    Check: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    )
};

const TypewriterText = ({ text, delay = 30, startDelay = 500 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsStarted(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    useEffect(() => {
        if (!isStarted) return;
        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [displayedText, text, delay, isStarted]);

    return (
        <span>
            {displayedText}
            {displayedText.length < text.length && (
                <span className="inline-block w-0.5 h-5 ml-0.5 bg-[var(--text-primary)] animate-pulse align-middle" />
            )}
        </span>
    );
};

// Prompt Engineering Principles Data
const principles = [
    {
        id: 1,
        title: { en: 'Be Specific & Clear', th: 'ชัดเจนและเจาะจง' },
        icon: <Icons.Target />,
        description: {
            en: 'Provide clear, specific instructions. Avoid ambiguity and define exactly what you want.',
            th: 'ให้คำสั่งที่ชัดเจนและเจาะจง หลีกเลี่ยงความคลุมเครือและระบุสิ่งที่ต้องการอย่างแม่นยำ'
        },
        example: {
            bad: 'Write something about dogs.',
            good: 'Write a 200-word educational article about Golden Retrievers, covering their temperament, exercise needs, and suitability for families with children.'
        }
    },
    {
        id: 2,
        title: { en: 'Provide Context', th: 'ให้บริบท' },
        icon: <Icons.Context />,
        description: {
            en: 'Give relevant background information. Context helps AI understand your needs better.',
            th: 'ให้ข้อมูลพื้นฐานที่เกี่ยวข้อง บริบทช่วยให้ AI เข้าใจความต้องการของคุณได้ดีขึ้น'
        },
        example: {
            bad: 'Fix this code.',
            good: 'I\'m building a React e-commerce app. This component should display product cards in a grid, but it\'s not rendering. Here\'s my code: [code]. The error I\'m getting is: [error message].'
        }
    },
    {
        id: 3,
        title: { en: 'Define the Role', th: 'กำหนดบทบาท' },
        icon: <Icons.Role />,
        description: {
            en: 'Assign a specific role or persona to guide the AI\'s response style and expertise level.',
            th: 'กำหนดบทบาทหรือตัวตนเฉพาะเพื่อนำทางรูปแบบการตอบและระดับความเชี่ยวชาญของ AI'
        },
        example: {
            bad: 'Explain machine learning.',
            good: 'You are a senior ML engineer explaining machine learning to a junior developer who knows Python but has no ML experience. Explain supervised learning with practical examples.'
        }
    },
    {
        id: 4,
        title: { en: 'Specify Output Format', th: 'ระบุรูปแบบผลลัพธ์' },
        icon: <Icons.Format />,
        description: {
            en: 'Define how you want the response structured - format, length, style, and structure.',
            th: 'กำหนดว่าคุณต้องการให้คำตอบมีโครงสร้างอย่างไร - รูปแบบ ความยาว สไตล์ และโครงสร้าง'
        },
        example: {
            bad: 'List some programming languages.',
            good: 'Create a comparison table of Python, JavaScript, and Go with columns for: Use Cases, Learning Curve, Performance, and Community Support. Use emoji ratings (⭐) for each category.'
        }
    },
    {
        id: 5,
        title: { en: 'Use Chain-of-Thought', th: 'ใช้การคิดแบบลูกโซ่' },
        icon: <Icons.Chain />,
        description: {
            en: 'Ask AI to think step-by-step for complex problems. This improves reasoning accuracy.',
            th: 'ขอให้ AI คิดทีละขั้นตอนสำหรับปัญหาที่ซับซ้อน ช่วยเพิ่มความแม่นยำในการใช้เหตุผล'
        },
        example: {
            bad: 'What\'s 17% of 340?',
            good: 'Calculate 17% of 340. Show your reasoning step by step, then provide the final answer.'
        }
    },
    {
        id: 6,
        title: { en: 'Iterate & Refine', th: 'ปรับปรุงซ้ำ' },
        icon: <Icons.Iterate />,
        description: {
            en: 'Treat prompting as a conversation. Refine based on responses and ask follow-up questions.',
            th: 'ปฏิบัติต่อการสั่งการเหมือนการสนทนา ปรับปรุงตามคำตอบและถามคำถามต่อเนื่อง'
        },
        example: {
            bad: 'That\'s not what I wanted.',
            good: 'Good start! Now make it more concise, focus on the technical benefits, and add a code example for the authentication flow.'
        }
    }
];

// Advanced Techniques
const advancedTechniques = [
    {
        name: { en: 'Few-Shot Learning', th: 'Few-Shot Learning' },
        icon: <Icons.Edit />,
        description: {
            en: 'Provide examples of desired input-output pairs to guide the AI.',
            th: 'ให้ตัวอย่างคู่ input-output ที่ต้องการเพื่อนำทาง AI'
        },
        example: `Example 1:
Input: "The movie was amazing!"
Output: Positive

Example 2:
Input: "Terrible service, never again."
Output: Negative

Now classify:
Input: "Pretty good, but could be better."
Output:`
    },
    {
        name: { en: 'System Prompts', th: 'System Prompts' },
        icon: <Icons.Settings />,
        description: {
            en: 'Set persistent instructions that define AI behavior throughout the conversation.',
            th: 'ตั้งคำสั่งถาวรที่กำหนดพฤติกรรม AI ตลอดการสนทนา'
        },
        example: `[System] You are a helpful coding assistant specializing in React and TypeScript. Always:
- Explain code clearly
- Include TypeScript types
- Follow best practices
- Suggest performance optimizations`
    },
    {
        name: { en: 'Constraint Setting', th: 'การกำหนดข้อจำกัด' },
        icon: <Icons.Constraint />,
        description: {
            en: 'Define boundaries and limitations to focus the AI response.',
            th: 'กำหนดขอบเขตและข้อจำกัดเพื่อให้คำตอบของ AI มีโฟกัส'
        },
        example: `Write a function that validates email addresses.

Constraints:
- Use JavaScript (ES6+)
- No external libraries
- Must handle edge cases
- Include JSDoc comments
- Maximum 20 lines of code`
    },
    {
        name: { en: 'Structured Output', th: 'ผลลัพธ์แบบมีโครงสร้าง' },
        icon: <Icons.Structure />,
        description: {
            en: 'Request specific formats like JSON, Markdown, or tables for easier parsing.',
            th: 'ร้องขอรูปแบบเฉพาะเช่น JSON, Markdown หรือตารางเพื่อให้แปลงได้ง่าย'
        },
        example: `Analyze this product review and return a JSON object with:
{
  "sentiment": "positive|negative|neutral",
  "score": 1-10,
  "keywords": ["array", "of", "keywords"],
  "summary": "one sentence summary"
}`
    }
];

// Prompt Templates
const promptTemplates = [
    {
        category: { en: 'Code Review', th: 'รีวิวโค้ด' },
        icon: <Icons.Code />,
        template: `Review this [LANGUAGE] code for:
1. Code quality and readability
2. Potential bugs or edge cases
3. Performance optimizations
4. Security vulnerabilities
5. Best practice violations

Code:
\`\`\`[language]
[YOUR CODE HERE]
\`\`\`

Provide specific line-by-line feedback.`
    },
    {
        category: { en: 'Debug Assistant', th: 'ช่วยดีบัก' },
        icon: <Icons.Bug />,
        template: `I'm experiencing an issue with my [TECHNOLOGY] application.

**Expected behavior:**
[What should happen]

**Actual behavior:**
[What actually happens]

**Error message:**
\`\`\`
[Error output]
\`\`\`

**Relevant code:**
\`\`\`[language]
[Code snippet]
\`\`\`

**What I've tried:**
- [Attempt 1]
- [Attempt 2]

Please help me identify and fix the issue.`
    },
    {
        category: { en: 'Architecture Design', th: 'ออกแบบสถาปัตยกรรม' },
        icon: <Icons.Arch />,
        template: `Design a system architecture for [PROJECT TYPE].

**Requirements:**
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

**Scale:** [Expected users/load]
**Budget:** [Budget constraints]
**Team size:** [Number of developers]

Please provide:
1. High-level architecture diagram (ASCII)
2. Technology stack recommendations
3. Database schema suggestions
4. API design principles
5. Scalability considerations`
    },
    {
        category: { en: 'Documentation', th: 'เขียนเอกสาร' },
        icon: <Icons.Book />,
        template: `Write comprehensive documentation for this [FUNCTION/API/COMPONENT]:

\`\`\`[language]
[CODE]
\`\`\`

Include:
1. Description and purpose
2. Parameters/Props with types
3. Return values
4. Usage examples (basic and advanced)
5. Common pitfalls to avoid
6. Related functions/components

Format as Markdown with proper headings.`
    }
];

// Component for Principle Card
const PrincipleCard = ({ principle, index, lang }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--text-primary)]/30 transition-all duration-300 cursor-pointer"
            >
                <div className="flex items-start gap-4">
                    <span className="p-3 rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]">
                        {principle.icon}
                    </span>
                    <div className="flex-1">
                        <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)] mb-2">
                            {lang === 'en' ? principle.title.en : principle.title.th}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                            {lang === 'en' ? principle.description.en : principle.description.th}
                        </p>
                    </div>
                    <svg
                        className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 pt-6 border-t border-[var(--border-color)]"
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-red-500 flex items-center gap-2 text-sm font-bold">
                                        <Icons.X />
                                        {lang === 'en' ? 'Weak Prompt' : 'พรอมต์อ่อน'}
                                    </span>
                                </div>
                                <code className="text-xs text-[var(--text-secondary)] block whitespace-pre-wrap font-mono">
                                    {principle.example.bad}
                                </code>
                            </div>
                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-green-500 flex items-center gap-2 text-sm font-bold">
                                        <Icons.Check />
                                        {lang === 'en' ? 'Strong Prompt' : 'พรอมต์แข็งแกร่ง'}
                                    </span>
                                </div>
                                <code className="text-xs text-[var(--text-secondary)] block whitespace-pre-wrap font-mono">
                                    {principle.example.good}
                                </code>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

// Component for Technique Card
const TechniqueCard = ({ technique, index, lang }) => {
    const [showExample, setShowExample] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:shadow-xl transition-all duration-300"
        >
            <div className="flex items-center gap-3 mb-4">
                <span className="p-3 rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]">
                    {technique.icon}
                </span>
                <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)]">
                    {lang === 'en' ? technique.name.en : technique.name.th}
                </h3>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
                {lang === 'en' ? technique.description.en : technique.description.th}
            </p>
            <button
                onClick={() => setShowExample(!showExample)}
                className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:opacity-70 transition-opacity flex items-center gap-2"
            >
                {showExample ? (lang === 'en' ? 'Hide Example' : 'ซ่อนตัวอย่าง') : (lang === 'en' ? 'Show Example' : 'แสดงตัวอย่าง')}
                <svg className={`w-4 h-4 transition-transform ${showExample ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {showExample && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]"
                >
                    <pre className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap font-mono overflow-x-auto">
                        {technique.example}
                    </pre>
                </motion.div>
            )}
        </motion.div>
    );
};

// Component for Template Card
const TemplateCard = ({ template, index, lang }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(template.template);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="p-3 rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]">
                        {template.icon}
                    </span>
                    <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)]">
                        {lang === 'en' ? template.category.en : template.category.th}
                    </h3>
                </div>
                <button
                    onClick={handleCopy}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${copied
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                >
                    {copied ? '✓ Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] whitespace-pre-wrap font-mono overflow-x-auto max-h-[300px]">
                {template.template}
            </pre>
        </motion.div>
    );
};

export default function AIToolkitPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [activeTab, setActiveTab] = useState('principles');
    const t = translations[lang] || translations.en;

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const tabs = [
        { id: 'principles', label: { en: 'Core Principles', th: 'หลักการสำคัญ' }, icon: <Icons.Arch /> },
        { id: 'techniques', label: { en: 'Advanced Techniques', th: 'เทคนิคขั้นสูง' }, icon: <Icons.Settings /> },
        { id: 'templates', label: { en: 'Prompt Templates', th: 'เทมเพลตพรอมต์' }, icon: <Icons.Format /> }
    ];

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />

            <div className="pt-32 pb-24 max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16 text-center">
                    <span className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {lang === 'en' ? 'PROMPT ENGINEERING' : 'วิศวกรรมพรอมต์'}
                    </span>
                    <h2 className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <span className="text-[var(--text-primary)]">{lang === 'en' ? 'AI' : 'ชุดเครื่องมือ'} </span>
                        <em className="overview-title-accent">{lang === 'en' ? 'Toolkit' : 'AI'}</em>
                    </h2>
                    <div className="min-h-[3em]">
                        <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                            {showContent && (
                                <TypewriterText
                                    text={lang === 'en'
                                        ? 'Master the art of communicating with AI. Learn professional prompt engineering techniques used by engineers worldwide.'
                                        : 'เชี่ยวชาญศิลปะการสื่อสารกับ AI เรียนรู้เทคนิควิศวกรรมพรอมต์ระดับมืออาชีพที่วิศวกรทั่วโลกใช้'}
                                    delay={20}
                                    startDelay={600}
                                />
                            )}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                                : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            {lang === 'en' ? tab.label.en : tab.label.th}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className={`transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                    {activeTab === 'principles' && (
                        <div className="space-y-4">
                            {principles.map((principle, index) => (
                                <PrincipleCard key={principle.id} principle={principle} index={index} lang={lang} />
                            ))}
                        </div>
                    )}

                    {activeTab === 'techniques' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {advancedTechniques.map((technique, index) => (
                                <TechniqueCard key={technique.name.en} technique={technique} index={index} lang={lang} />
                            ))}
                        </div>
                    )}

                    {activeTab === 'templates' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {promptTemplates.map((template, index) => (
                                <TemplateCard key={template.category.en} template={template} index={index} lang={lang} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Tips Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-4 rounded-2xl bg-blue-500/20 text-blue-400">
                            <Icons.Lightbulb />
                        </span>
                        <h2 className="text-2xl font-heading font-bold text-[var(--text-primary)]">
                            {lang === 'en' ? 'Pro Tips' : 'เคล็ดลับมืออาชีพ'}
                        </h2>
                    </div>
                    <ul className="space-y-4">
                        {[
                            { en: 'Start simple, then add complexity. Begin with a basic prompt and iterate.', th: 'เริ่มจากง่าย แล้วค่อยเพิ่มความซับซ้อน เริ่มด้วยพรอมต์พื้นฐานแล้วปรับปรุง' },
                            { en: 'Use delimiters (```, """, ---) to clearly separate different parts of your prompt.', th: 'ใช้ตัวคั่น (```, """, ---) เพื่อแยกส่วนต่างๆ ของพรอมต์ให้ชัดเจน' },
                            { en: 'Ask AI to explain its reasoning - this often improves accuracy.', th: 'ขอให้ AI อธิบายเหตุผล - มักช่วยเพิ่มความแม่นยำ' },
                            { en: 'When debugging, provide the full error message and relevant code context.', th: 'เมื่อดีบัก ให้ Error message เต็มๆ และบริบทโค้ดที่เกี่ยวข้อง' },
                            { en: 'Save successful prompts as templates for future use.', th: 'บันทึกพรอมต์ที่สำเร็จเป็นเทมเพลตสำหรับใช้ในอนาคต' }
                        ].map((tip, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="text-blue-400 mt-1">▸</span>
                                <span className="text-[var(--text-secondary)]">
                                    {lang === 'en' ? tip.en : tip.th}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
