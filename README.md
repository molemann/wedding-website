# Wedding Website

A beautiful, interactive wedding website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The site features elegant animations, responsive design, and a warm autumn color palette inspired by Madrid.

## Features

- 🎨 Modern, elegant design with autumn-inspired color scheme
- 📱 Fully responsive layout for all devices
- ✨ Smooth animations and transitions using Framer Motion
- 📅 Interactive RSVP form with confetti celebration
- 🗺️ Wedding details with schedule and location information
- 💑 Beautiful "Our Story" timeline
- ❓ Comprehensive FAQs section with accordion interface

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MolSal/wedding-website.git
cd wedding-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
boda/
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── page.tsx       # Home page
│   │   ├── story/         # Our Story page
│   │   ├── details/       # Wedding Details page
│   │   ├── rsvp/         # RSVP form page
│   │   └── faqs/         # FAQs page
│   ├── components/        # Reusable components
│   └── styles/           # Global styles and theme
├── public/               # Static assets
└── package.json         # Project dependencies
```

## Customization

### Colors

The color palette can be customized in `src/styles/theme.ts` and `tailwind.config.ts`. The current palette includes:

- Terracotta: `#E07A5F`
- Burnt Orange: `#D65D45`
- Golden Yellow: `#F2CC8F`
- Olive Green: `#81B29A`
- Warm Ivory: `#F4F1DE`
- Deep Navy: `#3D405B`

### Content

Update the content in the respective page components:

- `src/app/page.tsx` - Home page
- `src/app/story/page.tsx` - Our Story timeline
- `src/app/details/page.tsx` - Wedding details and schedule
- `src/app/rsvp/page.tsx` - RSVP form
- `src/app/faqs/page.tsx` - Frequently asked questions

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Heroicons](https://heroicons.com/) - Icons

## License

This project is licensed under the MIT License.
