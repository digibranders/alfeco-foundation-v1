import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue, useMotionTemplate } from 'motion/react';
import { ArrowRight, CheckCircle2, Heart, Users, Leaf, Lightbulb, Menu, User, HandCoins, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FlipNumber } from '../components/FlipNumber';
import CountUp from 'react-countup';


import founderImage from '@/assets/founder.png';
// Assets
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1588712133121-05bf81cf3e47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZGV2ZWxvcG1lbnQlMjBoZWxwaW5nJTIwcGVvcGxlJTIwc21pbGluZyUyMGNoaWxkcmVufGVufDF8fHx8MTc3MDcxODk5M3ww&ixlib=rb-4.1.0&q=80&w=1920",
  "https://images.unsplash.com/photo-1694286066815-4e17284d61ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29tbXVuaXR5JTIwc21pbGluZyUyMGVkdWNhdGlvbiUyMGZvb2QlMjBkaXN0cmlidXRpb258ZW58MXx8fHwxNzcwNzE5MzIxfDA&ixlib=rb-4.1.0&q=80&w=1920",
  "https://images.unsplash.com/photo-1632215863153-0dae7657d0a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudHMlMjBjbGFzc3Jvb20lMjBzbWlsaW5nJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcwNzE5MzI0fDA&ixlib=rb-4.1.0&q=80&w=1920",
  "https://images.unsplash.com/photo-1607109792980-a507686ae731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwcGxhbnRpbmclMjB0cmVlcyUyMGNvbW11bml0eSUyMGdhcmRlbnxlbnwxfHx8fDE3NzA3MTkzMjh8MA&ixlib=rb-4.1.0&q=80&w=1920"
];

const STORY_IMAGE = "https://images.unsplash.com/photo-1526583644846-cd206236cd7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const VISION_IMAGE = "https://images.unsplash.com/photo-1730234345113-867627f7dd5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFmcmljYSUyMGNvbW11bml0eSUyMGRldmVsb3BtZW50JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDcyMTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080";
const PILLAR_EDUCATION = "https://images.unsplash.com/photo-1744809482817-9a9d4fc280af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const PILLAR_FOOD = "https://images.unsplash.com/photo-1473605768212-7e1f2c756179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const PILLAR_WOMEN = "https://images.unsplash.com/photo-1688302529084-767fbc296565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const PILLAR_ENV = "https://images.unsplash.com/photo-1767479813249-8d8b9e212496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const PILLAR_AID = "https://images.unsplash.com/photo-1653106520329-0cd3af731811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const PILLAR_SOCIAL = "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

// --- COMPONENTS ---

// 1. Reading Progress Bar
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#C1272D] z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

// 2. Magnetic Button Component
const MagneticButton = ({ children, className, to }: { children: React.ReactNode, className?: string, to: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Magnetic strength
    const strength = 0.5;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: xSpring, y: ySpring }}>
      <Link
        to={to}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </Link>
    </motion.div>
  );
};



