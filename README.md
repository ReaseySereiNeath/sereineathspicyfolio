# Portfolio - Reasey Serei Neath

A modern, animated portfolio website built with Next.js 15 and GSAP for professional-grade animations.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP 3 with ScrollTrigger
- **Icons:** Lucide React
- **UI Components:** Custom built components

## ✨ Animation Features

This portfolio uses **GSAP (GreenSock Animation Platform)** for smooth, performant animations:

- **ScrollTrigger**: Scroll-based animations that trigger as you navigate
- **Timeline Animations**: Coordinated sequences for smooth transitions
- **Parallax Effects**: Depth and movement for engaging visual experience
- **Hover Interactions**: Responsive micro-interactions on all interactive elements
- **Entrance Animations**: Staggered reveals for content sections
- **SVG Path Animations**: Animated timelines and decorative elements

### Why GSAP?

- **Performance**: Hardware-accelerated animations, 60fps smooth
- **Compatibility**: Works flawlessly across all browsers
- **Control**: Precise timing, easing, and sequencing
- **Professional Grade**: Industry-standard animation library
- **ScrollTrigger**: Best-in-class scroll-based animations

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Features

- **Smooth Scroll Animations:** GSAP ScrollTrigger for buttery smooth scroll-based animations
- **Responsive Design:** Fully responsive across all devices
- **Modern UI:** Clean, dark-themed interface with gradient accents
- **Section Navigation:** Fixed navigation with smooth scrolling and active state tracking
- **Intersection Observer:** Automatic section detection on scroll
- **Optimized Performance:** Hardware-accelerated animations, optimized for 60fps
- **Hover Effects:** Rich micro-interactions on all interactive elements
- **Parallax Scrolling:** Depth and dimension through parallax effects

## 📂 Project Structure

