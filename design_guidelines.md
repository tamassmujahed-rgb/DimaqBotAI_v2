# Design Guidelines: Digital Brain AI Telegram Bot

## Design Approach
**Reference-Based Approach**: Drawing inspiration from AI/Tech products like Linear (clean, modern), ChatGPT (conversation-focused), and Telegram's own aesthetic (bold, tech-forward).

**Design Philosophy**: Tech-forward minimalism with emphasis on AI capabilities and seamless communication. Focus on clarity and trust-building for an AI service.

---

## Core Design Elements

### Typography
- **Primary Font**: Inter via Google Fonts (tech industry standard)
- **Headings**: 
  - H1: text-5xl/text-6xl, font-bold (Hero)
  - H2: text-4xl, font-bold (Section headers)
  - H3: text-2xl, font-semibold (Feature titles)
- **Body**: text-base/text-lg, font-normal
- **UI Elements**: text-sm, font-medium

### Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Container: max-w-7xl mx-auto
- Section padding: py-20 (desktop), py-12 (mobile)
- Component spacing: space-y-8 for vertical stacks
- Grid gaps: gap-8 for feature grids

---

## Page Structure

### Hero Section (Full-width, ~80vh)
- **Layout**: Centered content with gradient background
- **Elements**:
  - Large headline emphasizing "AI Digital Brain"
  - Subheadline explaining capabilities (questions, video ideas, scripts, summarization)
  - Primary CTA: "Start Chat on Telegram" button with Telegram icon
  - Secondary CTA: "View Features" anchor link
  - Trust indicator: "Powered by OpenAI GPT-4" badge
- **Visual**: Abstract AI/brain-themed illustration or geometric patterns as background

### Features Grid (3-column desktop, 1-column mobile)
**Four feature cards** with icons from Heroicons:
1. **AI Question Answering** - ChatBubbleLeftRightIcon
2. **Video Idea Generation** - LightBulbIcon
3. **Script Writing** - DocumentTextIcon
4. **Text Summarization** - SparklesIcon

Each card includes:
- Large icon (w-12 h-12)
- Feature title (text-xl font-semibold)
- Description paragraph (text-base)
- Rounded borders with subtle shadow

### How It Works (3-step process)
**Horizontal timeline layout**:
1. Open Telegram → 2. Send Command → 3. Get AI Response
- Step numbers in circles
- Connecting lines between steps
- Brief description under each step

### Capabilities Showcase (2-column split)
**Left**: Example chat interface mockup showing bot conversation
**Right**: Feature list with checkmarks highlighting:
- Multiple AI commands
- Context-aware responses
- Quick summarization
- Creative content generation
- Arabic & English support

### CTA Section (Centered, full-width)
- Bold headline: "Ready to Unlock Your Digital Brain?"
- Large Telegram button with call-to-action
- Supporting text: "Free to start, intelligent from day one"

### Footer (Simple)
- Bot name and tagline
- Quick links: Commands, Support, Privacy
- "Built with OpenAI GPT-4" credit
- Social/contact information

---

## Component Library

### Buttons
- **Primary**: Rounded-full, px-8 py-4, text-lg font-semibold, with Telegram gradient feel
- **Secondary**: Rounded-full, px-6 py-3, outlined style
- **With Icons**: Icon on left, gap-2 spacing

### Cards
- Rounded-xl borders
- Padding: p-8
- Hover: subtle lift with shadow transition

### Icons
- **Library**: Heroicons (CDN)
- **Size**: w-6 h-6 for UI, w-12 h-12 for features

### Chat Interface Mockup
- Rounded container resembling Telegram chat
- Message bubbles with distinct sender/receiver styling
- Bot messages with AI indicator badge
- Timestamp and status indicators

---

## Images

### Hero Section
**Placement**: Background or right-side illustration
**Description**: Modern, abstract representation of AI/digital brain - geometric shapes, neural network patterns, or tech-forward illustration. Should convey intelligence and connectivity without being literal.
**Treatment**: Gradient overlay for text readability

### Capabilities Section
**Placement**: Left side of 2-column layout
**Description**: Mockup of Telegram chat interface showing the bot in action - realistic message bubbles with example AI responses for video ideas or summarization
**Treatment**: Add subtle screen glow or device frame

---

## Animations
**Minimal approach**:
- Fade-in on scroll for feature cards (stagger by 100ms)
- Subtle hover lift on cards/buttons
- No complex scroll-triggered animations

---

## Accessibility
- Semantic HTML throughout
- ARIA labels for icon-only buttons
- Focus visible states on all interactive elements
- Sufficient contrast ratios for all text