export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Parallax Setup for Vision Section
  const visionRef = useRef(null);
  const { scrollYProgress: visionScrollY } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"]
  });
  const visionY = useTransform(visionScrollY, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-0 font-sans bg-[#EBF3F5] text-[#1A1A1A] relative">
      <ProgressBar />

      {/* HERO SECTION */}
      <section className="flex flex-col min-h-screen relative z-10 bg-[#EBF3F5]" id="hero">
        <div className="h-[55vh] w-full overflow-hidden relative bg-gray-200">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              initial={{ clipPath: "inset(0 100% 0 0)", scale: 1.1 }}
              animate={{ clipPath: "inset(0 0 0 0)", scale: 1 }}
              exit={{ opacity: 0, transition: { delay: 1.2, duration: 0 } }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              src={HERO_IMAGES[currentImageIndex]}
              alt="Community Development"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </AnimatePresence>
        </div>

        <div className="flex-grow flex flex-col justify-center px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-normal leading-[1.1] tracking-tight mb-8">
              Igniting Hope. <br />
              <span className="text-[#E8AB36] italic">Building Futures Together.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#7E8083] font-light max-w-2xl mb-12 leading-relaxed font-sans">
              Alfeco Foundation is dedicated to empowering communities through sustainable development, education, and compassion.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mt-auto pt-8 border-t border-[#1A1A1A]/10 w-full">
            <Link to="/about" className="text-sm font-bold uppercase tracking-widest hover:text-[#C1272D] transition-colors mb-4 md:mb-0">
              Discover Our Story
            </Link>
            <div className="text-[10px] uppercase tracking-widest text-[#7E8083]">
              Alfeco Foundation &copy; All Rights Reserved
            </div>
          </div>
        </div>
      </section>


      {/* OUR STORY */}
      <section className="py-24 px-6 md:px-12" id="story">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 relative sticky top-32">
            <motion.div {...fadeInUp} className="overflow-hidden border border-[#1A1A1A]/10 mb-6 relative bg-[#EBF3F5] mb-6 aspect-[4/5]">
              <img src={founderImage} alt="Founder" className="w-full h-adjust object-cover" />
            </motion.div>
            <div className="mt-4 text-xs font-bold uppercase tracking-widest text-[#7E8083]">
              Sachin Ahuja &mdash; Founder
            </div>
          </div>

          <div className="lg:col-span-7 pt-8">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <h2 className="text-3xl md:text-5xl font-serif font-normal mb-10 leading-tight">
                Empowering Communities. <br />
                <span className="italic font-normal text-[#C1272D]">Inspiring Change.</span>
              </h2>

              <div className="md:columns-2 gap-12 text-lg font-light text-[#1A1A1A]/80 leading-relaxed text-justify space-y-6">
                <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-[#1A1A1A] first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:font-normal first-letter:leading-[0.8]">
                  The Alfeco Foundation was born from the vision, compassion and lived experience of Mr. Sachin Ahuja, a self-made entrepreneur whose remarkable journey from a small town near Jaipur, Rajasthan, to the helm of one of South Africa’s most dynamic industrial conglomerates is a testament to perseverance, inclusivity, and the power of human connection.
                </p>
                <p className="mb-6">
                  What began as a modest scrap metal trading venture grew - through resilience, foresight and relentless determination - into the Alfeco Group: a diversified enterprise spanning steel, aluminum, and copper beneficiation. Under Mr. Ahuja’s leadership, the group now employs more than 2,000 people and has propelled Veer Steel Mills into becoming one of South Africa’s second-largest steel manufacturer.
                </p>

                <blockquote className="break-inside-avoid my-8 pl-6 border-l-2 border-[#C1272D] italic text-2xl font-serif text-[#1A1A1A] leading-tight">
                  "This foundation of humility, gratitude, and community forms the moral compass that guides Alfeco’s culture."
                </blockquote>

                <p className="mb-6">
                  Behind every milestone lies a story of family, friends, and mentors the silent pillars whose unwavering support shaped his values, nurtured his ambition, and instilled in him a belief that every achievement is shared. This foundation of humility, gratitude, and community forms the moral compass that guides Alfeco’s culture and breathes life into all that we do.
                </p>
                <p className="mb-6">
                  Out of this legacy, the Alfeco Foundation emerged, a beacon of compassion, hope and determination in South Africa’s ongoing pursuit of progress. Our purpose is deeply rooted in the belief that meaningful change is possible when people come together with courage, empathy and vision.
                </p>
                <p className="mb-6">
                  We focus our efforts on strengthening lives and unlocking potential across six key pillars: Education and Development, Food Security, Women and Youth Empowerment, Alfeco Aid, Conservation and Environment and Social Support for Vulnerable Populations.
                </p>
                <p className="mb-6">
                  Every initiative is a testament to our unwavering commitment to building brighter futures and igniting hope in the hearts of those who aspire to rise above their circumstances.
                </p>
                <p className="mb-6">
                  Our true strength lies not only in our projects, it lives in the beating heart of our people. Our dedicated and compassionate staff embody the spirit of service, working tirelessly to infuse every initiative with care, dignity and love. They are the vibrant force that transforms our mission into meaningful, lasting impact.
                </p>
                <p className="mb-6">
                  We honour and salute every man and woman who walks this journey with us. Their resilience, courage and creativity shape uniquely South African solutions to South African challenges. Together, we are crafting a tapestry of hope, one thread, one life, one community at a time.
                </p>
                <p className="mb-6">
                  At the Alfeco Foundation, we believe that we can be the architects of a better future - hand in hand, heart to heart.
                </p>
                <p className="mb-6">
                  And with every step forward, we remain guided by the simple yet powerful truth at the core of our story.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-[#1A1A1A]/10 text-center md:text-left">
                <p className="font-serif italic text-2xl text-[#C1272D]">
                  Empowering communities is not just our mission. It is our purpose, our promise and our passion.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="py-24 bg-[#EBF3F5] px-6 md:px-12 scroll-mt-20" id="philosophy">
        <motion.div className="max-w-7xl mx-auto" {...fadeInUp}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#1A1A1A]">Our Philosophy</h2>
            <p className="text-[#7E8083] mt-4 md:mt-0 max-w-md text-right font-sans">
              At Alfeco Foundation, we believe that progress thrives where people are empowered and purpose meets compassion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {[
              { icon: Users, title: "Inclusivity", text: "Every voice matters. Every dream deserves a chance.", color: "#48B2A9" },
              { icon: CheckCircle2, title: "Integrity", text: "Doing right, even when unseen.", color: "#2E86AB" },
              { icon: Lightbulb, title: "Innovation", text: "Reimagining solutions for today’s and tomorrow’s challenges.", color: "#E8AB36" },
              { icon: Heart, title: "Empowerment", text: "Enabling individuals and communities to stand tall.", color: "#C1272D" },
              { icon: Leaf, title: "Sustainability", text: "Protecting our environment as we grow.", color: "#48B2A9" }
            ].map((value, index) => (
              <div
                key={value.title}
                className="p-12 flex flex-col sm:flex-row items-start gap-8"
              >
                <div className="flex-shrink-0">
                  <value.icon className="w-12 h-12 stroke-1" style={{ color: value.color }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: value.color }}>{value.title}</h3>
                  <p className="text-[#1A1A1A]/80 leading-relaxed font-light text-lg">
                    {value.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* VISION SECTION - Parallax */}
      <section className="relative py-24 px-6 md:px-12 bg-[#1A1A1A] text-white scroll-mt-20 overflow-hidden" id="vision">
        <div ref={visionRef} className="relative w-full h-full" style={{ position: 'relative' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="overflow-hidden relative h-[500px] w-full" style={{ position: 'relative' }}>
                <motion.img
                  style={{ y: visionY }}
                  src={VISION_IMAGE}
                  alt="South African Landscape"
                  className="absolute inset-0 w-full h-[140%] object-cover opacity-80 grayscale -top-[20%]"
                />
                <div className="absolute inset-0 border border-white/20 m-4 pointer-events-none z-10"></div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.div {...fadeInUp}>
                <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8">
                  Our Vision: <br />
                  <span className="text-[#E8AB36]">Growth Through Development</span>
                </h2>
                <div className="space-y-6 text-lg font-light text-white/80 leading-relaxed md:columns-2 gap-8">
                  <p className="mb-4">
                    At the Alfeco Foundation, our vision — Growth Through Development — is rooted in passion, partnership and people. We believe true growth is not measured only in numbers, but in lives strengthened, leaders nurtured and communities uplifted.
                  </p>
                  <p>
                    Through education, empowerment and environmental stewardship, we create pathways where individuals are supported to grow with confidence, dignity and purpose.
                  </p>
                  <p>
                    By working hand in hand with communities, partners and changemakers, we foster collaboration that unlocks potential and builds leadership at every level. Together, we cultivate opportunity, resilience and hope — creating a future where growth is inclusive, sustainable and shared by all.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-24 px-6 md:px-12 bg-[#EBF3F5] scroll-mt-20" id="mission">
        <motion.div className="max-w-7xl mx-auto" {...fadeInUp}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#1A1A1A] mb-2">Our Mission</h2>
              <h3 className="text-xl md:text-2xl font-serif text-[#C1272D] italic">"The Impossible Done Simply"</h3>
            </div>
            <p className="text-[#7E8083] mt-6 md:mt-0 max-w-md text-right font-sans">
              At the Alfeco Foundation, our mission is to turn purpose into action — empowering communities through compassion, collaboration and practical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#1A1A1A]/20">
            {[
              { title: "Education & Development", text: "Empowering minds through quality education, skills development, mentorship and lifelong learning — nurturing future leaders with confidence and character.", color: "#E8AB36" },
              { title: "Food Security", text: "Strengthening communities through sustainable agriculture, nutrition programmes and food initiatives that restore dignity and resilience.", color: "#48B2A9" },
              { title: "Women & Youth Empowerment", text: "Supporting entrepreneurship, leadership development and financial inclusion — enabling women and youth to grow into confident, independent change-makers.", color: "#C1272D" },
              { title: "Conservation & Environment", text: "Protecting our planet through renewable energy, green manufacturing, conservation initiatives and responsible, sustainable living.", color: "#48B2A9" }
            ].map((item, index) => (
              <div
                key={item.title}
                className={`
                  p-12 flex flex-col items-start gap-4
                  border-b border-[#1A1A1A]/20
                  ${index % 2 === 0 ? 'md:border-r' : ''}
                `}
              >
                <h4 className="text-2xl font-bold" style={{ color: item.color }}>{item.title}</h4>
                <p className="text-[#1A1A1A]/80 leading-relaxed font-light text-lg">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-12 text-center max-w-4xl mx-auto">
            <p className="text-xl font-light text-[#1A1A1A]/80 leading-relaxed italic font-serif">
              Guided by our belief that "the impossible can be done simply," we approach every challenge with humility, determination and a positive mindset.
            </p>
          </div>
        </motion.div>
      </section>

      {/* PILLARS - Carousel with Notched Cards */}
      <section className="relative py-32 px-6 md:px-12 bg-[#EBF3F5] scroll-mt-20 overflow-hidden" id="pillars">
        <motion.div className="max-w-7xl mx-auto" {...fadeInUp}>
          <h2 className="text-3xl md:text-5xl font-serif font-normal mb-12 text-[#1A1A1A]">Anchored in Impact</h2>

          <div className="mx-auto">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={5000}
              pauseOnHover={true}
              className="gap-6"
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                  }
                }
              ]}
            >
              {[
                { title: "Education", img: PILLAR_EDUCATION, text: "Empowering minds through quality education and lifelong learning.", color: "#48B2A9", date: "Year-Round" },
                { title: "Food Security", img: PILLAR_FOOD, text: "Sustainable agriculture, nutrition programs, and community gardens.", color: "#E8AB36", date: "Daily Support" },
                { title: "Women & Youth", img: PILLAR_WOMEN, text: "Entrepreneurship, leadership training, and skills development.", color: "#C1272D", date: "Monthly Workshops" },
                { title: "Environment", img: PILLAR_ENV, text: "Green manufacturing, renewable energy, and conservation.", color: "#48B2A9", date: "Ongoing" },
                { title: "Alfeco Aid", img: PILLAR_AID, text: "Rapid response, disaster relief, and direct assistance.", color: "#E8AB36", date: "24/7 Response" },
                { title: "Social Support", img: PILLAR_SOCIAL, text: "Uplifting vulnerable populations through care and dignity.", color: "#C1272D", date: "Community Care" },
              ].map((pillar, index) => (
                <div key={pillar.title} className="px-4 py-8">
                  <div className="relative h-[480px] w-full group overflow-hidden">

                    {/* Card Shape */}
                    <div className="absolute inset-0 w-full h-full bg-[#1A1A1A]">
                      {/* Background Image */}
                      <img
                        src={pillar.img}
                        alt={pillar.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                      />

                      {/* Color Overlay */}
                      <div
                        className="absolute inset-0 mix-blend-multiply opacity-80"
                        style={{ backgroundColor: pillar.color }}
                      />

                      {/* Dark Overlay for Text Legibility */}
                      <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Content Layer */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white pointer-events-none">
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-2">{pillar.title}</h3>
                        <div className="flex items-center text-xs font-bold uppercase tracking-widest opacity-70 mb-6">
                          <span className="mr-2">📅</span> {pillar.date}
                        </div>
                        <p className="text-white/80 font-light leading-relaxed line-clamp-4">
                          {pillar.text}
                        </p>
                      </div>

                      <div className="mb-6 pointer-events-auto">
                        <Link
                          to="/impact"
                          className="block w-full py-4 text-center text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black border border-white"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.div>
      </section>

      {/* IMPACT COUNTERS */}
      <section className="py-32 bg-[#1A1A1A] text-white px-6 md:px-12">
        <motion.div className="max-w-7xl mx-auto" {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/20 pt-16">
            {[
              { icon: User, color: "bg-[#FFA726]", number: "232K", label: "Poor Educate" },
              { icon: HandCoins, color: "bg-[#EF5350]", number: "99M+", label: "Donate now" },
              { icon: HeartHandshake, color: "bg-[#7E57C2]", number: "132K", label: "Clients Help" },
              { icon: Users, color: "bg-[#26A69A]", number: "35K+", label: "Team Support" },
            ].map((stat, index) => {
              const num = parseInt(stat.number.replace(/[^0-9]/g, ""), 10);
              const suffix = stat.number.replace(/[0-9]/g, "");
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${stat.color} flex items-center justify-center shrink-0`}>
                    <Icon className="text-white w-8 h-8" />
                  </div>
                  <div className="h-12 w-px bg-white/20"></div>
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold text-[#EBF3F5] relative">
                      <CountUp
                        end={num}
                        duration={2.5}
                        suffix={suffix}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </div>
                    <div className="text-sm font-medium text-white/60">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* CTA SECTION - Magnetic Buttons */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-br from-[#C1272D] to-[#E63946] text-white text-center">
        <motion.div className="max-w-3xl mx-auto" {...fadeInUp}>
          <h2 className="text-4xl md:text-6xl font-serif font-normal mb-12">Ready to make a difference?</h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">

            <Link
              to="/contact"
              className="inline-block bg-transparent text-white font-bold py-5 px-14 uppercase tracking-widest hover:bg-white hover:text-[#C1272D] transition-colors border border-white min-w-[200px]"
            >
              Donate Now
            </Link>

            <Link
              to="/contact"
              className="inline-block border border-white text-white font-bold py-5 px-14 uppercase tracking-widest hover:bg-white hover:text-[#C1272D] transition-colors min-w-[200px]"
            >
              Volunteer
            </Link>

          </div>
        </motion.div>
      </section>

    </div>
  );
}