```
neath-portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts           # Contact form API endpoint
│   ├── globals.css                # Global styles and Tailwind config
│   ├── layout.tsx                 # Root layout with metadata
│   └── page.tsx                   # Main page with GSAP animations
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx         # Fixed navigation with GSAP transitions
│   │   └── SocialLinks.tsx        # Social media links with scale effects
│   ├── sections/
│   │   ├── About/
│   │   │   ├── About.tsx          # About section with parallax effects
│   │   │   ├── AboutImage.tsx     # About section image component
│   │   │   └── AboutStats.tsx     # About statistics display
│   │   ├── Contact/
│   │   │   ├── Contact.tsx        # Contact section wrapper
│   │   │   ├── ContactForm.tsx    # Contact form with validation
│   │   │   └── ContactInfo.tsx    # Contact information display
│   │   ├── Experience/
│   │   │   ├── Experience.tsx     # Work experience timeline
│   │   │   └── ExperienceCard.tsx # Individual experience card
│   │   ├── Hero/
│   │   │   └── Hero.tsx           # Hero section with entrance animations
│   │   ├── Journey/
│   │   │   ├── Journey.tsx        # Career journey with SVG path animation
│   │   │   ├── TimelinePic.tsx    # Timeline image component
│   │   │   └── TimelineText.tsx   # Timeline text component
│   │   ├── Projects/
│   │   │   ├── ProjectCard.tsx    # Individual project card
│   │   │   └── Projects.tsx       # Project showcase with hover effects
│   │   ├── Skills/
│   │   │   ├── SkillCard.tsx      # Individual skill card
│   │   │   └── Skills.tsx         # Skills grid with stagger animations
│   │   └── Testimonials/
│   │       ├── TestimonialCard.tsx # Individual testimonial card
│   │       └── Testimonials.tsx   # Client testimonials with reveals
│   ├── shared/
│   │   ├── GradientCard.tsx       # Reusable gradient card component
│   │   └── SectionHeader.tsx      # Reusable section header
│   └── ui/
│       ├── Badge.tsx              # Badge component
│       ├── Button.tsx             # Button component with variants
│       ├── index.ts               # UI components barrel export
│       ├── Input.tsx              # Input field component
│       ├── LoadingSpinner.tsx     # Loading spinner component
│       └── Textarea.tsx           # Textarea component
├── data/
│   ├── about.ts                   # About section content
│   ├── contact.ts                 # Contact information data
│   ├── experiences.ts             # Work experience data
│   ├── projects.ts                # Projects data
│   ├── skills.ts                  # Skills and technologies data
│   └── testimonials.ts            # Testimonials data
├── lib/
│   ├── constants/
│   │   ├── index.ts               # Constants barrel export
│   │   └── navigation.ts          # Navigation constants
│   ├── hooks/
│   │   ├── useCardHover.ts        # Card hover animation hook
│   │   └── useScrollReveal.ts     # Scroll reveal animation hook
│   ├── schemas/
│   │   ├── contact.ts             # Contact form validation schema
│   │   └── index.ts               # Schemas barrel export
│   ├── services/
│   │   └── email.ts               # Email sending service
│   ├── types/
│   │   ├── animations.ts          # Animation type definitions
│   │   ├── content.ts             # Content type definitions
│   │   ├── index.ts               # Types barrel export
│   │   └── navigation.ts          # Navigation type definitions
│   └── utils/
│       ├── animations.ts          # Animation utility functions
│       ├── gsap-config.ts         # GSAP configuration and setup
│       ├── index.ts               # Utils barrel export
│       └── type-guards.ts         # TypeScript type guards
├── public/                        # Static assets (images, icons)
├── .gitignore                     # Git ignore rules
├── .prettierignore                # Prettier ignore rules
├── .prettierrc.json               # Prettier configuration
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🎯 Sections

1. **Hero** - Animated welcome section with staggered text reveals
2. **About** - Personal introduction with parallax image effects
3. **Skills** - Technical skills with hover and scale animations
4. **Journey** - Career timeline with animated SVG path
5. **Experience** - Professional work experience with timeline dots
6. **Projects** - Featured projects with glow effects on hover
7. **Testimonials** - Client reviews with star animations
8. **Contact** - Contact form with smooth field transitions

## 🛠️ Development

The app uses Next.js App Router with client-side rendering for animations. All components are built with TypeScript and use GSAP for professional animations.

### Key Technologies

- **Next.js 15**: Latest App Router features
- **GSAP 3**: Professional animation library
- **ScrollTrigger**: Advanced scroll-based animations
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type-safe development
- **Lucide React**: Modern icon library

## 🎬 Animation Details

### GSAP Implementation

All animations are implemented using GSAP with the following patterns:

```typescript
// ScrollTrigger for scroll-based animations
gsap.from(element, {
	opacity: 0,
	y: 50,
	scrollTrigger: {
		trigger: element,
		start: "top 80%",
		toggleActions: "play none none reverse",
	},
});

// Timeline for coordinated sequences
const tl = gsap.timeline();
tl.from(element1, { opacity: 0, y: 20 })
	.from(element2, { opacity: 0, y: 20 }, "-=0.4")
	.from(element3, { opacity: 0, y: 20 }, "-=0.4");

// Hover interactions
element.addEventListener("mouseenter", () => {
	gsap.to(element, { scale: 1.1, duration: 0.3 });
});
```

### Performance Optimization

- **Hardware Acceleration**: All transforms use GPU-accelerated properties
- **Will-change**: Strategic use for smooth animations
- **Context Cleanup**: Proper GSAP context cleanup on unmount
- **Efficient Triggers**: Optimized ScrollTrigger configurations
- **Lazy Loading**: Components animate only when visible

## 📝 Customization

To customize the portfolio:

1. Update personal information in each component
2. Modify colors in `globals.css` and `tailwind.config.ts`
3. Add your own projects, skills, and experiences
4. Update social links in `SocialLinks.tsx`
5. Customize GSAP animations in individual components
6. Adjust timing and easing functions for different feel

## 🚀 Deployment

This project can be deployed on:

- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- Any Node.js hosting platform

```bash
# Build and deploy
npm run build
npm start
```

## 🎓 Learning Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Guide](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built using Next.js and GSAP
